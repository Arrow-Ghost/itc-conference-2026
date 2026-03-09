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
    const targetDate = new Date('2026-07-19T00:00:00').getTime();

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

  const segments = [
    { value: timeLeft.months, label: 'MONTHS' },
    { value: timeLeft.days, label: 'DAYS' },
    { value: timeLeft.hours, label: 'HOURS' },
    { value: timeLeft.minutes, label: 'MINUTES' },
  ];

  // Desktop: fills zig-zag gap, uses fluid typography so it always fits
  if (variant === 'desktop') {
    return (
      <div
        className="relative w-full h-full min-w-0 min-h-0 flex items-center justify-center overflow-hidden font-sarpanch text-white"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 15.5% 100%, 0 0)' }}
      >
        <div
          className="absolute inset-0 -inset-[2px] bg-gradient-to-r from-[#022241] to-[#0557A7]"
          aria-hidden
        />
        <div
          className="relative z-10 flex items-center justify-center w-full h-full px-2"
          style={{ gap: 'clamp(20px, 3.5vw, 56px)', maxWidth: '100%' }}
        >
          {segments.map(({ value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center text-center min-w-0 flex-shrink"
            >
              <span
                className="font-bold leading-none"
                style={{ fontSize: 'clamp(24px, 3.5vw, 68px)' }}
              >
                {value}
              </span>
              <span
                className="tracking-wider mt-0.5"
                style={{ fontSize: 'clamp(6px, 0.8vw, 12px)' }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Compact: for tablet layout (640–949px), fluid typography for better scaling
  if (variant === 'compact') {
    return (
      <div className="relative w-full max-w-full min-w-0 h-[80px] sm:h-[90px] md:h-[100px] flex items-center justify-center overflow-hidden font-sarpanch text-white">
        <Image
          src="/images/vector20.svg"
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 180px, 220px"
        />
        <div
          className="relative z-10 flex items-center justify-center w-full h-full px-3"
          style={{ gap: 'clamp(16px, 2.8vw, 36px)' }}
        >
          {segments.map(({ value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center text-center min-w-0 flex-shrink"
            >
              <span
                className="font-bold leading-none"
                style={{ fontSize: 'clamp(24px, 3.5vw, 44px)' }}
              >
                {value}
              </span>
              <span
                className="tracking-wider mt-0.5"
                style={{ fontSize: 'clamp(6px, 0.9vw, 10px)' }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default: standalone (e.g. for reuse elsewhere)
  return (
    <div className="relative w-[140px] sm:w-[180px] md:w-[220px] h-[100px] sm:h-[140px] md:h-[180px] flex items-center justify-center overflow-hidden font-sarpanch text-white">
      <Image src="/images/vector20.svg" alt="" fill className="object-cover" sizes="220px" />
      <div className="relative z-10 flex items-center justify-center gap-6 sm:gap-10 w-full h-full px-3">
        {segments.map(({ value, label }) => (
          <div
            key={label}
            className="flex flex-col items-center justify-center text-center min-w-[40px] sm:min-w-[50px]"
          >
            <span className="text-[28px] sm:text-[38px] md:text-[48px] font-bold leading-none">
              {value}
            </span>
            <span className="text-[8px] sm:text-[9px] md:text-[10px] tracking-wider mt-0.5">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
