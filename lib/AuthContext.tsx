"use client";

// Authentication context provider for managing global auth state
import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import {
  onAuthStateChange,
  signInWithGoogle,
  signOut as firebaseSignOut,
} from "./auth";

/**
 * Set or clear a cookie that the Next.js middleware can read to gate
 * protected routes on the server side before any JS runs.
 */
function setAuthCookie(user: User | null) {
  if (user) {
    user.getIdToken().then((token) => {
      document.cookie = `firebase-auth-token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax; Secure`;
    });
  } else {
    document.cookie =
      "firebase-auth-token=; path=/; max-age=0; SameSite=Lax; Secure";
  }
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<{
    success: boolean;
    user?: {
      uid: string;
      email: string | null;
      displayName: string | null;
      photoURL: string | null;
      idToken: string;
    };
    error?: string;
  }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChange((firebaseUser) => {
      setUser(firebaseUser);
      setAuthCookie(firebaseUser);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await firebaseSignOut();
    setAuthCookie(null);
  };

  const value = {
    user,
    loading,
    signInWithGoogle,
    signOut: handleSignOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
