import React, { useState } from "react";
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Check,
  Shield,
  GraduationCap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
export const Topbar = ({ onToggleSidebar, onOpenSearch }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [notifOpen, setNotifOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser, role, isAdmin, isStudent, switchRole, logout } =
    useAuth();
  return (
    <header className="sticky top-0 z-20 h-16 bg-white border-b border-slate-200 px-4 md:px-6 flex items-center justify-between shadow-xs">
      {/* Left side: Hamburger & Global Search */}
      <div className="flex items-center space-x-4 flex-1 max-w-xl">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors focus:outline-hidden cursor-pointer"
          aria-label="Toggle Navigation"
        >
          <Menu size={20} />
        </button>

        {/* Global Search Bar - shown on desktop screens where width permits */}
        <div
          onClick={onOpenSearch}
          className="relative w-full max-w-md hidden lg:flex items-center cursor-pointer group"
        >
          <Search
            size={17}
            className="absolute left-3.5 text-slate-400 group-hover:text-slate-600 transition-colors"
          />
          <input
            type="text"
            readOnly
            placeholder="Search courses, students, or anything..."
            className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl pl-10 pr-14 py-2 text-sm text-slate-700 placeholder-slate-400 cursor-pointer focus:outline-hidden transition-all shadow-xs"
          />
          <kbd className="absolute right-3 bg-white border border-slate-200 text-slate-400 font-sans text-xs px-2 py-0.5 rounded-md shadow-2xs font-semibold">
            ⌘ K
          </kbd>
        </div>
      </div>

      {/* Right Side: Role Toggle, Notifications & User Profile */}
      <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
        {/* Mobile/Tablet Search Button */}
        <button
          onClick={onOpenSearch}
          className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          aria-label="Open Search"
        >
          <Search size={19} />
        </button>

        {/* Quick Role Switcher Pill */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 shrink-0">
          <button
            onClick={() => {
              if (!isAdmin) {
                switchRole("ADMIN");
                navigate("/dashboard");
              }
            }}
            className={`flex items-center space-x-1.5 px-2.5 lg:px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              isAdmin
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-500 hover:text-slate-900"
            }`}
            title="Switch to Admin UI"
          >
            <Shield
              size={14}
              className={isAdmin ? "text-slate-900" : "text-slate-400"}
            />
            <span className="hidden xl:inline">Admin UI</span>
          </button>

          <button
            onClick={() => {
              if (!isStudent) {
                switchRole("STUDENT");
                navigate("/dashboard");
              }
            }}
            className={`flex items-center space-x-1.5 px-2.5 lg:px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              isStudent
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-500 hover:text-slate-900"
            }`}
            title="Switch to Student UI"
          >
            <GraduationCap
              size={15}
              className={isStudent ? "text-slate-900" : "text-slate-400"}
            />
            <span className="hidden xl:inline">Student UI</span>
          </button>
        </div>

        {/* Notifications Dropdown Container */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors focus:outline-hidden cursor-pointer"
            aria-label="Notifications"
          >
            <Bell size={20} />
            {unreadNotifications > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-extrabold flex items-center justify-center rounded-full border-2 border-white shadow-xs">
                {unreadNotifications}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded shadow-xl border border-slate-100 py-3 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                <h4 className="font-bold text-sm text-slate-900">
                  Notifications
                </h4>
                <button
                  onClick={() => setUnreadNotifications(0)}
                  className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Check size={12} /> Mark all read
                </button>
              </div>
              <div className="divide-y divide-slate-50 max-h-64 overflow-y-auto">
                {isAdmin ? (
                  <>
                    <div className="px-4 py-3 hover:bg-slate-50 transition-colors flex space-x-3 items-start">
                      <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 font-bold text-xs">
                        SEO
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-800">
                          New student enrolled in SEO Masterclass
                        </p>
                        <span className="text-[10px] text-slate-400">
                          10 mins ago
                        </span>
                      </div>
                    </div>
                    <div className="px-4 py-3 hover:bg-slate-50 transition-colors flex space-x-3 items-start">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 font-bold text-xs">
                        WP
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-800">
                          WordPress Quiz 2 submitted by Aarav
                        </p>
                        <span className="text-[10px] text-slate-400">
                          1 hour ago
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="px-4 py-3 hover:bg-slate-50 transition-colors flex space-x-3 items-start">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                        <Check size={14} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-800">
                          Congratulations! You earned "GA4 Master Certified"
                          badge
                        </p>
                        <span className="text-[10px] text-slate-400">
                          2 hours ago
                        </span>
                      </div>
                    </div>
                    <div className="px-4 py-3 hover:bg-slate-50 transition-colors flex space-x-3 items-start">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 font-bold text-xs">
                        QZ
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-800">
                          New Quiz available in Website Development
                        </p>
                        <span className="text-[10px] text-slate-400">
                          Yesterday
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sun / Light Theme Toggle Icon (matching LASTEST UI) */}
        <button
          type="button"
          className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
          title="Theme Mode"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle cx="12" cy="12" r="4" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
            />
          </svg>
        </button>

        {/* User Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 sm:space-x-2.5 p-1 rounded-full hover:bg-slate-100 transition-colors focus:outline-hidden cursor-pointer"
            aria-label="User Profile Menu"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-9 h-9 sm:w-9.5 sm:h-9.5 rounded-full object-cover ring-2 ring-slate-200/90 shadow-2xs shrink-0"
            />
            <div className="text-left hidden xl:block pr-1">
              <div className="text-xs font-bold text-slate-900 leading-tight">
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
            <div className="absolute right-0 mt-2 w-64 bg-whiterounded shadow-xl border border-slate-200/90 py-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-4 py-3 border-b border-slate-100 flex items-center space-x-3">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-200 shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate">
                    {currentUser.name}
                  </p>
                  <p className="text-xs text-slate-500 font-normal truncate">
                    {currentUser.email}
                  </p>
                  <span className="mt-1 inline-flex items-center space-x-1 text-[10.5px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-200">
                    {isAdmin ? (
                      <Shield size={11} className="text-slate-600" />
                    ) : (
                      <GraduationCap size={11} className="text-teal-700" />
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
                  className="w-full px-4 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center space-x-2.5"
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
                    className="w-full px-4 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center space-x-2.5"
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
                    className="w-full px-4 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center space-x-2.5"
                  >
                    <GraduationCap size={15} className="text-slate-400" />
                    <span>My Courses</span>
                  </button>
                )}
              </div>

              <div className="pt-1 border-t border-slate-100">
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    logout();
                    navigate("/login");
                  }}
                  className="w-full px-4 py-2 text-left text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 flex items-center space-x-2.5"
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
