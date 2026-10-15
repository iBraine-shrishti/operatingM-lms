import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldAlert,
  AlertTriangle,
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Monitor,
  Wifi,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Lock,
  FileText,
  RefreshCw,
  Award,
  Download,
  ArrowLeft,
  Eye,
  Info,
  BadgeAlert,
  Flame,
  Check,
  ShieldCheck,
  GraduationCap,
  Grid,
  X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { mapStudentDataFromCrm } from "../components/profile";
import profilePic from "../assets/profile-pic.png";

// ============================================================================
// 60 HIGH-DIFFICULTY REALISTIC TECHNICAL EXAMINATION QUESTIONS
// Categorized into 4 Advanced Domains (+2.00 Marks / -0.67 Penalty)
// ============================================================================
const EXAM_SECTIONS = [
  { id: "sec-1", name: "Domain 1: Advanced Technical SEO & Web Vitals", count: 15 },
  { id: "sec-2", name: "Domain 2: Google Ads Bidding & Smart Architecture", count: 15 },
  { id: "sec-3", name: "Domain 3: GA4 Measurement, BigQuery & Attribution", count: 15 },
  { id: "sec-4", name: "Domain 4: Performance Funnels & Crisis ORM Scenarios", count: 15 },
];

const EXAM_QUESTIONS = [
  // ---------------- DOMAIN 1: SEO & Web Vitals (Q1 - Q15) ----------------
  {
    id: 1,
    sectionId: "sec-1",
    sectionName: "Technical SEO & Schema",
    difficulty: "CRITICAL",
    marks: 2.0,
    penalty: 0.67,
    text: "A large enterprise e-commerce platform has 450,000 faceted filter URLs resulting in crawl budget exhaustion. The engineering team proposes using 'Disallow: /*?*' in robots.txt vs. 'noindex, follow' meta tags. What is the definitive crawl & indexation outcome if 'Disallow' is implemented?",
    options: [
      { id: "A", text: "Googlebot will still crawl the URLs to read the canonical tag, but won't index them." },
      { id: "B", text: "Googlebot ceases crawling immediately, but existing indexed URLs may remain in the SERP as bare links without snippets if linked externally." },
      { id: "C", text: "Googlebot will automatically transfer PageRank from disallowed URLs to the parent category without delay." },
      { id: "D", text: "Disallow forces an automatic 410 Gone status code on all parameter requests." },
    ],
    correctAnswer: "B",
    explanation: "Robots.txt Disallow stops crawling but does NOT prevent indexation if external links exist. Google will show the URL without snippet information.",
  },
  {
    id: 2,
    sectionId: "sec-1",
    sectionName: "Technical SEO & Schema",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.67,
    text: "During Core Web Vitals optimization, you identify an Interaction to Next Paint (INP) score of 420ms on mobile product pages caused by extensive Long Animation Frames (LoAF). Which mitigation strategy directly targets the main-thread execution bottleneck?",
    options: [
      { id: "A", text: "Preload the primary hero webp banner using fetchpriority='high'." },
      { id: "B", text: "Break long tasks using scheduler.yield() or setTimeout() into micro-tasks and defer non-essential third-party event listeners." },
      { id: "C", text: "Convert CSS animations from opacity/transform to margin-left transitions." },
      { id: "D", text: "Implement HTTP/2 Server Push for all render-blocking stylesheet files." },
    ],
    correctAnswer: "B",
    explanation: "Breaking long tasks via scheduler.yield() allows the main thread to process user input events rapidly, reducing INP input delay.",
  },
  {
    id: 3,
    sectionId: "sec-1",
    sectionName: "Technical SEO & Schema",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.67,
    text: "Which JSON-LD Structured Data schema syntax correctly configures a Course Instance with multi-session physical venue and instructor entity nesting according to Schema.org standards?",
    options: [
      { id: "A", text: "Using '@type': 'Course' with embedded 'hasCourseInstance' pointing to 'CourseInstance' containing 'location' Place entity." },
      { id: "B", text: "Declaring '@type': 'WebPage' with attribute 'courseName' and 'instructorName' as plaintext arrays." },
      { id: "C", text: "Combining 'Product' with 'OfferCatalog' and overriding the name with course metadata." },
      { id: "D", text: "Using Microformats class='vcalendar-course' instead of script tag embedding." },
    ],
    correctAnswer: "A",
    explanation: "Schema.org standards mandate '@type': 'Course' with 'hasCourseInstance' linking to the specific course delivery instance.",
  },
  {
    id: 4,
    sectionId: "sec-1",
    sectionName: "Technical SEO & Schema",
    difficulty: "CRITICAL",
    marks: 2.0,
    penalty: 0.67,
    text: "A site migration from HTTP to HTTPS results in self-referential canonicals on HTTP URLs and 302 temporary redirects pointing to HTTPS. Google continues serving HTTP in SERPs after 6 weeks. What is the root algorithmic cause?",
    options: [
      { id: "A", text: "Google ignores 302 redirects completely and treats them as 404 errors." },
      { id: "B", text: "The combination of 302 temporary redirect and conflicting HTTP self-canonical signals to Googlebot that the move is temporary, preventing canonical consolidation to HTTPS." },
      { id: "C", text: "The XML sitemap must only contain HTTP URLs for 12 months after migration." },
      { id: "D", text: "The SSL certificate provider must be registered directly in Google Search Console." },
    ],
    correctAnswer: "B",
    explanation: "302 indicates temporary move and self-referential canonicals reaffirm HTTP as authoritative, contradicting the migration signal.",
  },
  {
    id: 5,
    sectionId: "sec-1",
    sectionName: "Technical SEO & Schema",
    difficulty: "MEDIUM",
    marks: 2.0,
    penalty: 0.67,
    text: "What HTTP header must be returned to prevent Google from indexing a confidential PDF asset while permitting search bots to follow links embedded within it?",
    options: [
      { id: "A", text: "X-Robots-Tag: noindex, follow" },
      { id: "B", text: "Robots: none" },
      { id: "C", text: "Content-Security-Policy: disallow-google" },
      { id: "D", text: "Cache-Control: private, no-store" },
    ],
    correctAnswer: "A",
    explanation: "X-Robots-Tag in HTTP header supports 'noindex, follow' on non-HTML assets like PDF and DOCX files.",
  },
  {
    id: 6,
    sectionId: "sec-1",
    sectionName: "Technical SEO & Schema",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.67,
    text: "When implementing hreflang annotations across 5 international language-country variations, what happens if page A references page B with 'hreflang=\"es-ES\"' but page B omits the return annotation to page A?",
    options: [
      { id: "A", text: "Google will automatically infer the reciprocal relationship after 7 days." },
      { id: "B", text: "The bidirectional relationship is broken; Googlebot will disregard the hreflang annotation for both pages due to missing reciprocal confirmation." },
      { id: "C", text: "Google penalizes the entire domain for doorway manipulation." },
      { id: "D", text: "Only the Spanish URL will be indexed while English is deindexed." },
    ],
    correctAnswer: "B",
    explanation: "Hreflang requires strict bidirectional confirmation. If the target page does not reciprocate the annotation, Googlebot ignores it.",
  },
  {
    id: 7,
    sectionId: "sec-1",
    sectionName: "Technical SEO & Schema",
    difficulty: "CRITICAL",
    marks: 2.0,
    penalty: 0.67,
    text: "In Server-Side Rendering (SSR) vs. Dynamic Rendering for client-heavy React apps, what is Google's current official stance regarding Dynamic Rendering as a long-term solution?",
    options: [
      { id: "A", text: "Dynamic rendering is mandatory for all websites above 10,000 pages." },
      { id: "B", text: "Google considers dynamic rendering a temporary workaround and strongly recommends SSR, SSG, or hydration architectures." },
      { id: "C", text: "Dynamic rendering is considered cloaking and triggers a manual action penalty." },
      { id: "D", text: "Google no longer supports JavaScript rendering on smartphones." },
    ],
    correctAnswer: "B",
    explanation: "Google updated documentation stating dynamic rendering is a temporary deprecated workaround, advocating SSR/SSG instead.",
  },
  {
    id: 8,
    sectionId: "sec-1",
    sectionName: "Technical SEO & Schema",
    difficulty: "MEDIUM",
    marks: 2.0,
    penalty: 0.67,
    text: "Which Cumulative Layout Shift (CLS) sub-metric issue occurs when web fonts swap from fallback system font to custom webfont without font-display metric matching?",
    options: [
      { id: "A", text: "FOIT / FOUT inducing layout shift by altering text bounding box line wraps" },
      { id: "B", text: "Excessive DOM size warning (> 1,500 nodes)" },
      { id: "C", text: "First Contentful Paint (FCP) timeout" },
      { id: "D", text: "CSSOM blocking time degradation" },
    ],
    correctAnswer: "A",
    explanation: "Flash of Unstyled/Invisible Text causes abrupt reflows and text line wrapping shifts, directly driving CLS scores above 0.1.",
  },
  {
    id: 9,
    sectionId: "sec-1",
    sectionName: "Technical SEO & Schema",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.67,
    text: "What regex expression in Google Search Console URL filter captures all URLs containing 'product' followed by a 4 to 6 digit numeric SKU without query parameters?",
    options: [
      { id: "A", text: ".*product-[0-9]{4,6}$" },
      { id: "B", text: "product\\d*" },
      { id: "C", text: "^product.*[0-9]" },
      { id: "D", text: "product:num(4-6)" },
    ],
    correctAnswer: "A",
    explanation: "'.*product-[0-9]{4,6}$' precisely matches the path segment followed by 4 to 6 digits ending before query parameters.",
  },
  {
    id: 10,
    sectionId: "sec-1",
    sectionName: "Technical SEO & Schema",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.67,
    text: "When Google discovers a URL with conflicting directives: robots meta tag 'noindex' AND rel='canonical' pointing to an indexable URL B, what does Googlebot do?",
    options: [
      { id: "A", text: "It indexes both pages as identical duplicates." },
      { id: "B", text: "The 'noindex' takes precedence: the page is deindexed and Googlebot typically ignores the canonical signal to URL B." },
      { id: "C", text: "The canonical overrides the noindex automatically." },
      { id: "D", text: "The site is flagged for cloaking violations." },
    ],
    correctAnswer: "B",
    explanation: "Noindex prevents indexation and stops canonical signal consolidation because Googlebot cannot treat a noindexed page as an authoritative canonical source.",
  },
  {
    id: 11,
    sectionId: "sec-1",
    sectionName: "Technical SEO & Schema",
    difficulty: "MEDIUM",
    marks: 2.0,
    penalty: 0.67,
    text: "Which HTTP status code communicates to search engines that an endpoint is permanently removed and should be purged from the index faster than a standard 404?",
    options: [
      { id: "A", text: "410 Gone" },
      { id: "B", text: "403 Forbidden" },
      { id: "C", text: "307 Temporary Redirect" },
      { id: "D", text: "429 Too Many Requests" },
    ],
    correctAnswer: "A",
    explanation: "410 Gone explicitly tells search spiders the asset is intentionally and permanently deleted, speeding up index de-listing.",
  },
  {
    id: 12,
    sectionId: "sec-1",
    sectionName: "Technical SEO & Schema",
    difficulty: "CRITICAL",
    marks: 2.0,
    penalty: 0.67,
    text: "A webmaster notices that server logs show 10,000 daily Googlebot smartphone hits on URLs appended with session IDs 'sid=xyz'. What parameter handling configuration in robots.txt preserves crawl efficiency?",
    options: [
      { id: "A", text: "Disallow: /*?*sid=" },
      { id: "B", text: "Allow: /session/" },
      { id: "C", text: "Noindex: /*?*sid=" },
      { id: "D", text: "Crawl-delay: 10" },
    ],
    correctAnswer: "A",
    explanation: "'Disallow: /*?*sid=' blocks Googlebot from requesting any URL containing the session ID parameter, saving crawl budget.",
  },
  {
    id: 13,
    sectionId: "sec-1",
    sectionName: "Technical SEO & Schema",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.67,
    text: "What is the primary architectural vulnerability of implementing pagination via infinite scroll without pushState URL updates for search engine crawlers?",
    options: [
      { id: "A", text: "Crawlers do not scroll or trigger JavaScript DOM wheel events, rendering items beyond page 1 completely undiscoverable." },
      { id: "B", text: "Infinite scroll invalidates schema markup on all pages." },
      { id: "C", text: "Server automatically issues 500 error to user agents without cookies." },
      { id: "D", text: "It doubles server bandwidth consumption unnecessarily." },
    ],
    correctAnswer: "A",
    explanation: "Googlebot does not simulate scroll or user gesture interactions. Without paginated URLs or pushState endpoints, infinite content is invisible.",
  },
  {
    id: 14,
    sectionId: "sec-1",
    sectionName: "Technical SEO & Schema",
    difficulty: "MEDIUM",
    marks: 2.0,
    penalty: 0.67,
    text: "Which link attribute should be applied to affiliate and sponsored referral hyperlinks according to Google Search Central guidelines?",
    options: [
      { id: "A", text: "rel='sponsored' (or rel='nofollow sponsored')" },
      { id: "B", text: "rel='ugc'" },
      { id: "C", text: "rel='author'" },
      { id: "D", text: "rel='external-trusted'" },
    ],
    correctAnswer: "A",
    explanation: "Google mandates rel='sponsored' for commercial/affiliate compensation links to avoid link-scheme manual actions.",
  },
  {
    id: 15,
    sectionId: "sec-1",
    sectionName: "Technical SEO & Schema",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.67,
    text: "Under the Helpful Content System (HCS) component of Google's core ranking algorithm, how does sitewide low-quality content affect high-quality, original pages on the same domain?",
    options: [
      { id: "A", text: "HCS evaluates pages exclusively in isolation; there is zero sitewide signal spillover." },
      { id: "B", text: "HCS applies a sitewide classifier signal that dampens organic rankings for the entire domain, including superior pages, until unhelpful content is pruned." },
      { id: "C", text: "It causes an immediate manual penalty in Google Search Console." },
      { id: "D", text: "It merely lowers Google Ads Quality Score by 1 point." },
    ],
    correctAnswer: "B",
    explanation: "Google HCS is primarily a sitewide classifier: substantial unhelpful content drags down the ranking capability of otherwise quality pages.",
  },

  // ---------------- DOMAIN 2: Google Ads & Smart Bidding (Q16 - Q30) ----------------
  {
    id: 16,
    sectionId: "sec-2",
    sectionName: "Google Ads & Bidding",
    difficulty: "CRITICAL",
    marks: 2.0,
    penalty: 0.67,
    text: "A campaign running on Target ROAS (tROAS) bidding has a target of 450%. If conversion tracking drops 40% of conversion values due to an iOS consent banner script failure, what will the Smart Bidding algorithm do over the subsequent 7 days?",
    options: [
      { id: "A", text: "It will increase bids aggressively to capture more volume." },
      { id: "B", text: "It perceives that actual ROAS has plummeted below target, causing it to sharply suppress bids and throttle impression volume to restore target efficiency." },
      { id: "C", text: "It automatically switches the strategy to Maximize Clicks." },
      { id: "D", text: "It resets the Quality Score of all keywords to 1." },
    ],
    correctAnswer: "B",
    explanation: "tROAS algorithms bid down when reported conversion value drops, assuming current traffic is unprofitable relative to the 450% target.",
  },
  {
    id: 17,
    sectionId: "sec-2",
    sectionName: "Google Ads & Bidding",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.67,
    text: "In Google Ads Performance Max (PMax) campaigns, which exclusion mechanism is required to prevent branded search queries from consuming non-branded incremental budget?",
    options: [
      { id: "A", text: "Adding brand terms to campaign-level negative keyword list directly in standard UI without account list." },
      { id: "B", text: "Applying an Account-Level Brand Exclusion List or creating a Campaign-Level Brand Exclusion via Campaign Settings." },
      { id: "C", text: "Pausing text assets inside the Asset Group." },
      { id: "D", text: "Lowering Target CPA to ₹50." },
    ],
    correctAnswer: "B",
    explanation: "Brand Exclusion lists specifically stop PMax from bidding on brand search terms while maintaining prospecting inventory reach.",
  },
  {
    id: 18,
    sectionId: "sec-2",
    sectionName: "Google Ads & Bidding",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.67,
    text: "An agency manages an account spending ₹25,00,000/month. Ad Rank formula in Google Ads auction is governed by which exact relationship?",
    options: [
      { id: "A", text: "Ad Rank = Max CPC Bid × Quality Score" },
      { id: "B", text: "Ad Rank = f(Max CPC Bid, Quality Score, Expected CTR, Ad Relevance, Landing Page Experience, and Context & Ad Assets format impact)" },
      { id: "C", text: "Ad Rank = Total Account Spend ÷ Competitor Bid" },
      { id: "D", text: "Ad Rank = Historical Conversion Rate × Click Volume" },
    ],
    correctAnswer: "B",
    explanation: "Modern Ad Rank incorporates auction-time bid, the components of QS, auction context, and expected impact of ad assets/formats.",
  },
  {
    id: 19,
    sectionId: "sec-2",
    sectionName: "Google Ads & Bidding",
    difficulty: "MEDIUM",
    marks: 2.0,
    penalty: 0.67,
    text: "What is the critical calculation formula for Return On Ad Spend (ROAS)?",
    options: [
      { id: "A", text: "ROAS = (Total Revenue from Ads ÷ Total Ad Spend) × 100%" },
      { id: "B", text: "ROAS = (Net Profit - Ad Spend) ÷ Total Ad Spend" },
      { id: "C", text: "ROAS = (Total Clicks × Average CPC) ÷ Conversions" },
      { id: "D", text: "ROAS = (Lifetime Value ÷ Customer Acquisition Cost)" },
    ],
    correctAnswer: "A",
    explanation: "ROAS is gross revenue generated from advertising divided by total advertising cost, expressed as a ratio or percentage.",
  },
  {
    id: 20,
    sectionId: "sec-2",
    sectionName: "Google Ads & Bidding",
    difficulty: "CRITICAL",
    marks: 2.0,
    penalty: 0.67,
    text: "If a keyword with Exact Match [digital marketing courses] receives a search query for 'best digital marketing courses in mumbai', under current Google Ads match type behavior, will the exact match keyword trigger the ad?",
    options: [
      { id: "A", text: "Yes, exact match now triggers for any phrase that shares semantic topic." },
      { id: "B", text: "No, because the query adds location and superlative modifiers that change the specific intent, matching Phrase or Broad match instead unless close variant intent matches exactly." },
      { id: "C", text: "Yes, exact match functions identically to broad match since 2022." },
      { id: "D", text: "No, exact match only triggers if punctuation is included in search." },
    ],
    correctAnswer: "B",
    explanation: "Exact match matches identical meaning or close variants. Substantial qualifiers like 'best' and 'in mumbai' differ in syntactic specificity.",
  },
  {
    id: 21,
    sectionId: "sec-2",
    sectionName: "Google Ads & Bidding",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.67,
    text: "What is the primary function of Google Ads Enhanced Conversions for Web?",
    options: [
      { id: "A", text: "To generate AI ad copy automatically based on landing page text." },
      { id: "B", text: "To send hashed first-party customer data (SHA-256 email/phone) at the conversion point to recover lost conversions caused by third-party cookie restrictions." },
      { id: "C", text: "To increase daily budget by 20% on weekends." },
      { id: "D", text: "To bid exclusively on Google Display Network." },
    ],
    correctAnswer: "B",
    explanation: "Enhanced Conversions hashes user data securely to match with signed-in Google accounts, repairing cross-device attribution gaps.",
  },
  {
    id: 22,
    sectionId: "sec-2",
    sectionName: "Google Ads & Bidding",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.67,
    text: "A B2B SaaS company has a 90-day sales cycle. Which conversion attribution lookback window configuration is most appropriate to ensure Smart Bidding assigns value to top-of-funnel discovery campaigns?",
    options: [
      { id: "A", text: "7-day click-through, 1-day view-through" },
      { id: "B", text: "90-day click-through lookback window using Data-Driven Attribution (DDA)" },
      { id: "C", text: "30-day Last Click attribution" },
      { id: "D", text: "1-day engaged view" },
    ],
    correctAnswer: "B",
    explanation: "A 90-day window matches the sales cycle and DDA distributes fractional credit across touchpoints, preventing top-of-funnel starvation.",
  },
  {
    id: 23,
    sectionId: "sec-2",
    sectionName: "Google Ads & Bidding",
    difficulty: "MEDIUM",
    marks: 2.0,
    penalty: 0.67,
    text: "When should you apply a Bid Adjustment in a Google Ads campaign operating under 'Maximize Conversions with Target CPA'?",
    options: [
      { id: "A", text: "Device bid adjustments will modify the Target CPA target itself rather than raw bids (except -100% which disables device)." },
      { id: "B", text: "Bid adjustments are completely ignored in Target CPA and have zero effect." },
      { id: "C", text: "Target CPA will automatically multiply budgets by the adjustment factor." },
      { id: "D", text: "Adjustments only function on Search Partners." },
    ],
    correctAnswer: "A",
    explanation: "In Target CPA, device adjustments modify the CPA target (e.g. +20% adjustment turns a ₹500 CPA into ₹600 CPA target for that device). -100% shuts it off.",
  },
  {
    id: 24,
    sectionId: "sec-2",
    sectionName: "Google Ads & Bidding",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.67,
    text: "What occurs when an advertiser enables 'Final URL Expansion' inside a Performance Max campaign without URL exclusions?",
    options: [
      { id: "A", text: "Google will only send traffic to the exact Final URL specified in the asset group." },
      { id: "B", text: "Google replaces the Final URL with more relevant landing pages on your domain based on user search query and generates dynamic headlines." },
      { id: "C", text: "The campaign expands to competitors' websites." },
      { id: "D", text: "It converts search ads into YouTube shorts ads." },
    ],
    correctAnswer: "B",
    explanation: "Final URL Expansion functions like Dynamic Search Ads: it directs traffic to relevant content across your whole site unless explicitly excluded.",
  },
  {
    id: 25,
    sectionId: "sec-2",
    sectionName: "Google Ads & Bidding",
    difficulty: "MEDIUM",
    marks: 2.0,
    penalty: 0.67,
    text: "What is the consequence of changing a campaign's daily budget from ₹2,000 to ₹10,000 in a single edit while in the Smart Bidding learning phase?",
    options: [
      { id: "A", text: "The bid strategy remains completely stable without restarting learning." },
      { id: "B", text: "It triggers a substantial bid-strategy reset, causing auction volatility and potential performance degradation as models recalibrate." },
      { id: "C", text: "Google Ads rejects any budget increase greater than 50%." },
      { id: "D", text: "The account is suspended for suspicious billing activity." },
    ],
    correctAnswer: "B",
    explanation: "Budget changes greater than 20-30% shock the bidding algorithm and restart the machine learning calibration window.",
  },
  {
    id: 26,
    sectionId: "sec-2",
    sectionName: "Google Ads & Bidding",
    difficulty: "CRITICAL",
    marks: 2.0,
    penalty: 0.67,
    text: "An e-commerce store with 2,000 products experiences high ad spend on low-margin clearance items in PMax. What Merchant Center custom label architecture solves this?",
    options: [
      { id: "A", text: "Use Custom Label 0 to tag margin tiers (High, Medium, Low) and segment PMax campaigns by profit margin." },
      { id: "B", text: "Delete low-margin items from the product feed completely." },
      { id: "C", text: "Set price equal to ₹0 in Merchant Center." },
      { id: "D", text: "Lower product shipping weights to alter ad delivery." },
    ],
    correctAnswer: "A",
    explanation: "Custom labels allow filtering and campaign segmentation based on profit margins, enabling aggressive bidding on high-margin inventory.",
  },
  {
    id: 27,
    sectionId: "sec-2",
    sectionName: "Google Ads & Bidding",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.67,
    text: "In Google Ads auction insights, what does 'Outranking Share' represent?",
    options: [
      { id: "A", text: "The percentage of times your ad ranked higher than another competitor's ad in the auction, or showed when theirs did not." },
      { id: "B", text: "The percentage of auctions where you bid more money than your competitor." },
      { id: "C", text: "The market share of total industry clicks." },
      { id: "D", text: "The total number of impressions won on YouTube." },
    ],
    correctAnswer: "A",
    explanation: "Outranking share indicates how often your ad appeared higher in auction or appeared when the competitor's ad failed to enter the auction.",
  },
  {
    id: 28,
    sectionId: "sec-2",
    sectionName: "Google Ads & Bidding",
    difficulty: "MEDIUM",
    marks: 2.0,
    penalty: 0.67,
    text: "What is the maximum number of Responsive Search Ad (RSA) pinned headlines recommended by Google when testing ad strength?",
    options: [
      { id: "A", text: "Pin all 15 headlines to position 1." },
      { id: "B", text: "Unpinned is recommended for maximum combinatorial machine learning optimization; pin sparingly only for strict legal/compliance requirements." },
      { id: "C", text: "Exactly 10 pins are mandatory." },
      { id: "D", text: "RSAs do not support pinning." },
    ],
    correctAnswer: "B",
    explanation: "Over-pinning restricts the algorithm's ability to test combinations for individual query intent, lowering Ad Strength and reach.",
  },
  {
    id: 29,
    sectionId: "sec-2",
    sectionName: "Google Ads & Bidding",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.67,
    text: "How does Google Consent Mode v2 impact ad targeting for European Economic Area (EEA) users if 'ad_user_data' is set to 'denied'?",
    options: [
      { id: "A", text: "User data cannot be sent to Google for advertising purposes, disabling remarketing audience list creation and customer match targeting for that user." },
      { id: "B", text: "Ads are completely blocked from showing on Google." },
      { id: "C", text: "The website domain is de-indexed from Google Search." },
      { id: "D", text: "All bids are doubled automatically." },
    ],
    correctAnswer: "A",
    explanation: "Consent Mode v2 enforces 'ad_user_data' and 'ad_personalization'. If denied, personal data cannot power audience lists or personalized ads.",
  },
  {
    id: 30,
    sectionId: "sec-2",
    sectionName: "Google Ads & Bidding",
    difficulty: "CRITICAL",
    marks: 2.0,
    penalty: 0.67,
    text: "If Campaign A has a Daily Budget of ₹5,000, what is the maximum amount Google Ads can charge on any single calendar day due to dynamic overdelivery?",
    options: [
      { id: "A", text: "Exactly ₹5,000" },
      { id: "B", text: "Up to 2x the daily budget (₹10,000), capped at 30.4x the daily budget across a full calendar month billing cycle." },
      { id: "C", text: "Unlimited until credit card threshold is reached" },
      { id: "D", text: "Up to 1.2x (₹6,000)" },
    ],
    correctAnswer: "B",
    explanation: "Google Ads can spend up to 2x daily budget on high-traffic days, but will never exceed monthly charging limit of 30.4 × Daily Budget.",
  },

  // ---------------- DOMAIN 3: GA4 & BigQuery Analytics (Q31 - Q45) ----------------
  {
    id: 31,
    sectionId: "sec-3",
    sectionName: "GA4, BigQuery & Attribution",
    difficulty: "CRITICAL",
    marks: 2.0,
    penalty: 0.67,
    text: "In Google Analytics 4 (GA4), how is a 'Session' technically instantiated compared to Universal Analytics (UA)?",
    options: [
      { id: "A", text: "Through a hit-type 'pageview' that resets automatically at midnight regardless of activity." },
      { id: "B", text: "Via the 'session_start' event triggered when a user engages the app/site, generating a 'ga_session_id' parameter that persists until 30 minutes of inactivity (no midnight reset)." },
      { id: "C", text: "Sessions are calculated only on the server after 24 hours." },
      { id: "D", text: "By tracking browser cookie expiration exclusively." },
    ],
    correctAnswer: "B",
    explanation: "GA4 sessions are event-driven: 'session_start' creates a timestamped 'ga_session_id'. Unlike UA, sessions do NOT reset at midnight.",
  },
  {
    id: 32,
    sectionId: "sec-3",
    sectionName: "GA4, BigQuery & Attribution",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.67,
    text: "When exporting raw GA4 events to Google BigQuery, what BigQuery SQL function un-nests repeated event parameters like 'page_location' from the RECORD schema?",
    options: [
      { id: "A", text: "FLATTEN(event_params)" },
      { id: "B", text: "CROSS JOIN UNNEST(event_params) AS ep WHERE ep.key = 'page_location'" },
      { id: "C", text: "SPLIT(event_params, ',')" },
      { id: "D", text: "GROUP BY event_params.page_location" },
    ],
    correctAnswer: "B",
    explanation: "GA4 event parameters are stored as repeated STRUCT arrays. 'UNNEST(event_params)' is mandatory in BigQuery SQL to extract keys and values.",
  },
  {
    id: 33,
    sectionId: "sec-3",
    sectionName: "GA4, BigQuery & Attribution",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.67,
    text: "What criteria defines an 'Engaged Session' in standard GA4 reporting?",
    options: [
      { id: "A", text: "A session lasting > 10 seconds, OR containing 2 or more page/screen views, OR having 1 or more key events (conversions)." },
      { id: "B", text: "A session where user clicked at least 5 links." },
      { id: "C", text: "A session where user submitted a payment form." },
      { id: "D", text: "Any session from a desktop computer." },
    ],
    correctAnswer: "A",
    explanation: "GA4 defines engaged session by: duration >= 10s (configurable to 60s), OR 2+ pageviews, OR at least 1 conversion event.",
  },
  {
    id: 34,
    sectionId: "sec-3",
    sectionName: "GA4, BigQuery & Attribution",
    difficulty: "MEDIUM",
    marks: 2.0,
    penalty: 0.67,
    text: "What is the consequence of 'Thresholding' applied in standard GA4 exploration reports?",
    options: [
      { id: "A", text: "Reports delete data older than 2 months permanently." },
      { id: "B", text: "Data is withheld from reports when user counts are low to prevent inferring the individual identity of users when Google Signals is enabled." },
      { id: "C", text: "The daily quota of BigQuery export has been exceeded." },
      { id: "D", text: "The account has received a copyright strike." },
    ],
    correctAnswer: "B",
    explanation: "Google Signals thresholding hides low-cardinality rows to prevent reverse-engineering individual user identities.",
  },
  {
    id: 35,
    sectionId: "sec-3",
    sectionName: "GA4, BigQuery & Attribution",
    difficulty: "CRITICAL",
    marks: 2.0,
    penalty: 0.67,
    text: "Which User-ID feature requirement is mandatory in GA4 to ensure cross-platform deterministic tracking across mobile app and web?",
    options: [
      { id: "A", text: "User-ID must contain plaintext email addresses for Google validation." },
      { id: "B", text: "Reporting Identity must be set to 'Blended' (or 'Observed') and custom alphanumeric non-PII identifiers assigned upon authentication." },
      { id: "C", text: "Device ID must be permanently disabled." },
      { id: "D", text: "BigQuery must be connected to Firebase exclusively." },
    ],
    correctAnswer: "B",
    explanation: "Reporting identity must evaluate User-ID first (Blended/Observed). Never send PII like raw emails into GA4 as it violates terms of service.",
  },
  {
    id: 36,
    sectionId: "sec-3",
    sectionName: "GA4, BigQuery & Attribution",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.67,
    text: "In Google Tag Manager (GTM) Server-Side Tagging, what primary security and tracking advantage does routing requests through a custom first-party subdomain (e.g. data.company.com) provide?",
    options: [
      { id: "A", text: "It bypasses all international privacy legislation automatically." },
      { id: "B", text: "It sets cookies in a first-party context mitigating Safari ITP 7-day deletion limits and masks user IP addresses before forwarding to third parties." },
      { id: "C", text: "It increases web server CPU speeds by 80%." },
      { id: "D", text: "It eliminates the need for an SSL certificate." },
    ],
    correctAnswer: "B",
    explanation: "Server-side tagging on a first-party subdomain writes true first-party cookies, shields internal client data, and curbs ITP truncation.",
  },
  {
    id: 37,
    sectionId: "sec-3",
    sectionName: "GA4, BigQuery & Attribution",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.67,
    text: "What is the maximum event parameter character length for parameter names and parameter values in standard GA4 web properties?",
    options: [
      { id: "A", text: "Parameter names: 40 characters; Parameter values: 100 characters" },
      { id: "B", text: "Parameter names: 200 characters; Parameter values: 500 characters" },
      { id: "C", text: "Unlimited characters for all properties" },
      { id: "D", text: "10 characters for names and 20 for values" },
    ],
    correctAnswer: "A",
    explanation: "GA4 enforces a 40-character limit for event parameter names and 100 characters for parameter values.",
  },
  {
    id: 38,
    sectionId: "sec-3",
    sectionName: "GA4, BigQuery & Attribution",
    difficulty: "MEDIUM",
    marks: 2.0,
    penalty: 0.67,
    text: "How does the 'Measurement Protocol' in GA4 send offline conversions (e.g., in-store POS transactions) into existing web customer journeys?",
    options: [
      { id: "A", text: "By transmitting an HTTP POST request to 'https://www.google-analytics.com/mp/collect' including api_secret, firebase_app_id or measurement_id, and matching client_id or user_id." },
      { id: "B", text: "By uploading an Excel file via FTP once every quarter." },
      { id: "C", text: "Through an automatic Bluetooth beacon scan in browser." },
      { id: "D", text: "By creating a duplicate GA4 property." },
    ],
    correctAnswer: "A",
    explanation: "GA4 Measurement Protocol relies on authenticated POST payloads containing client_id/user_id to stitch offline events into user paths.",
  },
  {
    id: 39,
    sectionId: "sec-3",
    sectionName: "GA4, BigQuery & Attribution",
    difficulty: "CRITICAL",
    marks: 2.0,
    penalty: 0.67,
    text: "What is the default data retention period for user and event-level exploratory reports in free GA4 properties, and what is the maximum configurable setting?",
    options: [
      { id: "A", text: "Default is 2 months; maximum is 14 months" },
      { id: "B", text: "Default is 12 months; maximum is 50 years" },
      { id: "C", text: "Default is 24 hours; maximum is 30 days" },
      { id: "D", text: "Data is retained perpetually with no limits" },
    ],
    correctAnswer: "A",
    explanation: "Standard GA4 properties default to 2 months retention for exploratory reports and must be manually extended to the 14-month ceiling.",
  },
  {
    id: 40,
    sectionId: "sec-3",
    sectionName: "GA4, BigQuery & Attribution",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.67,
    text: "A web property experiences a 50% discrepancy between GA4 Conversions and backend CRM paid orders. Which root cause represents client-side tracking failure?",
    options: [
      { id: "A", text: "Payment gateway redirection to thank-you page dropped due to users closing tab before redirect, alongside ad-blockers preventing GTM firing." },
      { id: "B", text: "BigQuery timezone mismatch." },
      { id: "C", text: "Server-to-server API latency." },
      { id: "D", text: "CRM database index corruption." },
    ],
    correctAnswer: "A",
    explanation: "Client-side tracking loses transactions when users leave the 3rd-party payment gateway before returning, or if ad-blockers suppress the script.",
  },
  {
    id: 41,
    sectionId: "sec-3",
    sectionName: "GA4, BigQuery & Attribution",
    difficulty: "MEDIUM",
    marks: 2.0,
    penalty: 0.67,
    text: "Which default channel group in GA4 classifies traffic tagged with 'utm_source=facebook&utm_medium=paid'?",
    options: [
      { id: "A", text: "Paid Social" },
      { id: "B", text: "Organic Social" },
      { id: "C", text: "Paid Search" },
      { id: "D", text: "Referral" },
    ],
    correctAnswer: "A",
    explanation: "GA4 channel rules categorize recognized social sources with medium containing 'paid', 'cpc', or 'ppc' as 'Paid Social'.",
  },
  {
    id: 42,
    sectionId: "sec-3",
    sectionName: "GA4, BigQuery & Attribution",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.67,
    text: "What is the critical distinction between 'First User Source/Medium' and 'Session Source/Medium' dimensions in GA4?",
    options: [
      { id: "A", text: "'First User' captures the initial acquisition source when the user was first discovered, while 'Session' reports the specific source that triggered the current session." },
      { id: "B", text: "They are completely identical synonyms." },
      { id: "C", text: "'First User' only works on mobile devices." },
      { id: "D", text: "'Session' only tracks paid ads traffic." },
    ],
    correctAnswer: "A",
    explanation: "First User is user-scoped (lifetime acquisition touchpoint), whereas Session is session-scoped (touchpoint initiating the specific visit).",
  },
  {
    id: 43,
    sectionId: "sec-3",
    sectionName: "GA4, BigQuery & Attribution",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.67,
    text: "In GA4, how can you track file downloads (.pdf, .xlsx) without writing custom JavaScript code in Google Tag Manager?",
    options: [
      { id: "A", text: "Enable 'Enhanced Measurement' in Data Stream settings which automatically records the 'file_download' event with extension parameters." },
      { id: "B", text: "Downloads cannot be tracked without server-side webhooks." },
      { id: "C", text: "File downloads are tracked as purchase events by default." },
      { id: "D", text: "Configure a custom BigQuery partition." },
    ],
    correctAnswer: "A",
    explanation: "GA4 Enhanced Measurement includes automated click, scroll, outbound click, site search, video, and file_download capture out-of-the-box.",
  },
  {
    id: 44,
    sectionId: "sec-3",
    sectionName: "GA4, BigQuery & Attribution",
    difficulty: "CRITICAL",
    marks: 2.0,
    penalty: 0.67,
    text: "What calculation generates the Customer Acquisition Cost (CAC) for an omnichannel digital marketing campaign?",
    options: [
      { id: "A", text: "CAC = (Total Sales & Marketing Costs over period) ÷ (Number of New Customers Acquired over same period)" },
      { id: "B", text: "CAC = Gross Revenue ÷ Total Clicks" },
      { id: "C", text: "CAC = Average Order Value × Repeat Purchase Rate" },
      { id: "D", text: "CAC = Ad Spend ÷ Total Website Pageviews" },
    ],
    correctAnswer: "A",
    explanation: "CAC encompasses all marketing and sales expenditures divided by the volume of net-new customers brought in.",
  },
  {
    id: 45,
    sectionId: "sec-3",
    sectionName: "GA4, BigQuery & Attribution",
    difficulty: "MEDIUM",
    marks: 2.0,
    penalty: 0.67,
    text: "Which attribution model distributes fractional credit algorithmically based on user journey machine learning rather than fixed rule weights in GA4?",
    options: [
      { id: "A", text: "Data-Driven Attribution (DDA)" },
      { id: "B", text: "Linear Attribution" },
      { id: "C", text: "First Click Attribution" },
      { id: "D", text: "Time Decay Attribution" },
    ],
    correctAnswer: "A",
    explanation: "Data-Driven Attribution calculates real conversion likelihood models across converting vs. non-converting touchpoint sequences.",
  },

  // ---------------- DOMAIN 4: Performance Funnels & Crisis ORM (Q46 - Q60) ----------------
  {
    id: 46,
    sectionId: "sec-4",
    sectionName: "Funnels & Crisis Strategy",
    difficulty: "CRITICAL",
    marks: 2.0,
    penalty: 0.67,
    text: "A brand faces a coordinated viral misinformation attack on Reddit and YouTube. What is the immediate first-response protocol in Online Reputation Management (ORM)?",
    options: [
      { id: "A", text: "Aggressively delete all negative comments and threaten legal action in the comments section." },
      { id: "B", text: "Execute an ORM triage matrix: establish dedicated monitoring war-room, verify facts, issue a calm transparent statement on owned verified channels, and avoid feeding algorithm engagement on troll threads." },
      { id: "C", text: "Shut down the company website for 72 hours." },
      { id: "D", text: "Buy 10,000 bot accounts to downvote the posts." },
    ],
    correctAnswer: "B",
    explanation: "Deleting comments causes the 'Streisand Effect'. Professional ORM relies on verified triage, rapid owned response, and algorithmic containment.",
  },
  {
    id: 47,
    sectionId: "sec-4",
    sectionName: "Funnels & Crisis Strategy",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.67,
    text: "A SaaS marketing funnel has 100,000 visits, 5,000 lead magnet downloads, 400 product demo bookings, and 40 closed enterprise deals. What is the overall visitor-to-customer conversion rate, and what is the demo-to-close rate?",
    options: [
      { id: "A", text: "Visitor-to-Customer: 0.04%; Demo-to-Close: 10.0%" },
      { id: "B", text: "Visitor-to-Customer: 0.4%; Demo-to-Close: 5.0%" },
      { id: "C", text: "Visitor-to-Customer: 4.0%; Demo-to-Close: 25.0%" },
      { id: "D", text: "Visitor-to-Customer: 0.004%; Demo-to-Close: 1.0%" },
    ],
    correctAnswer: "A",
    explanation: "Visitor to customer: 40 ÷ 100,000 = 0.0004 = 0.04%. Demo to close: 40 ÷ 400 = 0.10 = 10.0%.",
  },
  {
    id: 48,
    sectionId: "sec-4",
    sectionName: "Funnels & Crisis Strategy",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.67,
    text: "What technical methodology suppresses defamatory negative search results on Page 1 of Google when legal removal (DMCA/Defamation) is denied?",
    options: [
      { id: "A", text: "Reverse SEO: Building and optimizing high-authority positive microsites, press releases, LinkedIn, Medium, and social assets to systematically outrank and push negative URLs to Page 2+." },
      { id: "B", text: "Conducting a Distributed Denial of Service (DDoS) on the hosting server." },
      { id: "C", text: "Creating 5,000 spam backlink blog comments pointing to the defamatory URL." },
      { id: "D", text: "Submitting continuous false 404 removal requests in Google Search Console." },
    ],
    correctAnswer: "A",
    explanation: "Reverse SEO creates an authoritative barrier of high-ranking owned and earned assets that monopolize Page 1 real estate.",
  },
  {
    id: 49,
    sectionId: "sec-4",
    sectionName: "Funnels & Crisis Strategy",
    difficulty: "CRITICAL",
    marks: 2.0,
    penalty: 0.67,
    text: "In high-ticket lead generation funnels, what is the impact of introducing SMS Two-Factor verification before form submission on Cost Per Lead (CPL) and Lead Quality?",
    options: [
      { id: "A", text: "CPL will increase due to friction, but Sales Qualified Lead (SQL) conversion rate and contactability will rise dramatically, often reducing overall CAC." },
      { id: "B", text: "CPL will drop to zero and form completions will triple." },
      { id: "C", text: "Lead quality will drop because authentic users refuse SMS verification." },
      { id: "D", text: "Google Ads will disable conversion tracking." },
    ],
    correctAnswer: "A",
    explanation: "Adding friction filters out junk/bot leads. While raw CPL increases, sales efficiency and closed-won velocity increase, lowering CAC.",
  },
  {
    id: 50,
    sectionId: "sec-4",
    sectionName: "Funnels & Crisis Strategy",
    difficulty: "MEDIUM",
    marks: 2.0,
    penalty: 0.67,
    text: "What is the industry formula for Customer Lifetime Value (CLV or LTV) in a subscription e-commerce business?",
    options: [
      { id: "A", text: "LTV = (Average Order Value × Purchase Frequency) ÷ Churn Rate" },
      { id: "B", text: "LTV = Total Revenue ÷ Total Staff Payroll" },
      { id: "C", text: "LTV = Ad Spend × ROAS" },
      { id: "D", text: "LTV = Initial Purchase Price × 12 months" },
    ],
    correctAnswer: "A",
    explanation: "LTV measures revenue per period (AOV × frequency) divided by the churn rate (1 / customer lifespan).",
  },
  {
    id: 51,
    sectionId: "sec-4",
    sectionName: "Funnels & Crisis Strategy",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.67,
    text: "When conducting A/B split testing on a critical landing page, what statistical concept determines that variation B's outperformance is not random variance?",
    options: [
      { id: "A", text: "Statistical Significance (typically p-value < 0.05 / 95% Confidence Level) with sufficient sample size." },
      { id: "B", text: "Testing for at least 24 hours regardless of conversions." },
      { id: "C", text: "Checking if variation B has a higher click count than 100." },
      { id: "D", text: "Using internal office staff to vote on preferred UI." },
    ],
    correctAnswer: "A",
    explanation: "A/B testing requires statistical significance (p < 0.05) to ensure results are mathematically reliable and not noise.",
  },
  {
    id: 52,
    sectionId: "sec-4",
    sectionName: "Funnels & Crisis Strategy",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.67,
    text: "What is 'Churn Rate' and how does an increase in churn from 3% to 8% monthly affect a SaaS company's cash flow resilience?",
    options: [
      { id: "A", text: "Churn is the rate of lost customers; an 8% monthly churn compounds to losing over 60% of existing customer base annually, creating an unsustainable acquisition treadmill." },
      { id: "B", text: "Churn measures server downtime in seconds." },
      { id: "C", text: "Higher churn increases investor valuation." },
      { id: "D", text: "Churn rate has no impact on subscription businesses." },
    ],
    correctAnswer: "A",
    explanation: "8% monthly churn erodes recurring revenue aggressively (compounding to >63% annualized loss), requiring extreme acquisition volume just to remain flat.",
  },
  {
    id: 53,
    sectionId: "sec-4",
    sectionName: "Funnels & Crisis Strategy",
    difficulty: "MEDIUM",
    marks: 2.0,
    penalty: 0.67,
    text: "Which email deliverability protocol cryptographic header authenticates the sender domain against spoofing and phishing attacks?",
    options: [
      { id: "A", text: "DMARC, DKIM, and SPF" },
      { id: "B", text: "HTTPS and SSL only" },
      { id: "C", text: "HTML5 and CSS3" },
      { id: "D", text: "FTP and SSH" },
    ],
    correctAnswer: "A",
    explanation: "SPF, DKIM cryptographic keys, and DMARC enforcement policies form the triad required for mailbox provider deliverability.",
  },
  {
    id: 54,
    sectionId: "sec-4",
    sectionName: "Funnels & Crisis Strategy",
    difficulty: "CRITICAL",
    marks: 2.0,
    penalty: 0.67,
    text: "An influencer marketing contract stipulates performance-based compensation. What key clause protects the brand from paid follower/engagement pod fraud?",
    options: [
      { id: "A", text: "Right to audit audience authenticity metrics via third-party analytics and compensation clawback for synthetic/bot engagement." },
      { id: "B", text: "Requiring the influencer to post between 9 AM and 10 AM." },
      { id: "C", text: "Paying 100% upfront in cryptocurrency." },
      { id: "D", text: "Prohibiting comments on sponsored reels." },
    ],
    correctAnswer: "A",
    explanation: "Audit clauses with third-party verification safeguards brands against synthetic bot traffic and engagement pod manipulation.",
  },
  {
    id: 55,
    sectionId: "sec-4",
    sectionName: "Funnels & Crisis Strategy",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.67,
    text: "What is the optimal LTV:CAC ratio benchmark for high-growth, venture-backed digital businesses?",
    options: [
      { id: "A", text: "3:1 to 4:1 (LTV is 3 to 4 times the acquisition cost)" },
      { id: "B", text: "1:1 (breaking even on every customer lifetime)" },
      { id: "C", text: "0.2:1 (losing ₹5 for every ₹1 acquired)" },
      { id: "D", text: "50:1 (suggesting under-investment in growth)" },
    ],
    correctAnswer: "A",
    explanation: "3:1 is the gold standard of healthy unit economics. Less than 1:1 is unsustainable, and over 5:1 indicates under-investing in acquisition capacity.",
  },
  {
    id: 56,
    sectionId: "sec-4",
    sectionName: "Funnels & Crisis Strategy",
    difficulty: "MEDIUM",
    marks: 2.0,
    penalty: 0.67,
    text: "Which landing page element has the highest correlation with reducing shopping cart abandonment during checkout?",
    options: [
      { id: "A", text: "Transparent pricing with upfront shipping & taxes, guest checkout option, and multiple trusted payment gateways." },
      { id: "B", text: "Hiding shipping costs until the final credit card step." },
      { id: "C", text: "Requiring a 12-character alphanumeric password before cart viewing." },
      { id: "D", text: "Adding auto-playing audio promotional videos." },
    ],
    correctAnswer: "A",
    explanation: "Unexpected fees and mandatory account creation are the top 2 reasons for cart abandonment across digital commerce.",
  },
  {
    id: 57,
    sectionId: "sec-4",
    sectionName: "Funnels & Crisis Strategy",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.67,
    text: "What is 'Dark Social' in attribution modeling and how does it distort web analytics reports?",
    options: [
      { id: "A", text: "Traffic arriving from private messaging apps (WhatsApp, Slack, Telegram, email) where referral headers are stripped, erroneously classified as 'Direct'." },
      { id: "B", text: "Illegal hacking forums selling ad inventory." },
      { id: "C", text: "Browsing activity conducted exclusively in incognito mode." },
      { id: "D", text: "Blacklisted IP ranges from proxy networks." },
    ],
    correctAnswer: "A",
    explanation: "Dark social occurs when links shared in closed chat environments lack HTTP referrers, artificially inflating Direct traffic metrics.",
  },
  {
    id: 58,
    sectionId: "sec-4",
    sectionName: "Funnels & Crisis Strategy",
    difficulty: "CRITICAL",
    marks: 2.0,
    penalty: 0.67,
    text: "If an enterprise client initiates a chargeback dispute on payment gateway, what digital trail is essential for seller dispute resolution?",
    options: [
      { id: "A", text: "Timestamped IP logs, signed terms of service acknowledgment, delivery confirmation, and communication trail." },
      { id: "B", text: "A copy of the company logo." },
      { id: "C", text: "The client's LinkedIn profile URL." },
      { id: "D", text: "A phone call recording without consent." },
    ],
    correctAnswer: "A",
    explanation: "Payment gateways require immutable compelling evidence: IP logs, signed contract/terms timestamp, and proof of service delivery.",
  },
  {
    id: 59,
    sectionId: "sec-4",
    sectionName: "Funnels & Crisis Strategy",
    difficulty: "HIGH",
    marks: 2.0,
    penalty: 0.67,
    text: "What viral loop coefficient ($K$-factor) is required for a product or referral program to achieve exponential viral self-sustainability without paid advertising?",
    options: [
      { id: "A", text: "$K > 1.0$ (Each new user successfully brings in more than 1 additional user)" },
      { id: "B", text: "$K = 0.5$" },
      { id: "C", text: "$K < 0.1$" },
      { id: "D", text: "$K = 0.0$" },
    ],
    correctAnswer: "A",
    explanation: "Viral coefficient K must be strictly greater than 1.0 for viral growth to compound exponentially on its own.",
  },
  {
    id: 60,
    sectionId: "sec-4",
    sectionName: "Funnels & Crisis Strategy",
    difficulty: "CRITICAL",
    marks: 2.0,
    penalty: 0.67,
    text: "Under strict regulatory guidelines (e.g. India DPDP Act / EU GDPR), what legal obligation arises within 72 hours of a customer personal data breach?",
    options: [
      { id: "A", text: "Mandatory formal notification to the Data Protection Board/Supervisory Authority and affected data principals if high risk exists." },
      { id: "B", text: "Silently patching the vulnerability without notifying anyone." },
      { id: "C", text: "Offering a 10% discount voucher to all website visitors." },
      { id: "D", text: "Deleting all server backup databases." },
    ],
    correctAnswer: "A",
    explanation: "Modern privacy acts strictly mandate formal authority notification within 72 hours of becoming aware of a serious personal data breach.",
  },
];

export const OfficialExamPage = () => {
  const navigate = useNavigate();
  const { currentUser, crmProfile } = useAuth();
  const studentData = mapStudentDataFromCrm(crmProfile, currentUser);

  // Stages: "BRIEFING" | "LIVE_EXAM" | "SCORECARD"
  const [examStage, setExamStage] = useState("BRIEFING");

  // Candidate identity details from Profile Details
  const candidateName = studentData?.name || currentUser?.name || "Student";
  const rollNumber = studentData?.studentId || currentUser?.admissionNo || "OMC-0267";
  const candidateAvatar = studentData?.avatar || profilePic;
  const centerNode = `${studentData?.center || "Borivali Center"} • Assessment Node`;
  const sessionHash = "SHA256: 9e887f4c10a30b2e847d91";

  // Institutional Lockdown & Security state (3 Warnings Total)
  const MAX_WARNINGS = 3;
  const [fullscreenActive, setFullscreenActive] = useState(false);
  const [pledgeAccepted, setPledgeAccepted] = useState(false);
  const [securityStrikes, setSecurityStrikes] = useState(0);
  const [strikeAlert, setStrikeAlert] = useState(null);
  const [showMobilePalette, setShowMobilePalette] = useState(false);

  // Live Exam Runner state
  const [activeSection, setActiveSection] = useState("sec-1");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { [questionId]: "A" | "B" | "C" | "D" }
  const [markedForReview, setMarkedForReview] = useState({}); // { [questionId]: boolean }
  const [visitedQuestions, setVisitedQuestions] = useState({ 1: true });
  const [timeRemaining, setTimeRemaining] = useState(45 * 60); // 45 minutes in seconds
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Exam Score calculation result
  const [examResult, setExamResult] = useState(null);

  const containerRef = useRef(null);
  const lastStrikeTimeRef = useRef(0);
  const strikeAlertRef = useRef(null);
  const examStageRef = useRef(examStage);
  const securityStrikesRef = useRef(securityStrikes);

  useEffect(() => {
    examStageRef.current = examStage;
  }, [examStage]);

  useEffect(() => {
    securityStrikesRef.current = securityStrikes;
  }, [securityStrikes]);

  useEffect(() => {
    strikeAlertRef.current = strikeAlert;
  }, [strikeAlert]);

  // Track window blur / tab switches during Live Exam
  useEffect(() => {
    if (examStage !== "LIVE_EXAM") return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        triggerSecurityStrike("Tab switch or window minimized detected");
      }
    };

    const handleWindowBlur = () => {
      triggerSecurityStrike("Window unfocused or secondary application active");
    };

    window.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);

    return () => {
      window.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, [examStage]);

  const triggerSecurityStrike = (reason) => {
    if (examStageRef.current !== "LIVE_EXAM") return;

    const now = Date.now();
    // Guard: ignore if strike alert modal is already active or if fired within 4 seconds of last strike
    if (strikeAlertRef.current || now - lastStrikeTimeRef.current < 4000) {
      return;
    }
    lastStrikeTimeRef.current = now;

    const newStrikes = securityStrikesRef.current + 1;
    setSecurityStrikes(newStrikes);
    securityStrikesRef.current = newStrikes;

    const alertData = {
      strikeNumber: newStrikes,
      reason,
      remaining: Math.max(0, MAX_WARNINGS - newStrikes),
    };
    setStrikeAlert(alertData);
    strikeAlertRef.current = alertData;

    if (newStrikes >= MAX_WARNINGS) {
      // Automatic submission upon exhausting all 3 warnings
      setTimeout(() => {
        setStrikeAlert(null);
        strikeAlertRef.current = null;
        handleFinalSubmission(true);
      }, 2500);
    }
  };

  // Timer countdown
  useEffect(() => {
    if (examStage !== "LIVE_EXAM") return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinalSubmission(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [examStage]);

  // Format seconds to MM:SS
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Readiness validation to gate exam entry
  const canStartExam = Boolean(pledgeAccepted);

  // Start exam
  const handleStartExam = () => {
    if (!canStartExam) return;

    // Request browser fullscreen if available
    try {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    } catch {}

    setFullscreenActive(true);
    setExamStage("LIVE_EXAM");
  };

  // Select an option
  const handleSelectOption = (qId, optionId) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [qId]: optionId,
    }));
  };

  // Toggle mark for review
  const handleToggleReview = (qId) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [qId]: prev[qId],
    }));
    setMarkedForReview((prev) => ({
      ...prev,
      [qId]: !prev[qId],
    }));
  };

  // Clear current question answer
  const handleClearAnswer = (qId) => {
    setSelectedAnswers((prev) => {
      const copy = { ...prev };
      delete copy[qId];
      return copy;
    });
  };

  // Navigate to question
  const goToQuestion = (index) => {
    if (index >= 0 && index < EXAM_QUESTIONS.length) {
      setCurrentQuestionIndex(index);
      const targetQ = EXAM_QUESTIONS[index];
      setActiveSection(targetQ.sectionId);
      setVisitedQuestions((prev) => ({ ...prev, [targetQ.id]: true }));
    }
  };

  // Calculate scores and finalize exam
  const handleFinalSubmission = (isDisqualified = false) => {
    let totalCorrect = 0;
    let totalIncorrect = 0;
    let totalUnattempted = 0;
    let domainScores = {
      "sec-1": { name: "Technical SEO & Schema", correct: 0, total: 15 },
      "sec-2": { name: "Google Ads & Bidding", correct: 0, total: 15 },
      "sec-3": { name: "GA4 & BigQuery Analytics", correct: 0, total: 15 },
      "sec-4": { name: "Funnels & Crisis Strategy", correct: 0, total: 15 },
    };

    EXAM_QUESTIONS.forEach((q) => {
      const studentAns = selectedAnswers[q.id];
      if (!studentAns) {
        totalUnattempted += 1;
      } else if (studentAns === q.correctAnswer) {
        totalCorrect += 1;
        domainScores[q.sectionId].correct += 1;
      } else {
        totalIncorrect += 1;
      }
    });

    const marksPositive = totalCorrect * 2.0;
    const penaltyDeduction = totalIncorrect * 0.67;
    const finalScore = Math.max(0, Number((marksPositive - penaltyDeduction).toFixed(2)));
    const maxScore = 120.0; // 60 questions * 2.0
    const percentage = Number(((finalScore / maxScore) * 100).toFixed(1));
    const passed = !isDisqualified && percentage >= 80.0;

    setExamResult({
      isDisqualified,
      totalCorrect,
      totalIncorrect,
      totalUnattempted,
      marksPositive,
      penaltyDeduction,
      finalScore,
      maxScore,
      percentage,
      passed,
      domainScores,
      timeSpentSeconds: 45 * 60 - timeRemaining,
      submissionTimestamp: new Date().toLocaleString("en-IN", {
        dateStyle: "full",
        timeStyle: "medium",
      }),
      certificateId: `OMC-DIPLOMA-${Math.floor(100000 + Math.random() * 900000)}`,
    });

    // Clear strike alert so modal never hangs on loading
    setStrikeAlert(null);
    strikeAlertRef.current = null;
    setShowSubmitModal(false);
    setExamStage("SCORECARD");

    if (document.fullscreenElement) {
      try {
        document.exitFullscreen().catch(() => {});
      } catch {}
    }
  };

  const currentQ = EXAM_QUESTIONS[currentQuestionIndex];

  // Palette counts
  const answeredCount = Object.keys(selectedAnswers).length;
  const reviewCount = Object.values(markedForReview).filter(Boolean).length;
  const unattemptedCount = EXAM_QUESTIONS.length - answeredCount;

  return (
    <div
      ref={containerRef}
      className="h-screen max-h-screen w-screen overflow-hidden bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 flex flex-col font-sans select-none text-base"
    >
      {/* ==================================================================== */}
      {/* TOP INSTITUTIONAL HEADER BAR                                         */}
      {/* ==================================================================== */}
      <header className="bg-white/95 dark:bg-slate-950/90 border-b border-slate-200/90 dark:border-slate-800/90 px-4 py-2.5 sm:px-6 flex items-center justify-between shrink-0 z-40 backdrop-blur-md shadow-xs dark:shadow-none">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
            <GraduationCap size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 font-bold">
                OMC ASSESSMENT PORTAL
              </span>
              <span className="hidden md:inline-flex px-2 py-0.5 text-[10px] font-mono bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/20 rounded font-semibold">
                OFFICIAL CERTIFICATION
              </span>
            </div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
              <span>Operating Media Certification Assessment</span>
              <span className="text-slate-400 dark:text-slate-500 hidden sm:inline text-xs font-normal">• Final Evaluation</span>
            </h2>
          </div>
        </div>

        {/* Status Chips */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          <div className="hidden lg:flex items-center gap-2 bg-emerald-50 dark:bg-slate-900 border border-emerald-200 dark:border-slate-800 px-3 py-1.5 rounded-lg text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            <span className="text-emerald-800 dark:text-slate-300 font-semibold">SESSION ACTIVE</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs sm:text-sm font-mono font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
              STUDENT ID: {rollNumber}
            </span>
            {examStage !== "LIVE_EXAM" && (
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs sm:text-sm font-semibold border border-slate-300 dark:border-slate-700/80 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft size={14} />
                <span>Exit Portal</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* SECURITY / FOCUS VIOLATION OVERLAY DIALOG (3 WARNINGS TOTAL)          */}
      {/* ==================================================================== */}
      {strikeAlert && (
        <div className="fixed inset-0 z-50 bg-black/60 dark:bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white dark:bg-slate-950 border border-amber-300 dark:border-amber-700/60 rounded-2xl p-6 sm:p-7 text-center shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="w-14 h-14 mx-auto rounded-full bg-amber-100 dark:bg-amber-500/20 border border-amber-300 dark:border-amber-500 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
              <AlertTriangle size={30} />
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-700 tracking-wider inline-block mb-2">
              Assessment Warning #{strikeAlert.strikeNumber} of {MAX_WARNINGS}
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-950 dark:text-white">Exam Window Focus Alert</h3>
            <p className="text-amber-700 dark:text-amber-400 font-mono text-xs mt-1 font-semibold">
              Notice: {strikeAlert.reason}
            </p>
            <p className="text-slate-600 dark:text-slate-300 text-sm mt-3 leading-relaxed">
              {strikeAlert.remaining > 0 ? (
                <>
                  You switched tabs or moved away from the assessment window. You have{" "}
                  <strong className="text-amber-700 dark:text-amber-400 font-bold">{strikeAlert.remaining} warning(s) left</strong>{" "}
                  before automated exam submission.
                </>
              ) : (
                <>
                  <strong className="text-slate-900 dark:text-white font-bold">
                    3 warnings reached. Automated submission initiated.
                  </strong>{" "}
                  Your assessment paper will now be submitted and evaluated.
                </>
              )}
            </p>
            <div className="mt-5">
              {strikeAlert.remaining > 0 ? (
                <button
                  type="button"
                  onClick={() => {
                    setStrikeAlert(null);
                    strikeAlertRef.current = null;
                    lastStrikeTimeRef.current = Date.now();
                    try {
                      window.focus();
                    } catch {}
                  }}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm tracking-wide cursor-pointer shadow-sm transition-all"
                >
                  I Understand • Return to Assessment
                </button>
              ) : (
                <div className="space-y-2.5">
                  <div className="text-xs font-mono text-amber-700 dark:text-amber-400 animate-pulse font-bold">
                    Saving responses and finalizing submission...
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setStrikeAlert(null);
                      strikeAlertRef.current = null;
                      handleFinalSubmission(true);
                    }}
                    className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm tracking-wide cursor-pointer shadow-sm"
                  >
                    View Scorecard
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* STAGE 1: INSTITUTIONAL BRIEFING & PRE-FLIGHT VERIFICATION            */}
      {/* ==================================================================== */}
      {examStage === "BRIEFING" && (
        <main className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 lg:p-8 custom-scrollbar">
          <div className="max-w-7xl w-full mx-auto space-y-6">
            {/* Top Information Banner */}
            <div className="bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/90 dark:border-blue-900/40 rounded-2xl p-5 flex items-start gap-4 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                <Info size={22} />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-wide">
                  Operating Media Certification Assessment Guidelines
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  Welcome to your official certification assessment. Please verify your details and review the assessment scheme below. Marking scheme: <strong>+2.00 marks for each correct answer</strong> and <strong>-0.67 marks for incorrect answers</strong>. A minimum score of <strong>80.0% (96/120 marks)</strong> is required for your official Course Diploma.
                </p>
              </div>
            </div>

            {/* Grid: Candidate Passport & Examination Parameters */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
              {/* Candidate Verification Passport (5 cols) */}
              <div className="md:col-span-5 bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-5 shadow-xs dark:shadow-none">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3.5">
                    <span className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400 tracking-widest font-bold">
                      CANDIDATE ADMIT CARD
                    </span>
                    <span className="text-xs font-mono px-3 py-1 rounded font-bold border bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/40">
                      PROFILE VERIFIED • READY
                    </span>
                  </div>

                  <div className="flex items-center gap-4.5 mt-5">
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 shrink-0 bg-slate-100 dark:bg-slate-800 shadow-sm">
                      <img
                        src={candidateAvatar}
                        alt="Candidate"
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-blue-500/10 pointer-events-none" />
                      <div className="absolute bottom-0 inset-x-0 bg-slate-900/90 text-[9px] font-mono text-center text-white py-1 font-bold uppercase tracking-wider">
                        PHOTO VERIFIED
                      </div>
                    </div>

                    <div className="min-w-0">
                      <span className="text-xs uppercase font-bold text-slate-400 dark:text-slate-400 block tracking-wider">
                        Candidate Name
                      </span>
                      <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white truncate">
                        {candidateName}
                      </h4>
                      <p className="text-sm font-mono text-slate-700 dark:text-slate-300 mt-1">
                        Student ID: <strong>{rollNumber}</strong>
                      </p>
                      <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 block mt-1 truncate font-medium">
                        {centerNode}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800 rounded-xl p-4 space-y-2.5 text-xs sm:text-sm font-mono">
                  <div className="flex justify-between text-slate-500 dark:text-slate-400">
                    <span>Program:</span>
                    <span className="text-slate-800 dark:text-slate-200 font-bold truncate max-w-[220px]">
                      {studentData?.course || "Masters in Digital Marketing"}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-500 dark:text-slate-400">
                    <span>Batch:</span>
                    <span className="text-slate-800 dark:text-slate-200 font-bold">
                      {studentData?.batch || "WD-M1"}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-500 dark:text-slate-400">
                    <span>Center:</span>
                    <span className="text-slate-800 dark:text-slate-200 font-bold">
                      {studentData?.center || "Borivali Center"}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-500 dark:text-slate-400">
                    <span>Security Hash:</span>
                    <span className="text-slate-500 dark:text-slate-400 font-mono text-xs truncate max-w-[180px]">
                      {sessionHash}
                    </span>
                  </div>
                </div>
              </div>

              {/* Assessment Rules & Scheme (7 cols) */}
              <div className="md:col-span-7 bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 space-y-5 shadow-xs dark:shadow-none">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3.5">
                  <span className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400 tracking-widest font-bold">
                    MARKING SCHEME & PROTOCOLS
                  </span>
                  <span className="text-xs font-mono text-blue-600 dark:text-blue-400 font-bold">STANDARD SCHEME</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-3 rounded-xl">
                    <span className="block text-xs text-slate-500 dark:text-slate-400 uppercase font-mono font-bold">Total Qs</span>
                    <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">60</span>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-3 rounded-xl">
                    <span className="block text-xs text-slate-500 dark:text-slate-400 uppercase font-mono font-bold">Time Limit</span>
                    <span className="text-2xl sm:text-3xl font-black text-blue-700 dark:text-cyan-400">45 Mins</span>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-3 rounded-xl">
                    <span className="block text-xs text-slate-500 dark:text-slate-400 uppercase font-mono font-bold">Correct Ans</span>
                    <span className="text-2xl sm:text-3xl font-black text-emerald-700 dark:text-emerald-400">+2.00</span>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-3 rounded-xl">
                    <span className="block text-xs text-slate-500 dark:text-slate-400 uppercase font-mono font-bold">Wrong Penalty</span>
                    <span className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400">-0.67</span>
                  </div>
                </div>

                <ul className="space-y-3 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <span className="text-blue-600 dark:text-blue-400 font-bold font-mono text-sm sm:text-base">01.</span>
                    <span>
                      <strong>Assessment Focus:</strong> Navigating away from the window or minimizing the browser logs a proctor warning.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-blue-600 dark:text-blue-400 font-bold font-mono text-sm sm:text-base">02.</span>
                    <span>
                      <strong>3 Warnings Permitted:</strong> A total of 3 warnings are permitted. Exceeding 3 warnings will automatically submit your assessment paper.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-blue-600 dark:text-blue-400 font-bold font-mono text-sm sm:text-base">03.</span>
                    <span>
                      <strong>Passing Grade:</strong> Minimum 80.0% (96 / 120 Marks) to qualify for Diploma Certification.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-blue-600 dark:text-blue-400 font-bold font-mono text-sm sm:text-base">04.</span>
                    <span>
                      <strong>Unanswered Questions:</strong> Carry 0 penalty. Unanswered questions do not deduct marks.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* System Security & Environment Status */}
            <div className="bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 space-y-5 shadow-xs dark:shadow-none">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-slate-100 dark:border-slate-800 pb-3.5">
                <div>
                  <span className="text-xs font-mono uppercase text-blue-600 dark:text-blue-400 tracking-widest font-bold block">
                    CANDIDATE VERIFICATION GATE
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                    System Security & Diagnostics
                  </h4>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-mono">
                  <span className="px-3 py-1 rounded-lg font-bold border bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-600">
                    System Verified (Ready)
                  </span>
                </div>
              </div>

              {/* Passive Environment & Security Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex items-center gap-3.5">
                  <Monitor size={20} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <div className="min-w-0">
                    <span className="text-sm font-bold text-slate-900 dark:text-white block">Display Architecture</span>
                    <span className="text-xs text-emerald-700 dark:text-emerald-400 font-mono">Single Display Focus Active</span>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex items-center gap-3.5">
                  <Wifi size={20} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <div className="min-w-0">
                    <span className="text-sm font-bold text-slate-900 dark:text-white block">Network & Latency</span>
                    <span className="text-xs text-emerald-700 dark:text-emerald-400 font-mono">Secure TLS 1.3 Connection</span>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex items-center gap-3.5">
                  <ShieldCheck size={20} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <div className="min-w-0">
                    <span className="text-sm font-bold text-slate-900 dark:text-white block">Window Proctoring</span>
                    <span className="text-xs text-emerald-700 dark:text-emerald-400 font-mono">3 Warnings Policy Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Honor Code Pledge */}
            <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl flex items-start gap-3.5">
              <input
                id="pledge-check"
                type="checkbox"
                checked={pledgeAccepted}
                onChange={(e) => setPledgeAccepted(e.target.checked)}
                className="mt-1 w-5 h-5 rounded text-blue-600 focus:ring-blue-500 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 cursor-pointer shrink-0"
              />
              <label htmlFor="pledge-check" className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed cursor-pointer">
                I, <strong className="text-slate-950 dark:text-white">{candidateName}</strong>, confirm that I am taking this assessment independently. I agree to adhere to the assessment guidelines, accept the marking scheme (+2.00 / -0.67), and understand that maintaining window focus is required throughout the test session.
              </label>
            </div>

            {/* Action Row & Gating */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                ← Return to Dashboard
              </button>

              <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
                {/* Readiness Checklist Chips */}
                <div className="flex items-center gap-2 text-xs sm:text-sm font-mono">
                  <span className="px-2.5 py-1 rounded-md border font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700">
                    System: ✓ Ready
                  </span>
                  <span className={`px-2.5 py-1 rounded-md border font-semibold ${pledgeAccepted ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700" : "bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-300 dark:border-slate-700"}`}>
                    Pledge: {pledgeAccepted ? "✓ Accepted" : "Required"}
                  </span>
                </div>

                <button
                  type="button"
                  disabled={!canStartExam}
                  onClick={handleStartExam}
                  className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base tracking-wide uppercase transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer ${
                    canStartExam
                      ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:scale-[1.01] active:scale-[0.99]"
                      : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed"
                  }`}
                  title={!canStartExam ? "Accept the Honor Code Pledge above to unlock" : "Start Certification Assessment"}
                >
                  <GraduationCap size={18} />
                  <span>Start Certification Assessment</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* ==================================================================== */}
      {/* ==================================================================== */}
      {/* STAGE 2: LIVE EXAMINATION RUNNER (NON-SCROLLABLE FIXED CONTAINERS)   */}
      {/* ==================================================================== */}
      {examStage === "LIVE_EXAM" && (
        <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
          {/* Top Exam Navigation Bar */}
          <div className="bg-white dark:bg-slate-950 border-b border-slate-200/90 dark:border-slate-800/90 px-4 py-2.5 sm:px-6 flex items-center justify-between shrink-0 shadow-xs dark:shadow-none">
            {/* Left Status & Mobile Palette Opener */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Assessment in Progress
                </span>
              </div>

              {/* Mobile Palette Opener Button */}
              <button
                type="button"
                onClick={() => setShowMobilePalette(true)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-850 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-xs font-bold border border-slate-200 dark:border-slate-700 cursor-pointer transition-colors"
              >
                <Grid size={14} className="text-blue-600 dark:text-blue-400" />
                <span>Questions ({answeredCount}/60)</span>
              </button>
            </div>

            {/* Countdown Timer, Warnings & Submit Button */}
            <div className="flex items-center gap-3">
              <div
                className={`flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl border font-mono font-bold text-sm sm:text-base tracking-wider ${
                  timeRemaining < 300
                    ? "bg-rose-50 dark:bg-rose-950/70 border-rose-300 dark:border-rose-700 text-rose-700 dark:text-rose-400 animate-pulse"
                    : timeRemaining < 900
                    ? "bg-amber-50 dark:bg-amber-950/70 border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-400"
                    : "bg-slate-100 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                }`}
              >
                <Clock size={16} />
                <span>{formatTime(timeRemaining)}</span>
              </div>

              {/* Warnings Indicator */}
              <div className="hidden sm:flex items-center gap-2 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-xl text-xs font-mono">
                <span
                  className={`w-2 h-2 rounded-full ${
                    securityStrikes === 0
                      ? "bg-emerald-500"
                      : securityStrikes < MAX_WARNINGS
                      ? "bg-amber-500"
                      : "bg-rose-500"
                  }`}
                />
                <span className="text-slate-700 dark:text-slate-300 font-bold">
                  Warnings: {securityStrikes}/{MAX_WARNINGS}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setShowSubmitModal(true)}
                className="px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-xs transition-all cursor-pointer"
              >
                Submit Paper
              </button>
            </div>
          </div>

          {/* Main Exam Runner Body: Fixed Containers */}
          <div className="flex-1 min-h-0 p-3 sm:p-4 lg:p-5 flex gap-4 overflow-hidden">
            {/* Left Question Box: Fixed dimensions, never jumps on question switch */}
            <div className="flex-1 min-w-0 h-full flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
              {/* Question Header (Fixed inside box) */}
              <div className="shrink-0 px-4 py-3 sm:px-6 sm:py-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-950/40">
                <div className="flex items-center gap-2.5">
                  <span className="px-3 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-mono font-bold text-xs sm:text-sm border border-blue-200 dark:border-blue-800">
                    Question {currentQuestionIndex + 1} of {EXAM_QUESTIONS.length}
                  </span>
                  <span className="hidden sm:inline text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
                    {currentQ.sectionName}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    Level: {currentQ.difficulty}
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                    +2.00 / -0.67
                  </span>
                </div>
              </div>

              {/* Scrollable Question Content (internal scroll only if needed) */}
              <div className="flex-1 min-h-0 overflow-y-auto px-4 py-5 sm:px-7 sm:py-6 space-y-5 custom-scrollbar">
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 dark:text-white leading-relaxed">
                  {currentQ.text}
                </h3>

                {/* Multiple Choice Options */}
                <div className="space-y-3 pt-2">
                  {currentQ.options.map((opt) => {
                    const isSelected = selectedAnswers[currentQ.id] === opt.id;
                    return (
                      <div
                        key={opt.id}
                        onClick={() => handleSelectOption(currentQ.id, opt.id)}
                        className={`p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                          isSelected
                            ? "bg-blue-50/80 dark:bg-blue-950/40 border-2 border-blue-600 text-slate-900 dark:text-white shadow-xs"
                            : "bg-slate-50/60 hover:bg-white dark:bg-slate-900/60 dark:hover:bg-slate-850 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-800 dark:text-slate-300"
                        }`}
                      >
                        <div
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg border flex items-center justify-center font-mono font-bold text-xs sm:text-sm shrink-0 mt-0.5 transition-colors ${
                            isSelected
                              ? "bg-blue-600 border-blue-600 text-white font-black"
                              : "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                          }`}
                        >
                          {opt.id}
                        </div>
                        <span className="text-sm sm:text-base font-medium leading-relaxed pt-0.5">
                          {opt.text}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Fixed Bottom Action Controls */}
              <div className="shrink-0 px-4 py-3 sm:px-6 sm:py-3.5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 bg-slate-50/70 dark:bg-slate-950/40">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleToggleReview(currentQ.id)}
                    className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all border flex items-center gap-1.5 cursor-pointer ${
                      markedForReview[currentQ.id]
                        ? "bg-purple-100 dark:bg-purple-950/60 border-purple-300 dark:border-purple-600 text-purple-800 dark:text-purple-300"
                        : "bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-750 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <span>{markedForReview[currentQ.id] ? "Marked for Review" : "Mark for Review"}</span>
                  </button>

                  {selectedAnswers[currentQ.id] && (
                    <button
                      type="button"
                      onClick={() => handleClearAnswer(currentQ.id)}
                      className="px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-700 cursor-pointer transition-colors"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={currentQuestionIndex === 0}
                    onClick={() => goToQuestion(currentQuestionIndex - 1)}
                    className={`px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-colors flex items-center gap-1 cursor-pointer ${
                      currentQuestionIndex === 0
                        ? "bg-slate-100 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed"
                        : "bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-750 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200"
                    }`}
                  >
                    <ChevronLeft size={16} />
                    <span className="hidden sm:inline">Previous</span>
                  </button>

                  <button
                    type="button"
                    disabled={currentQuestionIndex === EXAM_QUESTIONS.length - 1}
                    onClick={() => goToQuestion(currentQuestionIndex + 1)}
                    className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all flex items-center gap-1 cursor-pointer ${
                      currentQuestionIndex === EXAM_QUESTIONS.length - 1
                        ? "bg-slate-100 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 border-blue-600 text-white shadow-xs"
                    }`}
                  >
                    <span>Save & Next</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Question Palette: Fixed Size, Shows all 60 Questions directly */}
            <div className="hidden lg:flex w-80 xl:w-96 shrink-0 h-full flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
              {/* Palette Header with Legend */}
              <div className="shrink-0 p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40">
                <span className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400 tracking-wider font-bold block mb-2.5">
                  Question Palette (60)
                </span>
                <div className="grid grid-cols-2 gap-2 text-[11px] sm:text-xs font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-emerald-600 inline-block shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300 font-semibold truncate">Answered ({answeredCount})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-purple-600 inline-block shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300 font-semibold truncate">Review ({reviewCount})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-slate-300 dark:bg-slate-700 inline-block shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300 font-semibold truncate">Unanswered ({unattemptedCount})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-blue-600 inline-block shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300 font-semibold truncate">Current (Q{currentQuestionIndex + 1})</span>
                  </div>
                </div>
              </div>

              {/* Scrollable Questions Grid */}
              <div className="flex-1 min-h-0 overflow-y-auto p-3.5 custom-scrollbar">
                <div className="grid grid-cols-5 gap-2">
                  {EXAM_QUESTIONS.map((q, idx) => {
                    const isCurrent = currentQuestionIndex === idx;
                    const isAnswered = Boolean(selectedAnswers[q.id]);
                    const isMarked = Boolean(markedForReview[q.id]);

                    let btnStyle = "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300";
                    if (isCurrent) {
                      btnStyle = "bg-blue-600 border-blue-600 text-white ring-2 ring-blue-400 font-black shadow-xs";
                    } else if (isAnswered && isMarked) {
                      btnStyle = "bg-indigo-600 border-indigo-500 text-white font-bold";
                    } else if (isMarked) {
                      btnStyle = "bg-purple-600 border-purple-500 text-white font-bold";
                    } else if (isAnswered) {
                      btnStyle = "bg-emerald-600 border-emerald-500 text-white font-bold";
                    } else if (visitedQuestions[q.id]) {
                      btnStyle = "bg-slate-200 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-300";
                    }

                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => goToQuestion(idx)}
                        className={`h-9 rounded-xl border text-xs font-mono font-bold transition-all flex items-center justify-center cursor-pointer ${btnStyle}`}
                      >
                        {q.id}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Fixed Palette Footer */}
              <div className="shrink-0 p-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(true)}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-xs transition-all cursor-pointer"
                >
                  Submit Assessment
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Question Palette Drawer */}
          {showMobilePalette && (
            <div className="fixed inset-0 z-50 bg-black/60 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 lg:hidden">
              <div className="max-w-md w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-2xl flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Grid size={18} className="text-blue-600 dark:text-blue-400" />
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Question Palette (60)
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowMobilePalette(false)}
                    className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono py-3 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-emerald-600 inline-block" />
                    <span className="text-slate-700 dark:text-slate-300">Answered ({answeredCount})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-purple-600 inline-block" />
                    <span className="text-slate-700 dark:text-slate-300">Review ({reviewCount})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-slate-300 dark:bg-slate-700 inline-block" />
                    <span className="text-slate-700 dark:text-slate-300">Unanswered ({unattemptedCount})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-blue-600 inline-block" />
                    <span className="text-slate-700 dark:text-slate-300">Current (Q{currentQuestionIndex + 1})</span>
                  </div>
                </div>

                <div className="flex-1 min-h-0 overflow-y-auto py-3 custom-scrollbar">
                  <div className="grid grid-cols-5 gap-2">
                    {EXAM_QUESTIONS.map((q, idx) => {
                      const isCurrent = currentQuestionIndex === idx;
                      const isAnswered = Boolean(selectedAnswers[q.id]);
                      const isMarked = Boolean(markedForReview[q.id]);

                      let btnStyle = "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300";
                      if (isCurrent) {
                        btnStyle = "bg-blue-600 border-blue-600 text-white ring-2 ring-blue-400 font-black";
                      } else if (isAnswered && isMarked) {
                        btnStyle = "bg-indigo-600 border-indigo-500 text-white font-bold";
                      } else if (isMarked) {
                        btnStyle = "bg-purple-600 border-purple-500 text-white font-bold";
                      } else if (isAnswered) {
                        btnStyle = "bg-emerald-600 border-emerald-500 text-white font-bold";
                      } else if (visitedQuestions[q.id]) {
                        btnStyle = "bg-slate-200 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-300";
                      }

                      return (
                        <button
                          key={q.id}
                          type="button"
                          onClick={() => {
                            goToQuestion(idx);
                            setShowMobilePalette(false);
                          }}
                          className={`h-9 rounded-xl border text-xs font-mono font-bold transition-all flex items-center justify-center cursor-pointer ${btnStyle}`}
                        >
                          {q.id}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => {
                      setShowMobilePalette(false);
                      setShowSubmitModal(true);
                    }}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
                  >
                    Submit Assessment
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ==================================================================== */}
      {/* CONFIRMATION SUBMISSION MODAL                                        */}
      {/* ==================================================================== */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/60 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-7 text-center space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/40 flex items-center justify-center shadow-xs">
              <CheckCircle2 size={34} />
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Submit Examination?
            </h3>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Once submitted, your responses will be evaluated against the marking scheme (+2.00 / -0.67). Are you sure you want to finalize your submission?
            </p>

            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 grid grid-cols-3 gap-3 text-center font-mono">
              <div>
                <span className="block text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-bold uppercase">Attempted</span>
                <span className="text-xl sm:text-2xl font-black text-emerald-700 dark:text-emerald-400">{answeredCount}</span>
              </div>
              <div>
                <span className="block text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-bold uppercase">Review</span>
                <span className="text-xl sm:text-2xl font-black text-purple-700 dark:text-purple-400">{reviewCount}</span>
              </div>
              <div>
                <span className="block text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-bold uppercase">Unattempted</span>
                <span className="text-xl sm:text-2xl font-black text-slate-700 dark:text-slate-300">{unattemptedCount}</span>
              </div>
            </div>

            <div className="flex items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-300 font-bold text-sm sm:text-base uppercase border border-slate-200 dark:border-transparent cursor-pointer transition-colors"
              >
                Return to Paper
              </button>
              <button
                type="button"
                onClick={() => handleFinalSubmission(false)}
                className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base uppercase tracking-wider shadow-md cursor-pointer transition-all"
              >
                Confirm Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* STAGE 3: OFFICIAL TRANSCRIPT & SCORECARD                             */}
      {/* ==================================================================== */}
      {examStage === "SCORECARD" && examResult && (
        <main className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 lg:p-8 custom-scrollbar">
          <div className="max-w-5xl w-full mx-auto space-y-6">
            {/* Header Result Card */}
            <div
              className={`rounded-3xl p-7 sm:p-9 border text-center relative overflow-hidden shadow-xs ${
                examResult.passed
                  ? "bg-gradient-to-b from-emerald-50 via-white to-emerald-50/40 dark:from-emerald-950/60 dark:to-slate-950 border-emerald-300 dark:border-emerald-500/40"
                  : "bg-gradient-to-b from-amber-50/60 via-white to-amber-50/20 dark:from-amber-950/30 dark:to-slate-950 border-amber-200 dark:border-amber-700/50"
              }`}
            >
              <div
                className={`w-20 h-20 mx-auto rounded-full border-2 flex items-center justify-center mb-4 ${
                  examResult.passed
                    ? "bg-emerald-100 dark:bg-emerald-500/20 border-emerald-400 dark:border-emerald-500 text-emerald-700 dark:text-emerald-400"
                    : "bg-amber-100 dark:bg-amber-500/20 border-amber-300 dark:border-amber-600 text-amber-700 dark:text-amber-400"
                }`}
              >
                {examResult.passed ? <Award size={44} /> : <XCircle size={44} />}
              </div>

              <span
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-mono font-bold uppercase tracking-widest inline-block mb-2.5 ${
                  examResult.passed
                    ? "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40"
                    : "bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-600/40"
                }`}
              >
                {examResult.passed
                  ? "OFFICIAL RESULT: PASSED • DIPLOMA CERTIFIED"
                  : "ASSESSMENT COMPLETED • PASSING MARK: 80.0%"}
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-950 dark:text-white">
                {examResult.passed
                  ? "Congratulations! You Cleared the Examination"
                  : "Assessment Completed - Passing Threshold 80.0%"}
              </h2>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mt-2 max-w-2xl mx-auto leading-relaxed">
                {examResult.passed
                  ? "You have successfully demonstrated mastery across Technical SEO, Google Ads, GA4 Analytics, and Growth Engineering."
                  : "The passing threshold for this certification is 80.0%. You can review course modules with your instructor before attempting your next evaluation."}
              </p>

              {/* Numerical Score */}
              <div className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
                <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-xs">
                  <span className="text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400 uppercase font-bold block mb-1">Final Score</span>
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white block">
                    {examResult.finalScore} <span className="text-sm font-mono text-slate-500 dark:text-slate-400">/ 120</span>
                  </span>
                </div>
                <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-xs">
                  <span className="text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400 uppercase font-bold block mb-1">Percentage</span>
                  <span
                    className={`text-2xl sm:text-3xl font-black block ${
                      examResult.passed ? "text-emerald-700 dark:text-emerald-400" : "text-amber-700 dark:text-amber-400"
                    }`}
                  >
                    {examResult.percentage}%
                  </span>
                </div>
                <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-xs">
                  <span className="text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400 uppercase font-bold block mb-1">Correct</span>
                  <span className="text-2xl sm:text-3xl font-black text-emerald-700 dark:text-emerald-400 block">
                    {examResult.totalCorrect} <span className="text-sm font-mono text-slate-500 dark:text-slate-400">/ 60</span>
                  </span>
                </div>
                <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-xs">
                  <span className="text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400 uppercase font-bold block mb-1">Penalty</span>
                  <span className="text-2xl sm:text-3xl font-black text-slate-700 dark:text-slate-300 block">
                    -{examResult.penaltyDeduction}
                  </span>
                </div>
              </div>
            </div>

            {/* Transcript Details */}
            <div className="bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs dark:shadow-none">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <span className="text-xs sm:text-sm font-mono uppercase text-slate-500 dark:text-slate-400 tracking-widest font-bold">
                  TOPIC PERFORMANCE BREAKDOWN
                </span>
                <span className="text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400 font-semibold">
                  REF: {examResult.certificateId}
                </span>
              </div>

              <div className="space-y-4">
                {Object.entries(examResult.domainScores).map(([secKey, secData]) => {
                  const pct = Math.round((secData.correct / secData.total) * 100);
                  return (
                    <div key={secKey} className="space-y-1.5">
                      <div className="flex justify-between text-sm sm:text-base font-mono">
                        <span className="text-slate-800 dark:text-slate-200 font-bold">{secData.name}</span>
                        <span className="text-slate-600 dark:text-slate-400 font-bold">
                          {secData.correct} / {secData.total} ({pct}%)
                        </span>
                      </div>
                      <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            pct >= 80 ? "bg-emerald-500" : pct >= 60 ? "bg-amber-500" : "bg-blue-500"
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Verification Metadata Box */}
            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 text-sm sm:text-base font-mono text-slate-600 dark:text-slate-400 space-y-2">
              <div className="flex justify-between">
                <span>Candidate:</span>
                <span className="text-slate-900 dark:text-white font-bold">{candidateName}</span>
              </div>
              <div className="flex justify-between">
                <span>Student ID:</span>
                <span className="text-slate-900 dark:text-white font-bold">{rollNumber}</span>
              </div>
              <div className="flex justify-between">
                <span>Evaluated At:</span>
                <span className="text-slate-900 dark:text-white">{examResult.submissionTimestamp}</span>
              </div>
              <div className="flex justify-between">
                <span>Proctor Audit:</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                  VALIDATED • {securityStrikes} / {MAX_WARNINGS} WARNINGS RECORDED
                </span>
              </div>
            </div>

            {/* Action Row */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => window.print()}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-colors cursor-pointer"
              >
                <Download size={16} />
                <span>Print / Save Transcript</span>
              </button>

              <div className="flex items-center gap-3.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    // Reset exam for practice
                    setExamStage("BRIEFING");
                    setSelectedAnswers({});
                    setMarkedForReview({});
                    setTimeRemaining(45 * 60);
                    setSecurityStrikes(0);
                    setStrikeAlert(null);
                  }}
                  className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm sm:text-base border border-slate-200 dark:border-transparent transition-colors cursor-pointer"
                >
                  Retake Diagnostic
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/dashboard")}
                  className="flex-1 sm:flex-none px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base tracking-wide shadow-md transition-all cursor-pointer"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default OfficialExamPage;
