import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertCircle,
  BadgeCheck,
  BriefcaseBusiness,
  CheckCircle2,
  FileText,
  FolderKanban,
  ImagePlus,
  LayoutDashboard,
  Link2,
  LoaderCircle,
  LogIn,
  LogOut,
  Milestone,
  Save,
  Sparkles,
  Trophy,
  Type,
  Upload,
  UserRound,
} from "lucide-react";
import { mergePortfolioContent } from "../AlamPortfolio.jsx";

function Field({ label, children, hint }) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</span>
      {children}
      {hint ? <span className="text-xs text-slate-400">{hint}</span> : null}
    </label>
  );
}

function TextInput(props) {
  return (
    <input
      {...props}
      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-400"
    />
  );
}

function TextArea(props) {
  return (
    <textarea
      {...props}
      className="min-h-[120px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-400"
    />
  );
}

function CardSection({ id, title, sub, children, action, icon: Icon, badge }) {
  return (
    <section id={id} className="scroll-mt-24 rounded-[32px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(248,250,252,0.92)_100%)] p-6 shadow-[0_22px_50px_rgba(15,23,42,0.08)] md:p-7">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-4">
          {Icon ? (
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-[0_12px_24px_rgba(15,23,42,0.14)]">
              <Icon className="h-5 w-5" />
            </div>
          ) : null}
          <div>
            {badge ? <div className="mb-2 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-700">{badge}</div> : null}
            <h2 className="text-2xl font-black tracking-[-0.03em] text-slate-900">{title}</h2>
            {sub ? <p className="mt-1 max-w-2xl text-sm leading-7 text-slate-500">{sub}</p> : null}
          </div>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function FieldGroup({ title, sub, children, columns = "lg:grid-cols-2", tone = "default" }) {
  const toneClass =
    tone === "warm"
      ? "border-amber-200/70 bg-[linear-gradient(180deg,rgba(255,251,235,0.9)_0%,rgba(255,255,255,0.95)_100%)]"
      : tone === "cool"
        ? "border-sky-200/70 bg-[linear-gradient(180deg,rgba(239,246,255,0.9)_0%,rgba(255,255,255,0.95)_100%)]"
        : "border-slate-200/80 bg-white/80";

  return (
    <div className={`rounded-[26px] border p-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)] ${toneClass}`}>
      <div className="mb-5">
        <h3 className="text-lg font-bold tracking-[-0.03em] text-slate-900">{title}</h3>
        {sub ? <p className="mt-1 text-sm leading-7 text-slate-500">{sub}</p> : null}
      </div>
      <div className={`grid gap-4 ${columns}`}>{children}</div>
    </div>
  );
}

function MetricCard({ icon: Icon, label, value, hint, accent }) {
  return (
    <div className="rounded-[24px] border border-white/70 bg-white/90 p-4 shadow-[0_16px_34px_rgba(15,23,42,0.06)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</div>
          <div className="mt-2 text-3xl font-black tracking-[-0.05em] text-slate-900">{value}</div>
          <div className="mt-1 text-sm text-slate-500">{hint}</div>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl" style={{ backgroundColor: accent }}>
          <Icon className="h-5 w-5 text-white" />
        </div>
      </div>
    </div>
  );
}

function UploadField({ label, description, accept, onChange, statusText, preview, buttonLabel = "Choose file", multiple = false }) {
  return (
    <label className="block cursor-pointer rounded-[24px] border border-dashed border-slate-300 bg-slate-50/80 p-5 transition hover:border-slate-400 hover:bg-white">
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(event) => {
          const files = Array.from(event.target.files || []);
          if (multiple) {
            if (files.length) onChange(files);
          } else {
            const file = files[0];
            if (file) onChange(file);
          }
          event.target.value = "";
        }}
      />
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-slate-900">{label}</div>
            {description ? <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p> : null}
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white">
            <Upload className="h-3.5 w-3.5" />
            {buttonLabel}
          </div>
        </div>
        {preview}
        <div className="inline-flex w-fit rounded-full bg-white px-4 py-2 text-xs font-medium text-slate-500 shadow-sm">
          {statusText}
        </div>
      </div>
    </label>
  );
}

function ImagePreview({ src, label }) {
  return (
    <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white">
      {src ? (
        <img src={src} alt={label} className="h-44 w-full object-cover object-center" />
      ) : (
        <div className="flex h-44 items-center justify-center bg-slate-50 text-sm text-slate-400">
          {label}
        </div>
      )}
    </div>
  );
}

function ItemEditorCard({ eyebrow, title, sub, children, onRemove, removeLabel }) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_16px_34px_rgba(15,23,42,0.04)]">
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          {eyebrow ? <div className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">{eyebrow}</div> : null}
          <div className="mt-3 text-xl font-bold tracking-[-0.03em] text-slate-900">{title}</div>
          {sub ? <p className="mt-1 text-sm leading-6 text-slate-500">{sub}</p> : null}
        </div>
        {onRemove ? (
          <button type="button" onClick={onRemove} className="rounded-full border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-600">
            {removeLabel}
          </button>
        ) : null}
      </div>
      {children}
    </div>
  );
}

function getSortableDateValue(value = "") {
  const parsedDate = Date.parse(value);
  return Number.isFinite(parsedDate) ? parsedDate : Number.NEGATIVE_INFINITY;
}

function createId(prefix) {
  return `${prefix}-${crypto.randomUUID()}`;
}

function getProjectMediaType(file) {
  if (file?.type?.startsWith("video/")) {
    return "video";
  }

  return "image";
}

function downloadJsonFile(data, fileName) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export default function PortfolioAdmin({
  content,
  isConfigured,
  user,
  status,
  syncMessage,
  isSaving,
  uploadingTarget,
  uploadProvider,
  onSignIn,
  onSignOut,
  onSave,
  onUploadAsset,
  serviceIconOptions,
}) {
  const [draft, setDraft] = useState(() => mergePortfolioContent(content));
  const [pendingWelcomeWord, setPendingWelcomeWord] = useState("");
  const [pendingHeroWord, setPendingHeroWord] = useState("");
  const [pendingSkill, setPendingSkill] = useState("");
  const [pendingAchievement, setPendingAchievement] = useState("");
  const [pendingCompetition, setPendingCompetition] = useState("");
  const [pendingProjectTech, setPendingProjectTech] = useState({});
  const welcomeWordInputRef = useRef(null);
  const heroWordInputRef = useRef(null);
  const skillInputRef = useRef(null);
  const achievementInputRef = useRef(null);
  const competitionInputRef = useRef(null);
  const projectTechInputRefs = useRef({});
  const latestDraftRef = useRef(mergePortfolioContent(content));

  useEffect(() => {
    const normalized = mergePortfolioContent(content);
    latestDraftRef.current = normalized;
    setDraft(normalized);
  }, [content]);

  const updateDraft = (updater) => {
    let nextDraft;

    setDraft((current) => {
      const normalizedCurrent = mergePortfolioContent(current);
      const updated =
        typeof updater === "function" ? updater(normalizedCurrent) : updater;
      nextDraft = mergePortfolioContent(updated);
      latestDraftRef.current = nextDraft;
      return nextDraft;
    });

    return nextDraft;
  };

  const setProfileField = (field, value) =>
    updateDraft((current) => ({
      ...current,
      profile: { ...current.profile, [field]: value },
    }));

  const setSectionField = (field, value) =>
    updateDraft((current) => ({
      ...current,
      sectionCopy: { ...current.sectionCopy, [field]: value },
    }));

  const updateSectionArrayItem = (field, index, value) =>
    updateDraft((current) => ({
      ...current,
      sectionCopy: {
        ...current.sectionCopy,
        [field]: (current.sectionCopy?.[field] || []).map((item, itemIndex) =>
          itemIndex === index ? value : item,
        ),
      },
    }));

  const addSectionArrayItem = (field, value = "New Word") =>
    updateDraft((current) => ({
      ...current,
      sectionCopy: {
        ...current.sectionCopy,
        [field]: [...(current.sectionCopy?.[field] || []), value],
      },
    }));

  const removeSectionArrayItem = (field, index) =>
    updateDraft((current) => ({
      ...current,
      sectionCopy: {
        ...current.sectionCopy,
        [field]: (current.sectionCopy?.[field] || []).filter((_, itemIndex) => itemIndex !== index),
      },
    }));

  const updateSimpleArrayItem = (key, index, value) =>
    updateDraft((current) => ({
      ...current,
      [key]: (current[key] || []).map((item, itemIndex) => (itemIndex === index ? value : item)),
    }));

  const addSimpleArrayItem = (key, value) =>
    updateDraft((current) => ({
      ...current,
      [key]: [...(current[key] || []), value],
    }));

  const removeSimpleArrayItem = (key, index) =>
    updateDraft((current) => ({
      ...current,
      [key]: (current[key] || []).filter((_, itemIndex) => itemIndex !== index),
    }));

  const commitWelcomeWord = () => {
    const nextWord = pendingWelcomeWord.trim();

    if (!nextWord) {
      welcomeWordInputRef.current?.focus();
      return;
    }

    addSectionArrayItem("welcomeWords", nextWord);
    setPendingWelcomeWord("");
    window.requestAnimationFrame(() => {
      welcomeWordInputRef.current?.focus();
    });
  };

  const commitHeroWord = () => {
    const nextWord = pendingHeroWord.trim();

    if (!nextWord) {
      heroWordInputRef.current?.focus();
      return;
    }

    addSectionArrayItem("heroLoopWords", nextWord);
    setPendingHeroWord("");
    window.requestAnimationFrame(() => {
      heroWordInputRef.current?.focus();
    });
  };

  const commitSkill = () => {
    const nextSkill = pendingSkill.trim();

    if (!nextSkill) {
      skillInputRef.current?.focus();
      return;
    }

    addSimpleArrayItem("skills", nextSkill);
    setPendingSkill("");
    window.requestAnimationFrame(() => {
      skillInputRef.current?.focus();
    });
  };

  const commitSimpleListItem = (key, value, setValue, inputRef) => {
    const nextItem = value.trim();

    if (!nextItem) {
      inputRef.current?.focus();
      return;
    }

    addSimpleArrayItem(key, nextItem);
    setValue("");
    window.requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  const updateObjectArray = (key, id, field, value) =>
    updateDraft((current) => ({
      ...current,
      [key]: current[key].map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    }));

  const setProjectTechInputRef = (projectId) => (node) => {
    if (node) {
      projectTechInputRefs.current[projectId] = node;
      return;
    }

    delete projectTechInputRefs.current[projectId];
  };

  const commitProjectTech = (projectId) => {
    const nextTech = String(pendingProjectTech[projectId] || "").trim();

    if (!nextTech) {
      projectTechInputRefs.current[projectId]?.focus();
      return;
    }

    updateDraft((current) => ({
      ...current,
      projects: current.projects.map((item) => {
        if (item.id !== projectId) {
          return item;
        }

        const existingTech = Array.isArray(item.tech) ? item.tech : [];

        if (existingTech.includes(nextTech)) {
          return item;
        }

        return {
          ...item,
          tech: [...existingTech, nextTech],
        };
      }),
    }));

    setPendingProjectTech((current) => ({
      ...current,
      [projectId]: "",
    }));

    window.requestAnimationFrame(() => {
      projectTechInputRefs.current[projectId]?.focus();
    });
  };

  const updateProjectTechItem = (projectId, techIndex, value) =>
    updateDraft((current) => ({
      ...current,
      projects: current.projects.map((item) =>
        item.id === projectId
          ? {
              ...item,
              tech: (item.tech || []).map((techItem, index) =>
                index === techIndex ? value : techItem,
              ),
            }
          : item,
      ),
    }));

  const removeProjectTechItem = (projectId, techIndex) =>
    updateDraft((current) => ({
      ...current,
      projects: current.projects.map((item) =>
        item.id === projectId
          ? {
              ...item,
              tech: (item.tech || []).filter((_, index) => index !== techIndex),
            }
          : item,
      ),
    }));

  const addService = () =>
    updateDraft((current) => ({
      ...current,
      services: [
        ...current.services,
        {
          id: createId("service"),
          title: "New Service",
          sub: "Describe this service",
          iconKey: "code",
          color: "#2F7E75",
        },
      ],
    }));

  const addProject = () =>
    updateDraft((current) => ({
      ...current,
      projects: [
        ...current.projects,
        {
          id: createId("project"),
          title: "New Project",
          category: "Web",
          description: "Describe what this project does.",
          role: "Your role in this project",
          impact: "Describe the impact or goal of this project.",
          outcome: "Describe the impact or goal of this project.",
          tech: ["React", "Firebase"],
          accent: "#F1C84C",
          image: "",
          media: [],
          link: "",
        },
      ],
    }));

  const addExperience = () =>
    updateDraft((current) => ({
      ...current,
      experience: [
        ...current.experience,
        {
          id: createId("experience"),
          org: "New Organization",
          period: "Role or date",
          role: "Position title",
          text: "Describe what you did here.",
          dot: "#2F7E75",
          sortDate: "",
        },
      ],
    }));

  const addAchievementMedia = () =>
    updateDraft((current) => ({
      ...current,
      achievementGallery: [
        ...(current.achievementGallery || []),
        {
          id: createId("achievement"),
          title: "Achievement Photo",
          subtitle: "Add a photo description",
          image: "",
          link: "",
        },
      ],
    }));

  const addCertificate = () =>
    updateDraft((current) => ({
      ...current,
      certificates: [
        ...(current.certificates || []),
        {
          id: createId("certificate"),
          title: "Certificate",
          issuer: "Add issuer or event name",
          image: "",
          link: "",
        },
      ],
    }));

  const addReference = () =>
    updateDraft((current) => ({
      ...current,
      references: [
        ...(current.references || []),
        {
          id: createId("reference"),
          name: "Reference Name",
          designation: "Role, organization",
          quote: "Add the quotation or recommendation here.",
          image: "",
        },
      ],
    }));

  const removeItem = (key, id) =>
    updateDraft((current) => ({
      ...current,
      [key]: current[key].filter((item) => item.id !== id),
    }));

  const handleUpload = async (kind, file, itemId) => {
    const url = await onUploadAsset(kind, file, itemId);
    if (!url) return;

    const nextDraft = updateDraft((current) => {
      if (kind === "profileImage") {
        return {
          ...current,
          profile: {
            ...current.profile,
            profileImage: url,
          },
        };
      }

      if (kind === "cv") {
        return {
          ...current,
          profile: {
            ...current.profile,
            cvUrl: url,
            cvFileName: file.name,
          },
        };
      }

      if (kind === "projectImage") {
        return {
          ...current,
          projects: current.projects.map((item) =>
            item.id === itemId ? { ...item, image: url } : item,
          ),
        };
      }

      if (kind === "achievementImage") {
        return {
          ...current,
          achievementGallery: current.achievementGallery.map((item) =>
            item.id === itemId ? { ...item, image: url } : item,
          ),
        };
      }

      if (kind === "certificateImage") {
        return {
          ...current,
          certificates: current.certificates.map((item) =>
            item.id === itemId ? { ...item, image: url } : item,
          ),
        };
      }

      if (kind === "referenceImage") {
        return {
          ...current,
          references: (current.references || []).map((item) =>
            item.id === itemId ? { ...item, image: url } : item,
          ),
        };
      }

      return current;
    });

    if (nextDraft) {
      await onSave(nextDraft);
    }
  };

  const handleProjectMediaUpload = async (files, projectId) => {
    const fileList = Array.isArray(files) ? files : [files];
    let nextDraft = null;

    for (const file of fileList) {
      const url = await onUploadAsset("projectMedia", file, projectId);

      if (!url) {
        continue;
      }

      nextDraft = updateDraft((current) => ({
        ...current,
        projects: current.projects.map((item) => {
          if (item.id !== projectId) {
            return item;
          }

          const existingMedia = Array.isArray(item.media) ? item.media : [];
          const nextMedia = [
            ...existingMedia,
            {
              id: createId("project-media"),
              url,
              type: getProjectMediaType(file),
            },
          ];

          return {
            ...item,
            image: nextMedia[0]?.url || item.image || "",
            media: nextMedia,
          };
        }),
      }));
    }

    if (nextDraft) {
      await onSave(nextDraft);
    }
  };

  const removeProjectMediaItem = async (projectId, mediaId) => {
    const nextDraft = updateDraft((current) => ({
      ...current,
      projects: current.projects.map((item) => {
        if (item.id !== projectId) {
          return item;
        }

        const nextMedia = (item.media || []).filter((mediaItem) => mediaItem.id !== mediaId);

        return {
          ...item,
          image: nextMedia[0]?.url || "",
          media: nextMedia,
        };
      }),
    }));

    if (nextDraft) {
      await onSave(nextDraft);
    }
  };

  const handleExportBackup = () => {
    downloadJsonFile(
      {
        ...latestDraftRef.current,
        exportedAt: new Date().toISOString(),
      },
      "portfolio-backup.json",
    );
  };

  const handleImportBackup = async (file) => {
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      const normalized = mergePortfolioContent(parsed);
      latestDraftRef.current = normalized;
      setDraft(normalized);
    } catch {
      // Keep the UI simple here; App status area already communicates save/sync issues.
      alert("That file is not a valid portfolio JSON backup.");
    }
  };

  const scrollToEditorSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const editorSections = useMemo(
    () => [
      { id: "admin-overview", title: "Overview", note: "Status and quick actions", icon: LayoutDashboard },
      { id: "admin-profile", title: "Profile", note: "Bio, links, and files", icon: UserRound },
      { id: "admin-copy", title: "Section Copy", note: "Headings and button text", icon: Type },
      { id: "admin-services", title: "Services", note: `${draft.services.length} service cards`, icon: BriefcaseBusiness },
      { id: "admin-projects", title: "Projects", note: `${draft.projects.length} project cards`, icon: FolderKanban },
      { id: "admin-experience", title: "Timeline", note: `${draft.experience.length} experience items`, icon: Milestone },
      { id: "admin-recognition", title: "Recognition", note: "Achievements and competitions", icon: Trophy },
      { id: "admin-gallery", title: "Achievement Photos", note: `${draft.achievementGallery?.length || 0} media cards`, icon: ImagePlus },
      { id: "admin-certificates", title: "Certificates", note: `${draft.certificates?.length || 0} certificate cards`, icon: BadgeCheck },
      { id: "admin-references", title: "References", note: `${draft.references?.length || 0} reference cards`, icon: Sparkles },
    ],
    [draft],
  );

  const dashboardMetrics = useMemo(
    () => [
      {
        label: "Projects",
        value: String(draft.projects.length).padStart(2, "0"),
        hint: "Public showcase cards",
        icon: FolderKanban,
        accent: "#0F766E",
      },
      {
        label: "Timeline",
        value: String(draft.experience.length).padStart(2, "0"),
        hint: "Experience entries",
        icon: Milestone,
        accent: "#2563EB",
      },
      {
        label: "Media",
        value: String((draft.achievementGallery?.length || 0) + (draft.certificates?.length || 0)).padStart(2, "0"),
        hint: "Photos and certificates",
        icon: ImagePlus,
        accent: "#EA580C",
      },
      {
        label: "Upload Mode",
        value: uploadProvider === "cloudinary" ? "CDN" : "Storage",
        hint: uploadProvider === "cloudinary" ? "Cloudinary active" : "Firebase Storage active",
        icon: FileText,
        accent: "#7C3AED",
      },
    ],
    [draft, uploadProvider],
  );
  const sortedExperienceItems = useMemo(
    () =>
      (draft.experience || [])
        .map((item, index) => ({ item, index }))
        .sort((left, right) => {
          const leftDate = getSortableDateValue(left.item.sortDate || "");
          const rightDate = getSortableDateValue(right.item.sortDate || "");

          if (leftDate !== rightDate) {
            return rightDate - leftDate;
          }

          return left.index - right.index;
        })
        .map(({ item }) => item),
    [draft.experience],
  );

  if (!isConfigured) {
    return (
      <div className="min-h-screen bg-[linear-gradient(135deg,#fff7ed_0%,#eff6ff_60%,#f5f3ff_100%)] px-4 py-8 md:px-8">
        <div className="mx-auto max-w-4xl rounded-[32px] border border-amber-200 bg-white p-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
          <div className="flex items-start gap-4">
            <AlertCircle className="mt-1 h-6 w-6 text-amber-500" />
            <div>
              <h1 className="text-3xl font-black tracking-[-0.03em] text-slate-900">Admin setup is ready but Firebase is not configured yet.</h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                Add your Firebase web config to `.env`, enable Google sign-in for your owner account, then reopen `/#/admin`.
              </p>
              <div className="mt-6">
                <a href="#/" className="inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white">
                  Back to portfolio
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[linear-gradient(135deg,#fff7ed_0%,#eff6ff_60%,#f5f3ff_100%)] px-4 py-8 md:px-8">
        <div className="mx-auto max-w-3xl rounded-[32px] border border-white/60 bg-white/90 p-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">Secure Admin</div>
          <h1 className="mt-4 text-4xl font-black tracking-[-0.04em] text-slate-900">Only your Google account can edit this portfolio.</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
            Sign in with your authorized owner Google account. The UI checks the owner account, and your database and storage rules should also allow writes only for that account.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onSignIn}
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
            >
              <LogIn className="h-4 w-4" />
              Sign in with Google
            </button>
            <a href="#/" className="inline-flex rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700">
              Back to portfolio
            </a>
          </div>
          {syncMessage ? <p className="mt-4 text-sm font-medium text-emerald-600">{syncMessage}</p> : null}
          {status ? <p className="mt-2 text-sm text-slate-500">{status}</p> : null}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#fff7ed_0%,#eef4ff_45%,#f6f0ff_100%)] px-4 py-6 md:px-8 md:py-8">
      <div className="mx-auto max-w-[1480px] space-y-6">
        <section id="admin-overview" className="rounded-[32px] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.96)_0%,rgba(248,250,252,0.92)_100%)] p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] md:p-7">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
                Owner-only editor
              </div>
              <h1 className="mt-4 text-4xl font-black tracking-[-0.05em] text-slate-900 md:text-5xl">Portfolio Admin</h1>
              <p className="mt-3 text-sm leading-7 text-slate-600 md:text-[15px]">
                This editor is grouped by real portfolio areas, so it is much easier to tell which fields belong to the hero, services, projects, timeline, media, and contact sections.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  {syncMessage || "Ready to edit"}
                </div>
                {status ? <div className="inline-flex rounded-full bg-white px-4 py-2 text-sm text-slate-500 shadow-sm">{status}</div> : null}
                <div className="inline-flex rounded-full bg-white px-4 py-2 text-sm text-slate-700 shadow-sm">
                  Signed in as <span className="ml-1 font-semibold text-slate-900">{user.email}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 xl:max-w-[560px] xl:justify-end">
              <a href="#/" className="inline-flex rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-white">
                View portfolio
              </a>
              <button type="button" onClick={handleExportBackup} className="inline-flex rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-white">
                Export JSON
              </button>
              <label className="inline-flex cursor-pointer rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-white">
                Import JSON
                <input
                  type="file"
                  accept="application/json"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) handleImportBackup(file);
                    event.target.value = "";
                  }}
                />
              </label>
              <button
                type="button"
                onClick={() => onSave(latestDraftRef.current)}
                disabled={isSaving}
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(15,23,42,0.16)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSaving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {isSaving ? "Saving..." : "Save all changes"}
              </button>
              <button
                type="button"
                onClick={onSignOut}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-white"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </div>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[300px_minmax(0,1fr)]">
          <aside className="space-y-6 xl:sticky xl:top-6 xl:self-start">
            <div className="rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white">
                  <LayoutDashboard className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">Editor map</div>
                  <div className="text-xs text-slate-500">Jump to the exact area you want to update.</div>
                </div>
              </div>
              <div className="mt-5 space-y-2">
                {editorSections.map((section) => {
                  const Icon = section.icon;

                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => scrollToEditorSection(section.id)}
                      className="flex w-full items-center justify-between rounded-[20px] border border-transparent bg-slate-50/90 px-4 py-3 text-left transition hover:border-slate-200 hover:bg-white"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm">
                          <Icon className="h-4 w-4 text-slate-700" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-900">{section.title}</div>
                          <div className="text-xs text-slate-500">{section.note}</div>
                        </div>
                      </div>
                      <Sparkles className="h-4 w-4 text-slate-300" />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
              {dashboardMetrics.map((metric) => (
                <MetricCard key={metric.label} {...metric} />
              ))}
            </div>

            <div className="rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Editing tips</div>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                <p>The left menu jumps to the exact editing block instead of forcing you through one long list.</p>
                <p>Each repeatable item can be managed from its own card, so projects, timeline items, and certificates are easier to identify.</p>
                <p>Uploads and text are grouped together now, which should make the whole admin feel much more professional.</p>
              </div>
            </div>
          </aside>

          <div className="space-y-6">

        <CardSection id="admin-profile" title="Profile and Files" sub="This controls your bio, links, profile image, and CV download button." icon={UserRound} badge="Core identity">
          <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-5">
              <FieldGroup title="Identity" sub="These fields shape the first screen of the portfolio." tone="warm">
                <Field label="Brand name"><TextInput value={draft.profile.name} onChange={(event) => setProfileField("name", event.target.value)} /></Field>
                <Field label="Full name"><TextInput value={draft.profile.fullName} onChange={(event) => setProfileField("fullName", event.target.value)} /></Field>
                <Field label="Hero first line"><TextInput value={draft.profile.heroFirst} onChange={(event) => setProfileField("heroFirst", event.target.value)} /></Field>
                <Field label="Hero second line"><TextInput value={draft.profile.heroLast} onChange={(event) => setProfileField("heroLast", event.target.value)} /></Field>
                <Field label="Role"><TextInput value={draft.profile.role} onChange={(event) => setProfileField("role", event.target.value)} /></Field>
                <Field label="Location"><TextInput value={draft.profile.location} onChange={(event) => setProfileField("location", event.target.value)} /></Field>
                <div className="lg:col-span-2"><Field label="Subtitle"><TextArea value={draft.profile.subtitle} onChange={(event) => setProfileField("subtitle", event.target.value)} /></Field></div>
                <div className="lg:col-span-2"><Field label="Intro"><TextArea value={draft.profile.intro} onChange={(event) => setProfileField("intro", event.target.value)} /></Field></div>
              </FieldGroup>

              <FieldGroup title="Contact and profile links" sub="These feed your contact section and online profile cards." tone="cool">
                <Field label="Email"><TextInput value={draft.profile.email} onChange={(event) => setProfileField("email", event.target.value)} /></Field>
                <Field label="Phone / WhatsApp"><TextInput value={draft.profile.phone} onChange={(event) => setProfileField("phone", event.target.value)} /></Field>
                <Field label="GitHub URL"><TextInput value={draft.profile.github} onChange={(event) => setProfileField("github", event.target.value)} /></Field>
                <Field label="LinkedIn URL"><TextInput value={draft.profile.linkedin} onChange={(event) => setProfileField("linkedin", event.target.value)} /></Field>
                <Field label="LeetCode URL"><TextInput value={draft.profile.leetcode} onChange={(event) => setProfileField("leetcode", event.target.value)} /></Field>
                <Field label="Kaggle URL"><TextInput value={draft.profile.kaggle} onChange={(event) => setProfileField("kaggle", event.target.value)} /></Field>
              </FieldGroup>
            </div>

            <div className="space-y-5">
              <FieldGroup title="Files and assets" sub="Upload your profile image and CV from one clean place." columns="grid-cols-1">
                <UploadField
                  label="Profile photo"
                  description="Used in the hero area and the contact block."
                  accept="image/*"
                  onChange={(file) => handleUpload("profileImage", file)}
                  statusText={uploadingTarget === "profileImage" ? "Uploading profile photo..." : draft.profile.profileImage || "No profile photo uploaded yet"}
                  preview={<ImagePreview src={draft.profile.profileImage} label="Profile preview" />}
                  buttonLabel="Upload photo"
                />
                <UploadField
                  label="CV PDF"
                  description="This file powers the Download CV button on your portfolio."
                  accept="application/pdf"
                  onChange={(file) => handleUpload("cv", file)}
                  statusText={uploadingTarget === "cv" ? "Uploading CV..." : draft.profile.cvFileName || "No CV uploaded yet"}
                  preview={
                    <div className="rounded-[20px] border border-slate-200 bg-white p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-900">{draft.profile.cvFileName || "No file selected"}</div>
                          <div className="text-xs text-slate-500">PDF document for the public CV download</div>
                        </div>
                      </div>
                    </div>
                  }
                  buttonLabel="Upload CV"
                />
              </FieldGroup>

              <div className="rounded-[26px] border border-slate-200 bg-white/90 p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Live snapshot</div>
                <div className="mt-3 text-2xl font-black tracking-[-0.04em] text-slate-900">{draft.profile.fullName}</div>
                <p className="mt-2 text-sm leading-7 text-slate-500">{draft.profile.role}</p>
                <div className="mt-5 space-y-2 text-sm text-slate-600">
                  <div className="rounded-2xl bg-slate-50 px-4 py-3">{draft.profile.email || "Add an email address"}</div>
                  <div className="rounded-2xl bg-slate-50 px-4 py-3">{draft.profile.phone || "Add a phone number"}</div>
                  <div className="rounded-2xl bg-slate-50 px-4 py-3">{draft.profile.location || "Add a location"}</div>
                </div>
              </div>
            </div>
          </div>
        </CardSection>

        <CardSection id="admin-copy" title="Section Copy" sub="Edit the portfolio section titles and short descriptive texts." icon={Type} badge="Words and labels">
          <div className="grid gap-5 xl:grid-cols-2">
            <FieldGroup title="Hero content" sub="These fields control the hero text, CTA labels, stat labels, and animated words." tone="warm">
              <Field label="Final splash word"><TextInput value={draft.sectionCopy.welcomeTitle || ""} onChange={(event) => setSectionField("welcomeTitle", event.target.value)} /></Field>
              <div className="lg:col-span-2 rounded-[22px] border border-slate-200 bg-white/80 p-4">
                <div className="text-sm font-semibold text-slate-900">Splash greetings</div>
                <p className="mt-1 text-sm text-slate-500">These words animate on the black opening screen before the portfolio appears.</p>
                <div className="mt-4 flex flex-col gap-3 md:flex-row">
                  <input
                    ref={welcomeWordInputRef}
                    type="text"
                    placeholder="Type a greeting and press Enter"
                    value={pendingWelcomeWord}
                    onChange={(event) => setPendingWelcomeWord(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        commitWelcomeWord();
                      }
                    }}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-400"
                  />
                  <button type="button" onClick={commitWelcomeWord} className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white">
                    Add greeting
                  </button>
                </div>
                <div className="mt-4 space-y-3">
                  {(draft.sectionCopy?.welcomeWords || []).map((word, index) => (
                    <div key={`welcome-word-${index}`} className="flex items-center gap-3">
                      <TextInput value={word} onChange={(event) => updateSectionArrayItem("welcomeWords", index, event.target.value)} />
                      <button type="button" onClick={() => removeSectionArrayItem("welcomeWords", index)} className="rounded-full border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-600">
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <Field label="Hero badge"><TextInput value={draft.sectionCopy.heroBadge} onChange={(event) => setSectionField("heroBadge", event.target.value)} /></Field>
              <Field label="Hero primary button"><TextInput value={draft.sectionCopy.heroPrimaryButton} onChange={(event) => setSectionField("heroPrimaryButton", event.target.value)} /></Field>
              <Field label="Hero secondary button"><TextInput value={draft.sectionCopy.heroSecondaryButton} onChange={(event) => setSectionField("heroSecondaryButton", event.target.value)} /></Field>
              <Field label="Hero GitHub button"><TextInput value={draft.sectionCopy.heroGithubButton} onChange={(event) => setSectionField("heroGithubButton", event.target.value)} /></Field>
              <Field label="Projects stat label"><TextInput value={draft.sectionCopy.heroProjectsLabel} onChange={(event) => setSectionField("heroProjectsLabel", event.target.value)} /></Field>
              <Field label="Profiles stat label"><TextInput value={draft.sectionCopy.heroProfilesLabel} onChange={(event) => setSectionField("heroProfilesLabel", event.target.value)} /></Field>
              <Field label="Major stat label"><TextInput value={draft.sectionCopy.heroMajorLabel} onChange={(event) => setSectionField("heroMajorLabel", event.target.value)} /></Field>
              <Field label="Hero loop label"><TextInput value={draft.sectionCopy.heroLoopLabel || ""} onChange={(event) => setSectionField("heroLoopLabel", event.target.value)} /></Field>
              <Field label="Hero CTA title"><TextInput value={draft.sectionCopy.heroCtaTitle || ""} onChange={(event) => setSectionField("heroCtaTitle", event.target.value)} /></Field>
              <Field label="Hero CTA button"><TextInput value={draft.sectionCopy.heroCtaButton || ""} onChange={(event) => setSectionField("heroCtaButton", event.target.value)} /></Field>
              <div className="lg:col-span-2 rounded-[22px] border border-slate-200 bg-white p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Hero loop words</div>
                <p className="mt-1 text-xs leading-6 text-slate-400">Type one word, press Enter, and it will be added to the hero loop instantly.</p>
                <div className="mt-4 flex flex-col gap-3 md:flex-row">
                  <input
                    ref={heroWordInputRef}
                    type="text"
                    value={pendingHeroWord}
                    placeholder="Type a hero word and press Enter"
                    onChange={(event) => setPendingHeroWord(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        commitHeroWord();
                      }
                    }}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-400"
                  />
                  <button type="button" onClick={commitHeroWord} className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white">
                    Add word
                  </button>
                </div>
                <div className="mt-4 space-y-3">
                  {(draft.sectionCopy?.heroLoopWords || []).map((word, index) => (
                    <div key={`hero-word-${index}`} className="flex items-center gap-3">
                      <TextInput value={word} onChange={(event) => updateSectionArrayItem("heroLoopWords", index, event.target.value)} />
                      <button type="button" onClick={() => removeSectionArrayItem("heroLoopWords", index)} className="rounded-full border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-600">
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-2"><Field label="Hero CTA body"><TextArea value={draft.sectionCopy.heroCtaBody || ""} onChange={(event) => setSectionField("heroCtaBody", event.target.value)} /></Field></div>
            </FieldGroup>

            <FieldGroup title="Services, projects, and timeline copy" sub="These fields label the main middle sections of the portfolio." tone="cool">
              <Field label="Services title"><TextInput value={draft.sectionCopy.servicesTitle} onChange={(event) => setSectionField("servicesTitle", event.target.value)} /></Field>
              <Field label="Experience title"><TextInput value={draft.sectionCopy.experienceTitle} onChange={(event) => setSectionField("experienceTitle", event.target.value)} /></Field>
              <div className="lg:col-span-2"><Field label="Services subtitle"><TextArea value={draft.sectionCopy.servicesSub} onChange={(event) => setSectionField("servicesSub", event.target.value)} /></Field></div>
              <div className="lg:col-span-2"><Field label="Services body"><TextArea value={draft.sectionCopy.servicesBody} onChange={(event) => setSectionField("servicesBody", event.target.value)} /></Field></div>
              <div className="lg:col-span-2"><Field label="Experience subtitle"><TextArea value={draft.sectionCopy.experienceSub} onChange={(event) => setSectionField("experienceSub", event.target.value)} /></Field></div>
              <Field label="Projects title"><TextInput value={draft.sectionCopy.projectsTitle} onChange={(event) => setSectionField("projectsTitle", event.target.value)} /></Field>
              <div className="lg:col-span-2"><Field label="Projects subtitle"><TextArea value={draft.sectionCopy.projectsSub} onChange={(event) => setSectionField("projectsSub", event.target.value)} /></Field></div>
            </FieldGroup>

            <FieldGroup title="Recognition copy" sub="Everything related to achievements, competitions, gallery, and certificate headings." tone="warm">
              <Field label="Achievements title"><TextInput value={draft.sectionCopy.achievementsTitle} onChange={(event) => setSectionField("achievementsTitle", event.target.value)} /></Field>
              <Field label="Competitions title"><TextInput value={draft.sectionCopy.competitionsTitle} onChange={(event) => setSectionField("competitionsTitle", event.target.value)} /></Field>
              <div className="lg:col-span-2"><Field label="Achievements subtitle"><TextArea value={draft.sectionCopy.achievementsSub} onChange={(event) => setSectionField("achievementsSub", event.target.value)} /></Field></div>
              <div className="lg:col-span-2"><Field label="Competitions subtitle"><TextArea value={draft.sectionCopy.competitionsSub} onChange={(event) => setSectionField("competitionsSub", event.target.value)} /></Field></div>
              <Field label="Achievement gallery title"><TextInput value={draft.sectionCopy.achievementGalleryTitle} onChange={(event) => setSectionField("achievementGalleryTitle", event.target.value)} /></Field>
              <Field label="Certificates title"><TextInput value={draft.sectionCopy.certificatesTitle} onChange={(event) => setSectionField("certificatesTitle", event.target.value)} /></Field>
              <Field label="References title"><TextInput value={draft.sectionCopy.referencesTitle || ""} onChange={(event) => setSectionField("referencesTitle", event.target.value)} /></Field>
              <div className="lg:col-span-2"><Field label="Achievement gallery subtitle"><TextArea value={draft.sectionCopy.achievementGallerySub} onChange={(event) => setSectionField("achievementGallerySub", event.target.value)} /></Field></div>
              <div className="lg:col-span-2"><Field label="Certificates subtitle"><TextArea value={draft.sectionCopy.certificatesSub} onChange={(event) => setSectionField("certificatesSub", event.target.value)} /></Field></div>
              <div className="lg:col-span-2"><Field label="References subtitle"><TextArea value={draft.sectionCopy.referencesSub || ""} onChange={(event) => setSectionField("referencesSub", event.target.value)} /></Field></div>
            </FieldGroup>

            <FieldGroup title="Profiles and contact copy" sub="These labels show in the online profiles section and the contact block." tone="cool">
              <Field label="Profiles title"><TextInput value={draft.sectionCopy.profilesTitle} onChange={(event) => setSectionField("profilesTitle", event.target.value)} /></Field>
              <Field label="Profiles CTA text"><TextInput value={draft.sectionCopy.profilesCtaText} onChange={(event) => setSectionField("profilesCtaText", event.target.value)} /></Field>
              <div className="lg:col-span-2"><Field label="Profiles subtitle"><TextArea value={draft.sectionCopy.profilesSub} onChange={(event) => setSectionField("profilesSub", event.target.value)} /></Field></div>
              <Field label="Contact title line 1"><TextInput value={draft.sectionCopy.contactTitleLine1} onChange={(event) => setSectionField("contactTitleLine1", event.target.value)} /></Field>
              <Field label="Contact title line 2"><TextInput value={draft.sectionCopy.contactTitleLine2} onChange={(event) => setSectionField("contactTitleLine2", event.target.value)} /></Field>
              <div className="lg:col-span-2"><Field label="Contact body"><TextArea value={draft.sectionCopy.contactBody} onChange={(event) => setSectionField("contactBody", event.target.value)} /></Field></div>
              <Field label="Based in label"><TextInput value={draft.sectionCopy.basedInLabel} onChange={(event) => setSectionField("basedInLabel", event.target.value)} /></Field>
              <Field label="Download CV label"><TextInput value={draft.sectionCopy.contactDownloadLabel} onChange={(event) => setSectionField("contactDownloadLabel", event.target.value)} /></Field>
            </FieldGroup>
          </div>
        </CardSection>

        <CardSection id="admin-services" title="Services and Skills" sub="Update what you build and the technology tags shown beside it." icon={BriefcaseBusiness} badge="What you build" action={<button type="button" onClick={addService} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Add service</button>}>
          <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
            <FieldGroup title="Service cards" sub="Each service appears as one card in the services section." columns="grid-cols-1">
              <div className="space-y-4">
                {!draft.services.length ? (
                  <div className="rounded-[24px] border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">
                    No services yet. Use <span className="font-semibold text-slate-900">Add service</span> to create one.
                  </div>
                ) : null}
                {draft.services.map((service, index) => (
                  <ItemEditorCard
                    key={service.id}
                    eyebrow={`Service ${String(index + 1).padStart(2, "0")}`}
                    title={service.title || "Untitled service"}
                    sub={service.sub || "Add a short service summary"}
                    onRemove={() => removeItem("services", service.id)}
                    removeLabel="Remove service"
                  >
                    <div className="grid gap-4 lg:grid-cols-[1fr_1fr_190px_140px]">
                      <Field label="Title"><TextInput value={service.title} onChange={(event) => updateObjectArray("services", service.id, "title", event.target.value)} /></Field>
                      <Field label="Subtitle"><TextInput value={service.sub} onChange={(event) => updateObjectArray("services", service.id, "sub", event.target.value)} /></Field>
                      <Field label="Icon">
                        <select className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm" value={service.iconKey} onChange={(event) => updateObjectArray("services", service.id, "iconKey", event.target.value)}>
                          {serviceIconOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                        </select>
                      </Field>
                      <Field label="Color"><input type="color" value={service.color} onChange={(event) => updateObjectArray("services", service.id, "color", event.target.value)} className="h-12 w-full rounded-2xl border border-slate-200 bg-white p-2" /></Field>
                    </div>
                  </ItemEditorCard>
                ))}
              </div>
            </FieldGroup>

            <div className="space-y-5">
              <FieldGroup title="Skill tags" sub="Type a skill, press Enter, and it becomes one of the hoverable tech chips." columns="grid-cols-1" tone="cool">
                <div className="rounded-[22px] border border-slate-200 bg-white/80 p-4">
                  <div className="text-sm font-semibold text-slate-900">Tech stack labels</div>
                  <p className="mt-1 text-sm text-slate-500">Use this like the hero words editor. Add one skill at a time and reorder later if needed.</p>
                  <div className="mt-4 flex flex-col gap-3 md:flex-row">
                    <input
                      ref={skillInputRef}
                      type="text"
                      placeholder="Type a skill and press Enter"
                      value={pendingSkill}
                      onChange={(event) => setPendingSkill(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          commitSkill();
                        }
                      }}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-400"
                    />
                    <button type="button" onClick={commitSkill} className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white">
                      Add skill
                    </button>
                  </div>
                  <div className="mt-4 space-y-3">
                    {(draft.skills || []).map((skill, index) => (
                      <div key={`skill-${index}`} className="flex items-center gap-3">
                        <TextInput value={skill} onChange={(event) => updateSimpleArrayItem("skills", index, event.target.value)} />
                        <button type="button" onClick={() => removeSimpleArrayItem("skills", index)} className="rounded-full border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-600">
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </FieldGroup>

              <div className="rounded-[26px] border border-slate-200 bg-white/90 p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                    <Link2 className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Available icons</div>
                    <div className="text-xs text-slate-500">Choose any of these icons from the dropdown for a service card.</div>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {serviceIconOptions.map((option) => (
                    <span key={option.value} className="rounded-full bg-slate-100 px-3 py-2 text-xs font-medium text-slate-600">
                      {option.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardSection>

        <CardSection id="admin-projects" title="Projects" sub="Each card here maps directly to one project in your public portfolio." icon={FolderKanban} badge="Showcase cards" action={<button type="button" onClick={addProject} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Add project</button>}>
          <div className="space-y-5">
            {!draft.projects.length ? (
              <div className="rounded-[28px] border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">
                No projects yet. Use the <span className="font-semibold text-slate-900">Add project</span> button to create one.
              </div>
            ) : null}
            {draft.projects.map((project, index) => (
              <ItemEditorCard
                key={project.id}
                eyebrow={`Project ${String(index + 1).padStart(2, "0")}`}
                title={project.title || "Untitled project"}
                sub={project.category || "Add a category like Web or App"}
                onRemove={() => removeItem("projects", project.id)}
                removeLabel="Remove project"
              >
                <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
                  <FieldGroup title="Project details" sub="Core content, category, tech stack, live link, and accent color." tone="cool">
                    <Field label="Title"><TextInput value={project.title} onChange={(event) => updateObjectArray("projects", project.id, "title", event.target.value)} /></Field>
                    <Field label="Category"><TextInput value={project.category} onChange={(event) => updateObjectArray("projects", project.id, "category", event.target.value)} /></Field>
                    <Field label="Role"><TextInput value={project.role || ""} onChange={(event) => updateObjectArray("projects", project.id, "role", event.target.value)} /></Field>
                    <Field label="Live link"><TextInput value={project.link} onChange={(event) => updateObjectArray("projects", project.id, "link", event.target.value)} /></Field>
                    <Field label="Accent color"><input type="color" value={project.accent} onChange={(event) => updateObjectArray("projects", project.id, "accent", event.target.value)} className="h-12 w-full rounded-2xl border border-slate-200 bg-white p-2" /></Field>
                    <div className="lg:col-span-2"><Field label="Description"><TextArea value={project.description} onChange={(event) => updateObjectArray("projects", project.id, "description", event.target.value)} /></Field></div>
                    <div className="lg:col-span-2"><Field label="Impact / goal"><TextArea value={project.impact || project.outcome || ""} onChange={(event) => updateObjectArray("projects", project.id, "impact", event.target.value)} /></Field></div>
                    <div className="lg:col-span-2 rounded-[22px] border border-slate-200 bg-white p-4">
                      <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Tech stack</div>
                      <p className="mt-1 text-xs leading-6 text-slate-400">Type one stack item, press Enter, and it will be added as a project tag.</p>
                      <div className="mt-4 flex flex-col gap-3 md:flex-row">
                        <input
                          ref={setProjectTechInputRef(project.id)}
                          type="text"
                          value={pendingProjectTech[project.id] || ""}
                          placeholder="Type a tech item and press Enter"
                          onChange={(event) =>
                            setPendingProjectTech((current) => ({
                              ...current,
                              [project.id]: event.target.value,
                            }))
                          }
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              event.preventDefault();
                              commitProjectTech(project.id);
                            }
                          }}
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-400"
                        />
                        <button type="button" onClick={() => commitProjectTech(project.id)} className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white">
                          Add item
                        </button>
                      </div>
                      <div className="mt-4 space-y-3">
                        {(project.tech || []).map((techItem, techIndex) => (
                          <div key={`${project.id}-tech-${techIndex}`} className="flex items-center gap-3">
                            <TextInput value={techItem} onChange={(event) => updateProjectTechItem(project.id, techIndex, event.target.value)} />
                            <button type="button" onClick={() => removeProjectTechItem(project.id, techIndex)} className="rounded-full border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-600">
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </FieldGroup>

                  <FieldGroup title="Project media" sub="Upload many images or videos. The portfolio preview will rotate through them automatically." columns="grid-cols-1" tone="warm">
                    <UploadField
                      label="Project gallery"
                      description="You can upload screenshots, photos, or short videos for this project."
                      accept="image/*,video/*"
                      multiple
                      onChange={(files) => handleProjectMediaUpload(files, project.id)}
                      statusText={
                        uploadingTarget === `projectMedia:${project.id}` || uploadingTarget === `projectImage:${project.id}`
                          ? "Uploading project media..."
                          : `${(project.media || []).length || (project.image ? 1 : 0)} media item(s) added`
                      }
                      preview={
                        <div className="grid gap-3">
                          {(project.media || []).length ? (
                            <div className="grid gap-3 sm:grid-cols-2">
                              {(project.media || []).map((mediaItem) => (
                                <div key={mediaItem.id} className="overflow-hidden rounded-[20px] border border-slate-200 bg-white">
                                  {mediaItem.type === "video" ? (
                                    <video src={mediaItem.url} controls muted playsInline className="h-44 w-full object-cover object-center" />
                                  ) : (
                                    <img src={mediaItem.url} alt={project.title} className="h-44 w-full object-cover object-center" />
                                  )}
                                  <div className="flex items-center justify-between gap-3 border-t border-slate-200 px-4 py-3">
                                    <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                                      {mediaItem.type === "video" ? "Video" : "Image"}
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => removeProjectMediaItem(project.id, mediaItem.id)}
                                      className="rounded-full border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-600"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <ImagePreview src={project.image} label="Project preview" />
                          )}
                        </div>
                      }
                      buttonLabel="Upload media"
                    />
                  </FieldGroup>
                </div>
              </ItemEditorCard>
            ))}
          </div>
        </CardSection>

        <CardSection id="admin-experience" title="Experience Timeline" sub="This section is fully editable so you can keep your timeline current." icon={Milestone} badge="Timeline items" action={<button type="button" onClick={addExperience} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Add experience</button>}>
          <div className="space-y-5">
            {!draft.experience.length ? (
              <div className="rounded-[28px] border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">
                No timeline items yet. Use the <span className="font-semibold text-slate-900">Add experience</span> button to build the timeline.
              </div>
            ) : null}
            {sortedExperienceItems.map((item, index) => (
              <ItemEditorCard
                key={item.id}
                eyebrow={`Timeline ${String(index + 1).padStart(2, "0")}`}
                title={item.org || "Untitled organization"}
                sub={item.role || "Add a role or position"}
                onRemove={() => removeItem("experience", item.id)}
                removeLabel="Remove experience"
              >
                <div className="grid gap-4 lg:grid-cols-2">
                  <Field label="Organization"><TextInput value={item.org} onChange={(event) => updateObjectArray("experience", item.id, "org", event.target.value)} /></Field>
                  <Field label="Period"><TextInput value={item.period} onChange={(event) => updateObjectArray("experience", item.id, "period", event.target.value)} /></Field>
                  <Field label="Role"><TextInput value={item.role} onChange={(event) => updateObjectArray("experience", item.id, "role", event.target.value)} /></Field>
                  <Field label="Sort date" hint="Newest date appears first in the public timeline.">
                    <input type="date" value={item.sortDate || ""} onChange={(event) => updateObjectArray("experience", item.id, "sortDate", event.target.value)} className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm" />
                  </Field>
                  <Field label="Timeline color"><input type="color" value={item.dot} onChange={(event) => updateObjectArray("experience", item.id, "dot", event.target.value)} className="h-12 w-full rounded-2xl border border-slate-200 bg-white p-2" /></Field>
                  <div className="lg:col-span-2">
                    <Field label="Description"><TextArea value={item.text} onChange={(event) => updateObjectArray("experience", item.id, "text", event.target.value)} /></Field>
                  </div>
                </div>
              </ItemEditorCard>
            ))}
          </div>
        </CardSection>

        <CardSection id="admin-recognition" title="Achievements and Competitions" sub="Keep the text-only recognition lists organized and easy to scan." icon={Trophy} badge="Recognition text">
          <div className="grid gap-5 xl:grid-cols-2">
            <FieldGroup title="Achievements list" sub="One achievement per line. These show in the left recognition column." columns="grid-cols-1" tone="warm">
              <div className="rounded-[22px] border border-slate-200 bg-white p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Achievements</div>
                <p className="mt-1 text-xs leading-6 text-slate-400">Type one item, press Enter, and it will be added to the achievements list.</p>
                <div className="mt-4 flex flex-col gap-3 md:flex-row">
                  <input
                    ref={achievementInputRef}
                    type="text"
                    value={pendingAchievement}
                    placeholder="Type an achievement and press Enter"
                    onChange={(event) => setPendingAchievement(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        commitSimpleListItem("achievements", pendingAchievement, setPendingAchievement, achievementInputRef);
                      }
                    }}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => commitSimpleListItem("achievements", pendingAchievement, setPendingAchievement, achievementInputRef)}
                    className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
                  >
                    Add item
                  </button>
                </div>
                <div className="mt-4 space-y-3">
                  {(draft.achievements || []).map((item, index) => (
                    <div key={`achievement-${index}`} className="flex items-center gap-3">
                      <TextInput value={item} onChange={(event) => updateSimpleArrayItem("achievements", index, event.target.value)} />
                      <button type="button" onClick={() => removeSimpleArrayItem("achievements", index)} className="rounded-full border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-600">
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </FieldGroup>
            <FieldGroup title="Competitions list" sub="One competition per line. These show in the right recognition column." columns="grid-cols-1" tone="cool">
              <div className="rounded-[22px] border border-slate-200 bg-white p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Competitions</div>
                <p className="mt-1 text-xs leading-6 text-slate-400">Type one item, press Enter, and it will be added to the competitions list.</p>
                <div className="mt-4 flex flex-col gap-3 md:flex-row">
                  <input
                    ref={competitionInputRef}
                    type="text"
                    value={pendingCompetition}
                    placeholder="Type a competition and press Enter"
                    onChange={(event) => setPendingCompetition(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        commitSimpleListItem("competitions", pendingCompetition, setPendingCompetition, competitionInputRef);
                      }
                    }}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => commitSimpleListItem("competitions", pendingCompetition, setPendingCompetition, competitionInputRef)}
                    className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
                  >
                    Add item
                  </button>
                </div>
                <div className="mt-4 space-y-3">
                  {(draft.competitions || []).map((item, index) => (
                    <div key={`competition-${index}`} className="flex items-center gap-3">
                      <TextInput value={item} onChange={(event) => updateSimpleArrayItem("competitions", index, event.target.value)} />
                      <button type="button" onClick={() => removeSimpleArrayItem("competitions", index)} className="rounded-full border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-600">
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </FieldGroup>
          </div>
        </CardSection>

        <CardSection id="admin-gallery" title="Achievement Gallery" sub="Upload event photos, award photos, and other visual proof of your achievements." icon={ImagePlus} badge="Visual achievements" action={<button type="button" onClick={addAchievementMedia} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Add achievement photo</button>}>
          <div className="space-y-5">
            {!draft.achievementGallery?.length ? (
              <div className="rounded-[28px] border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">
                No achievement photos yet. Add one from here.
              </div>
            ) : null}
            {(draft.achievementGallery || []).map((item, index) => (
              <ItemEditorCard
                key={item.id}
                eyebrow={`Photo ${String(index + 1).padStart(2, "0")}`}
                title={item.title || "Untitled achievement image"}
                sub={item.subtitle || "Add a subtitle or event description"}
                onRemove={() => removeItem("achievementGallery", item.id)}
                removeLabel="Remove photo"
              >
                <div className="grid gap-5 xl:grid-cols-[1fr_0.95fr]">
                  <FieldGroup title="Image details" sub="Control the title, subtitle, and optional link." tone="cool">
                    <Field label="Title"><TextInput value={item.title} onChange={(event) => updateObjectArray("achievementGallery", item.id, "title", event.target.value)} /></Field>
                    <Field label="Subtitle"><TextInput value={item.subtitle} onChange={(event) => updateObjectArray("achievementGallery", item.id, "subtitle", event.target.value)} /></Field>
                    <div className="lg:col-span-2"><Field label="Open link"><TextInput value={item.link} onChange={(event) => updateObjectArray("achievementGallery", item.id, "link", event.target.value)} /></Field></div>
                  </FieldGroup>
                  <FieldGroup title="Image upload" sub="This image appears in the public achievement gallery." columns="grid-cols-1" tone="warm">
                    <UploadField
                      label="Achievement image"
                      description="Upload the actual achievement or event photo."
                      accept="image/*"
                      onChange={(file) => handleUpload("achievementImage", file, item.id)}
                      statusText={uploadingTarget === `achievementImage:${item.id}` ? "Uploading image..." : item.image || "No image uploaded yet"}
                      preview={<ImagePreview src={item.image} label="Achievement preview" />}
                      buttonLabel="Upload image"
                    />
                  </FieldGroup>
                </div>
              </ItemEditorCard>
            ))}
          </div>
        </CardSection>

        <CardSection id="admin-certificates" title="Certificates" sub="Upload your certificates so the public portfolio can show them as image cards." icon={BadgeCheck} badge="Certificates" action={<button type="button" onClick={addCertificate} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Add certificate</button>}>
          <div className="space-y-5">
            {!draft.certificates?.length ? (
              <div className="rounded-[28px] border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">
                No certificates yet. Add one from here.
              </div>
            ) : null}
            {(draft.certificates || []).map((item, index) => (
              <ItemEditorCard
                key={item.id}
                eyebrow={`Certificate ${String(index + 1).padStart(2, "0")}`}
                title={item.title || "Untitled certificate"}
                sub={item.issuer || "Add the issuer or event name"}
                onRemove={() => removeItem("certificates", item.id)}
                removeLabel="Remove certificate"
              >
                <div className="grid gap-5 xl:grid-cols-[1fr_0.95fr]">
                  <FieldGroup title="Certificate details" sub="Set the title, issuer, and optional external link." tone="cool">
                    <Field label="Title"><TextInput value={item.title} onChange={(event) => updateObjectArray("certificates", item.id, "title", event.target.value)} /></Field>
                    <Field label="Issuer"><TextInput value={item.issuer} onChange={(event) => updateObjectArray("certificates", item.id, "issuer", event.target.value)} /></Field>
                    <div className="lg:col-span-2"><Field label="Open link"><TextInput value={item.link} onChange={(event) => updateObjectArray("certificates", item.id, "link", event.target.value)} /></Field></div>
                  </FieldGroup>
                  <FieldGroup title="Certificate image" sub="Upload the certificate image shown in the public site." columns="grid-cols-1" tone="warm">
                    <UploadField
                      label="Certificate image"
                      description="Use a readable screenshot or export for the public portfolio."
                      accept="image/*"
                      onChange={(file) => handleUpload("certificateImage", file, item.id)}
                      statusText={uploadingTarget === `certificateImage:${item.id}` ? "Uploading image..." : item.image || "No image uploaded yet"}
                      preview={<ImagePreview src={item.image} label="Certificate preview" />}
                      buttonLabel="Upload image"
                    />
                  </FieldGroup>
                </div>
              </ItemEditorCard>
            ))}
          </div>
        </CardSection>

        <CardSection id="admin-references" title="References" sub="Add mentors, supervisors, or collaborators with their photo, designation, and quotation." icon={Sparkles} badge="Reference cards" action={<button type="button" onClick={addReference} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Add reference</button>}>
          <div className="space-y-5">
            {!draft.references?.length ? (
              <div className="rounded-[28px] border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">
                No references yet. Add one from here and the public portfolio will show them in a moving horizontal row.
              </div>
            ) : null}
            {(draft.references || []).map((item, index) => (
              <ItemEditorCard
                key={item.id}
                eyebrow={`Reference ${String(index + 1).padStart(2, "0")}`}
                title={item.name || "Reference name"}
                sub={item.designation || "Add a designation"}
                onRemove={() => removeItem("references", item.id)}
                removeLabel="Remove reference"
              >
                <div className="grid gap-5 xl:grid-cols-[1fr_0.95fr]">
                  <FieldGroup title="Reference details" sub="These details appear on the moving public cards." tone="cool">
                    <Field label="Name"><TextInput value={item.name} onChange={(event) => updateObjectArray("references", item.id, "name", event.target.value)} /></Field>
                    <Field label="Designation"><TextInput value={item.designation} onChange={(event) => updateObjectArray("references", item.id, "designation", event.target.value)} /></Field>
                    <div className="lg:col-span-2">
                      <Field label="Quotation">
                        <TextArea value={item.quote} onChange={(event) => updateObjectArray("references", item.id, "quote", event.target.value)} />
                      </Field>
                    </div>
                  </FieldGroup>
                  <FieldGroup title="Reference image" sub="Upload a photo for the card." columns="grid-cols-1" tone="warm">
                    <UploadField
                      label="Reference photo"
                      description="Use a clear headshot or portrait for this reference."
                      accept="image/*"
                      onChange={(file) => handleUpload("referenceImage", file, item.id)}
                      statusText={uploadingTarget === `referenceImage:${item.id}` ? "Uploading image..." : item.image || "No image uploaded yet"}
                      preview={<ImagePreview src={item.image} label="Reference preview" />}
                      buttonLabel="Upload image"
                    />
                  </FieldGroup>
                </div>
              </ItemEditorCard>
            ))}
          </div>
        </CardSection>
          </div>
        </div>
      </div>
    </div>
  );
}
