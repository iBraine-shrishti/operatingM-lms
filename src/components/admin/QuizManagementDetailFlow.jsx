import React, { useState, useMemo } from "react";
import {
  ArrowLeft,
  ChevronDown,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Download,
  Users,
  Calendar,
  Clock,
  Award,
  Layers,
  Grid,
  FileText,
  UserCheck,
  Check,
  X,
  ExternalLink,
  ChevronRight,
  Eye,
  BarChart3,
  TrendingUp,
  Shield,
  BookOpen,
  Sparkles,
  Play,
  Share2,
} from "lucide-react";
import { useToast } from "../../context/ToastContext";

// Comprehensive 20 questions for Digital Marketing Aptitude Quiz
const DEFAULT_QUESTIONS = [
  {
    id: 1,
    title: "What is Digital Marketing?",
    options: [
      {
        id: "a",
        text: "Marketing through digital channels such as search engines, social media, email, and websites",
        isCorrect: true,
      },
      {
        id: "b",
        text: "Traditional print advertising and billboards in physical locations",
        isCorrect: false,
      },
      {
        id: "c",
        text: "Physical door-to-door sales marketing and telemarketing without internet",
        isCorrect: false,
      },
      {
        id: "d",
        text: "Radio broadcasts only with no online web component",
        isCorrect: false,
      },
    ],
    explanation:
      "Digital marketing encompasses all marketing efforts that use an electronic device or the internet to connect with current and prospective customers.",
    correctRate: 0,
    unattempted: 100,
  },
  {
    id: 2,
    title: "Which channel is considered an inbound marketing channel?",
    options: [
      {
        id: "a",
        text: "Search Engine Optimization (SEO) and high-value educational content",
        isCorrect: true,
      },
      { id: "b", text: "Cold unsolicited telephone calls", isCorrect: false },
      { id: "c", text: "Mass spam promotional emails", isCorrect: false },
      { id: "d", text: "TV commercial interruptions", isCorrect: false },
    ],
    explanation:
      "Inbound marketing focuses on attracting customers through helpful content, SEO, and organic social media.",
    correctRate: 0,
    unattempted: 100,
  },
  {
    id: 3,
    title: "What does CTR stand for in online advertising?",
    options: [
      { id: "a", text: "Click-Through Rate", isCorrect: true },
      { id: "b", text: "Customer Timing Ratio", isCorrect: false },
      { id: "c", text: "Cost Targeting Reach", isCorrect: false },
      { id: "d", text: "Content Transaction Return", isCorrect: false },
    ],
    explanation:
      "CTR (Click-Through Rate) is the ratio of users who click on a specific link to the number of total users who view a page, email, or advertisement.",
    correctRate: 0,
    unattempted: 100,
  },
  {
    id: 4,
    title: "What is the primary objective of Search Engine Optimization (SEO)?",
    options: [
      {
        id: "a",
        text: "Increasing visibility and organic ranking on search engine result pages (SERPs)",
        isCorrect: true,
      },
      {
        id: "b",
        text: "Paying for top sponsor banners on search pages",
        isCorrect: false,
      },
      {
        id: "c",
        text: "Sending bulk newsletters to unverified subscribers",
        isCorrect: false,
      },
      {
        id: "d",
        text: "Hosting webinars exclusively on LinkedIn",
        isCorrect: false,
      },
    ],
    explanation:
      "SEO optimizes websites to rank organically without paid placement fees on search engines.",
    correctRate: 0,
    unattempted: 100,
  },
  {
    id: 5,
    title:
      "Which metric measures the cost of generating one conversion or lead?",
    options: [
      { id: "a", text: "CPA (Cost Per Acquisition / Action)", isCorrect: true },
      { id: "b", text: "CPM (Cost Per Mille / Thousand)", isCorrect: false },
      { id: "c", text: "Bounce Rate", isCorrect: false },
      { id: "d", text: "Impression Share", isCorrect: false },
    ],
    explanation:
      "CPA calculates total advertising spend divided by total conversions generated.",
    correctRate: 0,
    unattempted: 100,
  },
  {
    id: 6,
    title:
      "In Google Ads, what factor determines Ad Rank alongside the bid amount?",
    options: [
      {
        id: "a",
        text: "Quality Score (ad relevance, expected CTR, and landing page experience)",
        isCorrect: true,
      },
      {
        id: "b",
        text: "The number of followers on the advertiser's Twitter account",
        isCorrect: false,
      },
      {
        id: "c",
        text: "The physical distance between headquarters and Silicon Valley",
        isCorrect: false,
      },
      {
        id: "d",
        text: "How many total employees work at the company",
        isCorrect: false,
      },
    ],
    explanation:
      "Ad Rank is determined by max CPC bid multiplied by Quality Score and ad extensions impact.",
    correctRate: 0,
    unattempted: 100,
  },
  {
    id: 7,
    title:
      "What is the recommended character length for an SEO Meta Title tag?",
    options: [
      { id: "a", text: "50 to 60 characters", isCorrect: true },
      { id: "b", text: "150 to 200 characters", isCorrect: false },
      { id: "c", text: "10 to 15 characters", isCorrect: false },
      { id: "d", text: "Unlimited characters", isCorrect: false },
    ],
    explanation:
      "Search engines typically truncate titles longer than 60 characters in desktop SERPs.",
    correctRate: 0,
    unattempted: 100,
  },
  {
    id: 8,
    title:
      "Which Google Analytics 4 (GA4) feature records specific user interactions like clicks, scrolls, and video plays?",
    options: [
      { id: "a", text: "Events and Parameters", isCorrect: true },
      { id: "b", text: "Hit Counter Widgets", isCorrect: false },
      { id: "c", text: "Pageview sessions only", isCorrect: false },
      { id: "d", text: "Cookie Banners", isCorrect: false },
    ],
    explanation:
      "GA4 is completely event-driven, capturing all web actions as distinct events with custom parameters.",
    correctRate: 0,
    unattempted: 100,
  },
  {
    id: 9,
    title:
      "What type of marketing involves partnering with influential creators to endorse products?",
    options: [
      { id: "a", text: "Influencer Marketing", isCorrect: true },
      { id: "b", text: "Guerrilla Print Marketing", isCorrect: false },
      { id: "c", text: "Affiliate Link Cloaking", isCorrect: false },
      { id: "d", text: "Telemarketing Outreach", isCorrect: false },
    ],
    explanation:
      "Influencer marketing leverages established social media creators to reach dedicated niche audiences.",
    correctRate: 0,
    unattempted: 100,
  },
  {
    id: 10,
    title: "Which HTTP status code signifies a permanent URL redirect?",
    options: [
      { id: "a", text: "301 Moved Permanently", isCorrect: true },
      { id: "b", text: "404 Not Found", isCorrect: false },
      { id: "c", text: "500 Internal Server Error", isCorrect: false },
      { id: "d", text: "200 OK", isCorrect: false },
    ],
    explanation:
      "A 301 status tells search engine crawlers that link equity and traffic should be passed permanently to the new target URL.",
    correctRate: 0,
    unattempted: 100,
  },
  {
    id: 11,
    title:
      "What does 'ROAS' stand for in paid campaign performance evaluation?",
    options: [
      { id: "a", text: "Return On Ad Spend", isCorrect: true },
      { id: "b", text: "Rate Of Audience Shift", isCorrect: false },
      { id: "c", text: "Return On Organic Search", isCorrect: false },
      { id: "d", text: "Ratio Of Active Subscribers", isCorrect: false },
    ],
    explanation:
      "ROAS measures gross revenue generated for every dollar invested into digital advertising.",
    correctRate: 0,
    unattempted: 100,
  },
  {
    id: 12,
    title:
      "Which tool is primarily used for keyword research, backlink analysis, and competitor audits?",
    options: [
      { id: "a", text: "Semrush / Ahrefs", isCorrect: true },
      { id: "b", text: "Adobe Photoshop", isCorrect: false },
      { id: "c", text: "Visual Studio Code", isCorrect: false },
      { id: "d", text: "Microsoft Excel only", isCorrect: false },
    ],
    explanation:
      "Semrush and Ahrefs are industry-standard enterprise suites for search intelligence, domain authority, and rank tracking.",
    correctRate: 0,
    unattempted: 100,
  },
  {
    id: 13,
    title:
      "In email marketing, what is the best practice before sending marketing emails under GDPR?",
    options: [
      {
        id: "a",
        text: "Obtaining explicit opt-in consent and offering a one-click unsubscribe mechanism",
        isCorrect: true,
      },
      {
        id: "b",
        text: "Scraping email addresses from random public LinkedIn groups",
        isCorrect: false,
      },
      {
        id: "c",
        text: "Purchasing third-party cold email lists with no consent",
        isCorrect: false,
      },
      {
        id: "d",
        text: "Hiding company physical address in the footer",
        isCorrect: false,
      },
    ],
    explanation:
      "GDPR and CAN-SPAM require explicit permission and clear opt-out options for commercial messaging.",
    correctRate: 0,
    unattempted: 100,
  },
  {
    id: 14,
    title: "What is an A/B split test in landing page optimization?",
    options: [
      {
        id: "a",
        text: "Comparing two variants (A and B) with one single variable changed to see which converts better",
        isCorrect: true,
      },
      {
        id: "b",
        text: "Testing two completely different websites built on different domains simultaneously",
        isCorrect: false,
      },
      {
        id: "c",
        text: "Running Facebook Ads on Monday and Google Ads on Tuesday",
        isCorrect: false,
      },
      {
        id: "d",
        text: "Deleting old pages without creating 301 redirects",
        isCorrect: false,
      },
    ],
    explanation:
      "A/B testing isolates a single hypothesis (e.g. headline or CTA button color) to optimize conversion rate scientifically.",
    correctRate: 0,
    unattempted: 100,
  },
  {
    id: 15,
    title:
      "Which social media platform is most effective for B2B lead generation?",
    options: [
      { id: "a", text: "LinkedIn", isCorrect: true },
      { id: "b", text: "Snapchat", isCorrect: false },
      { id: "c", text: "Pinterest", isCorrect: false },
      { id: "d", text: "Twitch", isCorrect: false },
    ],
    explanation:
      "LinkedIn is the premier global business network where decision makers and enterprise buyers connect.",
    correctRate: 0,
    unattempted: 100,
  },
  {
    id: 16,
    title: "What does remarketing / retargeting refer to in paid advertising?",
    options: [
      {
        id: "a",
        text: "Serving targeted ads to users who previously visited your website or engaged with your brand",
        isCorrect: true,
      },
      {
        id: "b",
        text: "Targeting people who have never heard of your company before",
        isCorrect: false,
      },
      {
        id: "c",
        text: "Changing your brand logo every quarter",
        isCorrect: false,
      },
      {
        id: "d",
        text: "Sending text messages at 2 AM automatically",
        isCorrect: false,
      },
    ],
    explanation:
      "Retargeting re-engages warm prospects who already demonstrated intent on your website.",
    correctRate: 0,
    unattempted: 100,
  },
  {
    id: 17,
    title: "Which tag informs search bots not to index a specific web page?",
    options: [
      {
        id: "a",
        text: '<meta name="robots" content="noindex, follow">',
        isCorrect: true,
      },
      { id: "b", text: "<script defer>", isCorrect: false },
      { id: "c", text: "<link rel='canonical'>", isCorrect: false },
      { id: "d", text: "<title>Hide</title>", isCorrect: false },
    ],
    explanation:
      "The noindex directive instructs crawlers like Googlebot to exclude the page from public search indexes.",
    correctRate: 0,
    unattempted: 100,
  },
  {
    id: 18,
    title: "What is 'evergreen content' in digital content marketing?",
    options: [
      {
        id: "a",
        text: "Content that remains relevant, valuable, and fresh to readers over a sustained period",
        isCorrect: true,
      },
      {
        id: "b",
        text: "News articles that become irrelevant in 24 hours",
        isCorrect: false,
      },
      {
        id: "c",
        text: "Seasonal holiday gift guide promotions only",
        isCorrect: false,
      },
      {
        id: "d",
        text: "Content about forestry and botany exclusively",
        isCorrect: false,
      },
    ],
    explanation:
      "Evergreen content continues driving traffic and authority months or years after initial publication.",
    correctRate: 0,
    unattempted: 100,
  },
  {
    id: 19,
    title: "What is the purpose of UTM parameters in marketing URLs?",
    options: [
      {
        id: "a",
        text: "Tracking traffic source, medium, campaign name, and content in analytics",
        isCorrect: true,
      },
      {
        id: "b",
        text: "Protecting links from hacker malware attacks",
        isCorrect: false,
      },
      {
        id: "c",
        text: "Automatically translating web copy into multiple languages",
        isCorrect: false,
      },
      {
        id: "d",
        text: "Compressing web page server transfer payloads",
        isCorrect: false,
      },
    ],
    explanation:
      "UTM (Urchin Tracking Module) codes allow analytics suites to accurately track precise marketing referral channels.",
    correctRate: 0,
    unattempted: 100,
  },
  {
    id: 20,
    title:
      "Which Google tool is specifically used to monitor search engine index status and crawl errors?",
    options: [
      { id: "a", text: "Google Search Console (GSC)", isCorrect: true },
      { id: "b", text: "Google AdSense", isCorrect: false },
      { id: "c", text: "Google Drive", isCorrect: false },
      { id: "d", text: "Google Merchant Center", isCorrect: false },
    ],
    explanation:
      "Google Search Console helps webmasters verify index coverage, submit sitemaps, and fix crawl issues.",
    correctRate: 0,
    unattempted: 100,
  },
];

// Activity Feed matching MANAGE-QUIZ2Activity.png
const INITIAL_ACTIVITIES = [
  {
    id: "act-1",
    type: "evaluated",
    subtitle: "Instructor evaluated Quiz for student",
    studentName: "admin",
    textPrefix: "Student ",
    textSuffix: " got 0 out of 20 in Quiz Digital Marketing Aptitude Quiz!",
    timestamp: "2 hours ago",
    date: "Feb 25, 2025",
  },
  {
    id: "act-2",
    type: "submitted",
    subtitle: "Student submitted the Quiz",
    studentName: "admin",
    textPrefix:
      "Quiz Digital Marketing Aptitude Quiz! was submitted by student ",
    textSuffix: "",
    timestamp: "3 hours ago",
    date: "Feb 25, 2025",
  },
  {
    id: "act-3",
    type: "evaluated",
    subtitle: "Instructor evaluated Quiz for student",
    studentName: "User User",
    textPrefix: "Student ",
    textSuffix: " got 5 out of 20 in Quiz Digital Marketing Aptitude Quiz!",
    timestamp: "5 hours ago",
    date: "Feb 25, 2025",
  },
  {
    id: "act-4",
    type: "submitted",
    subtitle: "Student submitted the Quiz",
    studentName: "User User",
    textPrefix:
      "Quiz Digital Marketing Aptitude Quiz! was submitted by student ",
    textSuffix: "",
    timestamp: "6 hours ago",
    date: "Feb 25, 2025",
  },
  {
    id: "act-5",
    type: "started",
    subtitle: "Student started a quiz",
    studentName: "User User",
    textPrefix: "Student ",
    textSuffix: " started the quiz Digital Marketing Aptitude Quiz!",
    timestamp: "6 hours ago",
    date: "Feb 25, 2025",
  },
  {
    id: "act-6",
    type: "retake",
    subtitle: "Quiz retake by Student",
    studentName: "User User",
    textPrefix: "Student ",
    textSuffix: " initiated retake for quiz Digital Marketing Aptitude Quiz!",
    timestamp: "7 hours ago",
    date: "Feb 25, 2025",
  },
  {
    id: "act-7",
    type: "evaluated",
    subtitle: "Instructor evaluated Quiz for student",
    studentName: "User User",
    textPrefix: "Student ",
    textSuffix: " got 0 out of 20 in Quiz Digital Marketing Aptitude Quiz!",
    timestamp: "8 hours ago",
    date: "Feb 25, 2025",
  },
  {
    id: "act-8",
    type: "submitted",
    subtitle: "Student submitted the Quiz",
    studentName: "User User",
    textPrefix:
      "Quiz Digital Marketing Aptitude Quiz! was submitted by student ",
    textSuffix: "",
    timestamp: "9 hours ago",
    date: "Feb 25, 2025",
  },
  {
    id: "act-9",
    type: "started",
    subtitle: "Student started a quiz",
    studentName: "User User",
    textPrefix: "Student ",
    textSuffix: " started the quiz Digital Marketing Aptitude Quiz!",
    timestamp: "9 hours ago",
    date: "Feb 25, 2025",
  },
];

// Student avatar component matching theme blue/indigo
const StudentAvatar = ({ name, size = 32 }) => {
  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 p-0.5 shadow-xs flex items-center justify-center shrink-0 border border-blue-400/40"
    >
      <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center overflow-hidden">
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <circle cx="18" cy="18" r="18" fill="#3B82F6" />
          <path
            d="M9 14C9 8 13 4 18 4C23 4 27 8 27 14C27 16 26 18 25 18C23 16 22 14 20 14C17 14 16 16 14 16C12 16 10 15 9 14Z"
            fill="#1E293B"
          />
          <circle cx="18" cy="17" r="7" fill="#E2E8F0" />
          <path
            d="M8 32C8 26 12 23 18 23C24 23 28 26 28 32H8Z"
            fill="#2563EB"
          />
          <path d="M15 23L18 26L21 23" stroke="#FFFFFF" strokeWidth="1.5" />
        </svg>
      </div>
    </div>
  );
};

export const QuizManagementDetailFlow = ({
  quiz = {
    id: "q-1",
    title: "Digital Marketing Aptitude Quiz!",
    completedDate: "February 25, 2025",
    totalQuestions: 20,
    totalMarks: 20,
    durationMinutes: 11,
    averageScore: 12.5,
    highScore: 25,
    lowScore: 0,
    totalSubmissions: 2,
  },
  onBack,
}) => {
  const { showToast } = useToast();

  // Active top-level tab: "Statistics" | "Activity" | "Submissions" | "View"
  const [activeTab, setActiveTab] = useState("Statistics");

  // Accordion panels in Statistics tab
  const [downloadStatsOpen, setDownloadStatsOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);

  // Checkbox selections for Download Statistics
  const [exportFields, setExportFields] = useState({
    startDate: true,
    endDate: true,
    id: true,
    studentName: true,
    score: true,
    questionScores: false,
    questionAnswers: false,
    scorePercentage: true,
    tagsPercentage: false,
  });
  const [selectedStudentForStats, setSelectedStudentForStats] =
    useState("All students");

  // Submissions sub-tab: "pending" | "complete"
  const [submissionTab, setSubmissionTab] = useState("pending");
  const [submissionSort, setSubmissionSort] = useState("By time");
  const [submissionSearch, setSubmissionSearch] = useState("");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Activity tab filters
  const [activitySearch, setActivitySearch] = useState("");
  const [activityTypeFilter, setActivityTypeFilter] = useState("All");

  // Statistics student search & sort
  const [statsStudentSearch, setStatsStudentSearch] = useState("");
  const [statsDateSort, setStatsDateSort] = useState("Date recorded");

  // View tab: active question index (0 to 19)
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [userSelectedOption, setUserSelectedOption] = useState({});
  const [showQuestionExplanation, setShowQuestionExplanation] = useState(false);

  // Assign Modals
  const [showAssignStudentModal, setShowAssignStudentModal] = useState(false);
  const [showAssignCourseModal, setShowAssignCourseModal] = useState(false);
  const [assignTargetInput, setAssignTargetInput] = useState("");

  // Evaluated student roster for Submissions
  const evaluatedSubmissions = [
    {
      id: "sub-1",
      studentName: "admin",
      score: 0,
      total: 20,
      percentage: "0%",
      attempt: 1,
      submittedAt: "Feb 25, 2025, 10:45 AM",
      evaluatedAt: "Feb 25, 2025, 11:15 AM",
      status: "Evaluated",
      statusColor: "text-rose-600 dark:text-rose-400",
      statusBg:
        "bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-800/60",
    },
    {
      id: "sub-2",
      studentName: "User User",
      score: 5,
      total: 20,
      percentage: "25%",
      attempt: 2,
      submittedAt: "Feb 25, 2025, 12:20 PM",
      evaluatedAt: "Feb 25, 2025, 01:10 PM",
      status: "Evaluated",
      statusColor: "text-blue-600 dark:text-cyan-400",
      statusBg:
        "bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800/60",
    },
  ];

  // Students list for Statistics roster
  const statsStudents = [
    { id: "st-1", name: "admin", score: 0 },
    { id: "st-2", name: "User User", score: 25 },
  ];

  const filteredStatsStudents = statsStudents.filter((s) =>
    s.name.toLowerCase().includes(statsStudentSearch.toLowerCase()),
  );

  // Filter activities
  const filteredActivities = useMemo(() => {
    return INITIAL_ACTIVITIES.filter((act) => {
      const matchesSearch =
        act.studentName.toLowerCase().includes(activitySearch.toLowerCase()) ||
        act.subtitle.toLowerCase().includes(activitySearch.toLowerCase()) ||
        act.textSuffix.toLowerCase().includes(activitySearch.toLowerCase());
      const matchesType =
        activityTypeFilter === "All" ||
        (activityTypeFilter === "Evaluations" && act.type === "evaluated") ||
        (activityTypeFilter === "Submissions" && act.type === "submitted") ||
        (activityTypeFilter === "Starts" && act.type === "started") ||
        (activityTypeFilter === "Retakes" && act.type === "retake");
      return matchesSearch && matchesType;
    });
  }, [activitySearch, activityTypeFilter]);

  // Handlers
  const handleGenerateStats = () => {
    showToast(
      `Statistics exported successfully for ${selectedStudentForStats}! CSV & Excel report downloaded.`,
      "success",
      "Stats Generated",
    );
    setDownloadStatsOpen(false);
  };

  const handleAssignStudentSubmit = (e) => {
    e.preventDefault();
    if (!assignTargetInput.trim()) {
      showToast("Please select or enter student name/email", "warning");
      return;
    }
    showToast(
      `Quiz "${quiz.title}" successfully assigned to student ${assignTargetInput}!`,
      "success",
      "Quiz Assigned",
    );
    setShowAssignStudentModal(false);
    setAssignTargetInput("");
    setAssignOpen(false);
  };

  const handleAssignCourseSubmit = (e) => {
    e.preventDefault();
    showToast(
      `Quiz "${quiz.title}" successfully assigned to all students in the selected course!`,
      "success",
      "Course Assigned",
    );
    setShowAssignCourseModal(false);
    setAssignOpen(false);
  };

  const currentQ = DEFAULT_QUESTIONS[activeQuestionIdx] || DEFAULT_QUESTIONS[0];

  return (
    <div className="space-y-6 select-none animate-in fade-in duration-200">
      {/* ------------------------------------------------------------- */}
      {/* 1. TOP BREADCRUMB & METADATA BAR                              */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center space-x-2">
          {onBack && (
            <button
              onClick={onBack}
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-cyan-400 transition-colors cursor-pointer py-1.5 px-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80"
              title="Return to Quizzes Overview"
            >
              <ArrowLeft size={16} />
              <span>Back to All Quizzes</span>
            </button>
          )}

          <span className="hidden sm:inline-block text-slate-300 dark:text-slate-700">
            |
          </span>

          <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-blue-800 text-[11px] font-bold px-2.5 py-0.5 rounded-md flex items-center gap-1.5 uppercase tracking-wider">
            <Shield size={12} className="text-blue-600 dark:text-cyan-400" />
            ADMIN QUIZ MANAGEMENT HUB
          </span>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <span className="inline-flex items-center space-x-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Active Assessment</span>
          </span>
          <span className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
            Pass Score: 80%
          </span>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. MAIN HEADER (Title, Course & Proportional Action Buttons)   */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-[30px] font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            {quiz.title || "Digital Marketing Aptitude Quiz!"}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1 font-medium flex items-center space-x-2">
            <span>{quiz.completedDate || "February 25, 2025"}</span>
            <span>•</span>
            <span className="text-blue-600 dark:text-cyan-400 font-semibold">
              {quiz.courseTitle || "Masters in Digital Marketing - Advanced Topics"}
            </span>
          </p>
        </div>

        {/* Header Right Actions & Duration Badges */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={() => {
              setActiveTab("Statistics");
              setDownloadStatsOpen(true);
              setAssignOpen(false);
            }}
            className="bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-xs px-3.5 py-2.5 rounded-xl transition-all shadow-xs flex items-center space-x-1.5 cursor-pointer whitespace-nowrap"
            title="Download Statistics (CSV / Excel)"
          >
            <Download size={14} />
            <span>Download Statistics</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("Statistics");
              setAssignOpen(true);
              setDownloadStatsOpen(false);
            }}
            className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-bold text-xs px-3.5 py-2.5 rounded-xl transition-all shadow-2xs flex items-center space-x-1.5 cursor-pointer whitespace-nowrap"
            title="Assign Quiz to Students or Courses"
          >
            <Users size={14} />
            <span>Assign Quiz</span>
          </button>

          {/* Duration & Questions Badges */}
          <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 px-3 py-2 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200">
            <span
              className="tabular-nums font-bold text-slate-900 dark:text-white"
              title="Duration"
            >
              {quiz.durationMinutes || 11}m
            </span>
            <span className="text-slate-400">/</span>
            <span
              className="tabular-nums font-bold text-blue-600 dark:text-cyan-400"
              title="Total Questions"
            >
              {quiz.totalQuestions || 20} Qs
            </span>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. TABS BAR: Statistics | Activity | Submissions | View       */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-1.5 shadow-2xs flex items-center space-x-1 sm:space-x-2 overflow-x-auto scrollbar-none">
        {[
          { key: "Statistics", label: "Statistics", icon: BarChart3 },
          { key: "Activity", label: "Activity", icon: TrendingUp },
          { key: "Submissions", label: "Submissions", icon: UserCheck },
          { key: "View", label: "View & Questions", icon: Eye },
        ].map((t) => {
          const isActive = activeTab === t.key;
          const IconC = t.icon;
          return (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`flex-1 min-w-[130px] sm:min-w-0 py-2.5 px-4 rounded-xl text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center space-x-2 whitespace-nowrap font-bold ${
                isActive
                  ? "bg-blue-600 text-white shadow-xs dark:shadow-[0_0_16px_rgba(37,99,235,0.4)]"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60"
              }`}
            >
              <IconC size={15} />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* ============================================================= */}
      {/* TAB 1: STATISTICS                                             */}
      {/* ============================================================= */}
      {activeTab === "Statistics" && (
        <div className="space-y-6">
          {/* Action Hub Cards (Clean, Logical, Non-Stretched Panels) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Panel 1: Download Statistics */}
            <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs">
              <button
                onClick={() => {
                  setDownloadStatsOpen(!downloadStatsOpen);
                }}
                className="w-full bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-850 text-slate-900 dark:text-white py-3.5 px-5 text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800"
              >
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-cyan-400 flex items-center justify-center">
                    <Download size={16} />
                  </div>
                  <div className="text-left">
                    <span className="block font-bold">Download Statistics</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">
                      Export assessment data & CSV reports
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-xs text-blue-600 dark:text-cyan-400 font-semibold">
                  <span>{downloadStatsOpen ? "Hide" : "Open"}</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${downloadStatsOpen ? "rotate-180" : ""}`}
                  />
                </div>
              </button>

              {/* EXPANDED FILTER PANEL */}
              {downloadStatsOpen && (
                <div className="p-4 sm:p-5 bg-white dark:bg-[#0b1329] text-xs space-y-4 animate-in slide-in-from-top-2 duration-150">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-[11px]">
                      Select Fields to Export:
                    </span>
                    <button
                      onClick={() => setDownloadStatsOpen(false)}
                      className="text-[11px] font-bold text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                    >
                      CLOSE
                    </button>
                  </div>

                  {/* 9 Export Checkboxes */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-slate-700 dark:text-slate-300">
                    {[
                      { key: "startDate", label: "Start Date/Time" },
                      { key: "endDate", label: "End Date/Time" },
                      { key: "id", label: "ID" },
                      { key: "studentName", label: "Student Name" },
                      { key: "score", label: "Score" },
                      {
                        key: "questionScores",
                        label: "Question scores",
                      },
                      {
                        key: "questionAnswers",
                        label: "Question Answers",
                      },
                      { key: "scorePercentage", label: "Score %" },
                      { key: "tagsPercentage", label: "Tags %" },
                    ].map((item) => (
                      <label
                        key={item.key}
                        className="flex items-center space-x-2 cursor-pointer hover:text-blue-600 dark:hover:text-cyan-400 select-none p-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900/50"
                      >
                        <input
                          type="checkbox"
                          checked={exportFields[item.key]}
                          onChange={(e) =>
                            setExportFields({
                              ...exportFields,
                              [item.key]: e.target.checked,
                            })
                          }
                          className="rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                        <span className="text-xs truncate">{item.label}</span>
                      </label>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <div className="relative w-full sm:w-52">
                      <select
                        value={selectedStudentForStats}
                        onChange={(e) =>
                          setSelectedStudentForStats(e.target.value)
                        }
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl pl-3 pr-8 py-2 text-xs appearance-none cursor-pointer focus:outline-hidden focus:border-blue-500"
                      >
                        <option value="All students">All students</option>
                        <option value="admin">admin</option>
                        <option value="User User">User User</option>
                      </select>
                      <ChevronDown
                        size={14}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                      />
                    </div>

                    <button
                      onClick={handleGenerateStats}
                      className="bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold py-2 px-5 rounded-xl shadow-xs text-xs tracking-wider transition-colors cursor-pointer flex items-center justify-center space-x-1.5 shrink-0"
                    >
                      <Download size={13} />
                      <span>Generate Stats</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Panel 2: Assign Quiz */}
            <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs">
              <button
                onClick={() => {
                  setAssignOpen(!assignOpen);
                }}
                className="w-full bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-850 text-slate-900 dark:text-white py-3.5 px-5 text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800"
              >
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                    <Users size={16} />
                  </div>
                  <div className="text-left">
                    <span className="block font-bold">Assign Assessment</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">
                      Assign to specific learners or course batches
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-xs text-blue-600 dark:text-cyan-400 font-semibold">
                  <span>{assignOpen ? "Hide" : "Open"}</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${assignOpen ? "rotate-180" : ""}`}
                  />
                </div>
              </button>

              {/* EXPANDED ASSIGN PANEL */}
              {assignOpen && (
                <div className="p-4 sm:p-5 bg-white dark:bg-[#0b1329] text-xs space-y-3 animate-in slide-in-from-top-2 duration-150">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-[11px]">
                      Quick Assignment Modes:
                    </span>
                    <button
                      onClick={() => setAssignOpen(false)}
                      className="text-[11px] font-bold text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                    >
                      CLOSE
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <button
                      onClick={() => setShowAssignStudentModal(true)}
                      className="bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl shadow-xs text-xs transition-colors cursor-pointer flex items-center justify-center space-x-2"
                    >
                      <UserCheck size={14} />
                      <span>Assign to student</span>
                    </button>

                    <button
                      onClick={() => setShowAssignCourseModal(true)}
                      className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-bold py-2.5 px-4 rounded-xl transition-colors cursor-pointer flex items-center justify-center space-x-2"
                    >
                      <Layers size={14} />
                      <span>Assign to course students</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 4 Reusable KPI Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            <div className="bg-white dark:bg-[#0b1329] border border-blue-200/80 dark:border-blue-800/60 rounded-2xl p-4 shadow-xs hover:-translate-y-0.5 transition-all">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                  <BarChart3 size={20} />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-blue-700 dark:text-cyan-400 block uppercase tracking-wider">
                    Average Score
                  </span>
                  <strong className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
                    {quiz.averageScore || "12.5"}%
                  </strong>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#0b1329] border border-teal-200/80 dark:border-teal-500/30 rounded-2xl p-4 shadow-xs hover:-translate-y-0.5 transition-all">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-500/15 border border-teal-200 dark:border-teal-500/40 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-teal-700 dark:text-teal-400 block uppercase tracking-wider">
                    High Score
                  </span>
                  <strong className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
                    {quiz.highScore || "25"}%
                  </strong>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#0b1329] border border-rose-200/80 dark:border-rose-500/30 rounded-2xl p-4 shadow-xs hover:-translate-y-0.5 transition-all">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-500/15 border border-rose-200 dark:border-rose-500/40 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-rose-700 dark:text-rose-400 block uppercase tracking-wider">
                    Low Score
                  </span>
                  <strong className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
                    {quiz.lowScore !== undefined ? quiz.lowScore : "0"}%
                  </strong>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#0b1329] border border-indigo-200/80 dark:border-indigo-500/30 rounded-2xl p-4 shadow-xs hover:-translate-y-0.5 transition-all">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/15 border border-indigo-200 dark:border-indigo-500/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                  <Users size={20} />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-indigo-700 dark:text-indigo-400 block uppercase tracking-wider">
                    Total Submissions
                  </span>
                  <strong className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
                    {quiz.totalSubmissions || "2"} Attempts
                  </strong>
                </div>
              </div>
            </div>
          </div>

          {/* Main Visual Donut Chart Card */}
          <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-7 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Score Distribution Breakdown
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Overall assessment attempts stratified by score intervals.
                </p>
              </div>

              {/* Color Legend with Modern Professional Palette */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-700 dark:text-slate-300">
                <div className="flex items-center space-x-1.5">
                  <span className="w-3.5 h-2.5 rounded-xs bg-[#e06a6a] shrink-0" />
                  <span>Less than 25%</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-3.5 h-2.5 rounded-xs bg-[#38bdf8] shrink-0" />
                  <span>25% to 50%</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-3.5 h-2.5 rounded-xs bg-[#2563eb] shrink-0" />
                  <span>50% to 75%</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-3.5 h-2.5 rounded-xs bg-[#10b981] shrink-0" />
                  <span>More than 75%</span>
                </div>
              </div>
            </div>

            {/* Donut Graphic & Stats Column */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center py-2">
              <div className="md:col-span-7 flex justify-center items-center">
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
                  <svg
                    viewBox="0 0 200 200"
                    className="w-full h-full -rotate-90 drop-shadow-sm"
                  >
                    <circle
                      cx="100"
                      cy="100"
                      r="70"
                      fill="transparent"
                      stroke="#f1f5f9"
                      className="dark:stroke-slate-800"
                      strokeWidth="38"
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="70"
                      fill="transparent"
                      stroke="#e06a6a"
                      strokeWidth="38"
                      strokeDasharray="439.8"
                      strokeDashoffset="0"
                    />
                    <line
                      x1="100"
                      y1="12"
                      x2="100"
                      y2="50"
                      stroke="#ffffff"
                      strokeWidth="2"
                    />
                  </svg>
                  <div className="absolute w-36 h-36 rounded-full bg-white dark:bg-[#0b1329] border border-slate-200/80 dark:border-slate-800 shadow-inner flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-slate-900 dark:text-white">
                      100%
                    </span>
                    <span className="text-[11px] font-semibold text-rose-600 dark:text-rose-400">
                      &lt; 25% Score
                    </span>
                  </div>
                </div>
              </div>

              {/* Statistics List */}
              <div className="md:col-span-5 bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200/70 dark:border-slate-800/80 rounded-2xl p-5 space-y-3.5 text-xs sm:text-sm">
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/70 dark:border-slate-800">
                  <span className="text-slate-600 dark:text-slate-400 font-medium">
                    Average Score
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white text-base tabular-nums">
                    {quiz.averageScore || "12.5"}%
                  </span>
                </div>

                <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/70 dark:border-slate-800">
                  <span className="text-slate-600 dark:text-slate-400 font-medium">
                    High Score
                  </span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 text-base tabular-nums">
                    {quiz.highScore || "25"}%
                  </span>
                </div>

                <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/70 dark:border-slate-800">
                  <span className="text-slate-600 dark:text-slate-400 font-medium">
                    Low Score
                  </span>
                  <span className="font-bold text-rose-600 dark:text-rose-400 text-base tabular-nums">
                    {quiz.lowScore !== undefined ? quiz.lowScore : "0"}%
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400 font-medium">
                    Total Submissions
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white text-base tabular-nums">
                    {quiz.totalSubmissions || "2"}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Student Performance Roster */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="relative w-full sm:w-64">
                  <Search
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                  <input
                    type="text"
                    value={statsStudentSearch}
                    onChange={(e) => setStatsStudentSearch(e.target.value)}
                    placeholder="Search Student"
                    className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div className="relative">
                  <select
                    value={statsDateSort}
                    onChange={(e) => setStatsDateSort(e.target.value)}
                    className="bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 rounded-xl pl-3 pr-8 py-1.5 text-xs text-slate-700 dark:text-slate-300 appearance-none cursor-pointer focus:outline-hidden focus:border-blue-500"
                  >
                    <option value="Date recorded">Date recorded</option>
                    <option value="Score High to Low">Score High to Low</option>
                    <option value="Score Low to High">Score Low to High</option>
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                </div>
              </div>

              {/* Students List Rows */}
              <div className="divide-y divide-slate-100 dark:divide-slate-800/80 rounded-xl border border-slate-100 dark:border-slate-800/80 overflow-hidden">
                {filteredStatsStudents.length === 0 ? (
                  <p className="text-xs text-slate-400 py-4 text-center">
                    No students found.
                  </p>
                ) : (
                  filteredStatsStudents.map((st) => (
                    <div
                      key={st.id}
                      className="p-3 sm:px-4 flex items-center justify-between hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors bg-white dark:bg-[#0b1329]"
                    >
                      <div className="flex items-center space-x-3">
                        <StudentAvatar name={st.name} size={34} />
                        <div>
                          <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 block">
                            {st.name}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            Completed Assessment Attempt
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-slate-900 dark:text-white block tabular-nums">
                          {st.score}%
                        </span>
                        <span className="text-[10px] text-slate-400">
                          Final Score
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================= */}
      {/* TAB 2: ACTIVITY                                               */}
      {/* ============================================================= */}
      {activeTab === "Activity" && (
        <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-7 shadow-xs space-y-6">
          {/* Activity Filters Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="relative flex-1 max-w-md">
              <Search
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
              <input
                type="text"
                value={activitySearch}
                onChange={(e) => setActivitySearch(e.target.value)}
                placeholder="Type to search activities..."
                className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div className="flex items-center space-x-2">
              <select
                value={activityTypeFilter}
                onChange={(e) => setActivityTypeFilter(e.target.value)}
                className="bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer focus:outline-hidden focus:border-blue-500"
              >
                <option value="All">All Events</option>
                <option value="Evaluations">Evaluations</option>
                <option value="Submissions">Submissions</option>
                <option value="Starts">Starts</option>
                <option value="Retakes">Retakes</option>
              </select>
            </div>
          </div>

          {/* Activity Timeline List */}
          <div className="space-y-4 pl-6 border-l-2 border-slate-200 dark:border-slate-800 relative ml-2">
            {filteredActivities.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">
                No activity records matched your filter.
              </p>
            ) : (
              filteredActivities.map((act) => (
                <div
                  key={act.id}
                  className="relative flex items-start space-x-4 group"
                >
                  <div className="absolute -left-[31px] top-3 w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600 border-2 border-white dark:border-[#0b1329] group-hover:bg-blue-600 transition-colors" />

                  <div className="shrink-0 pt-0.5">
                    <StudentAvatar name={act.studentName} size={36} />
                  </div>

                  <div className="space-y-0.5 min-w-0 flex-1">
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                      {act.subtitle}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-snug">
                      {act.textPrefix}
                      <strong className="text-blue-600 dark:text-cyan-400 font-bold">
                        {act.studentName}
                      </strong>
                      {act.textSuffix}
                    </p>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 block pt-0.5">
                      {act.timestamp} • {act.date}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ============================================================= */}
      {/* TAB 3: SUBMISSIONS                                            */}
      {/* ============================================================= */}
      {activeTab === "Submissions" && (
        <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-7 shadow-xs space-y-6">
          {/* Submissions Action Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSubmissionTab("pending")}
                className={`text-xs px-4 py-2 rounded-xl transition-all cursor-pointer font-bold ${
                  submissionTab === "pending"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800/60"
                }`}
              >
                Pending evaluation
              </button>
              <button
                onClick={() => setSubmissionTab("complete")}
                className={`text-xs px-4 py-2 rounded-xl transition-all cursor-pointer font-bold ${
                  submissionTab === "complete"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800/60"
                }`}
              >
                Evaluation complete (2)
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
                <input
                  type="text"
                  value={submissionSearch}
                  onChange={(e) => setSubmissionSearch(e.target.value)}
                  placeholder="Search Student"
                  className="w-full sm:w-48 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 rounded-xl pl-3 pr-7 py-1.5 text-xs text-slate-700 dark:text-slate-200 flex items-center space-x-1 cursor-pointer"
                >
                  <span>{submissionSort}</span>
                  <ChevronDown size={14} className="text-slate-400" />
                </button>

                {showSortDropdown && (
                  <div className="absolute right-0 top-full mt-1 w-36 bg-white dark:bg-[#121c31] border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl py-1 z-20 text-xs">
                    <button
                      onClick={() => {
                        setSubmissionSort("By time");
                        setShowSortDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer ${
                        submissionSort === "By time"
                          ? "bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 font-bold"
                          : "text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      By time
                    </button>
                    <button
                      onClick={() => {
                        setSubmissionSort("Alphabetical");
                        setShowSortDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer ${
                        submissionSort === "Alphabetical"
                          ? "bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 font-bold"
                          : "text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      Alphabetical
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submissions Tab Content */}
          {submissionTab === "pending" ? (
            <div className="py-12 text-center text-slate-400 dark:text-slate-500 text-xs space-y-2">
              <AlertTriangle
                size={28}
                className="mx-auto text-slate-300 dark:text-slate-600"
              />
              <p className="font-semibold text-slate-600 dark:text-slate-300 text-sm">
                No Pending Submissions
              </p>
              <p>
                All student submissions for this quiz have been evaluated and graded.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {evaluatedSubmissions.map((sub) => (
                <div
                  key={sub.id}
                  className="bg-white dark:bg-[#0b1329] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-300 dark:hover:border-slate-700 transition-colors shadow-2xs"
                >
                  <div className="flex items-center space-x-3.5">
                    <StudentAvatar name={sub.studentName} size={42} />
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                        {sub.studentName}
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        Attempt {sub.attempt} • Submitted {sub.submittedAt}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <span className="text-sm font-bold text-slate-900 dark:text-white block tabular-nums">
                        {sub.score} / {sub.total} ({sub.percentage})
                      </span>
                      <span className="text-[10px] text-slate-400">
                        Evaluated {sub.evaluatedAt}
                      </span>
                    </div>

                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border ${sub.statusBg} ${sub.statusColor}`}
                    >
                      {sub.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ============================================================= */}
      {/* TAB 4: VIEW & QUESTIONS                                       */}
      {/* ============================================================= */}
      {activeTab === "View" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* Left 8 cols: Question Percentage Donut */}
            <div className="md:col-span-8 bg-white dark:bg-[#0b1329] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  Overall correct percentages by each question:
                </span>
                <div className="flex items-center space-x-1.5 text-slate-500">
                  <span className="w-3 h-3 rounded-xs bg-emerald-500" />
                  <span>Correct (0%)</span>
                </div>
                <div className="flex items-center space-x-1.5 text-slate-500">
                  <span className="w-3 h-3 rounded-xs bg-rose-500" />
                  <span>Incorrect (0%)</span>
                </div>
                <div className="flex items-center space-x-1.5 text-slate-500">
                  <span className="w-3 h-3 rounded-xs bg-blue-500" />
                  <span>Unattempted (100%)</span>
                </div>
              </div>

              <div className="flex items-center justify-center py-4">
                <div className="w-44 h-44 rounded-full border-8 border-blue-500/80 bg-blue-50/20 dark:bg-blue-950/20 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">
                    20 Qs
                  </span>
                  <span className="text-xs text-slate-400">Total In Bank</span>
                </div>
              </div>
            </div>

            {/* Right 4 cols: Score Summary Card */}
            <div className="md:col-span-4 bg-white dark:bg-[#0b1329] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                    NaN/20
                    <span className="text-sm font-bold text-rose-600 dark:text-rose-400 ml-1">
                      Failed
                    </span>
                  </h3>
                  <span className="inline-block mt-1 text-[11px] font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-md">
                    Quiz Submitted
                  </span>
                </div>

                <div className="w-8 h-6 border border-blue-500 rounded-xs flex items-center divide-x divide-blue-500">
                  <div className="w-1/2 h-full" />
                  <div className="w-1/2 h-full" />
                </div>
              </div>

              <div className="pt-2 space-y-3">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() =>
                      showToast(
                        "Quiz retake mode initiated! Questions reset for new attempt.",
                        "info",
                        "Retake Started",
                      )
                    }
                    className="flex-1 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl shadow-xs text-xs tracking-wide transition-all cursor-pointer text-center"
                  >
                    Retake Quiz
                  </button>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 whitespace-nowrap">
                    Retakes Left : 1
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowQuestionExplanation(!showQuestionExplanation)
                  }
                  className="text-[11px] font-bold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 tracking-wider uppercase transition-colors cursor-pointer"
                >
                  {showQuestionExplanation
                    ? "HIDE EXPLANATION"
                    : "SHOW QUESTIONS"}
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Section: Question Inspector */}
          <div className="bg-white dark:bg-[#0b1329] border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
            <div className="bg-slate-100 dark:bg-slate-900/80 px-5 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-200">
              <span>
                Question {activeQuestionIdx + 1} of {DEFAULT_QUESTIONS.length}
              </span>
              <span className="text-blue-600 dark:text-cyan-400 font-semibold">
                1 Mark
              </span>
            </div>

            <div className="p-5 sm:p-7 space-y-5">
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                {currentQ.title}
              </h4>

              <div className="space-y-2.5 max-w-2xl">
                {currentQ.options.map((opt) => {
                  const isSelected = userSelectedOption[currentQ.id] === opt.id;
                  return (
                    <label
                      key={opt.id}
                      onClick={() =>
                        setUserSelectedOption({
                          ...userSelectedOption,
                          [currentQ.id]: opt.id,
                        })
                      }
                      className={`flex items-start space-x-3 p-3.5 rounded-xl border text-xs sm:text-sm cursor-pointer transition-colors ${
                        opt.isCorrect && showQuestionExplanation
                          ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-500/60 text-emerald-900 dark:text-emerald-200"
                          : isSelected
                            ? "bg-blue-50/70 dark:bg-blue-950/40 border-blue-500 text-slate-900 dark:text-white"
                            : "bg-slate-50/70 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${currentQ.id}`}
                        checked={isSelected}
                        onChange={() => {}}
                        className="mt-0.5 text-blue-600 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 focus:ring-0 cursor-pointer"
                      />
                      <span className="flex-1 font-medium">{opt.text}</span>
                      {opt.isCorrect && showQuestionExplanation && (
                        <span className="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/50 px-2 py-0.5 rounded-md">
                          Correct
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>

              {showQuestionExplanation && currentQ.explanation && (
                <div className="p-4 bg-blue-50/40 dark:bg-blue-950/20 border-l-4 border-blue-600 rounded-r-xl text-xs text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
                    Explanation:
                  </span>
                  {currentQ.explanation}
                </div>
              )}

              {/* Pagination Bar: [ 1 ] [ 2 ] ... [ 20 ] */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center space-x-1.5 overflow-x-auto scrollbar-none">
                {DEFAULT_QUESTIONS.map((q, idx) => {
                  const isActive = activeQuestionIdx === idx;
                  return (
                    <button
                      key={q.id}
                      onClick={() => setActiveQuestionIdx(idx)}
                      className={`min-w-8 h-8 px-2 rounded-xl font-bold text-xs flex items-center justify-center transition-all cursor-pointer ${
                        isActive
                          ? "bg-blue-600 text-white shadow-xs dark:shadow-[0_0_12px_rgba(37,99,235,0.4)]"
                          : "bg-slate-100 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL 1: ASSIGN TO STUDENT                                    */}
      {/* ------------------------------------------------------------- */}
      {showAssignStudentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Assign Quiz to Student
              </h3>
              <button
                onClick={() => setShowAssignStudentModal(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAssignStudentSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Select Student
                </label>
                <select
                  value={assignTargetInput}
                  onChange={(e) => setAssignTargetInput(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="">-- Choose student --</option>
                  <option value="admin (Administrator)">
                    admin (Administrator)
                  </option>
                  <option value="User User (Student)">
                    User User (Student)
                  </option>
                  <option value="Aditya Jadhav">Aditya Jadhav</option>
                  <option value="Sakshi Kesharwani">Sakshi Kesharwani</option>
                  <option value="Ram Charan">Ram Charan</option>
                </select>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAssignStudentModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl shadow-xs cursor-pointer"
                >
                  Confirm Assign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL 2: ASSIGN TO COURSE STUDENTS                            */}
      {/* ------------------------------------------------------------- */}
      {showAssignCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Assign to Course Students
              </h3>
              <button
                onClick={() => setShowAssignCourseModal(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAssignCourseSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Target Course Cohort
                </label>
                <select className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20">
                  <option>
                    Masters in Digital Marketing - Advanced Topics (All Active
                    Students)
                  </option>
                  <option>Search Engine Optimization (SEO) Masterclass</option>
                  <option>Website Development With WordPress</option>
                  <option>Google Ads & PPC Certification</option>
                </select>
              </div>

              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                This will automatically add "
                {quiz.title || "Digital Marketing Aptitude Quiz!"}" to the
                enrolled curriculum for all students in this cohort.
              </p>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAssignCourseModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl shadow-xs cursor-pointer"
                >
                  Assign to All Students
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizManagementDetailFlow;
