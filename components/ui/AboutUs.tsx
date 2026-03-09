import Image from "next/image";

/**
 * AboutUs Section - Main content only (header with zig-zag + timer is in HeroWithTimer)
 */
export default function AboutUs() {
  const contentPadding = "px-[5%] sm:px-5 md:px-6 lg:px-8 xl:px-[2.25%]";

  return (
    <section
      id="about"
      className={`about-us-section relative w-full pt-8 sm:pt-12 md:pt-14 lg:pt-16 xl:pt-20 pb-8 sm:pb-12 md:pb-16 ${contentPadding} text-white overflow-x-hidden`}
    >
      {/* ========== MAIN CONTENT ========== */}
      <div className={`flex flex-col xl:flex-row gap-6 sm:gap-8 md:gap-10 xl:gap-16 w-full max-w-full min-w-0`}>
        <div className="flex-1 min-w-0 ml-4 sm:ml-6 md:ml-8 lg:ml-10 xl:ml-12 mr-4 sm:mr-6 md:mr-8 lg:mr-10 xl:mr-12">
          <h3 className="font-space-grotesk font-bold text-[22px] sm:text-[28px] md:text-[32px] lg:text-[38px] xl:text-[44px] leading-[1.2] mb-4 sm:mb-6 text-center md:text-left">
            Welcome to ITC INDIA 2026
          </h3>
          <div className="font-poppins text-[14px] sm:text-[16px] md:text-[17px] leading-[1.6] text-white/90 space-y-3 sm:space-y-4 text-center md:text-left">
            <p>
              International Test Conference is the world&apos;s premier venue dedicated to the electronic test of devices, boards and systems-covering the complete cycle from design verification, design-for-test, design-for-manufacturing, silicon debug, manufacturing test, system test, diagnosis, reliability and failure analysis, and back to process and design improvement.
            </p>
            <p>
              At ITC India, design, test, and yield professionals can confront challenges faced by the industry, and learn how these challenges are being addressed by the combined efforts of academia, design tool and equipment suppliers, designers, and test engineers.
            </p>
          </div>
        </div>

        <div className="flex-1 relative hidden md:block min-w-0">
          <div className="relative w-full max-w-[480px] aspect-[4/3] rounded-lg overflow-hidden mx-auto xl:mx-0 xl:ml-8">
            <Image
              src="/images/carasol1.png"
              alt="ITC India highlights"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 45vw, 480px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
