import React, { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { FeeReceiptModal } from "../components/crm/FeeReceiptModal";
import { lmsService } from "../services/lmsService";
import {
  ProfileHeader,
  ProfileOverviewSection,
  ProfileAttendanceFeesSection,
  ProfileCourseHistorySection,
  AdminProfileView,
  mapStudentDataFromCrm,
} from "../components/profile";

/**
 * ProfilePage: Modular, component-based student and administrator profile page.
 */
export const ProfilePage = () => {
  const { currentUser, isAdmin, crmProfile, crmAttendance } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Active Tab state: 'overview' | 'attendance' | 'history'
  const [activeTab, setActiveTab] = useState(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "attendance") return "attendance";
    if (tabParam === "history") return "history";
    return "overview";
  });

  const isProgrammaticScrollRef = useRef(false);
  const programmaticScrollTimerRef = useRef(null);

  // Smooth scroll and search params sync when tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    isProgrammaticScrollRef.current = true;
    if (programmaticScrollTimerRef.current) {
      clearTimeout(programmaticScrollTimerRef.current);
    }
    programmaticScrollTimerRef.current = setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 700);

    if (tab === "overview") {
      setSearchParams({});
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setSearchParams({ tab });
      const targetMap = {
        attendance: "section-attendance-fees",
        history: "section-course-history",
      };
      const elemId = targetMap[tab];
      if (elemId) {
        const el = document.getElementById(elemId);
        if (el) {
          const yOffset = -70;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }
    }
  };

  // Scroll to section when tab query parameter is provided on mount or route update
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam && tabParam !== "overview") {
      const targetMap = {
        attendance: "section-attendance-fees",
        history: "section-course-history",
      };
      const elemId = targetMap[tabParam];
      if (elemId) {
        const timer = setTimeout(() => {
          const el = document.getElementById(elemId);
          if (el) {
            const yOffset = -70;
            const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, [searchParams]);

  // Synchronize active tab highlight based on current scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (isProgrammaticScrollRef.current) return;

      // Bottom of page check
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 60;
      if (atBottom) {
        setActiveTab("history");
        return;
      }

      const targetY = 140;

      // 1. Check Course History
      const histEl = document.getElementById("section-course-history");
      if (histEl && histEl.getBoundingClientRect().top <= targetY) {
        setActiveTab("history");
        return;
      }

      // 2. Check Attendance & Fees
      const attEl = document.getElementById("section-attendance-fees");
      if (attEl && attEl.getBoundingClientRect().top <= targetY) {
        setActiveTab("attendance");
        return;
      }

      setActiveTab("overview");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Student Profile State (dynamically populated from CRM records)
  const [studentData, setStudentData] = useState(() =>
    mapStudentDataFromCrm(crmProfile, currentUser)
  );

  useEffect(() => {
    if (crmProfile || currentUser) {
      setStudentData((prev) => {
        const next = mapStudentDataFromCrm(crmProfile, currentUser);
        return { ...prev, ...next };
      });
    }
  }, [crmProfile, currentUser]);

  // Modals & Toast State
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [receiptInstallment, setReceiptInstallment] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Open receipt for specific installment or total
  const handleOpenReceipt = (inst = null) => {
    setReceiptInstallment(inst);
    setIsReceiptModalOpen(true);
  };

  // Respective course ID for "View Course Details" navigation
  const respectiveCourseId = useMemo(() => {
    try {
      const courses = lmsService.getCourses();
      const courseTitle = (studentData.course || "").toLowerCase();
      const matched = courses.find(
        (c) =>
          c.title.toLowerCase() === courseTitle ||
          courseTitle.includes(c.title.toLowerCase()) ||
          c.title.toLowerCase().includes(courseTitle) ||
          (c.description && c.description.toLowerCase().includes("masters")) ||
          (c.overview?.greeting &&
            c.overview.greeting.toLowerCase().includes("masters"))
      );
      return matched ? matched.id : "course-3";
    } catch {
      return "course-3";
    }
  }, [studentData.course]);

  /* ------------------------------------------------------------- */
  /* ADMIN VIEW                                                    */
  /* ------------------------------------------------------------- */
  if (isAdmin) {
    return <AdminProfileView currentUser={currentUser} />;
  }

  /* ------------------------------------------------------------- */
  /* STUDENT VIEW                                                  */
  /* ------------------------------------------------------------- */
  return (
    <div className="space-y-6 pb-12">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center space-x-2 animate-in slide-in-from-bottom-2">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header Banner & Tab Navigation */}
      <ProfileHeader
        studentData={studentData}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {/* 2. Overview Section */}
      <ProfileOverviewSection
        studentData={studentData}
        respectiveCourseId={respectiveCourseId}
        onNavigateCourse={(courseId) =>
          navigate(courseId ? `/courses/${courseId}` : "/courses")
        }
        onNavigateTab={handleTabChange}
      />

      {/* 3. Attendance & Fees Section */}
      <ProfileAttendanceFeesSection
        studentData={studentData}
        activeTab={activeTab}
        crmAttendance={crmAttendance}
        onOpenReceipt={handleOpenReceipt}
      />

      {/* 4. Course Change History Section */}
      <ProfileCourseHistorySection
        studentData={studentData}
        activeTab={activeTab}
      />

      {/* Fee Receipt Modal */}
      <FeeReceiptModal
        isOpen={isReceiptModalOpen}
        onClose={() => {
          setIsReceiptModalOpen(false);
          setReceiptInstallment(null);
        }}
        profile={{
          ...crmProfile,
          admissionNo: studentData.studentId,
          name: studentData.name,
          email: studentData.email,
          phone: studentData.mobile,
          course: studentData.course,
          branch: studentData.center,
          totalFees: studentData.totalFees,
          totalPaid: studentData.amountPaid,
          balanceDue: studentData.balanceDue,
          installments: studentData.installments,
          selectedInstallment: receiptInstallment,
        }}
      />
    </div>
  );
};

export default ProfilePage;
