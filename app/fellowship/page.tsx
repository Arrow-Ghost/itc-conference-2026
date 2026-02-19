import Image from "next/image";
import Link from "next/link";

export default function FellowshipPage() {
  return (
    <main className="min-h-screen relative bg-[#03396c] text-white font-poppins overflow-hidden selection:bg-white/20">
      {/* Grid Background */}
      <div
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="absolute top-[120px] right-25 w-[60%] h-[600px] z-0 pointer-events-none hidden lg:block opacity-80">
        <div className="relative w-full h-full">
          {/* Note: Ensure the schematic PNG provided is saved as /images/fellowship-schematic.png in the public folder */}
          <Image
            src="/images/fellowship-schematic.png"
            alt="Circuit Schematic"
            fill
            className="object-contain object-right-top"
          />
        </div>
      </div>

      <div className="relative z-10 pt-37.5 pb-20 px-6 md:px-16 max-w-350 mx-auto flex flex-col mt-24 md:mt-32">
        {/* Header Section */}
        <div className="max-w-3xl mb-24 relative">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight uppercase">
            ITC 2026 FELLOWSHIP
          </h1>
          <h2 className="text-2xl md:text-4xl font-bold mb-12 uppercase leading-tight max-w-2xl">
            AN INITIATIVE TOWARDS INDIA’S SEMICONDUCTOR ECOSYSTEM
          </h2>

          <Link href="/fellowship/register">
            <button className="bg-[#03396c] hover:bg-[#1a4b7c] text-white text-xl md:text-2xl font-bold py-4 px-12 border border-white/50 shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 uppercase tracking-wider backdrop-blur-sm">
              REGISTER NOW
            </button>
          </Link>
        </div>

        {/* Decorative Lines Section */}
        <div className="relative w-full mb-16 hidden md:block">
          {/* Horizontal dashed line */}
          <div className="absolute -left-25 right-[40%] top-0 border-t border-dashed border-white/30"></div>
          {/* Angled line decoration near Support Details */}
          <div className="absolute right-[40%] top-0 w-24 h-24 border-t border-r border-dashed border-white/30 transform skew-x-45 origin-top-left"></div>
        </div>

        {/* Support Details Header */}
        <div className="mb-12 relative">
          <h2 className="text-4xl md:text-[64px] font-bold uppercase leading-none mb-4">
            SUPPORT DETAILS
          </h2>
          {/* Decorative line underneath header */}
          <div className="w-full h-px bg-linear-to-r from-white/50 to-transparent max-w-md"></div>
        </div>

        {/* Two Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-12">
          {/* Column 1: Local Fellows */}
          <div className="relative">
            <div className="mb-6 pb-2 border-b border-white/30 w-fit">
              <h3 className="text-2xl md:text-3xl font-bold">
                Support for local fellows
              </h3>
            </div>

            <div className="space-y-4 text-sm md:text-base text-gray-200 font-light leading-relaxed">
              <p>
                1. Lorem ipsum dolor sit amet consectetur. Felis quis in
                molestie curabitur bibendum. Amet in arcu laoreet arcu risus
                hendrerit odio senectus sapien. Blandit sit at sagittis auctor
                est.
              </p>
              <p>
                2. Purus ut odio integer ac vel. Amet vitae sit volutpat quam
                pretium. Faucibus adipiscing magna massa egestas in quis
                scelerisque n
              </p>
              <p>
                3. Lorem ipsum dolor sit amet consectetur. Felis quis in
                molestie curabitur bibendum. Amet in arcu laoreet arcu risus
                hendrerit odio senectus sapien. Blandit sit at sagittis auctor
                est.
              </p>
              <p>
                4. Purus ut odio integer ac vel. Amet vitae sit volutpat quam
                pretium. Faucibus adipiscing magna massa egestas in quis
                scelerisque nibh n
              </p>
              <p>
                5. Lorem ipsum dolor sit amet consectetur. Felis quis in
                molestie curabitur bibendum. Amet in arcu laoreet arcu risus
                hendrerit odio senectus sapien. Blandit sit at sagittis auctor
                est.
              </p>
              <p>6.</p>
            </div>
          </div>

          {/* Column 2: Outstation Fellows */}
          <div className="relative">
            <div className="mb-6 pb-2 border-b border-white/30 w-fit">
              <h3 className="text-2xl md:text-3xl font-bold">
                Support for Outstation fellows
              </h3>
            </div>

            <div className="space-y-4 text-sm md:text-base text-gray-200 font-light leading-relaxed">
              <p>
                1. Lorem ipsum dolor sit amet consectetur. Felis quis in
                molestie curabitur bibendum. Amet in arcu laoreet arcu risus
                hendrerit odio senectus sapien. Blandit sit at sagittis auctor
                est.
              </p>
              <p>
                2. Purus ut odio integer ac vel. Amet vitae sit volutpat quam
                pretium. Faucibus adipiscing magna massa egestas in quis
                scelerisque n
              </p>
              <p>
                3. Lorem ipsum dolor sit amet consectetur. Felis quis in
                molestie curabitur bibendum. Amet in arcu laoreet arcu risus
                hendrerit odio senectus sapien. Blandit sit at sagittis auctor
                est.
              </p>
              <p>
                4. Purus ut odio integer ac vel. Amet vitae sit volutpat quam
                pretium. Faucibus adipiscing magna massa egestas in quis
                scelerisque nibh n
              </p>
              <p>
                5. Lorem ipsum dolor sit amet consectetur. Felis quis in
                molestie curabitur bibendum. Amet in arcu laoreet arcu risus
                hendrerit odio senectus sapien. Blandit sit at sagittis auctor
                est.
              </p>
              <p>6.</p>
            </div>

            {/* Decorative angled line for bottom section */}
            <div className="absolute -bottom-10 left-0 w-full h-px border-t border-dashed border-white/20 hidden md:block"></div>
            <div className="absolute -bottom-10 -left-12.5 w-12.5 h-12.5 border-r border-dashed border-white/20 transform skew-x-45 hidden md:block"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
