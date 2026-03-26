export const OWNER_EMAIL =
  import.meta.env.VITE_FIREBASE_OWNER_EMAIL || "lakadbd8@gmail.com";
export const PROJECT_ID = import.meta.env.VITE_FIREBASE_PROJECT_ID || "";
export const STORAGE_BUCKET = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "";
export const UPLOAD_PROVIDER = import.meta.env.VITE_UPLOAD_PROVIDER || "firebase";
export const CLOUDINARY_CLOUD_NAME =
  import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "";
export const CLOUDINARY_UPLOAD_PRESET =
  import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "";
export const CLOUDINARY_FOLDER =
  import.meta.env.VITE_CLOUDINARY_FOLDER || "portfolio";

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = Object.values(firebaseConfig).every(Boolean);
export const contentDocumentPath = ["portfolio", "content"];
