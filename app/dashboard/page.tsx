"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProtectedRoute } from "@/lib/useProtectedRoute";
import {
  getMyRegistration,
  deleteMyRegistration,
  Registration,
} from "@/lib/api";
import { signOut } from "@/lib/auth";

export default function DashboardPage() {
  const { user, loading: authLoading } = useProtectedRoute();
  const router = useRouter();
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      fetchRegistration();
    }
  }, [authLoading, user]);

  const fetchRegistration = async () => {
    try {
      setLoading(true);
      const result = await getMyRegistration();

      if (result.success) {
        setRegistration(result.data || null);
      } else if (result.error !== "No registration found") {
        setError(result.error || "Failed to load registration");
      }
    } catch (err) {
      console.error("Error fetching registration:", err);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (
      !confirm(
        "Are you sure you want to delete your registration? This action cannot be undone.",
      )
    ) {
      return;
    }

    try {
      setDeleting(true);
      const result = await deleteMyRegistration();

      if (result.success) {
        setRegistration(null);
        alert("Registration deleted successfully");
      } else {
        setError(result.error || "Failed to delete registration");
      }
    } catch (err) {
      console.error("Error deleting registration:", err);
      setError("An unexpected error occurred");
    } finally {
      setDeleting(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  if (authLoading || loading) {
    return (
      <main className="min-h-screen bg-[#03396c] text-white flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading your dashboard...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#03396c] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0 opacity-10 bg-repeat"
          style={{
            backgroundImage: `url('/images/homepage-bg.png')`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <div className="mb-8 mt-24 md:mt-32">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-300">
            Welcome back, {user?.displayName || "User"}
          </p>
        </div>

        {/* User Info Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 border border-white/20">
          <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-300 text-sm">Name</p>
              <p className="text-lg">{user?.displayName || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-300 text-sm">Email</p>
              <p className="text-lg">{user?.email || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-8">
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {/* Registration Status */}
        {registration ? (
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">Your Registration</h2>
              <span className="px-3 py-1 bg-green-500/20 border border-green-500/50 rounded-full text-sm text-green-200">
                Registered
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-gray-300 text-sm mb-1">Registration Type</p>
                <p className="text-lg capitalize">
                  {registration.registrationType}
                </p>
              </div>
              <div>
                <p className="text-gray-300 text-sm mb-1">Name</p>
                <p className="text-lg">{registration.name}</p>
              </div>
              <div>
                <p className="text-gray-300 text-sm mb-1">Email</p>
                <p className="text-lg">{registration.email}</p>
              </div>
              <div>
                <p className="text-gray-300 text-sm mb-1">Phone</p>
                <p className="text-lg">{registration.phone}</p>
              </div>
              <div>
                <p className="text-gray-300 text-sm mb-1">Institution</p>
                <p className="text-lg">{registration.institution}</p>
              </div>
              <div>
                <p className="text-gray-300 text-sm mb-1">Department</p>
                <p className="text-lg">{registration.department}</p>
              </div>
              <div>
                <p className="text-gray-300 text-sm mb-1">Year</p>
                <p className="text-lg capitalize">{registration.year}</p>
              </div>
              <div>
                <p className="text-gray-300 text-sm mb-1">Registration Date</p>
                <p className="text-lg">
                  {registration.createdAt
                    ? new Date(registration.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
              {registration.city && (
                <div>
                  <p className="text-gray-300 text-sm mb-1">City</p>
                  <p className="text-lg">{registration.city}</p>
                </div>
              )}
              {registration.state && (
                <div>
                  <p className="text-gray-300 text-sm mb-1">State</p>
                  <p className="text-lg">{registration.state}</p>
                </div>
              )}
            </div>

            {registration.additionalInfo && (
              <div className="mb-6">
                <p className="text-gray-300 text-sm mb-1">
                  Additional Information
                </p>
                <p className="text-lg">{registration.additionalInfo}</p>
              </div>
            )}

            {/* Paper Submission Info */}
            {registration.paperId && (
              <div className="mb-6 p-4 bg-white/5 border border-white/20 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Paper Submission</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-300 text-sm mb-1">Paper ID</p>
                    <p className="text-lg font-mono">{registration.paperId}</p>
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm mb-1">Status</p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        registration.paperStatus === "approved"
                          ? "bg-green-500/20 border border-green-500/50 text-green-200"
                          : registration.paperStatus === "rejected"
                            ? "bg-red-500/20 border border-red-500/50 text-red-200"
                            : "bg-yellow-500/20 border border-yellow-500/50 text-yellow-200"
                      }`}
                    >
                      {registration.paperStatus === "approved"
                        ? "✓ Approved"
                        : registration.paperStatus === "rejected"
                          ? "✗ Not Approved"
                          : "⏳ Pending Review"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-4 flex-wrap">
              <button
                onClick={() => router.push("/dashboard/edit")}
                className="px-6 py-2 bg-white text-[#03396c] rounded-full font-medium hover:bg-gray-100 transition-colors"
              >
                Edit Registration
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-6 py-2 border border-red-500/50 text-red-200 rounded-full font-medium hover:bg-red-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deleting ? "Deleting..." : "Delete Registration"}
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20 text-center">
            <div className="mb-6">
              <svg
                className="w-16 h-16 mx-auto text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="text-2xl font-bold mb-2">No Registration Found</h3>
              <p className="text-gray-300 mb-6">
                You haven&apos;t registered for any event yet. Choose an event
                below to get started.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <button
                onClick={() => router.push("/fellowship")}
                className="p-4 bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
              >
                <h4 className="font-bold mb-2">Fellowship</h4>
                <p className="text-sm text-gray-300">
                  Register for ITC Fellowship Program
                </p>
              </button>
              <button
                onClick={() => router.push("/hackathon")}
                className="p-4 bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
              >
                <h4 className="font-bold mb-2">Hackathon</h4>
                <p className="text-sm text-gray-300">Join the ITC Hackathon</p>
              </button>
              <button
                onClick={() => router.push("/cfp")}
                className="p-4 bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
              >
                <h4 className="font-bold mb-2">Call for Papers</h4>
                <p className="text-sm text-gray-300">
                  Submit your research paper
                </p>
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
