import socialMediaImg from '../assets/courses/social-media-marketing.png';
import advancedTopicsImg from '../assets/courses/advanced-topics-digital-marketing.png';
import creativeDesigningImg from '../assets/courses/creative-designing.png';
import googleAnalyticsImg from '../assets/courses/google-analytics.png';
import googleAdsImg from '../assets/courses/google-ads.png';
import wordpressImg from '../assets/courses/website-development-wordpress.png';
import seoImg from '../assets/courses/search-engine-optimization-seo.png';

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
        bracketText: "Are you looking for social media marketing content ideas or do you need ready-to-use posts for your brand? Let me know the industry or business type, and I'll craft engaging content for your audience!",
        description: "Are you looking for social media marketing content ideas or do you need ready-to-use posts for your brand? Let me know the industry or business type, and I'll craft engaging content for your audience! Ready to elevate your online presence and drive real engagement? Our Social Media Optimization (SMO) services are designed to make your brand stand out! Custom campaigns that boost engagement & conversions, data-driven insights, and multi-platform growth across Facebook, Instagram, LinkedIn, Quora, and Twitter/X.",
        overview: {
            greeting: "Ready to elevate your online presence and drive real engagement? Our Social Media Optimization (SMO) services are designed to make your brand stand out!",
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
        title: 'Advanced Topics',
        category: 'Advanced Digital Marketing',
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
        bracketText: "This course offers a comprehensive overview of digital media, teaching you how to integrate and use it to meet business and marketing goals. It covers the entire marketing mix across various roles and disciplines, making it suitable for clients and agencies in any industry.",
        description: "This course offers a comprehensive overview of digital media, teaching you how to integrate and use it to meet business and marketing goals. It covers the entire marketing mix across various roles and disciplines, making it suitable for clients and agencies in any industry. Master Affiliate Marketing, Influencer Marketing, WhatsApp Marketing, Mobile Marketing, ORM, Viral Marketing, Content Marketing, and Digital Marketing Freelancing.",
        overview: {
            greeting: "Thank you for your interest in our Masters Program in Digital Marketing Advanced Topics at Operating Media!",
            whyChooseUsTitle: "What Sets Our Advanced Program Apart:",
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
            callToAction: "Our Masters Program in Digital Marketing Advanced Topics is meticulously designed to elevate your skills and transform your career. Explore our syllabus or schedule a 1:1 counseling session or demo class.",
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
export const INITIAL_UNITS = [
    // -------------------------------------------------------------
    // COURSE-3: ADVANCED TOPICS (matches advanded topic deatils.png)
    // -------------------------------------------------------------
    // Affiliate Marketing
    {
        id: 'u-adv-1',
        courseId: 'course-3',
        moduleName: 'Affiliate Marketing',
        title: 'Affiliate Marketing',
        duration: '25:00',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: false,
        isLocked: false,
        type: 'video',
        description: 'Affiliate networks, commission structures, CPA models, and cookie tracking mechanics.'
    },
    {
        id: 'u-adv-2',
        courseId: 'course-3',
        moduleName: 'Affiliate Marketing',
        title: 'Affiliate Marketing Assignment',
        duration: 'Due in 5 days',
        videoUrl: '',
        isCompleted: true,
        isLocked: false,
        type: 'assignment',
        description: 'Create an affiliate product comparison bridge page and integrate compliance disclaimers.'
    },
    // Influencer Marketing
    {
        id: 'u-adv-3',
        courseId: 'course-3',
        moduleName: 'Influencer Marketing',
        title: 'Influencer Marketing',
        duration: '28:15',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: false,
        isLocked: false,
        type: 'video',
        description: 'Identifying authentic creators, engagement calculations, campaign briefs, and deliverables.'
    },
    {
        id: 'u-adv-4',
        courseId: 'course-3',
        moduleName: 'Influencer Marketing',
        title: 'Influencer Marketing Assignment-1',
        duration: 'Due in 7 days',
        videoUrl: '',
        isCompleted: false,
        isLocked: false,
        type: 'assignment',
        description: 'Curate a 10-tier influencer list across beauty and tech niches with outreach templates.'
    },
    {
        id: 'u-adv-5',
        courseId: 'course-3',
        moduleName: 'Influencer Marketing',
        title: 'Influencer Marketing Assignment-2',
        duration: 'Due in 10 days',
        videoUrl: '',
        isCompleted: false,
        isLocked: false,
        type: 'assignment',
        description: 'Draft an influencer barter collaboration agreement and campaign KPI scorecard.'
    },
    // Whatsapp Marketing
    {
        id: 'u-adv-6',
        courseId: 'course-3',
        moduleName: 'Whatsapp Marketing',
        title: 'Whatsapp Marketing',
        duration: '20:45',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: false,
        isLocked: false,
        type: 'video',
        description: 'WhatsApp Cloud API integration, green badge verification, and compliance policies.'
    },
    {
        id: 'u-adv-7',
        courseId: 'course-3',
        moduleName: 'Whatsapp Marketing',
        title: 'WhatsApp Marketing-1',
        duration: '18:30',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: false,
        isLocked: false,
        type: 'video',
        description: 'Building automated chatbots, interactive reply buttons, and catalog product feeds.'
    },
    {
        id: 'u-adv-8',
        courseId: 'course-3',
        moduleName: 'Whatsapp Marketing',
        title: 'WhatsApp Marketing-2',
        duration: '22:10',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: false,
        isLocked: false,
        type: 'video',
        description: 'Abandoned cart broadcast sequences, automated reminders, and CRM sync.'
    },
    // Mobile Marketing
    {
        id: 'u-adv-9',
        courseId: 'course-3',
        moduleName: 'Mobile Marketing',
        title: 'Mobile Marketing',
        duration: '24:00',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: false,
        isLocked: false,
        type: 'video',
        description: 'App Store Optimization (ASO), push notifications, in-app messaging, and deep-linking.'
    },
    {
        id: 'u-adv-10',
        courseId: 'course-3',
        moduleName: 'Mobile Marketing',
        title: 'Mobile Marketing Assignment',
        duration: 'Due in 6 days',
        videoUrl: '',
        isCompleted: false,
        isLocked: false,
        type: 'assignment',
        description: 'Conduct Google Play & Apple App Store metadata audit and draft 5 push notification copies.'
    },
    // Online Reputation Management (ORM)
    {
        id: 'u-adv-11',
        courseId: 'course-3',
        moduleName: 'Online Reputation Management (ORM)',
        title: 'Online Reputation Management (ORM)',
        duration: '26:30',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: false,
        isLocked: false,
        type: 'video',
        description: 'Brand sentiment analysis, crisis public relations, review monitoring, and negative SERP suppression.'
    },
    {
        id: 'u-adv-12',
        courseId: 'course-3',
        moduleName: 'Online Reputation Management (ORM)',
        title: 'Online Reputation Management (ORM) Assignment',
        duration: 'Due in 8 days',
        videoUrl: '',
        isCompleted: false,
        isLocked: false,
        type: 'assignment',
        description: 'Create an ORM crisis management manual and response matrix for negative customer feedback.'
    },
    // Viral Marketing
    {
        id: 'u-adv-13',
        courseId: 'course-3',
        moduleName: 'Viral Marketing',
        title: 'Viral Marketing',
        duration: '21:15',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: false,
        isLocked: false,
        type: 'video',
        description: 'Psychology of viral growth loops, meme marketing, social currency, and trigger mapping.'
    },
    {
        id: 'u-adv-14',
        courseId: 'course-3',
        moduleName: 'Viral Marketing',
        title: 'Viral Marketing Assignment-1',
        duration: 'Due in 4 days',
        videoUrl: '',
        isCompleted: false,
        isLocked: false,
        type: 'assignment',
        description: 'Design a meme marketing campaign pack consisting of 5 topical memes for social channels.'
    },
    {
        id: 'u-adv-15',
        courseId: 'course-3',
        moduleName: 'Viral Marketing',
        title: 'Viral Marketing Assignment-2',
        duration: 'Due in 9 days',
        videoUrl: '',
        isCompleted: false,
        isLocked: false,
        type: 'assignment',
        description: 'Engineer a referral viral loop mechanism with tier unlocking and share incentive triggers.'
    },
    // Content Marketing
    {
        id: 'u-adv-16',
        courseId: 'course-3',
        moduleName: 'Content Marketing',
        title: 'Content Marketing',
        duration: '27:40',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: false,
        isLocked: false,
        type: 'video',
        description: 'Content pillars, topic clusters, audience persona journey mapping, and repurposing workflows.'
    },
    {
        id: 'u-adv-17',
        courseId: 'course-3',
        moduleName: 'Content Marketing',
        title: 'Content Marketing Assignment-1',
        duration: 'Due in 5 days',
        videoUrl: '',
        isCompleted: true,
        isLocked: false,
        type: 'assignment',
        description: 'Develop a 90-day pillar content framework with lead magnet gate and distribution schedule.'
    },
    {
        id: 'u-adv-18',
        courseId: 'course-3',
        moduleName: 'Content Marketing',
        title: 'Content Marketing Assignment-2',
        duration: 'Due in 8 days',
        videoUrl: '',
        isCompleted: false,
        isLocked: false,
        type: 'assignment',
        description: 'Write a 2,000-word authoritative case study with data charts and actionable takeaways.'
    },
    // Digital Marketing Freelancing
    {
        id: 'u-adv-19',
        courseId: 'course-3',
        moduleName: 'Digital Marketing Freelancing',
        title: 'Digital Marketing Freelancing',
        duration: '31:20',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: false,
        isLocked: false,
        type: 'video',
        description: 'Freelance platform optimization, pricing hourly vs retainer, proposals, and client onboarding.'
    },
    {
        id: 'u-adv-20',
        courseId: 'course-3',
        moduleName: 'Digital Marketing Freelancing',
        title: 'Freelance Digital Marketing Assignment',
        duration: 'Due in 7 days',
        videoUrl: '',
        isCompleted: false,
        isLocked: false,
        type: 'assignment',
        description: 'Build your client proposal deck, scope-of-work agreement, and pricing tier packages.'
    },
    // -------------------------------------------------------------
    // COURSE-1: SOCIAL MEDIA MARKETING (matches CourseInfo.txt)
    // -------------------------------------------------------------
    // Facebook & Instagram Paid Marketing
    {
        id: 'u-smm-1',
        courseId: 'course-1',
        moduleName: 'Facebook & Instagram Paid Marketing',
        title: 'Marketing on Facebook and Instagram',
        duration: '18:40',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: true,
        isLocked: false,
        type: 'video',
        description: 'Comprehensive walkthrough of Meta business suite and organic/paid marketing foundations.'
    },
    {
        id: 'u-smm-2',
        courseId: 'course-1',
        moduleName: 'Facebook & Instagram Paid Marketing',
        title: 'Lead Generation Campaign',
        duration: '22:15',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: true,
        isLocked: false,
        type: 'video',
        description: 'Designing instant forms, lead magnet integrations, and custom CRM webhooks on Meta.'
    },
    {
        id: 'u-smm-3',
        courseId: 'course-1',
        moduleName: 'Facebook & Instagram Paid Marketing',
        title: 'Creating a Sales Campaign Made Easy!',
        duration: '25:30',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: false,
        isLocked: false,
        type: 'video',
        description: 'Catalog sales ads, carousel dynamic formats, and conversion bid strategies.'
    },
    {
        id: 'u-smm-4',
        courseId: 'course-1',
        moduleName: 'Facebook & Instagram Paid Marketing',
        title: 'Pixel, Remarketing and Conversion Setup',
        duration: '28:10',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: false,
        isLocked: false,
        type: 'video',
        description: 'Meta pixel events, Conversions API (CAPI), and custom high-intent retargeting audiences.'
    },
    {
        id: 'u-smm-5',
        courseId: 'course-1',
        moduleName: 'Facebook & Instagram Paid Marketing',
        title: 'Maximizing Organic Growth on Facebook and Instagram for Your Business',
        duration: '20:45',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: false,
        isLocked: false,
        type: 'video',
        description: 'Algorithm optimization, viral Reels strategy, engagement spikes, and community nurturing.'
    },
    // LinkedIn Paid Marketing
    {
        id: 'u-smm-6',
        courseId: 'course-1',
        moduleName: 'LinkedIn Paid Marketing',
        title: 'Mastering LinkedIn Paid Marketing',
        duration: '24:00',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: false,
        isLocked: false,
        type: 'video',
        description: 'B2B demographic targeting, Sponsored Content, Sponsored InMail, and budget optimization.'
    },
    {
        id: 'u-smm-7',
        courseId: 'course-1',
        moduleName: 'LinkedIn Paid Marketing',
        title: 'Creating Effective Lead Generation Campaigns',
        duration: '26:20',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: false,
        isLocked: false,
        type: 'video',
        description: 'LinkedIn native Lead Gen Forms, conversion tracking, and high-value decision-maker outreach.'
    },
    // Quora Paid Marketing
    {
        id: 'u-smm-8',
        courseId: 'course-1',
        moduleName: 'Quora Paid Marketing',
        title: 'Understanding Quora for Lead Generation',
        duration: '19:30',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: false,
        isLocked: false,
        type: 'video',
        description: 'Question targeting, topic targeting, and capturing high-intent search queries on Quora.'
    },
    {
        id: 'u-smm-9',
        courseId: 'course-1',
        moduleName: 'Quora Paid Marketing',
        title: 'Campaign Creation Overview',
        duration: '21:15',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: false,
        isLocked: false,
        type: 'video',
        description: 'Ad copy creation, pixel installation, bidding models, and performance tracking on Quora Ads.'
    },
    // TwitterX Organic
    {
        id: 'u-smm-10',
        courseId: 'course-1',
        moduleName: 'TwitterX Organic',
        title: 'Mastering Organic Growth on TwitterX',
        duration: '23:50',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: false,
        isLocked: false,
        type: 'video',
        description: 'Thread architecture, viral hooks, X Analytics, and building thought leadership.'
    },

    // -------------------------------------------------------------
    // COURSE-4: CREATIVE DESIGNING (matches CourseInfo.txt)
    // -------------------------------------------------------------
    {
        id: 'u-cd-1',
        courseId: 'course-4',
        moduleName: 'Creative Designing Essentials',
        title: 'Creative Designing Lesson',
        duration: '22:30',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: true,
        isLocked: false,
        type: 'video',
        description: 'Core design principles, color theory, typography hierarchy, and visual balance.'
    },
    {
        id: 'u-cd-2',
        courseId: 'course-4',
        moduleName: 'Creative Designing Essentials',
        title: 'Understanding Canva for Graphic Design',
        duration: '26:00',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: true,
        isLocked: false,
        type: 'video',
        description: 'Navigating Canva Pro, brand kits, custom templates, and layout tools.'
    },
    {
        id: 'u-cd-3',
        courseId: 'course-4',
        moduleName: 'Creative Designing Essentials',
        title: 'Canva Graphic Creation',
        duration: '28:45',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: false,
        isLocked: false,
        type: 'video',
        description: 'Practical design of marketing assets, banners, social posts, and product flyers.'
    },
    {
        id: 'u-cd-4',
        courseId: 'course-4',
        moduleName: 'Creative Designing Essentials',
        title: 'Graphic Principles & Visual Layouts',
        duration: '24:10',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: false,
        isLocked: false,
        type: 'video',
        description: 'Mastering composition grids, visual contrast, negative space, and branding consistency.'
    },
    {
        id: 'u-cd-5',
        courseId: 'course-4',
        moduleName: 'Creative Designing Essentials',
        title: 'Graphic Designing Tutorial for Social Media Marketing',
        duration: '31:20',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: false,
        isLocked: false,
        type: 'video',
        description: 'Designing high-converting ad creatives, Instagram carousel sets, and story templates.'
    },
    {
        id: 'u-cd-6',
        courseId: 'course-4',
        moduleName: 'Creative Designing Essentials',
        title: 'Creative Designing Essentials for Digital Marketing',
        duration: 'Due in 5 days',
        videoUrl: '',
        isCompleted: false,
        isLocked: false,
        type: 'assignment',
        description: 'Produce a complete brand identity pack including 3 ad creatives, a carousel, and a logo lockup.'
    },

    // -------------------------------------------------------------
    // COURSE-6: GOOGLE ADS (matches CourseInfo.txt)
    // -------------------------------------------------------------
    // Introduction
    {
        id: 'u-gads-1',
        courseId: 'course-6',
        moduleName: 'Introduction',
        title: 'Understanding Google Ads: A Comprehensive Overview',
        duration: '24:15',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: true,
        isLocked: false,
        type: 'video',
        description: 'Google Ads architecture, Quality Score mechanics, Ad Rank calculation, and auction dynamics.'
    },
    // Campaigns
    {
        id: 'u-gads-2',
        courseId: 'course-6',
        moduleName: 'Campaigns',
        title: 'Understanding Google Ads Campaign Setup',
        duration: '27:40',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: true,
        isLocked: false,
        type: 'video',
        description: 'Account hierarchy, campaign objectives, network selections, and location targeting parameters.'
    },
    {
        id: 'u-gads-3',
        courseId: 'course-6',
        moduleName: 'Campaigns',
        title: 'Google Search Campaigns',
        duration: '30:20',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: false,
        isLocked: false,
        type: 'video',
        description: 'Responsive search ads (RSA), ad extensions, keyword match types, and negative keyword lists.'
    },
    {
        id: 'u-gads-4',
        courseId: 'course-6',
        moduleName: 'Campaigns',
        title: 'Setting Up a Display Campaign',
        duration: '26:50',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: false,
        isLocked: false,
        type: 'video',
        description: 'Google Display Network (GDN), responsive display ads, audience segments, and placement exclusions.'
    },
    {
        id: 'u-gads-5',
        courseId: 'course-6',
        moduleName: 'Campaigns',
        title: 'Google Shopping Campaign',
        duration: '29:10',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: false,
        isLocked: false,
        type: 'video',
        description: 'Google Merchant Center setup, product data feed optimization, and Standard vs Smart Shopping.'
    },
    {
        id: 'u-gads-6',
        courseId: 'course-6',
        moduleName: 'Campaigns',
        title: 'Mastering Video Campaigns in Google Ads',
        duration: '32:00',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: false,
        isLocked: false,
        type: 'video',
        description: 'YouTube skippable in-stream ads, non-skippable bumpers, video reach campaigns, and target CPV.'
    },
    {
        id: 'u-gads-7',
        courseId: 'course-6',
        moduleName: 'Campaigns',
        title: 'Smart Campaign',
        duration: '21:30',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: false,
        isLocked: false,
        type: 'video',
        description: 'Automated bidding, Performance Max signals, asset groups, and AI-driven goal optimization.'
    },
    // Performance Tracking
    {
        id: 'u-gads-8',
        courseId: 'course-6',
        moduleName: 'Performance Tracking',
        title: 'Tracking Template',
        duration: '22:45',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: false,
        isLocked: false,
        type: 'video',
        description: 'UTM parameters, ValueTrack parameter implementation, and third-party attribution tracking.'
    },
    {
        id: 'u-gads-9',
        courseId: 'course-6',
        moduleName: 'Performance Tracking',
        title: 'Understanding Campaign Conversions',
        duration: '25:15',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: false,
        isLocked: false,
        type: 'video',
        description: 'Setting up conversion actions, enhanced conversions, and primary vs secondary conversion goals.'
    },
    // Tests & Assignments
    {
        id: 'u-gads-10',
        courseId: 'course-6',
        moduleName: 'Tests & Assignments',
        title: 'Google Ads Intermediate Test',
        duration: '25 Mins',
        videoUrl: '',
        isCompleted: false,
        isLocked: false,
        type: 'quiz',
        description: 'Evaluate keyword bidding strategies, Quality Score calculations, and campaign troubleshooting.'
    },
    {
        id: 'u-gads-11',
        courseId: 'course-6',
        moduleName: 'Tests & Assignments',
        title: 'Google AdSense Intermediate Test',
        duration: '20 Mins',
        videoUrl: '',
        isCompleted: false,
        isLocked: false,
        type: 'quiz',
        description: 'Assessing monetization principles, policy guidelines, and publisher revenue models.'
    },
    {
        id: 'u-gads-12',
        courseId: 'course-6',
        moduleName: 'Tests & Assignments',
        title: 'GA4 Intermediate Test',
        duration: '25 Mins',
        videoUrl: '',
        isCompleted: false,
        isLocked: false,
        type: 'quiz',
        description: 'Cross-platform attribution, event-driven metrics, and Google Ads linked account evaluation.'
    },

    // -------------------------------------------------------------
    // COURSE-5: GOOGLE ANALYTICS COURSE (matches CourseInfo.txt)
    // -------------------------------------------------------------
    {
        id: 'u-ga-1',
        courseId: 'course-5',
        moduleName: 'Exploring Google Analytics',
        title: 'Exploring Google Analytics',
        duration: '28:30',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: true,
        isLocked: false,
        type: 'video',
        description: 'Google Analytics 4 interface orientation, data streams, custom dimensions, and report exploration.'
    },
    {
        id: 'u-ga-2',
        courseId: 'course-5',
        moduleName: 'Exploring Google Analytics',
        title: 'Understanding Real-Time User Data',
        duration: '25:10',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: false,
        isLocked: false,
        type: 'video',
        description: 'Monitoring real-time traffic surges, geographic distributions, event counters, and user properties.'
    },
    {
        id: 'u-ga-3',
        courseId: 'course-5',
        moduleName: 'Exploring Google Analytics',
        title: 'Analyzing User Data from Google Analytics',
        duration: '32:45',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: false,
        isLocked: false,
        type: 'video',
        description: 'Audience retention, path exploration, conversion funnels, and data export to Looker Studio.'
    },

    // -------------------------------------------------------------
    // COURSE-7: WEBSITE DEVELOPMENT WITH WORDPRESS (matches CourseInfo.txt)
    // -------------------------------------------------------------
    {
        id: 'u-wp-1',
        courseId: 'course-7',
        moduleName: 'WordPress Website Development',
        title: 'Understanding Website Creation',
        duration: '27:15',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: true,
        isLocked: false,
        type: 'video',
        description: 'Domain connection, hosting configuration, WordPress dashboard setup, and essential CMS settings.'
    },
    {
        id: 'u-wp-2',
        courseId: 'course-7',
        moduleName: 'WordPress Website Development',
        title: 'Adding Features to Your Website',
        duration: '34:20',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: false,
        isLocked: false,
        type: 'video',
        description: 'Plugin installation, contact form integrations, e-commerce WooCommerce setups, and payment gateways.'
    },
    {
        id: 'u-wp-3',
        courseId: 'course-7',
        moduleName: 'WordPress Website Development',
        title: 'Website Responsiveness Tips',
        duration: '29:40',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: false,
        isLocked: false,
        type: 'video',
        description: 'Mobile breakpoints, image compression, caching configuration, and cross-browser responsiveness.'
    },

    // -------------------------------------------------------------
    // COURSE-8: SEARCH ENGINE OPTIMIZATION (SEO) (matches CourseInfo.txt)
    // -------------------------------------------------------------
    // Basics SEO
    {
        id: 'u-seo-1',
        courseId: 'course-8',
        moduleName: 'Basics SEO',
        title: 'SEO Basics Explained!',
        duration: '18:20',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: true,
        isLocked: false,
        type: 'video',
        description: 'What is SEO, organic search landscape, search engine market share, and core SEO benefits.'
    },
    {
        id: 'u-seo-2',
        courseId: 'course-8',
        moduleName: 'Basics SEO',
        title: 'Understanding SEO Practices',
        duration: '22:15',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: true,
        isLocked: false,
        type: 'video',
        description: 'White-hat vs Black-hat SEO, long-term ranking strategies, and website audit fundamentals.'
    },
    // Google Algorithm
    {
        id: 'u-seo-3',
        courseId: 'course-8',
        moduleName: 'Google Algorithm',
        title: 'Google’s Algorithm Guidelines Explained',
        duration: '24:00',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: false,
        isLocked: false,
        type: 'video',
        description: 'Helpful Content System, Panda, Penguin, Hummingbird, and E-E-A-T quality rater guidelines.'
    },
    {
        id: 'u-seo-4',
        courseId: 'course-8',
        moduleName: 'Google Algorithm',
        title: 'Mobile and Website Updates Video',
        duration: '20:30',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: false,
        isLocked: false,
        type: 'video',
        description: 'Mobile-first indexing, page experience signals, and adapting to core search algorithm updates.'
    },
    {
        id: 'u-seo-5',
        courseId: 'course-8',
        moduleName: 'Google Algorithm',
        title: 'Understanding Google’s Crawling and Indexing Process',
        duration: '26:10',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: false,
        isLocked: false,
        type: 'video',
        description: 'How Googlebot discovers URLs, crawl budget allocation, rendering queues, and index storage.'
    },
    // Onpage SEO
    {
        id: 'u-seo-6',
        courseId: 'course-8',
        moduleName: 'Onpage SEO',
        title: 'Keyword Types and Intents',
        duration: '21:45',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: false,
        isLocked: false,
        type: 'video',
        description: 'Navigational, Informational, Commercial, and Transactional search query classification.'
    },
    {
        id: 'u-seo-7',
        courseId: 'course-8',
        moduleName: 'Onpage SEO',
        title: 'Onpage SEO (Keyword Research)',
        duration: '29:00',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: false,
        isLocked: false,
        type: 'video',
        description: 'Practical keyword research using Google Keyword Planner, Semrush, and search intent mapping.'
    },
    {
        id: 'u-seo-8',
        courseId: 'course-8',
        moduleName: 'Onpage SEO',
        title: 'Content Creation Using Keywords',
        duration: '25:30',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: false,
        isLocked: false,
        type: 'video',
        description: 'Semantic keyword placement, keyword density, LSI keywords, and comprehensive topic coverage.'
    },
    {
        id: 'u-seo-9',
        courseId: 'course-8',
        moduleName: 'Onpage SEO',
        title: 'Meta Title & Description',
        duration: '18:50',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: false,
        isLocked: false,
        type: 'video',
        description: 'Writing high-CTR meta titles and persuasive meta descriptions within pixel limits.'
    },
    {
        id: 'u-seo-10',
        courseId: 'course-8',
        moduleName: 'Onpage SEO',
        title: 'Image Tag Optimization: Alt Tags Explained',
        duration: '16:40',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: false,
        isLocked: false,
        type: 'video',
        description: 'Image descriptive alt text, file naming conventions, webp formats, and responsive dimensions.'
    },
    {
        id: 'u-seo-11',
        courseId: 'course-8',
        moduleName: 'Onpage SEO',
        title: 'SEO Friendly URLs',
        duration: '15:20',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: false,
        isLocked: false,
        type: 'video',
        description: 'Permalinks, hyphen separators, keyword integration, and avoiding dynamic parameter bloat.'
    },
    {
        id: 'u-seo-12',
        courseId: 'course-8',
        moduleName: 'Onpage SEO',
        title: 'Redirections & 404 Page',
        duration: '19:10',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: false,
        isLocked: false,
        type: 'video',
        description: '301 permanent redirects, 302 temporary redirects, custom 404 error page setup, and crawl error fixes.'
    },
    {
        id: 'u-seo-13',
        courseId: 'course-8',
        moduleName: 'Onpage SEO',
        title: 'Robots.txt File Validation Explained',
        duration: '17:35',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: false,
        isLocked: false,
        type: 'video',
        description: 'User-agent directives, Disallow rules, Allow rules, and testing robots.txt in Google Search Console.'
    },
    {
        id: 'u-seo-14',
        courseId: 'course-8',
        moduleName: 'Onpage SEO',
        title: 'Internal and External Linking',
        duration: '22:00',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: false,
        isLocked: false,
        type: 'video',
        description: 'Internal link architecture, contextual anchor text optimization, outbound link authority, and nofollow tags.'
    },
    {
        id: 'u-seo-15',
        courseId: 'course-8',
        moduleName: 'Onpage SEO',
        title: 'Schema Markup & Structured Data Implementation',
        duration: '27:40',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: false,
        isLocked: false,
        type: 'video',
        description: 'JSON-LD schema for Articles, FAQs, Courses, Local Businesses, and rich snippets validation.'
    },
    {
        id: 'u-seo-16',
        courseId: 'course-8',
        moduleName: 'Onpage SEO',
        title: 'Sitemap Session 1',
        duration: '20:15',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: false,
        isLocked: false,
        type: 'video',
        description: 'XML sitemap creation, priority tagging, changefreq tags, and submission to search engines.'
    },
    {
        id: 'u-seo-17',
        courseId: 'course-8',
        moduleName: 'Onpage SEO',
        title: 'Sitemap Session 2',
        duration: '19:50',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: false,
        isLocked: false,
        type: 'video',
        description: 'HTML sitemaps for user navigation, image/video sitemaps, and index status diagnostics.'
    },
    // Offpage SEO
    {
        id: 'u-seo-18',
        courseId: 'course-8',
        moduleName: 'Offpage SEO',
        title: 'Offpage SEO Tutorial',
        duration: '28:10',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: false,
        isLocked: false,
        type: 'video',
        description: 'Domain Authority (DA), Page Authority (PA), link building strategies, and backlink analysis.'
    },
    {
        id: 'u-seo-19',
        courseId: 'course-8',
        moduleName: 'Offpage SEO',
        title: 'Website Submission to Google Search Engine',
        duration: '18:40',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: false,
        isLocked: false,
        type: 'video',
        description: 'Submitting URLs, URL inspection tool, requesting indexing, and verifying live URL status.'
    },
    {
        id: 'u-seo-20',
        courseId: 'course-8',
        moduleName: 'Offpage SEO',
        title: 'Understanding Google Search Console Indexing and Core Web Vitals',
        duration: '31:20',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: false,
        isLocked: false,
        type: 'video',
        description: 'Page indexing reports, LCP, INP, CLS troubleshooting, and mobile usability audit.'
    },
    {
        id: 'u-seo-21',
        courseId: 'course-8',
        moduleName: 'Offpage SEO',
        title: 'Google Search Console Operations',
        duration: '26:30',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: false,
        isLocked: false,
        type: 'video',
        description: 'Performance tab analysis, search queries, click-through rates (CTR), and impressions.'
    },
    // GTM
    {
        id: 'u-seo-22',
        courseId: 'course-8',
        moduleName: 'GTM',
        title: 'Button Click in GTM',
        duration: '21:00',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: false,
        isLocked: false,
        type: 'video',
        description: 'Creating click triggers, variables, and firing custom conversion events in Google Tag Manager.'
    },
    {
        id: 'u-seo-23',
        courseId: 'course-8',
        moduleName: 'GTM',
        title: 'GTM Setup & Event Triggers',
        duration: '25:15',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: false,
        isLocked: false,
        type: 'video',
        description: 'Container tags, preview mode debugging, form submission triggers, and publishing versions.'
    },
    // Local SEO
    {
        id: 'u-seo-24',
        courseId: 'course-8',
        moduleName: 'Local SEO',
        title: 'Optimizing Your Google Business Profile',
        duration: '28:40',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isCompleted: false,
        isLocked: false,
        type: 'video',
        description: 'Local pack rankings, NAP consistency, local citations, reviews management, and Google Maps optimization.'
    },
    // Tests & Assignments
    {
        id: 'u-seo-25',
        courseId: 'course-8',
        moduleName: 'Tests & Assignments',
        title: 'Google Search Console Intermediate Test',
        duration: '25 Mins',
        videoUrl: '',
        isCompleted: false,
        isLocked: false,
        type: 'quiz',
        description: 'Assessment on indexing reports, sitemap diagnostics, and search performance data evaluation.'
    },
    {
        id: 'u-seo-26',
        courseId: 'course-8',
        moduleName: 'Tests & Assignments',
        title: 'On-Page and Off-Page SEO Intermediate Test',
        duration: '30 Mins',
        videoUrl: '',
        isCompleted: false,
        isLocked: false,
        type: 'quiz',
        description: 'Comprehensive test covering keyword mapping, schema markup, backlink analysis, and technical audits.'
    },
    {
        id: 'u-seo-27',
        courseId: 'course-8',
        moduleName: 'Tests & Assignments',
        title: 'Google Tag Manager Intermediate Test',
        duration: '20 Mins',
        videoUrl: '',
        isCompleted: false,
        isLocked: false,
        type: 'quiz',
        description: 'Evaluate knowledge of tags, triggers, dataLayer variables, and GA4 tag deployments.'
    },
    {
        id: 'u-seo-28',
        courseId: 'course-8',
        moduleName: 'Tests & Assignments',
        title: 'Local SEO Intermediate Test',
        duration: '20 Mins',
        videoUrl: '',
        isCompleted: false,
        isLocked: false,
        type: 'quiz',
        description: 'Assess local pack optimization, Google Business Profile management, and citation building.'
    }
];
export const INITIAL_QUIZZES = [
    {
        id: 'q-1',
        courseId: 'course-3',
        courseTitle: 'Masters in Digital Marketing - Advanced Topics',
        title: 'Digital Marketing Aptitude Quiz!',
        category: 'Digital Marketing',
        totalQuestions: 20,
        durationMinutes: 11,
        totalMarks: 20,
        passScorePercentage: 80,
        attemptsCount: 2,
        averageScore: 12.5,
        highScore: 25,
        lowScore: 0,
        description: 'Comprehensive aptitude assessment testing foundational digital marketing channels, Google Ads, SEO, and social campaign fundamentals.',
        studentStatus: 'failed',
        studentScore: 0,
        completedDate: 'February 25, 2025',
        timeSpent: '11 mins',
        deadline: 'Available Anytime',
        status: 'active'
    },
    {
        id: 'q-2',
        courseId: 'course-8',
        courseTitle: 'Search Engine Optimization (SEO)',
        title: 'SEO Fundamentals & Keyword Strategy Assessment',
        category: 'SEO Strategy',
        totalQuestions: 20,
        durationMinutes: 25,
        passScorePercentage: 80,
        attemptsCount: 142,
        averageScore: 84.5,
        description: 'In-depth technical and strategic examination covering keyword intent analysis, search volume clustering, on-page meta tag architecture, crawler HTTP status codes, robots.txt directives, XML sitemaps, and core web vitals optimization.',
        studentStatus: 'passed',
        studentScore: 88,
        completedDate: '02 Feb 2026',
        timeSpent: '18 mins',
        deadline: 'Due this Sunday',
        status: 'active'
    },
    {
        id: 'q-3',
        courseId: 'course-7',
        courseTitle: 'Website Development With WordPress',
        title: 'WordPress Core Architecture & Elementor Layout Test',
        category: 'WordPress Architecture',
        totalQuestions: 18,
        durationMinutes: 25,
        passScorePercentage: 75,
        attemptsCount: 158,
        averageScore: 88.0,
        description: 'Hands-on architectural assessment testing WordPress database relationships, custom post types, responsive page-builder styling with Elementor Pro, theme hierarchy customization, caching strategies, and security configurations.',
        studentStatus: 'passed',
        studentScore: 85,
        completedDate: '22 Jan 2026',
        timeSpent: '19 mins',
        deadline: 'Available Anytime',
        status: 'active'
    },
    {
        id: 'q-4',
        courseId: 'course-5',
        courseTitle: 'Google Analytics Course',
        title: 'GA4 Event Tracking & Funnel Analysis Quiz',
        category: 'Analytics & Tracking',
        totalQuestions: 15,
        durationMinutes: 20,
        passScorePercentage: 80,
        attemptsCount: 110,
        averageScore: 79.2,
        description: 'Mastery test evaluating Google Analytics 4 event schema implementation, custom dimensions & metrics, conversion path attribution modeling, Google Tag Manager dataLayer triggers, and real-time debug view workflows.',
        studentStatus: 'passed',
        studentScore: 90,
        completedDate: '12 Feb 2026',
        timeSpent: '15 mins',
        deadline: 'Available Anytime',
        status: 'active'
    },
    {
        id: 'q-5',
        courseId: 'course-6',
        courseTitle: 'Google Ads',
        title: 'Google Ads Search & Bidding Strategies Quiz',
        category: 'PPC Advertising',
        totalQuestions: 20,
        durationMinutes: 30,
        passScorePercentage: 85,
        attemptsCount: 195,
        averageScore: 82.4,
        description: 'Advanced scenario-based examination covering Target CPA, Target ROAS, Quality Score mechanics, negative keyword match types, auction insights analysis, responsive search ads optimization, and conversion tracking tags.',
        studentStatus: 'pending',
        studentScore: null,
        completedDate: null,
        timeSpent: null,
        deadline: 'Due this Sunday',
        status: 'active'
    },
    {
        id: 'q-6',
        courseId: 'course-1',
        courseTitle: 'Social Media Marketing',
        title: 'Social Media Growth Tactics & Viral Algorithms Quiz',
        category: 'Social Media',
        totalQuestions: 16,
        durationMinutes: 20,
        passScorePercentage: 80,
        attemptsCount: 168,
        averageScore: 85.0,
        description: 'Strategic assessment covering Meta Advantage+ campaigns, TikTok algorithmic engagement triggers, LinkedIn B2B lead generation funnels, influencer barter deliverables, and Aggregated Event Measurement (AEM) privacy protocols.',
        studentStatus: 'pending',
        studentScore: null,
        completedDate: null,
        timeSpent: null,
        deadline: 'Due Next Week',
        status: 'active'
    },
    {
        id: 'q-7',
        courseId: 'course-4',
        courseTitle: 'Creative Designing',
        title: 'Graphic Design Principles & Typography Assessment',
        category: 'Creative Design',
        totalQuestions: 15,
        durationMinutes: 20,
        passScorePercentage: 75,
        attemptsCount: 94,
        averageScore: 81.5,
        description: 'Practical creative examination testing visual hierarchy, complementary color harmonies, vector layout grids, typography kerning and pairing, brand identity guidelines, and high-impact digital advertising banner composition.',
        studentStatus: 'pending',
        studentScore: null,
        completedDate: null,
        timeSpent: null,
        deadline: 'Available Anytime',
        status: 'active'
    },
    {
        id: 'q-8',
        courseId: 'course-3',
        courseTitle: 'Advanced Topics',
        title: 'Advanced Digital Marketing Strategy Comprehensive Exam',
        category: 'Capstone Exam',
        totalQuestions: 30,
        durationMinutes: 45,
        passScorePercentage: 85,
        attemptsCount: 124,
        averageScore: 87.2,
        description: 'Rigorous capstone certification assessment covering multi-touch attribution, omnichannel marketing strategies, programmatic DSP ad buying, CRM automation workflows, client pitching frameworks, and live audit case studies.',
        studentStatus: 'pending',
        studentScore: null,
        completedDate: null,
        timeSpent: null,
        deadline: 'End of Term Exam',
        status: 'active'
    }
];
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
        status: 'graded',
        score: 92,
        feedback: 'Superb Figma design system and typography hierarchy tokens. Clean auto-layouts throughout!',
        submittedAt: 'Sep 29, 2026',
        instructions: 'Provide public Figma link with component library, color styles, typography tokens, and 6 ad variations.'
    },
    {
        id: 'a-adv-cr',
        courseId: 'course-3',
        courseTitle: 'Advanced Topics',
        title: 'Career Roadmap & Goal Setting Worksheet',
        dueDate: '2026-10-10',
        totalSubmissions: 140,
        pendingGrading: 14,
        maxScore: 100,
        status: 'submitted',
        submittedAt: 'Oct 01, 2026',
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
        status: 'graded',
        score: 96,
        feedback: 'Exceptional viral hook structure and comprehensive multi-channel distribution plan!',
        submittedAt: 'Sep 26, 2026',
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
        status: 'submitted',
        submittedAt: 'Oct 03, 2026',
        instructions: 'Implement GA4 tracking for a demo website and submit event tracking report.'
    },
    {
        id: 'a-adv-1',
        courseId: 'course-3',
        courseTitle: 'Advanced Topics',
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
        courseTitle: 'Advanced Topics',
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
        courseTitle: 'Advanced Topics',
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
        courseTitle: 'Advanced Topics',
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
        courseTitle: 'Advanced Topics',
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
        courseTitle: 'Advanced Topics',
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
        courseTitle: 'Advanced Topics',
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
        courseTitle: 'Advanced Topics',
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
        courseTitle: 'Advanced Topics',
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
        courseTitle: 'Advanced Topics',
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
        avatar: '/profile-pic.png',
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
        courseName: 'Advanced Topics',
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
        courseTitle: 'Search Engine Optimization (SEO)',
        authorName: 'Sneha Roy',
        authorRole: 'Student',
        authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
        title: 'How do you handle Core Web Vitals LCP latency on WordPress with heavy images?',
        content: 'Hi everyone, my client website score on mobile is LCP 4.2s due to hero image preload issues. What plugin or CDN setting worked best for you?',
        repliesCount: 2,
        createdAt: '3 hours ago',
        category: 'Technical SEO',
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
        courseTitle: 'Google Ads Masterclass',
        authorName: 'Vikram Malhotra',
        authorRole: 'Instructor',
        authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
        title: 'Weekly Q&A Thread: Smart Bidding vs Manual CPC in 2026',
        content: 'Post your campaign bidding strategy questions here for this week review call. We will cover Target CPA scaling live!',
        repliesCount: 3,
        createdAt: '1 day ago',
        category: 'PMAX & Bidding',
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
        courseTitle: 'Social Media Marketing',
        authorName: 'Ananya Gupta',
        authorRole: 'Student',
        authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
        title: 'What is the optimal video ratio and duration for Instagram Reels to maximize reach?',
        content: 'I noticed 9:16 videos under 15 seconds have higher completion rates, but longer tutorials get more saves. How are you balancing retention vs utility in your client campaigns?',
        repliesCount: 2,
        createdAt: '2 days ago',
        category: 'Social Media',
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
        courseTitle: 'Google Analytics Course',
        authorName: 'Aarav Patel',
        authorRole: 'Student',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        title: 'GA4 Event Tracking: Why are custom parameters not showing up in standard reports?',
        content: 'I created a custom event "brochure_download" in GTM with parameter "course_name". In GA4 realtime it triggers, but in standard reports the parameter is missing.',
        repliesCount: 1,
        createdAt: '3 days ago',
        category: 'Analytics',
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
    }
];
export const INITIAL_ACTIVITIES = [
    {
        id: 'act-1',
        user: { name: 'Aarav Patel', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
        action: 'enrolled in',
        target: 'Search Engine Optimization (SEO)',
        timeAgo: '5 min ago',
        type: 'enrollment'
    },
    {
        id: 'act-2',
        user: { name: 'Priya Sharma', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80' },
        action: 'passed quiz with 95%',
        target: 'WordPress Core & Elementor Layout Test',
        timeAgo: '22 min ago',
        type: 'quiz'
    },
    {
        id: 'act-3',
        user: { name: 'Rohan Mehta', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
        action: 'completed course',
        target: 'Google Analytics Course',
        timeAgo: '1 hour ago',
        type: 'completion'
    },
    {
        id: 'act-4',
        user: { name: 'Ananya Gupta', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
        action: 'submitted assignment for',
        target: 'Google Ads Masterclass',
        timeAgo: '3 hours ago',
        type: 'assignment'
    },
    {
        id: 'act-5',
        user: { name: 'Hiteshpuri Goswami', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
        action: 'earned certificate for',
        target: 'Advanced Technical SEO & Schema',
        timeAgo: '4 hours ago',
        type: 'certificate'
    },
    {
        id: 'act-6',
        user: { name: 'Vikram Malhotra', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80' },
        action: 'resolved technical doubt on',
        target: 'Core Web Vitals LCP Latency',
        timeAgo: '5 hours ago',
        type: 'discussion'
    },
    {
        id: 'act-7',
        user: { name: 'Harsh Pareek', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
        action: 'graded assignment submission for',
        target: 'PMax Strategy Blueprint',
        timeAgo: '6 hours ago',
        type: 'grading'
    }
];
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
