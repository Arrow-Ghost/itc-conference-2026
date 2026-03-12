"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const testimonials = [
  { id: 1, name: "Full name", company: "Company Name" },
  { id: 2, name: "Full name", company: "Company Name" },
  { id: 3, name: "Full name", company: "Company Name" },
  { id: 4, name: "Full name", company: "Company Name" },
  { id: 5, name: "Full name", company: "Company Name" },
  { id: 6, name: "Full name", company: "Company Name" },
  { id: 7, name: "Full name", company: "Company Name" },
  { id: 8, name: "Full name", company: "Company Name" },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const extendedTestimonials = [...testimonials, testimonials[0]];
  const totalSlides = testimonials.length; // 8 slides

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        return (prevIndex + 1) % totalSlides;
      });
    }, 4000);

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
      id="testimonials"
      className="relative w-full pb-4 sm:pb-0 flex flex-col items-center mt-0 sm:mt-0 pt-4 sm:pt-10 md:pt-12 lg:pt-14 px-3 sm:px-4 md:px-6 lg:px-8 overflow-x-hidden"
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

      <h2 className="font-angkor text-[28px] leading-[1.1] sm:text-[40px] md:text-[50px] lg:text-[60px] xl:text-[75px] text-white mb-2 sm:mb-4 md:mb-6 xl:mb-10 relative xl:absolute xl:top-[50px] xl:right-[5%] z-10 text-center md:text-right w-full xl:w-auto mt-4">
        TESTIMONIALS
      </h2>

      <div className="relative w-4/5 max-w-[1100px] overflow-hidden mx-auto pt-1 sm:pt-10 md:pt-12 xl:pt-[160px] mb-0 sm:mb-0">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {extendedTestimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.id}-${index}`}
              className="relative flex-shrink-0 w-full flex justify-center px-2 sm:px-2"
            >
              <div className="relative w-full max-w-[90%] sm:max-w-[548px] min-h-[200px] sm:min-h-[280px] xl:min-h-[293px] bg-[#d9d9d9] rounded-sm p-3 sm:p-6 md:p-8 xl:p-10 shadow-lg mx-auto sm:mx-0 mt-4 mb-0 sm:my-0">
                <div className="absolute top-3 sm:top-6 md:top-8 xl:top-10 left-3 sm:left-6 md:left-8 xl:left-10 w-[30px] sm:w-[50px] md:w-[60px] xl:w-[66px] h-[30px] sm:h-[50px] md:h-[60px] xl:h-[66px] rounded-full overflow-hidden">
                  <Image
                    src="/images/ellipse13.svg"
                    alt="Avatar"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="ml-[45px] sm:ml-[70px] md:ml-[80px] xl:ml-[90px] mb-3 sm:mb-6">
                  <h4 className="font-poppins text-[14px] sm:text-[18px] md:text-[20px] xl:text-[24px] text-black leading-none mb-1 sm:mb-2">
                    {testimonial.name}
                  </h4>
                  <p className="font-poppins text-[12px] sm:text-[18px] md:text-[20px] xl:text-[24px] text-black leading-none">
                    {testimonial.company}
                  </p>
                </div>

                <div className="relative font-poppins text-[12px] sm:text-[16px] md:text-[18px] xl:text-[24px] text-black mt-4 sm:mt-8 pl-5 sm:pl-8 md:pl-9 pr-4 sm:pr-9 md:pr-10 overflow-hidden break-words">
                  <div className="absolute left-0 top-0 w-[12px] sm:w-[18px] md:w-[20px] xl:w-[24px] h-[9px] sm:h-[14px] md:h-[16px] xl:h-[18px]">
                    <Image
                      src="/images/vector.svg"
                      alt=""
                      fill
                      className="object-contain object-top"
                      aria-hidden
                    />
                  </div>
                  <p>loremjhebgjhdsbkjdvkjdkvhbjdhj</p>
                  <p>hesbdjcsudyub</p>
                  <p className="flex items-baseline gap-4">
                    <span>sdbjhbdjhyvhsd</span>
                    <span className="inline-flex shrink-0 w-[12px] sm:w-[18px] md:w-[20px] xl:w-[24px] h-[9px] sm:h-[14px] md:h-[16px] xl:h-[18px] relative">
                      <Image
                        src="/images/vector-open.svg"
                        alt=""
                        fill
                        className="object-contain object-bottom"
                        aria-hidden
                      />
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows - Hidden on mobile, sm, and md, visible on lg and above */}
        <div className="hidden lg:flex absolute left-0 right-0 justify-between px-4 lg:px-12 xl:px-20 top-[calc(50%)] -translate-y-1/2 pointer-events-none z-20">
          <button
            onClick={goToPrev}
            className="relative w-[20px] lg:w-[24px] xl:w-[25px] h-[40px] lg:h-[55px] xl:h-[60px] rotate-180 pointer-events-auto cursor-pointer hover:opacity-80 transition-opacity"
            aria-label="Previous testimonial"
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
            className="relative w-[20px] lg:w-[24px] xl:w-[25px] h-[40px] lg:h-[55px] xl:h-[60px] pointer-events-auto cursor-pointer hover:opacity-80 transition-opacity"
            aria-label="Next testimonial"
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

      {/* Dot Indicators */}
      <div className="testimonial-dots hidden md:flex gap-3 mt-4 sm:mt-6 mb-0 justify-center items-center">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-[12px] h-[12px] min-w-[12px] min-h-[12px] max-w-[12px] max-h-[12px] rounded-full transition-all duration-300 flex-shrink-0 p-0 border-0 ${
              currentIndex === index
                ? "bg-white opacity-100"
                : "bg-white opacity-30 hover:opacity-50"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
