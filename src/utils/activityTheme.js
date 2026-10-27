import { 
  Activity, Award, BookOpen, CheckCircle2, CheckSquare, 
  MessagesSquare, FileText, UserPlus, GraduationCap 
} from "lucide-react";

/**
 * Maps activity types to their respective styling, icons, and display labels.
 * Used across Student Timeline and Activity Audit views.
 *
 * @param {string} type - Event category (e.g. 'enrollment', 'quiz', 'assignment', etc.)
 * @returns {object} Theme configuration object
 */
export const getActivityTheme = (type) => {
  switch (type) {
    case "enrollment":
      return {
        icon: UserPlus,
        badgeBg: "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-500/40",
        iconBg: "bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/40",
        dotColor: "bg-blue-600 dark:bg-blue-400",
        label: "Program Enrollment",
      };
    case "quiz":
      return {
        icon: CheckSquare,
        badgeBg: "bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-500/40",
        iconBg: "bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-500/40",
        dotColor: "bg-purple-600 dark:bg-purple-400",
        label: "Quiz Exam Passed",
      };
    case "certificate":
      return {
        icon: Award,
        badgeBg: "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/40",
        iconBg: "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/40",
        dotColor: "bg-emerald-500 dark:bg-emerald-400",
        label: "Certificate Issued",
      };
    case "completion":
      return {
        icon: GraduationCap,
        badgeBg: "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-500/40",
        iconBg: "bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/40",
        dotColor: "bg-indigo-600 dark:bg-indigo-400",
        label: "Curriculum Progress",
      };
    case "assignment":
      return {
        icon: FileText,
        badgeBg: "bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-500/40",
        iconBg: "bg-sky-100 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-500/40",
        dotColor: "bg-sky-600 dark:bg-sky-400",
        label: "Assignment Submitted",
      };
    case "grading":
      return {
        icon: CheckCircle2,
        badgeBg: "bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-500/40",
        iconBg: "bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-500/40",
        dotColor: "bg-rose-500 dark:bg-rose-400",
        label: "Assignment Graded",
      };
    case "lecture":
      return {
        icon: BookOpen,
        badgeBg: "bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-500/40",
        iconBg: "bg-teal-100 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 border-teal-200 dark:border-teal-500/40",
        dotColor: "bg-teal-600 dark:bg-teal-400",
        label: "Lecture Attended",
      };
    case "discussion":
      return {
        icon: MessagesSquare,
        badgeBg: "bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-500/40",
        iconBg: "bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/40",
        dotColor: "bg-amber-500 dark:bg-amber-400",
        label: "Forum Resolved",
      };
    default:
      return {
        icon: Activity,
        badgeBg: "bg-slate-100 dark:bg-slate-850 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700",
        iconBg: "bg-slate-100 dark:bg-slate-850 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700",
        dotColor: "bg-slate-500 dark:bg-slate-400",
        label: "System Event",
      };
  }
};
