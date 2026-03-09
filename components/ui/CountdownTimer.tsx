"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2026-07-19T09:00:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        // Calculate time units
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60),
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          days: Math.max(0, days),
          hours: Math.max(0, hours),
          minutes: Math.max(0, minutes),
          seconds: Math.max(0, seconds),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-[300px] sm:w-[360px] md:w-[440px] lg:w-[520px] xl:w-[600px] h-[120px] sm:h-[140px] md:h-[160px] lg:h-[180px] xl:h-[200px] flex items-center justify-center font-sarpanch text-white z-30 px-4 sm:px-6 md:px-8">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/vector20.svg"
          alt="Timer Background"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div className="relative z-10 flex items-center justify-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 xl:gap-6 pb-2 pl-2 sm:pl-3 md:pl-4">
        <div className="flex flex-col items-center min-w-[40px] sm:min-w-[50px] md:min-w-[60px] lg:min-w-[70px]">
          <span className="text-[20px] leading-[1] sm:text-[24px] md:text-[32px] lg:text-[38px] xl:text-[42px] font-bold">
            {timeLeft.days}
          </span>
          <span className="text-[8px] sm:text-[9px] md:text-[10px] xl:text-[11px] tracking-wider mt-1">
            DAYS
          </span>
        </div>
        <div className="flex flex-col items-center min-w-[40px] sm:min-w-[50px] md:min-w-[60px] lg:min-w-[65px]">
          <span className="text-[20px] leading-[1] sm:text-[24px] md:text-[32px] lg:text-[38px] xl:text-[42px] font-bold">
            {timeLeft.hours}
          </span>
          <span className="text-[8px] sm:text-[9px] md:text-[10px] xl:text-[11px] tracking-wider mt-1">
            HOURS
          </span>
        </div>
        <div className="flex flex-col items-center min-w-[40px] sm:min-w-[50px] md:min-w-[60px] lg:min-w-[65px]">
          <span className="text-[20px] leading-[1] sm:text-[24px] md:text-[32px] lg:text-[38px] xl:text-[42px] font-bold">
            {timeLeft.minutes}
          </span>
          <span className="text-[8px] sm:text-[9px] md:text-[10px] xl:text-[11px] tracking-wider mt-1">
            MINUTES
          </span>
        </div>
        <div className="flex flex-col items-center min-w-[40px] sm:min-w-[50px] md:min-w-[60px] lg:min-w-[65px]">
          <span className="text-[20px] leading-[1] sm:text-[24px] md:text-[32px] lg:text-[38px] xl:text-[42px] font-bold">
            {timeLeft.seconds}
          </span>
          <span className="text-[8px] sm:text-[9px] md:text-[10px] xl:text-[11px] tracking-wider mt-1">
            SECONDS
          </span>
        </div>
      </div>
    </div>
  );
}
