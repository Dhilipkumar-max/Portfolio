export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
}

export interface Skill {
  name: string;
  proficiency: number;
  icon: string;
}

export interface SkillCategory {
  title: string;
  color: string;
  skills: Skill[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: "frontend" | "fullstack" | "design";
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  category: "technical" | "design" | "business" | "language";
  issueDate: string;
  credentialId: string;
  credentialUrl: string;
  score?: string;
  skills: string[];
  description: string;
  verified: boolean;
  featured: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  subtitle: string;
  category: "award" | "milestone" | "competition" | "recognition";
  icon: string;
  date: string;
  organization?: string;
  description: string;
  stats?: Array<{ label: string; value: string }>;
  featured: boolean;
  rarity: "common" | "rare" | "epic" | "legendary";
  color: string;
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: "journey-start",
    year: "2024",
    title: "Started My Coding Journey",
    description:
      "Began my journey as a Computer Science Engineering student at Rajalakshmi Institute of Technology. Built my first projects using HTML, CSS, and Python, which sparked my passion for software development and AI-driven systems.",
  },
  {
    id: "hackathons",
    year: "2024",
    title: "First Hackathon & Community Exposure",
    description:
      "Participated in my first hackathon through GDG and later went on to compete in 7 hackathons (4 offline). These experiences strengthened my teamwork, rapid development, and problem-solving skills under real-world constraints.",
  },
  {
    id: "internship-mic-edunet",
    year: "2024",
    title: "First Internship – Microsoft Edunet",
    description:
      "Selected for the Microsoft Edunet Foundation Internship via AICTE portal. Developed a Forest Fire Detection System using Deep Learning and successfully submitted the project. Ranked among the Top 50 performers.",
  },
  {
    id: "leadership-2025",
    year: "2025",
    title: "Leadership & Responsibility",
    description:
      "Appointed as Technical Coordinator Head – Infinites Club. Led technical initiatives and guided juniors. Also selected as Internship Coordinator in College, managing student coordination activities.",
  },
  {
    id: "productivity-2026",
    year: "2026",
    title: "High Productivity Phase",
    description:
      "Completed 40+ projects across frontend, AI/ML, and full-stack domains. Earned 4 GitHub achievement badges and maintaining a 140+ day active streak on LeetCode.",
  },
  {
    id: "current-focus",
    year: "Now",
    title: "Current Focus",
    description:
      "Building scalable, AI-powered systems while improving problem-solving, system design, and leadership skills to prepare for high-impact software engineering roles.",
  },
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    color: "#6C63FF",
    skills: [
      { name: "React", proficiency: 90, icon: "Code2" },
      { name: "Next.js", proficiency: 85, icon: "Globe" },
      { name: "TypeScript", proficiency: 80, icon: "FileCode" },
      { name: "Tailwind", proficiency: 85, icon: "Paintbrush" },
    ],
  },
  {
    title: "Backend",
    color: "#00D4FF",
    skills: [
      { name: "Node.js", proficiency: 70, icon: "Server" },
      { name: "Python", proficiency: 65, icon: "Terminal" },
      { name: "PostgreSQL", proficiency: 60, icon: "Database" },
      { name: "GraphQL", proficiency: 55, icon: "Share2" },
    ],
  },
  {
    title: "Design & Tools",
    color: "#FF6584",
    skills: [
      { name: "Figma", proficiency: 75, icon: "Figma" },
      { name: "Git", proficiency: 85, icon: "GitBranch" },
      { name: "Docker", proficiency: 65, icon: "Box" },
      { name: "AWS", proficiency: 60, icon: "Cloud" },
    ],
  },
];

export const projects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description:
      "Complete shopping experience with cart, checkout, and admin dashboard. Integrated with Stripe for payments and PostgreSQL for data persistence.",
    category: "fullstack",
    techStack: ["Next.js", "Stripe", "PostgreSQL", "Tailwind"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: "2",
    title: "Creative Portfolio",
    description:
      "Interactive portfolio with advanced animations, scroll-driven transitions, and a character guide system that tells a story.",
    category: "frontend",
    techStack: ["React", "Framer Motion", "GSAP", "Three.js"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: "3",
    title: "AI Chat Application",
    description:
      "Real-time chat with AI assistant featuring streaming responses, conversation history, and customizable personas.",
    category: "fullstack",
    techStack: ["React", "OpenAI API", "Node.js", "WebSocket"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: "4",
    title: "Design System",
    description:
      "Comprehensive component library with 50+ components, dark mode, accessibility built-in, and full Storybook documentation.",
    category: "design",
    techStack: ["React", "Storybook", "TypeScript", "CSS Modules"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
  {
    id: "5",
    title: "Analytics Dashboard",
    description:
      "Real-time data visualization dashboard with interactive charts, drag-and-drop widgets, and custom reporting tools.",
    category: "frontend",
    techStack: ["Next.js", "D3.js", "Recharts", "Tailwind"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
  {
    id: "6",
    title: "Task Management API",
    description:
      "RESTful API for project management with real-time collaboration, role-based access control, and webhook integrations.",
    category: "fullstack",
    techStack: ["Node.js", "Express", "MongoDB", "Redis"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
];

export const certificates: Certificate[] = [
  {
    id: "cert-1",
    name: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    category: "technical",
    issueDate: "January 2024",
    credentialId: "AWS-CSA-2024-001",
    credentialUrl: "https://aws.amazon.com",
    score: "850/1000",
    skills: ["AWS Lambda", "EC2", "S3", "CloudFormation", "RDS"],
    description: "Validates expertise in designing distributed systems on AWS",
    verified: true,
    featured: true,
  },
  {
    id: "cert-2",
    name: "Meta Front-End Developer Certificate",
    issuer: "Meta (Coursera)",
    category: "technical",
    issueDate: "November 2023",
    credentialId: "COURSERA-META-FE-2023",
    credentialUrl: "https://coursera.org",
    score: "95%",
    skills: ["React", "JavaScript", "HTML/CSS", "Responsive Design"],
    description: "Comprehensive front-end development training from Meta",
    verified: true,
    featured: true,
  },
  {
    id: "cert-3",
    name: "Google UX Design Professional Certificate",
    issuer: "Google (Coursera)",
    category: "design",
    issueDate: "August 2023",
    credentialId: "COURSERA-GOOGLE-UX-2023",
    credentialUrl: "https://coursera.org",
    skills: ["Figma", "User Research", "Wireframing", "Prototyping"],
    description: "User experience design fundamentals and best practices",
    verified: true,
    featured: false,
  },
  {
    id: "cert-4",
    name: "TypeScript Advanced Patterns",
    issuer: "Egghead.io",
    category: "technical",
    issueDate: "June 2023",
    credentialId: "EGGHEAD-TS-ADVANCED-2023",
    credentialUrl: "https://egghead.io",
    skills: ["TypeScript", "Advanced Types", "Generics", "Utility Types"],
    description: "Master advanced TypeScript patterns and best practices",
    verified: true,
    featured: false,
  },
];

export const achievements: Achievement[] = [
  {
    id: "ach-1",
    title: "Hackathon Winner",
    subtitle: "1st Place",
    category: "competition",
    icon: "🏆",
    date: "March 2024",
    organization: "TechHack 2024",
    description: "Won first place with an AI-powered design system generator",
    stats: [
      { label: "Prize", value: "$5,000" },
      { label: "Participants", value: "200+" },
    ],
    featured: true,
    rarity: "legendary",
    color: "#FFD700",
  },
  {
    id: "ach-2",
    title: "Top 1% Developer",
    subtitle: "GitHub Recognition",
    category: "recognition",
    icon: "⭐",
    date: "January 2024",
    organization: "GitHub",
    description: "Recognized as top 1% most active developer on the platform",
    stats: [
      { label: "Repositories", value: "50+" },
      { label: "Stars", value: "5K+" },
    ],
    featured: true,
    rarity: "epic",
    color: "#6C63FF",
  },
  {
    id: "ach-3",
    title: "Product Hunt Launch",
    subtitle: "Product of the Day",
    category: "milestone",
    icon: "🚀",
    date: "October 2023",
    organization: "Product Hunt",
    description: "Reached #1 on Product Hunt with design system toolkit",
    stats: [
      { label: "Upvotes", value: "1.2K" },
      { label: "Users", value: "2K+" },
    ],
    featured: true,
    rarity: "epic",
    color: "#FF6584",
  },
  {
    id: "ach-4",
    title: "Tech Conference Speaker",
    subtitle: "React Advanced Patterns",
    category: "recognition",
    icon: "🎤",
    date: "July 2023",
    organization: "DevConf 2023",
    description: "Delivered keynote on advanced React patterns to 500+ attendees",
    stats: [
      { label: "Attendees", value: "500+" },
      { label: "Rating", value: "4.8/5" },
    ],
    featured: false,
    rarity: "rare",
    color: "#00D4FF",
  },
  {
    id: "ach-5",
    title: "100+ Projects Shipped",
    subtitle: "Milestone Achievement",
    category: "milestone",
    icon: "📦",
    date: "April 2023",
    organization: "Personal",
    description: "Reached 100 completed projects across web and mobile",
    stats: [
      { label: "Projects", value: "100+" },
      { label: "Technologies", value: "20+" },
    ],
    featured: false,
    rarity: "rare",
    color: "#00D4FF",
  },
  {
    id: "ach-6",
    title: "Open Source Contributor",
    subtitle: "Core Team Member",
    category: "recognition",
    icon: "🔧",
    date: "February 2023",
    organization: "React Ecosystem",
    description: "Contributed to and became core team member of major React library",
    stats: [
      { label: "PRs Merged", value: "50+" },
      { label: "Issues Resolved", value: "100+" },
    ],
    featured: false,
    rarity: "common",
    color: "#B8B8D1",
  },
];

export const socialLinks = [
  { name: "Email", href: "mailto:hello@alexrivera.dev", icon: "Mail" },
  { name: "GitHub", href: "https://github.com", icon: "Github" },
  { name: "LinkedIn", href: "https://linkedin.com", icon: "Linkedin" },
  { name: "Twitter", href: "https://twitter.com", icon: "Twitter" },
];
