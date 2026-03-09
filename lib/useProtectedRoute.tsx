'use client';

// Custom hook for protecting routes that require authentication
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthContext';

interface UseProtectedRouteOptions {
  redirectTo?: string;
  requiredAuth?: boolean;
}

export function useProtectedRoute(options: UseProtectedRouteOptions = {}) {
  const { redirectTo = '/login', requiredAuth = true } = options;
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (requiredAuth && !user) {
      router.push(redirectTo);
    }
  }, [user, loading, router, redirectTo, requiredAuth]);

  return { user, loading, isAuthenticated: !!user };
}
