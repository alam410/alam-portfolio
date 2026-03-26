import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
  contentDocumentPath,
  firebaseConfig,
  isFirebaseConfigured,
} from "./firebaseConfig";

export { contentDocumentPath, isFirebaseConfigured } from "./firebaseConfig";

export const firebaseApp = isFirebaseConfigured
  ? getApps().length
    ? getApp()
    : initializeApp(firebaseConfig)
  : null;

export const auth = firebaseApp ? getAuth(firebaseApp) : null;
export const db = firebaseApp
  ? (() => {
      try {
        return initializeFirestore(firebaseApp, {
          experimentalAutoDetectLongPolling: true,
          useFetchStreams: false,
        });
      } catch {
        return getFirestore(firebaseApp);
      }
    })()
  : null;
export const storage = firebaseApp ? getStorage(firebaseApp) : null;

export const googleProvider = auth
  ? (() => {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      return provider;
    })()
  : null;
