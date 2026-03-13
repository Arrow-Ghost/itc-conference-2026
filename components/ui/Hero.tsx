import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="hero"
      className="hero-section relative w-full min-h-0 md:min-h-screen flex flex-col px-[5%] sm:px-4 md:px-6 lg:px-8 xl:px-[2.25%] pt-[100px] sm:pt-[90px] md:pt-[100px] lg:pt-[110px] xl:pt-[calc(2.25%+68px+40px)] pb-6 sm:pb-6 md:pb-8 xl:pb-0 overflow-x-hidden"
    >
      <div className="relative z-10 w-full max-w-full flex flex-col sm:flex-row items-start sm:items-stretch gap-2 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-12 flex-1 box-border">
        <div className="flex flex-col items-start flex-1 relative z-20 w-full min-w-0 sm:min-w-[300px] md:min-w-[400px] lg:min-w-[500px] xl:min-w-[700px] pl-4 sm:pl-6 md:pl-8 lg:pl-10 xl:pl-14 max-w-full overflow-hidden">
          <div className="relative w-[80px] h-[80px] sm:w-[90px] sm:h-[90px] md:w-[110px] md:h-[110px] xl:w-[140px] xl:h-[140px] mb-1 sm:mb-3 md:mb-4">
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
                <p className="whitespace-normal sm:whitespace-nowrap">
                  10<sup>th</sup> IEEE International
                </p>
                <p>Test Conference</p>
                <p>INDIA</p>
              </div>
            </div>

            <h3 className="hero-subtitle font-space-grotesk font-bold text-[18px] leading-[1.2] sm:text-[24px] md:text-[28px] lg:text-[30px] xl:text-[32px] mt-1 sm:mt-4 md:mt-4 xl:mt-5 max-w-[600px] leading-normal uppercase">
              REIMAGINING TEST IN THE ERA OF
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>INTELLIGENT SILICON
            </h3>
          </div>
        </div>

        <div className="hidden sm:block relative w-full sm:w-[45%] md:w-[48%] lg:w-[52%] xl:w-[55%] pointer-events-none flex-shrink-0 min-h-[350px] sm:min-h-[420px] md:min-h-[550px] lg:min-h-[650px] xl:min-h-[750px] pr-2 sm:pr-4 md:pr-6 xl:pr-0">
          <div className="relative w-full h-full">
            <Image
              src="/images/arduino.svg"
              alt="Circuit Illustration"
              fill
              className="object-contain object-bottom object-left"
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 48vw"
            />
          </div>
        </div>
      </div>

      {/* <div
        className="absolute bottom-0 left-[2.25%] right-[2.25%] h-[2px] hidden xl:block"
        style={{
          backgroundImage: 'repeating-linear-gradient(to right, rgba(255, 255, 255, 1) 0px, rgba(255, 255, 255, 1) 10px, transparent 10px, transparent 20px)'
        }}
      ></div> */}
    </section>
  );
}
