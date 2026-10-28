import React, { useState, useEffect } from "react";
import { lmsService, CRM_BACKEND_API } from "../../services/lmsService";
import { crmService } from "../../services/crmService";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import logoImg from "../../assets/logo.png";
import logoHorizontalImg from "../../assets/logo-horizontal.png";
import logoHorizontalDarkImg from "../../assets/logo-horizontal-dark.png";
import logoMarkImg from "../../assets/logo-mark.png";
import {
  LayoutDashboard,
  BookOpen,
  Activity,
  User,
  GraduationCap,
  Award,
  Trophy,
  CheckSquare,
  FileText,
  BookCheck,
  Layers,
  ClipboardList,
  FolderCheck,
  Users,
  HelpCircle,
  MessageCircle,
  BarChart3,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Images,
  MessagesSquare,
} from "lucide-react";

export const Sidebar = ({ collapsed, onToggleCollapse, onCloseMobile }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isStudent, logout, enrolledCoursesCount, assignmentsCount, crmProfile, crmAttendance, crmBatch, currentUser } = useAuth();
  const { isDark } = useTheme();
  const [liveAssignmentsCount, setLiveAssignmentsCount] = useState(assignmentsCount ?? 0);
  const [liveQuizzesCount, setLiveQuizzesCount] = useState(0);
  const [liveExamsCount, setLiveExamsCount] = useState(() => {
    try {
      const cached = localStorage.getItem("om_lms_student_exams_cache");
      return cached ? JSON.parse(cached).length : 0;
    } catch {
      return 0;
    }
  });
  const [liveActivitiesCount, setLiveActivitiesCount] = useState(() => {
    try {
      const studentId = crmService.getSelectedStudentId() || crmProfile?.id || currentUser?.crmAdmissionId;
      const acts = lmsService.getStudentActivities({
        studentId,
        currentUser,
        crmProfile,
        crmAttendance,
        crmBatch,
      });
      return Array.isArray(acts) ? acts.length : 0;
    } catch {
      return 0;
    }
  });
  const [liveNotesCount, setLiveNotesCount] = useState(() => {
    try {
      const studentId =
        crmService.getSelectedStudentId() ||
        crmProfile?.id ||
        currentUser?.crmAdmissionId ||
        "375";
      const notes = lmsService.getNotes(studentId);
      return Array.isArray(notes) ? notes.length : 0;
    } catch {
      return 0;
    }
  });

  useEffect(() => {
    if (typeof assignmentsCount === "number") {
      setLiveAssignmentsCount(assignmentsCount);
    }
  }, [assignmentsCount]);

  useEffect(() => {
    const studentId = crmService.getSelectedStudentId() || crmProfile?.id || currentUser?.crmAdmissionId;
    if (!studentId) return;

    let isMounted = true;
    lmsService
      .fetchStudentBatchAssignments(studentId)
      .then((data) => {
        if (isMounted && Array.isArray(data)) {
          setLiveAssignmentsCount(data.length);
        }
      })
      .catch((err) => {
        console.warn("Could not load assignments count in sidebar:", err);
      });

    return () => {
      isMounted = false;
    };
  }, [location.pathname, crmProfile?.id, currentUser?.crmAdmissionId]);

  useEffect(() => {
    let isMounted = true;
    try {
      const studentUser = JSON.parse(localStorage.getItem("om_lms_student_user") || "{}");
      const cachedProfile = JSON.parse(localStorage.getItem("om_lms_crm_cached_profile") || "{}");
      const studentId = crmService.getSelectedStudentId() || crmProfile?.id || currentUser?.crmAdmissionId || studentUser.id || studentUser.student_id || "";
      const baseApi = CRM_BACKEND_API || "https://crm.dmsoi.org/api";

      fetch(`${baseApi}/lms/student/quizzes/${studentId ? `?student_id=${studentId}` : ""}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (isMounted && data && data.success && Array.isArray(data.quizzes)) {
            setLiveQuizzesCount(data.quizzes.length);
          }
        })
        .catch(() => {
          if (isMounted) {
            const localQ = lmsService.getQuizzes();
            if (Array.isArray(localQ) && localQ.length > 0) {
              setLiveQuizzesCount(localQ.length);
            }
          }
        });
    } catch (e) {
      const localQ = lmsService.getQuizzes();
      if (Array.isArray(localQ) && localQ.length > 0) {
        setLiveQuizzesCount(localQ.length);
      }
    }

    return () => {
      isMounted = false;
    };
  }, [location.pathname, crmProfile?.id, currentUser?.crmAdmissionId]);

  useEffect(() => {
    let isMounted = true;
    const fetchExams = async () => {
      try {
        const studentUser = JSON.parse(localStorage.getItem("om_lms_student_user") || "{}");
        const studentId =
          crmService.getSelectedStudentId() ||
          crmProfile?.id ||
          currentUser?.crmAdmissionId ||
          studentUser.id ||
          studentUser.student_id ||
          "";

        if (!studentId) {
          if (isMounted) setLiveExamsCount(0);
          return;
        }

        const exams = await lmsService.fetchStudentExams(studentId);
        if (isMounted && Array.isArray(exams)) {
          setLiveExamsCount(exams.length);
        }
      } catch (err) {
        console.warn("Could not load exams count in sidebar:", err);
      }
    };

    fetchExams();

    const handleUpdate = () => {
      fetchExams();
    };

    window.addEventListener("om_lms_exams_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      isMounted = false;
      window.removeEventListener("om_lms_exams_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [location.pathname, crmProfile?.id, currentUser?.crmAdmissionId]);

  useEffect(() => {
    const updateActivitiesCount = () => {
      try {
        const studentId = crmService.getSelectedStudentId() || crmProfile?.id || currentUser?.crmAdmissionId;
        const acts = lmsService.getStudentActivities({
          studentId,
          currentUser,
          crmProfile,
          crmAttendance,
          crmBatch,
        });
        if (Array.isArray(acts)) {
          setLiveActivitiesCount(acts.length);
        }
      } catch (err) {
        console.warn("Could not calculate activities count in sidebar:", err);
      }
    };

    updateActivitiesCount();
    window.addEventListener("om_lms_activity_updated", updateActivitiesCount);
    window.addEventListener("storage", updateActivitiesCount);
    return () => {
      window.removeEventListener("om_lms_activity_updated", updateActivitiesCount);
      window.removeEventListener("storage", updateActivitiesCount);
    };
  }, [location.pathname, crmProfile?.id, currentUser?.crmAdmissionId, crmAttendance, crmBatch]);

  useEffect(() => {
    const studentId =
      crmService.getSelectedStudentId() ||
      crmProfile?.id ||
      currentUser?.crmAdmissionId ||
      "375";

    const updateNotesFromCache = () => {
      try {
        const notes = lmsService.getNotes(studentId);
        if (Array.isArray(notes)) {
          setLiveNotesCount(notes.length);
        }
      } catch (err) {
        console.warn("Could not calculate notes count in sidebar:", err);
      }
    };

    // Initialize from local cache immediately
    updateNotesFromCache();

    // Fetch once in background from backend
    lmsService.fetchStudentNotes(studentId).then((live) => {
      if (Array.isArray(live)) {
        setLiveNotesCount(live.length);
      }
    });

    window.addEventListener("lms_notes_changed", updateNotesFromCache);
    window.addEventListener("storage", updateNotesFromCache);
    return () => {
      window.removeEventListener("lms_notes_changed", updateNotesFromCache);
      window.removeEventListener("storage", updateNotesFromCache);
    };
  }, [crmProfile?.id, currentUser?.crmAdmissionId]);

  const sections = [
    {
      title: "MAIN",
      items: [
        { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
        { 
          name: "Activity", 
          path: "/activity", 
          icon: Activity, 
          badge: String(liveActivitiesCount ?? 0) 
        },
        { name: "Profile", path: "/profile", icon: User },
      ],
    },
    {
      title: "LEARNING",
      items: [
        {
          name: "Enrolled Courses",
          path: "/enrolled-courses",
          icon: GraduationCap,
          badge: String(enrolledCoursesCount ?? 0),
        },
        {
          name: "Exams",
          path: "/exam",
          icon: Award,
          badge: String(liveExamsCount ?? 0),
        },
        {
          name: "Achievements",
          path: "/achievements",
          icon: Trophy,
          badge: "4",
        },
        {
          name: "My Assignments",
          path: "/my-assignments",
          icon: BookCheck,
          badge: String(liveAssignmentsCount ?? 0),
        },
        {
          name: "My Quizzes",
          path: "/my-quizzes",
          icon: CheckSquare,
          badge: String(liveQuizzesCount ?? 0),
        },
        {
          name: "Notes",
          path: "/notes",
          icon: FileText,
          badge: String(liveNotesCount ?? 0),
        },
        { name: "Forums", path: "/forums", icon: MessagesSquare },
        { name: "Schedule", path: "/schedule", icon: Calendar },
      ],
    },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 z-30 h-screen bg-white dark:bg-[#0b1329] border-r border-slate-200/80 dark:border-slate-800/90 transition-all duration-300 flex flex-col text-slate-800 dark:text-slate-200 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Sidebar Header / Logo */}
      <div className="relative h-18 sm:h-20 flex items-center border-b border-slate-100 dark:border-slate-800/90 shrink-0">
        {!collapsed ? (
          <NavLink
            to="/dashboard"
            className="flex items-center w-full h-full px-3.5 sm:px-4 py-2 overflow-hidden group"
            title="Operating Media Dashboard"
          >
            <img
              src={isDark ? logoHorizontalDarkImg : logoHorizontalImg}
              alt="Operating Media"
              className="h-12 sm:h-13 w-auto max-w-[225px] object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </NavLink>
        ) : (
          <NavLink
            to="/dashboard"
            className="flex items-center justify-center w-full h-full px-2 overflow-hidden group"
            title="Operating Media Dashboard"
          >
            <img
              src={logoMarkImg}
              alt="Operating Media"
              className="h-10 w-auto max-w-[54px] object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </NavLink>
        )}

        {/* Floating Side Closer / Toggle Button (outside container, on the border boundary) */}
        <button
          type="button"
          onClick={onToggleCollapse}
          className="absolute -right-3.5 top-1/2 -translate-y-1/2 z-40 w-7 h-7 rounded-full bg-[#194b81] hover:bg-[#0f345c] dark:bg-[#194b81] dark:hover:bg-[#2563eb] text-white border-2 border-white dark:border-[#0b1329] shadow-md flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-hidden"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight size={14} strokeWidth={2.8} className="translate-x-px" />
          ) : (
            <ChevronLeft size={14} strokeWidth={2.8} className="-translate-x-px" />
          )}
        </button>
      </div>

      {/* Nav List */}
      <div className={`flex-1 overflow-y-auto overflow-x-hidden py-5 ${collapsed ? "px-2" : "px-3"} space-y-6 custom-scrollbar`}>
        {sections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-1">
            {!collapsed && (
              <h3 className="px-3 text-[10px] font-black text-slate-400 dark:text-slate-400 uppercase tracking-widest mb-2">
                {section.title}
              </h3>
            )}
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive =
                location.pathname === item.path ||
                (item.path === "/manage-courses" && location.pathname === "/");
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onCloseMobile}
                  className={({ isActive: isLinkActive }) => {
                    const active =
                      isLinkActive ||
                      (item.path === "/manage-courses" &&
                        location.pathname === "/");
                    return `group relative flex items-center ${
                      collapsed
                        ? "justify-center px-2 py-2.5"
                        : "justify-between px-3.5 py-2.5"
                    } rounded-xl font-semibold text-xs sm:text-sm transition-all duration-150 ${
                      active
                        ? "bg-[#eff6ff] text-[#2563eb] dark:bg-blue-600/15 dark:text-cyan-400 dark:border dark:border-blue-500/30 dark:shadow-[0_0_12px_rgba(37,99,235,0.25)] shadow-2xs"
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-850 hover:text-slate-900 dark:hover:text-white"
                    }`;
                  }}
                  title={collapsed ? item.name : undefined}
                >
                  <div
                    className={`flex items-center ${collapsed ? "justify-center" : "space-x-3"}`}
                  >
                    <Icon
                      size={18}
                      className={`shrink-0 transition-colors ${
                        isActive
                          ? "text-[#2563eb] dark:text-cyan-400"
                          : "text-slate-400 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-cyan-300"
                      }`}
                    />
                    {!collapsed && (
                      <span className="truncate">{item.name}</span>
                    )}
                  </div>

                  {!collapsed && item.badge && (
                    <span
                      className={`ml-auto text-xs font-bold px-2 py-0.5 rounded-full ${
                        isActive
                          ? "bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-cyan-300 border border-transparent dark:border-blue-500/30"
                          : "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-300 border border-blue-100/60 dark:border-blue-900/60"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}


                </NavLink>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer / Sign Out (matching DASHBOARD.png) */}
      <div className={`border-t border-slate-100 dark:border-slate-800/90 shrink-0 ${collapsed ? "p-2" : "p-3"}`}>
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className={`w-full flex items-center ${
            collapsed ? "justify-center px-2 py-2.5" : "space-x-3 px-3.5 py-2.5"
          } rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-850 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer`}
          title={collapsed ? "Sign Out" : undefined}

        >
          <LogOut
            size={18}
            className="text-slate-400 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 shrink-0"
          />
          {!collapsed && (
            <span className="text-xs sm:text-sm font-semibold">Sign Out</span>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
