import { crmService } from "../../services/crmService.js";
import { formatAdmissionNo } from "../../utils/admissionUtils.js";

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
 * Calculates Video Lecture Validity:
 * Videos are viewable for 365 days (or 366 days if a leap year is spanned)
 * from the student's admission / registration date, IRRESPECTIVE of when the course completes.
 *
 * @param {string|Date} rawAdmission - Admission or registration date
 * @returns {Object} Video validity calculation results
 */
export const calculateVideoValidity = (rawAdmission) => {
  if (!rawAdmission) {
    return {
      totalDays: 365,
      isLeapYear: false,
      videoExpiryDate: "365 Days Access",
      videoDaysLeft: 365,
      isVideoExpired: false,
      hasVideoAccess: true,
      elapsedDays: 0,
    };
  }

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

  if (!dt || isNaN(dt.getTime())) {
    return {
      totalDays: 365,
      isLeapYear: false,
      videoExpiryDate: "365 Days Access",
      videoDaysLeft: 365,
      isVideoExpired: false,
      hasVideoAccess: true,
      elapsedDays: 0,
    };
  }

  // Exactly 1 full calendar year from admission date
  const oneYearLater = new Date(dt);
  oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);

  // Exact calendar days spanned (366 if leap year, 365 otherwise)
  const totalDays = Math.round(
    (oneYearLater.getTime() - dt.getTime()) / (1000 * 60 * 60 * 24)
  );
  const isLeapYear = totalDays === 366;

  const now = Date.now();
  const elapsedDays = Math.floor((now - dt.getTime()) / (1000 * 60 * 60 * 24));
  const videoDaysLeft = Math.max(
    0,
    Math.ceil((oneYearLater.getTime() - now) / (1000 * 60 * 60 * 24))
  );
  const isVideoExpired = now >= oneYearLater.getTime() || videoDaysLeft <= 0;

  return {
    totalDays, // 365 or 366
    isLeapYear,
    videoExpiryDate: oneYearLater.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    videoDaysLeft,
    isVideoExpired,
    hasVideoAccess: !isVideoExpired && videoDaysLeft > 0,
    elapsedDays,
  };
};

/**
 * Calculates Schedule Validity:
 * The live batch timetable and upcoming modules are shown strictly till the enrolled
 * program's time-period completes (derived dynamically from the CRM program duration,
 * batch end date, or official program curriculum definition).
 *
 * @param {Object} studentData
 * @param {Object} source
 * @param {Object} user
 * @returns {Object} Schedule validity calculation results
 */
export const calculateScheduleValidity = (studentData, source = {}, user = {}) => {
  const course = studentData?.course || source?.course || user?.course || "";
  const courseLower = course.toLowerCase();

  // 1. Dynamically read program duration from CRM source / student record
  const rawDuration =
    source.courseDuration ||
    source.course_duration ||
    source.duration ||
    source.batch_duration ||
    user?.courseDuration ||
    user?.course_duration ||
    null;

  let durationMonths = null;

  if (rawDuration) {
    const durStr = String(rawDuration).toLowerCase().trim();
    if (durStr.includes("year")) {
      const yrs = parseInt(durStr.replace(/[^0-9]/g, ""), 10) || 1;
      durationMonths = yrs * 12;
    } else if (durStr.includes("month")) {
      const m = parseInt(durStr.replace(/[^0-9]/g, ""), 10);
      if (!isNaN(m) && m > 0) durationMonths = m;
    } else if (durStr.includes("day")) {
      const d = parseInt(durStr.replace(/[^0-9]/g, ""), 10);
      if (!isNaN(d) && d > 0) durationMonths = Math.max(1, Math.round(d / 30));
    } else if (durStr.includes("week")) {
      const w = parseInt(durStr.replace(/[^0-9]/g, ""), 10);
      if (!isNaN(w) && w > 0) durationMonths = Math.max(1, Math.round((w * 7) / 30));
    } else {
      const num = parseInt(durStr.replace(/[^0-9]/g, ""), 10);
      if (!isNaN(num) && num > 0) durationMonths = num;
    }
  }

  // 2. If duration not explicitly defined on student record, derive from enrolled Program Curriculum
  if (!durationMonths) {
    if (courseLower.includes("master")) {
      durationMonths = 12; // Master's Program (12 Months / 120 hrs)
    } else if (
      courseLower.includes("adv diploma") ||
      courseLower.includes("advanced diploma")
    ) {
      durationMonths = 9; // Advanced Diploma in Digital Marketing (9 Months / 90 hrs)
    } else if (courseLower.includes("diploma")) {
      durationMonths = 6; // Diploma in Digital Marketing (6 Months / 60 hrs)
    } else if (
      courseLower.includes("crash") ||
      courseLower.includes("short") ||
      courseLower.includes("certif") ||
      courseLower.includes("2 month") ||
      courseLower.includes("fast")
    ) {
      durationMonths = 2; // Short-term / Certification Program (2 Months)
    } else if (courseLower.includes("3 month")) {
      durationMonths = 3; // 3-Month Fast Track Program
    } else {
      durationMonths = 6; // Standard default program duration
    }
  }

  // Course / Batch start date
  const rawStart =
    source.courseStart ||
    source.batchStartDate ||
    source.batch_start_date ||
    source.submission_time ||
    source.admission_date ||
    source.admissionDate ||
    source.registration_date ||
    user?.admissionDate ||
    null;

  let startDt = null;
  if (rawStart && rawStart !== "Not Assigned") {
    startDt = new Date(rawStart);
    if (isNaN(startDt.getTime())) {
      const parts = String(rawStart).split(/[-/\s]/);
      if (parts.length === 3) {
        if (parts[0].length === 4) {
          startDt = new Date(parts[0], parseInt(parts[1], 10) - 1, parts[2]);
        } else if (parts[2].length === 4) {
          startDt = new Date(parts[2], parseInt(parts[1], 10) - 1, parts[0]);
        }
      }
    }
  }

  // 3. Exact batch end date from CRM database (if set by coordinator/faculty)
  const rawEnd =
    source.courseEnd ||
    source.course_end ||
    source.batch_end_date ||
    source.batchEndDate ||
    user?.courseEnd ||
    null;

  let endDt = null;
  if (rawEnd && rawEnd !== "Not Assigned") {
    const parsedEnd = new Date(rawEnd);
    if (!isNaN(parsedEnd.getTime())) {
      endDt = parsedEnd;
      // If both start and end dates are specified in CRM, derive exact months
      if (startDt && !isNaN(startDt.getTime()) && endDt.getTime() > startDt.getTime()) {
        const diffDays = (endDt.getTime() - startDt.getTime()) / (1000 * 60 * 60 * 24);
        durationMonths = Math.max(1, Math.round(diffDays / 30));
      }
    }
  }

  // Fallback to startDt + durationMonths if no explicit batch end date
  if (!endDt && startDt && !isNaN(startDt.getTime())) {
    endDt = new Date(startDt);
    endDt.setMonth(endDt.getMonth() + durationMonths);
  }

  const now = Date.now();
  let scheduleDaysLeft = 0;
  let isScheduleExpired = false;

  if (endDt && !isNaN(endDt.getTime())) {
    const diffMs = endDt.getTime() - now;
    scheduleDaysLeft = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
    isScheduleExpired = now >= endDt.getTime() || scheduleDaysLeft <= 0;
  } else {
    // If dates unavailable, check explicit daysLeft from source
    const rawDays =
      source.daysLeft ?? source.days_left ?? user?.daysLeft ?? user?.days_left;
    if (rawDays !== undefined && rawDays !== null) {
      const p = parseInt(rawDays, 10);
      if (!isNaN(p)) {
        scheduleDaysLeft = Math.max(0, p);
        isScheduleExpired = scheduleDaysLeft <= 0;
      }
    }
  }

  return {
    durationMonths,
    courseDuration: `${durationMonths} Months`,
    scheduleStartDate:
      startDt && !isNaN(startDt.getTime())
        ? startDt.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : "Not Assigned",
    scheduleEndDate:
      endDt && !isNaN(endDt.getTime())
        ? endDt.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : "Not Assigned",
    scheduleDaysLeft,
    isScheduleExpired,
    hasScheduleAccess:
      !isScheduleExpired && Boolean(studentData?.hasAssignedBatch),
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
  const studentId = formatAdmissionNo(source.admissionNo || user?.admissionNo || rawId);
  const numericId = studentId || (numOnly ? `#${numOnly}` : "");
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

  // 1. VIDEO VALIDITY: 365 Days (366 if leap year) Universal Video Access
  const videoValidity = calculateVideoValidity(rawAdmission);

  // 2. SCHEDULE VALIDITY: Live Batch Timetable & Upcoming Modules (Course Duration: 2 / 3 / 6 / 9 / 12 Months)
  const scheduleValidity = calculateScheduleValidity(
    { course, hasAssignedBatch },
    source,
    user
  );

  const courseDuration = scheduleValidity.courseDuration;
  const courseStart = scheduleValidity.scheduleStartDate;
  const courseEnd = scheduleValidity.scheduleEndDate;
  const scheduleDaysLeft = scheduleValidity.scheduleDaysLeft;
  const isScheduleExpired = scheduleValidity.isScheduleExpired;
  const daysLeft = videoValidity.videoDaysLeft; // Universal 365-day video access countdown

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
    // Two distinct validity types:
    // 1. Video validity (365/366 days universal from admission date)
    videoDaysLeft: videoValidity.videoDaysLeft,
    videoExpiryDate: videoValidity.videoExpiryDate,
    videoTotalDays: videoValidity.totalDays,
    isLeapYear: videoValidity.isLeapYear,
    isVideoExpired: videoValidity.isVideoExpired,
    hasVideoAccess: videoValidity.hasVideoAccess,
    // 2. Schedule validity (course duration 2/3/6/9/12 months)
    scheduleDaysLeft,
    scheduleStartDate: courseStart,
    scheduleEndDate: courseEnd,
    isScheduleExpired,
    hasScheduleAccess: !isScheduleExpired && hasAssignedBatch,
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
 * Validates two distinct validity types:
 * 1. Schedule Validity (Batch Timetable & Upcoming Modules):
 *    Strictly valid till the course time-period (e.g. 2 / 3 / 6 / 9 / 12 months).
 *    Once completed, only timetable & upcoming modules are blocked.
 * 2. Video Lecture Validity:
 *    Universally valid for 365 days (366 days in leap year) from admission/registration,
 *    IRRESPECTIVE of when the batch/course completes. Videos remain 100% unlocked for the entire year.
 */
export const checkStudentCourseAccess = (crm, user, isAdmin = false) => {
  const studentData = mapStudentDataFromCrm(crm, user);

  const rawAdmission =
    crm?.submission_time ||
    crm?.admission_date ||
    crm?.admissionDate ||
    crm?.registration_date ||
    crm?.registrationDate ||
    user?.submission_time ||
    user?.admission_date ||
    user?.admissionDate ||
    user?.registration_date ||
    null;

  // 1. Video Validity (365 / 366 days universal rule)
  const videoValidity = calculateVideoValidity(rawAdmission);

  // 2. Schedule Validity (course duration: 2 / 3 / 6 / 9 / 12 months)
  const scheduleValidity = calculateScheduleValidity(studentData, crm, user);

  if (isAdmin) {
    return {
      hasAccess: true,
      hasVideoAccess: true,
      isVideoExpired: false,
      videoDaysLeft: videoValidity.videoDaysLeft,
      videoExpiryDate: videoValidity.videoExpiryDate,
      videoTotalDays: videoValidity.totalDays,
      isLeapYear: videoValidity.isLeapYear,

      hasScheduleAccess: true,
      isScheduleExpired: false,
      scheduleDaysLeft: scheduleValidity.scheduleDaysLeft,
      scheduleEndDate: scheduleValidity.scheduleEndDate,
      courseDuration: scheduleValidity.courseDuration,

      isExpired: false,
      daysLeft: videoValidity.videoDaysLeft,
      hasAssignedBatch: true,
      courseEnd: scheduleValidity.scheduleEndDate,
      batch: studentData.batch,
      studentName: studentData.name,
      facultyLead: studentData.facultyLead,
      center: studentData.center,
    };
  }

  return {
    // 1. Universal Video Lecture Access (365 / 366 days rule from admission)
    hasAccess: videoValidity.hasVideoAccess,
    hasVideoAccess: videoValidity.hasVideoAccess,
    isVideoExpired: videoValidity.isVideoExpired,
    videoDaysLeft: videoValidity.videoDaysLeft,
    videoExpiryDate: videoValidity.videoExpiryDate,
    videoTotalDays: videoValidity.totalDays,
    isLeapYear: videoValidity.isLeapYear,

    // 2. Live Batch Timetable & Upcoming Modules Access (2 / 3 / 6 / 9 / 12 months)
    hasScheduleAccess: scheduleValidity.hasScheduleAccess,
    isScheduleExpired: scheduleValidity.isScheduleExpired,
    scheduleDaysLeft: scheduleValidity.scheduleDaysLeft,
    scheduleEndDate: scheduleValidity.scheduleEndDate,
    courseDuration: scheduleValidity.courseDuration,

    // Legacy / Unified mappings:
    // In video contexts, isExpired strictly tracks video validity (365 days rule)
    isExpired: videoValidity.isVideoExpired,
    daysLeft: videoValidity.videoDaysLeft,

    hasAssignedBatch: studentData.hasAssignedBatch,
    courseEnd: scheduleValidity.scheduleEndDate,
    batch: studentData.batch,
    studentName: studentData.name,
    facultyLead: studentData.facultyLead,
    center: studentData.center,
  };
};
