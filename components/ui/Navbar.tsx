"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useRouter, usePathname } from "next/navigation";

const navLinks = [
  { name: "HOME", href: "/" },
  { name: "COMMITTEE", href: "/commitee" },
  {
    name: "AUTHORS",
    href: "#",
    dropdown: [
      { name: "CFP", href: "/cfp" },
      { name: "CFT", href: "/cft" },
      { name: "ART", href: "/art" },
      { name: "HACKATHON", href: "/hackathon" },
      { name: "FELLOWSHIP", href: "/fellowship" },
    ],
  },
  {
    name: "SPONSORSHIP",
    href: "#",
    dropdown: [
      { name: "Call for Sponsors", href: "/call-for-sponsors" },
      { name: "Sponsors Page", href: "/sponsors" },
    ],
  },
  { name: "CONTACT US", href: "/contact" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<
    string | null
  >(null);
  const { user, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const toggleMobileDropdown = (name: string) => {
    setActiveMobileDropdown(activeMobileDropdown === name ? null : name);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  return (
    <>
      <nav className="fixed top-7 left-1/2 -translate-x-1/2 w-fit h-[68px] border-[2px] border-white items-center justify-center gap-10 px-10 z-50 bg-[#03396c]/95 backdrop-blur-md hidden xl:flex transition-all duration-300">
        <div className="flex gap-6 xl:gap-10 h-full items-center">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="relative group h-full flex items-center"
            >
              {link.dropdown ? (
                <div className="relative h-full flex items-center cursor-pointer group">
                  <span className="font-poppins font-bold text-[16px] xl:text-[20px] text-white group-hover:text-gray-300 transition-colors flex items-center gap-1">
                    {link.name}
                    <svg
                      className="w-4 h-4 mt-0.5 transition-transform group-hover:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </span>
                  <div className="absolute top-full left-0 mt-0 w-56 bg-[#03396c]/95 border border-white/20 backdrop-blur-md rounded-b-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top pt-2">
                    <div className="flex flex-col py-2">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="px-6 py-3 text-sm text-white hover:bg-white/10 font-poppins font-medium whitespace-nowrap"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  href={link.href!}
                  className="font-poppins font-bold text-[16px] xl:text-[20px] text-white hover:text-gray-300 transition-colors"
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </div>
        {user &&
          (pathname === "/fellowship/application" ||
            pathname === "/fellowship" ||
            pathname === "/fellowship/register" ||
            pathname === "/dashboard") && (
            <div className="ml-auto flex gap-3">
              {(pathname === "/fellowship/application" ||
                pathname === "/fellowship" ||
                pathname === "/fellowship/register") && (
                <button
                  onClick={() => router.push("/dashboard")}
                  className="px-4 py-2 bg-white text-black rounded-full hover:bg-gray-100 transition-colors text-sm font-poppins font-semibold"
                >
                  Dashboard
                </button>
              )}
              <button
                onClick={handleSignOut}
                className="px-4 py-2 bg-white text-black rounded-full hover:bg-gray-100 transition-colors text-sm font-poppins font-semibold"
              >
                Sign Out
              </button>
            </div>
          )}
      </nav>

      <nav className="fixed top-0 left-0 right-0 h-[56px] sm:h-[60px] xl:hidden border-b-[2px] border-white flex items-center justify-between px-3 sm:px-4 z-50 bg-[#03396c] backdrop-blur-sm">
        <div className="relative w-[90px] h-[28px] sm:w-[100px] sm:h-[30px]">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
            <Image
              src="/images/ieee-logo.svg"
              alt="IEEE Logo"
              fill
              className="object-contain"
              priority
            />
          </Link>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <svg
            className="w-6 h-6 sm:w-7 sm:h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed top-[56px] sm:top-[60px] left-0 right-0 bg-[#03396c] border-b-[2px] border-white z-40 xl:hidden shadow-lg animate-slideDown max-h-[calc(100vh-60px)] overflow-y-auto">
          <div className="flex flex-col py-2">
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.dropdown ? (
                  <div>
                    <button
                      onClick={() => toggleMobileDropdown(link.name)}
                      className="w-full text-left font-poppins font-bold text-[16px] sm:text-[18px] text-white hover:bg-white/10 active:bg-white/20 transition-colors px-4 py-3.5 sm:py-4 border-b border-white/20 min-h-[48px] flex items-center justify-between touch-manipulation"
                    >
                      {link.name}
                      <svg
                        className={`w-5 h-5 transition-transform ${
                          activeMobileDropdown === link.name ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </button>
                    {activeMobileDropdown === link.name && (
                      <div className="bg-[#022241] border-b border-white/20">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block font-poppins font-medium text-[15px] sm:text-[17px] text-gray-200 hover:text-white hover:bg-white/10 px-8 py-3"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.href!}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-poppins font-bold text-[16px] sm:text-[18px] text-white hover:bg-white/10 active:bg-white/20 transition-colors px-4 py-3.5 sm:py-4 border-b border-white/20 min-h-[48px] flex items-center touch-manipulation"
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
