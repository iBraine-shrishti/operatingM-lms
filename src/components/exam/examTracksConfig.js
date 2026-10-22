// ============================================================================
// OPERATING MEDIA SKILLSHOP CERTIFICATION TRACKS & ASSESSMENT DATA
// Google Skills Exam Architecture: Component-Based, Zero Negative Marking,
// 3-Warning Window Proctoring, and Full Diploma / Track Specific Certifications
// ============================================================================

import {
  Globe,
  Target,
  BarChart2,
  Share2,
  Layout,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Award,
  BookOpen,
} from "lucide-react";

const EXAM_QUESTIONS = [
  // ---------------- DOMAIN 1: SEO & Web Vitals (Q1 - Q15) ----------------
  {
    id: 1,
    sectionId: "sec-1",
    sectionName: "Technical SEO & Schema",
    difficulty: "CRITICAL",
    marks: 2.0,
    penalty: 0.0,
    text: "A large enterprise e-commerce platform has 450,000 faceted filter URLs resulting in crawl budget exhaustion. The engineering team proposes using 'Disallow: /*?*' in robots.txt vs. 'noindex, follow' meta tags. What is the definitive crawl & indexation outcome if 'Disallow' is implemented?",
    options: [
      {
        id: "A",
        text: "Googlebot will still crawl the URLs to read the canonical tag, but won't index them.",
      },
      {
        id: "B",
        text: "Googlebot ceases crawling immediately, but existing indexed URLs may remain in the SERP as bare links without snippets if linked externally.",
      },
      {
        id: "C",
        text: "Googlebot will automatically transfer PageRank from disallowed URLs to the parent category without delay.",
      },
      {
        id: "D",
        text: "Disallow forces an automatic 410 Gone status code on all parameter requests.",
      },
    ],
    correctAnswer: "B",
    explanation:
      "Robots.txt Disallow stops crawling but does NOT prevent indexation if external links exist. Google will show the URL without snippet information.",
  },
  {
    id: 2,
    sectionId: "sec-1",
    sectionName: "Technical SEO & Schema",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.0,
    text: "During Core Web Vitals optimization, you identify an Interaction to Next Paint (INP) score of 420ms on mobile product pages caused by extensive Long Animation Frames (LoAF). Which mitigation strategy directly targets the main-thread execution bottleneck?",
    options: [
      {
        id: "A",
        text: "Preload the primary hero webp banner using fetchpriority='high'.",
      },
      {
        id: "B",
        text: "Break long tasks using scheduler.yield() or setTimeout() into micro-tasks and defer non-essential third-party event listeners.",
      },
      {
        id: "C",
        text: "Convert CSS animations from opacity/transform to margin-left transitions.",
      },
      {
        id: "D",
        text: "Implement HTTP/2 Server Push for all render-blocking stylesheet files.",
      },
    ],
    correctAnswer: "B",
    explanation:
      "Breaking long tasks via scheduler.yield() allows the main thread to process user input events rapidly, reducing INP input delay.",
  },
  {
    id: 3,
    sectionId: "sec-1",
    sectionName: "Technical SEO & Schema",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.0,
    text: "Which JSON-LD Structured Data schema syntax correctly configures a Course Instance with multi-session physical venue and instructor entity nesting according to Schema.org standards?",
    options: [
      {
        id: "A",
        text: "Using '@type': 'Course' with embedded 'hasCourseInstance' pointing to 'CourseInstance' containing 'location' Place entity.",
      },
      {
        id: "B",
        text: "Declaring '@type': 'WebPage' with attribute 'courseName' and 'instructorName' as plaintext arrays.",
      },
      {
        id: "C",
        text: "Combining 'Product' with 'OfferCatalog' and overriding the name with course metadata.",
      },
      {
        id: "D",
        text: "Using Microformats class='vcalendar-course' instead of script tag embedding.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "Schema.org standards mandate '@type': 'Course' with 'hasCourseInstance' linking to the specific course delivery instance.",
  },
  {
    id: 4,
    sectionId: "sec-1",
    sectionName: "Technical SEO & Schema",
    difficulty: "CRITICAL",
    marks: 2.0,
    penalty: 0.0,
    text: "A site migration from HTTP to HTTPS results in self-referential canonicals on HTTP URLs and 302 temporary redirects pointing to HTTPS. Google continues serving HTTP in SERPs after 6 weeks. What is the root algorithmic cause?",
    options: [
      {
        id: "A",
        text: "Google ignores 302 redirects completely and treats them as 404 errors.",
      },
      {
        id: "B",
        text: "The combination of 302 temporary redirect and conflicting HTTP self-canonical signals to Googlebot that the move is temporary, preventing canonical consolidation to HTTPS.",
      },
      {
        id: "C",
        text: "The XML sitemap must only contain HTTP URLs for 12 months after migration.",
      },
      {
        id: "D",
        text: "The SSL certificate provider must be registered directly in Google Search Console.",
      },
    ],
    correctAnswer: "B",
    explanation:
      "302 indicates temporary move and self-referential canonicals reaffirm HTTP as authoritative, contradicting the migration signal.",
  },
  {
    id: 5,
    sectionId: "sec-1",
    sectionName: "Technical SEO & Schema",
    difficulty: "MEDIUM",
    marks: 2.0,
    penalty: 0.0,
    text: "What HTTP header must be returned to prevent Google from indexing a confidential PDF asset while permitting search bots to follow links embedded within it?",
    options: [
      { id: "A", text: "X-Robots-Tag: noindex, follow" },
      { id: "B", text: "Robots: none" },
      { id: "C", text: "Content-Security-Policy: disallow-google" },
      { id: "D", text: "Cache-Control: private, no-store" },
    ],
    correctAnswer: "A",
    explanation:
      "X-Robots-Tag in HTTP header supports 'noindex, follow' on non-HTML assets like PDF and DOCX files.",
  },
  {
    id: 6,
    sectionId: "sec-1",
    sectionName: "Technical SEO & Schema",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.0,
    text: "When implementing hreflang annotations across 5 international language-country variations, what happens if page A references page B with 'hreflang=\"es-ES\"' but page B omits the return annotation to page A?",
    options: [
      {
        id: "A",
        text: "Google will automatically infer the reciprocal relationship after 7 days.",
      },
      {
        id: "B",
        text: "The bidirectional relationship is broken; Googlebot will disregard the hreflang annotation for both pages due to missing reciprocal confirmation.",
      },
      {
        id: "C",
        text: "Google penalizes the entire domain for doorway manipulation.",
      },
      {
        id: "D",
        text: "Only the Spanish URL will be indexed while English is deindexed.",
      },
    ],
    correctAnswer: "B",
    explanation:
      "Hreflang requires strict bidirectional confirmation. If the target page does not reciprocate the annotation, Googlebot ignores it.",
  },
  {
    id: 7,
    sectionId: "sec-1",
    sectionName: "Technical SEO & Schema",
    difficulty: "CRITICAL",
    marks: 2.0,
    penalty: 0.0,
    text: "In Server-Side Rendering (SSR) vs. Dynamic Rendering for client-heavy React apps, what is Google's current official stance regarding Dynamic Rendering as a long-term solution?",
    options: [
      {
        id: "A",
        text: "Dynamic rendering is mandatory for all websites above 10,000 pages.",
      },
      {
        id: "B",
        text: "Google considers dynamic rendering a temporary workaround and strongly recommends SSR, SSG, or hydration architectures.",
      },
      {
        id: "C",
        text: "Dynamic rendering is considered cloaking and triggers a manual action penalty.",
      },
      {
        id: "D",
        text: "Google no longer supports JavaScript rendering on smartphones.",
      },
    ],
    correctAnswer: "B",
    explanation:
      "Google updated documentation stating dynamic rendering is a temporary deprecated workaround, advocating SSR/SSG instead.",
  },
  {
    id: 8,
    sectionId: "sec-1",
    sectionName: "Technical SEO & Schema",
    difficulty: "MEDIUM",
    marks: 2.0,
    penalty: 0.0,
    text: "Which Cumulative Layout Shift (CLS) sub-metric issue occurs when web fonts swap from fallback system font to custom webfont without font-display metric matching?",
    options: [
      {
        id: "A",
        text: "FOIT / FOUT inducing layout shift by altering text bounding box line wraps",
      },
      { id: "B", text: "Excessive DOM size warning (> 1,500 nodes)" },
      { id: "C", text: "First Contentful Paint (FCP) timeout" },
      { id: "D", text: "CSSOM blocking time degradation" },
    ],
    correctAnswer: "A",
    explanation:
      "Flash of Unstyled/Invisible Text causes abrupt reflows and text line wrapping shifts, directly driving CLS scores above 0.1.",
  },
  {
    id: 9,
    sectionId: "sec-1",
    sectionName: "Technical SEO & Schema",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.0,
    text: "What regex expression in Google Search Console URL filter captures all URLs containing 'product' followed by a 4 to 6 digit numeric SKU without query parameters?",
    options: [
      { id: "A", text: ".*product-[0-9]{4,6}$" },
      { id: "B", text: "product\\d*" },
      { id: "C", text: "^product.*[0-9]" },
      { id: "D", text: "product:num(4-6)" },
    ],
    correctAnswer: "A",
    explanation:
      "'.*product-[0-9]{4,6}$' precisely matches the path segment followed by 4 to 6 digits ending before query parameters.",
  },
  {
    id: 10,
    sectionId: "sec-1",
    sectionName: "Technical SEO & Schema",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.0,
    text: "When Google discovers a URL with conflicting directives: robots meta tag 'noindex' AND rel='canonical' pointing to an indexable URL B, what does Googlebot do?",
    options: [
      { id: "A", text: "It indexes both pages as identical duplicates." },
      {
        id: "B",
        text: "The 'noindex' takes precedence: the page is deindexed and Googlebot typically ignores the canonical signal to URL B.",
      },
      { id: "C", text: "The canonical overrides the noindex automatically." },
      { id: "D", text: "The site is flagged for cloaking violations." },
    ],
    correctAnswer: "B",
    explanation:
      "Noindex prevents indexation and stops canonical signal consolidation because Googlebot cannot treat a noindexed page as an authoritative canonical source.",
  },
  {
    id: 11,
    sectionId: "sec-1",
    sectionName: "Technical SEO & Schema",
    difficulty: "MEDIUM",
    marks: 2.0,
    penalty: 0.0,
    text: "Which HTTP status code communicates to search engines that an endpoint is permanently removed and should be purged from the index faster than a standard 404?",
    options: [
      { id: "A", text: "410 Gone" },
      { id: "B", text: "403 Forbidden" },
      { id: "C", text: "307 Temporary Redirect" },
      { id: "D", text: "429 Too Many Requests" },
    ],
    correctAnswer: "A",
    explanation:
      "410 Gone explicitly tells search spiders the asset is intentionally and permanently deleted, speeding up index de-listing.",
  },
  {
    id: 12,
    sectionId: "sec-1",
    sectionName: "Technical SEO & Schema",
    difficulty: "CRITICAL",
    marks: 2.0,
    penalty: 0.0,
    text: "A webmaster notices that server logs show 10,000 daily Googlebot smartphone hits on URLs appended with session IDs 'sid=xyz'. What parameter handling configuration in robots.txt preserves crawl efficiency?",
    options: [
      { id: "A", text: "Disallow: /*?*sid=" },
      { id: "B", text: "Allow: /session/" },
      { id: "C", text: "Noindex: /*?*sid=" },
      { id: "D", text: "Crawl-delay: 10" },
    ],
    correctAnswer: "A",
    explanation:
      "'Disallow: /*?*sid=' blocks Googlebot from requesting any URL containing the session ID parameter, saving crawl budget.",
  },
  {
    id: 13,
    sectionId: "sec-1",
    sectionName: "Technical SEO & Schema",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.0,
    text: "What is the primary architectural vulnerability of implementing pagination via infinite scroll without pushState URL updates for search engine crawlers?",
    options: [
      {
        id: "A",
        text: "Crawlers do not scroll or trigger JavaScript DOM wheel events, rendering items beyond page 1 completely undiscoverable.",
      },
      {
        id: "B",
        text: "Infinite scroll invalidates schema markup on all pages.",
      },
      {
        id: "C",
        text: "Server automatically issues 500 error to user agents without cookies.",
      },
      {
        id: "D",
        text: "It doubles server bandwidth consumption unnecessarily.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "Googlebot does not simulate scroll or user gesture interactions. Without paginated URLs or pushState endpoints, infinite content is invisible.",
  },
  {
    id: 14,
    sectionId: "sec-1",
    sectionName: "Technical SEO & Schema",
    difficulty: "MEDIUM",
    marks: 2.0,
    penalty: 0.0,
    text: "Which link attribute should be applied to affiliate and sponsored referral hyperlinks according to Google Search Central guidelines?",
    options: [
      { id: "A", text: "rel='sponsored' (or rel='nofollow sponsored')" },
      { id: "B", text: "rel='ugc'" },
      { id: "C", text: "rel='author'" },
      { id: "D", text: "rel='external-trusted'" },
    ],
    correctAnswer: "A",
    explanation:
      "Google mandates rel='sponsored' for commercial/affiliate compensation links to avoid link-scheme manual actions.",
  },
  {
    id: 15,
    sectionId: "sec-1",
    sectionName: "Technical SEO & Schema",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.0,
    text: "Under the Helpful Content System (HCS) component of Google's core ranking algorithm, how does sitewide low-quality content affect high-quality, original pages on the same domain?",
    options: [
      {
        id: "A",
        text: "HCS evaluates pages exclusively in isolation; there is zero sitewide signal spillover.",
      },
      {
        id: "B",
        text: "HCS applies a sitewide classifier signal that dampens organic rankings for the entire domain, including superior pages, until unhelpful content is pruned.",
      },
      {
        id: "C",
        text: "It causes an immediate manual penalty in Google Search Console.",
      },
      {
        id: "D",
        text: "It merely lowers Google Ads Quality Score by 1 point.",
      },
    ],
    correctAnswer: "B",
    explanation:
      "Google HCS is primarily a sitewide classifier: substantial unhelpful content drags down the ranking capability of otherwise quality pages.",
  },

  // ---------------- DOMAIN 2: Google Ads & Smart Bidding (Q16 - Q30) ----------------
  {
    id: 16,
    sectionId: "sec-2",
    sectionName: "Google Ads & Bidding",
    difficulty: "CRITICAL",
    marks: 2.0,
    penalty: 0.0,
    text: "A campaign running on Target ROAS (tROAS) bidding has a target of 450%. If conversion tracking drops 40% of conversion values due to an iOS consent banner script failure, what will the Smart Bidding algorithm do over the subsequent 7 days?",
    options: [
      {
        id: "A",
        text: "It will increase bids aggressively to capture more volume.",
      },
      {
        id: "B",
        text: "It perceives that actual ROAS has plummeted below target, causing it to sharply suppress bids and throttle impression volume to restore target efficiency.",
      },
      {
        id: "C",
        text: "It automatically switches the strategy to Maximize Clicks.",
      },
      { id: "D", text: "It resets the Quality Score of all keywords to 1." },
    ],
    correctAnswer: "B",
    explanation:
      "tROAS algorithms bid down when reported conversion value drops, assuming current traffic is unprofitable relative to the 450% target.",
  },
  {
    id: 17,
    sectionId: "sec-2",
    sectionName: "Google Ads & Bidding",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.0,
    text: "In Google Ads Performance Max (PMax) campaigns, which exclusion mechanism is required to prevent branded search queries from consuming non-branded incremental budget?",
    options: [
      {
        id: "A",
        text: "Adding brand terms to campaign-level negative keyword list directly in standard UI without account list.",
      },
      {
        id: "B",
        text: "Applying an Account-Level Brand Exclusion List or creating a Campaign-Level Brand Exclusion via Campaign Settings.",
      },
      { id: "C", text: "Pausing text assets inside the Asset Group." },
      { id: "D", text: "Lowering Target CPA to ₹50." },
    ],
    correctAnswer: "B",
    explanation:
      "Brand Exclusion lists specifically stop PMax from bidding on brand search terms while maintaining prospecting inventory reach.",
  },
  {
    id: 18,
    sectionId: "sec-2",
    sectionName: "Google Ads & Bidding",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.0,
    text: "An agency manages an account spending ₹25,00,000/month. Ad Rank formula in Google Ads auction is governed by which exact relationship?",
    options: [
      { id: "A", text: "Ad Rank = Max CPC Bid × Quality Score" },
      {
        id: "B",
        text: "Ad Rank = f(Max CPC Bid, Quality Score, Expected CTR, Ad Relevance, Landing Page Experience, and Context & Ad Assets format impact)",
      },
      { id: "C", text: "Ad Rank = Total Account Spend ÷ Competitor Bid" },
      { id: "D", text: "Ad Rank = Historical Conversion Rate × Click Volume" },
    ],
    correctAnswer: "B",
    explanation:
      "Modern Ad Rank incorporates auction-time bid, the components of QS, auction context, and expected impact of ad assets/formats.",
  },
  {
    id: 19,
    sectionId: "sec-2",
    sectionName: "Google Ads & Bidding",
    difficulty: "MEDIUM",
    marks: 2.0,
    penalty: 0.0,
    text: "What is the critical calculation formula for Return On Ad Spend (ROAS)?",
    options: [
      {
        id: "A",
        text: "ROAS = (Total Revenue from Ads ÷ Total Ad Spend) × 100%",
      },
      { id: "B", text: "ROAS = (Net Profit - Ad Spend) ÷ Total Ad Spend" },
      { id: "C", text: "ROAS = (Total Clicks × Average CPC) ÷ Conversions" },
      { id: "D", text: "ROAS = (Lifetime Value ÷ Customer Acquisition Cost)" },
    ],
    correctAnswer: "A",
    explanation:
      "ROAS is gross revenue generated from advertising divided by total advertising cost, expressed as a ratio or percentage.",
  },
  {
    id: 20,
    sectionId: "sec-2",
    sectionName: "Google Ads & Bidding",
    difficulty: "CRITICAL",
    marks: 2.0,
    penalty: 0.0,
    text: "If a keyword with Exact Match [digital marketing courses] receives a search query for 'best digital marketing courses in mumbai', under current Google Ads match type behavior, will the exact match keyword trigger the ad?",
    options: [
      {
        id: "A",
        text: "Yes, exact match now triggers for any phrase that shares semantic topic.",
      },
      {
        id: "B",
        text: "No, because the query adds location and superlative modifiers that change the specific intent, matching Phrase or Broad match instead unless close variant intent matches exactly.",
      },
      {
        id: "C",
        text: "Yes, exact match functions identically to broad match since 2022.",
      },
      {
        id: "D",
        text: "No, exact match only triggers if punctuation is included in search.",
      },
    ],
    correctAnswer: "B",
    explanation:
      "Exact match matches identical meaning or close variants. Substantial qualifiers like 'best' and 'in mumbai' differ in syntactic specificity.",
  },
  {
    id: 21,
    sectionId: "sec-2",
    sectionName: "Google Ads & Bidding",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.0,
    text: "What is the primary function of Google Ads Enhanced Conversions for Web?",
    options: [
      {
        id: "A",
        text: "To generate AI ad copy automatically based on landing page text.",
      },
      {
        id: "B",
        text: "To send hashed first-party customer data (SHA-256 email/phone) at the conversion point to recover lost conversions caused by third-party cookie restrictions.",
      },
      { id: "C", text: "To increase daily budget by 20% on weekends." },
      { id: "D", text: "To bid exclusively on Google Display Network." },
    ],
    correctAnswer: "B",
    explanation:
      "Enhanced Conversions hashes user data securely to match with signed-in Google accounts, repairing cross-device attribution gaps.",
  },
  {
    id: 22,
    sectionId: "sec-2",
    sectionName: "Google Ads & Bidding",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.0,
    text: "A B2B SaaS company has a 90-day sales cycle. Which conversion attribution lookback window configuration is most appropriate to ensure Smart Bidding assigns value to top-of-funnel discovery campaigns?",
    options: [
      { id: "A", text: "7-day click-through, 1-day view-through" },
      {
        id: "B",
        text: "90-day click-through lookback window using Data-Driven Attribution (DDA)",
      },
      { id: "C", text: "30-day Last Click attribution" },
      { id: "D", text: "1-day engaged view" },
    ],
    correctAnswer: "B",
    explanation:
      "A 90-day window matches the sales cycle and DDA distributes fractional credit across touchpoints, preventing top-of-funnel starvation.",
  },
  {
    id: 23,
    sectionId: "sec-2",
    sectionName: "Google Ads & Bidding",
    difficulty: "MEDIUM",
    marks: 2.0,
    penalty: 0.0,
    text: "When should you apply a Bid Adjustment in a Google Ads campaign operating under 'Maximize Conversions with Target CPA'?",
    options: [
      {
        id: "A",
        text: "Device bid adjustments will modify the Target CPA target itself rather than raw bids (except -100% which disables device).",
      },
      {
        id: "B",
        text: "Bid adjustments are completely ignored in Target CPA and have zero effect.",
      },
      {
        id: "C",
        text: "Target CPA will automatically multiply budgets by the adjustment factor.",
      },
      { id: "D", text: "Adjustments only function on Search Partners." },
    ],
    correctAnswer: "A",
    explanation:
      "In Target CPA, device adjustments modify the CPA target (e.g. +20% adjustment turns a ₹500 CPA into ₹600 CPA target for that device). -100% shuts it off.",
  },
  {
    id: 24,
    sectionId: "sec-2",
    sectionName: "Google Ads & Bidding",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.0,
    text: "What occurs when an advertiser enables 'Final URL Expansion' inside a Performance Max campaign without URL exclusions?",
    options: [
      {
        id: "A",
        text: "Google will only send traffic to the exact Final URL specified in the asset group.",
      },
      {
        id: "B",
        text: "Google replaces the Final URL with more relevant landing pages on your domain based on user search query and generates dynamic headlines.",
      },
      { id: "C", text: "The campaign expands to competitors' websites." },
      { id: "D", text: "It converts search ads into YouTube shorts ads." },
    ],
    correctAnswer: "B",
    explanation:
      "Final URL Expansion functions like Dynamic Search Ads: it directs traffic to relevant content across your whole site unless explicitly excluded.",
  },
  {
    id: 25,
    sectionId: "sec-2",
    sectionName: "Google Ads & Bidding",
    difficulty: "MEDIUM",
    marks: 2.0,
    penalty: 0.0,
    text: "What is the consequence of changing a campaign's daily budget from ₹2,000 to ₹10,000 in a single edit while in the Smart Bidding learning phase?",
    options: [
      {
        id: "A",
        text: "The bid strategy remains completely stable without restarting learning.",
      },
      {
        id: "B",
        text: "It triggers a substantial bid-strategy reset, causing auction volatility and potential performance degradation as models recalibrate.",
      },
      {
        id: "C",
        text: "Google Ads rejects any budget increase greater than 50%.",
      },
      {
        id: "D",
        text: "The account is suspended for suspicious billing activity.",
      },
    ],
    correctAnswer: "B",
    explanation:
      "Budget changes greater than 20-30% shock the bidding algorithm and restart the machine learning calibration window.",
  },
  {
    id: 26,
    sectionId: "sec-2",
    sectionName: "Google Ads & Bidding",
    difficulty: "CRITICAL",
    marks: 2.0,
    penalty: 0.0,
    text: "An e-commerce store with 2,000 products experiences high ad spend on low-margin clearance items in PMax. What Merchant Center custom label architecture solves this?",
    options: [
      {
        id: "A",
        text: "Use Custom Label 0 to tag margin tiers (High, Medium, Low) and segment PMax campaigns by profit margin.",
      },
      {
        id: "B",
        text: "Delete low-margin items from the product feed completely.",
      },
      { id: "C", text: "Set price equal to ₹0 in Merchant Center." },
      { id: "D", text: "Lower product shipping weights to alter ad delivery." },
    ],
    correctAnswer: "A",
    explanation:
      "Custom labels allow filtering and campaign segmentation based on profit margins, enabling aggressive bidding on high-margin inventory.",
  },
  {
    id: 27,
    sectionId: "sec-2",
    sectionName: "Google Ads & Bidding",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.0,
    text: "In Google Ads auction insights, what does 'Outranking Share' represent?",
    options: [
      {
        id: "A",
        text: "The percentage of times your ad ranked higher than another competitor's ad in the auction, or showed when theirs did not.",
      },
      {
        id: "B",
        text: "The percentage of auctions where you bid more money than your competitor.",
      },
      { id: "C", text: "The market share of total industry clicks." },
      { id: "D", text: "The total number of impressions won on YouTube." },
    ],
    correctAnswer: "A",
    explanation:
      "Outranking share indicates how often your ad appeared higher in auction or appeared when the competitor's ad failed to enter the auction.",
  },
  {
    id: 28,
    sectionId: "sec-2",
    sectionName: "Google Ads & Bidding",
    difficulty: "MEDIUM",
    marks: 2.0,
    penalty: 0.0,
    text: "What is the maximum number of Responsive Search Ad (RSA) pinned headlines recommended by Google when testing ad strength?",
    options: [
      { id: "A", text: "Pin all 15 headlines to position 1." },
      {
        id: "B",
        text: "Unpinned is recommended for maximum combinatorial machine learning optimization; pin sparingly only for strict legal/compliance requirements.",
      },
      { id: "C", text: "Exactly 10 pins are mandatory." },
      { id: "D", text: "RSAs do not support pinning." },
    ],
    correctAnswer: "B",
    explanation:
      "Over-pinning restricts the algorithm's ability to test combinations for individual query intent, lowering Ad Strength and reach.",
  },
  {
    id: 29,
    sectionId: "sec-2",
    sectionName: "Google Ads & Bidding",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.0,
    text: "How does Google Consent Mode v2 impact ad targeting for European Economic Area (EEA) users if 'ad_user_data' is set to 'denied'?",
    options: [
      {
        id: "A",
        text: "User data cannot be sent to Google for advertising purposes, disabling remarketing audience list creation and customer match targeting for that user.",
      },
      { id: "B", text: "Ads are completely blocked from showing on Google." },
      { id: "C", text: "The website domain is de-indexed from Google Search." },
      { id: "D", text: "All bids are doubled automatically." },
    ],
    correctAnswer: "A",
    explanation:
      "Consent Mode v2 enforces 'ad_user_data' and 'ad_personalization'. If denied, personal data cannot power audience lists or personalized ads.",
  },
  {
    id: 30,
    sectionId: "sec-2",
    sectionName: "Google Ads & Bidding",
    difficulty: "CRITICAL",
    marks: 2.0,
    penalty: 0.0,
    text: "If Campaign A has a Daily Budget of ₹5,000, what is the maximum amount Google Ads can charge on any single calendar day due to dynamic overdelivery?",
    options: [
      { id: "A", text: "Exactly ₹5,000" },
      {
        id: "B",
        text: "Up to 2x the daily budget (₹10,000), capped at 30.4x the daily budget across a full calendar month billing cycle.",
      },
      { id: "C", text: "Unlimited until credit card threshold is reached" },
      { id: "D", text: "Up to 1.2x (₹6,000)" },
    ],
    correctAnswer: "B",
    explanation:
      "Google Ads can spend up to 2x daily budget on high-traffic days, but will never exceed monthly charging limit of 30.4 × Daily Budget.",
  },

  // ---------------- DOMAIN 3: GA4 & BigQuery Analytics (Q31 - Q45) ----------------
  {
    id: 31,
    sectionId: "sec-3",
    sectionName: "GA4, BigQuery & Attribution",
    difficulty: "CRITICAL",
    marks: 2.0,
    penalty: 0.0,
    text: "In Google Analytics 4 (GA4), how is a 'Session' technically instantiated compared to Universal Analytics (UA)?",
    options: [
      {
        id: "A",
        text: "Through a hit-type 'pageview' that resets automatically at midnight regardless of activity.",
      },
      {
        id: "B",
        text: "Via the 'session_start' event triggered when a user engages the app/site, generating a 'ga_session_id' parameter that persists until 30 minutes of inactivity (no midnight reset).",
      },
      {
        id: "C",
        text: "Sessions are calculated only on the server after 24 hours.",
      },
      { id: "D", text: "By tracking browser cookie expiration exclusively." },
    ],
    correctAnswer: "B",
    explanation:
      "GA4 sessions are event-driven: 'session_start' creates a timestamped 'ga_session_id'. Unlike UA, sessions do NOT reset at midnight.",
  },
  {
    id: 32,
    sectionId: "sec-3",
    sectionName: "GA4, BigQuery & Attribution",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.0,
    text: "When exporting raw GA4 events to Google BigQuery, what BigQuery SQL function un-nests repeated event parameters like 'page_location' from the RECORD schema?",
    options: [
      { id: "A", text: "FLATTEN(event_params)" },
      {
        id: "B",
        text: "CROSS JOIN UNNEST(event_params) AS ep WHERE ep.key = 'page_location'",
      },
      { id: "C", text: "SPLIT(event_params, ',')" },
      { id: "D", text: "GROUP BY event_params.page_location" },
    ],
    correctAnswer: "B",
    explanation:
      "GA4 event parameters are stored as repeated STRUCT arrays. 'UNNEST(event_params)' is mandatory in BigQuery SQL to extract keys and values.",
  },
  {
    id: 33,
    sectionId: "sec-3",
    sectionName: "GA4, BigQuery & Attribution",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.0,
    text: "What criteria defines an 'Engaged Session' in standard GA4 reporting?",
    options: [
      {
        id: "A",
        text: "A session lasting > 10 seconds, OR containing 2 or more page/screen views, OR having 1 or more key events (conversions).",
      },
      { id: "B", text: "A session where user clicked at least 5 links." },
      { id: "C", text: "A session where user submitted a payment form." },
      { id: "D", text: "Any session from a desktop computer." },
    ],
    correctAnswer: "A",
    explanation:
      "GA4 defines engaged session by: duration >= 10s (configurable to 60s), OR 2+ pageviews, OR at least 1 conversion event.",
  },
  {
    id: 34,
    sectionId: "sec-3",
    sectionName: "GA4, BigQuery & Attribution",
    difficulty: "MEDIUM",
    marks: 2.0,
    penalty: 0.0,
    text: "What is the consequence of 'Thresholding' applied in standard GA4 exploration reports?",
    options: [
      { id: "A", text: "Reports delete data older than 2 months permanently." },
      {
        id: "B",
        text: "Data is withheld from reports when user counts are low to prevent inferring the individual identity of users when Google Signals is enabled.",
      },
      {
        id: "C",
        text: "The daily quota of BigQuery export has been exceeded.",
      },
      { id: "D", text: "The account has received a copyright strike." },
    ],
    correctAnswer: "B",
    explanation:
      "Google Signals thresholding hides low-cardinality rows to prevent reverse-engineering individual user identities.",
  },
  {
    id: 35,
    sectionId: "sec-3",
    sectionName: "GA4, BigQuery & Attribution",
    difficulty: "CRITICAL",
    marks: 2.0,
    penalty: 0.0,
    text: "Which User-ID feature requirement is mandatory in GA4 to ensure cross-platform deterministic tracking across mobile app and web?",
    options: [
      {
        id: "A",
        text: "User-ID must contain plaintext email addresses for Google validation.",
      },
      {
        id: "B",
        text: "Reporting Identity must be set to 'Blended' (or 'Observed') and custom alphanumeric non-PII identifiers assigned upon authentication.",
      },
      { id: "C", text: "Device ID must be permanently disabled." },
      { id: "D", text: "BigQuery must be connected to Firebase exclusively." },
    ],
    correctAnswer: "B",
    explanation:
      "Reporting identity must evaluate User-ID first (Blended/Observed). Never send PII like raw emails into GA4 as it violates terms of service.",
  },
  {
    id: 36,
    sectionId: "sec-3",
    sectionName: "GA4, BigQuery & Attribution",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.0,
    text: "In Google Tag Manager (GTM) Server-Side Tagging, what primary security and tracking advantage does routing requests through a custom first-party subdomain (e.g. data.company.com) provide?",
    options: [
      {
        id: "A",
        text: "It bypasses all international privacy legislation automatically.",
      },
      {
        id: "B",
        text: "It sets cookies in a first-party context mitigating Safari ITP 7-day deletion limits and masks user IP addresses before forwarding to third parties.",
      },
      { id: "C", text: "It increases web server CPU speeds by 80%." },
      { id: "D", text: "It eliminates the need for an SSL certificate." },
    ],
    correctAnswer: "B",
    explanation:
      "Server-side tagging on a first-party subdomain writes true first-party cookies, shields internal client data, and curbs ITP truncation.",
  },
  {
    id: 37,
    sectionId: "sec-3",
    sectionName: "GA4, BigQuery & Attribution",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.0,
    text: "What is the maximum event parameter character length for parameter names and parameter values in standard GA4 web properties?",
    options: [
      {
        id: "A",
        text: "Parameter names: 40 characters; Parameter values: 100 characters",
      },
      {
        id: "B",
        text: "Parameter names: 200 characters; Parameter values: 500 characters",
      },
      { id: "C", text: "Unlimited characters for all properties" },
      { id: "D", text: "10 characters for names and 20 for values" },
    ],
    correctAnswer: "A",
    explanation:
      "GA4 enforces a 40-character limit for event parameter names and 100 characters for parameter values.",
  },
  {
    id: 38,
    sectionId: "sec-3",
    sectionName: "GA4, BigQuery & Attribution",
    difficulty: "MEDIUM",
    marks: 2.0,
    penalty: 0.0,
    text: "How does the 'Measurement Protocol' in GA4 send offline conversions (e.g., in-store POS transactions) into existing web customer journeys?",
    options: [
      {
        id: "A",
        text: "By transmitting an HTTP POST request to 'https://www.google-analytics.com/mp/collect' including api_secret, firebase_app_id or measurement_id, and matching client_id or user_id.",
      },
      {
        id: "B",
        text: "By uploading an Excel file via FTP once every quarter.",
      },
      {
        id: "C",
        text: "Through an automatic Bluetooth beacon scan in browser.",
      },
      { id: "D", text: "By creating a duplicate GA4 property." },
    ],
    correctAnswer: "A",
    explanation:
      "GA4 Measurement Protocol relies on authenticated POST payloads containing client_id/user_id to stitch offline events into user paths.",
  },
  {
    id: 39,
    sectionId: "sec-3",
    sectionName: "GA4, BigQuery & Attribution",
    difficulty: "CRITICAL",
    marks: 2.0,
    penalty: 0.0,
    text: "What is the default data retention period for user and event-level exploratory reports in free GA4 properties, and what is the maximum configurable setting?",
    options: [
      { id: "A", text: "Default is 2 months; maximum is 14 months" },
      { id: "B", text: "Default is 12 months; maximum is 50 years" },
      { id: "C", text: "Default is 24 hours; maximum is 30 days" },
      { id: "D", text: "Data is retained perpetually with no limits" },
    ],
    correctAnswer: "A",
    explanation:
      "Standard GA4 properties default to 2 months retention for exploratory reports and must be manually extended to the 14-month ceiling.",
  },
  {
    id: 40,
    sectionId: "sec-3",
    sectionName: "GA4, BigQuery & Attribution",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.0,
    text: "A web property experiences a 50% discrepancy between GA4 Conversions and backend CRM paid orders. Which root cause represents client-side tracking failure?",
    options: [
      {
        id: "A",
        text: "Payment gateway redirection to thank-you page dropped due to users closing tab before redirect, alongside ad-blockers preventing GTM firing.",
      },
      { id: "B", text: "BigQuery timezone mismatch." },
      { id: "C", text: "Server-to-server API latency." },
      { id: "D", text: "CRM database index corruption." },
    ],
    correctAnswer: "A",
    explanation:
      "Client-side tracking loses transactions when users leave the 3rd-party payment gateway before returning, or if ad-blockers suppress the script.",
  },
  {
    id: 41,
    sectionId: "sec-3",
    sectionName: "GA4, BigQuery & Attribution",
    difficulty: "MEDIUM",
    marks: 2.0,
    penalty: 0.0,
    text: "Which default channel group in GA4 classifies traffic tagged with 'utm_source=facebook&utm_medium=paid'?",
    options: [
      { id: "A", text: "Paid Social" },
      { id: "B", text: "Organic Social" },
      { id: "C", text: "Paid Search" },
      { id: "D", text: "Referral" },
    ],
    correctAnswer: "A",
    explanation:
      "GA4 channel rules categorize recognized social sources with medium containing 'paid', 'cpc', or 'ppc' as 'Paid Social'.",
  },
  {
    id: 42,
    sectionId: "sec-3",
    sectionName: "GA4, BigQuery & Attribution",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.0,
    text: "What is the critical distinction between 'First User Source/Medium' and 'Session Source/Medium' dimensions in GA4?",
    options: [
      {
        id: "A",
        text: "'First User' captures the initial acquisition source when the user was first discovered, while 'Session' reports the specific source that triggered the current session.",
      },
      { id: "B", text: "They are completely identical synonyms." },
      { id: "C", text: "'First User' only works on mobile devices." },
      { id: "D", text: "'Session' only tracks paid ads traffic." },
    ],
    correctAnswer: "A",
    explanation:
      "First User is user-scoped (lifetime acquisition touchpoint), whereas Session is session-scoped (touchpoint initiating the specific visit).",
  },
  {
    id: 43,
    sectionId: "sec-3",
    sectionName: "GA4, BigQuery & Attribution",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.0,
    text: "In GA4, how can you track file downloads (.pdf, .xlsx) without writing custom JavaScript code in Google Tag Manager?",
    options: [
      {
        id: "A",
        text: "Enable 'Enhanced Measurement' in Data Stream settings which automatically records the 'file_download' event with extension parameters.",
      },
      {
        id: "B",
        text: "Downloads cannot be tracked without server-side webhooks.",
      },
      {
        id: "C",
        text: "File downloads are tracked as purchase events by default.",
      },
      { id: "D", text: "Configure a custom BigQuery partition." },
    ],
    correctAnswer: "A",
    explanation:
      "GA4 Enhanced Measurement includes automated click, scroll, outbound click, site search, video, and file_download capture out-of-the-box.",
  },
  {
    id: 44,
    sectionId: "sec-3",
    sectionName: "GA4, BigQuery & Attribution",
    difficulty: "CRITICAL",
    marks: 2.0,
    penalty: 0.0,
    text: "What calculation generates the Customer Acquisition Cost (CAC) for an omnichannel digital marketing campaign?",
    options: [
      {
        id: "A",
        text: "CAC = (Total Sales & Marketing Costs over period) ÷ (Number of New Customers Acquired over same period)",
      },
      { id: "B", text: "CAC = Gross Revenue ÷ Total Clicks" },
      { id: "C", text: "CAC = Average Order Value × Repeat Purchase Rate" },
      { id: "D", text: "CAC = Ad Spend ÷ Total Website Pageviews" },
    ],
    correctAnswer: "A",
    explanation:
      "CAC encompasses all marketing and sales expenditures divided by the volume of net-new customers brought in.",
  },
  {
    id: 45,
    sectionId: "sec-3",
    sectionName: "GA4, BigQuery & Attribution",
    difficulty: "MEDIUM",
    marks: 2.0,
    penalty: 0.0,
    text: "Which attribution model distributes fractional credit algorithmically based on user journey machine learning rather than fixed rule weights in GA4?",
    options: [
      { id: "A", text: "Data-Driven Attribution (DDA)" },
      { id: "B", text: "Linear Attribution" },
      { id: "C", text: "First Click Attribution" },
      { id: "D", text: "Time Decay Attribution" },
    ],
    correctAnswer: "A",
    explanation:
      "Data-Driven Attribution calculates real conversion likelihood models across converting vs. non-converting touchpoint sequences.",
  },

  // ---------------- DOMAIN 4: Performance Funnels & Crisis ORM (Q46 - Q60) ----------------
  {
    id: 46,
    sectionId: "sec-4",
    sectionName: "Funnels & Crisis Strategy",
    difficulty: "CRITICAL",
    marks: 2.0,
    penalty: 0.0,
    text: "A brand faces a coordinated viral misinformation attack on Reddit and YouTube. What is the immediate first-response protocol in Online Reputation Management (ORM)?",
    options: [
      {
        id: "A",
        text: "Aggressively delete all negative comments and threaten legal action in the comments section.",
      },
      {
        id: "B",
        text: "Execute an ORM triage matrix: establish dedicated monitoring war-room, verify facts, issue a calm transparent statement on owned verified channels, and avoid feeding algorithm engagement on troll threads.",
      },
      { id: "C", text: "Shut down the company website for 72 hours." },
      { id: "D", text: "Buy 10,000 bot accounts to downvote the posts." },
    ],
    correctAnswer: "B",
    explanation:
      "Deleting comments causes the 'Streisand Effect'. Professional ORM relies on verified triage, rapid owned response, and algorithmic containment.",
  },
  {
    id: 47,
    sectionId: "sec-4",
    sectionName: "Funnels & Crisis Strategy",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.0,
    text: "A SaaS marketing funnel has 100,000 visits, 5,000 lead magnet downloads, 400 product demo bookings, and 40 closed enterprise deals. What is the overall visitor-to-customer conversion rate, and what is the demo-to-close rate?",
    options: [
      { id: "A", text: "Visitor-to-Customer: 0.04%; Demo-to-Close: 10.0%" },
      { id: "B", text: "Visitor-to-Customer: 0.4%; Demo-to-Close: 5.0%" },
      { id: "C", text: "Visitor-to-Customer: 4.0%; Demo-to-Close: 25.0%" },
      { id: "D", text: "Visitor-to-Customer: 0.004%; Demo-to-Close: 1.0%" },
    ],
    correctAnswer: "A",
    explanation:
      "Visitor to customer: 40 ÷ 100,000 = 0.0004 = 0.04%. Demo to close: 40 ÷ 400 = 0.10 = 10.0%.",
  },
  {
    id: 48,
    sectionId: "sec-4",
    sectionName: "Funnels & Crisis Strategy",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.0,
    text: "What technical methodology suppresses defamatory negative search results on Page 1 of Google when legal removal (DMCA/Defamation) is denied?",
    options: [
      {
        id: "A",
        text: "Reverse SEO: Building and optimizing high-authority positive microsites, press releases, LinkedIn, Medium, and social assets to systematically outrank and push negative URLs to Page 2+.",
      },
      {
        id: "B",
        text: "Conducting a Distributed Denial of Service (DDoS) on the hosting server.",
      },
      {
        id: "C",
        text: "Creating 5,000 spam backlink blog comments pointing to the defamatory URL.",
      },
      {
        id: "D",
        text: "Submitting continuous false 404 removal requests in Google Search Console.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "Reverse SEO creates an authoritative barrier of high-ranking owned and earned assets that monopolize Page 1 real estate.",
  },
  {
    id: 49,
    sectionId: "sec-4",
    sectionName: "Funnels & Crisis Strategy",
    difficulty: "CRITICAL",
    marks: 2.0,
    penalty: 0.0,
    text: "In high-ticket lead generation funnels, what is the impact of introducing SMS Two-Factor verification before form submission on Cost Per Lead (CPL) and Lead Quality?",
    options: [
      {
        id: "A",
        text: "CPL will increase due to friction, but Sales Qualified Lead (SQL) conversion rate and contactability will rise dramatically, often reducing overall CAC.",
      },
      {
        id: "B",
        text: "CPL will drop to zero and form completions will triple.",
      },
      {
        id: "C",
        text: "Lead quality will drop because authentic users refuse SMS verification.",
      },
      { id: "D", text: "Google Ads will disable conversion tracking." },
    ],
    correctAnswer: "A",
    explanation:
      "Adding friction filters out junk/bot leads. While raw CPL increases, sales efficiency and closed-won velocity increase, lowering CAC.",
  },
  {
    id: 50,
    sectionId: "sec-4",
    sectionName: "Funnels & Crisis Strategy",
    difficulty: "MEDIUM",
    marks: 2.0,
    penalty: 0.0,
    text: "What is the industry formula for Customer Lifetime Value (CLV or LTV) in a subscription e-commerce business?",
    options: [
      {
        id: "A",
        text: "LTV = (Average Order Value × Purchase Frequency) ÷ Churn Rate",
      },
      { id: "B", text: "LTV = Total Revenue ÷ Total Staff Payroll" },
      { id: "C", text: "LTV = Ad Spend × ROAS" },
      { id: "D", text: "LTV = Initial Purchase Price × 12 months" },
    ],
    correctAnswer: "A",
    explanation:
      "LTV measures revenue per period (AOV × frequency) divided by the churn rate (1 / customer lifespan).",
  },
  {
    id: 51,
    sectionId: "sec-4",
    sectionName: "Funnels & Crisis Strategy",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.0,
    text: "When conducting A/B split testing on a critical landing page, what statistical concept determines that variation B's outperformance is not random variance?",
    options: [
      {
        id: "A",
        text: "Statistical Significance (typically p-value < 0.05 / 95% Confidence Level) with sufficient sample size.",
      },
      {
        id: "B",
        text: "Testing for at least 24 hours regardless of conversions.",
      },
      {
        id: "C",
        text: "Checking if variation B has a higher click count than 100.",
      },
      { id: "D", text: "Using internal office staff to vote on preferred UI." },
    ],
    correctAnswer: "A",
    explanation:
      "A/B testing requires statistical significance (p < 0.05) to ensure results are mathematically reliable and not noise.",
  },
  {
    id: 52,
    sectionId: "sec-4",
    sectionName: "Funnels & Crisis Strategy",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.0,
    text: "What is 'Churn Rate' and how does an increase in churn from 3% to 8% monthly affect a SaaS company's cash flow resilience?",
    options: [
      {
        id: "A",
        text: "Churn is the rate of lost customers; an 8% monthly churn compounds to losing over 60% of existing customer base annually, creating an unsustainable acquisition treadmill.",
      },
      { id: "B", text: "Churn measures server downtime in seconds." },
      { id: "C", text: "Higher churn increases investor valuation." },
      { id: "D", text: "Churn rate has no impact on subscription businesses." },
    ],
    correctAnswer: "A",
    explanation:
      "8% monthly churn erodes recurring revenue aggressively (compounding to >63% annualized loss), requiring extreme acquisition volume just to remain flat.",
  },
  {
    id: 53,
    sectionId: "sec-4",
    sectionName: "Funnels & Crisis Strategy",
    difficulty: "MEDIUM",
    marks: 2.0,
    penalty: 0.0,
    text: "Which email deliverability protocol cryptographic header authenticates the sender domain against spoofing and phishing attacks?",
    options: [
      { id: "A", text: "DMARC, DKIM, and SPF" },
      { id: "B", text: "HTTPS and SSL only" },
      { id: "C", text: "HTML5 and CSS3" },
      { id: "D", text: "FTP and SSH" },
    ],
    correctAnswer: "A",
    explanation:
      "SPF, DKIM cryptographic keys, and DMARC enforcement policies form the triad required for mailbox provider deliverability.",
  },
  {
    id: 54,
    sectionId: "sec-4",
    sectionName: "Funnels & Crisis Strategy",
    difficulty: "CRITICAL",
    marks: 2.0,
    penalty: 0.0,
    text: "An influencer marketing contract stipulates performance-based compensation. What key clause protects the brand from paid follower/engagement pod fraud?",
    options: [
      {
        id: "A",
        text: "Right to audit audience authenticity metrics via third-party analytics and compensation clawback for synthetic/bot engagement.",
      },
      {
        id: "B",
        text: "Requiring the influencer to post between 9 AM and 10 AM.",
      },
      { id: "C", text: "Paying 100% upfront in cryptocurrency." },
      { id: "D", text: "Prohibiting comments on sponsored reels." },
    ],
    correctAnswer: "A",
    explanation:
      "Audit clauses with third-party verification safeguards brands against synthetic bot traffic and engagement pod manipulation.",
  },
  {
    id: 55,
    sectionId: "sec-4",
    sectionName: "Funnels & Crisis Strategy",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.0,
    text: "What is the optimal LTV:CAC ratio benchmark for high-growth, venture-backed digital businesses?",
    options: [
      {
        id: "A",
        text: "3:1 to 4:1 (LTV is 3 to 4 times the acquisition cost)",
      },
      { id: "B", text: "1:1 (breaking even on every customer lifetime)" },
      { id: "C", text: "0.2:1 (losing ₹5 for every ₹1 acquired)" },
      { id: "D", text: "50:1 (suggesting under-investment in growth)" },
    ],
    correctAnswer: "A",
    explanation:
      "3:1 is the gold standard of healthy unit economics. Less than 1:1 is unsustainable, and over 5:1 indicates under-investing in acquisition capacity.",
  },
  {
    id: 56,
    sectionId: "sec-4",
    sectionName: "Funnels & Crisis Strategy",
    difficulty: "MEDIUM",
    marks: 2.0,
    penalty: 0.0,
    text: "Which landing page element has the highest correlation with reducing shopping cart abandonment during checkout?",
    options: [
      {
        id: "A",
        text: "Transparent pricing with upfront shipping & taxes, guest checkout option, and multiple trusted payment gateways.",
      },
      {
        id: "B",
        text: "Hiding shipping costs until the final credit card step.",
      },
      {
        id: "C",
        text: "Requiring a 12-character alphanumeric password before cart viewing.",
      },
      { id: "D", text: "Adding auto-playing audio promotional videos." },
    ],
    correctAnswer: "A",
    explanation:
      "Unexpected fees and mandatory account creation are the top 2 reasons for cart abandonment across digital commerce.",
  },
  {
    id: 57,
    sectionId: "sec-4",
    sectionName: "Funnels & Crisis Strategy",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.0,
    text: "What is 'Dark Social' in attribution modeling and how does it distort web analytics reports?",
    options: [
      {
        id: "A",
        text: "Traffic arriving from private messaging apps (WhatsApp, Slack, Telegram, email) where referral headers are stripped, erroneously classified as 'Direct'.",
      },
      { id: "B", text: "Illegal hacking forums selling ad inventory." },
      {
        id: "C",
        text: "Browsing activity conducted exclusively in incognito mode.",
      },
      { id: "D", text: "Blacklisted IP ranges from proxy networks." },
    ],
    correctAnswer: "A",
    explanation:
      "Dark social occurs when links shared in closed chat environments lack HTTP referrers, artificially inflating Direct traffic metrics.",
  },
  {
    id: 58,
    sectionId: "sec-4",
    sectionName: "Funnels & Crisis Strategy",
    difficulty: "CRITICAL",
    marks: 2.0,
    penalty: 0.0,
    text: "If an enterprise client initiates a chargeback dispute on payment gateway, what digital trail is essential for seller dispute resolution?",
    options: [
      {
        id: "A",
        text: "Timestamped IP logs, signed terms of service acknowledgment, delivery confirmation, and communication trail.",
      },
      { id: "B", text: "A copy of the company logo." },
      { id: "C", text: "The client's LinkedIn profile URL." },
      { id: "D", text: "A phone call recording without consent." },
    ],
    correctAnswer: "A",
    explanation:
      "Payment gateways require immutable compelling evidence: IP logs, signed contract/terms timestamp, and proof of service delivery.",
  },
  {
    id: 59,
    sectionId: "sec-4",
    sectionName: "Funnels & Crisis Strategy",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.0,
    text: "What viral loop coefficient ($K$-factor) is required for a product or referral program to achieve exponential viral self-sustainability without paid advertising?",
    options: [
      {
        id: "A",
        text: "$K > 1.0$ (Each new user successfully brings in more than 1 additional user)",
      },
      { id: "B", text: "$K = 0.5$" },
      { id: "C", text: "$K < 0.1$" },
      { id: "D", text: "$K = 0.0$" },
    ],
    correctAnswer: "A",
    explanation:
      "Viral coefficient K must be strictly greater than 1.0 for viral growth to compound exponentially on its own.",
  },
  {
    id: 60,
    sectionId: "sec-4",
    sectionName: "Funnels & Crisis Strategy",
    difficulty: "CRITICAL",
    marks: 2.0,
    penalty: 0.0,
    text: "Under strict regulatory guidelines (e.g. India DPDP Act / EU GDPR), what legal obligation arises within 72 hours of a customer personal data breach?",
    options: [
      {
        id: "A",
        text: "Mandatory formal notification to the Data Protection Board/Supervisory Authority and affected data principals if high risk exists.",
      },
      {
        id: "B",
        text: "Silently patching the vulnerability without notifying anyone.",
      },
      {
        id: "C",
        text: "Offering a 10% discount voucher to all website visitors.",
      },
      { id: "D", text: "Deleting all server backup databases." },
    ],
    correctAnswer: "A",
    explanation:
      "Modern privacy acts strictly mandate formal authority notification within 72 hours of becoming aware of a serious personal data breach.",
  },
];


export const WORDPRESS_QUESTIONS = [
  {
    id: 101,
    sectionId: "sec-wp",
    sectionName: "WordPress Core & Database",
    difficulty: "CRITICAL",
    marks: 2.0,
    penalty: 0.0,
    text: "An enterprise WooCommerce store with 25,000 products suffers from TTFB latency spikes exceeding 3.5 seconds on uncached cart and checkout pages. Which architectural intervention yields the most definitive reduction in database query bottlenecks?",
    options: [
      { id: "A", text: "Installing an aggressive page-caching plugin to store full HTML copies of /cart and /checkout." },
      { id: "B", text: "Enabling High-Performance Order Storage (HPOS) with custom dedicated tables and Redis Object Cache for persistent transient queries." },
      { id: "C", text: "Increasing PHP memory limit to 4096MB without modifying the wp_postmeta query patterns." },
      { id: "D", text: "Disabling the WordPress REST API entirely across all store endpoints." }
    ],
    correctAnswer: "B",
    explanation: "HPOS replaces the bloated wp_posts/wp_postmeta tables with dedicated relational order tables, while Redis Object Cache eliminates redundant database read spikes on dynamic checkout operations."
  },
  {
    id: 102,
    sectionId: "sec-wp",
    sectionName: "Web Vitals & Performance",
    difficulty: "HARD",
    marks: 2.0,
    penalty: 0.0,
    text: "Google PageSpeed Insights reports an LCP (Largest Contentful Paint) penalty of 4.2s caused by a full-width hero background image set via Elementor CSS 'background-image'. What is the most effective engineering remedy to achieve sub-1.8s LCP?",
    options: [
      { id: "A", text: "Add 'loading=lazy' attribute to the parent CSS container div." },
      { id: "B", text: "Replace the CSS background-image with a standard <img> element using fetchpriority='high', proper srcset, and modern WebP/AVIF format with explicit dimensions." },
      { id: "C", text: "Convert the image into a base64 encoded string directly in inline CSS." },
      { id: "D", text: "Load the image via an asynchronous JavaScript fetch API call on window.onload." }
    ],
    correctAnswer: "B",
    explanation: "CSS background images are discovered late by the browser crawler. An HTML <img> with fetchpriority='high' and srcset triggers immediate preloading during HTML parsing."
  },
  {
    id: 103,
    sectionId: "sec-wp",
    sectionName: "Web Vitals & Performance",
    difficulty: "CRITICAL",
    marks: 2.0,
    penalty: 0.0,
    text: "When auditing Cumulative Layout Shift (CLS), a mobile page shifts significantly (+0.35) during font rendering when swapping from fallback Arial to Google Font 'Montserrat'. How should this be resolved?",
    options: [
      { id: "A", text: "Remove the font-display property entirely." },
      { id: "B", text: "Self-host the font in WOFF2 format, preload the critical font file, and utilize font-display: optional or adjust size-adjust/ascent-override to match fallback metric dimensions." },
      { id: "C", text: "Force all fonts to render synchronously via @import in the external stylesheet." },
      { id: "D", text: "Set body display to none until document.fonts.ready resolves." }
    ],
    correctAnswer: "B",
    explanation: "Preloading self-hosted WOFF2 and configuring font metrics overrides (size-adjust) prevents visible text reflow and flash of unstyled text, eliminating CLS."
  },
  {
    id: 104,
    sectionId: "sec-wp",
    sectionName: "Architecture & Headless",
    difficulty: "HARD",
    marks: 2.0,
    penalty: 0.0,
    text: "In a decoupled Headless WordPress architecture utilizing Next.js as the front-end consumer, which method ensures real-time page updates on publishing without rebuilding the entire static site?",
    options: [
      { id: "A", text: "Incremental Static Regeneration (ISR) combined with WordPress webhook triggers calling Next.js on-demand revalidation endpoints." },
      { id: "B", text: "Setting Next.js revalidate time to 0 on every page component unconditionally." },
      { id: "C", text: "Triggering a full CI/CD deployment pipeline on every draft save." },
      { id: "D", text: "Using an iframe to embed the WordPress administrative dashboard inside Next.js." }
    ],
    correctAnswer: "A",
    explanation: "On-demand ISR allows Next.js to purge and re-render only the specific updated route when receiving a signed webhook from WordPress upon post save."
  },
  {
    id: 105,
    sectionId: "sec-wp",
    sectionName: "Security & Hardening",
    difficulty: "CRITICAL",
    marks: 2.0,
    penalty: 0.0,
    text: "A production WordPress website undergoes repeated XML-RPC brute-force credential stuffing and pingback amplification DDoS attempts. What is the definitive remediation?",
    options: [
      { id: "A", text: "Change the admin user password to a 20-character string." },
      { id: "B", text: "Block access to xmlrpc.php via Nginx/Apache server rules or Cloudflare WAF, and filter 'xmlrpc_enabled' in code if mobile app sync is unused." },
      { id: "C", text: "Rename the wp-admin directory." },
      { id: "D", text: "Install three different two-factor authentication plugins simultaneously." }
    ],
    correctAnswer: "B",
    explanation: "Blocking xmlrpc.php at the edge/server level terminates unauthenticated multi-call brute-force attacks before they hit the PHP-FPM process pool."
  },
  {
    id: 106,
    sectionId: "sec-wp",
    sectionName: "WordPress Core & Database",
    difficulty: "HARD",
    marks: 2.0,
    penalty: 0.0,
    text: "What happens when the WordPress wp_options table 'autoload' size exceeds 1.5MB?",
    options: [
      { id: "A", text: "WordPress automatically moves autoloaded options to an external Redis cluster." },
      { id: "B", text: "Every single page request loads the entire autoload dataset into PHP memory upon init, causing excessive RAM consumption and TTFB delays." },
      { id: "C", text: "WordPress triggers a 404 header on all taxonomy archive pages." },
      { id: "D", text: "The database automatically purges all plugin options older than 30 days." }
    ],
    correctAnswer: "B",
    explanation: "All rows in wp_options with autoload='yes' are fetched in a single query on every non-cached request. Keeping autoload under 800KB is essential for low TTFB."
  },
  {
    id: 107,
    sectionId: "sec-wp",
    sectionName: "Web Vitals & Performance",
    difficulty: "HARD",
    marks: 2.0,
    penalty: 0.0,
    text: "An agency builds a landing page using Elementor with 14 nested container divs per section, resulting in a DOM depth of 38 levels and 2,400 total DOM nodes. What Core Web Vital is most severely degraded by this DOM bloat?",
    options: [
      { id: "A", text: "Interaction to Next Paint (INP) and Total Blocking Time (TBT) due to recalculate style and layout tree evaluation costs." },
      { id: "B", text: "First Contentful Paint (FCP) only." },
      { id: "C", text: "SSL handshake latency." },
      { id: "D", text: "Server DNS resolution time." }
    ],
    correctAnswer: "A",
    explanation: "Massive DOM size exponentially increases style calculation and layout reflow time on user interactions, leading to poor INP and high main-thread blocking."
  },
  {
    id: 108,
    sectionId: "sec-wp",
    sectionName: "Security & Hardening",
    difficulty: "CRITICAL",
    marks: 2.0,
    penalty: 0.0,
    text: "When implementing custom AJAX actions in WordPress via admin-ajax.php or REST API, which security measure is mandatory to prevent unauthorized Cross-Site Request Forgery (CSRF)?",
    options: [
      { id: "A", text: "Checking current user IP address against an allowlist." },
      { id: "B", text: "Verifying a valid cryptographic Nonce via check_ajax_referer() or wp_verify_nonce() alongside current_user_can() capability checks." },
      { id: "C", text: "Encrypting the payload using base64 encoding." },
      { id: "D", text: "Setting the request method strictly to GET." }
    ],
    correctAnswer: "B",
    explanation: "Nonces protect against CSRF by ensuring the request originated from the authentic user session, while capability checks prevent privilege escalation."
  },
  {
    id: 109,
    sectionId: "sec-wp",
    sectionName: "Theme & Plugin Architecture",
    difficulty: "MEDIUM",
    marks: 2.0,
    penalty: 0.0,
    text: "Why must custom CSS modifications and PHP template overrides always be placed in a Child Theme rather than the Parent Theme?",
    options: [
      { id: "A", text: "Parent themes do not support CSS files." },
      { id: "B", text: "Updating the parent theme will completely overwrite and erase all modifications in parent theme files." },
      { id: "C", text: "Child themes bypass WordPress database queries." },
      { id: "D", text: "Google only indexes websites that have active child themes." }
    ],
    correctAnswer: "B",
    explanation: "Parent theme updates replace all files in the theme folder. Child themes inherit parent functionality while keeping custom overrides secure across updates."
  },
  {
    id: 110,
    sectionId: "sec-wp",
    sectionName: "WordPress Core & Database",
    difficulty: "HARD",
    marks: 2.0,
    penalty: 0.0,
    text: "What is the primary technical difference between 'wp_cron' and a real server-side system cron job (crontab)?",
    options: [
      { id: "A", text: "wp_cron runs every 10 seconds continuously in the background regardless of traffic." },
      { id: "B", text: "wp_cron only executes when a user visits the site, meaning low-traffic sites miss scheduled posts/tasks and high-traffic sites experience redundant task checks." },
      { id: "C", text: "System crontab can only run bash scripts and cannot execute PHP." },
      { id: "D", text: "wp_cron requires root server SSH access to configure." }
    ],
    correctAnswer: "B",
    explanation: "Default wp_cron relies on HTTP page hits. Disabling WP_CRON and invoking wp-cron.php via a real Linux system cron every 5-10 minutes guarantees reliable scheduled tasks."
  },
  {
    id: 111,
    sectionId: "sec-wp",
    sectionName: "Web Vitals & Performance",
    difficulty: "HARD",
    marks: 2.0,
    penalty: 0.0,
    text: "Which caching layer specifically stores compiled database query results in RAM so that repetitive SQL lookups bypass MySQL completely?",
    options: [
      { id: "A", text: "Browser HTTP cache" },
      { id: "B", text: "HTML Page Cache (e.g., WP Rocket, FlyingPress)" },
      { id: "C", text: "Persistent Object Cache (e.g., Redis or Memcached via object-cache.php)" },
      { id: "D", text: "Gzip / Brotli asset compression" }
    ],
    correctAnswer: "C",
    explanation: "Redis/Memcached provides persistent object caching in memory, drastically accelerating complex database-heavy pages like logged-in user accounts and checkout."
  },
  {
    id: 112,
    sectionId: "sec-wp",
    sectionName: "Security & Hardening",
    difficulty: "CRITICAL",
    marks: 2.0,
    penalty: 0.0,
    text: "Which HTTP security header prevents your WordPress website from being embedded inside an <iframe> on external malicious domains, neutralizing Clickjacking exploits?",
    options: [
      { id: "A", text: "Strict-Transport-Security: max-age=31536000" },
      { id: "B", text: "X-Frame-Options: SAMEORIGIN (or Content-Security-Policy: frame-ancestors 'self')" },
      { id: "C", text: "X-Content-Type-Options: nosniff" },
      { id: "D", text: "Referrer-Policy: no-referrer-when-downgrade" }
    ],
    correctAnswer: "B",
    explanation: "X-Frame-Options: SAMEORIGIN and CSP frame-ancestors restrict frame rendering exclusively to the site's own origin, completely blocking Clickjacking attacks."
  },
  {
    id: 113,
    sectionId: "sec-wp",
    sectionName: "Theme & Plugin Architecture",
    difficulty: "HARD",
    marks: 2.0,
    penalty: 0.0,
    text: "When enqueueing scripts in WordPress using wp_enqueue_script(), what is the purpose of passing an array of dependencies like array('jquery') as the third parameter?",
    options: [
      { id: "A", text: "It compresses jQuery before loading." },
      { id: "B", text: "It guarantees that jQuery is registered, loaded, and executed prior to your custom script, preventing 'Uncaught ReferenceError: $ is not defined'." },
      { id: "C", text: "It converts jQuery into vanilla JavaScript." },
      { id: "D", text: "It defers your custom script until after window.onload." }
    ],
    correctAnswer: "B",
    explanation: "The dependency array ensures accurate script load ordering, preventing race conditions where scripts execute before their required libraries are initialized."
  },
  {
    id: 114,
    sectionId: "sec-wp",
    sectionName: "Web Vitals & Performance",
    difficulty: "HARD",
    marks: 2.0,
    penalty: 0.0,
    text: "What is the primary benefit of enabling HTTP/2 or HTTP/3 multiplexing on a WordPress server with numerous CSS and JavaScript assets?",
    options: [
      { id: "A", text: "It eliminates the need for SSL certificates." },
      { id: "B", text: "It allows multiple asset requests and responses to occur concurrently over a single TCP connection, eliminating head-of-line blocking." },
      { id: "C", text: "It automatically rewrites PHP code into Go." },
      { id: "D", text: "It disables browser caching." }
    ],
    correctAnswer: "B",
    explanation: "Multiplexing in HTTP/2 and HTTP/3 eliminates the 6-connection limit per domain in HTTP/1.1, allowing dozens of assets to stream concurrently over one handshake."
  },
  {
    id: 115,
    sectionId: "sec-wp",
    sectionName: "WordPress Core & Database",
    difficulty: "CRITICAL",
    marks: 2.0,
    penalty: 0.0,
    text: "During a major staging-to-production WordPress database migration with domain URL changes (e.g. from staging.domain.com to domain.com), why will a simple SQL 'REPLACE()' query corrupt widget and theme settings?",
    options: [
      { id: "A", text: "MySQL syntax forbids replacing strings with dots." },
      { id: "B", text: "WordPress stores complex theme, widget, and plugin settings as PHP serialized data arrays where string byte-lengths are explicitly recorded; basic string replacement breaks deserialization." },
      { id: "C", text: "The wp-config.php file self-deletes if it detects URL changes." },
      { id: "D", text: "Serialized data cannot be stored in MySQL databases." }
    ],
    correctAnswer: "B",
    explanation: "Serialized strings store length counts (e.g. s:22:'staging.domain.com'). Altering character counts without recalculating serialization offsets corrupts the data. Proper tools like WP-CLI search-replace must be used."
  }
];

const CREATIVE_QUESTIONS = [
  {
    id: 201,
    sectionId: "sec-creative",
    sectionName: "Design Systems & Typography",
    difficulty: "INTERMEDIATE",
    marks: 2.0,
    penalty: 0.0,
    text: "In design system typography architectures, which mathematical type scale ratio is most commonly utilized for modern digital web and mobile interfaces to ensure harmonic visual hierarchy?",
    options: [
      { id: "A", text: "Minor Second (1.067)" },
      { id: "B", text: "Major Third (1.250) or Perfect Fourth (1.333)" },
      { id: "C", text: "Golden Ratio (1.618) exclusively for standard body copy" },
      { id: "D", text: "Random arbitrary pixel values without base-unit constraints" },
    ],
    correctAnswer: "B",
    explanation:
      "Major Third (1.250) and Perfect Fourth (1.333) modular scales provide ideal typographic contrast between body, subheadings, and titles on responsive screens without overly aggressive scaling.",
  },
  {
    id: 202,
    sectionId: "sec-creative",
    sectionName: "Accessibility & WCAG 2.2",
    difficulty: "CRITICAL",
    marks: 2.0,
    penalty: 0.0,
    text: "Under WCAG 2.2 Level AA requirements, what is the minimum contrast ratio mandated between standard body text (< 18pt or < 14pt bold) and its background color?",
    options: [
      { id: "A", text: "3.0:1" },
      { id: "B", text: "4.5:1" },
      { id: "C", text: "7.0:1" },
      { id: "D", text: "2.5:1" },
    ],
    correctAnswer: "B",
    explanation:
      "WCAG 2.2 AA mandates a minimum contrast ratio of 4.5:1 for normal text and 3.0:1 for large text (>= 18pt or 14pt bold). Level AAA requires 7.0:1.",
  },
  {
    id: 203,
    sectionId: "sec-creative",
    sectionName: "Color Spaces & Digital Display",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.0,
    text: "When exporting raster banners and digital ad graphics for web browsers and display ad networks (Google Display Network, Meta Ads), which color space standard must always be embedded?",
    options: [
      { id: "A", text: "CMYK (U.S. Web Coated SWOP)" },
      { id: "B", text: "sRGB IEC61966-2.1" },
      { id: "C", text: "Adobe RGB (1998)" },
      { id: "D", text: "ProPhoto RGB" },
    ],
    correctAnswer: "B",
    explanation:
      "sRGB is the universal color profile for all web browsers and digital screens. Assets exported in CMYK or unmanaged Adobe RGB render washed out or shifted in web browsers.",
  },
  {
    id: 204,
    sectionId: "sec-creative",
    sectionName: "Social Video & Safe Zones",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.0,
    text: "When designing full-screen 9:16 vertical video and motion story ad creatives for Instagram Reels and TikTok, why must critical typography and CTAs be placed inside designated 'Safe Zones'?",
    options: [
      { id: "A", text: "Platform algorithms penalize organic reach if graphics extend beyond 50% screen width." },
      { id: "B", text: "To prevent native UI overlays (creator handles, captions, sound discs, engagement icons, and device home bars) from occluding vital messaging." },
      { id: "C", text: "9:16 creatives are automatically cropped to 1:1 on smartphones with OLED displays." },
      { id: "D", text: "Ad networks charge 20% higher CPMs when text is placed near edge margins." },
    ],
    correctAnswer: "B",
    explanation:
      "Platform native UI overlays (profile avatar, like/comment buttons, caption descriptions, audio ticker, and phone navigation bars) occupy top, right, and bottom margins of 9:16 formats. Safe zones prevent occlusion.",
  },
  {
    id: 205,
    sectionId: "sec-creative",
    sectionName: "Layout Grids & Spatial Systems",
    difficulty: "INTERMEDIATE",
    marks: 2.0,
    penalty: 0.0,
    text: "Why is the 8-point (8pt / 8px) spatial grid system overwhelmingly favored by UI/UX product design teams over an odd-numbered grid system (e.g., 7px or 9px)?",
    options: [
      { id: "A", text: "8 scales cleanly across common screen density multipliers (@1x, @1.5x, @2x, @3x) without fractional sub-pixel rendering artifacts." },
      { id: "B", text: "CSS flexbox specifications only allow padding values divisible by 8." },
      { id: "C", text: "Browser rendering engines calculate DOM nodes 8 times faster with 8px increments." },
      { id: "D", text: "Google Fonts will not load on devices if spacing units are not multiples of 8." },
    ],
    correctAnswer: "A",
    explanation:
      "Most modern screen densities (@1x, @2x Retina, @3x, @4x) divide or multiply 8 evenly into whole numbers, eliminating blurred sub-pixel rendering and maintaining design-to-code fidelity.",
  },
  {
    id: 206,
    sectionId: "sec-creative",
    sectionName: "Component Architecture & Figma",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.0,
    text: "In Figma, when building a scalable component library for marketing landing pages, what is the primary architectural advantage of utilizing Auto Layout with 'Fill Container' alongside Nested Component Variants?",
    options: [
      { id: "A", text: "It automatically compresses images to under 50KB upon Figma cloud sync." },
      { id: "B", text: "It creates truly responsive UI components where card heights, paddings, and button widths reflow automatically according to text length and viewport resizing." },
      { id: "C", text: "It converts vector paths directly into compiled PHP templates." },
      { id: "D", text: "It forces all typography to render in uppercase without styling rules." },
    ],
    correctAnswer: "B",
    explanation:
      "Figma Auto Layout with 'Fill Container' dynamically distributes spacing and adjusts container bounds as copy changes or screen sizes adapt, reflecting real CSS flexbox behavior.",
  },
  {
    id: 207,
    sectionId: "sec-creative",
    sectionName: "Asset Formats & Web Performance",
    difficulty: "CRITICAL",
    marks: 2.0,
    penalty: 0.0,
    text: "For high-performance digital marketing landing pages targeting Core Web Vitals (sub-2.5s LCP), which modern image compression format provides 25-35% smaller file sizes than legacy JPEG/PNG while maintaining alpha transparency?",
    options: [
      { id: "A", text: "BMP" },
      { id: "B", text: "TIFF" },
      { id: "C", text: "WebP (or AVIF)" },
      { id: "D", text: "Animated GIF" },
    ],
    correctAnswer: "C",
    explanation:
      "WebP provides superior lossy and lossless compression with transparency support, significantly reducing payload weight and boosting Largest Contentful Paint (LCP) performance.",
  },
  {
    id: 208,
    sectionId: "sec-creative",
    sectionName: "Visual Hierarchy & CRO",
    difficulty: "INTERMEDIATE",
    marks: 2.0,
    penalty: 0.0,
    text: "When designing high-converting B2B SaaS landing page hero sections, what visual hierarchy principle ensures the user's eye naturally travels to the primary Call-To-Action (CTA) button within the first 3 seconds?",
    options: [
      { id: "A", text: "Making all heading, subheading, and CTA elements identical in font weight and hue." },
      { id: "B", text: "High chromatic contrast for the CTA button, generous negative whitespace, and directional visual cues leading from the primary value proposition headline." },
      { id: "C", text: "Placing the primary CTA at the bottom footer below the copyright line." },
      { id: "D", text: "Using flashing neon borders with 10 different competing background gradients." },
    ],
    correctAnswer: "B",
    explanation:
      "Visual contrast, intentional negative whitespace, and directional eye flow direct user attention towards the primary CTA without visual cognitive clutter.",
  },
  {
    id: 209,
    sectionId: "sec-creative",
    sectionName: "Display Advertising Architecture",
    difficulty: "INTERMEDIATE",
    marks: 2.0,
    penalty: 0.0,
    text: "According to the Interactive Advertising Bureau (IAB), which banner ad dimension is widely recognized as the 'Medium Rectangle' and consistently delivers top ad viewability across both desktop and mobile placements?",
    options: [
      { id: "A", text: "468 x 60 px" },
      { id: "B", text: "300 x 250 px" },
      { id: "C", text: "120 x 600 px" },
      { id: "D", text: "728 x 90 px" },
    ],
    correctAnswer: "B",
    explanation:
      "The 300x250 Medium Rectangle (MREC) is the most versatile and universally supported display ad format across both mobile in-article feeds and desktop sidebars.",
  },
  {
    id: 210,
    sectionId: "sec-creative",
    sectionName: "Brand Identity & Vector Geometry",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.0,
    text: "When creating a brand logomark in vector software (Adobe Illustrator or Figma), why is it critical to outline all text strokes and fonts before exporting master SVG/EPS production deliverables?",
    options: [
      { id: "A", text: "Unoutlined fonts require third-party systems to have the exact proprietary font files locally installed; otherwise, the layout substitutes fonts and breaks geometry." },
      { id: "B", text: "Vectors cannot be uploaded to web servers unless converted into 300 DPI rasters." },
      { id: "C", text: "SVG files delete text layers automatically if strokes are thinner than 2px." },
      { id: "D", text: "Outlining text makes the vector file 10x larger and prevents color changes." },
    ],
    correctAnswer: "A",
    explanation:
      "Converting text to vector outlines transforms glyphs into mathematical paths, guaranteeing the logo renders identically on any machine without depending on font file availability.",
  },
  {
    id: 211,
    sectionId: "sec-creative",
    sectionName: "Typography & Web Font Optimization",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.0,
    text: "In modern web design, why should UI designers implement variable fonts (.woff2) over multiple individual static font weight files?",
    options: [
      { id: "A", text: "Variable fonts store an infinite continuum of weights, widths, and slants in a single compact file, eliminating multiple HTTP requests and preventing FOIT (Flash of Invisible Text)." },
      { id: "B", text: "Static font files are completely deprecated by HTML5 standards." },
      { id: "C", text: "Variable fonts only support monospace code fonts." },
      { id: "D", text: "Web browsers charge per-weight download fees for static files." },
    ],
    correctAnswer: "A",
    explanation:
      "A single variable WOFF2 file contains dynamic interpolation along axes (weight, width, slant), drastically reducing network payload and browser font rendering delay.",
  },
  {
    id: 212,
    sectionId: "sec-creative",
    sectionName: "Micro-Interactions & State Design",
    difficulty: "INTERMEDIATE",
    marks: 2.0,
    penalty: 0.0,
    text: "When designing interactive UI components (buttons, text inputs, accordion toggles), which fundamental states must always be clearly designed to ensure intuitive visual feedback and accessibility?",
    options: [
      { id: "A", text: "Static, Broken, Hidden, Deleted" },
      { id: "B", text: "Default (Rest), Hover, Focus-Visible, Active (Pressed), and Disabled" },
      { id: "C", text: "Print, Fax, Email, SMS" },
      { id: "D", text: "Left, Right, Top, Bottom" },
    ],
    correctAnswer: "B",
    explanation:
      "Comprehensive UI states (Default, Hover, Focus-visible for keyboard accessibility, Active for press feedback, and Disabled) ensure clear affordance and meet usability standards.",
  },
  {
    id: 213,
    sectionId: "sec-creative",
    sectionName: "Motion Design & Micro-Animations",
    difficulty: "INTERMEDIATE",
    marks: 2.0,
    penalty: 0.0,
    text: "In UI motion design and banner animations, what duration range is considered the optimal sweet spot for micro-interactions (e.g., button ripples, tooltip reveals, modal transitions) to feel crisp without feeling sluggish?",
    options: [
      { id: "A", text: "10 to 30 milliseconds" },
      { id: "B", text: "200 to 350 milliseconds with an easing curve (cubic-bezier)" },
      { id: "C", text: "2000 to 3500 milliseconds (2-3.5 seconds)" },
      { id: "D", text: "10,000 milliseconds" },
    ],
    correctAnswer: "B",
    explanation:
      "200ms to 350ms provides perceptible, smooth visual transitions without impeding user workflow or making interactions feel sluggish.",
  },
  {
    id: 214,
    sectionId: "sec-creative",
    sectionName: "Inclusive Design & Accessibility",
    difficulty: "CRITICAL",
    marks: 2.0,
    penalty: 0.0,
    text: "A UI designer indicates form validation errors solely by changing the input border color from gray to red. Why does this design fail accessibility audits, and what is the proper solution?",
    options: [
      { id: "A", text: "Red uses more display battery than green on OLED displays." },
      { id: "B", text: "Color alone cannot convey meaning for users with red-green color vision deficiencies; design must combine color with iconography and clear error helper text." },
      { id: "C", text: "Red borders are blocked by browser ad-blockers." },
      { id: "D", text: "Form inputs must only use blue borders according to ISO standards." },
    ],
    correctAnswer: "B",
    explanation:
      "WCAG Guideline 1.4.1 (Use of Color) states color should not be the sole visual means of conveying information, indicating an action, or distinguishing an element. Pairing color with an alert icon and descriptive text ensures accessibility.",
  },
  {
    id: 215,
    sectionId: "sec-creative",
    sectionName: "Brand Asset Architecture & Favicons",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.0,
    text: "What is the recommended modern asset standard for website favicons and application icons across high-resolution displays (Retina, mobile home screens, dark mode browsers)?",
    options: [
      { id: "A", text: "A single 16x16 pixel GIF file with white background." },
      { id: "B", text: "An SVG favicon with dark/light mode CSS media query support, paired with a 180x180 PNG apple-touch-icon and a multi-resolution 32x32 .ico fallback." },
      { id: "C", text: "A 4K uncompressed TIFF file linked directly in <head>." },
      { id: "D", text: "An animated 1080p MP4 file embedded inside an iframe." },
    ],
    correctAnswer: "B",
    explanation:
      "Modern browser support enables scalable vector SVG favicons that adapt to dark/light OS themes via CSS @media (prefers-color-scheme), supported by standard PNG touch icons and legacy ICO fallbacks.",
  },
];



export const AI_PROMPT_QUESTIONS = [
  {
    id: 301,
    sectionId: "sec-ai",
    sectionName: "Prompt Engineering Frameworks",
    difficulty: "INTERMEDIATE",
    marks: 2.0,
    penalty: 0.0,
    text: "When implementing the RTF (Role, Task, Format) framework to generate high-converting Meta ad copy, what is the primary benefit of explicitly defining the 'Role' in the system prompt?",
    options: [
      { id: "A", text: "It prevents the LLM from executing Python code inside code sandboxes." },
      { id: "B", text: "It anchors the model's latent probability space to industry-specific vocabulary, tone constraints, and copywriting principles." },
      { id: "C", text: "It bypasses the model's total context window token consumption limit." },
      { id: "D", text: "It guarantees that the generated ad headlines will automatically rank #1 on Google Search." }
    ],
    correctAnswer: "B",
    explanation: "Role prompting activates relevant semantic subspaces in the neural network, biasing generative output toward domain expertise, tone, and conversion-focused copy frameworks."
  },
  {
    id: 302,
    sectionId: "sec-ai",
    sectionName: "Few-Shot In-Context Learning",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.0,
    text: "A digital marketing agency needs an LLM to generate email newsletters matching their unique, irreverent brand tone. Why is 'few-shot prompting' superior to 'zero-shot prompting' for this use case?",
    options: [
      { id: "A", text: "Few-shot prompting eliminates the need for paying API token costs." },
      { id: "B", text: "Few-shot prompting provides concrete input-output demonstration pairs that establish the exact rhythm, cadence, and styling rules without model fine-tuning." },
      { id: "C", text: "Few-shot prompting forces the LLM to search live web pages via Googlebot." },
      { id: "D", text: "Zero-shot prompting causes permanent GPU memory corruption in self-hosted models." }
    ],
    correctAnswer: "B",
    explanation: "Few-shot in-context learning gives the model 2-5 explicit examples of desired output, allowing it to mimic nuances, humor, structure, and tone far better than abstract zero-shot instructions."
  },
  {
    id: 303,
    sectionId: "sec-ai",
    sectionName: "LLM Hyperparameters",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.0,
    text: "When configuring an LLM API workflow to extract structured JSON data from messy SEO crawl reports versus generating creative social media video hook ideas, how should the 'Temperature' parameter be set?",
    options: [
      { id: "A", text: "Set Temperature to 1.5 for data extraction and 0.0 for creative video hooks." },
      { id: "B", text: "Set Temperature near 0.0-0.2 for deterministic data extraction, and 0.7-0.9 for creative, diverse video hook ideation." },
      { id: "C", text: "Temperature must always remain exactly 1.0 regardless of the task." },
      { id: "D", text: "Temperature only controls network request timeout latency, not generative randomness." }
    ],
    correctAnswer: "B",
    explanation: "Low temperature (0.0-0.2) reduces token randomness and maximizes probability on the most likely tokens for precise extraction, while higher temperature (0.7-0.9) fosters creative variance."
  },
  {
    id: 304,
    sectionId: "sec-ai",
    sectionName: "Reasoning & Attribution",
    difficulty: "CRITICAL",
    marks: 2.0,
    penalty: 0.0,
    text: "You instruct an AI model to analyze a complex multi-touch attribution model across Google Ads, Meta, and Organic channels with custom CAC and LTV figures. Which prompt technique ensures the highest numerical accuracy?",
    options: [
      { id: "A", text: "Chain-of-Thought (CoT) prompting: 'Think step-by-step, showing intermediate calculation formulas before stating the final ROAS allocation.'" },
      { id: "B", text: "One-Word Constraint: 'Respond with only the final dollar figure without explanation.'" },
      { id: "C", text: "Repeating the word 'Accurate' 15 times at the end of the prompt." },
      { id: "D", text: "Typing the entire prompt in ALL CAPS to increase token attention weights." }
    ],
    correctAnswer: "A",
    explanation: "Chain-of-Thought (CoT) prompting encourages the model to break down mathematical reasoning into intermediate tokens, drastically reducing arithmetic and attribution hallucination."
  },
  {
    id: 305,
    sectionId: "sec-ai",
    sectionName: "RAG & Hallucination Guardrails",
    difficulty: "CRITICAL",
    marks: 2.0,
    penalty: 0.0,
    text: "To prevent an AI customer service chatbot from hallucinating refund policies or inventing fake discount coupons, what architecture should be implemented?",
    options: [
      { id: "A", text: "Retrieval-Augmented Generation (RAG) coupled with system prompt instructions: 'Answer solely based on the retrieved context below; if unknown, state that you cannot assist.'" },
      { id: "B", text: "Increasing model temperature to 1.8 to force the model to explore creative possibilities." },
      { id: "C", text: "Deleting the system prompt completely to allow unrestricted user conversation." },
      { id: "D", text: "Running the chatbot exclusively through SMS text messages." }
    ],
    correctAnswer: "A",
    explanation: "RAG retrieves verified company documentation from a vector database and grounds the LLM response in factual context with strict fallback constraints."
  },
  {
    id: 306,
    sectionId: "sec-ai",
    sectionName: "System Instructions & Safety",
    difficulty: "INTERMEDIATE",
    marks: 2.0,
    penalty: 0.0,
    text: "In professional AI app development for marketing teams, what distinguishes 'System Instructions' (Developer Messages) from 'User Prompts'?",
    options: [
      { id: "A", text: "System instructions cannot contain English words." },
      { id: "B", text: "System instructions define authoritative behavioral guardrails, brand guidelines, and formatting rules that persist across user conversation turns." },
      { id: "C", text: "User prompts take absolute precedence and automatically erase system instructions." },
      { id: "D", text: "System instructions are only used to charge the client's credit card." }
    ],
    correctAnswer: "B",
    explanation: "System instructions provide the foundational constitution of the agent, dictating brand safety, tone constraints, tool availability, and output formatting across all user interactions."
  },
  {
    id: 307,
    sectionId: "sec-ai",
    sectionName: "Visual Generative AI",
    difficulty: "INTERMEDIATE",
    marks: 2.0,
    penalty: 0.0,
    text: "When crafting prompts for Midjourney v6 to generate photorealistic lifestyle ad banners for an organic skincare product, which prompt structure yields the highest visual quality?",
    options: [
      { id: "A", text: "'A bottle of lotion, make it very viral and 4k resolution quality.'" },
      { id: "B", text: "'Minimalist organic glass serum dropper bottle on natural slate rock, water droplets, soft morning sunlight, cinematic lighting, editorial beauty photography, 85mm lens f/1.8 --ar 16:9 --style raw --v 6.0'" },
      { id: "C", text: "'Photo of skin care products --no quality --fast'" },
      { id: "D", text: "'Generate 50 Facebook ads with call to action buttons directly painted on the canvas.'" }
    ],
    correctAnswer: "B",
    explanation: "Midjourney v6 responds best to descriptive photography terminology (lighting, materials, lens, depth of field) and explicit aspect ratio / version parameter flags."
  },
  {
    id: 308,
    sectionId: "sec-ai",
    sectionName: "Autonomous Agents & Tool Calling",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.0,
    text: "What capability enables an AI marketing assistant to check current campaign ROAS inside Google Ads and automatically pause an underperforming ad set without human intervention?",
    options: [
      { id: "A", text: "Markov Chain probability decay." },
      { id: "B", text: "Function Calling / Tool Use, where the LLM recognizes when to output structured arguments to invoke external REST APIs." },
      { id: "C", text: "Prompt Injection vulnerability." },
      { id: "D", text: "CSS Flexbox layout nesting." }
    ],
    correctAnswer: "B",
    explanation: "Function calling (tool use) allows LLMs to determine when external actions are required, formatting JSON payloads to query or update external marketing platforms via authenticated APIs."
  },
  {
    id: 309,
    sectionId: "sec-ai",
    sectionName: "AI & Search Quality Standards",
    difficulty: "CRITICAL",
    marks: 2.0,
    penalty: 0.0,
    text: "According to Google Search Central's official guidance on AI-generated content, how does Google's ranking algorithm treat content produced with generative AI?",
    options: [
      { id: "A", text: "Google automatically de-indexes any page that contains AI-generated text detected by token perplexity scanners." },
      { id: "B", text: "Google rewards content based on quality, value, and E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness), regardless of how it was produced." },
      { id: "C", text: "Google ranks AI content higher than human content because AI models have better spelling." },
      { id: "D", text: "All AI-generated content must contain a mandatory government watermark in the footer." }
    ],
    correctAnswer: "B",
    explanation: "Google's guidance explicitly states that using AI does not violate guidelines; content is evaluated purely on whether it is helpful, original, and demonstrates E-E-A-T for human users."
  },
  {
    id: 310,
    sectionId: "sec-ai",
    sectionName: "Negative Prompting & Artifact Removal",
    difficulty: "INTERMEDIATE",
    marks: 2.0,
    penalty: 0.0,
    text: "In text-to-image AI platforms (Stable Diffusion, Midjourney), how does 'Negative Prompting' improve commercial marketing assets?",
    options: [
      { id: "A", text: "It decreases pixel resolution by 50% to save hard drive space." },
      { id: "B", text: "It explicitly directs the diffusion process away from specified unwanted features, such as text glitches, distorted anatomy, watermarks, and oversaturated colors." },
      { id: "C", text: "It forces the image to be black and white." },
      { id: "D", text: "It automatically creates a negative copyright violation claim." }
    ],
    correctAnswer: "B",
    explanation: "Negative prompts instruct the latent diffusion model to steer clear of specific semantic tokens, actively suppressing common artifacts like deformed limbs, unreadable text, or blur."
  },
  {
    id: 311,
    sectionId: "sec-ai",
    sectionName: "Prompt Chaining & Multi-Stage Pipelines",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.0,
    text: "Why do enterprise growth teams build 'Prompt Chains' (sequential micro-prompts) instead of asking an LLM to generate an entire 30-day multi-channel marketing campaign in a single prompt?",
    options: [
      { id: "A", text: "Single mega-prompts suffer from attention degradation and context drift, while modular chaining allows validation, error checking, and refinement between each step." },
      { id: "B", text: "Single prompts are illegal under GDPR regulations." },
      { id: "C", text: "Prompt chaining makes the AI run 1,000 times faster because of parallel quantum loops." },
      { id: "D", text: "LLMs can only generate a maximum of 140 characters per prompt." }
    ],
    correctAnswer: "A",
    explanation: "Prompt chaining breaks down complex workflows (audience research -> messaging pillars -> copy generation -> compliance check) into discrete steps, vastly improving reasoning depth and QA."
  },
  {
    id: 312,
    sectionId: "sec-ai",
    sectionName: "Context Windows & Token Management",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.0,
    text: "When conducting long multi-turn market research interviews with an LLM, what occurs when the conversation history exceeds the model's maximum context window?",
    options: [
      { id: "A", text: "The model restarts the computer automatically." },
      { id: "B", text: "The earliest messages are truncated or dropped, causing the model to forget initial instructions, persona rules, and foundational context." },
      { id: "C", text: "The model automatically switches from GPT-4 to binary assembly code." },
      { id: "D", text: "The context window has unlimited infinite storage on all modern cloud servers." }
    ],
    correctAnswer: "B",
    explanation: "LLM context windows are finite buffers. When conversations grow too long, sliding-window truncation cuts off the earliest tokens, causing persona amnesia unless summary embeddings are maintained."
  },
  {
    id: 313,
    sectionId: "sec-ai",
    sectionName: "Fine-Tuning vs RAG vs Prompting",
    difficulty: "CRITICAL",
    marks: 2.0,
    penalty: 0.0,
    text: "A direct-to-consumer brand wants its marketing AI to recommend up-to-the-minute product inventory and current flash sale prices. What is the most appropriate technological architecture?",
    options: [
      { id: "A", text: "Fine-tuning an open-source model once every month on historical product catalogs." },
      { id: "B", text: "Retrieval-Augmented Generation (RAG) querying real-time inventory and pricing APIs dynamically during prompt execution." },
      { id: "C", text: "Training a base model from scratch with 10,000 GPUs." },
      { id: "D", text: "Asking the model to guess prices based on general market trends." }
    ],
    correctAnswer: "B",
    explanation: "Fine-tuning updates parametric weights and is static/slow; real-time pricing and inventory require dynamic retrieval (RAG / API tool-calling) to inject live data into the prompt."
  },
  {
    id: 314,
    sectionId: "sec-ai",
    sectionName: "Enterprise Data Privacy & Security",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.0,
    text: "Before feeding customer CRM interaction logs into a commercial public generative AI tool to analyze churn sentiment, what data hygiene practice is legally required under DPDP & GDPR?",
    options: [
      { id: "A", text: "Doubling the font size of the text before pasting." },
      { id: "B", text: "Data anonymization / PII masking to remove names, phone numbers, email addresses, and credit card numbers." },
      { id: "C", text: "Encrypting the text with a Caesar cipher." },
      { id: "D", text: "Translating the entire dataset into Latin." }
    ],
    correctAnswer: "B",
    explanation: "Submitting unmasked PII (Personally Identifiable Information) to public models violates privacy laws and risks data exposure if the platform uses prompt logs for training."
  },
  {
    id: 315,
    sectionId: "sec-ai",
    sectionName: "Synthetic Buyer Personas",
    difficulty: "INTERMEDIATE",
    marks: 2.0,
    penalty: 0.0,
    text: "How should a digital marketer structure a prompt to utilize an LLM as a 'Synthetic Skeptical Buyer' to stress-test high-ticket sales landing page copy?",
    options: [
      { id: "A", text: "'Please read this and tell me you love it so my boss is happy.'" },
      { id: "B", text: "'Adopt the persona of a risk-averse CFO with a tight Q4 budget. Read the landing page below, challenge every ROI claim, and list 5 specific trust objections preventing you from signing.'" },
      { id: "C", text: "'Rewrite this copy in the style of Shakespeare.'" },
      { id: "D", text: "'Check for spelling and punctuation errors only.'" }
    ],
    correctAnswer: "B",
    explanation: "Assigning clear demographic/psychographic counter-perspectives forces the model to uncover hidden customer friction points and objection gaps before deploying ad spend."
  }
];

export const VIDEO_EDITING_QUESTIONS = [
  {
    id: 401,
    sectionId: "sec-video",
    sectionName: "Retention Hook Architecture",
    difficulty: "CRITICAL",
    marks: 2.0,
    penalty: 0.0,
    text: "In short-form vertical video advertising (Reels, TikTok, YouTube Shorts), what editing strategy in the first 3 seconds yields the highest viewer retention rate?",
    options: [
      { id: "A", text: "A 5-second fade-in from black with slow ambient music." },
      { id: "B", text: "A visual pattern interrupt, immediate bold on-screen headline hook, and vocal delivery without introductory greetings." },
      { id: "C", text: "Displaying the company's full legal corporate registration certificate." },
      { id: "D", text: "A slow horizontal pan across an empty office desk." }
    ],
    correctAnswer: "B",
    explanation: "Social feed users swipe rapidly. The first 3 seconds require an immediate hook (pattern interrupt, bold text hook, immediate value promise) to stop scrolling."
  },
  {
    id: 402,
    sectionId: "sec-video",
    sectionName: "Aspect Ratios & Platform UI Safe Zones",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.0,
    text: "When editing a 9:16 (1080x1920) vertical video for Instagram Reels and TikTok, where should important captions and CTA buttons be positioned?",
    options: [
      { id: "A", text: "Along the far bottom right edge touching the comment icon." },
      { id: "B", text: "Within the central 4:5 safe zone, keeping top 15% and bottom 20% clear of critical typography to avoid platform overlay occlusion." },
      { id: "C", text: "Directly in the top 5% behind the native camera notch." },
      { id: "D", text: "Rotated 90 degrees vertically along the left screen border." }
    ],
    correctAnswer: "B",
    explanation: "Native UI overlays (profile header, description caption, audio ticker, like/share icons) cover top and bottom margins; critical graphics must stay in the central safe zone."
  },
  {
    id: 403,
    sectionId: "sec-video",
    sectionName: "Audio Ducking & Dynamic Range",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.0,
    text: "In Premiere Pro or CapCut, what does the 'Audio Ducking' feature achieve in commercial video production?",
    options: [
      { id: "A", text: "It replaces spoken dialogue with quacking bird sound effects." },
      { id: "B", text: "It automatically attenuates background music levels by -15dB to -22dB whenever vocal dialogue is detected, restoring volume during pauses." },
      { id: "C", text: "It deletes the audio track whenever background music starts playing." },
      { id: "D", text: "It converts mono microphone recordings into Dolby Atmos 7.1." }
    ],
    correctAnswer: "B",
    explanation: "Audio ducking uses sidechain compression to automatically lower background music when a speaker talks, maintaining vocal clarity without manual volume keyframing."
  },
  {
    id: 404,
    sectionId: "sec-video",
    sectionName: "Audio Normalization & Loudness Standards",
    difficulty: "CRITICAL",
    marks: 2.0,
    penalty: 0.0,
    text: "To ensure consistent, punchy vocal audio that avoids automatic platform normalization penalties across YouTube and Instagram, what target integrated loudness standard should be mastered?",
    options: [
      { id: "A", text: "0 LUFS (completely maxed out with severe digital clipping)" },
      { id: "B", text: "-14 LUFS (with True Peak not exceeding -1.0 dBTP)" },
      { id: "C", text: "-40 LUFS (almost imperceptible whisper level)" },
      { id: "D", text: "+10 LUFS (exceeding all digital audio headroom limits)" }
    ],
    correctAnswer: "B",
    explanation: "-14 LUFS is the standard web/streaming target (YouTube, Spotify, Meta). Delivering audio louder than this triggers platform compression; quieter audio sounds weak."
  },
  {
    id: 405,
    sectionId: "sec-video",
    sectionName: "Visual Pacing & B-Roll Rhythm",
    difficulty: "INTERMEDIATE",
    marks: 2.0,
    penalty: 0.0,
    text: "What visual editing cadence is widely adopted in high-performing educational and direct-response marketing videos to prevent viewer drop-off?",
    options: [
      { id: "A", text: "Maintaining a static talking-head camera angle for 60 seconds without cuts." },
      { id: "B", text: "Introducing visual changes (B-roll cutaway, angle punch-in, graphic callout, kinetic text) every 2.5 to 3.5 seconds." },
      { id: "C", text: "Inserting full 10-second black freeze frames after every sentence." },
      { id: "D", text: "Applying extreme strobe lighting effects across every frame." }
    ],
    correctAnswer: "B",
    explanation: "Dynamic pacing with B-roll cutaways, scale shifts, and text callouts every 2.5-3.5 seconds resets viewer visual attention and maintains high watch time."
  },
  {
    id: 406,
    sectionId: "sec-video",
    sectionName: "Keyframing & Temporal Interpolation",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.0,
    text: "When animating text pop-ups or subtle zoom-ins in video editing software, why is 'Bézier / Ease In & Ease Out' preferred over 'Linear' keyframe interpolation?",
    options: [
      { id: "A", text: "Linear keyframes cause GPU hardware crashes." },
      { id: "B", text: "Bézier easing mimics real-world physics with smooth acceleration and deceleration, making animations look polished and professional rather than robotic." },
      { id: "C", text: "Bézier keyframes eliminate the need for video rendering." },
      { id: "D", text: "Linear interpolation automatically changes text color." }
    ],
    correctAnswer: "B",
    explanation: "Linear keyframes move at constant abrupt speeds. Bézier easing applies natural acceleration and deceleration, creating smooth, organic motion graphics."
  },
  {
    id: 407,
    sectionId: "sec-video",
    sectionName: "Frame Rates & Shutter Angle Rule",
    difficulty: "INTERMEDIATE",
    marks: 2.0,
    penalty: 0.0,
    text: "When shooting high-end talking-head marketing video at 24fps, what shutter speed adheres to the cinematic 180-degree shutter angle rule for natural motion blur?",
    options: [
      { id: "A", text: "1/10 second" },
      { id: "B", text: "1/50 second (or 1/48s)" },
      { id: "C", text: "1/1000 second" },
      { id: "D", text: "1/2 second" }
    ],
    correctAnswer: "B",
    explanation: "The 180-degree shutter rule dictates that shutter speed should be 1 / (2 * frame rate). For 24fps, this is approximately 1/50s, producing natural, pleasant motion blur."
  },
  {
    id: 408,
    sectionId: "sec-video",
    sectionName: "Color Science & LUT Workflows",
    difficulty: "CRITICAL",
    marks: 2.0,
    penalty: 0.0,
    text: "When editing video recorded in a camera flat Log profile (Sony S-Log3, Canon C-Log), what is the correct two-stage color grading workflow?",
    options: [
      { id: "A", text: "Apply a creative high-contrast cinematic teal & orange LUT directly on uncorrected Log footage." },
      { id: "B", text: "First apply a Technical Transform / Color Space Transform (CST) to convert Log into standard Rec.709, then apply creative styling and exposure balance." },
      { id: "C", text: "Increase saturation to 300% without exposure balancing." },
      { id: "D", text: "Export the Log footage flat without any color correction." }
    ],
    correctAnswer: "B",
    explanation: "Log profiles must first undergo technical normalization to Rec.709 color space before creative grading, ensuring colors map accurately without crushing highlights or banding shadows."
  },
  {
    id: 409,
    sectionId: "sec-video",
    sectionName: "Video Export Codecs & Compression",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.0,
    text: "For uploading 1080p 60fps vertical videos to Meta Ads and Instagram Reels, what export configuration provides the best combination of quality and platform compatibility?",
    options: [
      { id: "A", text: "AVI Uncompressed (file size 18GB for 30 seconds)" },
      { id: "B", text: "Format: MP4 (H.264), VBR 2-Pass (Target Bitrate 15-20 Mbps), Audio: AAC 320 kbps (48 kHz)" },
      { id: "C", text: "GIF animated at 12fps" },
      { id: "D", text: "WMV low bitrate 0.5 Mbps" }
    ],
    correctAnswer: "B",
    explanation: "H.264 MP4 with 15-20 Mbps bitrate and AAC 320 kbps audio delivers pristine visual clarity without exceeding social platform ingestion limits or causing heavy compression artifacting."
  },
  {
    id: 410,
    sectionId: "sec-video",
    sectionName: "Captions & Silent Autoplay Optimization",
    difficulty: "INTERMEDIATE",
    marks: 2.0,
    penalty: 0.0,
    text: "Why is burnt-in kinetic captioning (subtitles) considered non-negotiable for high-converting social media video ads?",
    options: [
      { id: "A", text: "Instagram algorithms delete videos that do not contain subtitles." },
      { id: "B", text: "Over 70% of mobile users scroll social feeds with audio muted; animated captions ensure the core value proposition is comprehended instantly." },
      { id: "C", text: "Captions double the video file resolution automatically." },
      { id: "D", text: "Captions prevent competitors from downloading your video." }
    ],
    correctAnswer: "B",
    explanation: "Mobile users frequently watch videos on mute during commutes or in public. On-screen animated captions ensure message comprehension and increase watch time."
  },
  {
    id: 411,
    sectionId: "sec-video",
    sectionName: "Audio Continuity (J-Cuts & L-Cuts)",
    difficulty: "INTERMEDIATE",
    marks: 2.0,
    penalty: 0.0,
    text: "In video storytelling, what is an 'L-Cut' and how does it improve conversational editing flow?",
    options: [
      { id: "A", text: "A cut that deletes all left-side video pixels." },
      { id: "B", text: "The audio from the preceding scene continues playing while the video switches to the next scene or reaction shot." },
      { id: "C", text: "A cut that changes the aspect ratio into the shape of the letter L." },
      { id: "D", text: "Cutting the video exactly when someone says a word starting with the letter L." }
    ],
    correctAnswer: "B",
    explanation: "In an L-Cut, audio from shot A carries over as video transitions to shot B (e.g. listener reaction), creating seamless natural dialogue pacing."
  },
  {
    id: 412,
    sectionId: "sec-video",
    sectionName: "Chroma Key & Green Screen Composite",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.0,
    text: "When keying green screen spokesperson footage in Premiere Pro Ultra Key or DaVinci Resolve, what setting prevents the unsightly green halo around fine hair strands?",
    options: [
      { id: "A", text: "Spill Suppression and Edge Soften/Feathering controls." },
      { id: "B", text: "Turning off video preview monitors." },
      { id: "C", text: "Increasing ISO to 12800 on camera." },
      { id: "D", text: "Inverting the composite mask completely." }
    ],
    correctAnswer: "A",
    explanation: "Spill suppression desaturates or counterbalances green light bounce, while matte choke/feathering cleans fine hair edges without harsh fringes."
  },
  {
    id: 413,
    sectionId: "sec-video",
    sectionName: "Timeline Optimization & Scratch Disks",
    difficulty: "INTERMEDIATE",
    marks: 2.0,
    penalty: 0.0,
    text: "What causes severe dropped frames and playback lag during 4K multi-layer video timeline editing on high-spec workstations?",
    options: [
      { id: "A", text: "Editing highly compressed Inter-frame (Long-GOP) H.265/H.264 camera files without generating ProRes/DNxHR editing proxies." },
      { id: "B", text: "Using a wireless computer mouse." },
      { id: "C", text: "Having more than 3 audio tracks." },
      { id: "D", text: "Exporting videos in MP4 format." }
    ],
    correctAnswer: "A",
    explanation: "Long-GOP codecs (H.264/H.265) require intense CPU/GPU decompression per frame. Editing with intra-frame proxies (ProRes/DNxHR) ensures smooth, lag-free timeline scrub."
  },
  {
    id: 414,
    sectionId: "sec-video",
    sectionName: "Dead Air & Pacing Tightening",
    difficulty: "INTERMEDIATE",
    marks: 2.0,
    penalty: 0.0,
    text: "Which editing tool in Premiere Pro and DaVinci Resolve deletes pauses and breath gaps while automatically closing the empty space between clips in a single click?",
    options: [
      { id: "A", text: "Ripple Delete (or Q/W Ripple Trim)" },
      { id: "B", text: "Hand Tool" },
      { id: "C", text: "Type Tool" },
      { id: "D", text: "Zoom In Tool" }
    ],
    correctAnswer: "A",
    explanation: "Ripple trim and ripple delete remove selected clip sections and instantly shift subsequent timeline clips forward, eliminating dead air without manual dragging."
  },
  {
    id: 415,
    sectionId: "sec-video",
    sectionName: "Reels Cover & Freeze-Frame Strategy",
    difficulty: "INTERMEDIATE",
    marks: 2.0,
    penalty: 0.0,
    text: "Why is selecting or designing a dedicated 9:16 cover frame with centered 1:1 grid preview critical for Instagram Reels and TikTok?",
    options: [
      { id: "A", text: "Instagram bans accounts that do not upload custom covers." },
      { id: "B", text: "The cover displays on the profile grid in 1:1 square crop; centering the graphic hook ensures it doesn't get cut off on the profile overview." },
      { id: "C", text: "Custom covers increase audio volume by 6dB." },
      { id: "D", text: "Covers reduce video file size." }
    ],
    correctAnswer: "B",
    explanation: "On Instagram profiles, Reels appear in a 1:1 square grid. Keeping the title and focal point inside the center 1:1 square prevents truncated text and increases profile click-throughs."
  }
];

export const SMO_QUESTIONS = [
  {
    id: 501,
    sectionId: "sec-smo",
    sectionName: "Profile & Bio Conversion Architecture",
    difficulty: "INTERMEDIATE",
    marks: 2.0,
    penalty: 0.0,
    text: "When optimizing an Instagram brand profile for organic conversions, what formula ensures the highest bio link click-through rate (CTR)?",
    options: [
      { id: "A", text: "A paragraph of random inspirational quotes without mentions of the business." },
      { id: "B", text: "A 1-sentence Unique Value Proposition (who you help + outcome), bulleted social proof / credentials, and a singular actionable CTA pointing to a tracked bio link." },
      { id: "C", text: "50 emojis without any text." },
      { id: "D", text: "Writing the entire bio in Morse code." }
    ],
    correctAnswer: "B",
    explanation: "A high-converting bio clearly states target audience + core transformation, establishes authority with quick proof, and funnels visitors to a single clear action."
  },
  {
    id: 502,
    sectionId: "sec-smo",
    sectionName: "Algorithmic Signal Weighting",
    difficulty: "CRITICAL",
    marks: 2.0,
    penalty: 0.0,
    text: "Across modern Instagram, LinkedIn, and TikTok recommendation algorithms, which user engagement signal carries the highest weight for viral organic feed distribution?",
    options: [
      { id: "A", text: "Double-tap 'Likes'" },
      { id: "B", text: "Saves (bookmarking for future reference) and Shares (direct message forwards / external shares)" },
      { id: "C", text: "Viewing the post on an Android smartphone." },
      { id: "D", text: "Muting the account notifications." }
    ],
    correctAnswer: "B",
    explanation: "Likes are low-effort passive actions. Saves and shares signal high utility, value, and viral advocacy, which feed recommendation systems reward with explosive distribution."
  },
  {
    id: 503,
    sectionId: "sec-smo",
    sectionName: "Social SEO & Search Keyword Indexing",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.0,
    text: "How should social media managers optimize posts for 'Social SEO' on Instagram and TikTok search tabs beyond using hashtags?",
    options: [
      { id: "A", text: "Placing target search keywords naturally in the profile display name, post caption opening, on-screen text overlays, and spoken audio (transcripts)." },
      { id: "B", text: "Hiding 10,000 keywords in white text on white background." },
      { id: "C", text: "Tagging 20 unrelated celebrity accounts in the photo." },
      { id: "D", text: "Only posting images without any words or captions." }
    ],
    correctAnswer: "A",
    explanation: "Social platforms index profile names, caption copy, OCR on-screen text, and audio transcription. Integrating keywords contextually drives organic discovery in search results."
  },
  {
    id: 504,
    sectionId: "sec-smo",
    sectionName: "Carousel Dwell Time & Algorithmic Retargeting",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.0,
    text: "Why do multi-slide carousel posts on Instagram and LinkedIn consistently outperform single-image static graphics in organic reach?",
    options: [
      { id: "A", text: "Carousels pay social platforms a fee per swipe." },
      { id: "B", text: "Carousels dramatically increase user 'Dwell Time', and Instagram automatically re-serves the post to users showing slide 2 if they didn't finish swiping on their first impression." },
      { id: "C", text: "Carousels disable the comment section to boost reach." },
      { id: "D", text: "Single images are blocked on desktop browsers." }
    ],
    correctAnswer: "B",
    explanation: "Carousels capture prolonged dwell time as users swipe through slides. Additionally, Instagram often gives carousels a second exposure by showing the second slide in the feed."
  },
  {
    id: 505,
    sectionId: "sec-smo",
    sectionName: "Hashtag Strategy & Algorithmic Categorization",
    difficulty: "INTERMEDIATE",
    marks: 2.0,
    penalty: 0.0,
    text: "According to current Meta creator guidelines, what is the most effective hashtag strategy for organic reach?",
    options: [
      { id: "A", text: "Pasting the maximum allowable 30 generic viral hashtags (#viral #love #follow)." },
      { id: "B", text: "Using 3 to 5 highly relevant, niche-specific hashtags that accurately describe the topic, industry, and community to facilitate machine categorization." },
      { id: "C", text: "Inventing a new hashtag with 60 characters that has 0 search volume." },
      { id: "D", text: "Never using any hashtags under any circumstances." }
    ],
    correctAnswer: "B",
    explanation: "Meta explicitly recommends 3-5 hyper-relevant hashtags. Excessive or generic tags trigger spam classifications and confuse algorithmic content categorization."
  },
  {
    id: 506,
    sectionId: "sec-smo",
    sectionName: "First-Hour Engagement Velocity",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.0,
    text: "Why is the first 30 to 60 minutes after publishing ('Engagement Velocity') critical for organic post distribution?",
    options: [
      { id: "A", text: "Social platforms delete posts after 60 minutes if nobody comments." },
      { id: "B", text: "The algorithm initially tests content with a small seed cohort of active followers; rapid engagement signals high relevance and unlocks broader explore/feed distribution." },
      { id: "C", text: "Ad revenue is only calculated during the first hour." },
      { id: "D", text: "Server bandwidth is higher during the first hour." }
    ],
    correctAnswer: "B",
    explanation: "Content is tested against a small sample of active followers. If the initial seed group likes, comments, and shares quickly, algorithms expand distribution to wider lookalike audiences."
  },
  {
    id: 507,
    sectionId: "sec-smo",
    sectionName: "Stories Engagement & Tray Ranking",
    difficulty: "INTERMEDIATE",
    marks: 2.0,
    penalty: 0.0,
    text: "What technique moves an account's Instagram Story to the very front of your followers' story feed tray in the morning?",
    options: [
      { id: "A", text: "Posting 45 stories at 3:00 AM without stickers." },
      { id: "B", text: "Using interactive stickers (poll, emoji slider, quiz, or question box) in the very first story to trigger immediate physical user taps and engagement." },
      { id: "C", text: "Tagging 100 accounts in invisible tiny text." },
      { id: "D", text: "Posting only a blank black screen." }
    ],
    correctAnswer: "B",
    explanation: "Interactive story stickers invite quick micro-actions (taps, votes). High early interaction signals close user affinity, bumping the account's avatar to the front of the story tray."
  },
  {
    id: 508,
    sectionId: "sec-smo",
    sectionName: "Highlight Albums & Brand Journey",
    difficulty: "INTERMEDIATE",
    marks: 2.0,
    penalty: 0.0,
    text: "How should an enterprise service business organize its Instagram Profile Highlights to convert cold profile visitors into inquiries?",
    options: [
      { id: "A", text: "Random unsorted stories spanning 5 years with default covers." },
      { id: "B", text: "Structured buckets with custom branded covers: 'Start Here / About Us', 'Client Results & Reviews', 'Services & Pricing', and 'FAQs & Contact'." },
      { id: "C", text: "Only 1 highlight containing coffee pictures." },
      { id: "D", text: "Highlights cannot be viewed by new profile visitors." }
    ],
    correctAnswer: "B",
    explanation: "Curated highlights act as an evergreen mini-website menu, quickly qualifying cold visitors and guiding them through social proof, offer details, and clear contact steps."
  },
  {
    id: 509,
    sectionId: "sec-smo",
    sectionName: "Community Engagement & Comment Velocity",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.0,
    text: "How should brand community managers reply to organic user comments to maximize algorithmic post reach?",
    options: [
      { id: "A", text: "Reply with a thumbs-up emoji only, 3 weeks later." },
      { id: "B", text: "Reply promptly with thoughtful, open-ended questions that spark genuine two-way conversations and double the total comment count." },
      { id: "C", text: "Copy and paste the exact same generic bot response to every user." },
      { id: "D", text: "Delete all comments immediately." }
    ],
    correctAnswer: "B",
    explanation: "Replying promptly with open-ended conversational questions encourages secondary user responses, doubling comment count and signaling active community discussion to the algorithm."
  },
  {
    id: 510,
    sectionId: "sec-smo",
    sectionName: "LinkedIn Organic Reach Optimization",
    difficulty: "CRITICAL",
    marks: 2.0,
    penalty: 0.0,
    text: "What formatting choice on LinkedIn significantly increases impressions compared to posts containing external outbound links in the caption?",
    options: [
      { id: "A", text: "Posting external blog links directly in line 1 of the post." },
      { id: "B", text: "Native multi-page PDF document carousels or text-first insights with external links placed in the comments or creator bio." },
      { id: "C", text: "Writing posts using only capital letters." },
      { id: "D", text: "Sharing links to competitor websites." }
    ],
    correctAnswer: "B",
    explanation: "Social platforms penalize posts that take users off-site. Native document carousels keep users inside LinkedIn, driving significantly higher organic dwell time and feed impressions."
  },
  {
    id: 511,
    sectionId: "sec-smo",
    sectionName: "User-Generated Content (UGC) Amplification",
    difficulty: "INTERMEDIATE",
    marks: 2.0,
    penalty: 0.0,
    text: "Why is integrating User-Generated Content (UGC) into an organic social strategy more effective than brand-created studio photography?",
    options: [
      { id: "A", text: "UGC has 0 production cost and provides peer social proof that feels authentic and non-commercial, driving higher engagement and conversion rates." },
      { id: "B", text: "Studio photography is blocked by ad blockers." },
      { id: "C", text: "Customers get angry when brands post high-resolution images." },
      { id: "D", text: "UGC eliminates the need for internet connection." }
    ],
    correctAnswer: "A",
    explanation: "Consumers trust authentic peer recommendations over polished corporate advertisements. UGC blends into social feeds natively, fostering community trust and engagement."
  },
  {
    id: 512,
    sectionId: "sec-smo",
    sectionName: "Native Content vs Automated Cross-Posting",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.0,
    text: "What is the penalty of using third-party automated tools to publish the exact same post simultaneously across Instagram, LinkedIn, and X without platform customization?",
    options: [
      { id: "A", text: "Immediate permanent account ban across all three networks." },
      { id: "B", text: "Format mismatch (wrong aspect ratios, truncated character limits, broken handle tags, irrelevant hashtags) that suppresses engagement across all channels." },
      { id: "C", text: "The platforms charge extra roaming data fees." },
      { id: "D", text: "The post turns into an audio podcast." }
    ],
    correctAnswer: "B",
    explanation: "Each network has distinct audience etiquette, aspect ratios, and tagging systems. Generic cross-posting looks careless and fails to optimize for each platform's unique algorithm."
  },
  {
    id: 513,
    sectionId: "sec-smo",
    sectionName: "Pinned Posts Strategic Allocation",
    difficulty: "INTERMEDIATE",
    marks: 2.0,
    penalty: 0.0,
    text: "What is the recommended 3-post strategy for Instagram and TikTok profile 'Pinned Posts' to maximize conversion of new profile visitors?",
    options: [
      { id: "A", text: "Pin 3 funny memes from 2 years ago." },
      { id: "B", text: "Post 1: Brand Origin / Who You Are; Post 2: Top Social Proof / Customer Transformation; Post 3: Lead Magnet / Free Resource / Core Offer." },
      { id: "C", text: "Pin 3 pictures of the office lunch." },
      { id: "D", text: "Pinning posts disables profile follower buttons." }
    ],
    correctAnswer: "B",
    explanation: "The 3 pinned slots serve as the primary landing billboard: establishing identity, demonstrating proof of results, and providing a direct lead capture opportunity."
  },
  {
    id: 514,
    sectionId: "sec-smo",
    sectionName: "Instagram Collab & Shared Reach",
    difficulty: "INTERMEDIATE",
    marks: 2.0,
    penalty: 0.0,
    text: "How does Instagram's 'Invite Collaborator' feature enhance organic post distribution?",
    options: [
      { id: "A", text: "It allows both accounts to share the single post, displaying it simultaneously on both profile grids and combining all likes, views, and comments." },
      { id: "B", text: "It transfers account ownership to the collaborator." },
      { id: "C", text: "It creates two duplicate posts that compete against each other in the feed." },
      { id: "D", text: "It requires paying Meta an influencer commission fee." }
    ],
    correctAnswer: "A",
    explanation: "Collab posts show both creators in the header, pool the audiences of both accounts, and aggregate all engagement metrics onto one shared post."
  },
  {
    id: 515,
    sectionId: "sec-smo",
    sectionName: "Audience Timing & Posting Windows",
    difficulty: "INTERMEDIATE",
    marks: 2.0,
    penalty: 0.0,
    text: "How should social media teams determine the optimal time to publish organic content for their specific brand?",
    options: [
      { id: "A", text: "Always publish at midnight every day regardless of geography." },
      { id: "B", text: "Analyze native platform audience analytics for follower active hours and timezones, scheduling 15-30 minutes prior to peak online activity." },
      { id: "C", text: "Post only when the brand CEO is having breakfast." },
      { id: "D", text: "Timing has zero impact on social media algorithms." }
    ],
    correctAnswer: "B",
    explanation: "Publishing 15-30 minutes before your audience's daily active peak ensures your content is fresh in the feed as followers open their apps, maximizing initial engagement velocity."
  }
];

export const EXAM_TRACKS = [
  {
    id: "track-wordpress",
    courseId: "course-7",
    title: "WordPress Development & Web Architecture Certification",
    shortTitle: "WordPress",
    code: "OMC-CERT-WP-2026",
    category: "Web Architecture",
    categoryKey: "wordpress",
    badgeText: "Professional Certification",
    badgeColor: "bg-cyan-100 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300 border-cyan-300 dark:border-cyan-700",
    gradient: "from-cyan-600 to-blue-700",
    iconName: "Layout",
    description: "Assess WordPress server performance, Redis object caching, sub-2s mobile loading speeds, Elementor/Gutenberg DOM depth, and security hardening.",
    durationMinutes: 30,
    durationSeconds: 30 * 60,
    questionsCount: 15,
    passingScorePercent: 85,
    passingMarks: 25.5,
    totalMarks: 30,
    marksPerQuestion: 2.0,
    penaltyPerQuestion: 0.0,
    difficulty: "Advanced",
    skillsCovered: ["Redis Object Cache", "Sub-2s Web Vitals", "Gutenberg vs Elementor", "REST API Endpoints", "SSL & Database Security"],
    questionIds: [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115],
  },
  {
    id: "track-seo",
    courseId: "course-8",
    title: "Search Engine Optimization (SEO) Specialist Certification",
    shortTitle: "SEO",
    code: "OMC-CERT-SEO-2026",
    category: "Search & SEO",
    categoryKey: "seo",
    badgeText: "Specialist Certification",
    badgeColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700",
    gradient: "from-emerald-600 to-teal-700",
    iconName: "Globe",
    description: "Assess advanced technical crawl budget management, Core Web Vitals (LCP/CLS/INP), structured data JSON-LD, and faceted URL canonicalization architectures.",
    durationMinutes: 30,
    durationSeconds: 30 * 60,
    questionsCount: 15,
    passingScorePercent: 85,
    passingMarks: 25.5,
    totalMarks: 30,
    marksPerQuestion: 2.0,
    penaltyPerQuestion: 0.0,
    difficulty: "Advanced",
    skillsCovered: ["Core Web Vitals", "Crawl Budget", "Schema JSON-LD", "Canonicalization", "Server-Side Rendering"],
    questionIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  },
  {
    id: "track-google-ads",
    courseId: "course-6",
    title: "Google Ads (PPC) & Performance Marketing Certification",
    shortTitle: "Google Ads (PPC)",
    code: "OMC-CERT-GADS-2026",
    category: "Paid Advertising",
    categoryKey: "google-ads",
    badgeText: "Performance Certification",
    badgeColor: "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300 dark:border-amber-700",
    gradient: "from-amber-500 to-orange-600",
    iconName: "Target",
    description: "Validate Smart Bidding algorithms, Performance Max (PMax) asset allocation, portfolio target ROAS scaling, and search query match type architecture.",
    durationMinutes: 30,
    durationSeconds: 30 * 60,
    questionsCount: 15,
    passingScorePercent: 85,
    passingMarks: 25.5,
    totalMarks: 30,
    marksPerQuestion: 2.0,
    penaltyPerQuestion: 0.0,
    difficulty: "Advanced",
    skillsCovered: ["Smart Bidding", "PMax Asset Groups", "Target ROAS Scaling", "Search Attribution", "Audience Signals"],
    questionIds: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
  },
  {
    id: "track-graphic-design",
    courseId: "course-4",
    title: "Graphic Designing (Canva) & Visual Brand Communication Certification",
    shortTitle: "Graphic Designing (Canva)",
    code: "OMC-CERT-DES-2026",
    category: "Creative Designing",
    categoryKey: "graphic-design",
    badgeText: "Design Certification",
    badgeColor: "bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-950/60 dark:text-fuchsia-300 border-fuchsia-300 dark:border-fuchsia-700",
    gradient: "from-fuchsia-600 via-pink-600 to-rose-600",
    iconName: "Palette",
    description: "Validate Canva brand kits, digital design principles, WCAG 2.2 accessibility, responsive 8pt layout grids, and high-conversion ad creative production.",
    durationMinutes: 30,
    durationSeconds: 30 * 60,
    questionsCount: 15,
    passingScorePercent: 85,
    passingMarks: 25.5,
    totalMarks: 30,
    marksPerQuestion: 2.0,
    penaltyPerQuestion: 0.0,
    difficulty: "Intermediate / Advanced",
    skillsCovered: ["Canva Brand Kits", "WCAG 2.2 Contrast", "8pt Grid Architecture", "Display Ad Creatives", "Vector & WebP Pipeline"],
    questionIds: [201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215],
  },
  {
    id: "track-smm",
    courseId: "course-1",
    title: "Social Media Marketing (SMM) Strategy & Paid Ads Certification",
    shortTitle: "SMM",
    code: "OMC-CERT-SMM-2026",
    category: "Social Media",
    categoryKey: "smm",
    badgeText: "Marketing Certification",
    badgeColor: "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-300 dark:border-rose-700",
    gradient: "from-rose-500 to-pink-600",
    iconName: "Share2",
    description: "Demonstrate omnichannel performance funnels, vertical short-form video retention dynamics, Meta/LinkedIn paid campaign scaling, and crisis ORM containment.",
    durationMinutes: 30,
    durationSeconds: 30 * 60,
    questionsCount: 15,
    passingScorePercent: 85,
    passingMarks: 25.5,
    totalMarks: 30,
    marksPerQuestion: 2.0,
    penaltyPerQuestion: 0.0,
    difficulty: "Intermediate / Advanced",
    skillsCovered: ["Meta & LinkedIn Paid Ads", "Performance Funnels", "9:16 Video Hooks", "Algorithmic Discovery", "Crisis Containment"],
    questionIds: [46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
  },
  {
    id: "track-ai-prompt",
    courseId: "course-3",
    title: "AI in DM & Generative AI - Prompt Engineering Certification",
    shortTitle: "AI in DM & Generative AI - Prompt Engineering",
    code: "OMC-CERT-AI-2026",
    category: "Artificial Intelligence",
    categoryKey: "ai-prompt",
    badgeText: "AI Specialist Certification",
    badgeColor: "bg-violet-100 text-violet-800 dark:bg-violet-950/60 dark:text-violet-300 border-violet-300 dark:border-violet-700",
    gradient: "from-violet-600 via-purple-600 to-indigo-700",
    iconName: "Sparkles",
    description: "Evaluate Generative AI models in digital marketing, multi-turn prompt engineering frameworks, temperature/top_p tuning, autonomous marketing agents, and AI hallucination guardrails.",
    durationMinutes: 30,
    durationSeconds: 30 * 60,
    questionsCount: 15,
    passingScorePercent: 85,
    passingMarks: 25.5,
    totalMarks: 30,
    marksPerQuestion: 2.0,
    penaltyPerQuestion: 0.0,
    difficulty: "Advanced",
    skillsCovered: ["Prompt Frameworks (RTF/CREATE)", "Few-Shot & Chain-of-Thought", "AI Hallucination Guardrails", "Temperature & Top_p", "Marketing Automation Agents"],
    questionIds: [301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315],
  },
  {
    id: "track-video-editing",
    courseId: "course-3",
    title: "Video Editing & Short-Form Motion Design Certification",
    shortTitle: "Video Editing",
    code: "OMC-CERT-VID-2026",
    category: "Video Production",
    categoryKey: "video-editing",
    badgeText: "Production Certification",
    badgeColor: "bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300 border-red-300 dark:border-red-700",
    gradient: "from-red-500 via-rose-600 to-orange-600",
    iconName: "Film",
    description: "Assess high-retention short-form video pacing, Premiere Pro & CapCut timeline workflows, B-roll overlays, audio ducking, color LUT grading, and 9:16 export encoding.",
    durationMinutes: 30,
    durationSeconds: 30 * 60,
    questionsCount: 15,
    passingScorePercent: 85,
    passingMarks: 25.5,
    totalMarks: 30,
    marksPerQuestion: 2.0,
    penaltyPerQuestion: 0.0,
    difficulty: "Intermediate / Advanced",
    skillsCovered: ["9:16 Retention Hooks", "Jump Cuts & B-Roll", "Audio Ducking & -14 LUFS", "Color Grading & LUTs", "H.264 / ProRes Encoding"],
    questionIds: [401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415],
  },
  {
    id: "track-smo",
    courseId: "course-1",
    title: "Social Media Optimization (SMO) & Organic Growth Certification",
    shortTitle: "SMO",
    code: "OMC-CERT-SMO-2026",
    category: "Organic Social",
    categoryKey: "smo",
    badgeText: "Optimization Certification",
    badgeColor: "bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300 border-sky-300 dark:border-sky-700",
    gradient: "from-sky-500 via-blue-600 to-indigo-600",
    iconName: "TrendingUp",
    description: "Validate profile optimization architectures, bio conversion funnels, algorithmic watch time metrics, hashtag & keyword indexing on Instagram/YouTube/LinkedIn, and community engagement loops.",
    durationMinutes: 30,
    durationSeconds: 30 * 60,
    questionsCount: 15,
    passingScorePercent: 85,
    passingMarks: 25.5,
    totalMarks: 30,
    marksPerQuestion: 2.0,
    penaltyPerQuestion: 0.0,
    difficulty: "Intermediate / Advanced",
    skillsCovered: ["Profile Funnel Optimization", "Algorithmic Dwell Time", "Hashtag & Keyword SEO", "Viral Hook Engineering", "Community Engagement Loops"],
    questionIds: [501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511, 512, 513, 514, 515],
  },
];

export const ALL_QUESTIONS_MAP = {};
[
  ...EXAM_QUESTIONS,
  ...WORDPRESS_QUESTIONS,
  ...CREATIVE_QUESTIONS,
  ...AI_PROMPT_QUESTIONS,
  ...VIDEO_EDITING_QUESTIONS,
  ...SMO_QUESTIONS,
].forEach((q) => {
  ALL_QUESTIONS_MAP[q.id] = q;
});

/**
 * Returns curated questions list for a selected track.
 * Questions are cleanly mapped and sequentially renumbered for the student test session.
 */
export const getQuestionsForTrack = (trackId) => {
  const track = EXAM_TRACKS.find((t) => t.id === trackId) || EXAM_TRACKS[0];
  const list = track.questionIds
    .map((qId) => ALL_QUESTIONS_MAP[qId])
    .filter(Boolean);

  return list.map((q, idx) => ({
    ...q,
    displayNumber: idx + 1,
  }));
};
