"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const photos = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

export default function Photos() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = photos.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, 4000); // 4 seconds

    return () => clearInterval(interval);
  }, [totalSlides]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  return (
    <section
      id="photos"
      className="relative w-full mt-0 sm:mt-0 pt-4 sm:pt-10 md:pt-12 lg:pt-20 pb-8 sm:pb-12 md:pb-16 px-[5%] sm:px-4 md:px-6 lg:px-8 xl:px-[86px] flex flex-col items-center overflow-x-hidden"
    >
      <div className="absolute top-0 left-[5%] sm:left-[4%] md:left-[3%] lg:left-[2.5%] xl:left-[2.25%] right-[5%] sm:right-[4%] md:right-[3%] lg:right-[2.5%] xl:right-[2.25%] h-[50px] sm:h-[60px] md:h-[70px] lg:h-[80px] xl:h-[100px] my-6 sm:my-8 md:my-10 pointer-events-none -z-10 opacity-60 sm:opacity-70 md:opacity-80">
        <div className="absolute inset-0 w-full h-full rotate-180 scale-y-[-1] scale-x-[-1]">
          <Image
            src="/images/vector11.svg"
            alt="Separator"
            fill
            className="object-contain"
          />
        </div>
      </div>

      <h2 className="font-angkor text-[24px] leading-[1.1] sm:text-[28px] md:text-[32px] lg:text-[38px] xl:text-[44px] 2xl:text-[50px] text-white mb-2 sm:mb-4 md:mb-6 xl:mb-8 2xl:mb-12 relative xl:absolute top-0 md:top-0 xl:top-[40px] 2xl:top-[50px] xl:right-[5%] z-10 text-center md:text-right w-full xl:w-auto whitespace-nowrap pr-2 ">
        PHOTOS SECTION
      </h2>

      <div className="relative w-full max-w-[1400px] overflow-hidden mx-auto pt-2 sm:pt-6 md:pt-8 xl:pt-[90px] 2xl:pt-[110px] mb-0">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {photos.map((photo, index) => (
            <div
              key={`${photo.id}-${index}`}
              className="relative flex-shrink-0 w-full flex justify-center px-2"
            >
              <div className="w-[90%] sm:w-[80%] md:w-[70%] max-w-[600px] h-[180px] sm:h-[240px] md:h-[300px] lg:h-[350px] bg-[#d9d9d9] rounded-lg overflow-hidden"></div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows - Hidden on mobile and sm, visible on md and above */}
        <div className="hidden md:flex absolute left-0 right-0 justify-between px-4 md:px-12 xl:px-20 top-[calc(50%+30px)] xl:top-[calc(50%+50px)] -translate-y-1/2 pointer-events-none z-20">
          <button
            onClick={goToPrev}
            className="relative w-[20px] md:w-[24px] xl:w-[25px] h-[40px] md:h-[55px] xl:h-[60px] rotate-180 pointer-events-auto cursor-pointer hover:opacity-80 transition-opacity"
            aria-label="Previous photo"
          >
            <Image
              src="/images/vector8.svg"
              alt="Previous"
              fill
              className="object-contain"
            />
          </button>
          <button
            onClick={goToNext}
            className="relative w-[20px] md:w-[24px] xl:w-[25px] h-[40px] md:h-[55px] xl:h-[60px] pointer-events-auto cursor-pointer hover:opacity-80 transition-opacity"
            aria-label="Next photo"
          >
            <Image
              src="/images/vector7.svg"
              alt="Next"
              fill
              className="object-contain"
            />
          </button>
        </div>
      </div>

      <div className="testimonial-dots hidden md:flex gap-3 mt-4 sm:mt-6 mb-0 justify-center items-center">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-[12px] h-[12px] min-w-[12px] min-h-[12px] max-w-[12px] max-h-[12px] rounded-full transition-all duration-300 flex-shrink-0 p-0 border-0 ${
              currentIndex === index
                ? "bg-white opacity-100"
                : "bg-white opacity-30 hover:opacity-50"
            }`}
            aria-label={`Go to photo ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
