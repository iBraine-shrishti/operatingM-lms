import { crmService } from "../../services/crmService";

/**
 * Resolves faculty lead based on student batch / branch condition:
 * - Rahul Shende - BORIVALI
 * - Nilkamal Mukharjee - ANDHERI
 */
export const resolveFacultyByBatchOrBranch = (branchOrCenter = "", batchNameOrCode = "") => {
  const target = `${branchOrCenter || ""} ${batchNameOrCode || ""}`.toLowerCase();

  if (
    target.includes("andheri") ||
    target.includes("ddm-a1") ||
    target.includes("-a1") ||
    target.includes("andh")
  ) {
    return {
      facultyLead: "Nilkamal Mukharjee",
      facultyLeadRole: "Lead Faculty - Andheri Center",
    };
  }

  // Default to Borivali Center
  return {
    facultyLead: "Rahul Shende",
    facultyLeadRole: "Lead Faculty - Borivali Center",
  };
};

/**
 * Maps CRM profile data and current user auth state into a normalized student profile object.
 *
 * @param {Object} crm - CRM profile object
 * @param {Object} user - Current user object from AuthContext
 * @returns {Object} Normalized studentData object
 */
export const mapStudentDataFromCrm = (crm, user) => {
  const source = crm || {};
  const rawId = source.id || user?.crmAdmissionId || user?.id || 375;
  const numOnly = String(rawId).replace(/[^0-9]/g, "") || "375";
  const numericId = `#${numOnly}`;
  const studentId =
    source.admissionNo || user?.admissionNo || `OMC-${numOnly.padStart(4, "0")}`;
  const name = source.name || user?.name || "Sahil Hasolkar";
  const fullName =
    source.fullName || user?.fullName || source.name || user?.name || "Sahil Nilesh Hasolkar";
  const rawAvatar = source.photo || source.avatar || user?.avatar;
  const avatar = rawAvatar || null;
  const course = source.course || user?.course || "Diploma in Digital Marketing";
  const isDiploma = course.toLowerCase().includes("diploma");
  const center =
    source.center ||
    source.branch ||
    user?.center ||
    user?.branch ||
    "Andheri Center";
  const batch =
    source.batchName ||
    user?.batchName ||
    `${course} (${isDiploma ? "DDM-A1" : "WD-M1"})`;

  const admissionDate =
    source.admissionDate ||
    (source.submission_time
      ? crmService.formatDate(source.submission_time)
      : "09 Mar 2026");
  const registrationDate =
    source.registrationDate ||
    (source.registration_date
      ? crmService.formatDate(source.registration_date)
      : admissionDate);
  const dob = source.dob || "25 Jun 1994";
  const gender = source.gender || "Male";
  const maritalStatus = source.maritalStatus || source.status || "Single";
  const email = source.email || user?.email || "ram@lmsoperatingmedia.org";
  const mobile = source.mobile || source.phone || user?.phone || "+91 73047 48384";
  const address =
    source.address || "Pawar Chawl Kadam wadi Marol Pipeline Andheri E";
  const city = source.city || "Mumbai";
  const state = source.state || "Maharashtra";
  const pincode = source.pincode || "400059";
  const country = source.country || "India";

  // Dynamic faculty lead resolution based on student batch/branch:
  // Rahul Shende - BORIVALI | Nilkamal Mukharjee - ANDHERI (Harsh Pareek removed)
  const batchAssignedFaculty = resolveFacultyByBatchOrBranch(center, batch);
  const rawFacultyLead = source.facultyLead || user?.facultyLead;
  const facultyLead = (rawFacultyLead && !rawFacultyLead.includes("Harsh Pareek"))
    ? rawFacultyLead
    : batchAssignedFaculty.facultyLead;

  const rawFacultyRole = source.facultyLeadRole || user?.facultyLeadRole;
  const facultyLeadRole = (rawFacultyRole && !rawFacultyRole.includes("Director"))
    ? rawFacultyRole
    : batchAssignedFaculty.facultyLeadRole;
  const courseDuration =
    source.courseDuration || (isDiploma ? "6 Months" : "12 Months");
  const courseStart = source.courseStart || admissionDate;
  const courseEnd = source.courseEnd || (isDiploma ? "09 Sep 2026" : "20 Apr 2027");
  const daysLeft = typeof source.daysLeft === "number" ? source.daysLeft : 147;
  const totalFees = typeof source.totalFees === "number" ? source.totalFees : 25000;
  const amountPaid = typeof source.totalPaid === "number" ? source.totalPaid : 2000;
  const balanceDue =
    typeof source.balanceDue === "number"
      ? source.balanceDue
      : Math.max(0, totalFees - amountPaid);
  const feesClearedPercent =
    typeof source.paidPercentage === "number"
      ? Math.round(source.paidPercentage)
      : totalFees > 0
        ? Math.round((amountPaid / totalFees) * 100)
        : 0;
  const paymentStatus =
    source.paymentStatus ||
    (balanceDue <= 0 ? "Fully Cleared" : "Fees Pending");

  // Installments list from CRM
  let installments = source.installments;
  if (!Array.isArray(installments) || installments.length === 0) {
    installments = [
      {
        id: "inst-0",
        number: 0,
        title: "Registration Fee",
        dueDate: registrationDate,
        date: registrationDate,
        amount: source.regAmount || 2000,
        mode: "Registration",
        status: (source.regAmount || 2000) > 0 ? "PAID" : "UNPAID",
        isOverdue: false,
      },
      {
        id: "inst-1",
        number: 1,
        title: "Inst 1",
        dueDate: "09 Mar 2026",
        date: "09 Mar 2026",
        amount: 11500,
        mode: "Pending",
        status: "UNPAID",
        isOverdue: true,
      },
      {
        id: "inst-2",
        number: 2,
        title: "Inst 2",
        dueDate: "04 Apr 2026",
        date: "04 Apr 2026",
        amount: 11500,
        mode: "Pending",
        status: "UNPAID",
        isOverdue: true,
      },
    ];
  } else {
    installments = installments.map((inst, idx) => ({
      ...inst,
      id: inst.id || `inst-${inst.number ?? idx}`,
      dueDate: inst.dueDate || inst.date || "Scheduled",
      status: String(inst.status).toUpperCase() === "PAID" ? "PAID" : "UNPAID",
    }));
  }

  // Course History
  let courseHistory = source.courseChangeHistory;
  if (!courseHistory && source.courseHistoryRaw) {
    const rawLines = String(source.courseHistoryRaw)
      .split("\n")
      .filter((l) => l.trim());
    courseHistory = rawLines.map((line, idx) => {
      const parts = line.split(":");
      const date = parts[0]?.trim() || "Logged Date";
      const title = parts.slice(1).join(":").trim() || line;
      return {
        id: `ch-${idx}`,
        date,
        title,
        description: "Course transition recorded in Operating Media CRM.",
      };
    });
  }
  if (!courseHistory || courseHistory.length === 0) {
    courseHistory = [
      {
        id: "ch-0",
        date: admissionDate,
        title: `Enrolled in ${course}`,
        description:
          "Official student admission confirmed in Operating Media CRM records.",
      },
    ];
  }

  return {
    name,
    fullName,
    avatar,
    studentId,
    numericId,
    course,
    courseDesc:
      "Comprehensive program covering SEO, Social Media, Google Ads, Analytics and more.",
    center,
    batch,
    admissionDate,
    registrationDate,
    dob,
    gender,
    maritalStatus,
    email,
    mobile,
    address,
    city,
    state,
    pincode,
    country,
    facultyLead,
    facultyLeadRole,
    courseDuration,
    courseStart,
    courseEnd,
    daysLeft,
    progressPercentage: 65,
    totalFees,
    amountPaid,
    balanceDue,
    feesClearedPercent,
    paymentStatus,
    installments,
    courseHistory,
  };
};
