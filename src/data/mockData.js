import socialMediaImg from '../assets/courses/social-media-marketing.png';
import advancedTopicsImg from '../assets/courses/advanced-topics-digital-marketing.png';
import creativeDesigningImg from '../assets/courses/creative-designing.png';
import googleAnalyticsImg from '../assets/courses/google-analytics.png';
import googleAdsImg from '../assets/courses/google-ads.png';
import wordpressImg from '../assets/courses/website-development-wordpress.png';
import seoImg from '../assets/courses/search-engine-optimization-seo.png';
import { IMPORTED_LMS_QUIZZES } from './importedLmsQuizzes';

export const COURSE_THUMBNAILS = {
    'course-1': socialMediaImg,
    'course-3': advancedTopicsImg,
    'course-4': creativeDesigningImg,
    'course-5': googleAnalyticsImg,
    'course-6': googleAdsImg,
    'course-7': wordpressImg,
    'course-8': seoImg,
};

export const INITIAL_COURSES = [
    {
        id: 'course-1',
        title: 'Social Media Marketing',
        category: 'Social Media',
        status: 'published',
        thumbnail: socialMediaImg,
        bannerGradient: 'from-blue-600 to-indigo-800',
        studentsCount: 185,
        completedCount: 130,
        rating: 4.8,
        reviewsCount: 52,
        author: 'OPERATING MEDIA',
        price: 0,
        duration: '20h 30m',
        lessonsCount: 10,
        updatedAt: 'Today',
        bracketText: "Gain comprehensive, practical knowledge of social media marketing and digital campaigns. This course covers step-by-step campaign setup, targeted audience reach, budget optimization, and conversion tracking across Meta, LinkedIn, Quora, and Twitter/X.",
        description: "Master modern social media marketing with practical frameworks, industry standard metrics, and hands-on campaign execution across Facebook, Instagram, LinkedIn, Quora, and Twitter/X.",
        overview: {
            greeting: "Welcome to the Social Media Marketing specialization. Master organic growth, paid ad campaigns, and multi-channel strategies.",
            whyChooseUsTitle: "Why Choose Us?",
            highlights: [
                { title: "Proven Strategies", desc: "Custom campaigns that boost engagement & conversions.", iconName: "TrendingUp" },
                { title: "Expert Team", desc: "Social media pros with years of industry experience.", iconName: "Users" },
                { title: "Data-Driven Insights", desc: "Real-time analytics for smarter marketing decisions.", iconName: "BarChart3" },
                { title: "Engaging Content", desc: "Captivating visuals and copy that resonate with your target audience.", iconName: "Sparkles" },
                { title: "Multi-Platform Approach", desc: "Facebook, Instagram, LinkedIn, Quora & Twitter/X.", iconName: "Layers" },
                { title: "Tailored Solutions", desc: "Strategies crafted specifically for your unique brand voice.", iconName: "Target" }
            ],
            curriculumSummary: [
                "Facebook & Instagram Paid Marketing",
                "LinkedIn Paid Marketing",
                "Quora Paid Marketing",
                "TwitterX Organic"
            ],
            callToAction: "Want to see results? Check out our success stories and case studies! Book a free consultation today and let's grow your brand together!",
            contact: {
                phone: "7700022882 / 9326474007",
                website: "www.operatingmedia.com"
            }
        }
    },
    {
        id: 'course-4',
        title: 'Creative Designing',
        category: 'Design & Media',
        status: 'published',
        thumbnail: creativeDesigningImg,
        bannerGradient: 'from-purple-500 to-pink-600',
        studentsCount: 98,
        completedCount: 76,
        rating: 4.5,
        reviewsCount: 19,
        author: 'OPERATING MEDIA',
        price: 0,
        duration: '16h 20m',
        lessonsCount: 6,
        updatedAt: '5 days ago',
        bracketText: "Elevate your brand with our innovative creative design services at Operating Media. We craft unique visuals—from custom branding to intuitive Creative Designing—that make your business stand out. Let’s bring your vision to life!",
        description: "Elevate your brand with our innovative creative design services at Operating Media. We craft unique visuals—from custom branding to intuitive Creative Designing—that make your business stand out. Let’s bring your vision to life! Learn Canva for Graphic Design, social media creatives, and creative designing essentials for digital marketing.",
        overview: {
            greeting: "Thank you for showing interest in our Creative Design services at Operating Media, one of Mumbai's leading digital marketing experts!",
            whyChooseUsTitle: "Why Choose Our Creative Design Track?",
            highlights: [
                { title: "Innovative Design Solutions", desc: "Over 15 years of experience crafting eye-catching, unique designs that elevate brand identity.", iconName: "Sparkles" },
                { title: "Customized Creative Strategies", desc: "Tailored design concepts developed to match your brand's personality and goals.", iconName: "Target" },
                { title: "Comprehensive Branding", desc: "In-depth analysis and strategy to uncover your brand's unique voice and visual style.", iconName: "Layers" },
                { title: "UI/UX Excellence", desc: "Creating intuitive, user-friendly interfaces that enhance user experience and engagement.", iconName: "Laptop" },
                { title: "Transparent Collaboration", desc: "Regular, detailed updates and clear communication to keep you in the loop.", iconName: "Users" },
                { title: "Local & Global Expertise", desc: "Design solutions that resonate both locally and on a global stage.", iconName: "Award" },
                { title: "Expert Creative Team", desc: "Work with seasoned professionals dedicated to making your brand stand out.", iconName: "Users" },
                { title: "Ongoing Innovation & Support", desc: "Continuous creative enhancements and support to ensure your brand always stays ahead.", iconName: "ShieldCheck" }
            ],
            curriculumSummary: [
                "Creative Designing Essentials"
            ],
            callToAction: "Would you like to schedule a free creative consultation or see a demo of our latest design portfolio? Let us know, and we'll arrange it for you!",
            contact: {
                phone: "7700022882 / 9326474007",
                website: "www.operatingmedia.com"
            }
        }
    },
    {
        id: 'course-3',
        title: 'Growth Marketing & Specialized Channels',
        category: 'Growth & Specialized Channels',
        status: 'published',
        thumbnail: advancedTopicsImg,
        bannerGradient: 'from-sky-500 to-blue-700',
        studentsCount: 142,
        completedCount: 88,
        rating: 4.9,
        reviewsCount: 34,
        author: 'OPERATING MEDIA',
        price: 0,
        duration: '32h 10m',
        lessonsCount: 20,
        updatedAt: '4 days ago',
        bracketText: "This course offers a comprehensive overview of growth marketing and specialized channels, teaching you how to integrate and use them to meet business and acquisition goals across Affiliate, Influencer, WhatsApp, Mobile, ORM, Viral Loops, Content Strategy, and Freelancing.",
        description: "Master high-impact growth strategies and specialized digital channels across Affiliate Marketing, Influencer Marketing, WhatsApp Marketing, Mobile Marketing, ORM, Viral Marketing, Content Marketing, and Digital Marketing Freelancing.",
        overview: {
            greeting: "Thank you for your interest in our Masters Program in Growth Marketing & Specialized Channels at Operating Media! 🚀",
            whyChooseUsTitle: "What Sets Our Growth & Specialized Program Apart:",
            highlights: [
                { title: "Deep Industry Insights", desc: "Gain exposure to cutting-edge digital strategies and real-world case studies.", iconName: "TrendingUp" },
                { title: "Advanced Analytics & Data-Driven Marketing", desc: "Master data interpretation, performance metrics, and analytics tools to drive impactful campaigns.", iconName: "BarChart3" },
                { title: "Innovative SEO & SEM Techniques", desc: "Learn the latest search optimization and paid advertising strategies to stay ahead in the competitive market.", iconName: "Search" },
                { title: "Performance Marketing & PPC Optimization", desc: "Explore advanced tactics for maximizing ROI through smart, results-driven campaigns.", iconName: "Target" },
                { title: "Programmatic Advertising & Automation", desc: "Understand how automation and programmatic buying reshape digital advertising.", iconName: "Cpu" },
                { title: "Comprehensive Curriculum", desc: "Covering everything from AI-driven marketing and content strategy to advanced conversion optimization.", iconName: "Layers" },
                { title: "Hands-On Experience", desc: "Work on live projects and simulations to apply advanced concepts in real-world scenarios.", iconName: "CheckCircle2" },
                { title: "Expert Mentorship", desc: "Learn from industry veterans with extensive experience and a passion for teaching.", iconName: "Users" }
            ],
            curriculumSummary: [
                "Affiliate Marketing",
                "Influencer Marketing",
                "Whatsapp Marketing",
                "Mobile Marketing",
                "Online Reputation Management (ORM)",
                "Viral Marketing",
                "Content Marketing",
                "Digital Marketing Freelancing"
            ],
            callToAction: "Our Masters Program in Growth Marketing & Specialized Channels is meticulously designed to elevate your skills and transform your career. Explore our syllabus or schedule a 1:1 counseling session or demo class.",
            contact: {
                phone: "7700022882 / 9326474007",
                website: "www.operatingmedia.com"
            }
        }
    },
    {
        id: 'course-6',
        title: 'Google Ads',
        category: 'Paid Media',
        status: 'published',
        thumbnail: googleAdsImg,
        bannerGradient: 'from-amber-500 to-orange-600',
        studentsCount: 210,
        completedCount: 150,
        rating: 4.7,
        reviewsCount: 65,
        author: 'OPERATING MEDIA',
        price: 0,
        duration: '26h 00m',
        lessonsCount: 12,
        updatedAt: 'Yesterday',
        bracketText: "Google Ads is an online advertising platform where businesses can create paid advertisements to appear on Google search results, YouTube, and other Google partner websites. Advertisers bid on keywords, and Google shows the most relevant ads to users based on their search intent.",
        description: "Google Ads is an online advertising platform where businesses can create paid advertisements to appear on Google search results, YouTube, and other Google partner websites. Advertisers bid on keywords, and Google shows the most relevant ads to users based on their search intent. Run profitable Search, Display, Video, Shopping, and Smart campaigns with tracking templates and conversion tracking.",
        overview: {
            greeting: "Thank you for showing interest in our Google Ads management and training at Operating Media!",
            whyChooseUsTitle: "What Sets Our Google Ads Program Apart:",
            highlights: [
                { title: "Proven Expertise", desc: "With years of experience in digital advertising, we create campaigns that deliver measurable results.", iconName: "Award" },
                { title: "Data-Driven Strategies", desc: "We utilize advanced analytics and comprehensive keyword research to target the right audience for your business.", iconName: "BarChart3" },
                { title: "Customized Campaigns", desc: "Each campaign is tailored to your specific business goals, ensuring optimal ad spend and maximum ROI.", iconName: "Target" },
                { title: "Transparent Reporting", desc: "Stay informed with detailed performance reports that clearly outline your campaign's progress and success.", iconName: "FileText" },
                { title: "Continuous Optimization", desc: "Our team monitors and adjusts your campaigns in real time to ensure peak performance and capitalize on emerging opportunities.", iconName: "TrendingUp" }
            ],
            curriculumSummary: [
                "Introduction",
                "Campaigns",
                "Performance Tracking",
                "Tests & Assignments"
            ],
            callToAction: "Ready to boost your online visibility and drive conversions with targeted ads? Let's schedule a 1:1 consultation to explore how our Google Ads services can help your business grow.",
            contact: {
                phone: "7700022882 / 9326474007",
                website: "www.operatingmedia.com"
            }
        }
    },
    {
        id: 'course-5',
        title: 'Google Analytics Course',
        category: 'Data & Analytics',
        status: 'published',
        thumbnail: googleAnalyticsImg,
        bannerGradient: 'from-emerald-500 to-green-600',
        studentsCount: 130,
        completedCount: 90,
        rating: 4.6,
        reviewsCount: 28,
        author: 'OPERATING MEDIA',
        price: 0,
        duration: '14h 45m',
        lessonsCount: 3,
        updatedAt: '3 days ago',
        bracketText: "Learning web analytics is important because it helps you discover what is happening on your website and why is it happening. Information extracted from analytics can be used to improve the effectiveness of your marketing and advertising strategies",
        description: "Learning web analytics is important because it helps you discover what is happening on your website and why is it happening. Information extracted from analytics can be used to improve the effectiveness of your marketing and advertising strategies. Complete Google Analytics exploration, real-time user data analysis, and user behavior metrics.",
        overview: {
            greeting: "Thank you for showing interest in Operating Media's Google Analytics Course—your gateway to mastering data-driven decision-making in digital marketing!",
            whyChooseUsTitle: "What Sets Our Course Apart:",
            highlights: [
                { title: "Industry-Relevant Curriculum", desc: "Learn the ins and outs of Google Analytics—from basic tracking to advanced data interpretation—designed to empower you with actionable insights.", iconName: "BookOpen" },
                { title: "Expert Trainers", desc: "Our instructors bring years of real-world experience in data analytics and digital marketing, ensuring you get practical, hands-on training.", iconName: "Users" },
                { title: "Real-World Projects", desc: "Engage in live projects and case studies that provide practical exposure, making your learning both relevant and impactful.", iconName: "CheckCircle2" },
                { title: "Comprehensive LMS Access", desc: "Access our state-of-the-art Learning Management System anytime, anywhere—enabling flexible, self-paced learning that fits your lifestyle.", iconName: "Laptop" },
                { title: "Micro Batch Size", desc: "Enjoy personalized attention with small batch sizes, ensuring you get the support and guidance you need.", iconName: "Users" },
                { title: "Flexible Learning Options", desc: "Choose from multiple batch timings to find the perfect schedule that fits your busy life.", iconName: "Clock" },
                { title: "Industry Certification", desc: "Earn a recognized certificate upon course completion, enhancing your credentials in the competitive digital marketing landscape.", iconName: "Award" },
                { title: "Latest Tools & Techniques", desc: "Stay ahead of the curve with training on the latest tools, techniques, and best practices in digital analytics.", iconName: "Layers" }
            ],
            curriculumSummary: [
                "Exploring Google Analytics"
            ],
            callToAction: "Want to learn more? Explore our LMS modules or schedule a 1:1 counseling session with our senior analytics trainers or attend a free demo class.",
            contact: {
                phone: "7700022882 / 9326474007",
                website: "www.operatingmedia.com"
            }
        }
    },
    {
        id: 'course-7',
        title: 'Website Development With WordPress',
        category: 'Web Development',
        status: 'published',
        thumbnail: wordpressImg,
        bannerGradient: 'from-teal-600 to-cyan-700',
        studentsCount: 166,
        completedCount: 120,
        rating: 4.8,
        reviewsCount: 42,
        author: 'OPERATING MEDIA',
        price: 0,
        duration: '22h 15m',
        lessonsCount: 3,
        updatedAt: '1 week ago',
        bracketText: "WordPress is a free and open source content management system (CMS) developed on PHP and MySQL. You can use WordPress to create your own website or blog without programming knowledge. It has many features including plug-in architecture and template system. WordPress is used by over 15% of “top 1 million” websites and is currently the most popular blogging system in use.",
        description: "WordPress is a free and open source content management system (CMS) developed on PHP and MySQL. You can use WordPress to create your own website or blog without programming knowledge. It has many features including plug-in architecture and template system. WordPress is used by over 15% of “top 1 million” websites and is currently the most popular blogging system in use. Master website creation, feature extensions, and responsive mobile optimization.",
        overview: {
            greeting: "Thank you for showing interest in Operating Media, your trusted partner for WordPress website development!",
            whyChooseUsTitle: "What Sets Us Apart:",
            highlights: [
                { title: "Years of Experience", desc: "Crafting high-quality, custom WordPress websites with modern web standards.", iconName: "Award" },
                { title: "Custom Designs", desc: "Unique, tailor-made designs that truly reflect your brand identity.", iconName: "Sparkles" },
                { title: "Responsive & Mobile-Optimized", desc: "Websites that look stunning and perform flawlessly across all desktop and mobile devices.", iconName: "Laptop" },
                { title: "Robust Functionality", desc: "Seamless integration of plugins and custom features to enhance user experience.", iconName: "Layers" },
                { title: "SEO & Speed Optimization", desc: "Fast-loading, search engine-friendly websites to boost your online visibility.", iconName: "TrendingUp" },
                { title: "E-commerce Solutions", desc: "Powerful WooCommerce integrations for online store setups and catalog management.", iconName: "CheckCircle2" },
                { title: "Easy Content Management", desc: "User-friendly admin interfaces that empower you to manage content effortlessly.", iconName: "FileText" },
                { title: "Ongoing Support & Maintenance", desc: "Comprehensive post-launch support to keep your website secure and up-to-date.", iconName: "ShieldCheck" }
            ],
            curriculumSummary: [
                "WordPress Website Creation & Features"
            ],
            callToAction: "Want to know more? Explore our portfolio and case studies to see our work in action, and schedule a free consultation or demo to experience how we can transform your digital presence!",
            contact: {
                phone: "7700022882 / 9326474007",
                website: "www.operatingmedia.com"
            }
        }
    },
    {
        id: 'course-8',
        title: 'Search Engine Optimization (SEO)',
        category: 'Digital Marketing',
        status: 'published',
        thumbnail: seoImg,
        bannerGradient: 'from-blue-500 to-indigo-600',
        studentsCount: 147,
        completedCount: 100,
        rating: 5.0,
        reviewsCount: 38,
        author: 'OPERATING MEDIA',
        price: 0,
        duration: '18h 30m',
        lessonsCount: 28,
        updatedAt: '2 days ago',
        bracketText: "Search engine optimization (SEO) is an essential practice for any website looking to improve its visibility and attract more organic traffic. In today's digital age, most users rely on search engines like Google, Bing, or Yahoo to find information, products, and services they need.",
        description: "Search engine optimization (SEO) is an essential practice for any website looking to improve its visibility and attract more organic traffic. In today's digital age, most users rely on search engines like Google, Bing, or Yahoo to find information, products, and services they need. Master SEO Basics, Google Algorithm updates, On-page SEO, Off-page SEO, Google Tag Manager (GTM), Local SEO, and practical tests.",
        overview: {
            greeting: "Thank you for showing interest in our SEO services and certification track at Operating Media, one of Mumbai's leading digital marketing experts!",
            whyChooseUsTitle: "Why Choose Our SEO Program?",
            highlights: [
                { title: "Proven Track Record", desc: "Over 15 years of experience driving organic growth and boosting online visibility.", iconName: "Award" },
                { title: "Customized SEO Strategies", desc: "Tailored plans designed to meet your business's unique needs and goals.", iconName: "Target" },
                { title: "Comprehensive Keyword Research", desc: "In-depth analysis to uncover high-value search intent opportunities for your niche.", iconName: "Search" },
                { title: "On-Page & Off-Page Optimization", desc: "Enhancing both your website's content and authority to improve search rankings.", iconName: "Layers" },
                { title: "Transparent Reporting", desc: "Regular, detailed reports that keep you informed about performance and ROI.", iconName: "BarChart3" },
                { title: "Local & Global SEO Expertise", desc: "Strategies that cater to both local search dominance and global reach.", iconName: "TrendingUp" },
                { title: "Expert Team", desc: "Work with seasoned SEO professionals dedicated to your online success.", iconName: "Users" },
                { title: "Continuous Monitoring & Support", desc: "Ongoing analysis and adjustments to ensure sustained organic growth.", iconName: "ShieldCheck" }
            ],
            curriculumSummary: [
                "Basics SEO",
                "Google Algorithm",
                "Onpage SEO",
                "Offpage SEO",
                "GTM",
                "Local SEO",
                "Tests & Assignments"
            ],
            callToAction: "Would you like to schedule a free SEO consultation or see a demo of our latest performance dashboard? Let us know, and we'll arrange it for you!",
            contact: {
                phone: "7700022882 / 9326474007",
                website: "www.operatingmedia.com"
            }
        }
    }
];
export { INITIAL_UNITS } from './initialUnits';
export const INITIAL_QUIZZES = IMPORTED_LMS_QUIZZES;
export const INITIAL_ASSIGNMENTS = [
    {
        id: 'a-cd-1',
        courseId: 'course-4',
        courseTitle: 'Creative Designing',
        title: 'Social Media Ad Campaign Design System (Figma File)',
        dueDate: '2026-10-05',
        totalSubmissions: 68,
        pendingGrading: 5,
        maxScore: 100,
        status: 'pending',
        instructions: 'Provide public Figma link with component library, color styles, typography tokens, and 6 ad variations.'
    },
    {
        id: 'a-adv-cr',
        courseId: 'course-3',
        courseTitle: 'Growth Marketing & Specialized Channels',
        title: 'Career Roadmap & Goal Setting Worksheet',
        dueDate: '2026-10-10',
        totalSubmissions: 140,
        pendingGrading: 14,
        maxScore: 100,
        status: 'pending',
        instructions: 'Complete the digital marketing specialization selection matrix based on your career goals.'
    },
    {
        id: 'a-smm-1',
        courseId: 'course-1',
        courseTitle: 'Social Media Marketing',
        title: '30-Day Social Media Content Calendar & Viral Strategy',
        dueDate: '2026-10-12',
        totalSubmissions: 72,
        pendingGrading: 7,
        maxScore: 100,
        status: 'pending',
        instructions: 'Build an omnichannel editorial calendar with caption copywriting and visual references.'
    },
    {
        id: 'a-seo-1',
        courseId: 'course-8',
        courseTitle: 'Search Engine Optimization (SEO)',
        title: 'SEO Audit & Competitor Analysis Report',
        dueDate: '2026-10-15',
        totalSubmissions: 58,
        pendingGrading: 8,
        maxScore: 100,
        status: 'pending',
        instructions: 'Analyze 3 competitor websites and provide actionable SEO improvement recommendations.'
    },
    {
        id: 'a-gads-em',
        courseId: 'course-6',
        courseTitle: 'Google Ads',
        title: 'Email Marketing Automation Flow',
        dueDate: '2026-10-18',
        totalSubmissions: 41,
        pendingGrading: 6,
        maxScore: 100,
        status: 'pending',
        instructions: 'Design a complete email drip campaign with workflow and copy for onboarding sequence.'
    },
    {
        id: 'a-ga-1',
        courseId: 'course-5',
        courseTitle: 'Google Analytics Course',
        title: 'Google Analytics 4 Tracking Implementation',
        dueDate: '2026-10-20',
        totalSubmissions: 33,
        pendingGrading: 4,
        maxScore: 100,
        status: 'pending',
        instructions: 'Implement GA4 tracking for a demo website and submit event tracking report.'
    },
    {
        id: 'a-adv-1',
        courseId: 'course-3',
        courseTitle: 'Growth Marketing & Specialized Channels',
        title: 'Affiliate Marketing Assignment',
        dueDate: '2026-10-22',
        totalSubmissions: 86,
        pendingGrading: 6,
        maxScore: 100,
        status: 'pending',
        instructions: 'Create an affiliate product comparison bridge page and integrate compliance disclaimers.'
    },
    {
        id: 'a-adv-2',
        courseId: 'course-3',
        courseTitle: 'Growth Marketing & Specialized Channels',
        title: 'Influencer Marketing Assignment-1',
        dueDate: '2026-10-25',
        totalSubmissions: 74,
        pendingGrading: 9,
        maxScore: 100,
        status: 'pending',
        instructions: 'Curate a 10-tier influencer list across beauty and tech niches with outreach templates.'
    },
    {
        id: 'a-adv-3',
        courseId: 'course-3',
        courseTitle: 'Growth Marketing & Specialized Channels',
        title: 'Influencer Marketing Assignment-2',
        dueDate: '2026-10-28',
        totalSubmissions: 62,
        pendingGrading: 4,
        maxScore: 100,
        status: 'pending',
        instructions: 'Draft an influencer barter collaboration agreement and campaign KPI scorecard.'
    },
    {
        id: 'a-adv-4',
        courseId: 'course-3',
        courseTitle: 'Growth Marketing & Specialized Channels',
        title: 'Mobile Marketing Assignment',
        dueDate: '2026-11-02',
        totalSubmissions: 58,
        pendingGrading: 7,
        maxScore: 100,
        status: 'pending',
        instructions: 'Conduct Google Play & Apple App Store metadata audit and draft 5 push notification copies.'
    },
    {
        id: 'a-adv-5',
        courseId: 'course-3',
        courseTitle: 'Growth Marketing & Specialized Channels',
        title: 'Online Reputation Management (ORM) Assignment',
        dueDate: '2026-11-05',
        totalSubmissions: 69,
        pendingGrading: 5,
        maxScore: 100,
        status: 'pending',
        instructions: 'Create an ORM crisis management manual and response matrix for negative customer feedback.'
    },
    {
        id: 'a-adv-6',
        courseId: 'course-3',
        courseTitle: 'Growth Marketing & Specialized Channels',
        title: 'Viral Marketing Assignment-1',
        dueDate: '2026-11-08',
        totalSubmissions: 71,
        pendingGrading: 8,
        maxScore: 100,
        status: 'pending',
        instructions: 'Design a meme marketing campaign pack consisting of 5 topical memes for social channels.'
    },
    {
        id: 'a-adv-7',
        courseId: 'course-3',
        courseTitle: 'Growth Marketing & Specialized Channels',
        title: 'Viral Marketing Assignment-2',
        dueDate: '2026-11-12',
        totalSubmissions: 55,
        pendingGrading: 3,
        maxScore: 100,
        status: 'pending',
        instructions: 'Engineer a referral viral loop mechanism with tier unlocking and share incentive triggers.'
    },
    {
        id: 'a-adv-8',
        courseId: 'course-3',
        courseTitle: 'Growth Marketing & Specialized Channels',
        title: 'Content Marketing Assignment-1',
        dueDate: '2026-11-15',
        totalSubmissions: 82,
        pendingGrading: 4,
        maxScore: 100,
        status: 'pending',
        instructions: 'Develop a 90-day pillar content framework with lead magnet gate and distribution schedule.'
    },
    {
        id: 'a-adv-9',
        courseId: 'course-3',
        courseTitle: 'Growth Marketing & Specialized Channels',
        title: 'Content Marketing Assignment-2',
        dueDate: '2026-11-18',
        totalSubmissions: 60,
        pendingGrading: 6,
        maxScore: 100,
        status: 'pending',
        instructions: 'Write a 2,000-word authoritative case study with data charts and actionable takeaways.'
    },
    {
        id: 'a-adv-10',
        courseId: 'course-3',
        courseTitle: 'Growth Marketing & Specialized Channels',
        title: 'Freelance Digital Marketing Assignment',
        dueDate: '2026-11-22',
        totalSubmissions: 78,
        pendingGrading: 5,
        maxScore: 100,
        status: 'pending',
        instructions: 'Build your client proposal deck, scope-of-work agreement, and pricing tier packages.'
    },
    {
        id: 'a-wp-1',
        courseId: 'course-7',
        courseTitle: 'Website Development With WordPress',
        title: 'Build a Live 5-Page Business Website on WordPress Sandbox',
        dueDate: '2026-11-25',
        totalSubmissions: 115,
        pendingGrading: 8,
        maxScore: 100,
        status: 'pending',
        instructions: 'Submit your staging URL, admin credentials, and lighthouse performance test screenshot.'
    },
    {
        id: 'a-gads-1',
        courseId: 'course-6',
        courseTitle: 'Google Ads',
        title: 'Full-Funnel Google Search Ads Campaign Structure',
        dueDate: '2026-11-28',
        totalSubmissions: 88,
        pendingGrading: 10,
        maxScore: 100,
        status: 'pending',
        instructions: 'Structure responsive search ads, ad extensions, and negative keyword lists for a service business.'
    }
];
export const INITIAL_STUDENTS = [
    {
        id: 'std-266',
        admissionNo: 'OMC-0266',
        name: 'Aditya Jadhav',
        email: 'adityajadhav14@gmail.com',
        phone: '+91 80972 12986',
        avatar: '/student_photo_266.jpg',
        courseId: 'course-8',
        courseName: 'Search Engine Optimization (SEO)',
        batch: 'Weekday Morning (WD-M1, 10:00 AM - 12:00 PM)',
        branch: 'Andheri Center',
        attendancePercentage: 89.3,
        totalLectures: 28,
        attendedLectures: 25,
        feeTotal: 35000,
        feePaid: 25000,
        feeDue: 10000,
        feeStatus: 'Partial Due',
        overallProgress: 65,
        completedLessonsCount: 18,
        totalLessonsCount: 28,
        joinedDate: '2026-01-15',
        status: 'active',
        isCrmSynced: true
    },
    {
        id: 'std-264',
        admissionNo: 'OMC-0264',
        name: 'Sakshi Kesharwani',
        email: 'sakshi.kesharwani@gmail.com',
        phone: '+91 91362 27195',
        avatar: '/student_photo_264.jpg',
        courseId: 'course-6',
        courseName: 'Google Ads',
        batch: 'Weekday Afternoon (WD-A1, 02:00 PM - 04:00 PM)',
        branch: 'Borivali Center',
        attendancePercentage: 92.8,
        totalLectures: 28,
        attendedLectures: 26,
        feeTotal: 35000,
        feePaid: 35000,
        feeDue: 0,
        feeStatus: 'Cleared',
        overallProgress: 84,
        completedLessonsCount: 29,
        totalLessonsCount: 35,
        joinedDate: '2026-01-18',
        status: 'active',
        isCrmSynced: true
    },
    {
        id: 'std-267',
        admissionNo: 'OMC-0267',
        name: 'Ram Charan',
        email: 'ramcharan0811@gmail.com',
        phone: '+91 73047 48384',
        avatar: '/student_photo_267.jpg',
        courseId: 'course-1',
        courseName: 'Social Media Marketing',
        batch: 'Weekend Batch (WE-D1, 02:00 PM - 06:00 PM)',
        branch: 'Andheri Center',
        attendancePercentage: 82.1,
        totalLectures: 28,
        attendedLectures: 23,
        feeTotal: 28000,
        feePaid: 20000,
        feeDue: 8000,
        feeStatus: 'Partial Due',
        overallProgress: 48,
        completedLessonsCount: 11,
        totalLessonsCount: 22,
        joinedDate: '2026-03-04',
        status: 'active',
        isCrmSynced: true
    },
    {
        id: 'std-265',
        admissionNo: 'OMC-0265',
        name: 'Hiteshpuri Goswami',
        email: 'hiteshpuri.g@gmail.com',
        phone: '+91 74001 23992',
        avatar: null,
        courseId: 'course-7',
        courseName: 'Website Development With WordPress',
        batch: 'Weekday Morning (WD-M2, 10:00 AM - 12:00 PM)',
        branch: 'Borivali Center',
        attendancePercentage: 75.0,
        totalLectures: 28,
        attendedLectures: 21,
        feeTotal: 28000,
        feePaid: 18000,
        feeDue: 10000,
        feeStatus: 'Partial Due',
        overallProgress: 42,
        completedLessonsCount: 13,
        totalLessonsCount: 30,
        joinedDate: '2026-02-10',
        status: 'active',
        isCrmSynced: true
    },
    {
        id: 'std-1',
        admissionNo: 'OMC-0260',
        name: 'Aarav Patel',
        email: 'aarav.patel@example.com',
        phone: '+91 98201 44512',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        courseId: 'course-7',
        courseName: 'Website Development With WordPress',
        batch: 'Weekday Fastrack (WD-F1, 11:00 AM - 01:00 PM)',
        branch: 'Andheri Center',
        attendancePercentage: 96.4,
        totalLectures: 28,
        attendedLectures: 27,
        feeTotal: 22000,
        feePaid: 22000,
        feeDue: 0,
        feeStatus: 'Cleared',
        overallProgress: 78,
        completedLessonsCount: 23,
        totalLessonsCount: 30,
        joinedDate: '2026-01-12',
        status: 'active',
        isCrmSynced: false
    },
    {
        id: 'std-2',
        admissionNo: 'OMC-0258',
        name: 'Priya Sharma',
        email: 'priya.sharma@example.com',
        phone: '+91 99302 88471',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        courseId: 'course-8',
        courseName: 'Search Engine Optimization (SEO)',
        batch: 'Weekend Masterclass (WE-S1, 10:00 AM - 02:00 PM)',
        branch: 'Andheri Center',
        attendancePercentage: 92.0,
        totalLectures: 25,
        attendedLectures: 23,
        feeTotal: 18000,
        feePaid: 18000,
        feeDue: 0,
        feeStatus: 'Cleared',
        overallProgress: 92,
        completedLessonsCount: 26,
        totalLessonsCount: 28,
        joinedDate: '2025-11-04',
        status: 'active',
        isCrmSynced: false
    },
    {
        id: 'std-3',
        admissionNo: 'OMC-0255',
        name: 'Rohan Mehta',
        email: 'rohan.mehta@example.com',
        phone: '+91 97690 12345',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        courseId: 'course-6',
        courseName: 'Google Ads',
        batch: 'Weekday Evening (WD-E1, 05:00 PM - 07:00 PM)',
        branch: 'Online / Remote',
        attendancePercentage: 85.7,
        totalLectures: 28,
        attendedLectures: 24,
        feeTotal: 24000,
        feePaid: 24000,
        feeDue: 0,
        feeStatus: 'Cleared',
        overallProgress: 55,
        completedLessonsCount: 19,
        totalLessonsCount: 35,
        joinedDate: '2026-02-18',
        status: 'active',
        isCrmSynced: false
    },
    {
        id: 'std-4',
        admissionNo: 'OMC-0252',
        name: 'Ananya Gupta',
        email: 'ananya.g@example.com',
        phone: '+91 98199 55667',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
        courseId: 'course-5',
        courseName: 'Google Analytics',
        batch: 'Weekend Analytics Cohort (WE-A1, 03:00 PM - 06:00 PM)',
        branch: 'Andheri Center',
        attendancePercentage: 100.0,
        totalLectures: 20,
        attendedLectures: 20,
        feeTotal: 16000,
        feePaid: 16000,
        feeDue: 0,
        feeStatus: 'Cleared',
        overallProgress: 100,
        completedLessonsCount: 18,
        totalLessonsCount: 18,
        joinedDate: '2025-09-15',
        status: 'completed',
        isCrmSynced: false
    },
    {
        id: 'std-5',
        admissionNo: 'OMC-0249',
        name: 'Kabir Verma',
        email: 'kabir.v@example.com',
        phone: '+91 98670 99881',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        courseId: 'course-1',
        courseName: 'Social Media Marketing',
        batch: 'Weekday Morning (WD-S1, 10:00 AM - 12:00 PM)',
        branch: 'Borivali Center',
        attendancePercentage: 68.0,
        totalLectures: 25,
        attendedLectures: 17,
        feeTotal: 20000,
        feePaid: 12000,
        feeDue: 8000,
        feeStatus: 'Overdue',
        overallProgress: 30,
        completedLessonsCount: 7,
        totalLessonsCount: 22,
        joinedDate: '2026-03-01',
        status: 'active',
        isCrmSynced: false
    },
    {
        id: 'std-6',
        admissionNo: 'OMC-0246',
        name: 'Tanvi Kulkarni',
        email: 'tanvi.kulkarni@example.com',
        phone: '+91 97022 33445',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
        courseId: 'course-4',
        courseName: 'Creative Designing',
        batch: 'Weekday Afternoon (WD-CD1, 02:00 PM - 04:00 PM)',
        branch: 'Andheri Center',
        attendancePercentage: 91.3,
        totalLectures: 23,
        attendedLectures: 21,
        feeTotal: 18000,
        feePaid: 18000,
        feeDue: 0,
        feeStatus: 'Cleared',
        overallProgress: 80,
        completedLessonsCount: 16,
        totalLessonsCount: 20,
        joinedDate: '2026-01-22',
        status: 'active',
        isCrmSynced: false
    },
    {
        id: 'std-7',
        admissionNo: 'OMC-0242',
        name: 'Devendra Deshmukh',
        email: 'devendra.d@example.com',
        phone: '+91 98211 77889',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
        courseId: 'course-3',
        courseName: 'Growth Marketing & Specialized Channels',
        batch: 'Weekend Advanced (WE-AT1, 11:00 AM - 03:00 PM)',
        branch: 'Andheri Center',
        attendancePercentage: 88.0,
        totalLectures: 25,
        attendedLectures: 22,
        feeTotal: 32000,
        feePaid: 28000,
        feeDue: 4000,
        feeStatus: 'Partial Due',
        overallProgress: 64,
        completedLessonsCount: 13,
        totalLessonsCount: 20,
        joinedDate: '2025-12-05',
        status: 'active',
        isCrmSynced: false
    },
    {
        id: 'std-8',
        admissionNo: 'OMC-0239',
        name: 'Ishita Shah',
        email: 'ishita.shah@example.com',
        phone: '+91 99677 11223',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        courseId: 'course-7',
        courseName: 'Website Development With WordPress',
        batch: 'WordPress Cohort 2026',
        branch: 'Borivali Center',
        attendancePercentage: 100.0,
        totalLectures: 3,
        attendedLectures: 3,
        feeTotal: 25000,
        feePaid: 25000,
        feeDue: 0,
        feeStatus: 'Cleared',
        overallProgress: 100,
        completedLessonsCount: 3,
        totalLessonsCount: 3,
        joinedDate: '2026-03-10',
        status: 'completed',
        isCrmSynced: false
    }
];
export const INITIAL_QUESTIONS = [
    {
        id: 'quest-1',
        text: 'Which HTML tag is most critical for search engine page title evaluation?',
        category: 'SEO',
        difficulty: 'Easy',
        type: 'Multiple Choice',
        options: ['<meta>', '<title>', '<h1>', '<header>'],
        correctAnswer: '<title>'
    },
    {
        id: 'quest-2',
        text: 'What does GA4 use as its primary measurement model?',
        category: 'Google Analytics',
        difficulty: 'Medium',
        type: 'Multiple Choice',
        options: ['Session-based', 'Event-based', 'Pageview-based', 'Hit-based'],
        correctAnswer: 'Event-based'
    },
    {
        id: 'quest-3',
        text: 'True or False: WordPress plugins can execute PHP code directly on the web server.',
        category: 'WordPress',
        difficulty: 'Easy',
        type: 'True/False',
        options: ['True', 'False'],
        correctAnswer: 'True'
    }
];
export const INITIAL_DISCUSSIONS = [
    {
        id: 'disc-1',
        courseId: 'course-8',
        courseTitle: 'Search Engine Optimization (SEO)',
        authorName: 'Sneha Roy',
        authorRole: 'Student',
        authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
        title: 'How do you handle Core Web Vitals LCP latency on WordPress with heavy images?',
        content: 'Hi everyone, my client website score on mobile is LCP 4.2s due to hero image preload issues. What plugin or CDN setting worked best for you?',
        repliesCount: 2,
        createdAt: '3 hours ago',
        category: 'Technical SEO',
        community: 'seo-mastery',
        authorHandle: 'sneharoy',
        upvotes: 24,
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&auto=format&fit=crop&q=80',
        linkUrl: 'https://web.dev/articles/optimize-lcp',
        isPinned: true,
        replies: [
            {
                id: 'rep-1-1',
                authorName: 'Vikram Malhotra',
                authorRole: 'Instructor',
                authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
                content: 'Ensure you add fetchpriority="high" to your featured hero image tag and exclude it from lazy-loading. Also enable Cloudflare Polish with WebP conversion.',
                createdAt: '2 hours ago',
                isOfficial: true,
                likesCount: 6,
                replies: [
                    {
                        id: 'rep-1-2',
                        authorName: 'Rohan Mehta',
                        authorRole: 'Student',
                        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
                        content: '@Vikram Malhotra Using FlyingPress with BunnyCDN brought our score down to 1.8s! Highly recommend checking image dimensions on mobile viewport.',
                        createdAt: '1 hour ago',
                        isOfficial: false,
                        likesCount: 3,
                        replies: [
                            {
                                id: 'rep-1-3',
                                authorName: 'Harsh Pareek',
                                authorRole: 'Instructor',
                                authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
                                content: '@Rohan Mehta Spot on Rohan! BunnyCDN edge optimizer paired with modern CSS Flexbox containers is the gold standard for sub-2s mobile LCP.',
                                createdAt: '45 min ago',
                                isOfficial: true,
                                likesCount: 5,
                                replies: [
                                    {
                                        id: 'rep-1-4',
                                        authorName: 'Priya Sharma',
                                        authorRole: 'Student',
                                        authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
                                        content: '@Harsh Pareek Thank you sir! Should we also purge local browser cache before re-testing on PageSpeed Insights?',
                                        createdAt: '15 min ago',
                                        isOfficial: false,
                                        likesCount: 2,
                                        replies: []
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                id: 'rep-1-5',
                authorName: 'Ananya Gupta',
                authorRole: 'Student',
                authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
                content: 'We also converted all hero background banners from PNG to AVIF format which reduced mobile page weight by 60%.',
                createdAt: '30 min ago',
                isOfficial: false,
                likesCount: 2,
                replies: []
            }
        ]
    },
    {
        id: 'disc-2',
        courseId: 'course-6',
        courseTitle: 'Google Ads',
        authorName: 'Vikram Malhotra',
        authorRole: 'Instructor',
        authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
        title: 'Weekly Q&A Thread: Smart Bidding vs Manual CPC in 2026',
        content: 'Post your campaign bidding strategy questions here for this week review call. We will cover Target CPA scaling live!',
        repliesCount: 3,
        createdAt: '1 day ago',
        category: 'PMAX & Bidding',
        community: 'google-ads',
        authorHandle: 'vikram_m',
        upvotes: 38,
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&auto=format&fit=crop&q=80',
        linkUrl: 'https://support.google.com/google-ads/answer/6263057',
        isPinned: true,
        replies: [
            {
                id: 'rep-2-1',
                authorName: 'Hiteshpuri Goswami',
                authorRole: 'Student',
                authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
                content: 'Is it recommended to start with Enhanced CPC during the learning phase before switching to Target ROAS once 30 conversions are recorded?',
                createdAt: '18 hours ago',
                isOfficial: false,
                likesCount: 4,
                replies: [
                    {
                        id: 'rep-2-2',
                        authorName: 'Vikram Malhotra',
                        authorRole: 'Instructor',
                        authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
                        content: '@Hiteshpuri Goswami Exactly! Gathering 30-50 high-intent conversions first helps Google algorithms establish reliable customer intent profiles.',
                        createdAt: '12 hours ago',
                        isOfficial: true,
                        likesCount: 7
                    },
                    {
                        id: 'rep-2-3',
                        authorName: 'Aarav Patel',
                        authorRole: 'Student',
                        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
                        content: '@Vikram Malhotra Does this conversion volume requirement apply per ad group or at the full campaign account level?',
                        createdAt: '4 hours ago',
                        isOfficial: false,
                        likesCount: 1
                    }
                ]
            }
        ]
    },
    {
        id: 'disc-3',
        courseId: 'course-1',
        courseTitle: 'Social Media Marketing',
        authorName: 'Ananya Gupta',
        authorRole: 'Student',
        authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
        title: 'What is the optimal video ratio and duration for Instagram Reels to maximize reach?',
        content: 'I noticed 9:16 videos under 15 seconds have higher completion rates, but longer tutorials get more saves. How are you balancing retention vs utility in your client campaigns?',
        repliesCount: 2,
        createdAt: '2 days ago',
        category: 'Social Media',
        community: 'social-media',
        authorHandle: 'ananya_g',
        upvotes: 19,
        imageUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1000&auto=format&fit=crop&q=80',
        linkUrl: 'https://business.instagram.com/creators/reels-best-practices',
        isPinned: false,
        replies: [
            {
                id: 'rep-3-1',
                authorName: 'Pooja Bhatt',
                authorRole: 'Instructor',
                authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
                content: 'For brand discovery, aim for punchy 7-12 second hooks. For authority and trust building, 45-60 second carousel or step-by-step videos get bookmarked. Test both on a 70/30 split.',
                createdAt: '1 day ago',
                isOfficial: true,
                likesCount: 8,
                replies: [
                    {
                        id: 'rep-3-2',
                        authorName: 'Ananya Gupta',
                        authorRole: 'Student',
                        authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
                        content: '@Pooja Bhatt That 70/30 split framework makes so much sense! We will adjust our client content calendar this week.',
                        createdAt: '18 hours ago',
                        isOfficial: false,
                        likesCount: 2
                    }
                ]
            }
        ]
    },
    {
        id: 'disc-4',
        courseId: 'course-5',
        courseTitle: 'Google Analytics Course',
        authorName: 'Aarav Patel',
        authorRole: 'Student',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        title: 'GA4 Event Tracking: Why are custom parameters not showing up in standard reports?',
        content: 'I created a custom event "brochure_download" in GTM with parameter "course_name". In GA4 realtime it triggers, but in standard reports the parameter is missing.',
        repliesCount: 1,
        createdAt: '3 days ago',
        category: 'Analytics',
        community: 'analytics',
        authorHandle: 'aarav_p',
        upvotes: 15,
        imageUrl: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1000&auto=format&fit=crop&q=80',
        isPinned: false,
        replies: [
            {
                id: 'rep-4-1',
                authorName: 'Vikram Malhotra',
                authorRole: 'Instructor',
                authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
                content: 'In GA4, you must register every custom parameter under Admin > Custom Definitions as a Custom Dimension before it populates in exploratory and standard reports. It takes 24-48 hours to backfill.',
                createdAt: '2 days ago',
                isOfficial: true,
                likesCount: 3,
                replies: []
            }
        ]
    },
    {
        id: 'disc-5',
        courseId: 'course-7',
        courseTitle: 'Website Development With WordPress',
        authorName: 'Rohan Mehta',
        authorRole: 'Student',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        title: 'Elementor Pro vs Gutenberg Blocks: Best setup for sub-2s mobile loading speeds?',
        content: 'When developing responsive WordPress sites for local business clients, what is the best practice to keep DOM elements minimal while retaining custom design flexibility? Are you combining lightweight theme frameworks with specific caching plugins?',
        repliesCount: 2,
        createdAt: '4 hours ago',
        category: 'WordPress',
        community: 'web-development',
        authorHandle: 'rohan_m',
        upvotes: 27,
        imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1000&auto=format&fit=crop&q=80',
        isPinned: false,
        replies: [
            {
                id: 'rep-5-1',
                authorName: 'Vikram Malhotra',
                authorRole: 'Instructor',
                authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
                content: 'Great question Rohan! Use Hello Elementor or Astra with containers mode enabled. Pair it with LiteSpeed Cache or WP Rocket and disable unused Elementor widget experiments.',
                createdAt: '3 hours ago',
                isOfficial: true,
                likesCount: 5,
                replies: [
                    {
                        id: 'rep-5-2',
                        authorName: 'Sneha Roy',
                        authorRole: 'Student',
                        authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
                        content: '@Vikram Malhotra Enabling the new Flexbox Container experiment reduced our DOM depth from 32 levels down to 9! Huge boost on Google Lighthouse.',
                        createdAt: '1 hour ago',
                        isOfficial: false,
                        likesCount: 3,
                        replies: []
                    }
                ]
            }
        ]
    },
    {
        id: 'disc-6',
        courseId: 'course-4',
        courseTitle: 'Creative Designing',
        authorName: 'Priya Sharma',
        authorRole: 'Student',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        title: 'Figma to Social Media Assets: Proper color space and compression for high-CTR ads',
        content: 'What export settings do you recommend in Figma or Photoshop to ensure crisp typography on Instagram and Facebook without color banding in high-contrast gradients? Does sRGB vs Display P3 make a difference?',
        repliesCount: 2,
        createdAt: '1 day ago',
        category: 'Creative Design',
        community: 'social-media',
        authorHandle: 'priya_s',
        upvotes: 21,
        imageUrl: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=1000&auto=format&fit=crop&q=80',
        isPinned: false,
        replies: [
            {
                id: 'rep-6-1',
                authorName: 'Pooja Bhatt',
                authorRole: 'Instructor',
                authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
                content: 'Always export in standard sRGB at 2x resolution (2160x2700 for 4:5 portrait posts). Social platforms compress aggressively; 2x ensures rasterized fonts stay razor sharp on Retina screens.',
                createdAt: '20 hours ago',
                isOfficial: true,
                likesCount: 6,
                replies: []
            }
        ]
    },
    {
        id: 'disc-7',
        courseId: 'course-3',
        courseTitle: 'Growth Marketing & Specialized Channels',
        authorName: 'Aarav Patel',
        authorRole: 'Student',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        title: 'Data-driven attribution models in cookieless marketing: Server-side GTM vs S2S postbacks',
        content: 'In our advanced marketing mix modeling, how are you handling conversion deduplication between Meta Conversions API and Google Ads enhanced conversions when tracking multi-touch customer journeys?',
        repliesCount: 2,
        createdAt: '2 days ago',
        category: 'Growth Marketing',
        isPinned: false,
        replies: [
            {
                id: 'rep-7-1',
                authorName: 'Harsh Pareek',
                authorRole: 'Instructor',
                authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
                content: 'Use unique transaction_id or event_id parameters passed simultaneously to both browser pixels and the server container. Meta deduplicates within a 48h rolling window if both receive the exact same ID.',
                createdAt: '1 day ago',
                isOfficial: true,
                likesCount: 9,
                replies: []
            }
        ]
    }
];
export const INITIAL_ACTIVITIES = [];
export const INITIAL_ACHIEVEMENTS = [
    {
        id: 'ach-1',
        title: 'SEO Specialist',
        description: 'Completed 100% of Search Engine Optimization Masterclass & passed technical audit.',
        iconName: 'Search',
        earnedDate: 'Sep 12, 2026',
        category: 'SEO',
        unlocked: true
    },
    {
        id: 'ach-2',
        title: 'WordPress Developer',
        description: 'Built and deployed 3 live client sites with Elementor Pro.',
        iconName: 'Code',
        earnedDate: 'Aug 28, 2026',
        category: 'WordPress',
        unlocked: true
    },
    {
        id: 'ach-3',
        title: 'GA4 Master Certified',
        description: 'Achieved 90%+ on Google Analytics conversion tracking exam.',
        iconName: 'BarChart3',
        earnedDate: 'Sep 01, 2026',
        category: 'Analytics',
        unlocked: true
    },
    {
        id: 'ach-4',
        title: 'Design Innovator',
        description: 'Created top-rated Figma design system in Creative Designing Essentials.',
        iconName: 'Palette',
        earnedDate: 'Jul 19, 2026',
        category: 'Design',
        unlocked: true
    },
    {
        id: 'ach-5',
        title: 'Digital Marketing Strategist',
        description: 'Complete all 6 core masterclass tracks at Operating Media.',
        iconName: 'Award',
        earnedDate: 'Locked',
        category: 'Marketing',
        unlocked: false
    }
];
export const INITIAL_NOTES = [
    {
        id: 'note-1',
        courseId: 'course-1',
        courseTitle: 'Social Media Marketing',
        lessonTitle: '01 Overview & Channel Architecture Setup',
        category: 'Social Media',
        content: `• Vertical 9:16 Video Framework: Short-form Reels and TikToks require a decisive 3-second hook before user drop-off exceeds 60%.\n• Audio Trends & Algorithms: Always test trending original sounds within their initial 7 days of algorithmic surge to capitalize on Discovery feed visibility.\n• Creative Cadence: Publish 4–5 Reels weekly with high-contrast subtitles centered in the 1080x1920 safe zone for optimal engagement.`,
        createdAt: 'Sep 20, 2026'
    },
    {
        id: 'note-2',
        courseId: 'course-8',
        courseTitle: 'Search Engine Optimization (SEO)',
        lessonTitle: '1.2 Keyword Research & Search Intent Mapping',
        category: 'SEO',
        content: `• Search Intent Hierarchy: Informational keywords generate broad top-of-funnel traffic but yield lower conversion rates. Focus commercial long-tail queries onto dedicated high-converting product pages.\n• SERP Feature Competition: Inspect whether the top 5 ranking positions feature featured snippets, People Also Ask boxes, or video carousels before finalizing headings.\n• Keyword Difficulty Rule: Prioritize KD < 35 keywords during initial sprint phases to secure rapid topical authority on Google.`,
        createdAt: 'Sep 22, 2026'
    },
    {
        id: 'note-3',
        courseId: 'course-5',
        courseTitle: 'Google Analytics Course',
        lessonTitle: 'GA4 Event Tracking & Conversion Modeling',
        category: 'Analytics',
        content: `• Conversion Event Setup: Always designate custom GTM trigger events as 'Key Events' within GA4 Admin properties prior to publishing Looker Studio dashboards.\n• Attribution Stability: Allow 24–48 hours for data attribution backfill and cross-device modeling to stabilize before reporting to stakeholders.\n• DebugView Protocol: Validate all data layer variables inside Tag Assistant and the live GA4 DebugView stream before deploying container changes to production.`,
        createdAt: 'Sep 25, 2026'
    },
    {
        id: 'note-4',
        courseId: 'course-6',
        courseTitle: 'Google Ads',
        lessonTitle: 'PMAX Bidding & Target ROAS Scaling',
        category: 'Google Ads',
        content: `• Smart Bidding Calibration: Ensure Performance Max campaigns accrue at least 30 conversions over a 30-day window before switching to Target ROAS bidding to prevent volatility.\n• Comprehensive Asset Group: Upload full asset sets (at least 5 punchy headlines, 5 long descriptions, 1200x628 landscape banners, and square brand logos).\n• Account Exclusions: Implement account-level placement exclusion lists to avoid wasting ad spend on low-intent mobile gaming apps.`,
        createdAt: 'Oct 01, 2026'
    },
    {
        id: 'note-5',
        courseId: 'course-7',
        courseTitle: 'Website Development With WordPress',
        lessonTitle: 'Core Web Vitals & Elementor Layouts',
        category: 'WordPress',
        content: `• DOM Tree Optimization: Convert legacy section and column wrappers into modern CSS Flexbox containers to reduce total DOM depth by up to 40%.\n• LCP Optimization: Preload the hero banner using fetchpriority="high" and convert high-resolution assets into next-gen WebP format.\n• Script Deferral: Dequeue unused block stylesheets and defer non-critical JavaScript to guarantee a Largest Contentful Paint under 1.2 seconds.`,
        createdAt: 'Oct 03, 2026'
    },
    {
        id: 'note-6',
        courseId: 'course-4',
        courseTitle: 'Creative Designing',
        lessonTitle: 'Figma Typography Hierarchy & Auto Layout',
        category: 'Design',
        content: `• 8pt Grid Discipline: Maintain a strict 8-point spatial system for margin, padding, and layout bounding boxes to preserve visual rhythm and design consistency.\n• Color Space Fidelity: Export all web and social media ad creatives using sRGB color profiles to eliminate desaturation discrepancies across iOS Safari and Android screens.\n• Typographic Scale: Utilize a 1.25 major-third scale (12px, 14px, 16px, 20px, 24px, 32px, 40px) with minimum 140% line-height for clean readability.`,
        createdAt: 'Oct 05, 2026'
    }
];
export const INITIAL_REVIEWS = [
    {
        id: 'rev-1',
        courseId: 'course-8',
        courseTitle: 'Search Engine Optimization (SEO)',
        rating: 5,
        comment: 'The best practical SEO training course in India! Helped me double organic search traffic for our e-commerce client in 60 days.',
        date: '2026-09-18'
    },
    {
        id: 'rev-2',
        courseId: 'course-7',
        courseTitle: 'Website Development With WordPress',
        rating: 5,
        comment: 'Clear explanation of custom fields, Elementor flexbox containers, and site speed optimization.',
        date: '2026-09-15'
    }
];
