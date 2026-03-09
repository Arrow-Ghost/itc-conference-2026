import Image from "next/image";

/**
 * Timeline Section - Fully responsive
 * Breakpoints: mobile (<640px), sm (640+), md (768+), lg (1024+), xl (1280+)
 * - Mobile: stacked cards, day labels above each card
 * - Tablet+: alternating layout with path, day labels left/right
 */
export default function Timeline() {
  const contentPadding = "px-[5%] sm:px-[4%] md:px-[3%] lg:px-[2.5%] xl:px-[2.25%]";

  return (
    <section
      id="timeline"
      className={`relative w-full flex flex-col pt-8 sm:pt-10 md:pt-12 lg:pt-14 xl:pt-16 pb-8 sm:pb-10 md:pb-12 overflow-x-hidden ${contentPadding}`}
    >
      {/* Zig-zag separator + heading centered in first cavity (vector11: cavity 0–49.2%) */}
      <div className="absolute top-0 left-0 right-0 h-[45px] sm:h-[55px] md:h-[65px] lg:h-[75px] xl:h-[85px] pointer-events-none z-0">
        <div className="absolute inset-0 opacity-60 sm:opacity-70 md:opacity-80">
          <Image
            src="/images/vector11.svg"
            alt=""
            fill
            className="object-contain object-top"
          />
        </div>
        <div className="absolute inset-0 z-10">
          <div className="absolute left-0 top-0 w-[49.2%] h-full">
            <h2 className="absolute top-[56%] left-1/2 -translate-x-1/2 -translate-y-1/2 m-0 font-angkor text-[28px] sm:text-[40px] md:text-[50px] lg:text-[58px] xl:text-[68px] 2xl:text-[78px] leading-[1.1] text-white text-center">
              TIMELINE
            </h2>
          </div>
        </div>
      </div>
      <div className="h-[45px] sm:h-[55px] md:h-[65px] lg:h-[75px] xl:h-[85px] mb-5 sm:mb-6 md:mb-8" aria-hidden />

      {/* Timeline content - per-card path so horizontals align with each day center */}
      <div className="relative w-full max-w-[1200px] mx-auto">
        {/* Day 1 - horizontal line at card center, extends right */}
        <div className="relative flex justify-center mb-5 sm:mb-6 md:mb-8">
          <div className="hidden sm:block absolute top-1/2 left-1/2 right-0 h-0 -translate-y-px border-t-2 border-dashed border-white/60 z-0 pointer-events-none" aria-hidden />
          <div className="relative z-10 w-full flex justify-center">
            <div className="relative w-full max-w-[100%] sm:max-w-[85%] md:max-w-[360px] lg:max-w-[400px] xl:max-w-[440px] aspect-[525/175] min-h-[80px] sm:min-h-[96px] mx-auto">
              <Image
                src="/images/timeline-card1.svg"
                alt="Day 1 - Conference events"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 85vw, 520px"
              />
              <div className="absolute left-[16.7%] top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-[28%] max-w-[90px] aspect-square text-white font-roboto-slab font-extrabold text-[12px] sm:text-[14px] md:text-[18px] lg:text-[22px] xl:text-[26px] text-center leading-tight">
                DAY 1
              </div>
            </div>
          </div>
        </div>

        {/* Vertical connector - extends from Day 1 center into Day 2 box (pb + -mb ensures line touches) */}
        <div className="hidden sm:block relative -mt-10 sm:-mt-12 md:-mt-14 h-24 sm:h-28 md:h-32 lg:h-36 pb-2 -mb-2">
          <svg viewBox="0 0 2 100" preserveAspectRatio="none" className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-2 h-full" aria-hidden>
            <line x1="1" y1="0" x2="1" y2="100" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeDasharray="5 5" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>

        {/* Day 2 - horizontal line at card center, extends left */}
        <div className="relative flex justify-center mb-5 sm:mb-6 md:mb-8">
          <div className="hidden sm:block absolute top-1/2 left-0 right-1/2 h-0 -translate-y-px border-t-2 border-dashed border-white/60 z-0 pointer-events-none" aria-hidden />
          <div className="relative z-10 w-full flex justify-center">
            <div className="relative w-full max-w-[100%] sm:max-w-[85%] md:max-w-[360px] lg:max-w-[400px] xl:max-w-[440px] aspect-[525/175] min-h-[80px] sm:min-h-[96px] mx-auto sm:rotate-180">
              <Image
                src="/images/timeline-card2.svg"
                alt="Day 2 - Conference events"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 85vw, 520px"
              />
              <div className="absolute left-[16.7%] top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-[28%] max-w-[90px] aspect-square text-white font-roboto-slab font-extrabold text-[12px] sm:text-[14px] md:text-[18px] lg:text-[22px] xl:text-[26px] text-center leading-tight sm:rotate-180">
                DAY 2
              </div>
            </div>
          </div>
        </div>

        {/* Vertical connector - extends from Day 2 center into Day 3 box (pb + -mb ensures line touches) */}
        <div className="hidden sm:block relative -mt-10 sm:-mt-12 md:-mt-14 h-24 sm:h-28 md:h-32 lg:h-36 pb-2 -mb-2">
          <svg viewBox="0 0 2 100" preserveAspectRatio="none" className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-2 h-full" aria-hidden>
            <line x1="1" y1="0" x2="1" y2="100" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeDasharray="5 5" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>

        {/* Day 3 - horizontal line at card center, extends right */}
        <div className="relative flex justify-center">
          <div className="hidden sm:block absolute top-1/2 left-1/2 right-0 h-0 -translate-y-px border-t-2 border-dashed border-white/60 z-0 pointer-events-none" aria-hidden />
          <div className="relative z-10 w-full flex justify-center">
            <div className="relative w-full max-w-[100%] sm:max-w-[85%] md:max-w-[360px] lg:max-w-[400px] xl:max-w-[440px] aspect-[525/175] min-h-[80px] sm:min-h-[96px] mx-auto">
              <Image
                src="/images/timeline-card3.svg"
                alt="Day 3 - Conference events"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 85vw, 520px"
              />
              <div className="absolute left-[16.7%] top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-[28%] max-w-[90px] aspect-square text-white font-roboto-slab font-extrabold text-[12px] sm:text-[14px] md:text-[18px] lg:text-[22px] xl:text-[26px] text-center leading-tight">
                DAY 3
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
