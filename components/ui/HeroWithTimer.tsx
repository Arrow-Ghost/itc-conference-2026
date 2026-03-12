import Image from "next/image";
import CountdownTimer from "./CountdownTimer";

export default function HeroWithTimer() {
  const px = "px-[5%] sm:px-[4%] md:px-[3%] lg:px-[2.5%] xl:px-[2.25%]";

  return (
    <div className="relative w-full overflow-x-hidden">
      <section
        className={`hero-section relative w-full flex flex-col ${px} pt-[88px] sm:pt-[90px] md:pt-[100px] lg:pt-[110px] xl:pt-[120px] pb-0`}
      >
        {/* ── Outer wrapper that gives the SVG something to fill ── */}
        <div className="relative w-full flex flex-col">
          {/* arduino SVG: absolute, spans the full height of this wrapper
              (content row + timer bar), pinned to the right half */}
          <div
            className="hidden sm:block absolute inset-0 pointer-events-none z-0 overflow-hidden"
            aria-hidden
          >
            {/* Inner div pushes the SVG into the right ~48 % and clips it */}
            <div
              className="absolute top-0 bottom-[55px] sm:bottom-[70px] md:bottom-[90px] lg:bottom-[100px] xl:bottom-[115px]
                            left-[52%] sm:left-[54%] md:left-[53%] lg:left-[51%] xl:left-[49%]
                            right-0"
            >
              <Image
                src="/images/arduino.svg"
                alt="Circuit Illustration"
                fill
                className="object-contain object-right-bottom"
                priority
                sizes="(max-width: 768px) 0vw, (max-width: 1024px) 47vw, 51vw"
              />
            </div>
          </div>

          {/* ── Content row ── */}
          <div
            className="relative z-10 w-full flex flex-col sm:flex-row items-start gap-0
                       min-h-[220px] sm:min-h-[300px] md:min-h-[380px] lg:min-h-[440px] xl:min-h-[500px]"
          >
            {/* Left: logo + headings */}
            <div
              className="relative z-30 flex flex-col items-start
                         w-full sm:w-[55%] md:w-[54%] lg:w-[52%] xl:w-[50%]
                         pl-2 sm:pl-4 md:pl-6 lg:pl-8 xl:pl-10"
            >
              {/* ITC Logo — bigger across all breakpoints */}
              <div
                className="relative flex-shrink-0 mb-2 sm:mb-3 md:mb-4 lg:mb-5
                           w-[90px]  h-[90px]
                           sm:w-[110px] sm:h-[110px]
                           md:w-[130px] md:h-[130px]
                           lg:w-[155px] lg:h-[155px]
                           xl:w-[175px] xl:h-[175px]"
              >
                <Image
                  src="/itc-logo.svg"
                  alt="ITC Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Headings */}
              <div className="text-white font-space-grotesk font-bold">
                <div
                  className="hero-title
                             text-[28px]  leading-[1.05]
                             sm:text-[38px] sm:leading-tight
                             md:text-[44px]
                             lg:text-[50px]
                             xl:text-[60px]"
                >
                  <p className="whitespace-normal">10th IEEE International</p>
                  <p>Test Conference</p>
                  <p>INDIA</p>
                </div>

                <h3
                  className="hero-subtitle font-space-grotesk font-bold uppercase
                             text-[11px]  leading-[1.3]  mt-2
                             sm:text-[15px] sm:mt-3
                             md:text-[17px] md:mt-4
                             lg:text-[19px]
                             xl:text-[21px] xl:mt-5
                             max-w-full sm:max-w-[560px]"
                >
                  AN INITIATIVE TOWARDS INDIA&apos;S
                  <br className="hidden sm:block" />
                  <span className="sm:hidden"> </span>SEMICONDUCTOR ECOSYSTEM
                </h3>
              </div>
            </div>

            {/* Right spacer — keeps the left column from stretching to full width */}
            <div className="hidden sm:block flex-1 min-w-0" aria-hidden />
          </div>

          {/* ── Timer / header bar ── */}
          <header
            className="relative w-full flex-shrink-0 min-w-0 z-10
                       h-[55px] sm:h-[70px] md:h-[90px] lg:h-[100px] xl:h-[115px]
                       mt-3 sm:mt-5 md:mt-7 lg:mt-9 xl:mt-11"
          >
            {/* Dashed zig-zag SVG line */}
            <div className="absolute inset-0 pointer-events-none opacity-60 sm:opacity-70 md:opacity-80 z-0">
              <Image
                src="/images/vector9.svg"
                alt=""
                fill
                className="object-fill"
              />
            </div>

            {/* ABOUT US label */}
            <div className="absolute top-0 left-0 w-[41%] h-full flex items-center justify-center z-20 overflow-hidden">
              <h2
                className="font-angkor text-white text-center leading-[1.1] whitespace-nowrap
                           text-[16px]
                           sm:text-[32px]
                           md:text-[42px]
                           lg:text-[50px]
                           xl:text-[60px]
                           2xl:text-[70px]"
              >
                ABOUT US
              </h2>
            </div>

            {/* Countdown timer */}
            <div
              className="absolute top-0 right-0 left-[41%] h-full overflow-hidden z-20"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 15.5% 100%, 0 0)",
              }}
            >
              <CountdownTimer variant="desktop" />
            </div>
          </header>
        </div>
      </section>
    </div>
  );
}
