import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { ref, onValue, update } from "firebase/database";
import { CRM_BACKEND_API } from "../../services/lmsService";
import { ChevronRight, Search, Bell, ChevronDown, User, Settings, LogOut, Check, Shield, GraduationCap, Sun, Moon, AlertCircle, MessageSquare, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
export const Topbar = ({ onToggleSidebar, onOpenSearch }) => {
  const { isDark, toggleTheme } = useTheme();

  const navigate = useNavigate();

  const {

    currentUser,

    role,

    isAdmin,

    isStudent,

    switchRole,

    logout,

    crmProfile,

  } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [notificationsList, setNotificationsList] = useState([]);
  const [notifOpen, setNotifOpen] = useState(false);

  // Student ID for Firebase channel
  const cleanSid = String(
    currentUser?.crmAdmissionId ||
    currentUser?.id ||
    currentUser?.admissionNo ||
    currentUser?.student_id ||
    "267"
  ).replace("std-", "");

  // Real-time notification listener (dual sync: Backend MySQL + Firebase)
  useEffect(() => {
    let personalNotifs = {};
    let broadcastNotifs = {};
    let backendNotifs = [];

    const updateCombined = () => {
      const mergedMap = {};

      // 1. Add backend notifications first
      backendNotifs.forEach((n) => {
        const idKey = `b_${n.id}`;
        mergedMap[idKey] = { ...n, key: idKey };
      });

      // 2. Add personal real-time notifications from Firebase (broadcasts strictly managed per-student via MySQL)
      Object.entries(personalNotifs).forEach(([k, v]) => {
        mergedMap[k] = { key: k, ...v };
      });

      const list = Object.values(mergedMap).sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      );
      setNotificationsList(list);
      const unread = list.filter((n) => !n.isRead).length;
      setUnreadNotifications(unread);
    };

    // Live Backend polling (100% resilient across networks and Firebase permissions)
    const fetchBackend = async () => {
      try {
        const res = await fetch(`${CRM_BACKEND_API}/lms/notifications/?student_id=${cleanSid || "267"}`);
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.notifications)) {
            backendNotifs = data.notifications;
            updateCombined();
          }
        }
      } catch (err) {
        console.warn("Backend notification fetch warning:", err);
      }
    };

    fetchBackend();
    const interval = setInterval(fetchBackend, 8000);
    const onFocus = () => fetchBackend();
    window.addEventListener("focus", onFocus);

    // Optional Firebase RTDB listeners
    let unsubPersonal = () => {};
    let unsubBroadcast = () => {};
    try {
      unsubPersonal = onValue(
        ref(db, `lms_notifications/${cleanSid || "267"}`),
        (snap) => {
          personalNotifs = snap.val() || {};
          updateCombined();
        },
        (err) => console.warn("Firebase personal listener error:", err)
      );

      unsubBroadcast = onValue(
        ref(db, `lms_notifications/all`),
        (snap) => {
          broadcastNotifs = snap.val() || {};
          updateCombined();
        },
        (err) => console.warn("Firebase broadcast listener error:", err)
      );
    } catch (fbErr) {
      console.warn("Firebase listener setup:", fbErr);
    }

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", onFocus);
      unsubPersonal();
      unsubBroadcast();
    };
  }, [cleanSid]);

  // Mark single notification read
  const handleMarkNotificationRead = async (notif) => {
    // 1. Mark in backend
    if (notif.id) {
      try {
        await fetch(`${CRM_BACKEND_API}/lms/notifications/mark-read/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            student_id: cleanSid || "267",
            notification_id: notif.id,
          }),
        });
      } catch (e) {}
    }

    // 2. Mark in Firebase if applicable
    if (cleanSid && notif.key && !notif.key.startsWith("b_")) {
      try {
        await update(ref(db, `lms_notifications/${cleanSid}/${notif.key}`), {
          isRead: true,
        });
      } catch (err) {}
    }

    // Update local state immediately
    setNotificationsList((prev) =>
      prev.map((n) => (n.key === notif.key ? { ...n, isRead: true } : n))
    );
    setUnreadNotifications((prev) => Math.max(0, prev - 1));

    if (notif.linkUrl) {
      setNotifOpen(false);
      navigate(notif.linkUrl);
    }
  };

  // Mark all notifications read
  const handleMarkAllRead = async () => {
    try {
      await fetch(`${CRM_BACKEND_API}/lms/notifications/mark-read/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ student_id: cleanSid || "267" }),
      });
    } catch (e) {}

    if (cleanSid && notificationsList.length > 0) {
      try {
        const updates = {};
        notificationsList.forEach((n) => {
          if (!n.isRead && n.key && !n.key.startsWith("b_")) {
            updates[`lms_notifications/${cleanSid}/${n.key}/isRead`] = true;
          }
        });
        if (Object.keys(updates).length > 0) {
          await update(ref(db), updates);
        }
      } catch (e) {}
    }

    setNotificationsList((prev) => prev.map((n) => ({ ...n, isRead: true })));
    setUnreadNotifications(0);
  };



  const currentAvatar =
    role === "ADMIN"
      ? currentUser?.avatar || null
      : currentUser?.avatar ||
        crmProfile?.photo ||
        crmProfile?.avatar ||
        null;
  return (
    <header className="sticky top-0 z-20 h-16 bg-white dark:bg-[#0b1329] border-b border-slate-200 dark:border-slate-800/90 px-4 md:px-6 flex items-center justify-between shadow-xs transition-colors duration-200">
      {/* Left side: Mobile Toggle & Global Search */}
      <div className="flex items-center space-x-3 flex-1 max-w-xl">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-hidden cursor-pointer md:hidden"
          aria-label="Open Navigation"
          title="Open Navigation"
        >
          <ChevronRight size={20} />
        </button>

        {/* Global Search Bar - shown on desktop screens where width permits */}
        <div
          onClick={onOpenSearch}
          className="relative w-full max-w-md hidden lg:flex items-center cursor-pointer group"
        >
          <Search
            size={17}
            className="absolute left-3.5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-cyan-400 transition-colors"
          />
          <input
            type="text"
            readOnly
            placeholder="Search courses, exams, assignments, quizzes..."
            className="w-full bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 rounded-xl pl-10 pr-14 py-2 text-sm text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 cursor-pointer focus:outline-hidden transition-all shadow-xs"
          />
          <kbd className="absolute right-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-300 font-sans text-xs px-2 py-0.5 rounded-md shadow-2xs font-semibold">
            ⌘ K
          </kbd>
        </div>
      </div>

      {/* Right Side: Role Toggle, Notifications & User Profile */}
      <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
        {/* Mobile/Tablet Search Button */}
        <button
          onClick={onOpenSearch}
          className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
          aria-label="Open Search"
        >
          <Search size={19} />
        </button>

        {/* Notifications Dropdown Container */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-hidden cursor-pointer"
            aria-label="Notifications"
          >
            <Bell size={20} />
            {unreadNotifications > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-extrabold flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900 shadow-xs">
                {unreadNotifications}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#0f172a] rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 py-3 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span>Notifications</span>
                  {unreadNotifications > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 text-[10px] font-extrabold">
                      {unreadNotifications} new
                    </span>
                  )}
                </h4>
                {unreadNotifications > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    className="text-xs text-blue-600 dark:text-cyan-400 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Check size={12} /> Mark all read
                  </button>
                )}
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800/60 max-h-80 overflow-y-auto">
                {notificationsList.length === 0 ? (
                  <div className="py-8 text-center text-slate-400 dark:text-slate-500 space-y-1">
                    <Bell size={24} className="mx-auto opacity-40 mb-1" />
                    <p className="text-xs font-semibold">No notifications right now</p>
                    <p className="text-[10px]">You're all caught up!</p>
                  </div>
                ) : (
                  notificationsList.map((notif) => {
                    const isApproval = notif.type === "forum_approval";
                    const isRejection = notif.type === "forum_rejection";
                    return (
                      <div
                        key={notif.key || notif.id}
                        onClick={() => handleMarkNotificationRead(notif)}
                        className={`px-4 py-3 transition-colors flex space-x-3 items-start cursor-pointer ${
                          !notif.isRead
                            ? "bg-blue-50/50 dark:bg-blue-950/30 hover:bg-blue-50 dark:hover:bg-blue-950/50"
                            : "hover:bg-slate-50 dark:hover:bg-slate-850"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                            isApproval
                              ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400"
                              : isRejection
                              ? "bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400"
                              : "bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400"
                          }`}
                        >
                          {isApproval ? (
                            <Sparkles size={14} />
                          ) : isRejection ? (
                            <AlertCircle size={14} />
                          ) : (
                            <MessageSquare size={14} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-xs leading-snug ${
                              !notif.isRead
                                ? "font-bold text-slate-900 dark:text-white"
                                : "font-medium text-slate-700 dark:text-slate-300"
                            }`}
                          >
                            {notif.title || "Notification"}
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
                            {notif.message}
                          </p>
                          <span className="text-[10px] text-slate-400 dark:text-slate-500 block mt-1">
                            {notif.createdAt
                              ? isNaN(new Date(notif.createdAt).getTime())
                                ? notif.createdAt
                                : new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                              : "Just now"}
                          </span>
                        </div>
                        {!notif.isRead && (
                          <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-1.5" />
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        {/* Dark / Light Theme Toggle Button */}
        <button
          type="button"
          onClick={toggleTheme}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-amber-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          title={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
          aria-label={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
        >
          {isDark ? (
            <Moon size={20} className="text-amber-400 fill-amber-400/20" />
          ) : (
            <Sun size={20} className="text-amber-500" />
          )}
        </button>

        {/* User Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 sm:space-x-2.5 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-hidden cursor-pointer"
            aria-label="User Profile Menu"
          >
            {currentAvatar ? (
              <img
                src={currentAvatar}
                alt={currentUser?.name || "User"}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  if (e.currentTarget.nextElementSibling) {
                    e.currentTarget.nextElementSibling.style.display = 'flex';
                  }
                }}
                className="w-9 h-9 sm:w-9.5 sm:h-9.5 rounded-full object-cover ring-2 ring-slate-200/90 dark:ring-slate-700 shadow-2xs shrink-0"
              />
            ) : null}
            <div
              className={`w-9 h-9 sm:w-9.5 sm:h-9.5 rounded-full bg-blue-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-bold text-xs ring-2 ring-slate-200/90 dark:ring-slate-700 shadow-2xs shrink-0 items-center justify-center ${currentAvatar ? 'hidden' : 'flex'}`}
            >
              {currentUser?.name ? currentUser.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() : <User size={16} />}
            </div>
            <div className="text-left hidden xl:block pr-1">
              <div className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                {currentUser.name}
              </div>
              <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                {currentUser.role || "STUDENT"}
              </div>
            </div>
            <ChevronDown
              size={14}
              className="text-slate-400 hidden xl:block mr-0.5"
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#0f172a] rounded-xl shadow-xl border border-slate-200/90 dark:border-slate-800 py-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center space-x-3">
                {currentAvatar ? (
                  <img
                    src={currentAvatar}
                    alt={currentUser?.name || "User"}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      if (e.currentTarget.nextElementSibling) {
                        e.currentTarget.nextElementSibling.style.display = 'flex';
                      }
                    }}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-200 dark:ring-slate-700 shrink-0"
                  />
                ) : null}
                <div
                  className={`w-10 h-10 rounded-full bg-blue-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-bold text-xs ring-2 ring-slate-200 dark:ring-slate-700 shrink-0 items-center justify-center ${currentAvatar ? 'hidden' : 'flex'}`}
                >
                  {currentUser?.name ? currentUser.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() : <User size={18} />}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                    {currentUser.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-normal truncate">
                    {currentUser.email}
                  </p>
                  <span className="mt-1 inline-flex items-center space-x-1 text-[10.5px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                    {isAdmin ? (
                      <Shield
                        size={11}
                        className="text-slate-600 dark:text-slate-400"
                      />
                    ) : (
                      <GraduationCap
                        size={11}
                        className="text-teal-700 dark:text-teal-400"
                      />
                    )}
                    <span>
                      {isAdmin ? "Administrator" : "Enrolled Student"}
                    </span>
                  </span>
                </div>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate("/profile");
                  }}
                  className="w-full px-4 py-2 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-850 hover:text-slate-900 dark:hover:text-white flex items-center space-x-2.5"
                >
                  <User size={15} className="text-slate-400" />
                  <span>My Profile</span>
                </button>

                {isAdmin && (
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/manage-reports");
                    }}
                    className="w-full px-4 py-2 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-850 hover:text-slate-900 dark:hover:text-white flex items-center space-x-2.5"
                  >
                    <Settings size={15} className="text-slate-400" />
                    <span>System Settings</span>
                  </button>
                )}

                {isStudent && (
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/enrolled-courses");
                    }}
                    className="w-full px-4 py-2 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-850 hover:text-slate-900 dark:hover:text-white flex items-center space-x-2.5"
                  >
                    <GraduationCap size={15} className="text-slate-400" />
                    <span>My Courses</span>
                  </button>
                )}
              </div>

              <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    logout();
                    navigate("/login");
                  }}
                  className="w-full px-4 py-2 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850 hover:text-slate-900 dark:hover:text-white flex items-center space-x-2.5"
                >
                  <LogOut size={15} className="text-slate-400" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
