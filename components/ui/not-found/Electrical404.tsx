"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Electrical404() {
  const [sparkState, setSparkState] = useState(0);

  // Randomize spark effect loop
  useEffect(() => {
    const interval = setInterval(() => {
      setSparkState((prev) => (prev + 1) % 4);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#022241] flex flex-col items-center justify-center relative overflow-hidden text-white font-space-grotesk">
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#4a90e2 1px, transparent 1px), linear-gradient(90deg, #4a90e2 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#022241_90%)]" />

      <div className="relative z-10 flex flex-col items-center max-w-4xl px-4 text-center">
        <div className="relative flex items-center justify-center mb-8 font-sarpanch font-bold text-[120px] sm:text-[180px] md:text-[240px] leading-none tracking-tighter select-none">
          <span className="relative text-[#0557A7] drop-shadow-[0_0_15px_rgba(5,87,167,0.8)]">
            4
          </span>

          {/* The Broken 0 (Circuit Gap) */}
          <div className="relative mx-2 sm:mx-4 w-25 h-25 sm:w-40 sm:h-40 md:w-50 md:h-50 flex items-center justify-center">
            {/* Left Cable Segment */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[35%] h-3 sm:h-4 bg-gray-700 rounded-l-full shadow-lg border border-gray-600">
              <div className="w-full h-full bg-linear-to-b from-gray-500 to-gray-800 rounded-l-full opacity-80" />
            </div>

            {/* Right Cable Segment */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[35%] h-3 sm:h-4 bg-gray-700 rounded-r-full shadow-lg border border-gray-600">
              <div className="w-full h-full bg-linear-to-b from-gray-500 to-gray-800 rounded-r-full opacity-80" />
            </div>

            {/* Exposed Copper Conductors */}
            <div className="absolute left-[34%] top-1/2 -translate-y-1/2 w-[12%] h-1.5 sm:h-2 bg-[#dcae96] rounded-sm" />
            <div className="absolute right-[34%] top-1/2 -translate-y-1/2 w-[12%] h-1.5 sm:h-2 bg-[#dcae96] rounded-sm" />

            {/* Animation Container */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible">
              {/* Arcing Electricity (SVG) */}
              <div className="absolute left-[25%] right-[25%] top-1/2 h-15 -translate-y-1/2 overflow-visible">
                <svg
                  className="w-full h-full overflow-visible"
                  viewBox="0 0 100 40"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M10,20 Q30,20 50,20 T90,20"
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="opacity-90 drop-shadow-[0_0_10px_#f59e0b] animate-pulse"
                  >
                    <animate
                      attributeName="d"
                      values="M10,20 Q30,5 50,20 T90,20; M10,20 Q30,35 50,20 T90,20; M10,20 Q30,5 50,20 T90,20"
                      dur="0.15s"
                      repeatCount="indefinite"
                    />
                  </path>
                  <path
                    d="M10,20 Q40,20 60,20 T90,20"
                    fill="none"
                    stroke="#60a5fa"
                    strokeWidth="2"
                    className="opacity-70 drop-shadow-[0_0_8px_#3b82f6]"
                  >
                    <animate
                      attributeName="d"
                      values="M10,20 Q40,30 60,20 T90,20; M10,20 Q40,10 60,20 T90,20; M10,20 Q40,30 60,20 T90,20"
                      dur="0.2s"
                      repeatCount="indefinite"
                    />
                  </path>
                </svg>
              </div>

              {/* Random Sparks */}
              {sparkState % 2 === 0 && (
                <div className="absolute w-full h-full flex items-center justify-center">
                  <div className="absolute w-2 h-2 bg-yellow-300 rounded-full blur-[1px] -translate-y-4 translate-x-2 animate-ping" />
                  <div className="absolute w-1 h-1 bg-white rounded-full blur-[0.5px] translate-y-3 -translate-x-1 animate-pulse" />
                </div>
              )}
            </div>
          </div>

          {/* Second 4 */}
          <span className="relative text-[#0557A7] drop-shadow-[0_0_15px_rgba(5,87,167,0.8)]">
            4
          </span>
        </div>

        {/* Text Content */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-wide text-white animate-pulse uppercase font-sarpanch">
          System Failure
        </h1>

        <p className="text-blue-200/80 text-lg sm:text-xl mb-12 max-w-lg mx-auto leading-relaxed font-light">
          Current flow interrupted. The page you are looking for has been
          disconnected or does not exist in this circuit.
        </p>

        {/* Action Button */}
        <Link
          href="/"
          className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-white transition-all duration-200 bg-[#0557A7]/20 border border-[#0557A7] hover:bg-[#0557A7] hover:shadow-[0_0_30px_rgba(5,87,167,0.5)] hover:border-transparent rounded-sm backdrop-blur-sm"
        >
          <span className="relative flex items-center gap-3 tracking-widest text-sm sm:text-base">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Return To Home
          </span>

          {/* Button Corner Accents */}
          <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-blue-400 opacity-50 group-hover:opacity-100 transition-opacity" />
          <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-blue-400 opacity-50 group-hover:opacity-100 transition-opacity" />
        </Link>
      </div>
    </div>
  );
}
