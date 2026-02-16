// API service for backend communication
import { getIdToken } from "./auth";

// Use local Next.js API routes if available, otherwise use Go backend
const USE_LOCAL_API = process.env.NEXT_PUBLIC_USE_LOCAL_API === "true";
const API_BASE_URL = USE_LOCAL_API
  ? "" // Empty string means same origin (Next.js API routes)
  : process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export interface Registration {
  id?: string;
  userId?: string;
  name: string;
  email: string;
  phone: string;
  institution: string;
  department: string;
  year: string;
  registrationType: "fellowship" | "hackathon" | "cfp" | "cft" | "art";
  additionalInfo?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Make an authenticated API request
 */
async function authenticatedFetch(
  endpoint: string,
  options: RequestInit = {},
): Promise<Response> {
  const idToken = await getIdToken();

  if (!idToken) {
    throw new Error("Not authenticated");
  }

  const headers = {
    Authorization: `Bearer ${idToken}`,
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  return response;
}

/**
 * Registration API Methods
 */

/**
 * Create a new registration
 */
export async function createRegistration(
  registration: Omit<Registration, "id" | "userId" | "createdAt" | "updatedAt">,
): Promise<ApiResponse<Registration>> {
  try {
    const endpoint = USE_LOCAL_API
      ? "/api/registrations"
      : "/api/v1/registrations";
    const response = await authenticatedFetch(endpoint, {
      method: "POST",
      body: JSON.stringify(registration),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error || "Failed to create registration",
      };
    }

    const data = await response.json();
    return {
      success: true,
      data: data.data,
    };
  } catch (error) {
    console.error("Error creating registration:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred",
    };
  }
}

/**
 * Get current user's registration
 */
export async function getMyRegistration(): Promise<ApiResponse<Registration>> {
  try {
    const endpoint = USE_LOCAL_API
      ? "/api/registrations"
      : "/api/v1/registrations/me";
    const response = await authenticatedFetch(endpoint);

    if (!response.ok) {
      if (response.status === 404) {
        return {
          success: false,
          error: "No registration found",
        };
      }
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error || "Failed to fetch registration",
      };
    }

    const data = await response.json();
    return {
      success: true,
      data: data.data,
    };
  } catch (error) {
    console.error("Error fetching registration:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred",
    };
  }
}

/**
 * Update current user's registration
 */
export async function updateMyRegistration(
  registration: Partial<
    Omit<Registration, "id" | "userId" | "createdAt" | "updatedAt">
  >,
): Promise<ApiResponse<Registration>> {
  try {
    const endpoint = USE_LOCAL_API
      ? "/api/registrations"
      : "/api/v1/registrations/me";
    const response = await authenticatedFetch(endpoint, {
      method: "PUT",
      body: JSON.stringify(registration),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error || "Failed to update registration",
      };
    }

    const data = await response.json();
    return {
      success: true,
      data: data.data,
    };
  } catch (error) {
    console.error("Error updating registration:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred",
    };
  }
}

/**
 * Delete current user's registration
 */
export async function deleteMyRegistration(): Promise<ApiResponse<void>> {
  try {
    const endpoint = USE_LOCAL_API
      ? "/api/registrations"
      : "/api/v1/registrations/me";
    const response = await authenticatedFetch(endpoint, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error || "Failed to delete registration",
      };
    }

    return {
      success: true,
      message: "Registration deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting registration:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred",
    };
  }
}

/**
 * Admin API Methods
 */

/**
 * Get all registrations (admin only)
 */
export async function getAllRegistrations(): Promise<
  ApiResponse<Registration[]>
> {
  try {
    const endpoint = USE_LOCAL_API
      ? "/api/admin/registrations"
      : "/api/v1/admin/registrations";
    const response = await authenticatedFetch(endpoint);

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error || "Failed to fetch registrations",
      };
    }

    const data = await response.json();
    return {
      success: true,
      data: data.data,
    };
  } catch (error) {
    console.error("Error fetching all registrations:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred",
    };
  }
}

/**
 * User API Methods
 */

/**
 * Get current user profile
 */
export async function getCurrentUser(): Promise<
  ApiResponse<Record<string, unknown>>
> {
  try {
    const endpoint = USE_LOCAL_API ? "/api/me" : "/api/v1/me";
    const response = await authenticatedFetch(endpoint);

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error || "Failed to fetch user profile",
      };
    }

    const data = await response.json();
    return {
      success: true,
      data: data.data,
    };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred",
    };
  }
}

/**
 * Health check
 */
export async function healthCheck(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch (error) {
    console.error("Health check failed:", error);
    return false;
  }
}
