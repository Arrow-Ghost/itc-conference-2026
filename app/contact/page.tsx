"use client";

import React from "react";
import Image from "next/image";
import { members1 } from "../commitee/data";

export default function ContactUs() {
  return (
    <main className="min-h-screen relative text-white font-poppins selection:bg-white/20 pt-[120px] pb-20 overflow-x-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none opacity-20">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 font-angkor">
          CONTACT US
        </h1>
        <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
          Have questions about ITC India 2026? Reach out to us through any of the channels below.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Info Column */}
          <div className="bg-white/5 p-8 rounded-lg border border-white/10 backdrop-blur-sm h-full">
            <h2 className="text-2xl font-bold mb-8 text-yellow-400 border-b border-white/10 pb-4">
              Get in Touch
            </h2>

            <div className="space-y-10">
              {/* Email */}
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center shrink-0 border border-blue-500/30">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Email Us</h3>
                  <p className="text-sm text-gray-400 mb-2">For general inquiries and submissions</p>
                  <a
                    href="mailto:info@itctestweekindia.org"
                    className="text-white hover:text-blue-300 transition-colors block text-lg font-medium"
                  >
                    info@itctestweekindia.org
                  </a>
                  <a
                    href="mailto:ITC-India-2026-TPC@easychair.org"
                    className="text-gray-300 hover:text-white transition-colors block mt-1 text-sm break-all"
                  >
                    ITC-India-2026-TPC@easychair.org
                  </a>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-blue-700/20 rounded-full flex items-center justify-center shrink-0 border border-blue-600/30">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">LinkedIn</h3>
                  <p className="text-sm text-gray-400 mb-2">Follow us for professional updates</p>
                  <a
                    href="https://www.linkedin.com/company/ieee-international-test-conference-india/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-300 transition-colors block font-medium"
                  >
                    IEEE International Test Conference India
                  </a>
                </div>
              </div>

              {/* Instagram */}
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-pink-600/20 rounded-full flex items-center justify-center shrink-0 border border-pink-500/30">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-pink-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Instagram</h3>
                  <p className="text-sm text-gray-400 mb-2">Check out our latest highlights</p>
                  <a
                    href="https://www.instagram.com/itctestweekindia/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-pink-300 transition-colors block font-medium"
                  >
                    @itctestweekindia
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* General Chairs Column */}
          <div className="bg-white/5 p-8 rounded-lg border border-white/10 backdrop-blur-sm h-full flex flex-col">
            <h2 className="text-2xl font-bold mb-8 text-yellow-400 border-b border-white/10 pb-4">
              General Chairs
            </h2>
            <div className="space-y-8 flex-1">
              {members1.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center gap-6 group p-4 rounded-lg hover:bg-white/5 transition-all"
                >
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-white/20 shrink-0 group-hover:border-yellow-400/50 transition-colors">
                    <Image
                      src={`/images/committee/${member.img}`}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold group-hover:text-yellow-400 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-gray-300 mb-3">{member.comp}</p>
                    <a
                      href={member.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-400 hover:text-white text-sm font-medium transition-colors bg-blue-900/30 px-3 py-1.5 rounded-full border border-blue-500/20 hover:bg-blue-600"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                      View Profile
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 text-center">
                <p className="text-gray-400 text-sm">
                    For other committee members, please visit our <a href="/commitee" className="text-yellow-400 hover:underline">Committee Page</a>.
                </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
