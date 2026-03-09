"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProtectedRoute } from "@/lib/useProtectedRoute";
import { RegistrationDB, Registration } from "@/lib/firestore";
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
      const result = await RegistrationDB.findByUidAndType(user!.uid);
      if (Array.isArray(result)) {
        setRegistration(result.length > 0 ? result[0] : null);
      } else if (result) {
        setRegistration(result as Registration);
      } else {
        setRegistration(null);
      }
    } catch (err) {
      console.error("Error fetching registration:", err);
      setError("Failed to load registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!registration?.id) return;
    if (
      !confirm(
        "Are you sure you want to delete your registration? This action cannot be undone.",
      )
    )
      return;

    try {
      setDeleting(true);
      await RegistrationDB.delete(registration.id, user!.uid);
      setRegistration(null);
    } catch (err) {
      console.error("Error deleting registration:", err);
      setError("Failed to delete registration. Please try again.");
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
      <main className="min-h-screen bg-[#03396c] flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4" />
          <p>Loading your dashboard...</p>
        </div>
      </main>
    );
  }

  const statusColor =
    registration?.status === "approved"
      ? "bg-green-100 text-green-700 border-green-200"
      : registration?.status === "rejected"
        ? "bg-red-100 text-red-700 border-red-200"
        : "bg-yellow-100 text-yellow-700 border-yellow-200";

  const statusLabel =
    registration?.status === "approved"
      ? "Approved"
      : registration?.status === "rejected"
        ? "Rejected"
        : "Pending Review";

  const registrationRows = registration
    ? [
        { label: "Type", value: registration.registrationType },
        { label: "Full Name", value: registration.name },
        { label: "Email", value: registration.email },
        { label: "Phone", value: registration.phone },
        { label: "Institution", value: registration.institution },
        { label: "Department", value: registration.department },
        { label: "Year of Study", value: registration.year },
        ...(registration.city
          ? [{ label: "City", value: registration.city }]
          : []),
        ...(registration.state
          ? [{ label: "State", value: registration.state }]
          : []),
        ...(registration.additionalInfo
          ? [{ label: "Additional Info", value: registration.additionalInfo }]
          : []),
      ]
    : [];

  return (
    <main className="min-h-screen bg-[#03396c] px-4 py-16 flex flex-col items-center">
      <div className="w-full max-w-4xl space-y-6 mt-16">
        {/* Profile card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="flex items-center gap-4 mb-6">
            {user?.photoURL ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-14 h-14 rounded-full border-2 border-gray-100"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-2xl font-bold text-gray-400">
                {user?.displayName?.[0] ?? "U"}
              </div>
            )}
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {user?.displayName || "User"}
              </h1>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>

          <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center px-5 py-3 bg-gray-50">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider w-40 shrink-0 mb-1 sm:mb-0">
                Name
              </span>
              <span className="text-gray-800 text-sm">
                {user?.displayName || "—"}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center px-5 py-3 bg-white">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider w-40 shrink-0 mb-1 sm:mb-0">
                Email
              </span>
              <span className="text-gray-800 text-sm">
                {user?.email || "—"}
              </span>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="w-full sm:w-auto bg-white text-black border border-gray-300 py-2.5 px-6 rounded-full font-medium hover:bg-gray-50 transition-colors text-sm"
          >
            Sign Out
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-white rounded-2xl shadow-2xl p-5 border-l-4 border-red-500">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Registration card */}
        {registration ? (
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-shrink-0 bg-green-50 rounded-full p-2">
                <svg
                  className="w-7 h-7 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Your Registration
                </h2>
                <p className="text-gray-500 text-sm mt-0.5">
                  You are registered for the{" "}
                  <span className="font-semibold capitalize">
                    {registration.registrationType}
                  </span>{" "}
                  program.
                </p>
              </div>
            </div>

            {/* Status badge */}
            <div className="mb-5">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${statusColor}`}
              >
                Status: {statusLabel}
              </span>
            </div>

            {/* Details table */}
            <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden mb-6">
              {registrationRows.map(({ label, value }) => (
                <div
                  key={label}
                  className="flex flex-col sm:flex-row sm:items-center px-5 py-3 odd:bg-gray-50 even:bg-white"
                >
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider w-40 shrink-0 mb-1 sm:mb-0">
                    {label}
                  </span>
                  <span className="text-gray-800 text-sm capitalize">
                    {value || "—"}
                  </span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => router.push("/fellowship/application")}
                className="flex-1 bg-black text-white py-3 px-6 rounded-full font-medium hover:bg-gray-800 transition-colors text-sm text-center"
              >
                Edit Registration
              </button>
              <a
                href="https://easychair.org/my/conference?conf=itcindia2026"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-white text-black border border-gray-300 py-3 px-6 rounded-full font-medium hover:bg-gray-50 transition-colors text-sm text-center"
              >
                📄 Submit Paper
              </a>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 bg-white text-red-600 border border-red-200 py-3 px-6 rounded-full font-medium hover:bg-red-50 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ) : (
          /* No registration card */
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-shrink-0 bg-gray-100 rounded-full p-2">
                <svg
                  className="w-7 h-7 text-gray-400"
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
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  No Registration Found
                </h2>
                <p className="text-gray-500 text-sm mt-0.5">
                  You haven&apos;t registered for any event yet.
                </p>
              </div>
            </div>

            <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden mb-6">
              <div
                onClick={() => router.push("/fellowship/register")}
                className="flex items-center justify-between px-5 py-4 odd:bg-gray-50 even:bg-white hover:bg-blue-50 cursor-pointer transition-colors group"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-700">
                    Fellowship
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Register for ITC Fellowship Program
                  </p>
                </div>
                <svg
                  className="w-4 h-4 text-gray-300 group-hover:text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
              <div
                onClick={() => router.push("/hackathon")}
                className="flex items-center justify-between px-5 py-4 odd:bg-gray-50 even:bg-white hover:bg-blue-50 cursor-pointer transition-colors group"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-700">
                    Hackathon
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Join the ITC Hackathon
                  </p>
                </div>
                <svg
                  className="w-4 h-4 text-gray-300 group-hover:text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
              <a
                href="https://easychair.org/my/conference?conf=itcindia2026"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-5 py-4 odd:bg-gray-50 even:bg-white hover:bg-yellow-50 cursor-pointer transition-colors group"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-800 group-hover:text-yellow-700">
                    Submit Paper
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Submit via EasyChair
                  </p>
                </div>
                <svg
                  className="w-4 h-4 text-gray-300 group-hover:text-yellow-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
