"use client";

import RegistrationForm from "@/components/RegistrationForm";
import Image from "next/image";

export default function FellowshipRegisterPage() {
  return (
    <main className="min-h-screen relative bg-[#03396c] text-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0">
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

      <div className="absolute top-[100px] right-0 w-[40%] h-[400px] z-0 pointer-events-none hidden lg:block opacity-20">
        <div className="relative w-full h-full">
          <Image
            src="/images/fellowship-schematic.png"
            alt="Circuit Schematic"
            fill
            className="object-contain object-right-top"
            onError={(e) => {
              // Hide image if it doesn't exist
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-7xl mt-24 md:mt-32">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 uppercase tracking-tight pt-15">
            Fellowship Registration
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-6 max-w-3xl mx-auto">
            Join the ITC 2026 Fellowship Program - An initiative towards
            India&apos;s semiconductor ecosystem
          </p>
          <div className="w-24 h-1 bg-white/50 mx-auto"></div>
        </div>

        <div className="mb-12">
          <RegistrationForm
            registrationType="fellowship"
            title="Complete Your Fellowship Registration"
            description="Please fill in all required fields with your institutional details. Make sure to use your institution's email address."
          />
        </div>

        <div className="mt-16 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-6 uppercase">
            About the Fellowship
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-200">
            <div>
              <h3 className="text-xl font-bold mb-3 text-white">
                Support for Local Fellows
              </h3>
              <ul className="space-y-2 text-sm leading-relaxed">
                <li>
                  • Free conference registration and access to all sessions
                </li>
                <li>• Networking opportunities with industry experts</li>
                <li>• Access to workshops and tutorials</li>
                <li>• Certificate of participation</li>
                <li>• Career guidance and mentorship opportunities</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-white">
                Support for Outstation Fellows
              </h3>
              <ul className="space-y-2 text-sm leading-relaxed">
                <li>• All benefits of local fellows</li>
                <li>• Travel allowance (as per policy)</li>
                <li>• Accommodation support during the conference</li>
                <li>• Meal vouchers for conference days</li>
                <li>• Local transportation assistance</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-lg">
            <h3 className="text-xl font-bold mb-3 text-white">
              Eligibility Criteria
            </h3>
            <ul className="space-y-2 text-gray-200 text-sm">
              <li>
                ✓ Currently enrolled in an undergraduate or graduate program
              </li>
              <li>
                ✓ Interest in VLSI design, testing, or semiconductor technology
              </li>
              <li>✓ Valid institutional email address required</li>
              <li>✓ Commitment to attend the full conference duration</li>
            </ul>
          </div>

          <div className="mt-6 text-center text-gray-300 text-sm">
            <p>
              Have questions? Contact us at{" "}
              <a
                href="mailto:fellowship@itcindia2026.org"
                className="text-white underline hover:text-gray-100"
              >
                info@itctestweekindia.org              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
