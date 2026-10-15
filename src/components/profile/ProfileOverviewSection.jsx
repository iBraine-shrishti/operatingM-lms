import React from "react";
import {
  Calendar,
  FileText,
  MapPin,
  User,
  GraduationCap,
  ArrowRight,
  Clock,
  Wallet,
  AlertCircle,
} from "lucide-react";
import continueLearningLaptop from "../../assets/continue-learning-laptop.png";

/**
 * ProfileOverviewSection: Renders the student overview section including
 * admission/branch metric cards, course progress & timeline, and payment summary.
 *
 * @param {Object} props
 * @param {Object} props.studentData - Normalized student data
 * @param {string} props.respectiveCourseId - Course ID for navigation
 * @param {Function} props.onNavigateCourse - Handler to navigate to course details
 * @param {Function} props.onNavigateTab - Handler to switch active tab
 */
export const ProfileOverviewSection = ({
  studentData,
  respectiveCourseId,
  onNavigateCourse,
  onNavigateTab,
}) => {
  return (
    <div className="space-y-5">
      {/* 4 TOP METRIC CARDS ROW */}
      <div
        id="section-overview"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 scroll-mt-20"
      >
        {/* Card 1: Admission Date */}
        <div className="bg-white dark:bg-[#0b1329] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 flex items-center space-x-3.5 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <Calendar size={18} />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">
              Admission Date
            </span>
            <strong className="text-sm sm:text-base font-bold text-slate-900 dark:text-white block">
              {studentData.admissionDate}
            </strong>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 block">
              Started your learning journey
            </span>
          </div>
        </div>

        {/* Card 2: Registration Date */}
        <div className="bg-white dark:bg-[#0b1329] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 flex items-center space-x-3.5 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <FileText size={18} />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">
              Registration Date
            </span>
            <strong className="text-sm sm:text-base font-bold text-slate-900 dark:text-white block">
              {studentData.registrationDate}
            </strong>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 block">
              Account created
            </span>
          </div>
        </div>

        {/* Card 3: Branch / Center */}
        <div className="bg-white dark:bg-[#0b1329] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 flex items-center space-x-3.5 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <MapPin size={18} />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">
              Branch / Center
            </span>
            <strong className="text-sm sm:text-base font-bold text-slate-900 dark:text-white block">
              {studentData.center}
            </strong>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 block">
              Classroom + Live Zoom Hybrid
            </span>
          </div>
        </div>

        {/* Card 4: Faculty Lead */}
        <div className="bg-white dark:bg-[#0b1329] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 flex items-center space-x-3.5 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <User size={18} />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">
              Faculty Lead
            </span>
            <strong className="text-sm sm:text-base font-bold text-slate-900 dark:text-white block">
              {studentData.facultyLead}
            </strong>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 block">
              {studentData.facultyLeadRole}
            </span>
          </div>
        </div>
      </div>

      {/* TWO-COLUMN MIDDLE SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* LEFT: Course Progress & Timeline */}
        <div className="bg-white dark:bg-[#0b1329] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/80">
              <div className="flex items-center space-x-2">
                <GraduationCap size={18} className="text-blue-600 dark:text-blue-400" />
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  Course Progress & Timeline
                </h3>
              </div>
              <button
                type="button"
                onClick={() => onNavigateCourse && onNavigateCourse(respectiveCourseId)}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center space-x-1 cursor-pointer"
              >
                <span>View Course Details</span>
                <ArrowRight size={13} />
              </button>
            </div>

            {/* Course graphic & summary */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pt-4">
              <img
                src={continueLearningLaptop}
                alt="Course laptop"
                className="w-28 sm:w-32 h-auto object-contain shrink-0"
              />
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  {studentData.course}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {studentData.courseDesc}
                </p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="space-y-2 pt-4">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-700 dark:text-slate-300">
                  {studentData.progressPercentage}% Completed
                </span>
                <span className="text-slate-500 dark:text-slate-400">
                  {studentData.daysLeft} Days Left
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-500"
                  style={{ width: `${studentData.progressPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Bottom 3 metrics grid */}
          <div className="grid grid-cols-3 gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-center">
              <Calendar size={14} className="mx-auto text-blue-600 dark:text-blue-400 mb-1" />
              <span className="text-[10px] text-slate-400 block">Total Duration</span>
              <strong className="text-slate-800 dark:text-slate-200 font-bold block">
                {studentData.courseDuration}
              </strong>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-center">
              <Clock size={14} className="mx-auto text-blue-600 dark:text-blue-400 mb-1" />
              <span className="text-[10px] text-slate-400 block">Started On</span>
              <strong className="text-slate-800 dark:text-slate-200 font-bold block">
                {studentData.courseStart}
              </strong>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-center">
              <Calendar size={14} className="mx-auto text-blue-600 dark:text-blue-400 mb-1" />
              <span className="text-[10px] text-slate-400 block">Ends On</span>
              <strong className="text-slate-800 dark:text-slate-200 font-bold block">
                {studentData.courseEnd}
              </strong>
            </div>
          </div>
        </div>

        {/* RIGHT: Payment Summary */}
        <div className="bg-white dark:bg-[#0b1329] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/80">
              <div className="flex items-center space-x-2">
                <Wallet size={18} className="text-blue-600 dark:text-blue-400" />
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  Payment Summary
                </h3>
              </div>
              <button
                type="button"
                onClick={() => onNavigateTab && onNavigateTab("attendance")}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center space-x-1 cursor-pointer"
              >
                <span>View All Payments</span>
                <ArrowRight size={13} />
              </button>
            </div>

            {/* 3 Metric Figures */}
            <div className="grid grid-cols-3 gap-3 pt-4 text-left">
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
                  Total Fees
                </span>
                <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1 tabular-nums">
                  ₹{studentData.totalFees.toLocaleString()}
                </div>
              </div>

              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
                  Amount Paid
                </span>
                <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1 tabular-nums">
                  ₹{studentData.amountPaid.toLocaleString()}
                </div>
              </div>

              <div>
                <span className="text-xs text-rose-500 dark:text-rose-400 font-bold block flex items-center space-x-1">
                  <span>Balance</span>
                  <span className="text-[10px] bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 px-1 rounded uppercase">
                    DUE
                  </span>
                </span>
                <div className="text-xl sm:text-2xl font-black text-rose-600 dark:text-rose-400 mt-1 tabular-nums">
                  ₹{studentData.balanceDue.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Fees progress bar */}
            <div className="space-y-1.5 pt-5">
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.max(4, studentData.feesClearedPercent)}%`,
                  }}
                />
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
                {studentData.feesClearedPercent}% of total fees cleared
              </span>
            </div>

            {/* Pending Fee Notice Alert */}
            {studentData.balanceDue > 0 && (() => {
              const pendingInst = (studentData.installments || []).find(
                (i) => i.amount > 0 && String(i.status).toUpperCase() !== "PAID"
              );
              const instTitle = pendingInst?.title || "Installment 1";
              const instAmount = pendingInst?.amount
                ? `₹${pendingInst.amount.toLocaleString()}`
                : `₹${studentData.balanceDue.toLocaleString()}`;
              const instDate =
                pendingInst?.dueDate ||
                pendingInst?.date ||
                studentData.nextDueDate ||
                "Scheduled Date";
              const isOverdue = pendingInst?.isOverdue ?? true;

              return (
                <div className="mt-3.5 p-3 rounded-xl bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-900/60 flex items-start space-x-2.5 text-xs text-rose-800 dark:text-rose-300">
                  <AlertCircle
                    size={15}
                    className="text-rose-600 dark:text-rose-400 shrink-0 mt-0.5"
                  />
                  <div className="space-y-0.5">
                    <span className="font-bold block">
                      Tuition Fees Pending: ₹{studentData.balanceDue.toLocaleString()} Due
                    </span>
                    <span className="text-rose-700/80 dark:text-rose-400/80 text-[11px] block">
                      {pendingInst
                        ? `${instTitle} of ${instAmount} is ${
                            isOverdue ? "Overdue since" : "due on"
                          } ${instDate}. Please complete the transaction to avoid interruption.`
                        : `Please complete the transaction of ₹${studentData.balanceDue.toLocaleString()} to avoid interruption.`}
                    </span>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Fee Account Status Strip */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400 font-medium">
              Account Status:
            </span>
            <span
              className={`font-bold px-2.5 py-0.5 rounded-full text-[11px] ${
                studentData.balanceDue <= 0
                  ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                  : "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
              }`}
            >
              {studentData.balanceDue <= 0
                ? "Fully Cleared ✓"
                : studentData.paymentStatus || "Fees Pending"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
