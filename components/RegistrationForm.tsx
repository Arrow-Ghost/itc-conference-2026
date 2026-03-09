"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { RegistrationDB, Registration } from "@/lib/firestore";
import { useAuth } from "@/lib/AuthContext";

interface RegistrationFormProps {
  registrationType: "fellowship" | "hackathon" | "cfp" | "cft" | "art";
  title?: string;
  description?: string;
}

export default function RegistrationForm({
  registrationType,
  title = "Register Now",
  description = "Fill in your details to register for the event",
}: RegistrationFormProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // existing registration check
  const [checkingRegistration, setCheckingRegistration] = useState(true);
  const [existingRegistration, setExistingRegistration] =
    useState<Registration | null>(null);

  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    phone: "",
    institution: "",
    department: "",
    year: "",
    additionalInfo: "",
  });

  // On mount (once user is known), check Firestore for an existing registration
  useEffect(() => {
    if (!user) {
      setCheckingRegistration(false);
      return;
    }

    let cancelled = false;

    const check = async () => {
      try {
        const existing = await RegistrationDB.findByUidAndType(
          user.uid,
          registrationType,
        );
        if (!cancelled) {
          setExistingRegistration((existing as Registration) ?? null);
        }
      } catch (err) {
        console.error("Failed to check existing registration:", err);
      } finally {
        if (!cancelled) setCheckingRegistration(false);
      }
    };

    check();
    return () => {
      cancelled = true;
    };
  }, [user, registrationType]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Validate email is institutional
    if (!formData.email.includes(".edu") && !formData.email.includes(".ac.")) {
      setError("Please use your institutional email address");
      setLoading(false);
      return;
    }

    try {
      await RegistrationDB.create({
        uid: user!.uid,
        ...formData,
        registrationType,
      });

      setSuccess(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (err) {
      console.error("Registration error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Not logged in ──────────────────────────────────────────────────────────
  if (!user) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Authentication Required
          </h2>
          <p className="text-gray-600 mb-6">
            Please sign in to register for this event.
          </p>
          <button
            onClick={() => router.push("/login")}
            className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // ── Checking Firestore ─────────────────────────────────────────────────────
  if (checkingRegistration) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
        <div className="flex flex-col items-center justify-center py-10 gap-4">
          <svg
            className="animate-spin h-10 w-10 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <p className="text-gray-500 text-sm">Checking registration status…</p>
        </div>
      </div>
    );
  }

  // ── Already registered ─────────────────────────────────────────────────────
  if (existingRegistration) {
    const reg = existingRegistration;
    const statusColor =
      reg.status === "approved"
        ? "bg-green-100 text-green-700 border-green-200"
        : reg.status === "rejected"
          ? "bg-red-100 text-red-700 border-red-200"
          : "bg-yellow-100 text-yellow-700 border-yellow-200";

    const statusLabel =
      reg.status === "approved"
        ? "Approved"
        : reg.status === "rejected"
          ? "Rejected"
          : "Pending Review";

    return (
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-shrink-0 bg-green-50 rounded-full p-3">
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
              Already Registered
            </h2>
            <p className="text-gray-500 text-sm mt-0.5">
              You have already submitted a{" "}
              <span className="font-semibold capitalize">
                {registrationType}
              </span>{" "}
              registration.
            </p>
          </div>
        </div>

        {/* Status badge */}
        <div className="mb-6">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${statusColor}`}
          >
            Status: {statusLabel}
          </span>
        </div>

        {/* Details grid */}
        <div className="divide-y divide-gray-100 border border-gray-100 rounded-lg overflow-hidden mb-6">
          {[
            { label: "Full Name", value: reg.name },
            { label: "Email", value: reg.email },
            { label: "Phone", value: reg.phone },
            { label: "Institution", value: reg.institution },
            { label: "Department", value: reg.department },
            { label: "Year of Study", value: reg.year },
            ...(reg.additionalInfo
              ? [{ label: "Additional Info", value: reg.additionalInfo }]
              : []),
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex flex-col sm:flex-row sm:items-center px-5 py-3 odd:bg-gray-50 even:bg-white"
            >
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider w-40 flex-shrink-0 mb-1 sm:mb-0">
                {label}
              </span>
              <span className="text-gray-800 text-sm">{value || "—"}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex-1 bg-black text-white py-3 px-6 rounded-full font-medium hover:bg-gray-800 transition-colors text-sm"
          >
            Go to Dashboard
          </button>
          <button
            onClick={() => router.push("/fellowship/application")}
            className="flex-1 bg-white text-black border border-gray-300 py-3 px-6 rounded-full font-medium hover:bg-gray-50 transition-colors text-sm"
          >
            View Application
          </button>
        </div>
      </div>
    );
  }

  // ── Just submitted successfully ────────────────────────────────────────────
  if (success) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
        <div className="text-center">
          <div className="mb-4">
            <svg
              className="w-16 h-16 text-green-500 mx-auto"
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Registration Successful!
          </h2>
          <p className="text-gray-600 mb-6">
            Your registration has been submitted successfully. Redirecting to
            dashboard…
          </p>
        </div>
      </div>
    );
  }

  // ── Registration form ──────────────────────────────────────────────────────
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            placeholder="Enter your full name"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Institutional Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            placeholder="your.name@university.edu"
          />
          <p className="mt-1 text-sm text-gray-500">
            Please use your institutional email address
          </p>
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            placeholder="+91-9876543210"
          />
        </div>

        {/* Institution */}
        <div>
          <label
            htmlFor="institution"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Institution/University *
          </label>
          <input
            type="text"
            id="institution"
            name="institution"
            value={formData.institution}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            placeholder="Enter your institution name"
          />
        </div>

        {/* Department */}
        <div>
          <label
            htmlFor="department"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Department/Field of Study *
          </label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            placeholder="e.g., Computer Science, Electrical Engineering"
          />
        </div>

        {/* Year */}
        <div>
          <label
            htmlFor="year"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Year of Study *
          </label>
          <select
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          >
            <option value="">Select year</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
            <option value="masters">Master&apos;s</option>
            <option value="phd">Ph.D.</option>
            <option value="postdoc">Post-Doctoral</option>
            <option value="faculty">Faculty</option>
          </select>
        </div>

        {/* Additional Info */}
        <div>
          <label
            htmlFor="additionalInfo"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Additional Information (Optional)
          </label>
          <textarea
            id="additionalInfo"
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            placeholder="Any additional information you'd like to share..."
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3.5 px-6 rounded-full font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </>
            ) : (
              "Submit Registration"
            )}
          </button>
        </div>
      </form>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>By submitting this form, you agree to our terms and conditions.</p>
      </div>
    </div>
  );
}
