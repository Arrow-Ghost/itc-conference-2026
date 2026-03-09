// Authentication service for Google OAuth with Firestore
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth } from "./firebase";
import { UserDB } from "./firestore";

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  idToken: string;
}

export interface AuthResponse {
  success: boolean;
  user?: AuthUser;
  error?: string;
}

/**
 * Sign in with Google using Firebase Auth
 */
export async function signInWithGoogle(): Promise<AuthResponse> {
  if (!auth) {
    return {
      success: false,
      error: "Firebase is not configured. Sign-in is unavailable.",
    };
  }

  try {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });

    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const idToken = await user.getIdToken();

    // Save user to Firestore
    await UserDB.upsert({
      uid: user.uid,
      email: user.email || "",
      displayName: user.displayName || "",
      photoURL: user.photoURL || "",
      provider: "google",
    });

    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        idToken,
      },
    };
  } catch (error) {
    console.error("Error signing in with Google:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "An error occurred during sign in",
    };
  }
}

/**
 * Sign out the current user
 */
export async function signOut(): Promise<void> {
  if (!auth) return;

  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
}

/**
 * Get the current user's ID token
 */
export async function getIdToken(): Promise<string | null> {
  if (!auth) return null;

  const user = auth.currentUser;
  if (!user) return null;

  try {
    return await user.getIdToken();
  } catch (error) {
    console.error("Error getting ID token:", error);
    return null;
  }
}

/**
 * Verify the current user's token
 */
export async function verifyToken(): Promise<boolean> {
  const user = auth.currentUser;
  if (!user) return false;

  try {
    await user.getIdToken(true); // Force refresh
    return true;
  } catch (error) {
    console.error("Error verifying token:", error);
    return false;
  }
}

/**
 * Subscribe to authentication state changes
 */
export function onAuthStateChange(
  callback: (user: User | null) => void,
): () => void {
  if (!auth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}

/**
 * Get the current authenticated user
 */
export function getCurrentUser(): User | null {
  if (!auth) return null;
  return auth.currentUser;
}

/**
 * Get current user profile from Firestore
 */
export async function getCurrentUserProfile(): Promise<
  Record<string, unknown>
> {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const userDoc = await UserDB.findByUid(user.uid);
  if (!userDoc) throw new Error("User profile not found");

  return userDoc as unknown as Record<string, unknown>;
}
