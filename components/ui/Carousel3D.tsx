"use client";

import { useState, useEffect, useCallback } from "react";

const carouselItems = [
  {
    stat: "300+",
    label: "SUBMISSIONS",
    detail: "17 Countries",
    bg: "from-[#f8f9fa] to-[#e9ecef]",
  },
  {
    stat: "50+",
    label: "SPEAKERS",
    detail: "Industry Leaders",
    bg: "from-[#f8f9fa] to-[#e9ecef]",
  },
  {
    stat: "1000+",
    label: "ATTENDEES",
    detail: "Global Reach",
    bg: "from-[#f8f9fa] to-[#e9ecef]",
  },
  {
    stat: "20+",
    label: "WORKSHOPS",
    detail: "Hands-on Sessions",
    bg: "from-[#f8f9fa] to-[#e9ecef]",
  },
  {
    stat: "10th",
    label: "EDITION",
    detail: "IEEE ITC India",
    bg: "from-[#f8f9fa] to-[#e9ecef]",
  },
];

export default function Carousel3D() {
  const [rotation, setRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragRotation, setDragRotation] = useState(0);

  const totalItems = carouselItems.length;
  const angleStep = 360 / totalItems;

  const autoRotate = useCallback(() => {
    if (!isHovered && !isDragging) {
      setRotation((prev) => prev - 0.3);
    }
  }, [isHovered, isDragging]);

  useEffect(() => {
    const interval = setInterval(autoRotate, 30);
    return () => clearInterval(interval);
  }, [autoRotate]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setDragRotation(rotation);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - startX;
    setRotation(dragRotation + delta * 0.4);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Radius of the cylinder — cards sit on this circle
  const radius = 280;

  return (
    <div
      className="relative w-full max-w-[480px] mx-auto xl:mx-0 xl:ml-8 select-none"
      style={{ perspective: "1000px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* Carousel container — aspect ratio keeps it proportional */}
      <div className="relative w-full aspect-[4/3] flex items-center justify-center">
        <div
          className="absolute w-[200px] sm:w-[220px] md:w-[240px] lg:w-[260px] h-full"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${rotation}deg)`,
            transition: isDragging ? "none" : undefined,
          }}
        >
          {carouselItems.map((item, index) => {
            const angle = index * angleStep;
            return (
              <div
                key={index}
                className="absolute top-1/2 left-1/2 w-[200px] sm:w-[220px] md:w-[240px] lg:w-[260px] h-[120px] sm:h-[135px] md:h-[150px] lg:h-[160px]"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${radius}px)`,
                  backfaceVisibility: "hidden",
                }}
              >
                {/* Card with curved appearance via shadow + border */}
                <div
                  className={`
                    relative w-full h-full rounded-xl overflow-hidden
                    bg-gradient-to-br ${item.bg}
                    border border-gray-200/80
                    shadow-[0_4px_24px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.9)]
                    flex flex-col items-start justify-center
                    px-5 sm:px-6 md:px-7
                    cursor-grab active:cursor-grabbing
                  `}
                >
                  {/* Subtle IEEE badge */}
                  <div className="absolute top-2.5 right-3 flex items-center gap-1 opacity-40">
                    <div className="w-[6px] h-[6px] rounded-full bg-blue-600" />
                    <span className="text-[8px] sm:text-[9px] font-semibold text-gray-500 tracking-wider">
                      IEEE
                    </span>
                  </div>

                  {/* Stat number */}
                  <span className="font-space-grotesk font-bold text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] leading-none text-[#022241] tracking-tight">
                    {item.stat}
                  </span>

                  {/* Label */}
                  <span className="font-space-grotesk font-bold text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] text-[#03396c] tracking-[0.08em] mt-1">
                    {item.label}
                  </span>

                  {/* Detail */}
                  <span className="font-poppins text-[11px] sm:text-[12px] md:text-[13px] text-gray-500 mt-1.5">
                    {item.detail}
                  </span>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#03396c] via-[#0557A7] to-[#03396c] opacity-60" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reflection / shadow underneath */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[30px] rounded-[50%] opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
