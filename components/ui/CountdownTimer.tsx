'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

type CountdownTimerProps = {
  variant?: 'default' | 'compact' | 'desktop';
};

export default function CountdownTimer({ variant = 'default' }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2026-07-19T09:00:00").getTime();

    const updateTimer = () => {
      const now = Date.now();
      const diff = targetDate - now;

      if (diff > 0) {
        const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
        const months = Math.floor(totalDays / 30);
        const days = totalDays % 30;
        const remainingMs = diff % (1000 * 60 * 60 * 24);
        const hours = Math.floor(remainingMs / (1000 * 60 * 60));
        const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));

        setTimeLeft({
          months: Math.max(0, months),
          days: Math.max(0, days),
          hours: Math.max(0, hours),
          minutes: Math.max(0, minutes),
        });
      } else {
        setTimeLeft({ months: 0, days: 0, hours: 0, minutes: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-[300px] sm:w-[360px] md:w-[440px] lg:w-[520px] xl:w-[600px] h-[120px] sm:h-[140px] md:h-[160px] lg:h-[180px] xl:h-[200px] flex items-center justify-center font-sarpanch text-white z-30 px-4 sm:px-6 md:px-8">
      {/* Background Banner with angled ends */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/vector20.svg"
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 180px, 220px"
        />
      </div>

      {/* Timer Content */}
      <div className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-10 pb-2 pr-1 sm:pr-2 md:pr-4 xl:pr-">
        <div className="flex flex-col items-center min-w-[50px] sm:min-w-[60px] md:min-w-[80px]">
          <span className="text-[24px] leading-[1] sm:text-[28px] md:text-[36px] lg:text-[42px] xl:text-[48px] font-bold">
            {timeLeft.days}
          </span>
          <span className="text-[9px] sm:text-[10px] md:text-[11px] xl:text-[12px] tracking-wider mt-1">
            DAYS
          </span>
        </div>
        <div className="flex flex-col items-center min-w-[50px] sm:min-w-[60px] md:min-w-[70px]">
          <span className="text-[24px] leading-[1] sm:text-[28px] md:text-[36px] lg:text-[42px] xl:text-[48px] font-bold">
            {timeLeft.hours}
          </span>
          <span className="text-[9px] sm:text-[10px] md:text-[11px] xl:text-[12px] tracking-wider mt-1">
            HOURS
          </span>
        </div>
        <div className="flex flex-col items-center min-w-[50px] sm:min-w-[60px] md:min-w-[70px]">
          <span className="text-[24px] leading-[1] sm:text-[28px] md:text-[36px] lg:text-[42px] xl:text-[48px] font-bold">
            {timeLeft.minutes}
          </span>
          <span className="text-[9px] sm:text-[10px] md:text-[11px] xl:text-[12px] tracking-wider mt-1">
            MINUTES
          </span>
        </div>
        <div className="flex flex-col items-center min-w-[50px] sm:min-w-[60px] md:min-w-[70px]">
          <span className="text-[24px] leading-[1] sm:text-[28px] md:text-[36px] lg:text-[42px] xl:text-[48px] font-bold">
            {timeLeft.seconds}
          </span>
          <span className="text-[9px] sm:text-[10px] md:text-[11px] xl:text-[12px] tracking-wider mt-1">
            SECONDS
          </span>
        </div>
      </div>
    </div>
  );
}
