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
      className="relative w-full mt-0 sm:mt-0 pt-8 sm:pt-20 md:pt-24 lg:pt-30 pb-12 sm:pb-16 md:pb-20 px-[5%] sm:px-4 md:px-6 lg:px-8 xl:px-[86px] flex flex-col items-center overflow-x-hidden"
    >
      <div className="absolute top-0 left-[5%] sm:left-[4%] md:left-[3%] lg:left-[2.5%] xl:left-[2.25%] right-[5%] sm:right-[4%] md:right-[3%] lg:right-[2.5%] xl:right-[2.25%] h-[60px] sm:h-[80px] md:h-[100px] lg:h-[110px] xl:h-[123px] my-10 pointer-events-none -z-10 opacity-60 sm:opacity-70 md:opacity-80">
        <div className="absolute inset-0 w-full h-full rotate-180 scale-y-[-1]">
          <Image
            src="/images/vector11.svg"
            alt="Separator"
            fill
            className="object-contain"
          />
        </div>
      </div>

      <h2 className="font-angkor text-[28px] leading-[1.1] sm:text-[36px] md:text-[40px] lg:text-[50px] xl:text-[60px] text-white mb-4 sm:mb-8 md:mb-12 xl:mb-16 relative xl:absolute top-0 md:top-[10px] xl:top-[70px] xl:right-[5%] z-10 text-center md:text-right w-full xl:w-auto whitespace-nowrap">
        PHOTOS SECTION
      </h2>

      <div className="relative w-full max-w-[1400px] overflow-hidden mx-auto pt-4 sm:pt-16 md:pt-20 xl:pt-[140px] mb-0">
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
              <div className="w-[90%] sm:w-[80%] md:w-[70%] max-w-[600px] h-[200px] sm:h-[300px] md:h-[350px] lg:h-[400px] bg-[#d9d9d9] rounded-lg overflow-hidden"></div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows - Hidden on mobile and sm, visible on md and above */}
        <div className="hidden md:flex absolute left-0 right-0 justify-between px-4 md:px-12 xl:px-20 top-[calc(50%+50px)] xl:top-[calc(50%+70px)] -translate-y-1/2 pointer-events-none z-20">
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

      <div className="testimonial-dots hidden md:flex gap-3 mt-8 sm:mt-10 mb-0 justify-center items-center">
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
