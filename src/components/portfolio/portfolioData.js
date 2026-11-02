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
    "Diploma in Digital Marketing";

  return {
    student: {
      name: studentName,
      headline: "Certified Digital Marketer & Full-Funnel Growth Strategist",
      subheadline: `Specializing in ${courseTitle} — Performance Paid Ads, Technical SEO & High-Converting Funnels`,
      bio: "Passionate digital marketing graduate trained in 360° growth marketing at Operating Media. Proven track record managing Meta & Google Ads campaigns, designing high-converting WordPress & Shopify e-commerce experiences, executing organic content engines, and building AI-accelerated marketing workflows.",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop",
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
          imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
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
          imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop",
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
            id: "canva-1",
            title: "Black Friday Cyber Week 7-Slide Carousel",
            category: "Instagram Carousel",
            aspectRatio: "4:5 Portrait",
            palette: ["#18181b", "#fbbf24", "#ffffff"],
            typography: "Syne Display + Inter",
            impressionsAchieved: "142,000+",
            savesCount: "3,890",
            imageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop",
            conceptNote: "Built high-contrast visual architecture with pattern interrupts on Slide 1 to lift hook rates by 28%.",
          },
          {
            id: "canva-2",
            title: "D2C Brand Identity & Typography Guidelines",
            category: "Brand Style Guide Deck",
            aspectRatio: "16:9 Landscape",
            palette: ["#0284c7", "#f0fdf4", "#0f172a"],
            typography: "Playfair Display + Montserrat",
            impressionsAchieved: "Brand Standard",
            savesCount: "Complete Deck",
            imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop",
            conceptNote: "Comprehensive 24-page PDF brand asset book for social media managers and freelance designers.",
          },
        ],
        videos: [
          {
            id: "canva-v1",
            title: "15s Dynamic Kinetic Typography Reel",
            type: "Reels / TikTok Video Ad",
            duration: "0:15",
            musicBpm: "128 BPM Trend Audio",
            videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screen-close-up-1728-large.mp4",
          },
        ],
      },
      socialOrganic: [
        {
          id: "so-1",
          platform: "Instagram",
          handle: "@zenith_activewear",
          startingFollowers: 1200,
          currentFollowers: 28400,
          timeframe: "4 Months",
          avgEngagementRate: "5.8%",
          topPillars: ["Behind-the-Scenes Fabric Tech", "Workout Routines by Micro-Athletes", "Meme Culture for Gym Bros"],
          viralCaseStudy: "1 Reel hit 1.4M views via trending audio synced to split-second product transitions.",
          growthPercent: "+2,266%",
        },
        {
          id: "so-2",
          platform: "LinkedIn",
          handle: "Founder Personal Brand (Fintech)",
          startingFollowers: 850,
          currentFollowers: 14200,
          timeframe: "90 Days",
          avgEngagementRate: "7.2%",
          topPillars: ["Bootstrapping Lessons", "SaaS Metric Teardowns", "Hiring Mistakes"],
          viralCaseStudy: "1 Text+Carousel post drove 480 inbound newsletter signups and 12 sales calls.",
          growthPercent: "+1,570%",
        },
      ],
      socialMarketing: [
        {
          id: "sm-1",
          campaignName: "TOFU/MOFU/BOFU Full-Funnel Apparel Scale",
          objective: "Sales / Purchase Conversions",
          adSpend: "₹480,000",
          revenueGenerated: "₹2,160,000",
          roas: "4.50x",
          cpa: "₹380",
          hookRatePct: 34.2,
          holdRatePct: 18.5,
          keyLearning: "Advantage+ Shopping Campaigns combined with UGC unboxing hooks dropped blended CPA by 31%.",
        },
        {
          id: "sm-2",
          campaignName: "Local Medical Clinic Lead Generation Funnel",
          objective: "Instant Lead Forms + WhatsApp Clicks",
          adSpend: "₹120,000",
          revenueGenerated: "₹640,000",
          roas: "5.33x",
          cpa: "₹115 / Lead",
          hookRatePct: 41.0,
          holdRatePct: 22.0,
          keyLearning: "Using localized Hindi/English video testimonials boosted consultation booking rates by 54%.",
        },
      ],
      googleAds: [
        {
          id: "gads-1",
          campaignType: "Search Ads — Single Keyword Ad Groups (SKAG)",
          industry: "B2B Corporate Law Firm",
          monthlyBudget: "₹150,000",
          impressions: "48,500",
          ctrPct: "8.4%",
          cpcAvg: "₹28.50",
          conversions: "312",
          cpa: "₹480",
          qualityScoreAvg: "9/10",
          topSearchTerms: ["trademark registration lawyer mumbai", "ip litigation consultant near me"],
        },
        {
          id: "gads-2",
          campaignType: "Performance Max (PMax) + Google Shopping",
          industry: "Luxury Leather Handbags D2C",
          monthlyBudget: "₹300,000",
          impressions: "340,000",
          ctrPct: "4.2%",
          cpcAvg: "₹14.20",
          conversions: "840",
          cpa: "₹357",
          qualityScoreAvg: "8.5/10",
          topSearchTerms: ["handcrafted leather laptop bag", "premium leather tote bag"],
        },
      ],
      seo: {
        keywords: [
          { keyword: "best digital marketing course in andheri", volume: "4,400", initialRank: 48, currentRank: 2, url: "/digital-marketing-andheri" },
          { keyword: "seo training institute mumbai", volume: "2,900", initialRank: 36, currentRank: 1, url: "/seo-course-mumbai" },
          { keyword: "google ads certification classes", volume: "1,800", initialRank: 29, currentRank: 3, url: "/google-ads-classes" },
          { keyword: "performance marketing agency mumbai", volume: "1,200", initialRank: 55, currentRank: 4, url: "/performance-marketing" },
        ],
        audit: {
          totalPagesAudited: 420,
          criticalErrorsResolved: 38,
          coreWebVitalsStatus: "Pass (LCP 1.1s, CLS 0.02, INP 84ms)",
          domainAuthorityBefore: 14,
          domainAuthorityAfter: 38,
          organicTrafficGrowth: "+380%",
        },
        localSeo: {
          businessName: "Operating Media — Digital Marketing Institute",
          googleReviewsCount: "480+ Reviews",
          avgRating: "4.9 ★",
          localPackTop3Keywords: ["digital marketing institute near me", "seo classes andheri west"],
        },
      },
      digitalPlanning: {
        brandAuditDeck: [
          { slideNumber: 1, title: "Executive Brand Diagnosis", takeaway: "Identified high bounce rates on mobile landing pages due to unoptimized form friction." },
          { slideNumber: 2, title: "Competitor Market Share Matrix", takeaway: "Competitors overspending on Brand Search while ignoring profitable PMax YouTube channels." },
          { slideNumber: 3, title: "Growth Hypothesis & Media Mix", takeaway: "Reallocated 35% of budget to UGC Tik-Tok/Reels ads + Meta Retargeting for +42% incremental ROAS." },
        ],
        strategyRoadmap: [
          { phase: "Month 1", focus: "Tracking Architecture & GTM Server-Side Setup", deliverable: "Clean event tracking across Meta CAPI, GA4, and Google Ads" },
          { phase: "Month 2", focus: "Creative Engine & Angle Testing", deliverable: "12 UGC Hooks, 4 static infographics, and 2 landing page variations" },
          { phase: "Month 3", focus: "Scale Budget by 3x on Winning Angles", deliverable: "Achieved profitable scale while maintaining 3.8x+ ROAS" },
        ],
      },
      influencerMarketing: [
        { id: "inf-1", tier: "Nano-Influencer (5k - 15k)", countHired: 12, costPerPost: "₹3,000", totalSpend: "₹36,000", reach: "148,000", engagementRate: "8.4%", revenueDrawn: "₹185,000" },
        { id: "inf-2", tier: "Micro-Influencer (20k - 80k)", countHired: 4, costPerPost: "₹18,000", totalSpend: "₹72,000", reach: "320,000", engagementRate: "5.1%", revenueDrawn: "₹310,000" },
      ],
      shopify: {
        storeName: "Kinetics Performance Wear",
        niche: "Gym & Athleisure DTC",
        themeUsed: "Dawn (Custom Liquified & Optimized)",
        liveUrl: "https://kinetics-store-sample.myshopify.com",
        installedApps: ["Klaviyo Email", "Rebuy Smart Cart", "Loox Product Reviews", "Judge.me"],
        croFeatures: ["Sticky slide-out drawer cart with free shipping progress bar", "1-Click post-purchase upsell checkout funnel", "Bundle & Save tiered pricing widget on product page"],
        conversionRateAchieved: "3.84%",
        aovAchieved: "₹2,450",
        description: "Engineered high-converting Shopify store architecture from scratch, ensuring sub-1.4s load time on mobile 4G networks and seamless Razorpay/Stripe checkout gateways.",
      },
      videoEditing: [
        { id: "ve-1", title: "Problem-Agitate-Solve UGC Ad for Teeth Whitening", software: "CapCut Pro & Premiere Pro", hookTime: "First 1.8 seconds", retentionRate: "68% at 3s mark" },
        { id: "ve-2", title: "Kinetic Podcast Clip with B-roll & Sound Effects", software: "After Effects & Premiere Pro", hookTime: "Visual pattern interrupt on word 1", retentionRate: "74% completion rate" },
      ],
      dropshipping: {
        storeName: "Lumina Home Tech",
        winningProduct: "Smart Ergonomic Posture Sensor",
        cogs: "₹420",
        retailPrice: "₹1,899",
        grossMarginPct: "77.8%",
        supplierPlatform: "AutoDS / Private Agent in Shenzhen",
        adAngleDescription: "Targeted remote corporate workers complaining of neck stiffness using relatable split-screen posture comparisons.",
        validationMetrics: "₹340,000 gross revenue in first 21 days with 3.2x ROAS on Meta Ads.",
      },
      aiApp: {
        appName: "PromptGrowth AI — Social Content Generator",
        tagline: "Custom GPT-4o marketing workflow assistant generating 30 days of viral content in 60 seconds",
        problemSolved: "Eliminates creator writer's block by reverse-engineering viral hooks and outputting formatted carousels.",
        techStack: ["Next.js", "OpenAI API", "Tailwind CSS", "Vercel"],
        aiModelUsed: "GPT-4o + Claude 3.5 Sonnet",
        samplePromptSystem: "Acts as a senior direct-response copywriter trained on 1,000+ viral LinkedIn carousels.",
        features: ["1-Click Hook Variations Generator", "Hashtag & SEO Keywords Optimizer", "Export to PDF Carousel Slide Deck"],
        demoUrl: "https://promptgrowth-demo.vercel.app",
      },
      performanceMarketing: {
        clientIndustry: "Omnichannel Health & Wellness Brand",
        budgetScaled: "Scaled from ₹100,000/mo to ₹850,000/mo in 6 months",
        timeframe: "Q1 to Q3 2026",
        overallRoas: "3.92x Blended",
        blendedCac: "₹410 (Reduced by 28%)",
        ltvEstimate: "₹2,840 90-Day LTV",
        funnelStages: "Meta Ads (TOFU) -> Google Search Brand (MOFU) -> Klaviyo SMS/Email (BOFU Retargeting)",
        scalingResults: "Delivered ₹3,332,000 in profitable tracked revenue with 99.4% tracking attribution accuracy.",
      },
    },
  };
};
