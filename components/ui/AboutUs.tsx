import Image from "next/image";
import CountdownTimer from "./CountdownTimer";

export default function AboutUs() {
  return (
    <section
      id="about"
      className="about-us-section relative w-full mt-0 sm:mt-0 pt-0 sm:pt-20 md:pt-24 lg:pt-30 pb-8 sm:pb-0 px-[5%] sm:px-4 md:px-6 lg:px-8 xl:px-[2.25%] text-white overflow-x-hidden"
    >
      {/* Zig-zag Line at the top - matching side lines positioning */}
      <div className="absolute top-0 left-[5%] sm:left-[4%] md:left-[3%] lg:left-[2.5%] xl:left-[2.25%] right-[5%] sm:right-[4%] md:right-[3%] lg:right-[2.5%] xl:right-[2.25%] h-[60px] sm:h-[80px] md:h-[100px] lg:h-[110px] xl:h-[123px] pointer-events-none -z-10 opacity-60 sm:opacity-70 md:opacity-80">
        <Image
          src="/images/vector9.svg"
          alt="Zig-zag Line"
          fill
          className="object-contain object-top"
        />
      </div>

      <div className="absolute top-[35px] sm:top-[50px] md:top-[60px] lg:top-[70px] xl:top-[80px] right-[5%] sm:right-[10%] md:right-[10%] lg:right-[10%] xl:right-[20%] z-20">
        <CountdownTimer />
      </div>

      {/* Mobile: heading only - positioned close to zig-zag */}
      <div className="sm:hidden w-full max-w-full box-border absolute top-[25px] left-5 z-20">
        <h2 className="font-angkor text-[28px] leading-tight text-white text-left ">
          ABOUT US
        </h2>
      </div>

      {/* Tablet: heading + timer side by side - positioned close to zig-zag */}
      <div className="hidden sm:block xl:hidden w-full max-w-full box-border absolute top-[70px] md:top-[90px] left-1.5 md:left-[2%] right-[4%] md:right-[3%] z-20">
        <div className="flex items-center justify-between gap-2 sm:gap-3">
          <h2 className="font-angkor text-[40px] md:text-[50px] lg:text-[60px] text-white text-left flex-shrink-0">
            ABOUT US
          </h2>
        </div>
      </div>

      {/* Desktop heading - absolute */}
      <h2 className="hidden xl:block font-angkor text-[75px] leading-[1.1] text-white mb-20 absolute top-[30px] left-[10%] z-10 text-left">
        ABOUT US
      </h2>

      <div className="flex flex-col xl:flex-row gap-6 sm:gap-8 md:gap-12 xl:gap-16 mt-[70px] sm:mt-12 md:mt-16 xl:mt-8 w-full max-w-full box-border">
        <div className="flex-1 w-full max-w-full overflow-hidden">
          <h3 className="font-space-grotesk font-bold text-[24px] leading-[1.2] sm:text-[32px] md:text-[36px] lg:text-[42px] xl:text-[48px] mb-4 sm:mb-6 md:mb-8 text-center md:text-left ml-0 md:ml-2 lg:ml-4 xl:ml-10">
            Welcome to ITC INDIA 2026
          </h3>

          <div className="font-poppins text-[14px] leading-[1.6] sm:text-[18px] md:text-[17px] lg:text-[18px] xl:text-[18px] text-white/90 space-y-3 sm:space-y-4 md:space-y-6 max-w-full text-center md:text-left mx-auto md:mx-0 pb-4 sm:pb-10 md:pb-12 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
            <p>
              International Test Conference is the world&apos;s premier venue
              dedicated to the electronic test of devices, boards and
              systems-covering the complete cycle from design verification,
              design-for-test, design-for-manufacturing, silicon debug,
              manufacturing test, system test, diagnosis, reliability and
              failure analysis, and back to process and design improvement.
            </p>
            <p>
              At ITC India, design, test, and yield professionals can confront
              challenges faced by the industry, and learn how these challenges
              are being addressed by the combined efforts of academia, design
              tool and equipment suppliers, designers, and test engineers.
            </p>
          </div>
        </div>

        <div className="flex-1 relative hidden md:block">
          {/* Carousel Image - Made smaller - Hidden on mobile */}
          <div className="relative w-full max-w-[500px] h-[300px] md:h-[350px] lg:h-[400px] xl:h-[400px] rounded-lg overflow-hidden border border-white/0 ml-4 md:ml-6 xl:ml-12 mt-8 md:mt-12 xl:mt-[78px] mx-auto xl:mx-0">
            <Image
              src="/images/carasol1.png"
              alt="Highlights"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 50vw, 500px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
