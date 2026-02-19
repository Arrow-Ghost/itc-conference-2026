"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProtectedRoute } from "@/lib/useProtectedRoute";
import {
  getMyRegistration,
  createRegistration,
  updateMyRegistration,
  Registration,
} from "@/lib/api";

import Image from "next/image";

export default function FellowshipApplication() {
  const { user, loading: authLoading } = useProtectedRoute({
    redirectTo: "/login",
  });
  const router = useRouter();

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
    if (!authLoading && user) {
      loadRegistration();
    }
  }, [authLoading, user]);

  const loadRegistration = async () => {
    try {
      setLoading(true);
      const result = await getMyRegistration();

      if (result.success && result.data) {
        setRegistration(result.data);
        setFormData({
          name: result.data.name,
          email: result.data.email,
          phone: result.data.phone,
          institution: result.data.institution,
          city: result.data.city || "",
          state: result.data.state || "",
          department: result.data.department,
          year: result.data.year,
          additionalInfo: result.data.additionalInfo || "",
        });
      } else {
        // No registration found, prefill with user data
        setFormData({
          name: user?.displayName || "",
          email: user?.email || "",
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
    } finally {
      setLoading(false);
    }
  };

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
    setSubmitting(true);

    // Validate institutional email
    if (!formData.email.includes(".edu") && !formData.email.includes(".ac.")) {
      setError("Please use your institutional email address");
      setSubmitting(false);
      return;
    }

    try {
      let result;
      if (registration) {
        // Update existing registration
        result = await updateMyRegistration({
          ...formData,
          registrationType: "fellowship",
        });
      } else {
        // Create new registration
        result = await createRegistration({
          ...formData,
          registrationType: "fellowship",
        });
      }

      if (result.success) {
        setSuccess(true);
        setRegistration(result.data || null);
        setIsEditing(false);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(result.error || "Failed to save registration");
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
      <main className="min-h-screen bg-[#03396c] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading your application...</p>
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
        {/* Vertical Grid Lines */}
        <div className="absolute top-0 right-10 h-full w-[1px] border-r border-white/10 hidden xl:block"></div>
        <div className="absolute top-0 left-10 h-full w-[1px] border-r border-white/10 hidden xl:block"></div>
      </div>

      {/* Decorative Circuit Schematic */}
      <div className="absolute top-20 right-0 w-[40%] h-[400px] z-0 pointer-events-none hidden lg:block opacity-20">
        <div className="relative w-full h-full">
          <Image
            src="/images/fellowship-schematic.png"
            alt="Circuit"
            fill
            className="object-contain object-right-top"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12 max-w-6xl">
        {/* Header */}
        <div className="mb-8 mt-24 md:mt-32">
          <h1 className="text-3xl md:text-5xl font-bold mb-2 uppercase">
            Fellowship Application
          </h1>
          <p className="text-gray-300">Welcome, {user?.displayName}</p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
            <p className="text-green-200">
              ✓ Your fellowship application has been saved successfully!
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 overflow-hidden">
          {/* Form Header */}
          <div className="bg-white/5 border-b border-white/20 p-4 md:p-6 flex justify-between items-center flex-wrap gap-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold">
                {registration
                  ? "Your Fellowship Details"
                  : "Fellowship Registration Form"}
              </h2>
              <p className="text-sm text-gray-300 mt-1">
                {registration
                  ? "Review your fellowship application details"
                  : "Complete the form below to apply for the fellowship"}
              </p>
            </div>
            {registration && !isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-white text-[#03396c] rounded-full font-medium hover:bg-gray-100 transition-colors text-sm md:text-base"
              >
                Edit Details
              </button>
            )}
          </div>

          {/* Form/Details View */}
          <div className="p-4 md:p-8">
            {!isEditing && registration ? (
              // Display Mode
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <label className="text-sm text-gray-300 block mb-1">
                      Full Name
                    </label>
                    <p className="text-lg">{registration.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-300 block mb-1">
                      Email Address
                    </label>
                    <p className="text-lg">{registration.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-300 block mb-1">
                      Phone Number
                    </label>
                    <p className="text-lg">{registration.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-300 block mb-1">
                      Institution
                    </label>
                    <p className="text-lg">{registration.institution}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-300 block mb-1">
                      City
                    </label>
                    <p className="text-lg">{registration.city || "N/A"}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-300 block mb-1">
                      State
                    </label>
                    <p className="text-lg">{registration.state || "N/A"}</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="text-sm text-gray-300 block mb-1">
                      Department
                    </label>
                    <p className="text-lg">{registration.department}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-300 block mb-1">
                      Year of Study
                    </label>
                    <p className="text-lg capitalize">{registration.year}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-300 block mb-1">
                      Registration Status
                    </label>
                    <span className="inline-block px-3 py-1 bg-green-500/20 border border-green-500/50 rounded-full text-sm text-green-200">
                      Registered
                    </span>
                  </div>
                  <div>
                    <label className="text-sm text-gray-300 block mb-1">
                      Registered On
                    </label>
                    <p className="text-lg">
                      {registration.createdAt
                        ? new Date(registration.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )
                        : "N/A"}
                    </p>
                  </div>
                </div>
                {registration.additionalInfo && (
                  <div className="md:col-span-2">
                    <label className="text-sm text-gray-300 block mb-1">
                      Additional Information
                    </label>
                    <p className="text-lg">{registration.additionalInfo}</p>
                  </div>
                )}
              </div>
            ) : (
              // Edit/Create Mode
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2"
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
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
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
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                      placeholder="your.name@university.edu"
                    />
                    <p className="mt-1 text-xs text-gray-400">
                      Use your institutional email address
                    </p>
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium mb-2"
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
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                      placeholder="+91-9876543210"
                    />
                  </div>

                  {/* Institution */}
                  <div>
                    <label
                      htmlFor="institution"
                      className="block text-sm font-medium mb-2"
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
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                      placeholder="Your institution name"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium mb-2"
                    >
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                      placeholder="Your city"
                    />
                  </div>

                  {/* State */}
                  <div>
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium mb-2"
                    >
                      State *
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                      placeholder="Your state"
                    />
                  </div>

                  {/* Department */}
                  <div>
                    <label
                      htmlFor="department"
                      className="block text-sm font-medium mb-2"
                    >
                      Department/Field *
                    </label>
                    <input
                      type="text"
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                      placeholder="Computer Science, ECE, etc."
                    />
                  </div>

                  {/* Year */}
                  <div>
                    <label
                      htmlFor="year"
                      className="block text-sm font-medium mb-2"
                    >
                      Year of Study *
                    </label>
                    <select
                      id="year"
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                    >
                      <option value="" className="bg-[#03396c]">
                        Select year
                      </option>
                      <option value="1" className="bg-[#03396c]">
                        1st Year
                      </option>
                      <option value="2" className="bg-[#03396c]">
                        2nd Year
                      </option>
                      <option value="3" className="bg-[#03396c]">
                        3rd Year
                      </option>
                      <option value="4" className="bg-[#03396c]">
                        4th Year
                      </option>
                      <option value="masters" className="bg-[#03396c]">
                        Master&apos;s
                      </option>
                      <option value="phd" className="bg-[#03396c]">
                        Ph.D.
                      </option>
                      <option value="postdoc" className="bg-[#03396c]">
                        Post-Doctoral
                      </option>
                      <option value="faculty" className="bg-[#03396c]">
                        Faculty
                      </option>
                    </select>
                  </div>
                </div>

                {/* Additional Info */}
                <div>
                  <label
                    htmlFor="additionalInfo"
                    className="block text-sm font-medium mb-2"
                  >
                    Additional Information (Optional)
                  </label>
                  <textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="Any additional information you'd like to share..."
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-4 flex-wrap pt-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-3 bg-white text-[#03396c] rounded-full font-medium hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5"
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
                        Saving...
                      </>
                    ) : (
                      <>
                        {registration
                          ? "Update Application"
                          : "Submit Application"}
                      </>
                    )}
                  </button>
                  {registration && isEditing && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({
                          name: registration.name,
                          email: registration.email,
                          phone: registration.phone,
                          institution: registration.institution,
                          city: registration.city || "",
                          state: registration.state || "",
                          department: registration.department,
                          year: registration.year,
                          additionalInfo: registration.additionalInfo || "",
                        });
                      }}
                      className="px-6 py-3 border border-white/50 rounded-full font-medium hover:bg-white/10 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Fellowship Info Section */}
        <div className="mt-8 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg p-6 md:p-8">
          <h3 className="text-2xl font-bold mb-4 uppercase">
            About the Fellowship
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm md:text-base">
            <div>
              <h4 className="font-bold mb-2 text-lg">
                Support for Local Fellows
              </h4>
              <ul className="space-y-2 text-gray-200">
                <li>• Free conference registration</li>
                <li>• Access to all technical sessions</li>
                <li>• Networking opportunities</li>
                <li>• Workshops and tutorials</li>
                <li>• Certificate of participation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2 text-lg">
                Support for Outstation Fellows
              </h4>
              <ul className="space-y-2 text-gray-200">
                <li>• All local fellow benefits</li>
                <li>• Travel allowance (as per policy)</li>
                <li>• Accommodation support</li>
                <li>• Meal vouchers</li>
                <li>• Local transportation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
