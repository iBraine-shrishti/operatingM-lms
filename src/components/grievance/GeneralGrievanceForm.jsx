import React, { useState } from "react";
import {
  AlertCircle,
  HelpCircle,
  ShieldAlert,
  Send,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

export const GeneralGrievanceForm = () => {
  const { currentUser, crmProfile } = useAuth();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: currentUser?.name || currentUser?.fullName || crmProfile?.name || "",
    email: currentUser?.email || crmProfile?.email || "",
    phone: currentUser?.phone || crmProfile?.phone || "",
    category: "Faculty & Mentorship",
    urgency: "Normal",
    subject: "",
    description: "",
    preferredResolution: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      // Save grievance ticket to local storage dossier
      try {
        const key = "om_lms_student_grievances";
        const existing = JSON.parse(localStorage.getItem(key) || "[]");
        const newTicket = {
          id: `GRV-${Date.now()}`,
          ...formData,
          createdAt: new Date().toISOString(),
          status: "Under Review",
        };
        localStorage.setItem(key, JSON.stringify([newTicket, ...existing]));
      } catch (err) {}

      setIsSubmitting(false);
      setIsSuccess(true);
      showToast("Grievance ticket registered. Academic team will respond within 24-48 hrs.", "success", "Ticket Created");
      setFormData({
        name: currentUser?.name || crmProfile?.name || "",
        email: currentUser?.email || crmProfile?.email || "",
        phone: currentUser?.phone || crmProfile?.phone || "",
        category: "Faculty & Mentorship",
        urgency: "Normal",
        subject: "",
        description: "",
        preferredResolution: "",
      });
    }, 400);
  };

  return (
    <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 sm:p-8 shadow-xs">
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <span className="text-[11px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wider block mb-1">
            Confidential Resolution Cell
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            Register Student Grievance
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Prompt escalation to the Academic Director & Operations Management for quick resolution.
          </p>
        </div>
        <div className="hidden sm:flex w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 items-center justify-center border border-red-200/60 dark:border-red-800/60">
          <ShieldAlert size={22} />
        </div>
      </div>

      {isSuccess && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm flex items-center space-x-3">
          <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
          <span>Your grievance ticket has been formally logged and forwarded to academy management.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91..."
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
              Grievance Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white"
            >
              <option value="Faculty & Mentorship">Faculty & Mentorship</option>
              <option value="Curriculum & Lecture Content">Curriculum & Lecture Content</option>
              <option value="Batch Timing & Scheduling">Batch Timing & Scheduling</option>
              <option value="Attendance & Exam Assessment">Attendance & Exam Assessment</option>
              <option value="LMS Portal & Video Technical Error">LMS Portal & Video Technical Error</option>
              <option value="Placement & Internship Cell">Placement & Internship Cell</option>
              <option value="Other">Other Academic Grievance</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
              Urgency Level *
            </label>
            <select
              name="urgency"
              value={formData.urgency}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white"
            >
              <option value="Normal">Normal (Response within 48h)</option>
              <option value="Urgent">Urgent (Response within 24h)</option>
              <option value="Critical">Critical (Immediate escalation to Director)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
            Subject Summary *
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            placeholder="Brief summary of your grievance or concern"
            className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
            Detailed Explanation *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            placeholder="Please detail the dates, modules, batch details, or incidents clearly..."
            className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white"
          />
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-xs cursor-pointer active:scale-98 transition-all disabled:opacity-50"
          >
            <Send size={15} />
            <span>{isSubmitting ? "Registering..." : "Submit Grievance Ticket"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
