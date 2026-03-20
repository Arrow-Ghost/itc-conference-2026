"use client";

import { useState, useEffect } from "react";
import { useProtectedRoute } from "@/lib/useProtectedRoute";
import { RegistrationDB, Registration } from "@/lib/firestore";
import { validateRegistration, sanitizeFields } from "@/lib/validation";

export default function FellowshipApplication() {
  const { user, loading: authLoading } = useProtectedRoute({
    redirectTo: "/login",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    institution: "",
    city: "",
    state: "",
    department: "",
    year: "",
    additionalInfo: "",
  });

  useEffect(() => {
    const loadRegistration = async () => {
      if (!user) return;

      try {
        setLoading(true);
        // Use Firestore directly instead of API
        const result = await RegistrationDB.findByUidAndType(
          user.uid,
          "fellowship",
        );

        if (result) {
          const data = result as Registration;
          setRegistration(data);
          setFormData({
            name: data.name,
            email: data.email,
            phone: data.phone,
            institution: data.institution,
            city: data.city || "",
            state: data.state || "",
            department: data.department,
            year: data.year,
            additionalInfo: data.additionalInfo || "",
          });
        } else {
          // No registration found, prefill with user data
          setFormData({
            name: user.displayName || "",
            email: user.email || "",
            phone: "",
            institution: "",
            city: "",
            state: "",
            department: "",
            year: "",
            additionalInfo: "",
          });
          setIsEditing(true);
        }
      } catch (err) {
        console.error("Error loading registration:", err);
        setError("Failed to load your application. Please try refreshing.");
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading && user) {
      loadRegistration();
    }
  }, [authLoading, user]);

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
    if (!user) return;

    setError(null);
    setSubmitting(true);

    // Sanitize all string fields
    const cleaned = sanitizeFields(formData);

    // Validate all fields
    const validation = validateRegistration(cleaned);
    if (!validation.valid) {
      setError(validation.error);
      setSubmitting(false);
      return;
    }

    try {
      let result;
      if (registration && registration.id) {
        // Update existing registration
        result = await RegistrationDB.update(
          registration.id,
          user.uid,
          cleaned,
        );
      } else {
        // Create new registration
        result = await RegistrationDB.create({
          uid: user.uid,
          ...cleaned,
          registrationType: "fellowship",
        });
      }

      if (result) {
        setSuccess(true);
        setRegistration(result as Registration);
        setIsEditing(false);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError("Failed to save registration");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading || loading) {
    return (
      <main className="min-h-screen bg-[#03396c] flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading your application...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#03396c] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-4xl">
        {registration && !isEditing ? (
          <div className="bg-white rounded-2xl shadow-2xl p-8">
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
                  Already Registered
                </h2>
                <p className="text-gray-500 text-sm mt-0.5">
                  You have already submitted a{" "}
                  <span className="font-semibold capitalize">Fellowship</span>{" "}
                  registration.
                </p>
              </div>
            </div>

            <div className="mb-5">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${
                  registration.status === "approved"
                    ? "bg-green-100 text-green-700 border-green-200"
                    : registration.status === "rejected"
                      ? "bg-red-100 text-red-700 border-red-200"
                      : "bg-yellow-100 text-yellow-700 border-yellow-200"
                }`}
              >
                Status:{" "}
                {registration.status === "approved"
                  ? "Approved"
                  : registration.status === "rejected"
                    ? "Rejected"
                    : "Pending Review"}
              </span>
            </div>

            <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden mb-6">
              {[
                { label: "Full Name", value: registration.name },
                { label: "Email", value: registration.email },
                { label: "Phone", value: registration.phone },
                { label: "Institution", value: registration.institution },
                { label: "Department", value: registration.department },
                { label: "Year of Study", value: registration.year },
                ...(registration.additionalInfo
                  ? [
                      {
                        label: "Additional Info",
                        value: registration.additionalInfo,
                      },
                    ]
                  : []),
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex flex-col sm:flex-row sm:items-center px-5 py-3 odd:bg-gray-50 even:bg-white"
                >
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider w-40 shrink-0 mb-1 sm:mb-0">
                    {label}
                  </span>
                  <span className="text-gray-800 text-sm">{value || "—"}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setIsEditing(true)}
                className="flex-1 bg-black text-white py-3 px-6 rounded-full font-medium hover:bg-gray-800 transition-colors text-sm"
              >
                Edit Application
              </button>
              <button
                onClick={() => window.history.back()}
                className="flex-1 bg-white text-black border border-gray-300 py-3 px-6 rounded-full font-medium hover:bg-gray-50 transition-colors text-sm"
              >
                Go Back
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {registration ? "Edit Application" : "Fellowship Application"}
              </h2>
              <p className="text-gray-500 text-sm">
                Please fill out the details below to apply for the fellowship.
              </p>
            </div>

            {error && (
              <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-5 p-4 bg-green-50 border border-green-200 rounded-xl text-green-600 text-sm">
                Application saved successfully!
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    maxLength={200}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    maxLength={254}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm"
                    placeholder="john@university.edu"
                  />
                  <p className="mt-1 text-xs text-gray-400">
                    Use your institutional email (.edu or .ac.*)
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    maxLength={20}
                    pattern="[\d\s\-+()]{7,20}"
                    title="Enter a valid phone number (7–20 characters, digits/spaces/dashes)"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Institution / University *
                  </label>
                  <input
                    type="text"
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    required
                    maxLength={300}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm"
                    placeholder="University Name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    maxLength={100}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    State / Province
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    maxLength={100}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm"
                    placeholder="State"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Department / Major *
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                    maxLength={200}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm"
                    placeholder="Computer Science"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Year of Study *
                  </label>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm"
                  >
                    <option value="" disabled>
                      Select Year
                    </option>
                    <option value="Undergraduate - 1st Year">
                      Undergraduate - 1st Year
                    </option>
                    <option value="Undergraduate - 2nd Year">
                      Undergraduate - 2nd Year
                    </option>
                    <option value="Undergraduate - 3rd Year">
                      Undergraduate - 3rd Year
                    </option>
                    <option value="Undergraduate - 4th Year">
                      Undergraduate - 4th Year
                    </option>
                    <option value="Master's Student">
                      Master&apos;s Student
                    </option>
                    <option value="PhD Student">PhD Student</option>
                    <option value="Postdoc">Postdoc</option>
                    <option value="Faculty">Faculty</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Why are you interested in this fellowship? (Optional)
                </label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  rows={4}
                  maxLength={2000}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm resize-none"
                  placeholder="Tell us about your research interests..."
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-black text-white py-3 px-6 rounded-full font-medium hover:bg-gray-800 transition-colors text-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4 text-white"
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
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </button>
                {isEditing && registration && (
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-white text-black border border-gray-300 py-3 px-6 rounded-full font-medium hover:bg-gray-50 transition-colors text-sm"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
