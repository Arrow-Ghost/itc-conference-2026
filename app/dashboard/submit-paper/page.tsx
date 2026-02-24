"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProtectedRoute } from "@/lib/useProtectedRoute";
import { submitPaper, getMyRegistration, CoAuthor } from "@/lib/api";

export default function SubmitPaperPage() {
  const { user, loading: authLoading } = useProtectedRoute();
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState({
    authorName: "",
    authorEmail: "",
    authorPhone: "",
    authorInstitution: "",
    authorDepartment: "",
    paperTitle: "",
    paperAbstract: "",
    keywords: "",
    paperType: "full" as "full" | "poster" | "extended_abstract",
    trackType: "cfp" as "cfp" | "art" | "cft",
  });

  const [coAuthors, setCoAuthors] = useState<CoAuthor[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [registrationId, setRegistrationId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [paperId, setPaperId] = useState<string | null>(null);

  // Load user data and registration
  useEffect(() => {
    if (!authLoading && user) {
      // Pre-fill user data
      setFormData((prev) => ({
        ...prev,
        authorName: user.displayName || "",
        authorEmail: user.email || "",
      }));

      // Try to load existing registration
      loadRegistration();
    }
  }, [authLoading, user]);

  const loadRegistration = async () => {
    try {
      const result = await getMyRegistration();
      if (result.success && result.data) {
        setRegistrationId(parseInt(result.data.id || "0"));
        setFormData((prev) => ({
          ...prev,
          authorName: result.data!.name,
          authorEmail: result.data!.email,
          authorPhone: result.data!.phone,
          authorInstitution: result.data!.institution,
          authorDepartment: result.data!.department,
        }));
      }
    } catch (err) {
      console.error("Error loading registration:", err);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      if (selectedFile.type !== "application/pdf") {
        setError("Only PDF files are allowed");
        setFile(null);
        return;
      }

      // Validate file size (max 10MB)
      const maxSize = 10 * 1024 * 1024;
      if (selectedFile.size > maxSize) {
        setError("File size must be less than 10MB");
        setFile(null);
        return;
      }

      setFile(selectedFile);
      setError(null);
    }
  };

  const addCoAuthor = () => {
    setCoAuthors([...coAuthors, { name: "", email: "", institution: "" }]);
  };

  const removeCoAuthor = (index: number) => {
    setCoAuthors(coAuthors.filter((_, i) => i !== index));
  };

  const updateCoAuthor = (
    index: number,
    field: keyof CoAuthor,
    value: string
  ) => {
    const updated = [...coAuthors];
    updated[index][field] = value;
    setCoAuthors(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Validation
    if (!formData.authorName.trim()) {
      setError("Author name is required");
      return;
    }

    if (!formData.authorEmail.trim()) {
      setError("Author email is required");
      return;
    }

    if (!formData.authorPhone.trim()) {
      setError("Author phone is required");
      return;
    }

    if (!formData.authorInstitution.trim()) {
      setError("Institution is required");
      return;
    }

    if (!formData.authorDepartment.trim()) {
      setError("Department is required");
      return;
    }

    if (!formData.paperTitle.trim()) {
      setError("Paper title is required");
      return;
    }

    if (!formData.paperAbstract.trim()) {
      setError("Paper abstract is required");
      return;
    }

    if (!file) {
      setError("Please upload a PDF file");
      return;
    }

    // Validate co-authors
    const validCoAuthors = coAuthors.filter(
      (ca) => ca.name.trim() && ca.email.trim()
    );

    try {
      setSubmitting(true);

      const result = await submitPaper(
        {
          ...formData,
          coAuthors: validCoAuthors.length > 0 ? validCoAuthors : undefined,
          registrationId: registrationId || undefined,
        },
        file
      );

      if (result.success) {
        setSuccess(true);
        setPaperId(result.data?.paperId || null);
        // Reset form
        setFile(null);
        setTimeout(() => {
          router.push("/dashboard");
        }, 3000);
      } else {
        setError(result.error || "Failed to submit paper");
      }
    } catch (err) {
      console.error("Error submitting paper:", err);
      setError("An unexpected error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <main className="min-h-screen bg-[#03396c] text-white flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </main>
    );
  }

  if (success) {
    return (
      <main className="min-h-screen bg-[#03396c] text-white flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20 text-center">
          <div className="mb-6">
            <svg
              className="w-20 h-20 mx-auto text-green-400 mb-4"
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
            <h2 className="text-3xl font-bold mb-2">Paper Submitted Successfully!</h2>
            {paperId && (
              <div className="mt-4 p-4 bg-white/5 border border-white/20 rounded-lg">
                <p className="text-gray-300 text-sm mb-2">Your Paper ID</p>
                <p className="text-2xl font-mono font-bold text-yellow-400">
                  {paperId}
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Please save this ID for future reference
                </p>
              </div>
            )}
            <p className="text-gray-300 mt-6">
              Redirecting to dashboard in a moment...
            </p>
          </div>
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

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-5xl">
        {/* Header */}
        <div className="mb-8 mt-24 md:mt-32">
          <button
            onClick={() => router.push("/dashboard")}
            className="mb-4 text-gray-300 hover:text-white flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Dashboard
          </button>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Submit Your Paper
          </h1>
          <p className="text-gray-300">
            Upload your research paper in PDF format with complete author details
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6">
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {/* Submission Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Track Selection */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h2 className="text-2xl font-bold mb-4">Track & Paper Type</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Track Type <span className="text-red-400">*</span>
                </label>
                <select
                  name="trackType"
                  value={formData.trackType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white"
                >
                  <option value="cfp">Call for Papers (CFP)</option>
                  <option value="art">Academia Research Track (ART)</option>
                  <option value="cft">Call for Tutorials (CFT)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Paper Type
                </label>
                <select
                  name="paperType"
                  value={formData.paperType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white"
                >
                  <option value="full">Full Paper (4-6 pages)</option>
                  <option value="poster">Poster (1-6 pages)</option>
                  <option value="extended_abstract">
                    Extended Abstract (up to 4 pages)
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Author Details */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h2 className="text-2xl font-bold mb-4">Author Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="authorName"
                  value={formData.authorName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white placeholder-gray-400"
                  placeholder="Dr. John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  name="authorEmail"
                  value={formData.authorEmail}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white placeholder-gray-400"
                  placeholder="john.doe@university.edu"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Phone <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  name="authorPhone"
                  value={formData.authorPhone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white placeholder-gray-400"
                  placeholder="+1 234 567 8900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Institution <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="authorInstitution"
                  value={formData.authorInstitution}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white placeholder-gray-400"
                  placeholder="University Name"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">
                  Department <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="authorDepartment"
                  value={formData.authorDepartment}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white placeholder-gray-400"
                  placeholder="Department of Computer Science"
                />
              </div>
            </div>
          </div>

          {/* Co-Authors */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Co-Authors (Optional)</h2>
              <button
                type="button"
                onClick={addCoAuthor}
                className="px-4 py-2 bg-yellow-500 text-[#03396c] rounded-full font-medium hover:bg-yellow-400 transition-colors text-sm"
              >
                + Add Co-Author
              </button>
            </div>

            {coAuthors.length === 0 ? (
              <p className="text-gray-400 text-sm">
                No co-authors added. Click the button above to add co-authors.
              </p>
            ) : (
              <div className="space-y-4">
                {coAuthors.map((coAuthor, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white/5 border border-white/10 rounded-lg"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-medium">Co-Author {index + 1}</h3>
                      <button
                        type="button"
                        onClick={() => removeCoAuthor(index)}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <input
                        type="text"
                        value={coAuthor.name}
                        onChange={(e) =>
                          updateCoAuthor(index, "name", e.target.value)
                        }
                        placeholder="Name"
                        className="px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white placeholder-gray-400 text-sm"
                      />
                      <input
                        type="email"
                        value={coAuthor.email}
                        onChange={(e) =>
                          updateCoAuthor(index, "email", e.target.value)
                        }
                        placeholder="Email"
                        className="px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white placeholder-gray-400 text-sm"
                      />
                      <input
                        type="text"
                        value={coAuthor.institution}
                        onChange={(e) =>
                          updateCoAuthor(index, "institution", e.target.value)
                        }
                        placeholder="Institution"
                        className="px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white placeholder-gray-400 text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Paper Details */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h2 className="text-2xl font-bold mb-4">Paper Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Paper Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="paperTitle"
                  value={formData.paperTitle}
                  onChange={handleInputChange}
                  required
                  maxLength={500}
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white placeholder-gray-400"
                  placeholder="Enter your paper title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Abstract <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="paperAbstract"
                  value={formData.paperAbstract}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white placeholder-gray-400 resize-none"
                  placeholder="Enter your paper abstract (100-300 words)"
                />
                <p className="text-xs text-gray-400 mt-1">
                  {formData.paperAbstract.length} characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Keywords (comma-separated)
                </label>
                <input
                  type="text"
                  name="keywords"
                  value={formData.keywords}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white placeholder-gray-400"
                  placeholder="VLSI, Testing, Machine Learning, etc."
                />
              </div>
            </div>
          </div>

          {/* File Upload */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h2 className="text-2xl font-bold mb-4">Upload Paper (PDF)</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  PDF File <span className="text-red-400">*</span>
                </label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  required
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-500 file:text-[#03396c] hover:file:bg-yellow-400 file:cursor-pointer"
                />
                <p className="text-xs text-gray-400 mt-2">
                  • PDF format only
                  <br />
                  • Maximum file size: 10MB
                  <br />• Follow IEEE standard two-column format
                </p>
              </div>

              {file && (
                <div className="p-4 bg-white/5 border border-white/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-8 h-8 text-red-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="flex-1">
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-gray-400">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFile(null)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={submitting || !file}
              className="flex-1 px-8 py-3 bg-yellow-500 text-[#03396c] rounded-full font-bold hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
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
                </span>
              ) : (
                "Submit Paper"
              )}
            </button>
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="px-8 py-3 border border-white/20 rounded-full font-bold hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
