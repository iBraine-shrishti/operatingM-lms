import React, { useState, useMemo } from "react";
import { Calendar, Check, TrendingUp } from "lucide-react";
import { AttendanceComparisonChart } from "../crm/AttendanceComparisonChart";

/**
 * ProfileAttendanceFeesSection: Displays the payment schedule installments table
 * and the classroom attendance analytics (Trend graph / Class logs list).
 *
 * @param {Object} props
 * @param {Object} props.studentData - Normalized student data
 * @param {string} props.activeTab - Currently active tab
 * @param {Object} props.crmAttendance - CRM attendance data with logs
 * @param {Function} props.onOpenReceipt - Handler to open receipt modal for an installment
 */
export const ProfileAttendanceFeesSection = ({
  studentData,
  activeTab,
  crmAttendance = {},
  onOpenReceipt,
}) => {
  const [attendanceView, setAttendanceView] = useState("graph"); // 'graph' | 'logs'

  // Only display the Action column if there are actionable items in the table
  const hasInstallmentActions = useMemo(() => {
    return studentData.installments?.some((inst) => Boolean(inst.action));
  }, [studentData.installments]);

  return (
    <div id="section-attendance-fees" className="space-y-5 scroll-mt-20">
      {/* 1. PAYMENT SCHEDULE TABLE CARD */}
      <div
        className={`bg-white dark:bg-[#0b1329] rounded-2xl shadow-xs overflow-hidden transition-all duration-500 ${
          activeTab === "attendance"
            ? "border-2 border-blue-500 dark:border-blue-500 ring-4 ring-blue-500/15 shadow-xl shadow-blue-500/10"
            : "border border-slate-200/80 dark:border-slate-800"
        }`}
      >
        {/* Table Header Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <Calendar size={16} />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  Payment Schedule
                </h3>
                {activeTab === "attendance" && (
                  <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 px-2 py-0.5 rounded-full border border-blue-200/80 dark:border-blue-800 animate-in fade-in duration-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
                    <span>Active Section</span>
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Installment breakdown, due dates, and verified payment vouchers
              </p>
            </div>
          </div>
        </div>

        {/* Table Component */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50/80 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4 font-bold">Installment</th>
                <th className="py-3 px-4 font-bold">Due Date</th>
                <th className="py-3 px-4 font-bold">Amount</th>
                <th className="py-3 px-4 font-bold">Mode</th>
                <th className="py-3 px-4 font-bold">Status</th>
                {hasInstallmentActions && (
                  <th className="py-3 px-4 font-bold text-right">Action</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-200">
              {(studentData.installments || []).map((inst) => (
                <tr
                  key={inst.id}
                  className={`hover:bg-slate-50/60 dark:hover:bg-slate-900/40 transition-colors ${
                    inst.isOverdue ? "bg-rose-50/20 dark:bg-rose-950/10" : ""
                  }`}
                >
                  <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    {inst.title}
                  </td>
                  <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                    <span className="flex items-center space-x-1.5">
                      <span>{inst.dueDate}</span>
                      {inst.isOverdue && (
                        <span className="text-[10px] font-black text-rose-600 bg-rose-100 dark:bg-rose-950 px-1.5 py-0.2 rounded uppercase">
                          Overdue
                        </span>
                      )}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-black text-slate-900 dark:text-white tabular-nums">
                    ₹{inst.amount.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-medium">
                      {inst.mode}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {inst.status === "PAID" ? (
                      <button
                        type="button"
                        onClick={() => onOpenReceipt && onOpenReceipt(inst)}
                        className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-black bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors cursor-pointer"
                        title="Click to view verified official receipt"
                      >
                        <span>PAID</span>
                        <Check size={11} className="stroke-[3]" />
                      </button>
                    ) : (
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-black bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                        UNPAID
                      </span>
                    )}
                  </td>
                  {hasInstallmentActions && (
                    <td className="py-3 px-4 text-right">
                      {inst.action ? (
                        <button
                          type="button"
                          onClick={() => inst.onAction && inst.onAction()}
                          className="px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          {inst.action}
                        </button>
                      ) : (
                        <span className="text-slate-400 dark:text-slate-500 font-medium text-xs px-2">
                          —
                        </span>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. CLASSROOM ATTENDANCE & LECTURE ANALYTICS */}
      <div
        className={`bg-white dark:bg-[#0b1329] rounded-2xl p-6 shadow-xs space-y-5 transition-all duration-500 ${
          activeTab === "attendance"
            ? "border-2 border-blue-500 dark:border-blue-500 ring-4 ring-blue-500/15 shadow-xl shadow-blue-500/10"
            : "border border-slate-200/90 dark:border-slate-800"
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Classroom Attendance & Lecture Analytics
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Attendance compliance tracked automatically via Operating Media CRM
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setAttendanceView("graph")}
              className={`text-xs font-bold px-3.5 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 cursor-pointer ${
                attendanceView === "graph"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
              }`}
            >
              <TrendingUp size={13} />
              <span>Trend Graph</span>
            </button>
            <button
              type="button"
              onClick={() => setAttendanceView("logs")}
              className={`text-xs font-bold px-3.5 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 cursor-pointer ${
                attendanceView === "logs"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
              }`}
            >
              <Calendar size={13} />
              <span>Class Logs ({crmAttendance.logs?.length || 0})</span>
            </button>
          </div>
        </div>

        {attendanceView === "graph" ? (
          <div className="pt-2">
            <AttendanceComparisonChart
              enrolledCourseTitle={studentData.course}
              crmAttendance={crmAttendance}
              studentData={studentData}
            />
          </div>
        ) : (
          <div
            id="class-logs-list"
            className="space-y-2 pt-1 max-h-[360px] overflow-y-auto pr-1.5 custom-scrollbar"
          >
            {crmAttendance.logs && crmAttendance.logs.length > 0 ? (
              crmAttendance.logs.map((log, lIdx) => (
                <div
                  key={lIdx}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs transition-colors hover:bg-slate-100/60 dark:hover:bg-slate-800/60"
                >
                  <div className="flex items-center space-x-3">
                    <span
                      className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                        log.status === "PRESENT"
                          ? "bg-emerald-500"
                          : log.status === "LEAVE"
                          ? "bg-amber-500"
                          : "bg-rose-500"
                      }`}
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white text-xs">
                          {log.topic || "General Lecture"}
                        </span>
                        {log.sub_topic && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                            {log.sub_topic}
                          </span>
                        )}
                      </div>
                      <span className="text-slate-400 dark:text-slate-500 text-[11px] mt-0.5 block">
                        {log.date} • {log.batch_name || studentData.batch || "Classroom"} • Faculty:{" "}
                        {log.trainer_name || studentData.facultyLead || "Faculty Trainer"}
                      </span>
                      {log.assignment && (
                        <span className="text-blue-600 dark:text-blue-400 text-[10px] font-semibold mt-0.5 block">
                          Assignment: {log.assignment}
                        </span>
                      )}
                    </div>
                  </div>
                  <span
                    className={`font-bold px-2.5 py-1 rounded text-xs shrink-0 ${
                      log.status === "PRESENT"
                        ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300"
                        : log.status === "LEAVE"
                        ? "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300"
                        : "bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300"
                    }`}
                  >
                    {log.status}
                  </span>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-slate-400 dark:text-slate-500 text-xs font-semibold">
                No attendance logs recorded yet for this student in the CRM Attendance Chart.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
