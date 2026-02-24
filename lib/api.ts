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
  city?: string;
  state?: string;
  department: string;
  year: string;
  registrationType: "fellowship" | "hackathon" | "cfp" | "cft" | "art";
  additionalInfo?: string;
  paperId?: string;
  paperStatus?: "pending" | "approved" | "rejected";
  createdAt?: string;
  updatedAt?: string;
}

export interface CoAuthor {
  name: string;
  email: string;
  institution: string;
}

export interface PaperSubmission {
  id?: number;
  paperId: string;
  registrationId?: number;
  authorName: string;
  authorEmail: string;
  authorPhone: string;
  authorInstitution: string;
  authorDepartment: string;
  coAuthors?: CoAuthor[];
  paperTitle: string;
  paperAbstract: string;
  keywords?: string;
  paperType?: "full" | "poster" | "extended_abstract";
  trackType: "cfp" | "art" | "cft";
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  status?:
    | "pending"
    | "under_review"
    | "approved"
    | "rejected"
    | "revision_required";
  reviewerComments?: string;
  submittedAt?: string;
  reviewedAt?: string;
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

/**
 * Paper Submission API Methods
 */

/**
 * Submit a new paper with PDF file
 */
export async function submitPaper(
  paperData: Omit<
    PaperSubmission,
    "id" | "paperId" | "fileUrl" | "submittedAt" | "reviewedAt"
  >,
  file: File,
): Promise<ApiResponse<PaperSubmission>> {
  try {
    const formData = new FormData();

    // Add all paper fields to form data
    formData.append("authorName", paperData.authorName);
    formData.append("authorEmail", paperData.authorEmail);
    formData.append("authorPhone", paperData.authorPhone);
    formData.append("authorInstitution", paperData.authorInstitution);
    formData.append("authorDepartment", paperData.authorDepartment);
    formData.append("paperTitle", paperData.paperTitle);
    formData.append("paperAbstract", paperData.paperAbstract);
    formData.append("trackType", paperData.trackType);

    if (paperData.coAuthors && paperData.coAuthors.length > 0) {
      formData.append("coAuthors", JSON.stringify(paperData.coAuthors));
    }

    if (paperData.keywords) {
      formData.append("keywords", paperData.keywords);
    }

    if (paperData.paperType) {
      formData.append("paperType", paperData.paperType);
    }

    if (paperData.registrationId) {
      formData.append("registrationId", paperData.registrationId.toString());
    }

    // Add the PDF file
    formData.append("file", file);

    const idToken = await getIdToken();
    if (!idToken) {
      throw new Error("Not authenticated");
    }

    const endpoint = USE_LOCAL_API ? "/api/papers" : "/api/v1/papers";
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error || "Failed to submit paper",
      };
    }

    const data = await response.json();
    return {
      success: true,
      data: data.data,
      message: data.message,
    };
  } catch (error) {
    console.error("Error submitting paper:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred",
    };
  }
}

/**
 * Get all paper submissions for current user
 */
export async function getMyPapers(): Promise<ApiResponse<PaperSubmission[]>> {
  try {
    const endpoint = USE_LOCAL_API ? "/api/papers" : "/api/v1/papers/me";
    const response = await authenticatedFetch(endpoint);

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error || "Failed to fetch papers",
      };
    }

    const data = await response.json();
    return {
      success: true,
      data: data.data,
    };
  } catch (error) {
    console.error("Error fetching papers:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred",
    };
  }
}

/**
 * Get paper submission by paper ID
 */
export async function getPaperById(
  paperId: string,
): Promise<ApiResponse<PaperSubmission>> {
  try {
    const endpoint = USE_LOCAL_API
      ? `/api/papers/${paperId}`
      : `/api/v1/papers/${paperId}`;
    const response = await authenticatedFetch(endpoint);

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error || "Failed to fetch paper",
      };
    }

    const data = await response.json();
    return {
      success: true,
      data: data.data,
    };
  } catch (error) {
    console.error("Error fetching paper:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred",
    };
  }
}
