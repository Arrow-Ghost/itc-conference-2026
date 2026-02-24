"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProtectedRoute } from "@/lib/useProtectedRoute";
import { getMyPapers, PaperSubmission } from "@/lib/api";

export default function MyPapersPage() {
  const { user, loading: authLoading } = useProtectedRoute();
  const router = useRouter();
  const [papers, setPapers] = useState<PaperSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && user) {
      fetchPapers();
    }
  }, [authLoading, user]);

  const fetchPapers = async () => {
    try {
      setLoading(true);
      const result = await getMyPapers();

      if (result.success) {
        setPapers(result.data || []);
      } else {
        setError(result.error || "Failed to load papers");
      }
    } catch (err) {
      console.error("Error fetching papers:", err);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500/20 border-green-500/50 text-green-200";
      case "rejected":
        return "bg-red-500/20 border-red-500/50 text-red-200";
      case "under_review":
        return "bg-blue-500/20 border-blue-500/50 text-blue-200";
      case "revision_required":
        return "bg-orange-500/20 border-orange-500/50 text-orange-200";
      default:
        return "bg-yellow-500/20 border-yellow-500/50 text-yellow-200";
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "approved":
        return "✓";
      case "rejected":
        return "✗";
      case "under_review":
        return "🔍";
      case "revision_required":
        return "✏️";
      default:
        return "⏳";
    }
  };

  const getStatusText = (status?: string) => {
    switch (status) {
      case "approved":
        return "Approved";
      case "rejected":
        return "Rejected";
      case "under_review":
        return "Under Review";
      case "revision_required":
        return "Revision Required";
      default:
        return "Pending Review";
    }
  };

  if (authLoading || loading) {
    return (
      <main className="min-h-screen bg-[#03396c] text-white flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading your papers...</p>
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
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                My Paper Submissions
              </h1>
              <p className="text-gray-300">
                Track the status of your submitted papers
              </p>
            </div>
            <button
              onClick={() => router.push("/dashboard/submit-paper")}
              className="px-6 py-2 bg-yellow-500 text-[#03396c] rounded-full font-medium hover:bg-yellow-400 transition-colors"
            >
              + Submit New Paper
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-8">
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {/* Papers List */}
        {papers.length === 0 ? (
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
              <h3 className="text-2xl font-bold mb-2">No Papers Submitted</h3>
              <p className="text-gray-300 mb-6">
                You haven&apos;t submitted any papers yet.
              </p>
              <button
                onClick={() => router.push("/dashboard/submit-paper")}
                className="px-8 py-3 bg-yellow-500 text-[#03396c] rounded-full font-bold hover:bg-yellow-400 transition-colors"
              >
                Submit Your First Paper
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {papers.map((paper) => (
              <div
                key={paper.id}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/15 transition-colors"
              >
                {/* Paper Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold">{paper.paperTitle}</h2>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-300">
                      <span className="font-mono bg-white/5 px-3 py-1 rounded-full">
                        {paper.paperId}
                      </span>
                      <span className="uppercase font-medium">
                        {paper.trackType}
                      </span>
                      {paper.paperType && (
                        <span className="capitalize">{paper.paperType}</span>
                      )}
                    </div>
                  </div>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(
                      paper.status
                    )}`}
                  >
                    {getStatusIcon(paper.status)} {getStatusText(paper.status)}
                  </span>
                </div>

                {/* Paper Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-gray-300 text-sm mb-1">Author</p>
                    <p className="font-medium">{paper.authorName}</p>
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm mb-1">Email</p>
                    <p className="font-medium">{paper.authorEmail}</p>
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm mb-1">Institution</p>
                    <p className="font-medium">{paper.authorInstitution}</p>
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm mb-1">Submitted</p>
                    <p className="font-medium">
                      {paper.submittedAt
                        ? new Date(paper.submittedAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )
                        : "N/A"}
                    </p>
                  </div>
                </div>

                {/* Abstract */}
                {paper.paperAbstract && (
                  <div className="mb-4">
                    <p className="text-gray-300 text-sm mb-1">Abstract</p>
                    <p className="text-sm line-clamp-3">
                      {paper.paperAbstract}
                    </p>
                  </div>
                )}

                {/* Keywords */}
                {paper.keywords && (
                  <div className="mb-4">
                    <p className="text-gray-300 text-sm mb-2">Keywords</p>
                    <div className="flex flex-wrap gap-2">
                      {paper.keywords.split(",").map((keyword, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm"
                        >
                          {keyword.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Co-Authors */}
                {paper.coAuthors && Array.isArray(paper.coAuthors) && paper.coAuthors.length > 0 && (
                  <div className="mb-4">
                    <p className="text-gray-300 text-sm mb-2">Co-Authors</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {paper.coAuthors.map((coAuthor, idx) => (
                        <div
                          key={idx}
                          className="p-2 bg-white/5 border border-white/10 rounded text-sm"
                        >
                          <p className="font-medium">{coAuthor.name}</p>
                          <p className="text-gray-400 text-xs">
                            {coAuthor.email}
                          </p>
                          {coAuthor.institution && (
                            <p className="text-gray-400 text-xs">
                              {coAuthor.institution}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reviewer Comments */}
                {paper.reviewerComments && (
                  <div className="mb-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <p className="text-blue-200 text-sm font-medium mb-2">
                      Reviewer Comments
                    </p>
                    <p className="text-sm text-gray-300">
                      {paper.reviewerComments}
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 flex-wrap">
                  {paper.fileUrl && (
                    <a
                      href={paper.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-white/5 border border-white/20 rounded-full text-sm font-medium hover:bg-white/10 transition-colors flex items-center gap-2"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      Download PDF
                    </a>
                  )}
                  {paper.fileName && (
                    <span className="px-4 py-2 bg-white/5 border border-white/20 rounded-full text-sm flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-red-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {paper.fileName}
                      {paper.fileSize && (
                        <span className="text-gray-400">
                          ({(paper.fileSize / 1024 / 1024).toFixed(2)} MB)
                        </span>
                      )}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
