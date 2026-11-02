// Initial student profile prefill + professional editable dummy resume data

export const createInitialResumeData = (currentUser, crmProfile, crmBatch, crmCertificates = []) => {
  const studentName =
    currentUser?.name ||
    currentUser?.fullName ||
    crmProfile?.name ||
    crmProfile?.fullName ||
    "Vishal Chaurasiya";

  const studentEmail =
    currentUser?.email ||
    crmProfile?.email ||
    "vishal.chaurasiya@operatingmedia.com";

  const studentPhone =
    currentUser?.phone ||
    crmProfile?.phone ||
    crmProfile?.mobile ||
    "+91 98200 12345";

  const studentBranch =
    crmProfile?.branch ||
    crmBatch?.branch ||
    "Mumbai, India";

  const batchCourseName =
    crmBatch?.courseName ||
    crmProfile?.course ||
    "Diploma in Advanced Digital Marketing & AI Strategy";

  // Fetch avatar from backend/CRM/localStorage or fallback to sample portrait
  const backendAvatar =
    currentUser?.avatar ||
    crmProfile?.photo ||
    crmProfile?.avatar ||
    localStorage.getItem("om_lms_student_avatar") ||
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400";

  // Real certificates from student CRM record if present, otherwise professional industry certificates
  const defaultCerts = (crmCertificates && crmCertificates.length > 0)
    ? crmCertificates.map((cert, index) => ({
        id: `cert-${index}`,
        name: cert.title || cert.name || "Operating Media Certified Specialist",
        issuer: cert.issuer || "Operating Media",
        year: cert.issueDate ? new Date(cert.issueDate).getFullYear().toString() : "2026",
      }))
    : [
        {
          id: "cert-1",
          name: "Operating Media Diploma in Advanced Digital Marketing",
          issuer: "Operating Media • Digital Career Academy",
          year: "2026",
        },
        {
          id: "cert-2",
          name: "Google Ads Search & Performance Max Certification",
          issuer: "Google Skillshop",
          year: "2026",
        },
        {
          id: "cert-3",
          name: "Meta Certified Digital Marketing Associate",
          issuer: "Meta Blueprint",
          year: "2025",
        },
        {
          id: "cert-4",
          name: "HubSpot Inbound Marketing & Content Strategy",
          issuer: "HubSpot Academy",
          year: "2025",
        },
      ];

  return {
    personalInfo: {
      fullName: studentName,
      jobTitle: "Performance Marketing & SEO Strategist",
      photo: backendAvatar,
      email: studentEmail,
      phone: studentPhone,
      location: studentBranch,
      linkedin: "linkedin.com/in/vishal-marketer",
      portfolio: "operatingmedia.org/alumni/portfolio",
      github: "github.com/vishal-digital",
    },
    summary:
      "Results-oriented Digital Marketer with specialized training in full-funnel acquisition, paid media scaling, and programmatic SEO. Proven ability in managing Google & Meta ad budgets with a track record of boosting ROAS by 160% and scaling organic search visibility. Skilled in data analytics, landing page conversion rate optimization (CRO), and generative AI workflows.",
    experiences: [
      {
        id: "exp-1",
        role: "Digital Marketing & Performance Associate",
        company: "MediaPulse Digital Agency",
        location: "Mumbai, India",
        startDate: "2025",
        endDate: "Present",
        current: true,
        bullets: [
          "Architected Google Search, Display, and Performance Max ad campaigns delivering an average 4.2x ROAS across 6 direct-to-consumer e-commerce brands.",
          "Conducted comprehensive technical SEO audits, site speed optimizations, and keyword gap mapping, increasing quarterly organic sessions by 65%.",
          "Managed Meta Ads testing frameworks (A/B testing creatives, copy, custom audiences, and lookalikes) with monthly ad spend exceeding ₹2,50,000.",
          "Integrated Google Analytics 4 (GA4) custom event tracking and Looker Studio dashboards for real-time stakeholder KPI reporting.",
        ],
      },
      {
        id: "exp-2",
        role: "SEO & Content Marketing Intern",
        company: "Aura Growth Partners",
        location: "Mumbai, India",
        startDate: "2024",
        endDate: "2025",
        current: false,
        bullets: [
          "Developed data-driven on-page SEO strategies for 45+ pillar articles, ranking 18 target keywords on page 1 of Google within 90 days.",
          "Executed high-quality backlink building through digital PR, broken link recovery, and niche guest contributions, boosting domain authority from 18 to 34.",
          "Designed dynamic landing pages on WordPress & Elementor, improving overall click-to-lead conversion rate by 28%.",
        ],
      },
    ],
    education: [
      {
        id: "edu-1",
        degree: batchCourseName,
        institution: "Operating Media • Digital Career Academy",
        location: "Mumbai, India",
        year: "2025 - 2026",
        score: "Grade A+ (Distinction)",
        details: "Specialized in Performance Marketing, Search Engine Optimization, Google Analytics 4, Social Media Ads, and AI Funnel Automation.",
      },
      {
        id: "edu-2",
        degree: "Bachelor of Commerce (B.Com) - Marketing Management",
        institution: "University of Mumbai",
        location: "Mumbai, India",
        year: "2021 - 2024",
        score: "8.4 CGPA",
        details: "Coursework in Advertising & Sales Promotion, Business Analytics, Consumer Behavior, and Digital Communications.",
      },
    ],
    skills: {
      paidAds: ["Google Search Ads", "Performance Max", "Meta Ads Manager", "LinkedIn Ads", "Remarketing"],
      seoContent: ["Technical SEO", "Keyword Research", "On-Page Optimization", "Semrush", "Ahrefs", "Screaming Frog"],
      analyticsTools: ["Google Analytics 4 (GA4)", "Google Tag Manager", "Looker Studio", "WordPress", "Canva", "Shopify"],
      coreMarketing: ["Conversion Rate Optimization (CRO)", "Email Marketing", "A/B Testing", "Funnel Architecture"],
    },
    skillsSummary: [
      { name: "Performance Marketing & Ads", level: 90 },
      { name: "Technical SEO & Keyword Mapping", level: 85 },
      { name: "Data Analytics & GA4 Tracking", level: 85 },
      { name: "Content Architecture & Funnels", level: 80 },
    ],
    expertiseList: [
      "Google Ads (PMax)",
      "Meta Ads Manager",
      "Technical SEO Audits",
      "Keyword Research",
      "Conversion Optimization",
      "Google Analytics 4",
      "Looker Studio Dashboards",
      "WordPress Development",
    ],
    projects: [
      {
        id: "proj-1",
        title: "DTC Apparel Brand ROAS Scaling Campaign",
        clientOrType: "Live Capstone Project",
        metricHighlight: "340% Revenue Growth | 4.8x ROAS",
        description: "Restructured Google Ads and Meta Ads funnel for a fashion label. Implemented dynamic catalog ads and customized remarketing flows, scaling monthly revenue from ₹1.2L to ₹5.3L.",
      },
      {
        id: "proj-2",
        title: "Local SEO & Lead Gen Automation for Dental Clinic",
        clientOrType: "Agency Client Case Study",
        metricHighlight: "#1 Google Maps Ranking | 120+ Monthly Leads",
        description: "Optimized Google Business Profile (GBP), built 60+ local citations, and created localized service landing pages resulting in a 210% increase in monthly appointment bookings.",
      },
    ],
    certifications: defaultCerts,
    languages: ["English (Professional)", "Hindi (Fluent)", "Marathi (Conversational)"],
    sectionHeadings: {
      eyebrow: "Creative & Growth Strategist",
      summary: "About Me",
      experience: "Work Experience",
      skills: "Skills Summary",
      education: "Education",
      projects: "Key Projects & Case Studies",
      certifications: "Certifications & Badges",
      expertise: "Expertise",
      languages: "Languages",
      contact: "Contact Details",
      skillCat1: "Paid Acquisition & Ads",
      skillCat2: "SEO & Content Architecture",
      skillCat3: "Analytics & MarTech Tools",
    },
  };
};

export const TEMPLATES_CONFIG = [
  {
    id: "modern-executive",
    name: "Modern Executive",
    tagline: "2-Column Sidebar • Photo Badge & Corporate Layout",
    badge: "Photo Ready",
    thumbnailColor: "#003873",
  },
  {
    id: "dual-arch-creative",
    name: "Dual-Arch Creative",
    tagline: "Modern Capsule Sidebar • Profile Photo & Progress Bars",
    badge: "New 5th Template",
    thumbnailColor: "#1e293b",
  },
  {
    id: "creative-marketer",
    name: "Creative Marketer",
    tagline: "Dynamic Accent Header • Portfolio Cards & Photo",
    badge: "Photo Ready",
    thumbnailColor: "#7c3aed",
  },
  {
    id: "minimalist-tech",
    name: "Minimalist Tech",
    tagline: "Clean Header Banner • Metric & Skill Centered",
    badge: "High ATS Score",
    thumbnailColor: "#065f46",
  },
  {
    id: "classic-ats",
    name: "Classic ATS Standard",
    tagline: "Single-Column Timeless Format • MNC & Scanner Optimized",
    badge: "Corporate Standard",
    thumbnailColor: "#1e293b",
  },
];
