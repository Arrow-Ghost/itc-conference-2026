import Image from "next/image";
import CountdownTimer from "./CountdownTimer";

/**
 * Combined Hero + AboutUs header.
 * Circuit image: right edge at dotted boundary, bottom at timer top, maintains aspect ratio.
 * Text has higher z-index than circuit.
 */
export default function HeroWithTimer() {
  // Content area: exactly between dotted lines (left/right 5%→4%→3%→2.5%→2.25%)
  const contentInset = "left-[5%] right-[5%] sm:left-[4%] sm:right-[4%] md:left-[3%] md:right-[3%] lg:left-[2.5%] lg:right-[2.5%] xl:left-[2.25%] xl:right-[2.25%]";

  return (
    <div className="relative w-full overflow-x-hidden">
      {/* Content wrapper - hard boundary at dotted lines */}
      <div className={`absolute inset-y-0 ${contentInset} overflow-hidden`}>
        {/* Circuit - right edge locked to wrapper right = dotted line */}
        <div className="hidden sm:block absolute left-[55%] right-0 top-[100px] sm:top-[90px] md:top-[100px] lg:top-[110px] xl:top-[calc(2.25%+68px+40px)] bottom-[55px] sm:bottom-[70px] md:bottom-[90px] lg:bottom-[100px] xl:bottom-[115px] pointer-events-none z-0 overflow-clip">
          <Image
            src="/images/arduino.svg"
            alt="Circuit Illustration"
            fill
            className="object-contain object-right object-bottom"
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 42vw"
          />
        </div>
      </div>

      {/* Hero + AboutUs header - content between dotted lines */}
      <section
        className={`hero-section relative w-full min-h-0 md:min-h-screen flex flex-col pt-[100px] sm:pt-[90px] md:pt-[100px] lg:pt-[110px] xl:pt-[calc(2.25%+68px+40px)] pb-0 overflow-hidden px-[5%] sm:px-[4%] md:px-[3%] lg:px-[2.5%] xl:px-[2.25%]`}
      >

        {/* Hero content row */}
        <div className="relative z-10 w-full max-w-full flex flex-col sm:flex-row items-start sm:items-stretch gap-2 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-12 flex-1 box-border min-h-[300px] sm:min-h-[350px] md:min-h-[450px] lg:min-h-[550px] xl:min-h-[600px]">
          {/* Left: ITC Logo and Title - z-30 so text stays above circuit */}
          <div className="flex flex-col items-start flex-1 relative z-30 w-full min-w-0 sm:min-w-[300px] md:min-w-[400px] lg:min-w-[500px] xl:min-w-[700px] pl-4 sm:pl-6 md:pl-8 lg:pl-10 xl:pl-14 max-w-full overflow-visible">
            <div className="relative w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] md:w-[80px] md:h-[80px] xl:w-[100px] xl:h-[100px] mb-1 sm:mb-3 md:mb-4">
              <Image
                src="/itc-logo.svg"
                alt="ITC Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="text-white font-space-grotesk font-bold">
              <div className="relative">
                <div className="hero-title text-[36px] leading-[1.0] sm:text-[48px] md:text-[50px] lg:text-[55px] xl:text-[65px] sm:leading-tight">
                  <p className="whitespace-normal">10th IEEE International</p>
                  <p>Test Conference</p>
                  <p>INDIA</p>
                </div>
              </div>
              <h3 className="hero-subtitle font-space-grotesk font-bold text-[16px] leading-[1.2] sm:text-[20px] md:text-[22px] lg:text-[23px] xl:text-[24px] mt-1 sm:mt-4 md:mt-4 xl:mt-5 max-w-[600px] leading-normal uppercase">
                AN INITIATIVE TOWARDS INDIA&apos;S<br className="hidden sm:block" />
                <span className="sm:hidden"> </span>SEMICONDUCTOR ECOSYSTEM
              </h3>
            </div>
          </div>

          {/* Right: spacer for flex layout - circuit is absolutely positioned */}
          <div className="hidden sm:block w-[40%] md:w-[42%] lg:w-[45%] xl:w-[48%] flex-shrink-0" aria-hidden />
        </div>

        {/* AboutUs header: zig-zag + timer - directly below hero, no gap */}
        <header className="relative w-full min-h-[70px] sm:min-h-[90px] md:min-h-[100px] lg:min-h-[115px] xl:min-h-[130px] mt-0 flex-shrink-0">
          <div
            className="absolute top-0 left-0 right-0 h-[55px] sm:h-[70px] md:h-[90px] lg:h-[100px] xl:h-[115px] pointer-events-none opacity-60 sm:opacity-70 md:opacity-80"
          >
            <Image
              src="/images/vector9.svg"
              alt=""
              fill
              className="object-contain object-top"
            />
          </div>
          <div className="absolute inset-0 z-10">
            <div className="absolute top-0 left-0 w-[41%] h-[55px] sm:h-[70px] md:h-[90px] lg:h-[100px] xl:h-[115px] flex items-center justify-center">
              <h2 className="font-angkor text-[28px] sm:text-[40px] md:text-[50px] lg:text-[58px] xl:text-[68px] 2xl:text-[78px] leading-[1.1] text-white text-center">
                ABOUT US
              </h2>
            </div>
            <div
              className="absolute top-0 right-0 left-[41%] h-[55px] sm:h-[70px] md:h-[90px] lg:h-[100px] xl:h-[115px] overflow-hidden flex items-center justify-center pt-0.5"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 15.5% 100%, 0 0)" }}
            >
              <CountdownTimer variant="desktop" />
            </div>
          </div>
        </header>
      </section>
    </div>
  );
}
