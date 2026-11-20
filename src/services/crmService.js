
import { formatAdmissionNo } from "../utils/admissionUtils";
import { getDeviceId, getDeviceType, getDeviceName, setSessionToken } from "../utils/deviceUtils";

/**
 * Operating Media LMS - CRM Integration Service
 * Connects directly to Operating Media CRM API (https://crm.dmsoi.org/api)
 * Provides:
 *  1. Student Profile & Uploaded Photograph (data.photo)
 *  2. Fees Management (Total / Paid / Balance Due / Installments / Receipts)
 *  3. Attendance & Attendance Graph Trends (Present / Absent / Lectures / Recharts data)
 *  4. Batch Schedules & Roadmap
 *  5. Verified Student Certificates & Credentials
 */

export const CRM_BASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_CRM_API_URL) ||
  (typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname === "::1")
    ? "https://crm.dmsoi.org/api"
    : "https://operatingmedia.org/api");
const CRM_STORAGE_KEY_STUDENT_ID = "om_lms_selected_crm_student_id";

// Default Student Profile Fallback (Clean empty schema)
export const DEFAULT_CRM_PROFILE = {
  id: null,
  admissionNo: "",
  name: "",
  fullName: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  mobile: "",
  dob: "",
  gender: "",
  maritalStatus: "",
  branch: "",
  center: "",
  course: "",
  batchName: "",
  batchCode: "",
  admissionDate: "",
  registrationDate: "",
  joiningDate: "",
  courseEnd: "",
  daysLeft: 0,
  facultyLead: "",
  facultyLeadRole: "",
  photo: null,
  avatar: null,
  totalFees: 0,
  regAmount: 0,
  refundAmount: 0,
  totalPaid: 0,
  balanceDue: 0,
  paidPercentage: 0,
  paymentStatus: "Verified",
  nextDueDate: "",
  nextDueAmount: 0,
  installments: [],
  courseChangeHistory: [],
};

// Default Attendance Data Fallback
export const DEFAULT_CRM_ATTENDANCE = {
  studentId: null,
  studentName: "",
  course: "",
  totalLectures: 0,
  presentCount: 0,
  absentCount: 0,
  attendancePercentage: 0,
  standing: {
    label: "Active Standing",
    class: "status-excellent",
    icon: "🟢",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
  },
  monthlyTrend: [],
  recentLectures: [],
  logs: [],
};

// Default Batch & Schedule Fallback
export const DEFAULT_CRM_BATCH = {
  batchName: "",
  batchCode: "",
  timing: "",
  frequency: "",
  branch: "",
  classroom: "",
  faculty: "",
  status: "",
  currentTopic: "",
  currentDateRange: "",
  upcomingSchedule: [],
};

// Default Certificates Fallback
export const DEFAULT_CRM_CERTIFICATES = [];

class CrmService {
  constructor() {
    this.cachedProfile = null;
    this.cachedAttendance = null;
    this.cachedBatches = null;
    this.cachedCertificates = null;
  }

  getSelectedStudentId() {
    try {
      const saved = localStorage.getItem(CRM_STORAGE_KEY_STUDENT_ID);
      return saved ? parseInt(saved, 10) : null;
    } catch {
      return null;
    }
  }

  setSelectedStudentId(id) {
    try {
      if (id) {
        localStorage.setItem(CRM_STORAGE_KEY_STUDENT_ID, String(id));
      } else {
        localStorage.removeItem(CRM_STORAGE_KEY_STUDENT_ID);
      }
    } catch (e) {
      console.warn("Could not save selected CRM student id", e);
    }
  }

  /**
   * Fetch all registered students from CRM admissions
   */
  async getAvailableStudents() {
    try {
      const res = await fetch(
        `${CRM_BASE_URL}/admissions/manage/?page=1&size=20`,
        {
          headers: { Accept: "application/json" },
        },
      );
      if (res.ok) {
        const json = await res.json();
        if (json?.admissions && json.admissions.length > 0) {
          return json.admissions.map((a) => ({
            id: a.id,
            name: a.name,
            course: a.course,
            branch: a.branch,
            phone: a.phone,
          }));
        }
      }
    } catch (err) {
      console.warn(
        "CRM API getAvailableStudents error, using local registry",
        err,
      );
    }

    // Default fallback student list (empty if network unavailable)
    return [];
  }

  /**
   * Fetch complete student profile including uploaded photograph and fee breakdown
   */
  async getStudentProfile(admissionId = this.getSelectedStudentId()) {
    if (!admissionId) return null;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const res = await fetch(`${CRM_BASE_URL}/admissions/${admissionId}/`, {
        headers: { Accept: "application/json" },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const d = await res.json();
        const totalFees = parseFloat(d.total_fees) || 0;
        const regAmount = parseFloat(d.registration_amount) || 0;
        const refundAmount = parseFloat(d.refund_amount) || 0;

        const isDiploma = (d.course || "").toLowerCase().includes("diploma");
        const courseDuration = isDiploma ? "6 Months" : "12 Months";
        const validityMonths = isDiploma ? 6 : 12;

        const rawAdmission =
          d.submission_time || d.admission_date || d.registration_date || null;
        const admissionDateStr = rawAdmission
          ? this.formatDate(rawAdmission)
          : "09 Mar 2026";
        const registrationDateStr = d.registration_date
          ? this.formatDate(d.registration_date)
          : admissionDateStr;

        const rawBatchName = d.batch_name || d.batch || "";
        const isOnlineBatch =
          rawBatchName.toLowerCase().includes("online") ||
          (d.branch || "").toLowerCase().includes("online");
        const hasBatch = Boolean(
          rawBatchName &&
          rawBatchName.trim().length > 0 &&
          rawBatchName !== "WD-M1" &&
          !rawBatchName.toLowerCase().includes("not assigned")
        );
        const batchName = hasBatch
          ? rawBatchName.trim()
          : isOnlineBatch
            ? "Online Batch"
            : null;

        let courseStartStr = rawAdmission
          ? this.formatDate(rawAdmission)
          : admissionDateStr;
        if (d.batch_start_date && !isOnlineBatch) {
          courseStartStr = this.formatDate(d.batch_start_date);
        }

        let courseEndStr = "Not Assigned";
        let daysLeft = 0;

        // Parse Admission Date to determine elapsed validity for ALL students (Online and Offline)
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

        if (admissionDt && !isNaN(admissionDt.getTime())) {
          const now = Date.now();
          const elapsedDays = Math.floor((now - admissionDt.getTime()) / (1000 * 60 * 60 * 24));
          const maxAllowedDays = isDiploma ? 180 : 365;

          const endDt = new Date(admissionDt);
          endDt.setMonth(endDt.getMonth() + validityMonths);
          courseEndStr = endDt.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          });

          // 2ND CONDITION: IF ADMISSION DATE OVER 1 YEAR (or Diploma over 6 months) -> strictly 0 days left
          if (elapsedDays >= maxAllowedDays || now >= endDt.getTime()) {
            daysLeft = 0;
          } else {
            const diffMs = endDt.getTime() - now;
            daysLeft = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
          }
        } else {
          // If explicit daysLeft provided
          if (typeof d.daysLeft === "number") {
            daysLeft = Math.max(0, d.daysLeft);
          } else {
            daysLeft = 0;
          }
        }

        const installments = [];
        let totalInstallmentsPaid = 0;
        let nextDueDate = "";
        let nextDueAmount = 0;

        const maxInst = parseInt(d.no_of_installments, 10) || 3;
        for (let i = 1; i <= Math.max(maxInst, 3); i++) {
          const amt = parseFloat(d[`inst_${i}_amount`]) || 0;
          const status = d[`inst_${i}_status`] || "Unpaid";
          const date = d[`inst_${i}_date`] || "";

          if (amt > 0 || i <= maxInst) {
            const isPaid = status === "Paid" || status === "PAID";
            if (isPaid) {
              totalInstallmentsPaid += amt;
            } else if (!nextDueDate && amt > 0) {
              nextDueDate = date ? this.formatDate(date) : "Upcoming";
              nextDueAmount = amt;
            }

            const formattedDate = date
              ? this.formatDate(date)
              : "Pending Schedule";
            let isOverdue = false;
            if (!isPaid && date) {
              try {
                const dueDateObj = new Date(date);
                if (!isNaN(dueDateObj.getTime()) && dueDateObj < new Date()) {
                  isOverdue = true;
                }
              } catch (e) {}
            }

            installments.push({
              id: `inst-${i}`,
              number: i,
              title: `Installment ${i}`,
              amount: amt,
              status: isPaid ? "PAID" : "UNPAID",
              dueDate: formattedDate,
              date: formattedDate,
              mode:
                d[`inst_${i}_mode`] ||
                (isPaid ? "Verified Payment" : "Pending"),
              isOverdue,
            });
          }
        }

        const effectivePaid = regAmount + totalInstallmentsPaid - refundAmount;
        const balanceDue = Math.max(0, totalFees - effectivePaid);
        const paidPercentage =
          totalFees > 0
            ? Math.round((effectivePaid / totalFees) * 1000) / 10
            : 0;
        const addressCombined =
          [d.address1, d.address2].filter(Boolean).join(", ") || "";

        const profile = {
          id: d.id,
          admissionNo: formatAdmissionNo(d.admission_no || d.id),
          name: `${d.first_name} ${d.last_name || ""}`.trim(),
          fullName:
            `${d.first_name} ${d.middle_name ? d.middle_name + " " : ""}${d.last_name || ""}`.trim(),
          firstName: d.first_name,
          middleName: d.middle_name || "",
          lastName: d.last_name || "",
          email: d.email || "student@operatingmedia.com",
          phone: d.phone ? this.formatPhoneNumber(d.phone) : "+91 98765 43210",
          mobile: d.phone ? this.formatPhoneNumber(d.phone) : "+91 98765 43210",
          branch: d.branch ? `${d.branch} Center` : "Andheri Center",
          center: d.branch ? `${d.branch} Center` : "Andheri Center",
          course: d.course || "Diploma in Digital Marketing",
          batchName: batchName,
          batchCode: batchName,
          hasAssignedBatch: hasBatch,
          courseStart: courseStartStr,
          courseEnd: courseEndStr,
          daysLeft: daysLeft,
          batchTiming: d.batch_timing || d.timing || null,
          joiningDate: d.submission_time || "2026-03-09",
          admissionDate: admissionDateStr,
          registrationDate: registrationDateStr,
          dob: d.dob ? this.formatDate(d.dob) : "25 Jun 1994",
          gender: d.gender || "Male",
          maritalStatus: d.status || d.marital_status || "Single",
          employedStatus: d.employed_status || "Employed",
          organization: d.organization || "",
          address:
            addressCombined ||
            "Pawar Chawl Kadam wadi Marol Pipeline Andheri E",
          city: d.city || "Mumbai",
          state: d.state || "Maharashtra",
          pincode: d.pincode || "400059",
          country: d.country || "India",
          emergencyName: d.emergency_name || "",
          emergencyPhone: d.emergency_phone
            ? this.formatPhoneNumber(d.emergency_phone)
            : "",
          counsellor: d.counsellor || "",
          facultyLead: (() => {
            const bStr = `${d.branch || ""} ${d.course || ""}`.toLowerCase();
            return bStr.includes("andheri") || bStr.includes("ddm-a1")
              ? "Nilkamal Mukharjee"
              : "Rahul Shende";
          })(),
          facultyLeadRole: (() => {
            const bStr = `${d.branch || ""} ${d.course || ""}`.toLowerCase();
            return bStr.includes("andheri") || bStr.includes("ddm-a1")
              ? "Lead Faculty - Andheri Center"
              : "Lead Faculty - Borivali Center";
          })(),
          courseDuration,
          courseStart: admissionDateStr,
          courseEnd: courseEndStr,
          daysLeft,
          photo: (() => {
            if (
              d.photo &&
              typeof d.photo === "string" &&
              d.photo.trim().length > 0
            ) {
              const raw = d.photo.trim();
              if (
                raw.startsWith("data:image") ||
                raw.startsWith("http://") ||
                raw.startsWith("https://")
              ) {
                return raw;
              } else if (raw.startsWith("/media") || raw.startsWith("media/")) {
                const mediaHost = CRM_BASE_URL.replace(/\/api\/?$/, ''); return `${mediaHost}${raw.startsWith('/') ? '' : '/'}${raw}`;
              }
              return raw;
            }
            return null;
          })(),
          avatar: (() => {
            if (
              d.photo &&
              typeof d.photo === "string" &&
              d.photo.trim().length > 0
            ) {
              const raw = d.photo.trim();
              if (
                raw.startsWith("data:image") ||
                raw.startsWith("http://") ||
                raw.startsWith("https://")
              ) {
                return raw;
              } else if (raw.startsWith("/media") || raw.startsWith("media/")) {
                const mediaHost = CRM_BASE_URL.replace(/\/api\/?$/, ''); return `${mediaHost}${raw.startsWith('/') ? '' : '/'}${raw}`;
              }
              return raw;
            }
            return null;
          })(),
          aadharFront: d.aadhar_card_front || null,
          aadharBack: d.aadhar_card_back || null,
          courseHistoryRaw: d.course_history || "",
          totalFees,
          regAmount,
          refundAmount,
          totalPaid: effectivePaid,
          balanceDue,
          paidPercentage,
          feesClearedPercent: paidPercentage,
          paymentStatus:
            balanceDue <= 0
              ? "Fully Cleared"
              : effectivePaid > 0
                ? "Partial Due"
                : "Unpaid",
          nextDueDate:
            nextDueDate ||
            installments.find((i) => i.status === "UNPAID")?.dueDate ||
            "Upcoming",
          nextDueAmount: nextDueAmount || balanceDue,
          installments: [
            {
              id: "inst-0",
              number: 0,
              title: "Registration Fee",
              amount: regAmount,
              status: regAmount > 0 ? "PAID" : "UNPAID",
              dueDate: registrationDateStr,
              date: registrationDateStr,
              mode: d.registration_mode || "Registration",
              isOverdue: false,
            },
            ...installments,
          ],
        };

        this.cachedProfile = profile;
        try {
          localStorage.setItem(
            "om_lms_crm_cached_profile",
            JSON.stringify(profile),
          );
          if (profile.photo) {
            localStorage.setItem("om_lms_student_avatar", profile.photo);
          }
        } catch (e) {}
        return profile;
      }
    } catch (err) {
      console.warn(
        "Failed to fetch profile from CRM, using polished profile fallback",
        err,
      );
    }

    if (this.cachedProfile) {
      return this.cachedProfile;
    }

    return null;
  }

  /**
   * Fetch attendance stats and monthly graph trends
   */
  async getStudentAttendance(studentId = this.getSelectedStudentId()) {
    if (!studentId) return null;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const res = await fetch(
        `${CRM_BASE_URL}/students/${studentId}/attendance/`,
        {
          headers: { Accept: "application/json" },
          signal: controller.signal,
        },
      );
      clearTimeout(timeoutId);

      if (res.ok) {
        const d = await res.json();
        const logs = d.logs || [];

        // Real counts directly from CRM attendance chart
        const total = d.total_lectures !== undefined ? d.total_lectures : logs.length;
        const present =
          d.present_count !== undefined
            ? d.present_count
            : logs.filter((l) => l.status === "PRESENT").length;
        const absent =
          d.absent_count !== undefined
            ? d.absent_count
            : logs.filter((l) => l.status !== "PRESENT").length;

        let pct = d.attendance_percentage;
        if (pct === undefined || pct === null) {
          pct = total > 0 ? Math.round((present / total) * 1000) / 10 : 0;
        }
        pct = Math.min(100, Math.max(0, pct));

        const standing = this.getAttendanceStanding(pct);

        const normalBatches = d.training_chart?.normal_batches || [];
        const masterBatches = d.training_chart?.master_batches || [];
        const enrolledBatches = Array.from(new Set([...normalBatches, ...masterBatches].filter(Boolean)));
        const hasEnrolledBatch = enrolledBatches.length > 0;

        const attendance = {
          studentId: d.student_id || studentId,
          enrolledBatches,
          hasEnrolledBatch,
          primaryBatchName: enrolledBatches[0] || null,
          studentName: d.student_name || "Student",
          course:
            d.course !== "N/A" && d.course
              ? d.course
              : "",
          totalLectures: total,
          presentCount: present,
          absentCount: absent,
          attendancePercentage: pct,
          standing,
          logs: logs,
        };

        this.cachedAttendance = attendance;
        return attendance;
      }
    } catch (err) {
      console.warn("Failed to fetch attendance from CRM, using fallback", err);
    }

    return DEFAULT_CRM_ATTENDANCE;
  }

  /**
   * Fetch batch schedule from CRM roadmap
   */
  async getBatchSchedule(branch = "Andheri") {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const res = await fetch(`${CRM_BASE_URL}/batch-schedules/`, {
        headers: { Accept: "application/json" },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        const branchData = data[branch] || data["Andheri"] || {};
        const timings = Object.keys(branchData);

        const scheduleList = [];
        timings.forEach((timing) => {
          const rows = branchData[timing] || [];
          rows.forEach((r) => {
            scheduleList.push({
              id: r.id,
              topic: r.topic,
              batch_timing: r.batch_timing || timing,
              date_range: r.date_range,
              branch,
              highlight: r.highlight || 0,
              badge: r.highlight ? "Priority Track" : "Scheduled",
            });
          });
        });

        if (scheduleList.length > 0) {
          const activeItem =
            scheduleList.find((s) => s.highlight) || scheduleList[0];
          return {
            ...DEFAULT_CRM_BATCH,
            timing: activeItem.batch_timing || "",
            currentTopic: activeItem.topic || "",
            currentDateRange: activeItem.date_range || "",
            upcomingSchedule: scheduleList.slice(0, 5),
          };
        }
      }
    } catch (err) {
      console.warn(
        "Failed to fetch batch schedule from CRM",
        err,
      );
    }

    return null;
  }

  /**
   * Fetch verified certificates from CRM
   */
  async getCertificates(studentName = "") {
    if (!studentName) return [];
    return DEFAULT_CRM_CERTIFICATES.map((c) => ({
      ...c,
      name: studentName || c.name,
    }));
  }

  getAttendanceStanding(pct) {
    if (pct >= 85) {
      return {
        label: "Excellent Standing",
        class: "status-excellent",
        icon: "🟢",
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        border: "border-emerald-200",
        dot: "bg-emerald-500",
      };
    }
    if (pct >= 75) {
      return {
        label: "Good Standing",
        class: "status-good",
        icon: "🟢",
        bg: "bg-blue-50",
        text: "text-blue-700",
        border: "border-blue-200",
        dot: "bg-blue-500",
      };
    }
    if (pct >= 60) {
      return {
        label: "Needs Attention",
        class: "status-warning",
        icon: "🟡",
        bg: "bg-amber-50",
        text: "text-amber-700",
        border: "border-amber-200",
        dot: "bg-amber-500",
      };
    }
    return {
      label: "Low Attendance Alert",
      class: "status-critical",
      icon: "🔴",
      bg: "bg-rose-50",
      text: "text-rose-700",
      border: "border-rose-200",
      dot: "bg-rose-500",
    };
  }

  formatDate(dateStr) {
    if (!dateStr || dateStr === "—") return "—";
    const parts = String(dateStr).split(/[-/\s]/);
    if (parts.length === 3) {
      let d, m, y;
      if (parts[0].length === 4) {
        y = parts[0];
        m = parts[1];
        d = parts[2];
      } else if (parts[2].length === 4) {
        d = parts[0];
        m = parts[1];
        y = parts[2];
      }
      if (d && m && y) {
        const dt = new Date(y, parseInt(m, 10) - 1, d);
        if (!isNaN(dt.getTime())) {
          return dt.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          });
        }
      }
    }
    return dateStr;
  }

  formatPhoneNumber(raw) {
    if (!raw) return "—";
    const s = String(raw).trim();
    if (s.startsWith("+91")) return s;
    if (s.startsWith("91") && s.length === 12)
      return `+91 ${s.slice(2, 7)} ${s.slice(7)}`;
    if (s.length === 10) return `+91 ${s.slice(0, 5)} ${s.slice(5)}`;
    return s;
  }

  /**
   * Authenticate student with CRM database via login_id/email and password
   */
  async studentLogin(loginId, password, options = {}) {
    const trimmedLogin = String(loginId || "").trim();
    const trimmedPass = String(password || "").trim();

    if (!trimmedLogin || !trimmedPass) {
      throw new Error("Please enter your LMS Login ID and password.");
    }

    const deviceType = options.deviceType || getDeviceType();
    const deviceId = options.deviceId || getDeviceId();
    const deviceName = options.deviceName || getDeviceName();

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const res = await fetch(`${CRM_BASE_URL}/lms/student-login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          login_id: trimmedLogin,
          password: trimmedPass,
          device_type: deviceType,
          device_id: deviceId,
          device_name: deviceName,
          force_kick_previous: Boolean(options.forceKickPrevious),
          conflict_token: options.conflictToken || "",
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      const cType = res.headers.get("content-type") || "";
      if (cType.includes("application/json")) {
        const data = await res.json();
        // Check Option B device conflict
        if (data?.device_conflict) {
          return {
            deviceConflict: true,
            deviceType: data.device_type || deviceType,
            activeDevice: data.active_device || {},
            conflictToken: data.conflict_token || "",
            message: data.message || "Active session detected on another device.",
          };
        }

        if (data?.success && data?.student) {
          if (data.session_token) {
            setSessionToken(data.session_token);
          }
          this.setSelectedStudentId(data.student.id);
          return {
            ...data.student,
            sessionToken: data.session_token,
          };
        }

        if (data?.error) {
          throw new Error(data.error);
        }
      }
    } catch (err) {
      if (
        err.message &&
        !err.message.includes("fetch") &&
        !err.message.includes("abort") &&
        !err.message.includes("token") &&
        !err.message.includes("JSON") &&
        !err.message.includes("<")
      ) {
        throw err;
      }
      console.warn(
        "LMS student-login API unavailable or returned non-JSON, using direct CRM verification",
      );
    }

    // 2. Dynamic CRM database check (supports ANY student in db_dmsoi_separate)
    try {
      const searchKeyword = trimmedLogin.includes("@")
        ? trimmedLogin.split("@")[0]
        : trimmedLogin;
      const searchRes = await fetch(
        `${CRM_BASE_URL}/admissions/manage/?search=${encodeURIComponent(searchKeyword)}&size=10`,
        {
          headers: { Accept: "application/json" },
        },
      );

      if (searchRes.ok) {
        const searchData = await searchRes.json();
        const admissions = searchData?.admissions || [];

        for (const candidate of admissions) {
          try {
            const detailRes = await fetch(
              `${CRM_BASE_URL}/admissions/${candidate.id}/`,
              {
                headers: { Accept: "application/json" },
              },
            );
            if (detailRes.ok) {
              const d = await detailRes.json();
              const candLogin = (d.login_id || d.email || "")
                .trim()
                .toLowerCase();
              const candEmail = (d.email || "").trim().toLowerCase();
              const userLogin = trimmedLogin.toLowerCase();

              const isLoginMatch =
                candLogin === userLogin || candEmail === userLogin;
              const isPassMatch = (d.password || "").trim() === trimmedPass;

              if (isLoginMatch && isPassMatch) {
                const profile = await this.getStudentProfile(candidate.id);
                this.setSelectedStudentId(candidate.id);
                return {
                  id: candidate.id,
                  crmAdmissionId: candidate.id,
                  admissionNo:
                    formatAdmissionNo(profile?.admissionNo || candidate.id),
                  name: profile?.name || candidate.name,
                  fullName: profile?.fullName || candidate.name,
                  firstName: profile?.firstName || candidate.name.split(" ")[0],
                  lastName:
                    profile?.lastName ||
                    candidate.name.split(" ").slice(1).join(" "),
                  email: d.email || trimmedLogin,
                  loginId: d.login_id || trimmedLogin,
                  phone: profile?.phone || candidate.phone,
                  course: profile?.course || candidate.course,
                  branch: profile?.branch || candidate.branch,
                  center: profile?.center || candidate.branch,
                  batchCode: profile?.batchCode || candidate.course,
                  batchName: profile?.batchName || candidate.course,
                  totalFees: profile?.totalFees || 0,
                  photo: profile?.photo || null,
                  role: "STUDENT",
                  roleLabel: "STUDENT",
                  designation: `${candidate.course || "Digital Marketing"} Student`,
                };
              }
            }
          } catch (e) {
            // continue checking next candidate
          }
        }
      }
    } catch (searchErr) {
      console.warn("Dynamic admissions search check:", searchErr);
    }

    throw new Error(
      "Invalid student credentials. Please verify your login ID and password.",
    );
  }
}

export const crmService = new CrmService();
