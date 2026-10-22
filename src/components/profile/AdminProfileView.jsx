import React from "react";
import { User } from "lucide-react";

/**
 * AdminProfileView: Renders the administrator view when currentUser is an admin.
 *
 * @param {Object} props
 * @param {Object} props.currentUser - Admin user object
 */
export const AdminProfileView = ({ currentUser = {} }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-[#0b1329] border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {currentUser.avatar ? (
            <img
              src={currentUser.avatar}
              alt={currentUser.name || "Administrator"}
              onError={(e) => {
                e.currentTarget.style.display = "none";
                if (e.currentTarget.nextElementSibling) {
                  e.currentTarget.nextElementSibling.style.display = "flex";
                }
              }}
              className="w-20 h-20 rounded-2xl object-cover ring-2 ring-blue-500/30"
            />
          ) : null}
          <div
            className={`w-20 h-20 rounded-2xl bg-blue-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-bold text-xl ring-2 ring-blue-500/30 items-center justify-center ${
              currentUser.avatar ? "hidden" : "flex"
            }`}
          >
            {currentUser.name
              ? currentUser.name
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()
              : <User size={32} />}
          </div>
          <div>
            <span className="text-xs font-black uppercase text-blue-600 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-md">
              ADMINISTRATOR PROFILE
            </span>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {currentUser.name || "Vishal Chaurasiya"}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {currentUser.email || "vishal.c@operatingmedia.com"} •{" "}
              {currentUser.designation || "Head of Operations & Lead Instructor"}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#0b1329] rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          System Administration Settings
        </h3>
        <p className="text-xs text-slate-500">
          Administrator permissions allow managing student admissions, curricula, quiz creation, and course workflows.
        </p>
      </div>
    </div>
  );
};
