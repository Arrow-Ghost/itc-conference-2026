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
  if (!process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN) {
    missingKeys.push("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN");
  }
  if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
    missingKeys.push("NEXT_PUBLIC_FIREBASE_PROJECT_ID");
  }
  if (!process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET) {
    missingKeys.push("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET");
  }
  if (!process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID) {
    missingKeys.push("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID");
  }
  if (!process.env.NEXT_PUBLIC_FIREBASE_APP_ID) {
    missingKeys.push("NEXT_PUBLIC_FIREBASE_APP_ID");
  }

  if (missingKeys.length > 0) {
    console.error("❌ Firebase configuration error!");
    console.error("Missing environment variables:");
    missingKeys.forEach((key) => console.error(`  - ${key}`));
    console.error("\n📝 To fix this:");
    console.error("1. Make sure .env.local exists in the project root");
    console.error("2. Check that all NEXT_PUBLIC_FIREBASE_* variables are set");
    console.error("3. Restart your dev server after making changes");
    console.error(
      "\nSee CREDENTIALS_CONFIGURED.md for detailed instructions.\n",
    );
    throw new Error(
      "Firebase credentials are missing. Please configure .env.local file.",
    );
  }

  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (apiKey && (apiKey.includes("your-") || apiKey === "your-api-key-here")) {
    console.error("❌ Firebase configuration error!");
    throw new Error(
      "Please update .env.local file.",
    );
  }
}

if (typeof window !== "undefined") {
  validateFirebaseConfig();
}

// Initialize Firebase only if it hasn't been initialized yet
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Initialize Firebase Auth
export const auth = getAuth(app);

// Initialize Firebase Storage
export const storage = getStorage(app);

export default app;
