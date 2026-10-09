import React from "react";
import { CreditCard, X, Clock, ChevronDown, Check } from "lucide-react";

/**
 * Reusable Payment Due Modal Component
 */
export const PaymentDueModal = ({
  isOpen = false,
  onClose,
  currentUser = {},
  crmProfile = {},
  paymentInfo = {},
  reminderOptions = [],
  selectedReminderDays = 3,
  onSelectReminderDays,
  isRemindDropdownOpen = false,
  onToggleRemindDropdown,
  onSetReminder,
  onPayNow,
}) => {
  if (!isOpen) return null;

  const studentName = currentUser.name || "Hiteshpuri Goswami";
  const admissionId = crmProfile.admissionNo || "OMC-0266";
  const studentCourse = crmProfile.course || "Diploma in Digital Marketing";
  const centerBranch = crmProfile.branch || "Borivali Center";

  const installmentAmount = paymentInfo.installmentAmount || "₹12,500";
  const termText =
    paymentInfo.termText || "Term 3 Tuition Fee • 3 of 4 Installments";
  const dueDateText = paymentInfo.dueDateText || "October 14, 2026";
  const daysRemainingText =
    paymentInfo.daysRemainingText || "7 Days Remaining • Due Oct 14, 2026";

  const selectedOpt =
    reminderOptions.find((o) => o.days === selectedReminderDays) ||
    reminderOptions[1] || {
      days: 3,
      date: "Oct 10, 2026",
      desc: "Recommended (Alerts on Oct 10 • 4 days before due)",
    };

  const handlePay = () => {
    if (onPayNow) {
      onPayNow();
    } else {
      alert("Redirecting to Razorpay / UPI Secure Payment Gateway (Demo)...");
      if (onClose) onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-white dark:bg-[#0b1329] rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800/90 overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 bg-amber-50/80 dark:bg-[#0f172a]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30 shadow-2xs dark:shadow-[0_0_12px_rgba(245,158,11,0.25)] flex items-center justify-center shrink-0">
              <CreditCard size={20} />
            </div>
            <div>
              <h3 className="font-black text-slate-900 dark:text-white text-base sm:text-lg">
                Fee Installment Due
              </h3>
              <p className="text-xs text-amber-800 dark:text-amber-300 font-semibold">
                {daysRemainingText}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-amber-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 text-xs">
          {/* Amount Highlight Card */}
          <div className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-white dark:from-amber-950/40 dark:via-slate-900 dark:to-[#0f172a] border border-amber-200 dark:border-amber-500/40 rounded-xl p-4 text-center space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block">
              Outstanding Installment
            </span>
            <div className="text-3xl font-black text-slate-900 dark:text-white">
              {installmentAmount}
            </div>
            <span className="inline-block text-[10.5px] font-bold text-amber-800 dark:text-amber-300 bg-amber-100/90 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
              {termText}
            </span>
          </div>

          {/* Fee Breakdown */}
          <div className="space-y-1.5 bg-slate-50 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 rounded-xl p-3">
            <div className="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-300 font-medium">
                Student Name:
              </span>
              <strong className="text-slate-900 dark:text-white font-bold">
                {studentName}
              </strong>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-300 font-medium">
                Admission ID:
              </span>
              <strong className="text-slate-900 dark:text-white font-bold">
                {admissionId}
              </strong>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-300 font-medium">
                Course:
              </span>
              <span className="text-slate-800 dark:text-slate-200 font-semibold">
                {studentCourse}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500 dark:text-slate-300 font-medium">
                Payment Due Date:
              </span>
              <strong className="text-rose-600 dark:text-rose-400 font-bold">
                {dueDateText}
              </strong>
            </div>
          </div>

          {/* Remind Me Later Options (2 to 5 Days) */}
          <div className="bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/90 dark:border-amber-500/30 rounded-xl p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Clock size={13} className="text-amber-700 dark:text-amber-400" />
                <span>Remind Me Later Options:</span>
              </span>
              <span className="text-[10px] font-bold text-amber-900 dark:text-amber-300 bg-amber-200/80 dark:bg-amber-950/60 px-2 py-0.5 rounded">
                2 to 5 Days
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {reminderOptions.map((opt) => {
                const isSelected = selectedReminderDays === opt.days;
                return (
                  <button
                    key={opt.days}
                    type="button"
                    onClick={() => onSelectReminderDays && onSelectReminderDays(opt.days)}
                    className={`py-2 px-1 rounded-lg border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                      isSelected
                        ? "bg-amber-500 border-amber-600 text-slate-950 font-black shadow-xs ring-2 ring-amber-300 dark:ring-amber-500"
                        : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-amber-400 dark:hover:border-amber-500 hover:bg-amber-50/50 dark:hover:bg-amber-950/40 font-bold"
                    }`}
                  >
                    <span className="text-xs leading-none">
                      {opt.days} Days
                    </span>
                    <span
                      className={`text-[9.5px] leading-tight ${
                        isSelected
                          ? "text-slate-950 font-extrabold"
                          : "text-slate-400 font-medium"
                      }`}
                    >
                      {opt.date.split(",")[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="text-[10.5px] text-amber-800 dark:text-amber-300 font-medium leading-tight text-center pt-0.5">
              {selectedOpt?.desc}
            </p>
          </div>

          {/* Advisory note */}
          <p className="text-[11px] text-slate-500 dark:text-slate-300 leading-relaxed bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 rounded-lg p-2 text-center">
            Payment can be made online via UPI/Netbanking or directly at the{" "}
            <strong className="text-slate-800 dark:text-slate-200">
              {centerBranch}
            </strong>{" "}
            accounts desk.
          </p>
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 sm:p-4 bg-slate-50 dark:bg-[#0f172a] border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 relative">
          {/* Remind Me Later Split / Dropdown Button */}
          <div className="relative">
            <div className="inline-flex rounded-xl shadow-2xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden">
              <button
                type="button"
                onClick={() => {
                  if (onSetReminder) {
                    onSetReminder(selectedOpt.days, selectedOpt.date);
                  }
                }}
                className="px-3 sm:px-3.5 py-2 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5"
                title={`Snooze for ${selectedReminderDays} days`}
              >
                <Clock size={13} className="text-amber-600 dark:text-amber-400" />
                <span>Remind in {selectedReminderDays}d</span>
              </button>

              <button
                type="button"
                onClick={onToggleRemindDropdown}
                className="px-2 py-2 border-l border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white transition-colors cursor-pointer"
                title="Choose reminder days (2-5 days)"
              >
                <ChevronDown size={13} />
              </button>
            </div>

            {/* Popover Dropdown for 2-5 Days */}
            {isRemindDropdownOpen && (
              <div className="absolute left-0 bottom-full mb-1.5 w-56 bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl py-1.5 z-50 text-xs animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1 text-[10.5px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 mb-1">
                  Choose Snooze Duration
                </div>
                {reminderOptions.map((opt) => (
                  <button
                    key={opt.days}
                    type="button"
                    onClick={() => {
                      if (onSetReminder) {
                        onSetReminder(opt.days, opt.date);
                      }
                    }}
                    className={`w-full px-3 py-1.5 text-left flex items-center justify-between hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-colors cursor-pointer ${
                      selectedReminderDays === opt.days
                        ? "bg-amber-50/80 dark:bg-amber-950/60 font-black text-amber-900 dark:text-amber-300"
                        : "text-slate-700 dark:text-slate-300 font-semibold"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      <span>
                        In {opt.days} Days ({opt.date.split(",")[0]})
                      </span>
                    </div>
                    {selectedReminderDays === opt.days && (
                      <Check
                        size={13}
                        className="text-amber-700 dark:text-amber-400"
                      />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Pay Now Button */}
          <button
            type="button"
            onClick={handlePay}
            className="px-4 sm:px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <CreditCard size={14} />
            <span>Pay {installmentAmount} Online</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentDueModal;
