import React, { Suspense, lazy, useCallback, useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import AlamPortfolio, {
  defaultPortfolioContent,
  mergePortfolioContent,
  profileIconOptions,
  serviceIconOptions,
} from "../AlamPortfolio.jsx";
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_FOLDER,
  CLOUDINARY_UPLOAD_PRESET,
  contentDocumentPath,
  isFirebaseConfigured,
  OWNER_EMAIL,
  PROJECT_ID,
  STORAGE_BUCKET,
  UPLOAD_PROVIDER,
} from "./firebaseConfig";

const PORTFOLIO_CACHE_KEY = "alam-portfolio-live-content-v1";
const PortfolioAdmin = lazy(() => import("./PortfolioAdmin.jsx"));

let publicFirebasePromise;
let adminFirebasePromise;
let storageBucketCheckPromise;

function getHashRoute() {
  const hash = window.location.hash.replace(/^#/, "").replace(/\/+$/, "");
  return hash || "/";
}

async function loadPublicFirebase() {
  if (!publicFirebasePromise) {
    publicFirebasePromise = import("./firebasePublic.js");
  }

  return publicFirebasePromise;
}

async function loadAdminFirebase() {
  if (!adminFirebasePromise) {
    adminFirebasePromise = Promise.all([
      import("./firebase.js"),
      import("firebase/auth"),
      import("firebase/firestore"),
      import("firebase/storage"),
    ]).then(([runtime, authModule, firestoreModule, storageModule]) => ({
      ...runtime,
      ...authModule,
      ...firestoreModule,
      ...storageModule,
    }));
  }

  return adminFirebasePromise;
}

function readCachedPortfolioContent() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawValue = window.localStorage.getItem(PORTFOLIO_CACHE_KEY);
    if (!rawValue) return null;
    return mergePortfolioContent(JSON.parse(rawValue));
  } catch {
    return null;
  }
}

function writeCachedPortfolioContent(content) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(PORTFOLIO_CACHE_KEY, JSON.stringify(content));
  } catch {
    // Ignore cache write failures so they do not block portfolio rendering.
  }
}

function sanitizeFileName(fileName) {
  return fileName.toLowerCase().replace(/[^a-z0-9.\-_]+/g, "-");
}

function buildCloudinaryAttachmentUrl(url) {
  try {
    const parsedUrl = new URL(url);

    if (!parsedUrl.hostname.includes("cloudinary.com")) {
      return "";
    }

    const pathParts = parsedUrl.pathname.split("/").filter(Boolean);
    const uploadIndex = pathParts.findIndex((part) => part === "upload");

    if (uploadIndex === -1) {
      return "";
    }

    if (pathParts[uploadIndex + 1] === "fl_attachment") {
      return parsedUrl.toString();
    }

    pathParts.splice(uploadIndex + 1, 0, "fl_attachment");
    parsedUrl.pathname = `/${pathParts.join("/")}`;
    return parsedUrl.toString();
  } catch {
    return "";
  }
}

function formatSyncTime(value) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleString([], {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function withTimeout(promise, ms, message) {
  let timeoutId;

  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = window.setTimeout(() => {
      reject(new Error(message));
    }, ms);
  });

  return Promise.race([promise, timeoutPromise]).finally(() => {
    window.clearTimeout(timeoutId);
  });
}

async function ensureStorageBucketReady() {
  if (!STORAGE_BUCKET) {
    throw new Error("Firebase Storage bucket is not configured in .env.");
  }

  if (!storageBucketCheckPromise) {
    storageBucketCheckPromise = fetch(`https://storage.googleapis.com/storage/v1/b/${STORAGE_BUCKET}`).then(
      async (response) => {
        if (response.ok) return true;

        const body = await response.text();
        throw new Error(body || "Firebase Storage bucket check failed.");
      },
    );
  }

  return storageBucketCheckPromise;
}

async function uploadWithCloudinary(kind, file, itemId) {
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
    throw new Error(
      "Cloudinary is selected as the upload provider, but VITE_CLOUDINARY_CLOUD_NAME or VITE_CLOUDINARY_UPLOAD_PRESET is missing in .env.",
    );
  }

  const resourceType =
    kind === "cv" || kind === "projectMedia"
      ? "auto"
      : "image";
  const folder =
    kind === "profileImage"
      ? "profile"
      : kind === "cv"
        ? "cv"
        : kind === "projectImage" || kind === "projectMedia"
          ? "projects"
          : kind === "achievementImage"
            ? "achievements"
            : kind === "referenceImage"
              ? "references"
              : kind === "onlineProfileIcon"
                ? "profile-icons"
                : "certificates";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  formData.append("folder", `${CLOUDINARY_FOLDER}/${folder}`);
  formData.append("filename_override", sanitizeFileName(file.name));
  if (itemId) {
    formData.append("public_id_prefix", itemId);
  }

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload?.error?.message || "Cloudinary could not upload this file.");
  }

  return payload.secure_url || payload.url || "";
}

function describeFirebaseError(error, fallback) {
  const code = error?.code || "";
  const message = error?.message || "";

  if (
    message.includes("Cloud Firestore API has not been used") ||
    message.includes("firestore.googleapis.com") ||
    message.includes("SERVICE_DISABLED")
  ) {
    return `Cloud Firestore API is disabled for project ${PROJECT_ID || "this Firebase project"}. Open Firebase Console -> Firestore Database, create the database if you have not created it yet, and enable the Cloud Firestore API.`;
  }

  if (
    message.includes("The specified bucket does not exist") ||
    message.includes("Firebase Storage bucket check failed") ||
    message.includes("Firebase Storage bucket is not configured")
  ) {
    return `Firebase Storage is not ready for project ${PROJECT_ID || "this Firebase project"}. Open Firebase Console -> Storage, click Get started to create the bucket, make sure the bucket name matches ${STORAGE_BUCKET || "your .env value"}, then publish storage.rules and try again.`;
  }

  if (
    message.includes("Cloudinary is selected as the upload provider") ||
    message.includes("Cloudinary could not upload this file")
  ) {
    return `${message} Open your Cloudinary dashboard, create an unsigned upload preset, copy the cloud name and preset into .env, then restart the Vite dev server.`;
  }

  if (code === "auth/configuration-not-found") {
    return "Google sign-in is not fully configured in Firebase yet. In Firebase Authentication, enable the Google provider, choose a project support email if Firebase asks for one, add your current domain to Authorized domains, then restart the Vite dev server.";
  }

  if (code === "auth/unauthorized-domain") {
    return "This domain is not authorized in Firebase Auth yet. Add your current domain in Firebase Authentication -> Settings -> Authorized domains, then restart the Vite dev server.";
  }

  if (code === "auth/popup-closed-by-user") {
    return "The Google sign-in popup was closed before finishing.";
  }

  if (code === "failed-precondition") {
    return "Firestore is not fully ready yet. Create the Firestore database in Firebase Console, publish the rules from this project, then try again.";
  }

  if (code === "unavailable" || code === "deadline-exceeded") {
    return "Firebase is taking too long to respond. Check your internet connection, then try again.";
  }

  if (
    code === "permission-denied" ||
    code === "storage/unauthorized" ||
    code === "storage/unauthenticated"
  ) {
    return "Firebase denied this action. Deploy the Firestore and Storage rules from this project, then sign in again with the authorized owner account.";
  }

  return message || fallback;
}

async function downloadRemoteFile(url, fileName) {
  const cloudinaryDownloadUrl = buildCloudinaryAttachmentUrl(url);

  if (cloudinaryDownloadUrl) {
    const link = document.createElement("a");
    link.href = cloudinaryDownloadUrl;
    link.rel = "noreferrer";
    document.body.appendChild(link);
    link.click();
    link.remove();
    return;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Could not fetch the file.");
  }

  const blob = await response.blob();
  const objectUrl = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(objectUrl);
}

function LoadingScreen({ title, subtitle }) {
  return (
    <div
      className="flex min-h-screen items-center justify-center px-6"
      style={{
        background: "linear-gradient(140deg, #f8b359 0%, #ef8356 24%, #f6efe5 52%, #a4c8ff 76%, #b7a6ff 100%)",
        fontFamily: '"Manrope", "Segoe UI", sans-serif',
      }}
    >
      <div className="rounded-[30px] border border-white/70 bg-[rgba(255,250,244,0.9)] px-8 py-7 text-center shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
        <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">Loading</div>
        <div className="mt-3 text-3xl font-black tracking-[-0.05em] text-slate-900">{title}</div>
        <div className="mt-2 text-sm text-slate-500">{subtitle}</div>
      </div>
    </div>
  );
}

export default function App() {
  const initialCachedContent = readCachedPortfolioContent();
  const [route, setRoute] = useState(getHashRoute());
  const [content, setContent] = useState(() =>
    initialCachedContent || mergePortfolioContent(defaultPortfolioContent),
  );
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("");
  const [syncMessage, setSyncMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingTarget, setUploadingTarget] = useState("");
  const [isDownloadingCv, setIsDownloadingCv] = useState(false);
  const [isContentReady, setIsContentReady] = useState(
    () => !isFirebaseConfigured || Boolean(initialCachedContent),
  );

  useEffect(() => {
    const handleHashChange = () => setRoute(getHashRoute());
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    if (route === "/admin") {
      return undefined;
    }

    if (!isFirebaseConfigured) {
      const fallbackContent = mergePortfolioContent(defaultPortfolioContent);
      setContent(fallbackContent);
      writeCachedPortfolioContent(fallbackContent);
      setIsContentReady(true);
      return undefined;
    }

    let cancelled = false;

    const loadPublicContent = async () => {
      try {
        const { fetchPortfolioContent } = await loadPublicFirebase();
        const liveContent = await fetchPortfolioContent();

        if (cancelled) {
          return;
        }

        const nextContent = liveContent
          ? mergePortfolioContent(liveContent)
          : mergePortfolioContent(defaultPortfolioContent);

        setContent(nextContent);
        writeCachedPortfolioContent(nextContent);
        setStatus("");
        setSyncMessage("");
      } catch (error) {
        if (cancelled) {
          return;
        }

        const cachedContent = readCachedPortfolioContent();

        if (cachedContent) {
          setContent(cachedContent);
        } else {
          const fallbackContent = mergePortfolioContent(defaultPortfolioContent);
          setContent(fallbackContent);
          writeCachedPortfolioContent(fallbackContent);
        }

        setStatus(
          describeFirebaseError(error, "Could not load live portfolio content."),
        );
      } finally {
        if (!cancelled) {
          setIsContentReady(true);
        }
      }
    };

    loadPublicContent();

    return () => {
      cancelled = true;
    };
  }, [route]);

  useEffect(() => {
    if (route !== "/admin") {
      return undefined;
    }

    if (!isFirebaseConfigured) {
      const fallbackContent = mergePortfolioContent(defaultPortfolioContent);
      setContent(fallbackContent);
      setIsContentReady(true);
      return undefined;
    }

    let cancelled = false;
    let unsubscribe = () => {};

    loadAdminFirebase()
      .then(({ auth, onAuthStateChanged, signOut }) => {
        if (cancelled || !auth) {
          setIsContentReady(true);
          return;
        }

        unsubscribe = onAuthStateChanged(auth, async (nextUser) => {
          if (!nextUser) {
            if (!cancelled) {
              setUser(null);
            }
            return;
          }

          if (nextUser.email !== OWNER_EMAIL) {
            if (!cancelled) {
              setStatus("This Google account is not authorized to access the admin.");
              setUser(null);
            }
            await signOut(auth);
            return;
          }

          if (!cancelled) {
            setUser(nextUser);
          }
        });
      })
      .catch((error) => {
        if (!cancelled) {
          setStatus(
            describeFirebaseError(error, "Could not initialize admin authentication."),
          );
          setIsContentReady(true);
        }
      });

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, [route]);

  useEffect(() => {
    if (route !== "/admin") {
      return undefined;
    }

    if (!isFirebaseConfigured) {
      const fallbackContent = mergePortfolioContent(defaultPortfolioContent);
      setContent(fallbackContent);
      setIsContentReady(true);
      return undefined;
    }

    let cancelled = false;
    let unsubscribe = () => {};

    loadAdminFirebase()
      .then(({ db, doc, onSnapshot }) => {
        if (cancelled || !db) {
          setIsContentReady(true);
          return;
        }

        const contentRef = doc(db, ...contentDocumentPath);

        unsubscribe = onSnapshot(
          contentRef,
          { includeMetadataChanges: true },
          (snapshot) => {
            if (cancelled) {
              return;
            }

            if (!snapshot.exists()) {
              const fallbackContent = mergePortfolioContent(defaultPortfolioContent);
              setContent(fallbackContent);
              writeCachedPortfolioContent(fallbackContent);
              setIsSaving(false);
              setIsContentReady(true);
              setSyncMessage("No live portfolio document has been saved yet.");
              return;
            }

            const liveContent = mergePortfolioContent(snapshot.data());
            setContent(liveContent);
            writeCachedPortfolioContent(liveContent);
            setIsContentReady(true);

            if (snapshot.metadata.hasPendingWrites) {
              setSyncMessage("Changes are saved locally and still syncing to Firebase...");
              return;
            }

            setIsSaving(false);
            setSyncMessage(
              liveContent.updatedAt
                ? `Last synced ${formatSyncTime(liveContent.updatedAt)}.`
                : "Connected to live portfolio content.",
            );
          },
          (error) => {
            if (cancelled) {
              return;
            }

            const cachedContent = readCachedPortfolioContent();

            if (cachedContent) {
              setContent(cachedContent);
            }

            setIsSaving(false);
            setIsContentReady(true);
            setSyncMessage("");
            setStatus(
              describeFirebaseError(error, "Could not load live portfolio content."),
            );
          },
        );
      })
      .catch((error) => {
        if (!cancelled) {
          setIsContentReady(true);
          setStatus(
            describeFirebaseError(error, "Could not initialize the admin content loader."),
          );
        }
      });

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, [route]);

  const handleSignIn = useCallback(async () => {
    setStatus("Signing in...");

    try {
      const { auth, googleProvider, signInWithPopup, signOut } =
        await loadAdminFirebase();

      if (!auth || !googleProvider) {
        setStatus("Firebase authentication is not configured yet.");
        return;
      }

      const result = await signInWithPopup(auth, googleProvider);
      if (result.user.email !== OWNER_EMAIL) {
        await signOut(auth);
        setStatus("This Google account is not authorized to access the admin.");
        return;
      }

      setStatus("Signed in successfully.");
    } catch (error) {
      setStatus(describeFirebaseError(error, "Could not sign in."));
    }
  }, []);

  const handleSignOut = useCallback(async () => {
    try {
      const { auth, signOut } = await loadAdminFirebase();

      if (!auth) {
        return;
      }

      await signOut(auth);
      setStatus("Signed out.");
    } catch (error) {
      setStatus(describeFirebaseError(error, "Could not sign out."));
    }
  }, []);

  const handleSave = useCallback(
    async (nextContent) => {
      if (!user) {
        setStatus("You must be signed in to save changes.");
        return;
      }

      setIsSaving(true);
      setStatus("");
      setSyncMessage("Sending changes to Firebase...");

      try {
        const { db, doc, setDoc } = await loadAdminFirebase();

        if (!db) {
          throw new Error("Firestore is not configured yet.");
        }

        const payload = mergePortfolioContent(nextContent);
        const nextLiveContent = {
          ...payload,
          updatedAt: new Date().toISOString(),
          updatedBy: user.email,
        };

        await withTimeout(
          setDoc(doc(db, ...contentDocumentPath), nextLiveContent, { merge: false }),
          15000,
          "Firebase is taking too long to confirm the save. Your changes may still be syncing in the background. If the public portfolio does not update soon, check Firestore setup and your internet connection, then refresh the page.",
        );

        setContent(nextLiveContent);
        writeCachedPortfolioContent(nextLiveContent);
        setStatus("Portfolio updated successfully.");
        setSyncMessage(`Last synced ${formatSyncTime(nextLiveContent.updatedAt)}.`);
      } catch (error) {
        setStatus(
          describeFirebaseError(error, "Could not save portfolio content."),
        );
      } finally {
        setIsSaving(false);
      }
    },
    [user],
  );

  const handleUploadAsset = useCallback(
    async (kind, file, itemId) => {
      const isUsingFirebaseStorage = UPLOAD_PROVIDER !== "cloudinary";

      if (!user) {
        setStatus("You must be signed in to upload files.");
        return "";
      }

      const targetLabel = itemId ? `${kind}:${itemId}` : kind;
      setUploadingTarget(targetLabel);
      setStatus(`Uploading ${file.name}...`);

      try {
        let url = "";

        if (UPLOAD_PROVIDER === "cloudinary") {
          url = await withTimeout(
            uploadWithCloudinary(kind, file, itemId),
            20000,
            "Cloudinary is taking too long to upload the file. Check your internet connection and Cloudinary setup, then try again.",
          );
        } else {
          const { storage, ref, uploadBytes, getDownloadURL } =
            await loadAdminFirebase();

          if (isUsingFirebaseStorage && !storage) {
            throw new Error("Firebase Storage is not configured yet.");
          }

          await withTimeout(
            ensureStorageBucketReady(),
            8000,
            "Firebase Storage setup check is taking too long. Open Firebase Console -> Storage and confirm the bucket has been created.",
          );

          const safeName = sanitizeFileName(file.name);
          const folder =
            kind === "profileImage"
              ? "profile"
              : kind === "cv"
                ? "cv"
                : kind === "projectImage" || kind === "projectMedia"
                  ? "projects"
                  : kind === "achievementImage"
                    ? "achievements"
                    : kind === "referenceImage"
                      ? "references"
                      : kind === "onlineProfileIcon"
                        ? "profile-icons"
                        : "certificates";

          const fileRef = ref(
            storage,
            `portfolio/${folder}/${itemId ? `${itemId}-` : ""}${Date.now()}-${safeName}`,
          );

          await withTimeout(
            uploadBytes(fileRef, file),
            20000,
            "The upload is taking too long. Check your internet connection and Firebase Storage setup, then try again.",
          );

          url = await withTimeout(
            getDownloadURL(fileRef),
            10000,
            "The file uploaded, but Firebase took too long to return the public URL. Please try again.",
          );
        }

        setStatus(`${file.name} uploaded successfully.`);
        return url;
      } catch (error) {
        setStatus(describeFirebaseError(error, "Could not upload the file."));
        return "";
      } finally {
        setUploadingTarget("");
      }
    },
    [user],
  );

  const handleDownloadCv = useCallback(async () => {
    if (!content.profile.cvUrl) {
      setStatus("Upload your CV from the admin panel first.");
      return;
    }

    setIsDownloadingCv(true);

    try {
      await downloadRemoteFile(
        content.profile.cvUrl,
        content.profile.cvFileName || "md-thaiabul-alam-chowdhury-cv.pdf",
      );
    } catch (error) {
      setStatus(describeFirebaseError(error, "Could not download the CV."));
    } finally {
      setIsDownloadingCv(false);
    }
  }, [content]);

  if (!isContentReady) {
    return (
      <>
        <LoadingScreen
          title="Fetching portfolio"
          subtitle="Preparing your saved content..."
        />
        <Analytics route={route} />
        <SpeedInsights route={route} />
      </>
    );
  }

  if (route === "/admin") {
    return (
      <>
        <Suspense
          fallback={
            <LoadingScreen
              title="Opening admin"
              subtitle="Preparing your editor..."
            />
          }
        >
        <PortfolioAdmin
          content={content}
          isConfigured={isFirebaseConfigured}
          user={user}
          status={status}
            syncMessage={syncMessage}
            isSaving={isSaving}
            uploadingTarget={uploadingTarget}
            uploadProvider={UPLOAD_PROVIDER}
            onSignIn={handleSignIn}
            onSignOut={handleSignOut}
            onSave={handleSave}
            onUploadAsset={handleUploadAsset}
            serviceIconOptions={serviceIconOptions}
            profileIconOptions={profileIconOptions}
          />
        </Suspense>
        <Analytics route={route} />
        <SpeedInsights route={route} />
      </>
    );
  }

  return (
    <>
      <AlamPortfolio
        content={content}
        onDownloadCv={handleDownloadCv}
        isDownloadingCv={isDownloadingCv}
        adminHref="#/admin"
        showAdminEntry
      />
      <Analytics route={route} />
      <SpeedInsights route={route} />
    </>
  );
}
