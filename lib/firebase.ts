// Firebase configuration and initialization - optional when keys are missing/invalid
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

function hasValidConfig(): boolean {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!apiKey || apiKey.includes("your-") || apiKey === "your-api-key-here") {
    return false;
  }
  if (!process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN) return false;
  if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) return false;
  if (!process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET) return false;
  if (!process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID) return false;
  if (!process.env.NEXT_PUBLIC_FIREBASE_APP_ID) return false;
  return true;
}

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let storage: FirebaseStorage | null = null;

try {
  if (hasValidConfig()) {
    app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
    auth = getAuth(app);
    storage = getStorage(app);
  }
} catch (e) {
  if (typeof window !== "undefined") {
    console.warn(
      "Firebase not configured or invalid - running without auth. Configure .env.local for full functionality.",
    );
  }
}

export { auth, storage };
export default app;
