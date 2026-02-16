// Authentication service for Google OAuth and backend integration
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth } from "./firebase";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

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
  try {
    const provider = new GoogleAuthProvider();
    // Force account selection
    provider.setCustomParameters({
      prompt: "select_account",
    });

    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Get the ID token
    const idToken = await user.getIdToken();

    // Send token to backend for verification
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Backend authentication failed");
    }

    await response.json();

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
  try {
    await firebaseSignOut(auth);

    // Optionally notify backend about logout
    const user = auth.currentUser;
    if (user) {
      const idToken = await user.getIdToken();
      await fetch(`${API_BASE_URL}/api/v1/auth/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },
      });
    }
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
}

/**
 * Get the current user's ID token
 */
export async function getIdToken(): Promise<string | null> {
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
 * Verify the current user's token with the backend
 */
export async function verifyToken(): Promise<boolean> {
  const idToken = await getIdToken();
  if (!idToken) return false;

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/verify`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json",
      },
    });

    return response.ok;
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
  return onAuthStateChanged(auth, callback);
}

/**
 * Get the current authenticated user
 */
export function getCurrentUser(): User | null {
  return auth.currentUser;
}

/**
 * Get current user profile from backend
 */
export async function getCurrentUserProfile(): Promise<
  Record<string, unknown>
> {
  const idToken = await getIdToken();
  if (!idToken) throw new Error("Not authenticated");

  const response = await fetch(`${API_BASE_URL}/api/v1/me`, {
    headers: {
      Authorization: `Bearer ${idToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }

  return response.json();
}
