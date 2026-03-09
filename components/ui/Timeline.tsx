"use client";

import { useState } from "react";
import Image from "next/image";

const dayDetails = {
  1: {
    title: "DAY 1 - Inauguration & Ideation",
    events: [
      { time: "09:00 AM", event: "Registration & Welcome Kit Distribution" },
      { time: "10:00 AM", event: "Inaugural Ceremony" },
      { time: "11:00 AM", event: "Team Formation & Idea Pitching" },
      { time: "12:00 PM", event: "Hackathon Begins" },
      { time: "02:00 PM", event: "Mentor Session 1" },
      { time: "04:00 PM", event: "Workshop: AI/ML Basics" },
      { time: "06:00 PM", event: "Progress Check 1" },
      { time: "08:00 PM", event: "Dinner & Networking" },
    ],
  },
  2: {
    title: "DAY 2 - Development & Refinement",
    events: [
      { time: "09:00 AM", event: "Morning Session Begins" },
      { time: "11:00 AM", event: "Mentor Session 2" },
      { time: "01:00 PM", event: "Lunch Break" },
      { time: "02:00 PM", event: "Progress Check 2" },
      { time: "04:00 PM", event: "Workshop: Pitching Tips" },
      { time: "06:00 PM", event: "Mid-term Evaluation" },
      { time: "08:00 PM", event: "Dinner & Code Review" },
    ],
  },
  3: {
    title: "DAY 3 - Finalization & Presentation",
    events: [
      { time: "09:00 AM", event: "Final Development Sprint" },
      { time: "12:00 PM", event: "Code Freeze" },
      { time: "01:00 PM", event: "Lunch Break" },
      { time: "02:00 PM", event: "Practice Sessions" },
      { time: "04:00 PM", event: "Final Presentations" },
      { time: "06:00 PM", event: "Judging & Evaluation" },
      { time: "08:00 PM", event: "Awards & Closing Ceremony" },
    ],
  },
};

export default function Timeline() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  return (
    <section
      id="timeline"
      className={`relative w-full flex flex-col pt-8 sm:pt-10 md:pt-12 lg:pt-14 xl:pt-16 pb-8 sm:pb-10 md:pb-12 overflow-x-hidden ${contentPadding}`}
    >
      <div className="absolute top-0 left-[5%] sm:left-[4%] md:left-[3%] lg:left-[2.5%] xl:left-[2.25%] right-[5%] sm:right-[4%] md:right-[3%] lg:right-[2.5%] xl:right-[2.25%] h-[60px] sm:h-[80px] md:h-[100px] lg:h-[110px] xl:h-[123px] pointer-events-none -z-10 opacity-60 sm:opacity-70 md:opacity-80">
        <Image
          src="/images/vector11.svg"
          alt="Zig-zag Line"
          fill
          className="object-contain object-top"
        />
      </div>

      <h2 className="font-angkor text-[28px] leading-[1.1] sm:text-[40px] md:text-[50px] lg:text-[60px] xl:text-[75px] text-white mb-4 sm:mb-8 md:mb-12 xl:mb-20 relative xl:absolute top-0 sm:top-[25px] md:top-[20px] left-0 sm:left-[9%] md:left-[7%] xl:left-[10%] z-10 text-left xl:text-left w-full xl:w-auto">
        TIMELINE
      </h2>

      <div className="relative w-full max-w-[1360px] flex flex-col items-center mt-0 sm:mt-12 md:mt-16 xl:mt-0">
        <div className="absolute top-[60px] sm:top-[70px] md:top-[80px] xl:top-[90px] left-0 w-full h-[250px] sm:h-[300px] md:h-[320px] xl:h-[480px] z-0 pointer-events-none opacity-50">
          <Image
            src="/images/vector12.svg"
            alt="Timeline Path"
            fill
            className="object-contain"
          />
        </div>

        {/* Day 1 */}
        <div className="relative z-10 w-full max-w-full flex justify-center items-center mb-6 sm:mb-12 cursor-pointer" onClick={() => setSelectedDay(1)}>
          <div className="relative w-full max-w-[90%] sm:max-w-[450px] md:max-w-[500px] xl:max-w-[525px] aspect-[525/175] h-auto hover:scale-105 transition-transform duration-300">
            <Image
              src="/images/timeline-card1.svg"
              alt="Day 1 Event"
              fill
              className="object-contain"
            />
          </div>
          <div className="hidden sm:block absolute left-[5%] sm:left-[8%] md:left-[10%] xl:left-[10%] text-white font-roboto-slab font-extrabold text-[16px] sm:text-[24px] md:text-[32px] xl:text-[40px]">
            DAY 1
          </div>
        </div>

        <div className="relative z-10 w-full max-w-full flex justify-center items-center mb-6 sm:mb-12 cursor-pointer" onClick={() => setSelectedDay(2)}>
          <div className="relative w-full max-w-[90%] sm:max-w-[450px] md:max-w-[500px] xl:max-w-[525px] aspect-[525/175] h-auto rotate-180 hover:scale-105 transition-transform duration-300">
            <Image
              src="/images/timeline-card2.svg"
              alt="Day 2 Event"
              fill
              className="object-contain"
            />
          </div>
          <div className="hidden sm:block absolute right-[5%] sm:right-[8%] md:right-[10%] xl:right-[10%] text-white font-roboto-slab font-extrabold text-[16px] sm:text-[24px] md:text-[32px] xl:text-[40px]">
            DAY 2
          </div>
        </div>

        <div className="relative z-10 w-full max-w-full flex justify-center items-center cursor-pointer" onClick={() => setSelectedDay(3)}>
          <div className="relative w-full max-w-[90%] sm:max-w-[450px] md:max-w-[500px] xl:max-w-[525px] aspect-[525/175] h-auto hover:scale-105 transition-transform duration-300">
            <Image
              src="/images/timeline-card3.svg"
              alt="Day 3 Event"
              fill
              className="object-contain"
            />
          </div>
          <div className="hidden sm:block absolute left-[5%] sm:left-[8%] md:left-[10%] xl:left-[10%] text-white font-roboto-slab font-extrabold text-[16px] sm:text-[24px] md:text-[32px] xl:text-[40px]">
            DAY 3
          </div>
        </div>
      </div>

      {/* Day Details Popup */}
      {selectedDay && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedDay(null)}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div
            className="relative animate-expand-popup"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cylinder shape popup */}
            <div className="relative flex items-center">
              {/* Ellipse (cylinder end) */}
              <div className="w-8 h-16 sm:w-10 sm:h-20 md:w-12 md:h-24 lg:w-14 lg:h-28 xl:w-16 xl:h-32 rounded-full bg-gradient-to-b from-[#6366f1] via-[#4f46e5] to-[#3730a3] border-2 border-[#818cf8] flex-shrink-0 hidden sm:block" />
              
              {/* Rectangle body */}
              <div className="bg-gradient-to-b from-[#1e1b4b] via-[#312e81] to-[#1e1b4b] border-2 border-[#818cf8] rounded-r-2xl p-4 sm:p-6 md:p-8 max-w-[90%] sm:max-w-[450px] md:max-w-[500px] lg:max-w-[550px] max-h-[70vh] overflow-y-auto ml-0 sm:ml-[-8px]">
                <button
                  onClick={() => setSelectedDay(null)}
                  className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white hover:text-red-400 text-xl sm:text-2xl font-bold"
                >
                  ×
                </button>
                <h3 className="text-white font-roboto-slab font-bold text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6 text-center pr-6 sm:pr-8">
                  {dayDetails[selectedDay as keyof typeof dayDetails].title}
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  {dayDetails[selectedDay as keyof typeof dayDetails].events.map((item, index) => (
                    <div key={index} className="flex gap-3 sm:gap-4 border-b border-[#6366f1]/50 pb-2 sm:pb-3">
                      <span className="text-cyan-400 font-mono font-bold text-xs sm:text-sm min-w-[70px] sm:min-w-[80px]">
                        {item.time}
                      </span>
                      <span className="text-white font-roboto-slab text-xs sm:text-sm">
                        {item.event}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes expand-popup {
          0% {
            opacity: 0;
            transform: scale(0.5) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-expand-popup {
          animation: expand-popup 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
