"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About Us" },
  { id: "timeline", label: "Timeline" },
  { id: "testimonials", label: "Testimonials" },
  { id: "faq", label: "FAQ" },
  { id: "photos", label: "Photos" },
];

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show floating nav after scrolling down a bit
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Determine active section
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className={`fixed right-8 top-1/2 -translate-y-1/2 z-40 transition-all duration-300 hidden lg:block ${
        isVisible
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-20 pointer-events-none"
      }`}
    >
      <nav className="bg-[#03396c]/95 backdrop-blur-md border-2 border-white/30 rounded-full px-3 py-4 shadow-lg">
        <ul className="flex flex-col gap-3">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => scrollToSection(section.id)}
                className="group relative flex items-center"
                aria-label={`Navigate to ${section.label}`}
              >
                {/* Dot indicator */}
                <div
                  className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                    activeSection === section.id
                      ? "bg-white border-white scale-125"
                      : "bg-transparent border-white/50 hover:border-white hover:bg-white/20"
                  }`}
                />

                {/* Label tooltip */}
                <span
                  className={`absolute right-full mr-4 px-3 py-1.5 bg-white text-[#03396c] text-sm font-semibold rounded-md whitespace-nowrap shadow-lg transition-all duration-200 ${
                    activeSection === section.id
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                  }`}
                >
                  {section.label}
                  {/* Arrow */}
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-white" />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
