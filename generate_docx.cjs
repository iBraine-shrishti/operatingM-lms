const fs = require('fs');
const path = require('path');
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  ImageRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  BorderStyle,
  Header,
  Footer,
  PageNumber
} = require('docx');

const screenshotsDir = 'D:/operating-media/lms/docs/screenshots';

function makeImageRun(filename, targetWidth = 580) {
  const filePath = path.join(screenshotsDir, filename);
  const buf = fs.readFileSync(filePath);
  const origW = buf.readUInt32BE(16);
  const origH = buf.readUInt32BE(20);
  const targetHeight = Math.round((targetWidth / origW) * origH);

  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 180, after: 200 },
    children: [
      new ImageRun({
        data: buf,
        transformation: {
          width: targetWidth,
          height: targetHeight,
        },
      }),
    ],
  });
}

function makeBadge(routeText) {
  return new Paragraph({
    spacing: { before: 80, after: 120 },
    children: [
      new TextRun({
        text: 'ROUTE: ',
        bold: true,
        size: 19,
        color: '2563EB',
      }),
      new TextRun({
        text: routeText,
        bold: true,
        size: 19,
        color: '1E293B',
      }),
    ],
  });
}

function makeSectionHeading(title) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 120 },
    children: [
      new TextRun({
        text: title,
        bold: true,
        size: 28,
        color: '0F172A',
      }),
    ],
  });
}

function makeSubheading(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 200, after: 80 },
    children: [
      new TextRun({
        text: text,
        bold: true,
        size: 22,
        color: '2563EB',
      }),
    ],
  });
}

function makeBullet(boldPrefix, desc) {
  return new Paragraph({
    bullet: { level: 0 },
    spacing: { before: 60, after: 60 },
    children: [
      new TextRun({
        text: boldPrefix + ': ',
        bold: true,
        size: 21,
        color: '1E293B',
      }),
      new TextRun({
        text: desc,
        size: 21,
        color: '334155',
      }),
    ],
  });
}

function makeParagraph(text) {
  return new Paragraph({
    spacing: { before: 80, after: 100 },
    children: [
      new TextRun({
        text: text,
        size: 21,
        color: '334155',
      }),
    ],
  });
}

const docPages = [
  {
    title: '1. Login & Access Portal',
    route: '/login',
    screenshot: 'flow_01_login.png',
    purpose: 'Secure gateway for enrolled students, instructors, and administrative staff.',
    bullets: [
      { bold: 'One-Click Role Switcher', desc: 'Allows effortless switching between Student Mode (e.g., Hiteshpuri Goswami) and Administrator Mode for live presentations and stakeholder reviews.' },
      { bold: 'Official Institute Branding', desc: 'Features the signature Operating Media emblem, clean card styling, and secure credentials management.' },
      { bold: 'Direct Navigation Routing', desc: 'Instantly directs authenticated students into their active learning space without redundant redirect hops.' }
    ]
  },
  {
    title: '2. Student Learning Dashboard',
    route: '/dashboard (Student Mode)',
    screenshot: 'flow_02_student_dashboard.png',
    purpose: 'The central learning command center for students to track progress, monitor live classes, and resume coursework.',
    bullets: [
      { bold: 'Personalized Welcome Banner', desc: 'Displays student photo avatar, full name, Student ID (OMC-0265), Branch Center (Borivali Center), and enrolled curriculum program.' },
      { bold: '4 Real-Time KPI Stat Cards', desc: 'Provides immediate feedback on Overall Progress (65%), Active Courses (4), Average Quiz Score (88.5%), and Upcoming Lectures (2).' },
      { bold: 'Continue Learning Card', desc: 'Shows current lesson preview, Module 2 of 4 details, active progress bar, 65% Complete donut chart, next lesson indicator, and a one-click "Resume Lesson" button.' },
      { bold: 'Quick Actions Hub', desc: 'Instant shortcuts to Browse Courses, My Quizzes, and Assignments.' },
      { bold: 'Today & Upcoming Schedule', desc: 'Live upcoming schedule showing aptitude quizzes, keyword strategy assessments, and live doubt-clearing sessions with colorful date badges.' },
      { bold: 'Milestone Achievement Banner', desc: 'Motivational banner celebrating learning consistency and goal progress.' }
    ]
  },
  {
    title: '3. Enrolled Courses Workspace',
    route: '/enrolled-courses',
    screenshot: 'flow_03_enrolled_courses.png',
    purpose: 'Dedicated learning workspace where students view and manage all subjects they are actively studying.',
    bullets: [
      { bold: 'Course Track Cards', desc: 'Displays all enrolled subjects (SEO Technical Optimization, Social Media Marketing, Google Ads, Website Development).' },
      { bold: 'Completion Tracking', desc: 'Clear visual progress bars and module units breakdown (e.g., 12/18 Units Completed).' },
      { bold: 'Direct Course Access', desc: 'Allows students to immediately resume learning with a single click into the classroom player.' }
    ]
  },
  {
    title: '4. Interactive Video Classroom & Lesson Player',
    route: '/lesson-player?courseId=course-8',
    screenshot: 'flow_04_lesson_player.png',
    purpose: 'The high-engagement digital classroom where students watch lectures and review course materials.',
    bullets: [
      { bold: 'HD Lecture Video Player', desc: 'Built-in video player with speed controls, progress markers, and automatic next-lesson transitions.' },
      { bold: 'Modular Curriculum Sidebar', desc: 'Organized syllabus drawer with live checkmarks displaying completed lectures.' },
      { bold: 'Lesson Notes & Downloadable Assets', desc: 'Provides instructor cheat-sheets, implementation templates, and downloadable resource materials.' },
      { bold: 'Navigation Controls', desc: 'Next Lesson and Previous Lesson controls to navigate smoothly through the curriculum.' }
    ]
  },
  {
    title: '5. All Courses Catalog & Directory',
    route: '/courses',
    screenshot: 'flow_05_courses_catalog.png',
    purpose: 'Complete catalog of diploma programs, advanced certifications, and masterclasses offered by Operating Media.',
    bullets: [
      { bold: 'Search & Category Filters', desc: 'Filter courses by specialization such as SEO, PPC Advertising, Web Development, and Social Media.' },
      { bold: 'Course Badges & Metrics', desc: 'Indicates program duration, difficulty level, total number of units, and official certification eligibility.' },
      { bold: 'Enrollment Opportunities', desc: 'Allows students and counselors to review upcoming syllabus tracks for career advancement.' }
    ]
  },
  {
    title: '6. Detailed Course Curriculum Breakdown',
    route: '/courses/:id (e.g., /courses/course-8)',
    screenshot: 'flow_06_course_detail.png',
    purpose: 'Deep dive into a specific course with comprehensive lesson breakdown, prerequisites, and faculty details.',
    bullets: [
      { bold: 'Full Chapter Outline', desc: 'Detailed breakdown of every module, unit, hands-on workshop, and testing milestone.' },
      { bold: 'Faculty & Industry Mentors', desc: 'Details on instructor experience, agency background, and teaching credentials.' },
      { bold: 'Career Outcomes', desc: 'Clear overview of job roles, practical tools covered, and certification exam requirements.' }
    ]
  },
  {
    title: '7. Quizzes & Assessments Portal',
    route: '/my-quizzes',
    screenshot: 'flow_07_quizzes.png',
    purpose: 'Knowledge assessment room for chapter tests, career aptitude quizzes, and mock certification exams.',
    bullets: [
      { bold: 'Active & Upcoming Quizzes', desc: 'List of assigned assessments with duration, question count, and submission deadlines.' },
      { bold: 'Instant Scoring System', desc: 'Immediate performance results with percentage breakdown and pass/fail indicators.' },
      { bold: 'Review & Practice', desc: 'Examine quiz attempts and retake practice tests to ensure mastery of digital marketing concepts.' }
    ]
  },
  {
    title: '8. Assignments & Practical Tasks Hub',
    route: '/my-assignments',
    screenshot: 'flow_08_assignments.png',
    purpose: 'Practical project portal for submitting client case studies, live audits, and marketing campaigns.',
    bullets: [
      { bold: 'Client Project Briefs', desc: 'Realistic practical assignments (e.g., Schema Markup generation, Google Search Ads campaign setup).' },
      { bold: 'Submission File Uploader', desc: 'Drag-and-drop file submission supporting PDF reports, spreadsheets, and presentation decks.' },
      { bold: 'Instructor Review & Feedback', desc: 'Direct written feedback, ratings, and corrections from course mentors.' }
    ]
  },
  {
    title: '9. Schedule & Live Lectures Timetable',
    route: '/schedule',
    screenshot: 'flow_09_schedule.png',
    purpose: 'Master academic timetable for live classroom lectures, weekend workshops, and 1-on-1 doubt sessions.',
    bullets: [
      { bold: 'Calendar View', desc: 'Clean chronological schedule organizing lecture days, times, and batch allocations.' },
      { bold: 'Live Session Links', desc: 'One-click launch buttons connecting students to Google Meet and Zoom classroom meetings.' },
      { bold: 'Center & Mode Filtering', desc: 'Filter schedules by physical centers (Borivali, Andheri) or Online evening batches.' }
    ]
  },
  {
    title: '10. Student Profile & CRM Financial Records',
    route: '/profile',
    screenshot: 'flow_10_profile_crm.png',
    purpose: 'Comprehensive student profile integrating academic records, biometric attendance tracking, and official fee ledgers.',
    bullets: [
      { bold: 'Student Credentials', desc: 'Full personal profile, contact email, phone, permanent Admission ID (OMC-0265), and assigned center.' },
      { bold: 'CRM Verified Attendance Ledger', desc: 'Live biometric attendance rate (89.3%), total attended sessions (42/47), and official eligibility status.' },
      { bold: 'Transparent Tuition Fee Ledger', desc: 'Itemized fee summary: Total Course Fee (₹45,000), Amount Paid (₹30,000), Outstanding Balance (₹15,000), and installment due dates.' },
      { bold: 'Official Document Triggers', desc: 'Direct access to download the GST-compliant Fee Receipt and the Verified Digital Diploma.' }
    ]
  },
  {
    title: '11. Official Document Modals (Receipt & Certificate)',
    route: 'Modal popups on /profile and /achievements',
    screenshot: 'flow_14_fee_receipt_modal.png',
    purpose: 'Official, institutionally compliant documents ready for printing, download, and employer verification.',
    bullets: [
      { bold: 'Downloadable GST Fee Receipt', desc: 'Official fee receipt featuring invoice number, student admission ID, transaction reference, base fees + 18% GST breakdown, institute seal, and authorized signature.' },
      { bold: 'Verified Digital Diploma Certificate', desc: 'Official graduation diploma in Advanced Digital Marketing Excellence with tamper-proof verification QR code for employer background verification.' }
    ]
  },
  {
    title: '12. Verified Achievements & Badges',
    route: '/achievements',
    screenshot: 'flow_11_achievements.png',
    purpose: 'Gamified achievement room showcasing student milestones, honor badges, and career credentials.',
    bullets: [
      { bold: 'Milestone Badges', desc: 'Earned recognition for Perfect Attendance, High Quiz Scores, and Course Completion.' },
      { bold: 'LinkedIn & Resume Integration', desc: 'One-click credential sharing to export badges to professional profiles and resumes.' }
    ]
  },
  {
    title: '13. Central Administrator Analytics Hub',
    route: '/dashboard (Admin Mode)',
    screenshot: 'flow_13_admin_dashboard.png',
    purpose: 'Executive intelligence cockpit for institute directors, branch managers, and academic coordinators.',
    bullets: [
      { bold: 'Executive KPI Metrics', desc: 'Total Enrolled Students (1,480+), Active Batches (24), Course Tracks (12), and Total Fees Collection (₹48.2L).' },
      { bold: 'Live CRM Synchronization', desc: 'Real-time synchronization status tracking API connections with the institute CRM system.' },
      { bold: 'Categorized Performance Charts', desc: 'Interactive charts mapping student intake, completion rates, and batch revenues.' },
      { bold: 'Operational Shortcuts', desc: 'Quick actions to Create Course Tracks, Add Students, and Generate Financial Audit Reports.' }
    ]
  },
  {
    title: '14. Course Creation Wizard (Step-by-Step Builder)',
    route: '/create-course',
    screenshot: 'flow_16_create_course.png',
    purpose: 'The central curriculum authoring engine allowing administrators to launch new course programs, diplomas, and masterclasses.',
    bullets: [
      { bold: 'Step 1 — Core Course Info', desc: 'Define Course Category (Digital Marketing, SEO, PPC), Course Title, Short Overview, and Cohort Start Dates.' },
      { bold: 'Rich Media Uploader', desc: 'Upload high-resolution course banners, promotional video trailers (YouTube/Vimeo/MP4), and syllabus documentation.' },
      { bold: 'Rich Text Curriculum Editor', desc: 'Complete WYSIWYG editor for drafting comprehensive course learning objectives, weekly milestones, and prerequisite skillsets.' },
      { bold: 'Capacity & Scheduling Controls', desc: 'Set batch enrollment capacity limits (e.g. 30 seats per center), duration tags (e.g. 3 Months, Unlimited), and automated grading policies.' },
      { bold: 'Multi-Step Wizard Progression', desc: 'Steps through Course Settings, Component Linking (Modules, Quizzes, Assignments), and Final Catalog Publishing.' }
    ]
  },
  {
    title: '15. Curriculum Units & Lesson Management',
    route: '/manage-units',
    screenshot: 'flow_17_manage_units.png',
    purpose: 'Granular curriculum organization tool for structuring chapters, video lessons, lecture attachments, and unit quizzes.',
    bullets: [
      { bold: 'Course Selector & Unit Hierarchy', desc: 'Select any course to view and edit its chronological unit structure (Unit 1, Unit 2, Unit 3).' },
      { bold: 'Lesson Unit Creator', desc: 'Attach lecture video links, downloadable PDF study guides, presentation slides, and code repositories to specific units.' },
      { bold: 'Prerequisite & Drip Feeding', desc: 'Configure lesson unlock criteria (e.g. Unit 2 unlocks only after passing Unit 1 quiz).' },
      { bold: 'Instant Reordering', desc: 'Reorder chapters and units effortlessly using intuitive sequence controls.' }
    ]
  },
  {
    title: '16. Assessment & Quiz Builder',
    route: '/manage-quizzes',
    screenshot: 'flow_18_manage_quizzes.png',
    purpose: 'Complete testing suite allowing faculty to design chapter quizzes, career aptitude assessments, and certification exams.',
    bullets: [
      { bold: 'Quiz Parameter Configuration', desc: 'Define Quiz Title, Assigned Course, passing score percentage (e.g., 70%), and strict time countdown limits.' },
      { bold: 'Dynamic Question Linking', desc: 'Link questions directly from the central Question Bank or create specialized assessment items.' },
      { bold: 'Exam Security & Retakes', desc: 'Configure maximum retake attempts, question shuffling, and auto-evaluation rules.' }
    ]
  },
  {
    title: '17. Practical Assignment & Project Manager',
    route: '/manage-assignments',
    screenshot: 'flow_19_manage_assignments.png',
    purpose: 'Administrative hub for deploying practical coursework, agency client briefs, and monitoring student submissions.',
    bullets: [
      { bold: 'Assignment Specification Builder', desc: 'Create real-world project prompts (e.g., Conduct an On-Page SEO Audit, Set up a Google Search Ads Campaign).' },
      { bold: 'Submission Deadline & Rubrics', desc: 'Establish exact due dates, passing marks, and explicit evaluation criteria.' },
      { bold: 'Grading Queue & Feedback Dispatch', desc: 'Review student file uploads, assign numerical marks, and return detailed instructor critiques directly to student dashboards.' }
    ]
  },
  {
    title: '18. Central Question Bank & Assessment Pool',
    route: '/manage-questions',
    screenshot: 'flow_20_manage_questions.png',
    purpose: 'Centralized repository of examination questions and student question discussion moderation.',
    bullets: [
      { bold: 'Question Pool Management', desc: 'Build and categorize reusable questions by topic (SEO, PPC, Analytics, Social Media) and difficulty level (Beginner, Intermediate, Advanced).' },
      { bold: 'Multiple Assessment Types', desc: 'Supports Single Choice, Multiple Choice, True/False, and Scenario-Based evaluation items.' },
      { bold: 'Question Discussions Forum', desc: 'Integrated discussion moderation (`/question-discussions`) where instructors resolve student queries on tricky examination concepts.' }
    ]
  },
  {
    title: '19. Operations Analytics & Academic Reports',
    route: '/manage-reports',
    screenshot: 'flow_21_manage_reports.png',
    purpose: 'Comprehensive reporting portal providing high-level operational intelligence for institute directors and accountants.',
    bullets: [
      { bold: 'Batch Completion Analytics', desc: 'Tracks overall student completion percentages across Borivali, Andheri, and Online cohorts.' },
      { bold: 'Student Grade & Assessment Distribution', desc: 'Visual analytics illustrating pass rates, average quiz scores, and assignment completion velocity.' },
      { bold: 'Tuition Revenue & Financial Audits', desc: 'Summarizes tuition fee collections, pending installment balances, and center-by-center financial metrics.' },
      { bold: 'Data Exporting', desc: 'Export audit-ready CSV, Excel, and PDF reports for management presentations.' }
    ]
  },
  {
    title: '20. Student Directory & CRM Roster',
    route: '/manage-students',
    screenshot: 'flow_12_manage_students.png',
    purpose: 'Master student administration directory for tracking enrollment status, fee collection, and attendance records.',
    bullets: [
      { bold: 'Multi-Branch Student Roster', desc: 'Filter and search all enrolled students across Borivali, Andheri, and Online programs.' },
      { bold: 'Payment & Attendance Health Badges', desc: 'Instant status flags for Fee Status (Paid, Partial, Overdue) and Attendance Health.' },
      { bold: 'Student Record Management', desc: 'Staff controls to update contact details, dispatch fee reminders, and issue graduation certificates.' }
    ]
  }
];

// Summary Table Rows for all 20 pages
const tableRows = [
  new TableRow({
    tableHeader: true,
    children: [
      new TableCell({
        width: { size: 600, type: WidthType.DXA },
        shading: { fill: '0F172A' },
        children: [new Paragraph({ children: [new TextRun({ text: '#', bold: true, color: 'FFFFFF', size: 18 })] })],
      }),
      new TableCell({
        width: { size: 2500, type: WidthType.DXA },
        shading: { fill: '0F172A' },
        children: [new Paragraph({ children: [new TextRun({ text: 'Page / Feature', bold: true, color: 'FFFFFF', size: 18 })] })],
      }),
      new TableCell({
        width: { size: 2300, type: WidthType.DXA },
        shading: { fill: '0F172A' },
        children: [new Paragraph({ children: [new TextRun({ text: 'Route', bold: true, color: 'FFFFFF', size: 18 })] })],
      }),
      new TableCell({
        width: { size: 1800, type: WidthType.DXA },
        shading: { fill: '0F172A' },
        children: [new Paragraph({ children: [new TextRun({ text: 'User Persona', bold: true, color: 'FFFFFF', size: 18 })] })],
      }),
      new TableCell({
        width: { size: 3600, type: WidthType.DXA },
        shading: { fill: '0F172A' },
        children: [new Paragraph({ children: [new TextRun({ text: 'Primary Value Delivered', bold: true, color: 'FFFFFF', size: 18 })] })],
      }),
    ],
  }),
  ...[
    ['1', 'Login & Access Portal', '/login', 'All Users', 'Role-based login and demo switcher'],
    ['2', 'Student Dashboard', '/dashboard', 'Student', '4 KPI cards, Continue Learning, schedule'],
    ['3', 'Enrolled Courses', '/enrolled-courses', 'Student', 'Active courses, progress bars, resume CTA'],
    ['4', 'Lesson Player', '/lesson-player', 'Student', 'HD video lectures, syllabus drawer, notes'],
    ['5', 'Course Catalog', '/courses', 'Student / Guest', 'Course directory, category filters, syllabi'],
    ['6', 'Course Detail', '/courses/:id', 'Student / Guest', 'Module syllabus, faculty bio, batch schedule'],
    ['7', 'Quizzes & Tests', '/my-quizzes', 'Student', 'Time-bound quizzes, scoring, review'],
    ['8', 'Assignments Hub', '/my-assignments', 'Student', 'Project briefs, file submissions, grading'],
    ['9', 'Class Schedule', '/schedule', 'Student', 'Timetable, live Zoom/Meet links, calendar'],
    ['10', 'Profile & CRM Ledger', '/profile', 'Student', 'Attendance rate, fee balance, receipts'],
    ['11', 'Fee Receipt & Diploma', 'Modals on /profile', 'Student / Accounts', 'GST fee receipts and verified diploma'],
    ['12', 'Achievements & Badges', '/achievements', 'Student', 'Badges, milestone rewards, LinkedIn share'],
    ['13', 'Admin Central Hub', '/dashboard (Admin)', 'Administrator', 'KPIs, live CRM sync, batch analytics'],
    ['14', 'Course Creation Wizard', '/create-course', 'Administrator', '4-step course builder, rich text, video intro'],
    ['15', 'Curriculum & Units', '/manage-units', 'Administrator', 'Chapter units, lecture media, sequence rules'],
    ['16', 'Assessment & Quiz Builder', '/manage-quizzes', 'Administrator', 'Quiz creation, pass %, time limits, questions'],
    ['17', 'Practical Assignments', '/manage-assignments', 'Administrator', 'Coursework briefs, deadlines, grading queue'],
    ['18', 'Central Question Bank', '/manage-questions', 'Administrator', 'Reusable questions pool, difficulty tagging'],
    ['19', 'Operational Reports', '/manage-reports', 'Administrator', 'Batch completion, financial audits, export'],
    ['20', 'Student Directory CRM', '/manage-students', 'Administrator', 'Master student roster, fee audit, attendance'],
  ].map(([num, name, route, user, value], idx) => {
    const bg = idx % 2 === 0 ? 'F8FAFC' : 'FFFFFF';
    return new TableRow({
      children: [
        new TableCell({
          width: { size: 600, type: WidthType.DXA },
          shading: { fill: bg },
          children: [new Paragraph({ children: [new TextRun({ text: num, bold: true, size: 17 })] })],
        }),
        new TableCell({
          width: { size: 2500, type: WidthType.DXA },
          shading: { fill: bg },
          children: [new Paragraph({ children: [new TextRun({ text: name, bold: true, size: 17 })] })],
        }),
        new TableCell({
          width: { size: 2300, type: WidthType.DXA },
          shading: { fill: bg },
          children: [new Paragraph({ children: [new TextRun({ text: route, size: 17, color: '2563EB' })] })],
        }),
        new TableCell({
          width: { size: 1800, type: WidthType.DXA },
          shading: { fill: bg },
          children: [new Paragraph({ children: [new TextRun({ text: user, size: 17 })] })],
        }),
        new TableCell({
          width: { size: 3600, type: WidthType.DXA },
          shading: { fill: bg },
          children: [new Paragraph({ children: [new TextRun({ text: value, size: 17 })] })],
        }),
      ],
    });
  }),
];

async function generateDocx() {
  const docChildren = [];

  // Title Page / Header Block
  docChildren.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 200, after: 100 },
      children: [
        new TextRun({
          text: 'OPERATING MEDIA LMS',
          bold: true,
          size: 40,
          color: '2563EB',
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 60, after: 200 },
      children: [
        new TextRun({
          text: 'Complete Platform Flow & Website Feature Guide',
          bold: true,
          size: 28,
          color: '0F172A',
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 400 },
      children: [
        new TextRun({
          text: 'Client Presentation & Architecture Document | Version 2.0 (With Full Course Creation Flow)',
          size: 20,
          color: '64748B',
        }),
      ],
    }),
    new Paragraph({
      spacing: { before: 200, after: 200 },
      children: [
        new TextRun({
          text: 'Executive Summary:',
          bold: true,
          size: 22,
          color: '0F172A',
        }),
        new TextRun({
          text: ' This document provides a visual, step-by-step walkthrough of the Operating Media Learning Management System (LMS). It outlines every screen generated for the platform, detailing both the Student Learning Experience and the complete Administrator Course Authoring & Management Engine.',
          size: 21,
          color: '334155',
        }),
      ],
    })
  );

  // Each page in the flow
  docPages.forEach((p) => {
    docChildren.push(
      makeSectionHeading(p.title),
      makeBadge(p.route),
      makeParagraph(`Purpose: ${p.purpose}`),
      makeImageRun(p.screenshot),
      makeSubheading('Key Features & Deliverables:')
    );

    p.bullets.forEach((b) => {
      docChildren.push(makeBullet(b.bold, b.desc));
    });
  });

  // Summary Matrix Table Section
  docChildren.push(
    makeSectionHeading('21. Overall Website Summary Matrix'),
    makeParagraph('The following matrix provides an executive summary of all 20 key pages and features in the Operating Media LMS web portal:'),
    new Table({
      width: { size: 10800, type: WidthType.DXA },
      rows: tableRows,
    })
  );

  const doc = new Document({
    sections: [
      {
        properties: {},
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: 'Operating Media LMS — Platform Flow Guide',
                    size: 16,
                    color: '94A3B8',
                  }),
                ],
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: 'Page ',
                    size: 16,
                    color: '94A3B8',
                  }),
                  new TextRun({
                    children: [PageNumber.CURRENT],
                    size: 16,
                    color: '94A3B8',
                  }),
                  new TextRun({
                    text: ' of ',
                    size: 16,
                    color: '94A3B8',
                  }),
                  new TextRun({
                    children: [PageNumber.TOTAL_PAGES],
                    size: 16,
                    color: '94A3B8',
                  }),
                ],
              }),
            ],
          }),
        },
        children: docChildren,
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  
  // Save in project docs directory
  const outDocs = 'D:/operating-media/lms/docs/Operating_Media_LMS_Website_Flow.docx';
  fs.writeFileSync(outDocs, buffer);
  console.log('Saved:', outDocs);

  // Save in project root
  const outRoot = 'D:/operating-media/lms/Operating_Media_LMS_Website_Flow.docx';
  fs.writeFileSync(outRoot, buffer);
  console.log('Saved:', outRoot);

  // Also save in brain directory
  const outBrain = 'C:/Users/user/.gemini/antigravity-cli/brain/87d9ca99-f768-4b3c-925a-e960bf38a77f/Operating_Media_LMS_Website_Flow.docx';
  fs.writeFileSync(outBrain, buffer);
  console.log('Saved:', outBrain);
}

generateDocx().catch(console.error);
