"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithGoogle } from "@/lib/auth";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await signInWithGoogle();

      if (result.success) {
        // Redirect to fellowship page after successful login
        router.push("/fellowship/application");
      } else {
        setError(result.error || "Failed to sign in");
      }
    } catch (err) {
      console.error("Sign in error:", err);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#03396c] overflow-hidden relative flex items-center justify-center p-4">
      {/* Global Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-10 bg-repeat"
          style={{
            backgroundImage: `url('/images/homepage-bg.png')`,
            backgroundSize: "80px 80px",
          }}
        />

        <div className="absolute top-0 right-10 h-full w-[1px] border-r border-white/10 hidden xl:block"></div>
        <div className="absolute top-0 left-10 h-full w-[1px] border-r border-white/10 hidden xl:block"></div>
      </div>

      <div className="relative z-10 w-full max-w-[900px] h-auto md:h-[500px] bg-white rounded-[30px] flex flex-col md:flex-row shadow-2xl overflow-hidden">
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:border-r border-dashed border-gray-300 relative">
          <div className="relative w-full max-w-[300px] aspect-square">
            <Image
              src="/itc-logo.svg"
              alt="ITC India 10th Edition"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 md:p-12 text-center bg-white">
          <h1 className="text-2xl md:text-[28px] font-bold text-black mb-4">
            Get started with Fellowship
          </h1>

          <p className="text-sm md:text-base text-gray-700 mb-10">
            Kindly use the Institution Email id
          </p>

          {error && (
            <div className="w-full max-w-[320px] mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/*<button
            className="w-full max-w-[320px] py-3.5 px-6 rounded-full border border-gray-800 text-black font-medium hover:bg-gray-50 transition-colors mb-4 flex items-center justify-center gap-2 opacity-50 cursor-not-allowed"
            disabled
          >
            Continue with Email
            <span className="text-xs">(Coming Soon)</span>
          </button>*/}

          <button
            className="w-full max-w-[320px] py-3.5 px-6 rounded-full bg-black text-white font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
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
                Signing in...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </>
            )}
          </button>
        </div>
      </div>
    </main>
  );
}
