import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Award,
  BookOpen,
  Bot,
  Briefcase,
  Brain,
  Code2,
  Cpu,
  Database,
  ExternalLink,
  Globe,
  GithubIcon,
  GraduationCap,
  Handshake,
  LinkedinIcon,
  Lightbulb,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  PenTool,
  Rocket,
  Search,
  Server,
  ShieldCheck,
  Smartphone,
  Trophy,
  Wrench,
  X,
} from "lucide-react";
import profilePhoto from "./src/assets/my_photo_q94.webp";

export const palette = {
  mustard: "#E0AC38",
  page: "#F3F0E8",
  soft: "#FBFBF9",
  warm: "#EFEAE0",
  ink: "#17384A",
  teal: "#2F7E75",
  yellow: "#F1C84C",
  orange: "#F46B42",
  mint: "#BFE2D7",
  coral: "#E7794E",
  line: "#DDD7CD",
  text: "#5E6870",
};

const profile = {
  name: "Alam",
  fullName: "Md. Thaiabul Alam Chowdhury",
  heroFirst: "Md. Thaiabul",
  heroLast: "Alam Chowdhury",
  role: "CSE Graduate | AI Major | Web Developer",
  email: "lakadbd8@gmail.com",
  phone: "01812472998",
  location: "Bangladesh",
  intro:
    "I enjoy turning ideas into practical products, especially in web development, AI-related work, and student-focused solutions.",
  subtitle:
    "Frontend-focused developer building student platforms, web products, and useful digital experiences.",
  github: "https://github.com/alam410",
  linkedin: "https://www.linkedin.com/in/md-thaiabul-alam-chowdhury-1b5982360/",
  leetcode: "https://leetcode.com/u/alam_410/",
  kaggle: "https://www.kaggle.com/alam410",
  profileImage: profilePhoto,
  cvUrl: "",
  cvFileName: "Md-Thaiabul-Alam-Chowdhury-CV.pdf",
};

const sectionCopy = {
  welcomeTitle: "Welcome",
  welcomeWords: ["Hello", "Ciao", "Hola", "Salut", "你好", "Hallo", "Ola", "Selam", "Dia Dhuit"],
  heroBadge: "Available for web projects",
  heroPrimaryButton: "View Projects",
  heroSecondaryButton: "Contact Me",
  heroGithubButton: "GitHub",
  heroProjectsLabel: "Projects",
  heroProfilesLabel: "Profiles",
  heroMajorLabel: "Major",
  heroLoopLabel: "Move with intent",
  heroLoopWords: ["Think", "Grow", "Collaborate"],
  heroCtaTitle: "Let's build together",
  heroCtaBody:
    "Bring your idea, project, or collaboration plan and let's turn it into something useful.",
  heroCtaButton: "Handshake together",
  focusLine1: "Student platforms",
  focusLine2: "Web products",
  focusLine3: "Product thinking",
  focusCard1Value: "React",
  focusCard1Label: "Current focus",
  focusCard2Value: "Ready",
  focusCard2Label: "To collaborate",
  servicesTitle: "What I Build",
  servicesSub:
    "I like software that feels useful, clear, and grounded in a real need instead of just looking polished.",
  servicesBody:
    "This version of the portfolio focuses on real projects, real links, and a cleaner presentation of the work I already have.",
  experienceTitle: "Experience and Leadership",
  experienceSub:
    "Teaching, teamwork, discipline, and hands-on project work all shape how I build.",
  projectsTitle: "Selected Projects",
  projectsSub:
    "Updated with the real BUBT-Connect name, the live project link, and NobleMan correctly marked as a web project.",
  achievementsTitle: "Awards and achievements",
  achievementsSub:
    "Selected highlights from project work, hackathons, and competitive participation.",
  competitionsTitle: "Competitions",
  competitionsSub:
    "Team-based and academic competitions that reflect consistency and problem-solving interest.",
  achievementGalleryTitle: "Achievement Gallery",
  achievementGallerySub: "Reserve visual space for award photos, event pictures, and achievement moments.",
  certificatesTitle: "Certificates",
  certificatesSub: "Show your certificates here so you can keep growing this section over time.",
  referencesTitle: "References",
  referencesSub: "Words from mentors, collaborators, and people who have seen how I work up close.",
  profilesTitle: "Find Me Online",
  profilesSub:
    "These public profiles show my code, problem solving, professional background, and data work.",
  profilesCtaText: "Connect on LinkedIn",
  contactTitleLine1: "Let's build something",
  contactTitleLine2: "useful together.",
  contactBody:
    "If you want to talk about a web project, collaboration, internship opportunity, or product idea, you can reach me directly through email, phone, GitHub, or LinkedIn.",
  basedInLabel: "Based in",
  contactDownloadLabel: "Download CV as PDF",
};

const services = [
  {
    title: "Web Development",
    sub: "Responsive interfaces and practical web products",
    iconKey: "code",
    color: palette.teal,
  },
  {
    title: "App Development",
    sub: "Product-focused mobile ideas and user flows",
    iconKey: "app",
    color: palette.yellow,
  },
  {
    title: "Problem Solving",
    sub: "Academic projects, AI interest, and teamwork",
    iconKey: "award",
    color: palette.orange,
  },
];

const skills = [
  "Python",
  "Scikit-learn",
  "PyTorch",
  "JavaScript",
  "React",
  "Node.js",
  "Java",
  "C++",
  "Firebase",
  "ESP32",
  "Git",
  "SQL",
];

const projects = [
  {
    title: "BUBT-Connect",
    category: "Web",
    description:
      "A university web platform designed to help students connect, share updates, and access useful campus information more easily.",
    role: "Frontend Developer",
    problem:
      "Students needed a clearer way to access campus updates, useful links, and community features in one place.",
    outcome:
      "Delivered a student-focused web experience with a cleaner interface and a more practical campus communication flow.",
    tech: ["React", "Firebase", "Student Platform"],
    accent: palette.yellow,
    image: "",
    link: "https://bubt-connect.vercel.app/login",
  },
  {
    title: "NobleMan",
    category: "Web",
    description:
      "A web project centered on practical product thinking, clean user experience, and a straightforward interface.",
    role: "Web Product Developer",
    problem:
      "The goal was to present a practical web product with a cleaner flow, stronger usability, and less friction in the interface.",
    outcome:
      "Built a more structured web experience focused on straightforward navigation, presentation clarity, and product thinking.",
    tech: ["Web App", "Frontend", "UI Thinking"],
    accent: palette.teal,
    image: "",
    link: "",
  },
  {
    title: "Blood Donation App",
    category: "App",
    description:
      "An app concept focused on helping donors and recipients connect faster during emergency situations.",
    role: "App Concept Designer",
    problem:
      "Emergency donation requests often suffer from slow communication and poor coordination between donors and recipients.",
    outcome:
      "Designed a practical app concept aimed at faster donor-response flow and clearer emergency support communication.",
    tech: ["Mobile UI", "Firebase", "Community Support"],
    accent: palette.mint,
    image: "",
    link: "",
  },
];

const achievements = [
  "IDEA Project Winner",
  "IUT Hackathon Finalist",
  "Intra Coding Finalist",
  "Hackathon Finalist",
];

const competitions = ["Intracampus Competition", "IUT Programming / Hackathon Participation"];

const achievementGallery = [];

const certificates = [];

const references = [];

const onlineProfiles = getDefaultOnlineProfiles(profile);

const experience = [
  {
    org: "Schovarce Academy",
    period: "Lecturer",
    role: "Teaching and Mentoring",
    text: "Helped students understand technical topics clearly and made difficult concepts easier to apply in practical work.",
    dot: palette.teal,
    sortDate: "2025-01-01",
  },
  {
    org: "Bangladesh Army",
    period: "Ex Officer Cadet",
    role: "Leadership and Discipline",
    text: "Built discipline, teamwork, responsibility, and calm execution under pressure through structured training.",
    dot: palette.orange,
    sortDate: "2024-01-01",
  },
  {
    org: "Academic Projects and Competitions",
    period: "Project Work",
    role: "Builder and Collaborator",
    text: "Worked across web development, AI-related exploration, and team-based academic projects with a focus on useful results.",
    dot: palette.yellow,
    sortDate: "2023-01-01",
  },
];

export const defaultPortfolioContent = {
  profile,
  sectionCopy,
  services,
  skills,
  projects,
  achievements,
  competitions,
  achievementGallery,
  certificates,
  references,
  onlineProfiles,
  experience,
};

export const serviceIconOptions = [
  { value: "code", label: "Code" },
  { value: "app", label: "App" },
  { value: "award", label: "Award" },
  { value: "bot", label: "Bot" },
  { value: "book", label: "Book" },
  { value: "cpu", label: "CPU" },
  { value: "globe", label: "Globe" },
  { value: "brain", label: "Brain" },
  { value: "briefcase", label: "Briefcase" },
  { value: "graduation", label: "Graduation" },
  { value: "database", label: "Database" },
  { value: "idea", label: "Idea" },
  { value: "pen", label: "Design" },
  { value: "rocket", label: "Rocket" },
  { value: "search", label: "Search" },
  { value: "server", label: "Server" },
  { value: "shield", label: "Shield" },
  { value: "wrench", label: "Wrench" },
];

export const profileIconOptions = [
  { value: "github", label: "GitHub" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "leetcode", label: "LeetCode" },
  { value: "codeforces", label: "Codeforces" },
  { value: "hackerrank", label: "HackerRank" },
  { value: "codechef", label: "CodeChef" },
  { value: "atcoder", label: "AtCoder" },
  { value: "kaggle", label: "Kaggle" },
  { value: "code", label: "Code" },
  { value: "award", label: "Award" },
  { value: "globe", label: "Globe" },
  { value: "briefcase", label: "Briefcase" },
  { value: "brain", label: "Brain" },
  { value: "database", label: "Database" },
  { value: "rocket", label: "Rocket" },
  { value: "book", label: "Book" },
  { value: "mail", label: "Mail" },
];

const withIds = (items = []) =>
  items.map((item, index) => ({
    id: item.id || `${item.title || item.name || item.platform || item.org || item.role || "item"}-${index + 1}`,
    ...item,
  }));

const normalizeArray = (incoming, fallback, { allowEmpty = false } = {}) => {
  if (!Array.isArray(incoming)) {
    return withIds(fallback);
  }

  if (!allowEmpty && incoming.length === 0) {
    return withIds(fallback);
  }

  return withIds(incoming);
};

const projectTemplate = {
  title: "",
  category: "",
  description: "",
  role: "",
  impact: "",
  problem: "",
  outcome: "",
  tech: [],
  accent: palette.yellow,
  image: "",
  media: [],
  link: "",
};

const experienceTemplate = {
  org: "",
  period: "",
  role: "",
  text: "",
  dot: palette.teal,
  sortDate: "",
};

const referenceTemplate = {
  name: "",
  designation: "",
  quote: "",
  image: "",
};

const onlineProfileTemplate = {
  platform: "",
  name: "",
  handle: "",
  href: "",
  iconKey: "globe",
  accent: palette.teal,
};

export function mergePortfolioContent(rawContent = {}) {
  const mergedProfile = {
    ...defaultPortfolioContent.profile,
    ...(rawContent.profile || {}),
  };

  return {
    ...defaultPortfolioContent,
    ...rawContent,
    profile: mergedProfile,
    sectionCopy: {
      ...defaultPortfolioContent.sectionCopy,
      ...(rawContent.sectionCopy || {}),
    },
    services: normalizeArray(rawContent.services, defaultPortfolioContent.services, { allowEmpty: true }),
    skills: Array.isArray(rawContent.skills) ? rawContent.skills : defaultPortfolioContent.skills,
    projects: normalizeArray(rawContent.projects, defaultPortfolioContent.projects, { allowEmpty: true }).map((item) => ({
      ...projectTemplate,
      ...item,
      impact: item.impact || item.outcome || "",
      tech: Array.isArray(item.tech) ? item.tech : [],
      media: normalizeProjectMediaItems(item),
    })),
    achievements: Array.isArray(rawContent.achievements) ? rawContent.achievements : defaultPortfolioContent.achievements,
    competitions: Array.isArray(rawContent.competitions) ? rawContent.competitions : defaultPortfolioContent.competitions,
    achievementGallery: normalizeArray(rawContent.achievementGallery, defaultPortfolioContent.achievementGallery, { allowEmpty: true }),
    certificates: normalizeArray(rawContent.certificates, defaultPortfolioContent.certificates, { allowEmpty: true }),
    references: normalizeArray(rawContent.references, defaultPortfolioContent.references, { allowEmpty: true }).map((item) => ({
      ...referenceTemplate,
      ...item,
    })),
    onlineProfiles: normalizeArray(
      Array.isArray(rawContent.onlineProfiles) ? rawContent.onlineProfiles : getDefaultOnlineProfiles(mergedProfile),
      defaultPortfolioContent.onlineProfiles,
      { allowEmpty: true },
    ).map((item) => ({
      ...onlineProfileTemplate,
      ...item,
      platform: item.platform || item.label || item.title || "",
      name: item.name || mergedProfile.fullName || item.handle || item.title || "",
    })),
    experience: normalizeArray(rawContent.experience, defaultPortfolioContent.experience, { allowEmpty: true }).map((item) => ({
      ...experienceTemplate,
      ...item,
    })),
  };
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

function formatPhoneDisplay(value = "") {
  const digits = String(value).replace(/\D/g, "");

  if (digits.length === 11 && digits.startsWith("0")) {
    return `${digits.slice(0, 5)} ${digits.slice(5)}`;
  }

  if (digits.length === 13 && digits.startsWith("880")) {
    return `+${digits.slice(0, 3)} ${digits.slice(3, 7)} ${digits.slice(7)}`;
  }

  return value;
}

function getWhatsAppHref(value = "") {
  const digits = String(value).replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("0")) return `https://wa.me/88${digits}`;
  if (digits.startsWith("880")) return `https://wa.me/${digits}`;
  return `https://wa.me/${digits}`;
}

function formatLocationDisplay(value = "") {
  return String(value)
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .join(", ");
}

function getProjectMediaTypeFromUrl(url = "") {
  const cleaned = String(url).split("?")[0].toLowerCase();

  if (/\.(mp4|webm|ogg|mov|m4v)$/i.test(cleaned)) {
    return "video";
  }

  return "image";
}

function normalizeProjectMediaItems(project = {}) {
  if (Array.isArray(project.media) && project.media.length) {
    return project.media
      .map((item, index) => {
        if (typeof item === "string") {
          return {
            id: `project-media-${index + 1}`,
            url: item,
            type: getProjectMediaTypeFromUrl(item),
          };
        }

        const url = item?.url || item?.src || "";

        if (!url) {
          return null;
        }

        return {
          id: item.id || `project-media-${index + 1}`,
          url,
          type: item.type || getProjectMediaTypeFromUrl(url),
        };
      })
      .filter(Boolean);
  }

  if (project.image) {
    return [
      {
        id: "project-media-legacy-1",
        url: project.image,
        type: "image",
      },
    ];
  }

  return [];
}

function isPortraitMediaDimensions(width = 0, height = 0) {
  if (!width || !height) {
    return false;
  }

  return height > width * 1.1;
}

function formatLinkDisplay(value = "") {
  return String(value).replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");
}

function getExperienceSortDate(item) {
  const parsedDate = Date.parse(item?.sortDate || "");
  return Number.isFinite(parsedDate) ? parsedDate : Number.NEGATIVE_INFINITY;
}

function getGithubDisplay(value = "") {
  const cleaned = formatLinkDisplay(value);
  const match = cleaned.match(/^github\.com\/([^/?#]+)/i);
  if (match?.[1]) {
    return `@${match[1]}`;
  }
  return cleaned;
}

function getLinkedinDisplay(value = "", fallbackName = "") {
  if (fallbackName) {
    return fallbackName;
  }

  const cleaned = formatLinkDisplay(value);
  const match = cleaned.match(/^linkedin\.com\/in\/([^/?#]+)/i);
  if (match?.[1]) {
    return match[1]
      .split("-")
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  }
  return cleaned;
}

function getLeetcodeDisplay(value = "") {
  const cleaned = formatLinkDisplay(value);
  const match = cleaned.match(/^leetcode\.com\/u\/([^/?#]+)/i);
  if (match?.[1]) {
    return match[1];
  }
  return cleaned;
}

function getKaggleDisplay(value = "") {
  const cleaned = formatLinkDisplay(value);
  const match = cleaned.match(/^kaggle\.com\/([^/?#]+)/i);
  if (match?.[1]) {
    return match[1];
  }
  return cleaned;
}

function getDefaultOnlineProfiles(currentProfile = {}) {
  return [
    {
      platform: "GitHub",
      name: currentProfile.fullName || "Profile Name",
      handle: getGithubDisplay(currentProfile.github || ""),
      href: currentProfile.github || "",
      iconKey: "github",
      accent: palette.teal,
    },
    {
      platform: "LinkedIn",
      name: currentProfile.fullName || "Profile Name",
      handle: "Professional profile",
      href: currentProfile.linkedin || "",
      iconKey: "linkedin",
      accent: palette.coral,
    },
    {
      platform: "LeetCode",
      name: currentProfile.fullName || "Profile Name",
      handle: getLeetcodeDisplay(currentProfile.leetcode || ""),
      href: currentProfile.leetcode || "",
      iconKey: "leetcode",
      accent: palette.yellow,
    },
    {
      platform: "Kaggle",
      name: currentProfile.fullName || "Profile Name",
      handle: getKaggleDisplay(currentProfile.kaggle || ""),
      href: currentProfile.kaggle || "",
      iconKey: "kaggle",
      accent: palette.mint,
    },
  ].filter((item) => item.href);
}

function SectionTitle({ title, sub, center = false }) {
  return (
    <div className={center ? "text-center" : "text-left"}>
      <h2
        className="text-[42px] font-black leading-none tracking-[-0.04em] sm:text-[54px] lg:text-[58px]"
        style={{ color: palette.ink, fontFamily: '"Space Grotesk", "Manrope", sans-serif' }}
      >
        {title}
      </h2>
      {sub ? (
        <p
          className={`mt-3 text-[15px] leading-8 ${center ? "mx-auto max-w-2xl" : "max-w-xl"}`}
          style={{ color: palette.text }}
        >
          {sub}
        </p>
      ) : null}
    </div>
  );
}

function NavLink({ href, children, onClick }) {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      whileHover={{
        y: -2,
        scale: 1.03,
        backgroundColor: "rgba(47,126,117,0.14)",
        color: palette.teal,
        borderColor: "rgba(47,126,117,0.26)",
        boxShadow: "0 10px 18px rgba(47,126,117,0.12)",
      }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="rounded-full border border-transparent px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] transition-all duration-200"
      style={{ color: "#2E3740" }}
    >
      {children}
    </motion.a>
  );
}

function ImageSlot({ src, alt, className = "", label = "Add image here" }) {
  if (src) {
    return <img src={src} alt={alt} loading="lazy" className={`h-full w-full object-cover ${className}`} />;
  }

  return (
    <div className={`flex h-full w-full items-center justify-center border-2 border-dashed ${className}`} style={{ borderColor: palette.line }}>
      <div className="text-center">
        <div className="text-sm font-semibold" style={{ color: palette.ink }}>{label}</div>
        <div className="mt-1 text-xs" style={{ color: palette.text }}>Preview will be added here</div>
      </div>
    </div>
  );
}

function useTouchMotion() {
  const [isTouchMotion, setIsTouchMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return undefined;

    const mediaQuery = window.matchMedia("(hover: none), (pointer: coarse)");
    const updateTouchMode = () => setIsTouchMotion(mediaQuery.matches);

    updateTouchMode();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateTouchMode);
      return () => mediaQuery.removeEventListener("change", updateTouchMode);
    }

    mediaQuery.addListener(updateTouchMode);
    return () => mediaQuery.removeListener(updateTouchMode);
  }, []);

  return isTouchMotion;
}

function DepthCard({
  children,
  className = "",
  surfaceClassName = "",
  glow = "radial-gradient(circle at 20% 20%, rgba(47,126,117,0.24), rgba(255,255,255,0))",
  plate = "rgba(255,255,255,0.34)",
  shadow = "rgba(15,23,42,0.16)",
  hover = true,
  style = {},
  surfaceStyle = {},
}) {
  const isTouchMotion = useTouchMotion();
  const desktopHoverAnimation = hover ? { y: -10, rotateX: 7, rotateY: -7, scale: 1.01 } : undefined;
  const touchRestAnimation = hover && isTouchMotion ? { y: -4, rotateX: 4, rotateY: -4, scale: 1.005 } : undefined;
  const touchTapAnimation = hover && isTouchMotion ? { y: -1, rotateX: 1, rotateY: -1, scale: 0.992 } : undefined;

  return (
    <motion.div
      animate={touchRestAnimation}
      whileHover={!isTouchMotion ? desktopHoverAnimation : undefined}
      whileTap={touchTapAnimation}
      transition={{ type: "spring", stiffness: 180, damping: 18, mass: 0.8 }}
      className={`relative ${className}`}
      style={{ transformStyle: "preserve-3d", transformPerspective: 1800, ...style }}
    >
      <div
        className="pointer-events-none absolute -inset-4 opacity-70 blur-3xl"
        style={{ borderRadius: "inherit", background: glow, transform: "translate3d(18px, 22px, -48px)" }}
      />
      <div
        className="pointer-events-none absolute inset-0 border"
        style={{
          borderRadius: "inherit",
          background: plate,
          borderColor: "rgba(255,255,255,0.52)",
          transform: "translate3d(18px, 20px, -30px)",
          boxShadow: `0 26px 48px ${shadow}`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-[8px] border"
        style={{
          borderRadius: "inherit",
          borderColor: "rgba(255,255,255,0.32)",
          transform: "translate3d(8px, 10px, -16px)",
        }}
      />
      <div
        className={`relative overflow-hidden border backdrop-blur-xl ${surfaceClassName}`}
        style={{ borderRadius: "inherit", borderColor: "rgba(255,255,255,0.56)", ...surfaceStyle }}
      >
        {children}
      </div>
    </motion.div>
  );
}

const serviceIcons = {
  code: Code2,
  app: Smartphone,
  award: Trophy,
  bot: Bot,
  book: BookOpen,
  cpu: Cpu,
  globe: Globe,
  brain: Brain,
  briefcase: Briefcase,
  graduation: GraduationCap,
  database: Database,
  idea: Lightbulb,
  pen: PenTool,
  rocket: Rocket,
  search: Search,
  server: Server,
  shield: ShieldCheck,
  wrench: Wrench,
};

function CodeforcesPlatformIcon({ className, style }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor" aria-hidden="true">
      <rect x="3" y="12" width="4.2" height="7" rx="1.3" />
      <rect x="9.8" y="6" width="4.2" height="13" rx="1.3" />
      <rect x="16.6" y="9" width="4.2" height="10" rx="1.3" />
    </svg>
  );
}

function HackerRankPlatformIcon({ className, style }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" aria-hidden="true">
      <path d="M8 4.9h8l4 7.1-4 7.1H8L4 12z" stroke="currentColor" strokeWidth="2.1" strokeLinejoin="round" />
      <path d="M9.2 8.2v7.6M14.8 8.2v7.6M9.2 12h5.6" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
    </svg>
  );
}

function CodeChefPlatformIcon({ className, style }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" aria-hidden="true">
      <path d="M7.8 8.1c0-1.5 1.2-2.7 2.7-2.7h3c1.5 0 2.7 1.2 2.7 2.7v1.8a4.2 4.2 0 0 1-4.2 4.2h-.8a4.2 4.2 0 0 1-4.2-4.2z" stroke="currentColor" strokeWidth="2" />
      <path d="M16.2 8.8h1.2a1.8 1.8 0 0 1 1.8 1.8v.1a2.3 2.3 0 0 1-2.3 2.3h-.7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M8.2 18.1h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M10.7 14.1v3.2M13.5 14.1v3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function AtCoderPlatformIcon({ className, style }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" aria-hidden="true">
      <path d="M12 5.1 6.8 18.9h3.1l1-2.8h2.3l1 2.8h3.1z" stroke="currentColor" strokeWidth="2.1" strokeLinejoin="round" />
      <path d="M10.7 12.9h2.6" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
      <path d="M18.8 8.9a2.8 2.8 0 1 0 0 6.2" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
    </svg>
  );
}

function LeetCodePlatformIcon({ className, style }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" aria-hidden="true">
      <path d="M15.5 5.3 20.1 9.9" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
      <path d="M11.5 8 6.4 13.1a2.8 2.8 0 0 0 0 4 2.8 2.8 0 0 0 4 0l1.6-1.6" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.4 12h8" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
    </svg>
  );
}

function KagglePlatformIcon({ className, style }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" aria-hidden="true">
      <path d="M8 5.4v13.2" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
      <path d="M16.4 7.6 11.2 12.8l5.2 5" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.2 11 14.2 8" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
    </svg>
  );
}

const profileIcons = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  leetcode: LeetCodePlatformIcon,
  codeforces: CodeforcesPlatformIcon,
  hackerrank: HackerRankPlatformIcon,
  codechef: CodeChefPlatformIcon,
  atcoder: AtCoderPlatformIcon,
  kaggle: KagglePlatformIcon,
  code: Code2,
  award: Award,
  globe: Globe,
  briefcase: Briefcase,
  brain: Brain,
  database: Database,
  rocket: Rocket,
  book: BookOpen,
  mail: Mail,
};

const fallbackFocusWords = ["Think", "Grow", "Collaborate"];
const fallbackWelcomeWords = ["Hello", "Ciao", "Hola", "Salut", "你好", "Hallo", "Ola", "Selam", "Dia Dhuit"];

function ServiceCard({ item }) {
  const Icon = serviceIcons[item.iconKey] || Code2;
  return (
    <motion.div variants={fadeUp}>
      <DepthCard
        className="rounded-[24px]"
        glow={`radial-gradient(circle at 15% 20%, ${item.color}40, rgba(255,255,255,0))`}
        plate="rgba(255,255,255,0.38)"
        shadow="rgba(15,23,42,0.12)"
        surfaceClassName="bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(247,242,235,0.92)_100%)]"
      >
        <div className="relative px-6 py-6">
          <div className="pointer-events-none absolute right-5 top-4 h-14 w-14 rounded-full opacity-70 blur-2xl" style={{ backgroundColor: `${item.color}55` }} />
          <div className="flex items-start gap-5">
            <div className="relative flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: item.color }}>
              <div className="absolute inset-1 rounded-full border border-white/30" />
              <Icon className="relative z-10 h-6 w-6 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[20px] font-bold leading-[1.2] tracking-[-0.02em]" style={{ color: palette.ink }}>{item.title}</div>
              <div className="mt-2 text-[14px] leading-7" style={{ color: palette.text }}>{item.sub}</div>
            </div>
          </div>
        </div>
      </DepthCard>
    </motion.div>
  );
}

function ProjectCard({ project }) {
  const projectImpact = project.impact || project.outcome;
  const projectMedia = useMemo(() => normalizeProjectMediaItems(project), [project]);
  const isTouchMotion = useTouchMotion();
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [activeMediaIsPortrait, setActiveMediaIsPortrait] = useState(false);
  const activeMedia = projectMedia[activeMediaIndex] || null;

  useEffect(() => {
    setActiveMediaIndex(0);
  }, [project.id, projectMedia.length]);

  useEffect(() => {
    if (projectMedia.length <= 1) {
      return undefined;
    }

    const delay = activeMedia?.type === "video" ? 5200 : 3200;
    const timeoutId = window.setTimeout(() => {
      setActiveMediaIndex((current) => (current + 1) % projectMedia.length);
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [activeMedia?.type, activeMediaIndex, projectMedia.length]);

  useEffect(() => {
    if (!activeMedia?.url) {
      setActiveMediaIsPortrait(false);
      return undefined;
    }

    let cancelled = false;

    if (activeMedia.type === "video") {
      const video = document.createElement("video");
      video.preload = "metadata";

      const handleLoadedMetadata = () => {
        if (!cancelled) {
          setActiveMediaIsPortrait(
            isPortraitMediaDimensions(video.videoWidth, video.videoHeight),
          );
        }
      };

      const handleVideoError = () => {
        if (!cancelled) {
          setActiveMediaIsPortrait(false);
        }
      };

      video.addEventListener("loadedmetadata", handleLoadedMetadata);
      video.addEventListener("error", handleVideoError);
      video.src = activeMedia.url;

      return () => {
        cancelled = true;
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
        video.removeEventListener("error", handleVideoError);
        video.removeAttribute("src");
        video.load();
      };
    }

    const image = new Image();
    image.onload = () => {
      if (!cancelled) {
        setActiveMediaIsPortrait(
          isPortraitMediaDimensions(image.naturalWidth, image.naturalHeight),
        );
      }
    };
    image.onerror = () => {
      if (!cancelled) {
        setActiveMediaIsPortrait(false);
      }
    };
    image.src = activeMedia.url;

    return () => {
      cancelled = true;
    };
  }, [activeMedia?.type, activeMedia?.url]);

  return (
    <motion.div
      layout
      variants={fadeUp}
      className="h-full"
      whileHover={!isTouchMotion ? { y: -8, rotateX: 3, rotateY: -3, scale: 1.008 } : undefined}
      whileTap={isTouchMotion ? { y: -2, scale: 0.992 } : undefined}
      transition={{ type: "spring", stiffness: 220, damping: 20, mass: 0.8 }}
      style={{ transformStyle: "preserve-3d", transformPerspective: 1800 }}
    >
      <DepthCard
        className="h-full rounded-[26px]"
        glow={`radial-gradient(circle at 15% 20%, ${project.accent}55, rgba(255,255,255,0))`}
        plate="rgba(255,255,255,0.36)"
        shadow="rgba(15,23,42,0.16)"
        hover={false}
        surfaceClassName="h-full bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(248,244,238,0.95)_100%)]"
      >
        <div className="group flex h-full flex-col">
          <div className="relative h-[270px] overflow-hidden p-5" style={{ background: `linear-gradient(180deg, ${project.accent} 0%, rgba(255,255,255,0.88) 130%)` }}>
            <div className="pointer-events-none absolute right-6 top-5 h-24 w-24 rounded-full bg-white/45 blur-2xl transition-all duration-500 group-hover:scale-125 group-hover:opacity-90" />
            <div className="pointer-events-none absolute inset-y-0 -left-1/3 w-28 rotate-[16deg] bg-white/20 opacity-0 blur-2xl transition-all duration-700 group-hover:left-[118%] group-hover:opacity-100" />
            <div className="mb-3 inline-flex rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] transition-all duration-300 group-hover:-translate-y-0.5" style={{ color: palette.ink }}>
              {project.category}
            </div>
            <div className="relative z-10 max-w-[260px] text-[30px] font-black leading-none tracking-[-0.03em] transition-transform duration-300 group-hover:-translate-y-0.5" style={{ color: palette.ink }}>
              {project.title}
            </div>

            <motion.div
              animate={isTouchMotion ? { y: -3, rotateX: 3, rotateY: -3, scale: 1.006 } : undefined}
              whileHover={!isTouchMotion ? { y: -6, rotateX: 4, rotateY: -4, scale: 1.015 } : undefined}
              whileTap={isTouchMotion ? { y: -1, scale: 0.994 } : undefined}
              transition={{ type: "spring", stiffness: 190, damping: 20, mass: 0.82 }}
              className="absolute bottom-5 left-5 right-5 h-[146px] rounded-[24px] border border-white/60 bg-white/92 p-3 shadow-[0_24px_42px_rgba(15,23,42,0.16)] transition-shadow duration-300 group-hover:shadow-[0_28px_52px_rgba(15,23,42,0.18)]"
              style={{ transformStyle: "preserve-3d", transformPerspective: 1200 }}
            >
              <div className="pointer-events-none absolute inset-0 rounded-[24px] border border-white/60" style={{ transform: "translate3d(10px, 10px, -16px)" }} />
              <div className="relative h-full overflow-hidden rounded-[18px] bg-[#F8F4ED]">
                <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-12 bg-gradient-to-b from-white/30 to-transparent" />
                {activeMedia ? (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeMedia.id || `${activeMedia.url}-${activeMediaIndex}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className={`absolute inset-0 ${activeMediaIsPortrait ? "flex items-center justify-center px-5 py-2" : ""}`}
                    >
                      {activeMediaIsPortrait ? (
                        <div className="relative h-full w-[78px] max-w-[40%] rounded-[18px] border border-white/70 bg-[#142430] p-1.5 shadow-[0_18px_30px_rgba(15,23,42,0.2)]">
                          <div className="absolute left-1/2 top-1.5 h-1 w-8 -translate-x-1/2 rounded-full bg-white/25" />
                          <div className="h-full overflow-hidden rounded-[14px] bg-black">
                            {activeMedia.type === "video" ? (
                              <video
                                src={activeMedia.url}
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="h-full w-full object-contain"
                              />
                            ) : (
                              <img
                                src={activeMedia.url}
                                alt={project.title}
                                loading="lazy"
                                className="h-full w-full object-contain"
                              />
                            )}
                          </div>
                        </div>
                      ) : (
                        <>
                          {activeMedia.type === "video" ? (
                            <video
                              src={activeMedia.url}
                              autoPlay
                              muted
                              loop
                              playsInline
                              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                            />
                          ) : (
                            <img
                              src={activeMedia.url}
                              alt={project.title}
                              loading="lazy"
                              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                            />
                          )}
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <ImageSlot src={project.image} alt={project.title} label="Project screenshot" className="rounded-[18px] bg-[#F8F4ED]" />
                )}

                {projectMedia.length > 1 ? (
                  <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-white/85 px-2 py-1 shadow-[0_8px_18px_rgba(15,23,42,0.12)]">
                    {projectMedia.map((item, index) => (
                      <span
                        key={item.id || `${project.title}-media-dot-${index}`}
                        className="block h-1.5 rounded-full transition-all duration-200"
                        style={{
                          width: index === activeMediaIndex ? 14 : 6,
                          backgroundColor: index === activeMediaIndex ? palette.ink : "rgba(23,56,74,0.28)",
                        }}
                      />
                    ))}
                  </div>
                ) : null}

                {activeMedia?.type === "video" ? (
                  <div
                    className="absolute left-3 top-3 rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] shadow-[0_8px_18px_rgba(15,23,42,0.12)]"
                    style={{ backgroundColor: "rgba(255,255,255,0.9)", color: palette.ink }}
                  >
                    Video
                  </div>
                ) : null}
              </div>
            </motion.div>
          </div>

          <div className="flex flex-1 flex-col p-6">
            <p className="whitespace-pre-line break-words text-[15px] leading-8" style={{ color: palette.text }}>
              {project.description}
            </p>
            {project.role || projectImpact ? (
              <div className="mt-4 space-y-3">
                {project.role ? (
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.16em]" style={{ color: palette.text }}>
                      Role
                    </div>
                    <div className="mt-1 text-[14px] leading-7" style={{ color: palette.ink }}>
                      {project.role}
                    </div>
                  </div>
                ) : null}
                {projectImpact ? (
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.16em]" style={{ color: palette.text }}>
                      Impact
                    </div>
                    <div className="mt-1 text-[14px] leading-7" style={{ color: palette.ink }}>
                      {projectImpact}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tech.map((item) => (
                <span key={item} className="rounded-full border px-3 py-1 text-xs font-medium shadow-sm" style={{ backgroundColor: "rgba(255,255,255,0.84)", color: palette.ink, borderColor: "rgba(23,56,74,0.08)" }}>
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-4">
              {project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-transform duration-300 hover:-translate-y-0.5"
                  style={{ color: palette.coral }}
                >
                  View project <ExternalLink className="h-4 w-4 transition-transform duration-300 hover:translate-x-0.5 hover:-translate-y-0.5" />
                </a>
              ) : (
                <span className="text-sm font-semibold" style={{ color: palette.text }}>
                  Link coming soon
                </span>
              )}
            </div>
          </div>
        </div>
      </DepthCard>
    </motion.div>
  );
}

function OnlineProfileCard({ item }) {
  const Icon = item.icon;
  const isTouchMotion = useTouchMotion();
  const platformLabel = item.platform || item.title || "Profile";
  const profileName = item.name || item.handle || item.title || "Profile Name";

  return (
    <motion.a
      variants={fadeUp}
      href={item.href}
      target="_blank"
      rel="noreferrer"
      className="group block h-full"
      whileHover={!isTouchMotion ? { y: -5, scale: 1.01 } : undefined}
      whileTap={isTouchMotion ? { y: -1, scale: 0.992 } : undefined}
      transition={{ type: "spring", stiffness: 220, damping: 22, mass: 0.8 }}
    >
      <div
        className="relative h-full overflow-hidden rounded-[24px] border p-5 shadow-[0_16px_34px_rgba(15,23,42,0.06)] transition-all duration-300 group-hover:shadow-[0_24px_48px_rgba(15,23,42,0.1)]"
        style={{
          borderColor: `${item.accent}22`,
          background: `linear-gradient(180deg, rgba(255,255,255,0.96) 0%, ${item.accent}10 100%)`,
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.78),transparent_45%)]" />
        <div
          className="pointer-events-none absolute right-[-18px] top-[-20px] h-28 w-28 rounded-full blur-3xl transition-opacity duration-300 group-hover:opacity-100"
          style={{ backgroundColor: `${item.accent}28`, opacity: 0.9 }}
        />
        <div
          className="pointer-events-none absolute inset-x-5 top-0 h-[3px] rounded-full"
          style={{ background: `linear-gradient(90deg, ${item.accent}, ${item.accent}00)` }}
        />
        <div className="pointer-events-none absolute inset-y-0 -left-1/3 w-24 rotate-[18deg] bg-white/35 opacity-0 blur-2xl transition-all duration-700 group-hover:left-[118%] group-hover:opacity-100" />

        <div className="relative flex h-full flex-col">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className="relative flex h-[54px] w-[54px] items-center justify-center overflow-hidden rounded-[18px] border shadow-[0_12px_24px_rgba(15,23,42,0.08)] transition-all duration-300 group-hover:-translate-y-0.5"
                style={{
                  borderColor: `${item.accent}40`,
                  background: `linear-gradient(180deg, rgba(255,255,255,0.92) 0%, ${item.accent}1C 100%)`,
                }}
              >
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
                  style={{ background: `linear-gradient(90deg, ${item.accent}, ${item.accent}80)` }}
                />
                <div
                  className="pointer-events-none absolute inset-0 opacity-80"
                  style={{ background: `radial-gradient(circle at 30% 25%, ${item.accent}18, transparent 60%)` }}
                />
                <Icon className="relative z-10 h-6 w-6" style={{ color: item.accent }} />
              </div>
              <div
                className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]"
                style={{ backgroundColor: `${item.accent}14`, color: item.accent, border: `1px solid ${item.accent}24` }}
              >
                {platformLabel}
              </div>
            </div>
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 group-hover:-translate-y-0.5"
              style={{
                borderColor: `${item.accent}30`,
                backgroundColor: "rgba(255,255,255,0.72)",
              }}
            >
              <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" style={{ color: palette.ink }} />
            </div>
          </div>

          <div
            className="relative mt-7 flex-1 rounded-[20px] border px-5 py-5 backdrop-blur-[1px]"
            style={{
              borderColor: `${item.accent}20`,
              background: `linear-gradient(180deg, rgba(255,255,255,0.72) 0%, ${item.accent}12 100%)`,
            }}
          >
            <div className="text-[22px] font-bold tracking-[-0.03em]" style={{ color: palette.ink }}>
              {profileName}
            </div>
            <div className="mt-3 text-[14px] leading-7" style={{ color: palette.text }}>
              {item.handle}
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
              <div
                className="h-[3px] w-14 rounded-full transition-all duration-300 group-hover:w-24"
                style={{ backgroundColor: item.accent }}
              />
              <div
                className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]"
                style={{ color: palette.ink, backgroundColor: "rgba(255,255,255,0.68)" }}
              >
                Active
              </div>
            </div>
          </div>

          <div className="relative mt-5 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em]" style={{ color: palette.ink }}>
            Open profile
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </motion.a>
  );
}

function MediaCard({ item, eyebrow, fallbackLabel, metaLabel }) {
  return (
    <motion.div variants={fadeUp}>
      <DepthCard
        className="rounded-[24px]"
        glow="radial-gradient(circle at 18% 15%, rgba(241,200,76,0.28), rgba(255,255,255,0))"
        surfaceClassName="bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(248,244,238,0.94)_100%)]"
        shadow="rgba(15,23,42,0.14)"
      >
        <div className="p-4">
          <div className="mb-4 flex items-center justify-between gap-3">
            <span className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ backgroundColor: palette.warm, color: palette.ink }}>
              {eyebrow}
            </span>
            {item.link ? (
              <a href={item.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold" style={{ color: palette.coral }}>
                Open <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ) : null}
          </div>
          <div className="overflow-hidden rounded-[18px] border bg-white" style={{ borderColor: palette.line }}>
            <ImageSlot
              src={item.image}
              alt={item.title}
              label={fallbackLabel}
              className="h-[210px] bg-[#FBF6EF]"
            />
          </div>
          <div className="mt-4">
            <div className="text-[22px] font-bold tracking-[-0.03em]" style={{ color: palette.ink }}>{item.title}</div>
            <div className="mt-2 text-[14px] leading-7" style={{ color: palette.text }}>{metaLabel}</div>
          </div>
        </div>
      </DepthCard>
    </motion.div>
  );
}

function ReferenceCard({ item }) {
  return (
    <div className="min-w-[320px] max-w-[320px] shrink-0">
      <DepthCard
        className="h-full rounded-[28px]"
        glow="radial-gradient(circle at 18% 18%, rgba(47,126,117,0.22), rgba(255,255,255,0))"
        plate="rgba(255,255,255,0.34)"
        shadow="rgba(15,23,42,0.12)"
        surfaceClassName="h-full bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(248,244,238,0.95)_100%)] p-5"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-start gap-4">
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-[18px] border bg-[#F8F4ED]" style={{ borderColor: palette.line }}>
              <ImageSlot
                src={item.image}
                alt={item.name || "Reference"}
                label="Reference image"
                className="h-full w-full bg-[#F8F4ED]"
              />
            </div>
            <div className="min-w-0">
              <div className="text-[18px] font-bold tracking-[-0.03em]" style={{ color: palette.ink }}>
                {item.name}
              </div>
              <div className="mt-1 text-[13px] leading-6" style={{ color: palette.text }}>
                {item.designation}
              </div>
            </div>
          </div>

          <div
            className="mt-5 flex h-10 w-10 items-center justify-center rounded-full"
            style={{ backgroundColor: "rgba(47,126,117,0.12)" }}
          >
            <MessageCircle className="h-4 w-4" style={{ color: palette.teal }} />
          </div>

          <p className="mt-4 text-[15px] leading-8" style={{ color: palette.ink }}>
            "{item.quote}"
          </p>
        </div>
      </DepthCard>
    </div>
  );
}

export default function AlamPortfolio({
  content = defaultPortfolioContent,
  onDownloadCv,
  isDownloadingCv = false,
  adminHref = "#/admin",
  showAdminEntry = false,
}) {
  const mergedContent = useMemo(() => mergePortfolioContent(content), [content]);
  const {
    profile,
    sectionCopy,
    services,
    skills,
    projects,
    achievements,
    competitions,
    achievementGallery,
    certificates,
    references,
    onlineProfiles,
    experience,
  } = mergedContent;
  const [activeFilter, setActiveFilter] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [focusWordIndex, setFocusWordIndex] = useState(0);
  const [splashWordIndex, setSplashWordIndex] = useState(0);
  const [showWelcomeSplash, setShowWelcomeSplash] = useState(true);
  const phoneDisplay = useMemo(() => formatPhoneDisplay(profile.phone), [profile.phone]);
  const whatsappHref = useMemo(() => getWhatsAppHref(profile.phone), [profile.phone]);
  const locationDisplay = useMemo(() => formatLocationDisplay(profile.location), [profile.location]);
  const headerRoleText = useMemo(
    () =>
      String(profile.role || "")
        .split("|")
        .map((part) => part.trim())
        .filter(Boolean)
        .join(" | "),
    [profile.role],
  );
  const heroLoopWords = useMemo(
    () =>
      Array.isArray(sectionCopy.heroLoopWords) && sectionCopy.heroLoopWords.length
        ? sectionCopy.heroLoopWords.filter(Boolean)
        : fallbackFocusWords,
    [sectionCopy.heroLoopWords],
  );
  const splashWords = useMemo(() => {
    const incomingWords =
      Array.isArray(sectionCopy.welcomeWords) && sectionCopy.welcomeWords.length
        ? sectionCopy.welcomeWords.map((word) => String(word).trim()).filter(Boolean)
        : fallbackWelcomeWords;
    const finalWord = String(sectionCopy.welcomeTitle || "").trim();

    if (finalWord && incomingWords[incomingWords.length - 1] !== finalWord) {
      return [...incomingWords, finalWord];
    }

    return incomingWords;
  }, [sectionCopy.welcomeTitle, sectionCopy.welcomeWords]);
  const currentFocusWord = heroLoopWords[focusWordIndex] || heroLoopWords[0] || fallbackFocusWords[0];
  const currentSplashWord = splashWords[splashWordIndex] || splashWords[0] || fallbackWelcomeWords[0];
  const visibleAchievementGallery = useMemo(
    () => achievementGallery.filter((item) => item?.image),
    [achievementGallery],
  );
  const visibleCertificates = useMemo(
    () => certificates.filter((item) => item?.image),
    [certificates],
  );
  const visibleReferences = useMemo(
    () =>
      references.filter(
        (item) =>
          item &&
          (item.name || item.designation || item.quote || item.image) &&
          item.name &&
          item.designation &&
          item.quote &&
          item.image,
      ),
    [references],
  );
  const scrollingReferences = useMemo(
    () => (visibleReferences.length > 1 ? [...visibleReferences, ...visibleReferences] : visibleReferences),
    [visibleReferences],
  );
  const sortedExperience = useMemo(
    () =>
      experience
        .map((item, index) => ({ item, index }))
        .sort((left, right) => {
          const leftDate = getExperienceSortDate(left.item);
          const rightDate = getExperienceSortDate(right.item);

          if (leftDate !== rightDate) {
            return rightDate - leftDate;
          }

          return left.index - right.index;
        })
        .map(({ item }) => item),
    [experience],
  );

  const visibleOnlineProfiles = useMemo(
    () =>
      (onlineProfiles || [])
        .filter((item) => item?.href && (item?.platform || item?.name))
        .map((item) => ({
          ...item,
          platform: item.platform || item.title || "",
          name: item.name || profile.fullName || item.handle || item.title || "",
          handle:
            (item.handle || "").trim() &&
            (item.handle || "").trim().toLowerCase() !==
              (item.name || profile.fullName || item.title || "").trim().toLowerCase()
              ? item.handle
              : item.iconKey === "linkedin"
                ? "Professional profile"
                : formatLinkDisplay(item.href),
          icon: profileIcons[item.iconKey] || Globe,
        })),
    [onlineProfiles, profile.fullName],
  );

  const contactMethods = useMemo(
    () =>
      [
        {
          id: "whatsapp",
          label: "WhatsApp",
          value: phoneDisplay,
          href: whatsappHref,
          icon: MessageCircle,
          accent: palette.teal,
        },
        {
          id: "email",
          label: "Email",
          value: profile.email,
          href: `mailto:${profile.email}`,
          icon: Mail,
          accent: palette.coral,
        },
        {
          id: "github",
          label: "GitHub",
          value: getGithubDisplay(profile.github),
          href: profile.github,
          icon: GithubIcon,
          accent: palette.ink,
        },
        {
          id: "linkedin",
          label: "LinkedIn",
          value: getLinkedinDisplay(profile.linkedin, profile.fullName),
          href: profile.linkedin,
          icon: LinkedinIcon,
          accent: "#0A66C2",
        },
        {
          id: "location",
          label: "Location",
          value: locationDisplay,
          href: "",
          icon: MapPin,
          accent: palette.mustard,
        },
      ].filter((item) => item.value),
    [phoneDisplay, whatsappHref, profile.email, profile.github, profile.linkedin, locationDisplay],
  );

  const filters = useMemo(
    () => ["All", ...new Set(projects.map((project) => project.category).filter(Boolean))],
    [projects],
  );

  const visibleProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter, projects]);

  useEffect(() => {
    if (!heroLoopWords.length) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setFocusWordIndex((current) => (current + 1) % heroLoopWords.length);
    }, 2200);

    return () => window.clearInterval(intervalId);
  }, [heroLoopWords]);

  useEffect(() => {
    if (!showWelcomeSplash) {
      return undefined;
    }

    if (!splashWords.length) {
      setShowWelcomeSplash(false);
      return undefined;
    }

    setSplashWordIndex(0);

    const timeoutIds = [];
    let elapsed = 0;

    for (let index = 1; index < splashWords.length; index += 1) {
      const previousWord = splashWords[index - 1] || "";
      const wordDuration = Math.max(280, previousWord.length * 46);
      elapsed += wordDuration;
      timeoutIds.push(
        window.setTimeout(() => {
          setSplashWordIndex(index);
        }, elapsed),
      );
    }

    const finalWord = splashWords[splashWords.length - 1] || "";
    const finalHold = Math.max(820, finalWord.length * 72);
    timeoutIds.push(
      window.setTimeout(() => {
        setShowWelcomeSplash(false);
      }, elapsed + finalHold),
    );

    return () => {
      timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, [showWelcomeSplash, splashWords]);

  return (
    <div
      className="relative min-h-screen overflow-hidden px-4 py-4 md:px-8 md:py-8"
      style={{
        background:
          "linear-gradient(140deg, #f8b359 0%, #ef8356 24%, #f6efe5 52%, #a4c8ff 76%, #b7a6ff 100%)",
        scrollBehavior: "smooth",
        fontFamily: '"Manrope", "Segoe UI", sans-serif',
      }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -24, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[-8%] top-[-5%] h-[360px] w-[360px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.52) 0%, rgba(255,255,255,0) 72%)" }}
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 32, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[-6%] top-[14%] h-[420px] w-[420px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(47,126,117,0.20) 0%, rgba(255,255,255,0) 70%)" }}
        />
        <motion.div
          animate={{ x: [0, 24, 0], y: [0, 18, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] left-[18%] h-[300px] w-[300px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(241,200,76,0.28) 0%, rgba(255,255,255,0) 70%)" }}
        />
      </div>
      <AnimatePresence>
        {showWelcomeSplash ? (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(12px)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-[#050505] px-6"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{ background: "radial-gradient(circle at center, rgba(255,255,255,0.08) 0%, rgba(5,5,5,0) 44%)" }}
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSplashWord}
                initial={{ opacity: 0, y: 20, scale: 0.94, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -18, scale: 1.04, filter: "blur(10px)" }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                className="relative text-center text-[54px] font-black leading-none tracking-[-0.08em] text-[#F4EEE3] sm:text-[76px] md:text-[92px]"
                style={{ fontFamily: '"Space Grotesk", "Manrope", sans-serif' }}
              >
                {currentSplashWord}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <div
        className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[32px] border shadow-[0_34px_80px_rgba(15,23,42,0.18)]"
        style={{ background: "linear-gradient(180deg, rgba(251,244,234,0.98) 0%, rgba(255,250,244,0.95) 54%, rgba(243,248,255,0.96) 100%)", borderColor: "rgba(255,255,255,0.55)" }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-70" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(23,56,74,0.06) 1px, transparent 0)", backgroundSize: "18px 18px", maskImage: "linear-gradient(180deg, rgba(0,0,0,0.22), rgba(0,0,0,0))" }} />
        <header className="sticky top-0 z-40 border-b px-6 py-5 backdrop-blur md:px-10 lg:px-14" style={{ backgroundColor: "rgba(255,249,242,0.88)", borderColor: palette.line }}>
          <div className="flex flex-wrap items-start justify-between gap-x-5 gap-y-4">
            <div className="min-w-[170px] flex-none sm:min-w-[210px] lg:min-w-[230px] xl:max-w-[320px]">
              <div className="text-[30px] italic leading-none" style={{ color: palette.ink, fontFamily: "cursive" }}>{profile.name}</div>
              <div
                className="mt-1 max-w-[260px] text-xs leading-5 whitespace-normal"
                style={{ color: palette.text }}
              >
                {headerRoleText || profile.role}
              </div>
            </div>

            <nav className="order-3 hidden basis-full items-center justify-center gap-4 pt-1 md:flex md:flex-wrap lg:gap-6 xl:gap-8">
              <motion.a
                href="#services"
                whileHover={{
                  y: -2,
                  scale: 1.03,
                  backgroundColor: palette.teal,
                  color: "#FFFFFF",
                  borderColor: palette.teal,
                  boxShadow: "0 12px 24px rgba(47,126,117,0.24)",
                }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="rounded-full border px-4 py-[6px] text-[11px] font-semibold uppercase tracking-[0.16em] transition-all duration-200"
                style={{ color: palette.teal, borderColor: "#8AB7AF" }}
              >
                Services
              </motion.a>
              <NavLink href="#works">Projects</NavLink>
              <NavLink href="#experience">Experience</NavLink>
              {visibleReferences.length ? <NavLink href="#references">References</NavLink> : null}
              <NavLink href="#profiles">Profiles</NavLink>
              <NavLink href="#contact">Contact</NavLink>
              {showAdminEntry ? (
                <motion.a
                  href={adminHref}
                  whileHover={{
                    y: -2,
                    scale: 1.03,
                    backgroundColor: "rgba(231,121,78,0.14)",
                    color: palette.coral,
                    borderColor: "rgba(231,121,78,0.26)",
                    boxShadow: "0 12px 24px rgba(231,121,78,0.16)",
                  }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] transition-all duration-200"
                  style={{ color: palette.ink, borderColor: palette.line }}
                >
                  Owner Login
                </motion.a>
              ) : null}
            </nav>

            <div className="order-2 hidden items-center gap-3 md:flex">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-white px-5 py-2 text-[13px] font-semibold whitespace-nowrap shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(47,126,117,0.18)]"
                style={{ color: "#2E3740" }}
              >
                {phoneDisplay}
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(47,126,117,0.18)]"
              >
                <MessageCircle className="h-4 w-4" style={{ color: palette.teal }} />
              </a>
            </div>

            <button onClick={() => setMenuOpen((v) => !v)} className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm md:hidden" aria-label="Toggle menu">
              {menuOpen ? <X className="h-5 w-5" style={{ color: "#2E3740" }} /> : <Menu className="h-5 w-5" style={{ color: "#2E3740" }} />}
            </button>
          </div>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden md:hidden"
              >
                <div className="flex flex-col gap-4 pt-5">
                  <NavLink href="#services" onClick={() => setMenuOpen(false)}>Services</NavLink>
                  <NavLink href="#works" onClick={() => setMenuOpen(false)}>Projects</NavLink>
                  <NavLink href="#experience" onClick={() => setMenuOpen(false)}>Experience</NavLink>
                  {visibleReferences.length ? <NavLink href="#references" onClick={() => setMenuOpen(false)}>References</NavLink> : null}
                  <NavLink href="#profiles" onClick={() => setMenuOpen(false)}>Profiles</NavLink>
                  <NavLink href="#contact" onClick={() => setMenuOpen(false)}>Contact</NavLink>
                  {showAdminEntry ? <NavLink href={adminHref} onClick={() => setMenuOpen(false)}>Owner Login</NavLink> : null}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        <main>
          <motion.section
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
            className="px-6 pb-4 pt-8 md:px-10 lg:px-14 lg:pt-10"
          >
            <div className="grid items-start gap-8 lg:grid-cols-[1fr_1.05fr_0.78fr]">
              <motion.div variants={fadeUp} className="order-1 pt-6 lg:pt-12">
                <div className="inline-flex rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em]" style={{ backgroundColor: palette.warm, color: palette.teal }}>
                  {sectionCopy.heroBadge}
                </div>
                <h1 className="mt-6 text-[56px] font-black leading-[0.94] tracking-[-0.05em] sm:text-[72px] lg:text-[82px]" style={{ color: palette.ink, fontFamily: '"Space Grotesk", "Manrope", sans-serif' }}>
                  {profile.heroFirst}
                  <br />
                  {profile.heroLast}
                </h1>
                <p className="mt-8 max-w-[440px] text-[18px] leading-[1.9]" style={{ color: "#3E4A53" }}>{profile.subtitle}</p>
                <a
                  href={`mailto:${profile.email}`}
                  className="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold underline underline-offset-4 break-all"
                  style={{ color: palette.coral }}
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  <span>{profile.email}</span>
                </a>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a href="#works" className="rounded-full px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5" style={{ backgroundColor: palette.teal }}>
                    {sectionCopy.heroPrimaryButton}
                  </a>
                  <a href="#contact" className="rounded-full border px-5 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5" style={{ borderColor: palette.line, color: palette.ink }}>
                    {sectionCopy.heroSecondaryButton}
                  </a>
                  <button
                    type="button"
                    onClick={onDownloadCv}
                    disabled={!profile.cvUrl || isDownloadingCv}
                    className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition-transform enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                    style={{ backgroundColor: palette.coral }}
                  >
                    {isDownloadingCv ? "Downloading..." : profile.cvUrl ? sectionCopy.contactDownloadLabel : "Upload CV in Admin"}
                  </button>
                  <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5" style={{ borderColor: palette.line, color: palette.ink }}>
                    {sectionCopy.heroGithubButton} <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
                <div className="mt-12 grid max-w-[360px] grid-cols-3 gap-3">
                  <div className="relative overflow-hidden rounded-[18px] border p-4 shadow-[0_18px_34px_rgba(15,23,42,0.08)]" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(239,234,224,0.95) 100%)", borderColor: "rgba(255,255,255,0.55)" }}>
                    <div className="pointer-events-none absolute right-[-14px] top-[-14px] h-12 w-12 rounded-full blur-2xl" style={{ backgroundColor: "rgba(241,200,76,0.4)" }} />
                    <div className="text-2xl font-black" style={{ color: palette.ink }}>{String(projects.length).padStart(2, "0")}</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.14em]" style={{ color: palette.text }}>{sectionCopy.heroProjectsLabel}</div>
                  </div>
                  <div className="relative overflow-hidden rounded-[18px] border p-4 shadow-[0_18px_34px_rgba(15,23,42,0.08)]" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(239,234,224,0.95) 100%)", borderColor: "rgba(255,255,255,0.55)" }}>
                    <div className="pointer-events-none absolute right-[-14px] top-[-14px] h-12 w-12 rounded-full blur-2xl" style={{ backgroundColor: "rgba(47,126,117,0.28)" }} />
                    <div className="text-2xl font-black" style={{ color: palette.ink }}>{String(visibleOnlineProfiles.length).padStart(2, "0")}</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.14em]" style={{ color: palette.text }}>{sectionCopy.heroProfilesLabel}</div>
                  </div>
                  <div className="relative overflow-hidden rounded-[18px] border p-4 shadow-[0_18px_34px_rgba(15,23,42,0.08)]" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(239,234,224,0.95) 100%)", borderColor: "rgba(255,255,255,0.55)" }}>
                    <div className="pointer-events-none absolute right-[-14px] top-[-14px] h-12 w-12 rounded-full blur-2xl" style={{ backgroundColor: "rgba(179,136,235,0.32)" }} />
                    <div className="text-2xl font-black" style={{ color: palette.ink }}>AI</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.14em]" style={{ color: palette.text }}>{sectionCopy.heroMajorLabel}</div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="order-2 relative mx-auto flex h-[600px] w-full max-w-[560px] items-center justify-center overflow-visible">
                <div className="pointer-events-none absolute inset-x-10 bottom-12 h-24 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(15,23,42,0.16) 0%, rgba(15,23,42,0) 72%)" }} />
                <motion.div
                  animate={{ y: [0, -8, 0], rotate: [-8, -6, -8] }}
                  transition={{ duration: 7.4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute left-[10%] top-[10%] h-[470px] w-[360px] rounded-[50px] border backdrop-blur-md"
                  style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 100%)",
                    borderColor: "rgba(255,255,255,0.28)",
                    boxShadow: "0 26px 50px rgba(15,23,42,0.08)",
                  }}
                />
                <motion.div
                  animate={{ y: [0, 10, 0], rotate: [7, 5, 7] }}
                  transition={{ duration: 8.2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute right-[11%] top-[18%] h-[440px] w-[340px] rounded-[48px] border backdrop-blur-sm"
                  style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.06) 100%)",
                    borderColor: "rgba(255,255,255,0.24)",
                    boxShadow: "0 22px 44px rgba(15,23,42,0.06)",
                  }}
                />
                <div className="pointer-events-none absolute left-[18%] top-[7%] h-[190px] w-[190px] rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(241,200,76,0.30) 0%, rgba(255,255,255,0) 72%)" }} />
                <div className="pointer-events-none absolute right-[14%] top-[20%] h-[220px] w-[220px] rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(47,126,117,0.24) 0%, rgba(255,255,255,0) 72%)" }} />

                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10"
                >
                  <div
                    className="relative h-[500px] w-[350px] rounded-[44px] border p-3 shadow-[0_34px_58px_rgba(15,23,42,0.18)]"
                    style={{
                      background: "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(244,238,230,0.94) 100%)",
                      borderColor: "rgba(255,255,255,0.65)",
                    }}
                  >
                    <div className="pointer-events-none absolute inset-[10px] rounded-[36px] border" style={{ borderColor: "rgba(23,56,74,0.08)" }} />
                    <div className="relative h-full overflow-hidden rounded-[34px] border-[6px] border-white/90 bg-[#f4ede3] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                      <div className="absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-white/30 to-transparent" />
                      <img
                        src={profile.profileImage}
                        alt={profile.fullName}
                        width="819"
                        height="1024"
                        fetchPriority="high"
                        decoding="async"
                        className="h-full w-full scale-[1.02] object-cover object-top"
                      />
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div variants={fadeUp} className="order-3 pt-4 lg:pt-16">
                <p className="max-w-[280px] text-[18px] leading-[1.95]" style={{ color: "#2D3942" }}>{profile.intro}</p>
                <DepthCard
                  className="mt-12 rounded-[28px]"
                  glow="radial-gradient(circle at 80% 10%, rgba(241,200,76,0.28), rgba(255,255,255,0))"
                  plate="rgba(255,255,255,0.34)"
                  shadow="rgba(15,23,42,0.14)"
                  surfaceClassName="bg-[linear-gradient(180deg,rgba(248,242,232,0.96)_0%,rgba(242,231,214,0.94)_100%)] p-3"
                >
                  <div className="flex justify-end">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: palette.orange }} />
                  </div>

                  <div
                    className="mt-2 rounded-[20px] px-5 py-4"
                    style={{ background: "linear-gradient(180deg, rgba(255,250,244,0.98) 0%, rgba(240,228,210,0.96) 100%)" }}
                  >
                    <div className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: palette.text }}>
                      {sectionCopy.heroLoopLabel}
                    </div>
                    <div className="relative mt-2 h-[38px] overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentFocusWord}
                          initial={{ opacity: 0, y: 40 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -40 }}
                          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute inset-x-0 top-0 flex items-start"
                        >
                          <div
                            className="max-w-full text-[26px] font-black leading-none tracking-[-0.05em] sm:text-[30px]"
                            style={{ color: palette.ink, fontFamily: '"Space Grotesk", "Manrope", sans-serif' }}
                          >
                            {currentFocusWord}
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                    <div className="mt-2 border-t pt-3" style={{ borderColor: "rgba(23,56,74,0.08)" }}>
                    <div
                      className="text-[26px] font-black leading-[1.02] tracking-[-0.05em] sm:text-[30px]"
                      style={{ color: palette.ink, fontFamily: '"Space Grotesk", "Manrope", sans-serif' }}
                    >
                      {sectionCopy.heroCtaTitle}
                    </div>
                    <p className="mt-3 max-w-[240px] text-[14px] leading-7" style={{ color: "#4C5760" }}>
                      {sectionCopy.heroCtaBody}
                    </p>
                    <a
                      href="#contact"
                      className="mt-4 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_30px_rgba(47,126,117,0.22)] transition-transform hover:-translate-y-1"
                      style={{ backgroundColor: palette.teal }}
                    >
                      <Handshake className="h-4 w-4" />
                      {sectionCopy.heroCtaButton}
                    </a>
                    </div>
                  </div>
                </DepthCard>
              </motion.div>
            </div>
          </motion.section>

          <motion.section id="services" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={{ show: { transition: { staggerChildren: 0.08 } } }} className="px-6 py-16 md:px-10 lg:px-14 lg:py-20" style={{ background: "linear-gradient(135deg, #fffdf9 0%, #fff2dd 100%)" }}>
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="space-y-5">{services.map((item) => <ServiceCard key={item.id || item.title} item={item} />)}</div>
              <motion.div variants={fadeUp}>
                <SectionTitle title={sectionCopy.servicesTitle} sub={sectionCopy.servicesSub} />
                <p className="mt-7 max-w-[620px] text-[17px] leading-[2.05]" style={{ color: "#3E4A53" }}>
                  {sectionCopy.servicesBody}
                </p>
                <div className="mt-10 flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{
                        y: -3,
                        scale: 1.04,
                        backgroundColor: palette.teal,
                        color: "#FFFFFF",
                        boxShadow: "0 12px 24px rgba(47,126,117,0.22)",
                      }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="rounded-full border px-3 py-2 text-sm font-medium shadow-[0_4px_12px_rgba(0,0,0,0.03)]"
                      style={{ backgroundColor: palette.warm, color: palette.ink, borderColor: "rgba(23,56,74,0.06)" }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.section>

          <motion.section id="experience" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={{ show: { transition: { staggerChildren: 0.08 } } }} className="px-6 py-16 md:px-10 lg:px-14 lg:py-20" style={{ background: "linear-gradient(135deg, #fff0ea 0%, #fffaf3 100%)" }}>
            <SectionTitle title={sectionCopy.experienceTitle} sub={sectionCopy.experienceSub} center />
            <div className="mx-auto mt-14 max-w-[1120px] space-y-12">
              {sortedExperience.map((item, idx) => (
                <motion.div key={item.id || item.org} variants={fadeUp} className="relative overflow-hidden rounded-[30px] border bg-white/72 p-6 shadow-[0_24px_42px_rgba(15,23,42,0.08)] backdrop-blur-xl md:grid md:grid-cols-[0.9fr_44px_1.1fr] md:items-start md:gap-6" style={{ borderColor: "rgba(255,255,255,0.62)" }}>
                  <div className="pointer-events-none absolute right-6 top-4 h-24 w-24 rounded-full opacity-70 blur-3xl" style={{ backgroundColor: `${item.dot}35` }} />
                  <div className="text-left md:text-right">
                    <div className="text-[27px] font-bold tracking-[-0.03em]" style={{ color: palette.ink }}>{item.org}</div>
                    <div className="mt-2 text-[15px]" style={{ color: "#67727A" }}>{item.period}</div>
                  </div>
                  <div className="relative flex justify-center">
                    <div className="relative z-10 mt-2 h-[18px] w-[18px] rounded-full border-[5px]" style={{ backgroundColor: item.dot, borderColor: palette.warm }} />
                    {idx !== sortedExperience.length - 1 ? <div className="absolute top-6 h-[122px] w-px border-l border-dashed" style={{ borderColor: "#A4ADB3" }} /> : null}
                  </div>
                  <div>
                    <div className="text-[28px] font-bold tracking-[-0.03em]" style={{ color: palette.ink }}>{item.role}</div>
                    <p className="mt-3 max-w-[560px] text-[16px] leading-[2]" style={{ color: "#59626A" }}>{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section id="works" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={{ show: { transition: { staggerChildren: 0.08 } } }} className="px-6 py-16 md:px-10 lg:px-14 lg:py-20" style={{ background: "linear-gradient(135deg, #ffffff 0%, #eef8ff 100%)" }}>
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <SectionTitle title={sectionCopy.projectsTitle} sub={sectionCopy.projectsSub} />
              <a href="#profiles" className="inline-flex items-center gap-2 text-[14px] font-semibold" style={{ color: palette.coral }}>
                View profiles <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className="rounded-full px-4 py-2 text-sm font-semibold transition-transform hover:-translate-y-0.5"
                  style={{
                    backgroundColor: activeFilter === filter ? palette.teal : "white",
                    color: activeFilter === filter ? "white" : palette.ink,
                    border: `1px solid ${activeFilter === filter ? palette.teal : palette.line}`,
                  }}
                >
                  {filter}
                </button>
              ))}
            </div>
            {visibleProjects.length ? (
              <motion.div layout className="mt-10 grid gap-6 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {visibleProjects.map((project) => <ProjectCard key={project.id || project.title} project={project} />)}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div variants={fadeUp} className="mt-10 rounded-[22px] border border-dashed p-8 text-center" style={{ borderColor: palette.line, backgroundColor: "rgba(255,255,255,0.78)" }}>
                <div className="text-[22px] font-bold tracking-[-0.03em]" style={{ color: palette.ink }}>No projects in this category yet</div>
                <p className="mt-3 text-[15px] leading-7" style={{ color: palette.text }}>
                  Open the admin panel and add your next project. The portfolio now keeps space ready for future updates.
                </p>
              </motion.div>
            )}
          </motion.section>

          <motion.section initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={{ show: { transition: { staggerChildren: 0.08 } } }} className="px-6 py-16 md:px-10 lg:px-14 lg:py-20" style={{ background: "linear-gradient(135deg, #fff7ef 0%, #fff1ff 100%)" }}>
            <div className="grid gap-6 lg:grid-cols-2">
              <motion.div variants={fadeUp}>
                <SectionTitle title={sectionCopy.achievementsTitle} sub={sectionCopy.achievementsSub} />
                <div className="mt-8 space-y-4">
                  {achievements.map((item) => (
                    <div key={item} className="flex items-center gap-4 rounded-[14px] border bg-white p-5 shadow-[0_8px_20px_rgba(0,0,0,0.03)]" style={{ borderColor: palette.line }}>
                      <div className="flex h-11 w-11 items-center justify-center rounded-full" style={{ backgroundColor: palette.soft }}>
                        <Award className="h-5 w-5" style={{ color: palette.teal }} />
                      </div>
                      <div className="text-[16px] font-semibold" style={{ color: palette.ink }}>{item}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeUp}>
                <SectionTitle title={sectionCopy.competitionsTitle} sub={sectionCopy.competitionsSub} />
                <div className="mt-8 space-y-4">
                  {competitions.map((item) => (
                    <div key={item} className="rounded-[14px] border bg-white p-5 shadow-[0_8px_20px_rgba(0,0,0,0.03)] text-[16px] font-semibold" style={{ color: palette.ink, borderColor: palette.line }}>
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {visibleAchievementGallery.length || visibleCertificates.length ? (
              <div className={`mt-16 grid gap-8 ${visibleAchievementGallery.length && visibleCertificates.length ? "xl:grid-cols-2" : ""}`}>
                {visibleAchievementGallery.length ? (
                  <motion.div variants={fadeUp}>
                    <SectionTitle title={sectionCopy.achievementGalleryTitle} sub={sectionCopy.achievementGallerySub} />
                    <div className="mt-8 grid gap-6 md:grid-cols-2">
                      {visibleAchievementGallery.map((item) => (
                        <MediaCard
                          key={item.id || item.title}
                          item={item}
                          eyebrow="Achievement"
                          fallbackLabel="Achievement image"
                          metaLabel={item.subtitle}
                        />
                      ))}
                    </div>
                  </motion.div>
                ) : null}

                {visibleCertificates.length ? (
                  <motion.div variants={fadeUp}>
                    <SectionTitle title={sectionCopy.certificatesTitle} sub={sectionCopy.certificatesSub} />
                    <div className="mt-8 grid gap-6 md:grid-cols-2">
                      {visibleCertificates.map((item) => (
                        <MediaCard
                          key={item.id || item.title}
                          item={item}
                          eyebrow="Certificate"
                          fallbackLabel="Certificate image"
                          metaLabel={item.issuer}
                        />
                      ))}
                    </div>
                  </motion.div>
                ) : null}
              </div>
            ) : null}
          </motion.section>

          {visibleReferences.length ? (
            <motion.section
              id="references"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.12 }}
              variants={{ show: { transition: { staggerChildren: 0.08 } } }}
              className="overflow-hidden px-6 py-16 md:px-10 lg:px-14 lg:py-20"
              style={{ background: "linear-gradient(135deg, #fffdf8 0%, #eff7ff 100%)" }}
            >
              <motion.div variants={fadeUp} className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <SectionTitle title={sectionCopy.referencesTitle} sub={sectionCopy.referencesSub} />
                <div
                  className="inline-flex rounded-full px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.16em]"
                  style={{ color: palette.teal, backgroundColor: "rgba(47,126,117,0.1)" }}
                >
                  {String(visibleReferences.length).padStart(2, "0")} references
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="relative mt-10">
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#fffdf8] to-transparent md:w-24" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#eff7ff] to-transparent md:w-24" />

                <div className="overflow-hidden">
                  <motion.div
                    animate={
                      visibleReferences.length > 1
                        ? { x: ["0%", "-50%"] }
                        : undefined
                    }
                    transition={
                      visibleReferences.length > 1
                        ? {
                            duration: Math.max(28, visibleReferences.length * 8),
                            repeat: Infinity,
                            ease: "linear",
                          }
                        : undefined
                    }
                    className="flex w-max gap-6 pr-6"
                  >
                    {scrollingReferences.map((item, index) => (
                      <ReferenceCard key={`${item.id || item.name}-${index}`} item={item} />
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </motion.section>
          ) : null}

          <motion.section id="profiles" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.12 }} variants={{ show: { transition: { staggerChildren: 0.08 } } }} className="px-6 py-16 md:px-10 lg:px-14 lg:py-20" style={{ background: "linear-gradient(135deg, #fffdf8 0%, #f2ecff 100%)" }}>
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <SectionTitle title={sectionCopy.profilesTitle} sub={sectionCopy.profilesSub} />
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[14px] font-semibold" style={{ color: palette.coral }}>
                {sectionCopy.profilesCtaText} <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {visibleOnlineProfiles.map((item) => <OnlineProfileCard key={item.id || item.title} item={item} />)}
            </div>
          </motion.section>

          <motion.section id="contact" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={{ show: { transition: { staggerChildren: 0.08 } } }} className="px-6 py-16 md:px-10 lg:px-14 lg:py-20" style={{ background: "linear-gradient(135deg, #fff7f0 0%, #ffffff 100%)" }}>
            <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
              <motion.div variants={fadeUp}>
                <h2 className="text-[50px] font-black leading-[1.06] tracking-[-0.04em] sm:text-[62px]" style={{ color: palette.ink }}>
                  {sectionCopy.contactTitleLine1}
                  <br />
                  {sectionCopy.contactTitleLine2}
                </h2>
                <p className="mt-6 max-w-[520px] text-[16px] leading-8" style={{ color: palette.text }}>
                  {sectionCopy.contactBody}
                </p>
                <div className="mt-10 inline-flex items-center gap-4 rounded-[18px] border bg-white px-4 py-4 shadow-[0_8px_20px_rgba(0,0,0,0.03)]" style={{ borderColor: palette.line }}>
                  <div className="h-16 w-16 overflow-hidden rounded-[16px]" style={{ backgroundColor: palette.warm }}>
                    <img
                      src={profile.profileImage}
                      alt={profile.fullName}
                      width="819"
                      height="1024"
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: palette.text }}>{sectionCopy.basedInLabel}</div>
                    <div className="mt-1 text-[20px] font-bold tracking-[-0.03em]" style={{ color: palette.ink }}>{locationDisplay}</div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="grid gap-4">
                {profile.cvUrl ? (
                  <button
                    type="button"
                    onClick={onDownloadCv}
                    disabled={isDownloadingCv}
                  className="flex items-center justify-center gap-3 rounded-[14px] px-5 py-4 text-left text-white shadow-[0_10px_24px_rgba(0,0,0,0.08)] disabled:cursor-not-allowed disabled:opacity-60"
                  style={{ backgroundColor: palette.coral }}
                >
                  <ArrowUpRight className="h-4 w-4" />
                    <span>{isDownloadingCv ? "Downloading CV..." : sectionCopy.contactDownloadLabel}</span>
                  </button>
                ) : null}
                {contactMethods.map((item) => {
                  const Icon = item.icon;

                  if (item.href) {
                    return (
                      <a
                        key={item.id}
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                        className="group flex items-center justify-between gap-4 rounded-[18px] border bg-white/90 px-5 py-4 shadow-[0_10px_24px_rgba(0,0,0,0.035)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(23,56,74,0.08)]"
                        style={{ borderColor: palette.line }}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className="flex h-11 w-11 items-center justify-center rounded-full"
                            style={{ backgroundColor: `${item.accent}18` }}
                          >
                            <Icon className="h-4 w-4" style={{ color: item.accent }} />
                          </div>
                          <div>
                            <div className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: palette.text }}>
                              {item.label}
                            </div>
                            <div className="mt-1 text-[18px] font-semibold tracking-[-0.02em]" style={{ color: palette.ink }}>
                              {item.value}
                            </div>
                          </div>
                        </div>
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" style={{ color: palette.text }} />
                      </a>
                    );
                  }

                  return (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 rounded-[18px] border bg-white/90 px-5 py-4 shadow-[0_10px_24px_rgba(0,0,0,0.035)]"
                      style={{ borderColor: palette.line }}
                    >
                      <div
                        className="flex h-11 w-11 items-center justify-center rounded-full"
                        style={{ backgroundColor: `${item.accent}18` }}
                      >
                        <Icon className="h-4 w-4" style={{ color: item.accent }} />
                      </div>
                      <div>
                        <div className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: palette.text }}>
                          {item.label}
                        </div>
                        <div className="mt-1 text-[18px] font-semibold tracking-[-0.02em]" style={{ color: palette.ink }}>
                          {item.value}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </motion.section>
        </main>
      </div>
    </div>
  );
}
