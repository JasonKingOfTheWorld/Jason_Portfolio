import { Project, Photo } from './types';

// ==================================================================================
// 1. TRANSLATIONS
//    Update the text below to match your personal brand.
// ==================================================================================
export const TRANSLATIONS = {
  en: {
    nav_work: "WORK",
    nav_about: "ABOUT",
    nav_visuals: "VISUALS",
    hero_badge: "OPEN_TO_WORK :: FINTECH_SECTOR",
    hero_title_1: "Building ",
    hero_title_clarity: "clarity",
    hero_title_2: " in",
    hero_title_3: "complex data.",
    hero_desc: "Senior Product Designer architecting institutional trading platforms and DeFi dashboards. I translate volatility into usability.",
    btn_projects: "VIEW_PROJECTS",
    btn_contact: "CONTACT_ME",
    section_work_title: "Selected Works",
    section_work_subtitle: "CASE_STUDIES_2023-2024",
    section_visuals_title: "Visual Logs",
    section_visuals_subtitle: "STREET_PHOTOGRAPHY // 35MM_DIGITAL",
    footer_tagline: "Building the future of finance, one pixel at a time.",
    hero_location: "LOCATION",
    hero_time: "LOCAL TIME",
    hero_status: "CURRENT STATUS",
  },
  zh: {
    nav_work: "作品",
    nav_about: "关于",
    nav_visuals: "影像",
    hero_badge: "求职中 :: 金融科技领域",
    hero_title_1: "构建",
    hero_title_clarity: "清晰",
    hero_title_2: "", 
    hero_title_3: "复杂数据系统",
    hero_desc: "资深产品设计师，专注于机构交易平台与DeFi仪表盘架构。我致力于将市场波动转化为极致的可用性。",
    btn_projects: "查看项目",
    btn_contact: "联系我",
    section_work_title: "精选案例",
    section_work_subtitle: "交互案例_2023-2024",
    section_visuals_title: "视觉日志",
    section_visuals_subtitle: "街头摄影 // 35MM_数码",
    footer_tagline: "一像素一像素地构建金融的未来。",
    hero_location: "位置",
    hero_time: "当地时间",
    hero_status: "当前状态",
  }
};

// ==================================================================================
// 2. ABOUT ME
//    This text appears on the 'About' page.
// ==================================================================================
export const ABOUT_CONTENT = {
  zh: {
    intro: "我是一名专注于复杂系统的 UX Designer，目前在Fintech领域工作。",
    p1: "我关注的不是界面本身，而是界面背后的信息结构、任务路径与系统逻辑。在项目中，我负责从需求模糊到结构成型的全过程，包括问题定义、交互模型搭建、组件体系设计，以及最终的落地验证。",
    p2: "我习惯用结构化的方式理解问题，也擅长在跨部门环境中推动决策，通过与产品、运营与前端密切合作，逐步建立起可复用的组件体系和稳定的信息架构。",
    p3: "过去一年，我开始将 AI 与前端能力引入设计流程，通过 Cloud Code 辅助定位结构问题、优化布局并提升迭代效率。这让我能够从纯交互向“设计与实现之间的中间层”迈进一步，也使我在复杂产品的迭代中拥有更高的主动性。",
    p4: "我相信设计的核心是让系统更清晰、让决策更轻松、让团队更高效。我希望持续构建自己的方法论，并在更高复杂度的产品中深化它。",
    modules: [
      { title: "核心关注", content: "信息架构 / 任务流逻辑 / 系统一致性" },
      { title: "工作方法", content: "结构化思维 / 跨职能协作 / 组件化体系" },
      { title: "技能进化", content: "AI 辅助设计 / 前端代码思维 / 快速原型验证" },
    ]
  },
  en: {
    intro: "I am a UX Designer focused on complex systems, currently working in the Fintech industry.",
    p1: "I don't just focus on the interface itself, but on the information structure, task paths, and system logic behind it. In my projects, I handle the entire process from ambiguous requirements to structured forms, including problem definition, interaction model building, component system design, and final validation.",
    p2: "I am used to understanding problems in a structured way and excelling at driving decisions in cross-functional environments. By working closely with product, operations, and frontend teams, I gradually establish reusable component systems and stable information architectures.",
    p3: "Over the past year, I have started introducing AI and frontend capabilities into my design workflow, using Cloud Code to assist in identifying structural issues, optimizing layouts, and improving iteration efficiency. This allows me to step from pure interaction towards the 'middle layer between design and implementation,' giving me greater initiative in complex product iterations.",
    p4: "I believe the core of design is to make systems clearer, decisions easier, and teams more efficient. I hope to continue building my methodology and deepening it in higher-complexity products.",
    modules: [
      { title: "CORE FOCUS", content: "Information Architecture / Task Flows / System Logic" },
      { title: "METHODOLOGY", content: "Structured Thinking / Cross-functional / Atomic Design" },
      { title: "EVOLUTION", content: "AI-Augmented Design / Frontend Logic / Rapid Prototyping" },
    ]
  }
};

// ==================================================================================
// 3. EXPERIENCE & SKILLS
//    This powers the 'Identity Log' on the About page.
// ==================================================================================
export const EXPERIENCE = [
  {
    role: "Senior Product Designer",
    company: "Fintech Institution",
    period: "2022 — PRESENT",
    desc: "Leading the architectural redesign of high-frequency trading execution management systems. Focusing on reducing latency in user decision-making."
  },
  {
    role: "UX Specialist",
    company: "Enterprise SaaS",
    period: "2020 — 2022",
    desc: "Developed complex data visualization components and established a scalable design system for wealth management tools."
  },
  {
    role: "Interaction Designer",
    company: "Digital Agency",
    period: "2018 — 2020",
    desc: "Worked on diverse B2B digital transformation projects, specializing in information architecture and user flow optimization."
  }
];

export const SKILLS = [
  { name: "System Architecture", level: 95 },
  { name: "React / Frontend", level: 80 },
  { name: "Data Visualization", level: 90 },
  { name: "AI Integration", level: 75 },
  { name: "Figma (Adv. Prototyping)", level: 95 },
];

// ==================================================================================
// 4. PROJECTS
//    To add your own images:
//    1. Put images in 'public/assets/' folder. Reference like '/assets/my-image.jpg'
//    2. OR paste a URL from the web like 'https://mysite.com/image.png'
// ==================================================================================
export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Ginkgo SaaS Optimization',
    subtitle: 'Asset Management System',
    tags: ['B2B SaaS', 'Design System', 'AI-Assisted'],
    description: 'Refactoring an Asset Management SaaS to solve information hierarchy issues, component inconsistencies, and navigation structure challenges.',
    image: 'https://picsum.photos/800/600?random=1', 
    metrics: [
      { label: 'Component Reuse', value: 'High' },
      { label: 'Header Space', value: '-60%' },
      { label: 'Consistency', value: 'Unified' }
    ],
    caseStudy: {
      problem: 'Ginkgo is an asset management SaaS for investment advisors. As features expanded, the system suffered from loose information hierarchy, inconsistent component behaviors, and unclear navigation, affecting reading efficiency and maintainability.',
      role: 'Lead Interaction Designer',
      solution: 'Refactored the system across three phases: Component Systemization, Navigation Framework, and AI-assisted Structural Optimization.',
    },
    sections: [
      {
        title: "Understanding the Users",
        layout: "grid-cards",
        content: "We identified the core needs of our primary user base: Investment Advisors managing high-net-worth portfolios.",
        cards: [
          {
            title: "Persona: The Investment Advisor",
            content: "Responsible for monitoring multi-asset portfolios. They need to complete asset monitoring, position analysis, and trade review within limited timeframes."
          },
          {
            title: "Key Pain Points",
            content: "High cognitive load during analysis due to inconsistent metrics. Thinking is often interrupted by interface frictions like differing chart behaviors."
          },
          {
            title: "Needs: Consistency",
            content: "Requires stable information structures to maintain judgment efficiency. The interface should disappear, letting data take center stage."
          },
          {
            title: "Needs: Flow",
            content: "Entry points must be clear to establish a daily market overview quickly. Navigation should map directly to their mental model."
          }
        ]
      },
      {
        title: "Phase 1: Component Systemization",
        layout: "split",
        content: `**The Problem**
The Position page carried high-density asset data but lacked a systematic structure. 
- SummaryCards had inconsistent hierarchies.
- Chart legends and tooltips behaved differently across modules.
- Table interactions (filters/pivots) were fragmented.

**Strategic Choice**
We rejected a purely visual update in favor of establishing a unified Web Widget System. This fundamentally resolved logical fragmentation by defining a stable 'Card → Component → Page' hierarchy.`,
        items: [
          "Standardized SummaryCard hierarchy (Title -> Metric -> Trend)",
          "Unified Chart interaction rules (Header/Legend/Tooltip)",
          "Consolidated 4 types of table interactions",
          "Result: Significantly improved scanning speed for advisors"
        ]
      },
      {
        title: "Phase 2: Navigation Architecture",
        layout: "standard",
        content: `**The Challenge**
As business modules expanded, the Dashboard header became overcrowded with Global Nav, Dashboard Pickers, Page Tabs, and temporary actions. Users struggled with "Where am I?" and "Where do I go?".

**The Solution: Three-Tier Structure**
We refactored the navigation into three distinct logical layers:
1. **Global Navigation**: System-level tasks.
2. **Module Switcher**: Business context switching.
3. **Page Tabs**: Local view management.

This structure aligned the interface with the user's mental model of "System > Task > View", significantly stabilizing the navigation path.`
      },
      {
        title: "Phase 3: AI × Cloud Code Engineering",
        layout: "terminal",
        content: "In the final phase, I transitioned from pure design to a 'Designer-Engineer' role. Using AI tools (Claude Code), I directly analyzed the frontend codebase to identify the root causes of layout bloat that were undetectable via visual inspection.",
        code: "AI-Assisted Structural Refactoring"
      }
    ]
  },
  {
    id: 'p2',
    title: 'Nova Wallet',
    subtitle: 'DeFi Mobile Experience',
    tags: ['Mobile', 'Crypto', 'Web3'],
    description: 'A non-custodial wallet with a focus on human-readable transaction logs.',
    image: 'https://picsum.photos/800/600?random=2',
    metrics: [
      { label: 'App Store Rating', value: '4.8' },
      { label: 'Retention Day 30', value: '62%' },
    ],
    caseStudy: {
      problem: 'Crypto transactions are scary for new users. Hex addresses and gas fees are confusing.',
      role: 'UX Researcher & UI Designer',
      solution: 'Introduced "Human Log" translation for smart contracts and visual gas fee estimators.',
    }
  },
  {
    id: 'p3',
    title: 'Equinox Analytics',
    subtitle: 'Wealth Management SaaS',
    tags: ['B2B', 'SaaS', 'Analytics'],
    description: 'Portfolio balancing tools for wealth managers handling >$10M AUM.',
    image: 'https://picsum.photos/800/600?random=3',
    metrics: [
      { label: 'Reporting Time', value: '-4hrs/wk' },
      { label: 'NPS Score', value: '72' },
    ],
    caseStudy: {
      problem: 'Generating quarterly reports was a manual, error-prone process taking hours per client.',
      role: 'Senior UX Designer',
      solution: 'Automated report generation with a drag-and-drop narrative builder and dynamic chart rendering.',
    }
  }
];

// ==================================================================================
// 5. PHOTO GALLERY
//    Same rules apply: Use local paths '/assets/...' or online URLs.
//    'width' and 'height' control the aspect ratio (e.g. 4 wide, 3 tall).
// ==================================================================================
export const PHOTOS: Photo[] = [
  { 
    id: 'ph1', 
    url: 'https://picsum.photos/600/800?random=10', // Replace with your photo
    title: 'Urban Geometry', 
    exif: 'Leica Q2 • 28mm f/2.0', 
    width: 3, 
    height: 4 
  },
  { 
    id: 'ph2', 
    url: 'https://picsum.photos/800/600?random=11', 
    title: 'Neon Nights', 
    exif: 'Sony A7IV • 50mm f/1.2', 
    width: 4, 
    height: 3 
  },
  { 
    id: 'ph3', 
    url: 'https://picsum.photos/600/600?random=12', 
    title: 'Subway Motion', 
    exif: 'Fujifilm X100V • 23mm f/4.0', 
    width: 1, 
    height: 1 
  },
  { 
    id: 'ph4', 
    url: 'https://picsum.photos/600/800?random=13', 
    title: 'Glass Facade', 
    exif: 'Canon R5 • 85mm f/1.2', 
    width: 3, 
    height: 4 
  },
  { 
    id: 'ph5', 
    url: 'https://picsum.photos/800/600?random=14', 
    title: 'Foggy Morning', 
    exif: 'Sony A7IV • 35mm f/1.4', 
    width: 4, 
    height: 3 
  },
  { 
    id: 'ph6', 
    url: 'https://picsum.photos/600/800?random=15', 
    title: 'Shadow Play', 
    exif: 'Ricoh GRIII • 18mm f/2.8', 
    width: 3, 
    height: 4 
  },
];