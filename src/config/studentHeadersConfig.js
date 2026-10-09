import {
  BookOpen,
  Award,
  CheckSquare,
  BookCheck,
  FileText,
  MessagesSquare,
  Calendar,
  Activity,
  Image as ImageIcon,
} from "lucide-react";

/**
 * Standardized metadata configuration for all Student Page Headers.
 * Ensures 100% theme consistency across all student pages.
 */
export const STUDENT_HEADERS_CONFIG = {
  enrolledCourses: {
    category: "Operating Media Masterclass Curriculum",
    badgeText: "Active Batches",
    title: "My Enrolled Courses",
    description:
      "Comprehensive hands-on digital marketing, SEO, analytics, and development programs with live industry projects and verified credentials.",
    icon: BookOpen,
  },
  achievements: {
    category: "Official Credentials & Honor Hub",
    badgeText: "CRM Verified",
    title: "Student Certifications & Honor Badges",
    description:
      "Verified course completion batches, diplomas, and milestone badges synchronized with Operating Media CRM.",
    icon: Award,
  },
  myAssignments: {
    category: "Practical Assessment & Capstone",
    badgeText: "Submissions Active",
    title: "My Assignments",
    description:
      "Submit your live client audits, campaign spreadsheets, Figma design decks, and tracking implementations.",
    icon: BookCheck,
  },
  myQuizzes: {
    category: "Assessment & Certification Hub",
    badgeText: "Examination Bank",
    title: "My Quizzes",
    description:
      "Test your domain mastery across enrolled modules, meet passing criteria, and track your verified certification examination scores.",
    icon: CheckSquare,
  },
  notes: {
    category: "Study Space & Notebook",
    badgeText: "Personal Library",
    title: "Study Notes & Reference Notebook",
    description:
      "Search, filter, and review key formulas, frameworks, definitions, and technical checklists across all your enrolled courses.",
    icon: FileText,
  },
  forums: {
    category: "Community Knowledge Hub",
    badgeText: "Active Discussions",
    title: "Forums & Discussions",
    description:
      "Collaborate with peers, ask tricky digital marketing & coding doubts, and receive answers directly from Operating Media mentors and instructors.",
    icon: MessagesSquare,
  },
  schedule: {
    category: "Academic Calendar & Timetable",
    badgeText: "Live Batch Sync",
    title: "Classroom Schedule & Curriculum",
    description:
      "Real-time enrolled batch schedule, active lecture timings, and upcoming curriculum sessions.",
    icon: Calendar,
  },
  activity: {
    category: "Audit Trail & Activity Log",
    badgeText: "Real-Time Live",
    title: "My Learning Activity & Timeline",
    description:
      "Chronological audit timeline tracking your course progress, quiz submissions, assignment evaluations, and certifications.",
    icon: Activity,
  },
  gallery: {
    category: "Campus Life & Practical Sessions",
    badgeText: "Media Archive",
    title: "Classroom & Event Gallery",
    description:
      "Glimpses of offline workshops, campus events, hackathons, convocation ceremonies, and live mentoring sessions.",
    icon: ImageIcon,
  },
};

export default STUDENT_HEADERS_CONFIG;
