import { crmService } from "../../services/crmService.js";

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
  const rawId = source.id || user?.crmAdmissionId || user?.id || "";
  const numOnly = rawId ? String(rawId).replace(/[^0-9]/g, "") : "";
  const numericId = numOnly ? `#${numOnly}` : "";
  const studentId =
    source.admissionNo || user?.admissionNo || (numOnly ? `OMC-${numOnly.padStart(4, "0")}` : "");
  const name = source.name || user?.name || "Student";
  const fullName =
    source.fullName || user?.fullName || source.name || user?.name || "Student";
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
  // Batch details: strictly from CRM manage-batch / student assignment
  const rawBatch = source.batchName || user?.batchName || source.batchCode || user?.batchCode || "";
  const hasAssignedBatch = Boolean(
    rawBatch &&
    rawBatch !== "WD-M1" &&
    rawBatch.trim().length > 0 &&
    !rawBatch.toLowerCase().includes("not assigned")
  );
  const batch = hasAssignedBatch ? rawBatch.trim() : "Not Assigned";

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

  let courseStart = "Not Assigned";
  let courseEnd = "Not Assigned";
  let daysLeft = null;

  // Extract raw admission date from any available field across CRM and user object
  const rawAdmission =
    source.submission_time ||
    source.admission_date ||
    source.admissionDate ||
    source.registration_date ||
    source.registrationDate ||
    user?.submission_time ||
    user?.admission_date ||
    user?.admissionDate ||
    user?.registration_date ||
    null;

  const validityMonths = isDiploma ? 6 : 12;
  const maxAllowedDays = isDiploma ? 180 : 365;

  let admissionDt = null;
  if (rawAdmission) {
    admissionDt = new Date(rawAdmission);
    if (isNaN(admissionDt.getTime())) {
      const parts = String(rawAdmission).split(/[-/\s]/);
      if (parts.length === 3) {
        if (parts[0].length === 4) {
          admissionDt = new Date(parts[0], parseInt(parts[1], 10) - 1, parts[2]);
        } else if (parts[2].length === 4) {
          admissionDt = new Date(parts[2], parseInt(parts[1], 10) - 1, parts[0]);
        }
      }
    }
  }

  const now = Date.now();
  let isAdmissionOverOneYear = false;
  let admissionComputedDaysLeft = null;
  let admissionComputedCourseEnd = "Not Assigned";

  if (admissionDt && !isNaN(admissionDt.getTime())) {
    const elapsedDays = Math.floor((now - admissionDt.getTime()) / (1000 * 60 * 60 * 24));
    const endDt = new Date(admissionDt);
    endDt.setMonth(endDt.getMonth() + validityMonths);
    admissionComputedCourseEnd = endDt.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    // 2ND CONDITION: IF ADMISSION DATE OVER 1 YEAR (or Diploma 6 months) -> strictly 0 days left
    if (elapsedDays >= maxAllowedDays || now >= endDt.getTime()) {
      isAdmissionOverOneYear = true;
      admissionComputedDaysLeft = 0;
    } else {
      const diffMs = endDt.getTime() - now;
      admissionComputedDaysLeft = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
    }
  }

  // Read explicit daysLeft from CRM API / source or user object (handles both number and string like "0")
  const rawDaysFromSource =
    source.daysLeft !== undefined && source.daysLeft !== null
      ? source.daysLeft
      : source.days_left !== undefined && source.days_left !== null
        ? source.days_left
        : user?.daysLeft !== undefined && user?.daysLeft !== null
          ? user.daysLeft
          : user?.days_left;

  // STRICT RULE: If admission date is over 1 year, force 0 days left universally for all batches (Online & Offline)
  if (isAdmissionOverOneYear) {
    daysLeft = 0;
    courseEnd = admissionComputedCourseEnd;
    courseStart = admissionDate;
  } else {
    if (rawDaysFromSource !== undefined && rawDaysFromSource !== null) {
      const p = parseInt(rawDaysFromSource, 10);
      if (!isNaN(p)) {
        daysLeft = Math.max(0, p);
      }
    } else if (admissionComputedDaysLeft !== null) {
      daysLeft = admissionComputedDaysLeft;
      courseEnd = admissionComputedCourseEnd;
      courseStart = admissionDate;
    }

    if (hasAssignedBatch || source.courseEnd) {
      courseStart =
        source.courseStart && source.courseStart !== "Not Assigned"
          ? source.courseStart
          : source.submission_time
            ? crmService.formatDate(source.submission_time)
            : admissionDate;

      if (source.courseEnd && source.courseEnd !== "Not Assigned") {
        courseEnd = source.courseEnd;
        try {
          const endDt = new Date(courseEnd);
          if (!isNaN(endDt.getTime())) {
            const diffMs = endDt.getTime() - Date.now();
            daysLeft = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
          }
        } catch (e) {}
      } else if (hasAssignedBatch && (!courseEnd || courseEnd === "Not Assigned")) {
        courseEnd =
          admissionComputedCourseEnd !== "Not Assigned"
            ? admissionComputedCourseEnd
            : isDiploma
              ? "09 Sep 2026"
              : "20 Apr 2027";
        if (daysLeft === null) {
          daysLeft = admissionComputedDaysLeft ?? 0;
        }
      }
    }
  }

  // Real course progress from LMS watch state (default to 0, never hardcode 65)
  const progressPercentage =
    typeof user?.overallProgress === "number"
      ? user.overallProgress
      : typeof source.progress === "number"
        ? source.progress
        : typeof source.progressPercentage === "number"
          ? source.progressPercentage
          : 0;

  const hasCourseAssigned = Boolean(
    hasAssignedBatch &&
    course &&
    !course.toLowerCase().includes("not assigned")
  );
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

  // Course History (Only active if the student actually changed courses in CRM)
  let courseHistory = [];
  let hasCourseChange = false;

  if (Array.isArray(source.courseChangeHistory) && source.courseChangeHistory.length > 0) {
    const actualChanges = source.courseChangeHistory.filter((item) => {
      const titleLower = String(item.title || "").toLowerCase();
      return !titleLower.startsWith("enrolled in");
    });
    if (actualChanges.length > 0) {
      courseHistory = source.courseChangeHistory;
      hasCourseChange = true;
    }
  } else if (source.courseHistoryRaw && String(source.courseHistoryRaw).trim().length > 0) {
    const rawLines = String(source.courseHistoryRaw)
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    if (rawLines.length > 0) {
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
      hasCourseChange = true;
    }
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
    progressPercentage,
    hasAssignedBatch,
    hasCourseAssigned,
    hasWatchingProgress: progressPercentage > 0,
    totalFees,
    amountPaid,
    balanceDue,
    feesClearedPercent,
    paymentStatus,
    installments,
    hasCourseChange,
    courseHistory,
  };
};

/**
 * checkStudentCourseAccess
 * Validates whether the student profile has active course and video access.
 * STRICT RULE: If daysLeft <= 0 (or courseEnd in past), access is strictly locked / expired.
 * For all students (including test cases like Adeeti Jadhav), 0 days left locks videos and courses.
 */
export const checkStudentCourseAccess = (crm, user, isAdmin = false) => {
  const studentData = mapStudentDataFromCrm(crm, user);
  const daysLeft = studentData.daysLeft;
  const courseEnd = studentData.courseEnd;

  // Direct check on raw CRM / user profile objects
  const rawDays =
    crm?.daysLeft !== undefined && crm?.daysLeft !== null
      ? crm.daysLeft
      : crm?.days_left !== undefined && crm?.days_left !== null
        ? crm.days_left
        : user?.daysLeft !== undefined && user?.daysLeft !== null
          ? user.daysLeft
          : user?.days_left !== undefined && user?.days_left !== null
            ? user.days_left
            : daysLeft;

  const parsedDays =
    rawDays !== null && rawDays !== undefined && !isNaN(parseInt(rawDays, 10))
      ? parseInt(rawDays, 10)
      : daysLeft;

  // Universal Admission Date Check for ALL Batches (including Online)
  const rawAdmission =
    crm?.submission_time ||
    crm?.admission_date ||
    crm?.admissionDate ||
    crm?.registration_date ||
    crm?.registrationDate ||
    user?.submission_time ||
    user?.admission_date ||
    user?.admissionDate;

  let isAdmissionOverOneYear = false;
  if (rawAdmission) {
    let dt = new Date(rawAdmission);
    if (isNaN(dt.getTime())) {
      const parts = String(rawAdmission).split(/[-/\s]/);
      if (parts.length === 3) {
        if (parts[0].length === 4) {
          dt = new Date(parts[0], parseInt(parts[1], 10) - 1, parts[2]);
        } else if (parts[2].length === 4) {
          dt = new Date(parts[2], parseInt(parts[1], 10) - 1, parts[0]);
        }
      }
    }
    if (dt && !isNaN(dt.getTime())) {
      const elapsed = Math.floor((Date.now() - dt.getTime()) / (1000 * 60 * 60 * 24));
      const isDip = (studentData.course || "").toLowerCase().includes("diploma");
      const maxAllowed = isDip ? 180 : 365;
      if (elapsed >= maxAllowed) {
        isAdmissionOverOneYear = true;
      }
    }
  }

  // Strictly expired if:
  // 1. Admission date is over 1 year (or diploma 6 months)
  // 2. OR parsedDays <= 0
  // 3. OR daysLeft <= 0
  const isExpired =
    isAdmissionOverOneYear ||
    (parsedDays !== null && parsedDays !== undefined && parsedDays <= 0) ||
    (daysLeft !== null && daysLeft !== undefined && daysLeft <= 0);

  const effectiveDaysLeft = isExpired ? 0 : (parsedDays ?? daysLeft ?? 0);

  // Active access requires not expired AND positive days remaining (> 0)
  const hasAccess = !isExpired && effectiveDaysLeft > 0;

  return {
    hasAccess,
    isExpired,
    daysLeft: effectiveDaysLeft,
    hasAssignedBatch: studentData.hasAssignedBatch,
    courseEnd: courseEnd && courseEnd !== "Not Assigned" ? courseEnd : null,
    batch: studentData.batch,
    studentName: studentData.name,
    facultyLead: studentData.facultyLead,
    center: studentData.center,
  };
};
