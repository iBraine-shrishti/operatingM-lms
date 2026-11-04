import mockupLaptopImg from "../../assets/mockup-laptop.jpg";
import mockupCreativesImg from "../../assets/mockup-creatives.jpg";
// Portfolio Builder Initial Data & 13-Module Reference Schema
// Derived from D:\operating-media\lms\Portfolio Sample 3.html and student CRM context

export const MODULES_CATALOG = [
  { id: "wordpress", title: "WordPress Web Design", number: "01", icon: "Globe", description: "Custom Theme, Elementor Pro & E-commerce" },
  { id: "canva", title: "Canva Design & Video", number: "02", icon: "Palette", description: "Branded Social Media Decks & Video Reels" },
  { id: "socialOrganic", title: "Social Media Organic", number: "03", icon: "Share2", description: "Instagram & LinkedIn Grid Growth" },
  { id: "socialMarketing", title: "Meta Ads (Accordions)", number: "04", icon: "TrendingUp", description: "Full-Funnel Meta Ads & Scaling" },
  { id: "googleAds", title: "Google Ads (Accordions)", number: "05", icon: "Search", description: "Search, Shopping & PMax Campaigns" },
  { id: "seo", title: "SEO & Local GBP", number: "06", icon: "BarChart3", description: "Technical Screaming Frog Audit & Top 10 Keywords" },
  { id: "digitalPlanning", title: "Digital Planning Deck", number: "07", icon: "Briefcase", description: "Competitor Audits & 360° Growth Roadmap" },
  { id: "influencerMarketing", title: "Influencer Marketing", number: "08", icon: "Users", description: "Creator Campaign Briefs & Cost-per-Engagement" },
  { id: "shopify", title: "Shopify Store", number: "09", icon: "ShoppingBag", description: "DTC Store Build, High AOV & CRO Checkouts" },
  { id: "videoEditing", title: "Video Editing", number: "10", icon: "Video", description: "High-Retention Hook Formats & Motion Ad Cuts" },
  { id: "dropshipping", title: "Dropshipping Store", number: "11", icon: "Box", description: "Product Research, COGS Validation & Scaling" },
  { id: "aiApp", title: "AI Marketing App", number: "12", icon: "Cpu", description: "Custom AI Copy Assistants & Automation Pipelines" },
  { id: "performanceMarketing", title: "Performance Marketing", number: "13", icon: "Zap", description: "Blended CAC, Cohort LTV & ROAS Scaling" },
];

export const DEFAULT_MODULE_ORDER = [
  "wordpress",
  "canva",
  "socialOrganic",
  "socialMarketing",
  "googleAds",
  "seo",
  "digitalPlanning",
  "influencerMarketing",
  "shopify",
  "videoEditing",
  "dropshipping",
  "aiApp",
  "performanceMarketing",
];

export const createInitialPortfolioData = (
  currentUser = {},
  crmProfile = {},
  crmBatch = {},
  crmCertificates = []
) => {
  const studentName =
    currentUser?.name ||
    crmProfile?.name ||
    crmProfile?.fullName ||
    "Ram Charan";

  const studentEmail =
    currentUser?.email ||
    crmProfile?.email ||
    "ram.charan@operatingmedia.com";

  const studentPhone =
    crmProfile?.phone ||
    crmProfile?.mobile ||
    "+91 98201 54321";

  const studentBranch =
    crmProfile?.branch ||
    crmBatch?.branch ||
    "Andheri Center, Mumbai";

  const courseTitle =
    crmBatch?.courseName ||
    crmProfile?.courseName ||
    crmProfile?.course ||
    "Diploma in Digital Marketing";

  const backendAvatar =
    currentUser?.avatar ||
    currentUser?.profilePicture ||
    crmProfile?.photo ||
    crmProfile?.avatar ||
    (typeof localStorage !== "undefined" ? localStorage.getItem("om_lms_student_avatar") : null) ||
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400";

  return {
    moduleOrder: [...DEFAULT_MODULE_ORDER],
    student: {
      name: studentName,
      headline: "Certified Digital Marketer & Full-Funnel Growth Strategist",
      subheadline: `Specializing in ${courseTitle} — Performance Paid Ads, Technical SEO & High-Converting Funnels`,
      bio: "Passionate digital marketing graduate trained in 360° growth marketing at Operating Media. Proven track record managing Meta & Google Ads campaigns, designing high-converting WordPress & Shopify e-commerce experiences, executing organic content engines, and building AI-accelerated marketing workflows.",
      avatarUrl: backendAvatar,
      email: studentEmail,
      phone: studentPhone,
      location: studentBranch,
      socials: [
        { platform: "linkedin", url: "https://linkedin.com/in/ram-charan-marketing", label: "LinkedIn" },
        { platform: "twitter", url: "https://x.com/ram_growth", label: "X (Twitter)" },
        { platform: "instagram", url: "https://instagram.com/ram.digital", label: "Instagram" },
        { platform: "behance", url: "https://behance.net/ram_creatives", label: "Behance" },
        { platform: "github", url: "https://github.com/operating-media", label: "GitHub" },
        { platform: "whatsapp", url: "https://wa.me/919820154321", label: "WhatsApp" },
      ],
      highlights: [
        { label: "Total Ad Spend Managed", value: "₹1,450,000+", detail: "Across Meta, Google & PMax Ads" },
        { label: "Average E-comm ROAS", value: "4.12x", detail: "Scaling DTC skincare & lifestyle apparel" },
        { label: "Keyword Rankings", value: "320+ in Top 10", detail: "High-intent transactional keywords" },
        { label: "Full Funnels Deployed", value: "14 Stores & Sites", detail: "WordPress, Shopify & custom landing pages" },
      ],
    },
    modules: {
      wordpress: [
        {
          id: "wp-1",
          title: "Aura Artisan — Organic Skincare & Wellness",
          clientType: "DTC Organic Beauty Brand",
          description: "Custom-built corporate & e-commerce WordPress website using Elementor Pro, ACF, and WooCommerce. Engineered for frictionless mobile checkouts, custom product ingredient tabs, and sub-1.2s loading speeds.",
          imageUrl: mockupLaptopImg,
          liveUrl: "https://aura-artisan-sample.demo",
          speedScore: 96,
          mobileOptimized: true,
          techStack: ["WordPress 6.4", "Elementor Pro", "WooCommerce", "WP Rocket", "Cloudflare CDN"],
          keyFeatures: [
            "Custom Sticky Add-to-Cart with dynamic variant selectors",
            "Automated Customer Review Schema markup for rich Google stars",
            "Google Tag Manager & Meta Pixel server-side events configured",
            "Mobile-first responsive drawer navigation with instant search",
          ],
        },
        {
          id: "wp-2",
          title: "Apex Horizon — B2B Logistics & Supply Chain",
          clientType: "Enterprise Freight & Logistics",
          description: "B2B lead generation corporate website. Features custom freight cost estimator calculator, dynamic route map integration, and automated HubSpot CRM webhook lead routing.",
          imageUrl: mockupLaptopImg,
          liveUrl: "https://apex-horizon-sample.demo",
          speedScore: 94,
          mobileOptimized: true,
          techStack: ["WordPress", "Custom CSS", "Gravity Forms", "Yoast SEO Premium", "LiteSpeed Cache"],
          keyFeatures: [
            "Interactive 3-step instant freight quote calculator",
            "Geo-targeted case studies and dynamic regional testimonials",
            "WCAG AA accessible color contrast and keyboard navigation",
            "Instant lead SMS & Slack alerts via Zapier webhooks",
          ],
        },
      ],
      canva: {
        designs: [
          {
            id: "canva-d1",
            title: "7-Slide Educational Carousel: 'Mastering Meta CBO in 2026'",
            category: "Carousel",
            dimensions: "1080 x 1350 px (4:5 Ratio)",
            imageUrl: mockupCreativesImg,
            description: "High-retention LinkedIn & Instagram carousel post designed with visual hierarchy, micro-infographics, and bold typography. Generated 4.2k organic saves and 180+ shares.",
          },
          {
            id: "canva-d2",
            title: "Holiday Black Friday Promotional Display Banner Suite",
            category: "Display Banner",
            dimensions: "1200 x 628 px & 300 x 250 px",
            imageUrl: mockupCreativesImg,
            description: "Multi-size high-contrast promotional banner campaign with urgency badges, product cutouts, and crisp golden CTA button styling.",
          },
          {
            id: "canva-d3",
            title: "E-Commerce Customer Journey Infographic",
            category: "Infographic",
            dimensions: "1080 x 1920 px Vertical",
            imageUrl: mockupCreativesImg,
            description: "Full visual breakdown of TOFU awareness, MOFU consideration, and BOFU retargeting touchpoints designed for client pitch decks.",
          },
          {
            id: "canva-d4",
            title: "DTC Supplement Brand Packaging & Box Mockup",
            category: "Print & Packaging",
            dimensions: "Vector Print Ready (300 DPI)",
            imageUrl: mockupCreativesImg,
            description: "Minimalist apothecary packaging layout featuring gold foil stamping elements, compliance nutritional panels, and barcode placement.",
          },
        ],
        videos: [
          {
            id: "canva-v1",
            title: "Kinetic Typography Reel: '3 Landing Page Mistakes Killing Your ROAS'",
            format: "9:16 Vertical Reel",
            duration: "0:28",
            hook: "First 2 seconds: 'Stop burning ad budget on this one button...'",
            thumbnailUrl: mockupCreativesImg,
            description: "Fast-paced motion graphic reel created in Canva Video & CapCut with animated word-by-word captions, sound effects, and clean slide transitions.",
          },
          {
            id: "canva-v2",
            title: "Product Showcase Motion Ad: Eco Flask 24-Hour Temp Test",
            format: "16:9 Video Ad",
            duration: "0:35",
            hook: "Side-by-side thermal imaging graphic with upbeat tempo beat drops",
            thumbnailUrl: mockupCreativesImg,
            description: "Studio-lit product video reel with kinetic text overlays, feature callout callipers, and clear end-card discount code animation.",
          },
        ],
      },
      socialOrganic: [
        {
          id: "smo-1",
          platform: "Instagram",
          handle: "@vitalbloom.wellness",
          niche: "Holistic Health & Adaptogens",
          beforeFollowers: "840 followers",
          afterFollowers: "14,800 followers (+1,661%)",
          growthRate: "+210% engagement rate across 90 days",
          bioStrategy: "Revamped bio from generic quote to: 'Doctor-formulated organic adaptogens for sustained focus 🌿 | 25,000+ Happy Minds | Claim your free focus quiz 👇'",
          contentPillars: [
            "40% Science-backed myth busters (educational carousels)",
            "30% Routine reels & Morning rituals (relatable lifestyle)",
            "20% User-Generated Content & Customer Transformations",
            "10% Founder story & behind-the-scenes laboratory batching",
          ],
          screenshotUrl: mockupCreativesImg,
          icon: "Instagram",
          customMetrics: [
            { id: "cm-1-1", label: "Monthly Impressions", value: "280,000/mo" },
            { id: "cm-1-2", label: "Organic Bio Clicks", value: "640 / week" },
          ],
          resultsSummary: "Grew organic impressions from 4,200/mo to 280,000/mo. Generated 640 organic bio-link clicks per week directly to the email opt-in funnel without any paid boost.",
        },
        {
          id: "smo-2",
          platform: "LinkedIn",
          handle: "CleanTech Solutions Inc.",
          niche: "B2B Commercial Solar & Energy Storage",
          beforeFollowers: "1,200 followers",
          afterFollowers: "8,950 corporate followers",
          growthRate: "+380% qualified executive inbound DM inquiries",
          bioStrategy: "Positioned CEO as thought leader with weekly teardown of industrial energy tariffs and corporate tax deduction guides for commercial solar.",
          contentPillars: [
            "50% Commercial ROI case studies with real utility bill breakdowns",
            "25% Industry policy analysis & clean energy incentives",
            "15% Team spotlights & on-site commercial installation photo logs",
            "10% Polls benchmarking facility managers' energy pain points",
          ],
          screenshotUrl: mockupCreativesImg,
          icon: "LinkedIn",
          customMetrics: [
            { id: "cm-2-1", label: "Executive Inbound DMs", value: "18 Qualified" },
            { id: "cm-2-2", label: "Avg Post Impressions", value: "14,500" },
          ],
          resultsSummary: "Created 18 closed B2B audit appointments organically through LinkedIn content strategy and proactive founder executive positioning.",
        },
      ],
      socialMarketing: [
        {
          id: "smm-acc-1",
          title: "Meta CBO Scale Campaign: DTC Skincare 'Miracle Barrier Cream'",
          campaignType: "Advantage+ Shopping / CBO Scale",
          objective: "Conversions (Purchase) — Top of Funnel Prospecting",
          screenshotUrl: mockupCreativesImg,
          summary: "Engineered an Advantage+ Shopping Campaign utilizing dynamic creative testing (DCT) with 3 hooks, 2 primary bodies, and 2 headline variants. The winning combination featured a 'Dermatologist react' UGC hook with native green-screen format, achieving a 4.45x blended ROAS at $450/day spend.",
          audienceTargeting: "Broad 18-54 F, US National, Excluded 30-day website buyers and 180-day customer list. Leveraged Meta's Advantage+ targeting algorithm to uncover lookalike pockets.",
          budgetSpend: "$14,250 over 30 Days",
          metrics: {
            ctr: "3.42% Outbound",
            cpc: "$0.84",
            roasOrCpa: "4.45x ROAS ($19.20 CPA)",
            conversions: "742 Purchases",
          },
        },
        {
          id: "smm-acc-2",
          title: "High-Ticket B2B Lead Gen: Free SaaS Workflow Audit",
          campaignType: "Meta Instant Lead Form + CRM Webhook",
          objective: "Lead Generation (Booked Executive Demos)",
          screenshotUrl: mockupCreativesImg,
          summary: "Ran an interactive Meta Instant Experience Lead Form targeting VP of Marketing and Ops Directors. The ad creative tackled high employee churn and manual spreadsheet reporting, offering a 7-minute automated benchmark scorecard.",
          audienceTargeting: "Interest stacking: HubSpot + Salesforce + Asana users + Lookalike 2% from CRM customer exports, Ages 28-58, Desktop & Mobile feeds.",
          budgetSpend: "$6,800 over 21 Days",
          metrics: {
            ctr: "2.18%",
            cpc: "$1.45",
            roasOrCpa: "$38.50 per Qualified Lead",
            conversions: "176 Qualified Leads",
          },
        },
        {
          id: "smm-acc-3",
          title: "Dynamic Product Retargeting (DPA): Cart Abandonment Recovery",
          campaignType: "Meta Dynamic Catalog Ads (Carousel)",
          objective: "Cart Recovery (7-Day Add to Cart Window)",
          screenshotUrl: mockupCreativesImg,
          summary: "Set up personalized dynamic carousel ads showing exact abandoned items with a dynamic 10% coupon code banner overlay ('Complete your set with code WELCOME10'). Recovered over $28k in abandoned basket revenue.",
          audienceTargeting: "Pixel custom audience: Added to Cart in last 7 days OR Viewed Content in last 14 days, Excluding purchases in last 60 days.",
          budgetSpend: "$2,400 over 30 Days",
          metrics: {
            ctr: "4.88%",
            cpc: "$0.62",
            roasOrCpa: "7.82x ROAS",
            conversions: "312 Recovered Orders",
          },
        },
      ],
      googleAds: [
        {
          id: "gads-1",
          campaignName: "High-Intent Search: Emergency Commercial Plumbing Services",
          campaignType: "Search Ad",
          screenshotUrl: mockupLaptopImg,
          summary: "Restructured legacy broad-match campaigns into tight single-theme ad groups (STAGs) with exact and phrase match keywords. Implemented Call Assets, Sitelinks with 2-line descriptions, Location Assets, and structured snippet extensions. Increased conversion rate by 140% while slashing cost-per-click.",
          headlines: [
            "Emergency Commercial Plumber | 24/7 Rapid Response",
            "Licensed Techs on Site in 45 Min | Upfront Pricing",
            "No Hidden Overtime Fees | Call Our Master Dispatch",
          ],
          descriptions: [
            "Burst pipe or clogged grease trap? Fast response across metropolitan area. 100% bonded & insured.",
            "Over 25 years serving local restaurants & office buildings. Speak directly with a master technician now.",
          ],
          targetKeywords: [
            '"commercial plumber near me"',
            "[emergency plumbing dispatch]",
            '"industrial grease trap repair"',
            "[water main break repair commercial]",
          ],
          qualityScore: "9/10 (Above Average Ad Relevance & Expected CTR)",
          metrics: {
            impressions: "48,200",
            ctr: "8.65%",
            avgCpc: "$4.12",
            conversions: "348 Phone Calls & Inquiries",
            roas: "6.2x Pipeline Value",
          },
        },
        {
          id: "gads-2",
          campaignName: "Performance Max (PMax) DTC Apparel Scaling",
          campaignType: "Performance Max",
          screenshotUrl: mockupCreativesImg,
          summary: "Created high-performing Asset Groups segmented by product category (Outerwear vs Athleisure). Configured brand exclusions, audience signals with high-value buyer search queries, first-party customer lists, and localized YouTube shorts video assets.",
          headlines: [
            "Waterproof Minimalist Jackets | Designed for All Weather",
            "Free 2-Day Shipping & Easy Returns | Sustainable Outerwear",
            "Engineered for Performance | Shop the New 2026 Collection",
          ],
          descriptions: [
            "Discover ultra-breathable recycled fabrics with zero PFC chemicals. Over 4,000 5-star customer reviews.",
            "Upgrade your daily commute with modular weather-sealed pockets. Lifetime warranty on every piece.",
          ],
          targetKeywords: [
            "Intent signals: Competitor brand searches (Patagonia, Arc'teryx, Lululemon)",
            "In-market segment: Outdoor Recreation Equipment & Activewear",
            "Custom search terms: 'best waterproof commuter coat 2026'",
          ],
          qualityScore: "Excellent Asset Rating across 18 Headlines & 5 Videos",
          metrics: {
            impressions: "312,000",
            ctr: "4.15%",
            avgCpc: "$0.78",
            conversions: "890 Purchases",
            roas: "4.85x ROAS",
          },
        },
        {
          id: "gads-3",
          campaignName: "YouTube In-Stream Skippable: B2B FinTech App Demo",
          campaignType: "YouTube In-Stream",
          screenshotUrl: mockupLaptopImg,
          summary: "Produced and tested a 30-second skippable in-stream video ad with an unmistakable 5-second hook addressing CFO spreadsheet anxiety. Added clickable lead extension form and sitelink cards directly in the player overlay.",
          headlines: [
            "Automate Invoice Reconciliation in 60 Seconds",
            "Try Zero-Touch Accounting Free for 30 Days",
          ],
          descriptions: [
            "Stop wasting 15 hours every month matching bank receipts. Connect QuickBooks and Stripe seamlessly.",
          ],
          targetKeywords: [
            "Placements: Top finance & accounting YouTube channels",
            "Custom intent: Users searching 'how to automate accounting workflows'",
            "Keywords: QuickBooks alternatives, corporate card reconciliation",
          ],
          qualityScore: "View Rate 38.4% (Industry Avg: 22%)",
          metrics: {
            impressions: "185,000 Views",
            ctr: "1.92%",
            avgCpc: "$0.09 per CPV",
            conversions: "410 Free Trial Signups",
            roas: "3.7x Annual Contract Value",
          },
        },
      ],
      seo: {
        keywords: [
          { keyword: "best organic skincare for sensitive skin", searchVolume: 18100, keywordDifficulty: 42, intent: "Commercial", cpc: "$2.80", targetPage: "/collections/sensitive-skin-barrier", priority: "High" },
          { keyword: "ceramide barrier cream review", searchVolume: 9900, keywordDifficulty: 38, intent: "Informational", cpc: "$1.40", targetPage: "/blog/ceramide-skin-barrier-restoration", priority: "High" },
          { keyword: "buy organic peptide serum online", searchVolume: 6400, keywordDifficulty: 51, intent: "Transactional", cpc: "$4.20", targetPage: "/products/tri-peptide-nourishing-serum", priority: "High" },
          { keyword: "how to repair damaged skin barrier naturally", searchVolume: 14200, keywordDifficulty: 29, intent: "Informational", cpc: "$0.95", targetPage: "/guides/repair-skin-barrier-in-7-days", priority: "Medium" },
          { keyword: "hypoallergenic morning routine steps", searchVolume: 4800, keywordDifficulty: 24, intent: "Informational", cpc: "$1.10", targetPage: "/blog/hypoallergenic-morning-routine", priority: "Medium" },
          { keyword: "vegan cold pressed facial oil discount", searchVolume: 3200, keywordDifficulty: 35, intent: "Transactional", cpc: "$3.50", targetPage: "/products/botanical-glow-elixir", priority: "Low" },
        ],
        auditCategories: [
          {
            category: "Technical Crawlability & Indexation",
            score: 98,
            findings: [
              "Resolved 24 orphan URLs via updated XML sitemap and automated internal linking",
              "Fixed 14 legacy 301 redirect chains to direct canonical destinations",
              "Configured robots.txt directives to prevent indexing of internal search filter facets",
            ],
            actionTaken: "Submitted pristine dynamic sitemap index to Google Search Console; 100% of target pages indexed within 48 hours.",
          },
          {
            category: "Core Web Vitals & Page Speed (LCP, INP, CLS)",
            score: 95,
            findings: [
              "Largest Contentful Paint (LCP) reduced from 4.1s to 1.1s via WebP compression & AVIF next-gen formats",
              "Cumulative Layout Shift (CLS) reduced from 0.28 to 0.01 by specifying image aspect ratios in CSS",
              "Interaction to Next Paint (INP) clocked at 68ms (well within Google's <200ms good threshold)",
            ],
            actionTaken: "Deferred unneeded third-party tracking scripts, self-hosted web fonts, and leveraged Cloudflare Polish edge caching.",
          },
          {
            category: "On-Page SEO & Structured Data",
            score: 92,
            findings: [
              "Implemented JSON-LD Schema markup for Product, Review, FAQPage, and Organization",
              "Rewrote meta titles & H1 hierarchy across 45 collection pages to include primary keyword triggers",
              "Introduced automated descriptive alt text and internal breadcrumb navigation structure",
            ],
            actionTaken: "Achieved Google Rich Results approval with review star snippets displaying directly in SERPs.",
          },
        ],
        localSeo: {
          businessName: "Aura Dental & Holistic Smile Studio",
          category: "Cosmetic Dentist & Dental Clinic",
          addressSnippet: "450 Sutter St Suite 1200, San Francisco, CA 94108",
          reviewsCount: 148,
          avgRating: 4.9,
          localKeywordsRanked: [
            "#1 for 'holistic cosmetic dentist san francisco'",
            "#2 for 'clear aligners financial district sf'",
            "#1 in Google 3-Pack Maps for 'emergency gentle dental clinic'",
          ],
          optimizationSteps: [
            "Claimed & 100% verified Google Business Profile with secondary categories (Teeth Whitening, Dental Hygienist)",
            "Uploaded 60+ geotagged high-resolution clinic and smiling staff photos with EXIF metadata",
            "Automated post-appointment SMS review generation workflow resulting in 42 new 5-star reviews in 60 days",
            "Standardized Name-Address-Phone (NAP) consistency across 35 top local citations (Yelp, Healthgrades, YellowPages)",
          ],
          sampleReview: {
            author: "Dr. Elena Vance, Tech Executive",
            rating: 5,
            text: "Found Aura Dental on Google Maps while looking for holistic biomimetic treatments. The staff was incredible, booking was seamless, and the clinic feels like a peaceful spa. Highly recommend!",
          },
        },
      },
      digitalPlanning: {
        brandAuditDeck: [
          {
            slideNumber: 1,
            tag: "EXECUTIVE DELIVERABLE · CURRENT STATE VS MARKET LEADERS IN SUSTAINABLE ACTIVEWEAR",
            title: "Executive Brand Audit: Omni-Channel Gap Analysis",
            findings: [
              "Brand had a 72% reliance on paid Meta prospecting with zero email retention lifecycle marketing",
              "Organic brand search volume trailed competitors by 4.2x due to lack of PR and SEO authority content",
              "Website bounce rate on mobile was 68% due to sluggish product page loading times",
            ],
            metricsTable: [
              { metric: "Organic Traffic Share", auditState: "11%", benchmark: "38%" },
              { metric: "Blended Customer Acquisition Cost", auditState: "$64", benchmark: "$39" },
              { metric: "Email List Revenue Contribution", auditState: "6%", benchmark: "28%" },
            ],
          },
          {
            slideNumber: 2,
            tag: "EXECUTIVE DELIVERABLE · PERSONA: 'CONSCIOUS ACHIEVER CLARA' (AGE 28-42, HIGH HOUSEHOLD INCOME)",
            title: "Target Customer Persona & Mindset Mapping",
            findings: [
              "Primary motivation: Technical performance without toxic synthetic petroleum dyes or microplastics",
              "Main friction: Skeptical of greenwashing claims; needs transparent third-party laboratory certifications",
              "Trigger moments: New fitness milestones, corporate marathon signups, weekend hiking expeditions",
            ],
            frameworkArchitecture: "Empathy map outlining Clara's daily routine, media consumption channels (Substack, podcasts, TikTok), and purchase objections.",
          },
          {
            slideNumber: 3,
            tag: "EXECUTIVE DELIVERABLE · INTEGRATING PAID DISCOVERY, ORGANIC COMMUNITY, AND AUTOMATED RETENTION",
            title: "360° Omnichannel Funnel Architecture",
            findings: [
              "TOFU: Meta Broad Advantage+ Video hooks + TikTok UGC problem/solution demonstrations",
              "MOFU: Google Search commercial intent keywords + Retargeting comparison landing pages",
              "BOFU: Klaviyo 6-part automated welcome flow + SMS cart recovery offering VIP perks instead of deep discounts",
            ],
            frameworkArchitecture: "Funnel visual flow showing user progression from initial video impression down to post-purchase referral.",
          },
        ],
        capstoneReviewText: "Presented for Capstone Certification Review",
        verifiedTrainerText: "Verified by Academy Lead Trainer",
        strategyRoadmap: [
          {
            weeks: "Weeks 1 - 4",
            allocation: "15% Allocation",
            phase: "Phase 1: Foundation & Infrastructure",
            channels: ["Technical SEO", "Analytics Setup", "Tracking Pixel CAPI"],
            deliverables: [
              "Deploy Server-Side Meta CAPI & Google Tag Manager Enhanced Conversions",
              "Perform comprehensive site speed optimization (sub-1.5s load times)",
              "Build Klaviyo automated core email flows (Welcome, Cart, Post-Purchase)",
            ],
            milestone: "Milestone Review at 4",
          },
          {
            weeks: "Weeks 5 - 10",
            allocation: "60% Allocation",
            phase: "Phase 2: Acquisition & Paid Testing",
            channels: ["Meta Advantage+ CBO", "Google PMax & Search", "Micro-Influencer Seeding"],
            deliverables: [
              "Test 20 creative iterations across 4 hook themes to find winning angles",
              "Launch Exact Match Google Ads for high-intent category terms",
              "Seed product with 30 micro-influencers for authentic testimonial UGC assets",
            ],
            milestone: "Milestone Review at 10",
          },
          {
            weeks: "Weeks 11 - 16",
            allocation: "25% Allocation",
            phase: "Phase 3: Scaling, CRO & Retention",
            channels: ["Full-Scale Performance Budget", "A/B Landing Page Testing", "Affiliate Program"],
            deliverables: [
              "Scale winning Meta ad sets vertically and horizontally across lookalike pockets",
              "Launch dedicated advertorial landing pages via Replo/Unbounce to boost conversion rates",
              "Activate VIP loyalty tier and subscription re-order triggers",
            ],
            milestone: "Milestone Review at 16",
          },
        ],
      },
      influencerMarketing: {
        sheetTitle: "Influencer Marketing Research & Vetting Sheet",
        subtitle:
          "A comprehensive creator vetting database evaluating follower authenticity, audience fraud detection, demographic skew, engagement rates, and projected collaboration ROI.",
        badge: "Fraud Audit · Modash & HypeAuditor Metrics",
        cpmBenchmark: "Evaluated against creator CPM benchmarks ($12-$18 CPM target).",
        cohortAvgEngagement: "5.25%",
        creators: [
          {
            id: "inf-1",
            name: "Chloe Chen",
            handle: "@chloeglows",
            platform: "Instagram",
            niche: "Clean Skincare & Dermatologist Insights",
            followers: "128,000",
            fakeFollowersAudit: "4.8% (Exceptional Authenticity)",
            auditClean: true,
            genderDemographics: "84% Female / 16% Male",
            engagementRate: "4.92%",
            collaborationCost: "$850 (1 Reel + 3 Stories)",
            fitAssessment: "Recommended",
          },
          {
            id: "inf-2",
            name: "Marcus Rivera",
            handle: "@marcus_fitfood",
            platform: "TikTok",
            niche: "High Protein & Functional Nutrition",
            followers: "340,000",
            fakeFollowersAudit: "6.2% (Very Clean)",
            auditClean: true,
            genderDemographics: "58% Male / 42% Female",
            engagementRate: "7.15%",
            collaborationCost: "$1,200 (1 Dedicated TikTok)",
            fitAssessment: "Recommended",
          },
          {
            id: "inf-3",
            name: "Sophia Sterling",
            handle: "@sophia.lifestyle",
            platform: "Instagram",
            niche: "Luxury Travel & Fashion",
            followers: "285,000",
            fakeFollowersAudit: "22.4% (Elevated Bot Spike)",
            auditClean: false,
            genderDemographics: "70% Female / 30% Male",
            engagementRate: "1.10%",
            collaborationCost: "$2,000",
            fitAssessment: "Risky",
          },
          {
            id: "inf-4",
            name: "Dr. Ethan Brooks",
            handle: "@dr.ethan_health",
            platform: "YouTube",
            niche: "Preventative Medicine & Biohacking",
            followers: "94,000",
            fakeFollowersAudit: "3.1% (Pristine Audience)",
            auditClean: true,
            genderDemographics: "52% Male / 48% Female",
            engagementRate: "6.40%",
            collaborationCost: "$1,500 (60s Mid-Roll Integration)",
            fitAssessment: "High Potential",
          },
          {
            id: "inf-5",
            name: "Maya Lin",
            handle: "@mayaminimalist",
            platform: "TikTok",
            niche: "Sustainable Living & Zero-Waste",
            followers: "78,500",
            fakeFollowersAudit: "5.0%",
            auditClean: true,
            genderDemographics: "79% Female / 21% Male",
            engagementRate: "5.80%",
            collaborationCost: "$500 (1 TikTok + Whitelisting rights)",
            fitAssessment: "Recommended",
          },
        ],
      },
      shopify: {
        categoryBadge: "Module 09 · E-Commerce Architecture",
        moduleTitle: "Shopify E-Commerce Store & CRO Architecture",
        subtitle:
          "End-to-end Shopify merchant deployment designed for high Average Order Value (AOV), seamless 1-click checkout, and automated retention loops.",
        topBadge: "Shopify Partner Certified · Liquid Customized",
        imageUrl: mockupCreativesImg,
        themeUsed: "Customized Dawn 2.0 with liquid micro-optimizations",
        nicheCategory: "SUSTAINABLE ORGANIC OUTDOOR APPAREL & GEAR",
        storeName: "Terra & Tide Apparel",
        description:
          "Complete Shopify store setup from scratch. Configured product collections, payment gateways, automated tax settings, shipping zones, and integrated post-purchase cross-sell flows that immediately increased average order value by 30%.",
        kpis: [
          { id: "kpi-1", label: "CONVERSION RATE", value: "3.84% (up from 1.9% store baseline)", highlight: "blue" },
          { id: "kpi-2", label: "ACHIEVED AOV", value: "$89.50 (+$21 lift via cart cross-sells)", highlight: "amber" },
        ],
        conversionRateAchieved: "3.84% (up from 1.9% store baseline)",
        conversionRateLabel: "CONVERSION RATE",
        aovAchieved: "$89.50 (+$21 lift via cart cross-sells)",
        aovLabel: "ACHIEVED AOV",
        croFeaturesHeading: "CONVERSION RATE OPTIMIZATION (CRO) FEATURES:",
        croFeatures: [
          { text: "Slide-out Smart Cart with progress bar toward free shipping", icon: "cart" },
          { text: "Instant 1-Click Shopify Pay & Apple Pay express checkout", icon: "zap" },
          { text: "Sticky mobile buy bar with real-time stock scarcity notice", icon: "trending" },
          { text: "Size guide interactive modal with 98% fit confidence", icon: "shield" },
        ],
        installedAppsHeading: "INTEGRATED SHOPIFY APPS:",
        installedApps: [
          "Klaviyo: Email Marketing & SMS",
          "Rebuy Engine: Smart Cart & AI Upsells",
          "Judge.me: Verified Product Reviews",
          "Matrixify: Bulk Inventory Automation",
          "Loox: Photo Reviews & UGC Carousel",
        ],
        liveUrl: "https://terra-tide-sample.myshopify.com",
      },
      videoEditing: {
        categoryBadge: "Module 10 · Post-Production & Motion",
        moduleTitle: "Video Editing, UGC Creatives & Commercial Reels",
        subtitle:
          "Short-form video assets engineered for algorithm retention, featuring dynamic jump-cut pacing, kinetic subtitles, and psycho-acoustic sound design.",
        topBadge: "CapCut Desktop · Premiere Pro · 4K Color Graded",
        reels: [
          {
            id: "reel-1",
            formatTag: "Reels / TikTok",
            duration: "0:24",
            title: "High-Retention UGC Hook: The 'Stop Scrolling' Skincare Teardown",
            description:
              "Engineered a TikTok-native UGC video ad featuring jump cuts every 1.2 seconds, dynamic auto-synced subtitles, sound design (whooshes, pop-ups), and a clear call-to-action.",
            hookStrategy:
              "0-3s visual pattern interrupt (rapid zoom on textured skin) paired with curiosity headline text and dynamic sound effects.",
            retentionMetric: "62% completion rate at 15s mark (4.1x benchmark)",
            tools: ["Adobe Premiere Pro", "CapCut Desktop", "After Effects"],
          },
          {
            id: "reel-2",
            formatTag: "Brand Teaser",
            duration: "0:45",
            title: "Cinematic Product Commercial: Matte Black Espresso Machine",
            description:
              "Commercial-grade promotional video focusing on product textures, precision engineering, and lifestyle aspiration. Used as top-of-funnel brand anchor for Meta and YouTube campaigns.",
            hookStrategy:
              "Slow-motion espresso extraction shot at 120fps with tactile ASMR audio and atmospheric golden hour backlight.",
            retentionMetric: "54% 30-second retention rate on YouTube In-Stream",
            tools: ["DaVinci Resolve", "Color Grading with Film LUTs", "Sound FX Library"],
          },
        ],
      },
      dropshipping: {
        categoryBadge: "Module 11 · Direct-To-Consumer Fulfillment",
        moduleTitle: "Dropshipping Store & Winning Product Validation",
        subtitle:
          "Product discovery research, supplier supply chain integration, margin modeling, and TikTok/Meta ad testing for rapid profitable scaling.",
        topBadge: "Fast 5-Day US Fulfillment · 76.3% Gross Margin",
        productImage: mockupLaptopImg,
        eyebrow: "PRODUCT VALIDATION LABS",
        winningProduct: "Smart Ergonomic Cervical Contour Pillow with Cooling Gel",
        storefrontDetails:
          "Storefront: Lumina Sleep Lab · Fulfilled via CJ Dropshipping & Direct Private Agent (5-8 day US delivery)",
        economics: [
          { label: "COGS", value: "$14.20", highlight: "slate" },
          { label: "RETAIL PRICE", value: "$59.95", highlight: "slate" },
          { label: "NET PROFIT / UNIT", value: "+$45.75", highlight: "emerald" },
        ],
        cogs: "$14.20",
        retailPrice: "$59.95",
        netProfit: "+$45.75",
        adAngleHeading: "WINNING AD ANGLE & HOOK:",
        adAngleDescription:
          "Tackled widespread neck stiffness and morning migraines caused by smartphone posture. Ad creative demonstrated side-by-side spine alignment using 3D medical animation vs traditional flat pillows.",
        supplierTags: [
          "CJ Dropshipping",
          "Private Agent Shenzhen",
          "USPS Priority 5-Day",
          "AutoDS Automation",
        ],
        sprintHeading: "PILOT TESTING SPRINT RESULTS",
        sprintTimeframe: "14 Days Live",
        sprintMetrics: [
          { label: "Units Dispatched", value: "420", highlight: "white" },
          { label: "Test Ad Spend", value: "$3,800", highlight: "white" },
          { label: "Gross Revenue", value: "$25,179", highlight: "emerald" },
          { label: "Blended ROAS", value: "3.84x", highlight: "blue" },
        ],
        pilotUnitsSold: "420",
        pilotAdSpend: "$3,800",
        pilotGrossRevenue: "$25,179",
        pilotNetRoas: "3.84x",
      },
      aiApp: {
        moduleEyebrow: "MODULE 12 · ARTIFICIAL INTELLIGENCE & AUTOMATION",
        title: "AI-Powered Marketing Application & Creative Co-Pilot",
        subtitle:
          "Custom software engineered with modern AI APIs to accelerate marketing workflows, automate direct-response ad copy generation, and scale creative testing.",
        topBadge: "Gemini API · React 19 · Prompt Engineered",
        category: "PRODUCT ARCHITECTURE & WORKFLOW",
        appName: "AdCopyGenius AI — Marketing Creative Co-Pilot",
        appDescription:
          "Digital marketers spend 10+ hours a week staring at blank screens trying to write compelling ad angles. AdCopyGenius AI structures inputs into proven frameworks (AIDA, PAS, BAB) with automatic character count validation and emoji formatting.",
        systemPromptInstruction:
          '"You are an elite direct-response copywriter. Given a product, audience, and pain point, output 3 distinct hooks (Curiosity, Problem-Agitate, Social Proof) under 125 characters, paired with 2 persuasive bodies and call-to-actions."',
        features: [
          "Instant 3-Hook Generation (Curiosity, Pain Point, Social Proof)",
          "Automated Google Ads Headline & Description compliance checker",
          "Meta Primary Text generator with estimated CTR rating score",
          "1-Click Copy to Clipboard & CSV batch export for Google Ads Editor",
        ],
        techStack: ["React 19", "TypeScript", "Tailwind CSS", "Gemini API", "Vite"],
        defaultProduct: "Anti-Fatigue Ergonomic Standing Mat",
        variants: {
          "AIDA": [
                    {
                              "framework": "Curiosity Pattern Interrupt",
                              "ctr": "3.85% Pred. CTR",
                              "text": "\"Why 84% of remote workers suffer lower back soreness after 2 PM (Hint: it's not their chair, it's what's under their socks).\""
                    },
                    {
                              "framework": "Pain-Agitate-Solve (PAS)",
                              "ctr": "4.12% Pred. CTR",
                              "text": "\"Standing desks don't fix foot fatigue. Our high-density contoured core absorbs 40% of joint compression so you work pain-free all day.\""
                    },
                    {
                              "framework": "Direct Response Offer Hook",
                              "ctr": "3.94% Pred. CTR",
                              "text": "\"Upgrade your daily work stamina. Try the orthopedic standing mat backed by 2,400+ 5-star physical therapist reviews. Free 30-day trial.\""
                    }
          ],
          "PAS": [
                    {
                              "framework": "Pain-Agitate-Solve (PAS)",
                              "ctr": "4.12% Pred. CTR",
                              "text": "\"Standing desks don't fix foot fatigue. Our high-density contoured core absorbs 40% of joint compression so you work pain-free all day.\""
                    },
                    {
                              "framework": "Curiosity Pattern Interrupt",
                              "ctr": "3.85% Pred. CTR",
                              "text": "\"Why 84% of remote workers suffer lower back soreness after 2 PM (Hint: it's not their chair, it's what's under their socks).\""
                    },
                    {
                              "framework": "Direct Response Offer Hook",
                              "ctr": "3.94% Pred. CTR",
                              "text": "\"Upgrade your daily work stamina. Try the orthopedic standing mat backed by 2,400+ 5-star physical therapist reviews. Free 30-day trial.\""
                    }
          ],
          "Curiosity": [
                    {
                              "framework": "Curiosity Pattern Interrupt",
                              "ctr": "3.85% Pred. CTR",
                              "text": "\"Why 84% of remote workers suffer lower back soreness after 2 PM (Hint: it's not their chair, it's what's under their socks).\""
                    },
                    {
                              "framework": "Pain-Agitate-Solve (PAS)",
                              "ctr": "4.12% Pred. CTR",
                              "text": "\"Standing desks don't fix foot fatigue. Our high-density contoured core absorbs 40% of joint compression so you work pain-free all day.\""
                    },
                    {
                              "framework": "Direct Response Offer Hook",
                              "ctr": "3.94% Pred. CTR",
                              "text": "\"Upgrade your daily work stamina. Try the orthopedic standing mat backed by 2,400+ 5-star physical therapist reviews. Free 30-day trial.\""
                    }
          ]
        },
      },
      performanceMarketing: {
        moduleEyebrow: "MODULE 13 · ADVANCED PERFORMANCE MARKETING",
        title: "Performance Marketing & Full-Funnel Scaling",
        subtitle:
          "Full-funnel paid acquisition architecture scaling spend from $8k to $45k/month while sustaining high profitability through CAC reduction and cohort LTV expansion.",
        topBadge: "Triple Whale & GA4 Attributed · $135k Managed",
        stats: [
          {
            label: "Total Spend Scaled",
            value: "$45,000",
            subtext: "90-Day Scaling Sprint",
            highlight: false,
          },
          {
            label: "Blended ROAS",
            value: "3.92x",
            subtext: "$529,200 Gross Revenue",
            highlight: "blue",
          },
          {
            label: "Blended Acquisition (CAC)",
            value: "$82.40",
            subtext: "-28% vs Account Baseline",
            highlight: "emerald",
          },
          {
            label: "6-Month LTV / CAC",
            value: "4.12x Ratio",
            subtext: "$340 (4.1x CAC ratio) Projected LTV",
            highlight: "amber",
          },
        ],
        funnelArchitecture: {
          eyebrow: "FUNNEL ALLOCATION ARCHITECTURE:",
          title: "Multi-Stage Channel Mix & Budget Orchestration",
          stages: [
            {
              stage: "Top of Funnel (TOF)",
              pct: "65%",
              pctBadgeClass: "bg-blue-100 text-blue-700",
              objective: "Problem Awareness & Cold Traffic Acquisition",
              channels: "Meta Advantage+ (60%) + TikTok Ads (40%)",
              creativeFormats:
                "Founder Story UGC, Spine Pain Medical Demonstration, Hook-tested Reels",
              budgetFooter: "65% of Total Budget ($29,250/mo)",
            },
            {
              stage: "Middle of Funnel (MOF)",
              pct: "20%",
              pctBadgeClass: "bg-amber-100 text-amber-800",
              objective: "Product Consideration & Social Proof Validation",
              channels: "Google Search Exact Intent + Meta Video Views Retargeting",
              creativeFormats:
                "Press Reviews (Forbes / Wirecutter quotes), 1,000+ Customer Testimonial Grids",
              budgetFooter: "20% of Total Budget ($9,000/mo)",
            },
            {
              stage: "Bottom of Funnel (BOF)",
              pct: "15%",
              pctBadgeClass: "bg-emerald-100 text-emerald-800",
              objective: "Conversion, Abandonment Recovery & Urgency",
              channels: "Dynamic Catalog Ads + Klaviyo SMS/Email + Google Brand Search",
              creativeFormats:
                "Limited-time 10-year warranty highlight, Zero-interest financing ($0 down via Klarna)",
              budgetFooter: "15% of Total Budget ($6,750/mo)",
            },
          ],
        },
        attribution: {
          eyebrow: "ATTRIBUTION & MEASUREMENT RIGOR",
          title: "Independent First-Party Tracking",
          description:
            "Triple Whale 1-Day Click / 1-Day View First-Party Pixel & Google Analytics 4 Data-Driven Attribution",
          outcomesHeading: "VERIFIED STUDENT SCALING OUTCOMES:",
          outcomes: [
            "Scaled monthly spend from $8,000 to $45,000 while maintaining ROAS above 3.8x",
            "Decreased blended CAC by 28% through iterative landing page A/B split testing",
            "Generated over $529,200 in gross revenue with $174,000 contribution profit margin",
          ],
        },
      },
    },
  };
};
