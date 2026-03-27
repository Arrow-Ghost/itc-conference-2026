import Link from "next/link";

export default function SponsorsPage() {
  return (
    <main className="min-h-screen relative text-white font-poppins selection:bg-white/20">
      <div className="relative z-10 pt-[150px] pb-20 px-4 md:px-10 max-w-[1400px] mx-auto flex flex-col">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-[56px] font-bold tracking-tight text-white mb-6 font-space-grotesk">
            OUR SPONSORS
          </h1>
          <div className="w-24 h-1 bg-[#6aaff1] mx-auto rounded-full mb-8"></div>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            We proudly acknowledge the support of our industry partners who help
            make ITC India 2026 a premier event for the semiconductor test
            community.
          </p>
        </div>

        <section className="mb-24">
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-[1px] bg-gradient-to-r from-transparent to-[#6aaff1] w-24 md:w-48"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#6aaff1] font-space-grotesk tracking-wide uppercase px-4">
              Silicon Sponsor
            </h2>
            <div className="h-[1px] bg-gradient-to-l from-transparent to-[#6aaff1] w-24 md:w-48"></div>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {/* Caliber Interconnect Card */}
            <div className="group relative w-full max-w-lg bg-white rounded-xl overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.05)] hover:shadow-[0_0_60px_rgba(106,175,241,0.3)] transition-all duration-500 transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-200 opacity-100 transition-opacity duration-300"></div>

              <div className="relative p-4 flex flex-col items-center justify-center min-h-[260px] text-center">
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-500">
                  <img
                    src="/images/caliberinterconnect.png"
                    alt="Caliber Interconnect"
                    className="h-16 md:h-20 object-contain"
                  />
                </div>

                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bottom-6">
                  <span className="text-[#03396c] font-semibold text-sm tracking-widest uppercase border-b-2 border-[#03396c]">
                    Visit Website
                  </span>
                </div>
              </div>

              <a
                href="https://caliberinterconnect.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-20"
                aria-label="Visit Caliber Interconnect"
              ></a>
            </div>
          </div>
        </section>

        {/*<section className="mb-24 opacity-60 hover:opacity-100 transition-opacity duration-300"> looks weird*/}
        <section className="mb-24">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-[1px] bg-gradient-to-r from-transparent to-gray-400 w-16 md:w-32"></div>
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-300 font-space-grotesk tracking-wide uppercase px-4">
              Platinum Sponsor
            </h2>
            <div className="h-[1px] bg-gradient-to-l from-transparent to-gray-400 w-16 md:w-32"></div>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="group relative w-full max-w-md bg-white rounded-xl overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.05)] hover:shadow-[0_0_60px_rgba(106,175,241,0.3)] transition-all duration-500 transform hover:-translate-y-2">
              
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-200"></div>

              <div className="relative p-4 flex items-center justify-center min-h-[200px]">
                <img
                  src="/images/siemens.png"
                  alt="Siemens"
                  className="h-16 md:h-20 object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bottom-6 left-1/2 -translate-x-1/2">
                <span className="text-[#03396c] font-semibold text-sm tracking-widest uppercase border-b-2 border-[#03396c]">
                  Visit Website
                </span>
              </div>

              <a
                href="https://www.siemens.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-20"
                aria-label="Visit Siemens"
              ></a>
            </div>
          </div>
        </section>

        {/*<section className="mb-24 opacity-60 hover:opacity-100 transition-opacity duration-300">*/}
        <section className="mb-24">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-[1px] bg-gradient-to-r from-transparent to-[#6aaff1] w-12 md:w-24"></div>
            <h2 className="text-xl md:text-2xl font-bold text-center text-[#6aaff1] font-space-grotesk tracking-wide uppercase px-4">
              Gold Sponsors
            </h2>
            <div className="h-[1px] bg-gradient-to-l from-transparent to-[#6aaff1] w-12 md:w-24"></div>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { name: "Qualcomm", src: "/images/qualcomm.png", url: "https://www.qualcomm.com/" },
              { name: "Cadence", src: "/images/cadence.png", url: "https://www.cadence.com/" },
              { name: "Synopsys", src: "/images/synopsys.png", url: "https://www.synopsys.com/" },
              { name: "Teradyne", src: "/images/teradyne.png", url: "https://www.teradyne.com/" },
            ].map((sponsor) => (
              <div
                key={sponsor.name}
                className="group relative w-full max-w-xs bg-white rounded-xl overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:shadow-[0_0_50px_rgba(106,175,241,0.3)] transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-200"></div>

                <div className="relative p-6 flex items-center justify-center min-h-[150px]">
                  <img
                    src={sponsor.src}
                    alt={sponsor.name}
                    className="h-12 md:h-16 object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bottom-4 left-1/2 -translate-x-1/2">
                    <span className="text-[#03396c] font-semibold text-xs tracking-widest uppercase border-b-2 border-[#03396c]">
                      Visit Website
                    </span>
                  </div>
                </div>

                <a
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-20"
                  aria-label={`Visit ${sponsor.name}`}
                ></a>
              </div>
            ))}
          </div>
        </section>

        {/*<section className="mb-24 opacity-60 hover:opacity-100 transition-opacity duration-300">*/}
        <section className="mb-24">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-[1px] bg-gradient-to-r from-transparent to-gray-400 w-16 md:w-32"></div>
            <h2 className="text-xl md:text-2xl font-bold text-center text-gray-300 font-space-grotesk tracking-wide uppercase px-4">
              Silver Sponsor
            </h2>
            <div className="h-[1px] bg-gradient-to-l from-transparent to-gray-400 w-16 md:w-32"></div>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="group relative w-4/5 max-w-md bg-white rounded-xl overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.05)] hover:shadow-[0_0_60px_rgba(106,175,241,0.3)] transition-all duration-500 transform hover:-translate-y-2">

              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-200"></div>

              <div className="relative p-0 flex items-center justify-center min-h-[200px]">
                <img
                  src="/images/anoralabs.svg"
                  alt="Anora labs"
                  className="h-16 md:h-20 object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bottom-6 left-1/2 -translate-x-1/2">
                <span className="text-[#03396c] font-semibold text-sm tracking-widest uppercase border-b-2 border-[#03396c]">
                  Visit Website
                </span>
              </div>

              <a
                href="https://www.anoralabs.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-20"
                aria-label="Visit Anora Labs"
              ></a>
            </div>
          </div>
        </section>

        {/*<section className="mb-24 opacity-60 hover:opacity-100 transition-opacity duration-300">*/}
        <section className="mb-24">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-[1px] bg-gradient-to-r from-transparent to-[#6aaff1] w-12 md:w-24"></div>
            <h2 className="text-xl md:text-2xl font-bold text-center text-[#6aaff1] font-space-grotesk tracking-wide uppercase px-4">
              Bronze Sponsors
            </h2>
            <div className="h-[1px] bg-gradient-to-l from-transparent to-[#6aaff1] w-12 md:w-24"></div>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { name: "Marvel", src: "/images/marvell-logo.svg", url: "https://www.marvell.com/" },
              { name: "Texas Instruments", src: "/images/texasinstruments.png", url: "https://www.ti.com/" },
            ].map((sponsor) => (
              <div
                key={sponsor.name}
                className="group relative w-full max-w-xs bg-white rounded-xl overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:shadow-[0_0_50px_rgba(106,175,241,0.3)] transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-200"></div>

                <div className="relative p-4 flex items-center justify-center min-h-[150px]">
                  <img
                    src={sponsor.src}
                    alt={sponsor.name}
                    className="h-12 md:h-16 object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bottom-4 left-1/2 -translate-x-1/2">
                    <span className="text-[#03396c] font-semibold text-xs tracking-widest uppercase border-b-2 border-[#03396c]">
                      Visit Website
                    </span>
                  </div>
                </div>

                <a
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-20"
                  aria-label={`Visit ${sponsor.name}`}
                ></a>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-10 text-center bg-gradient-to-b from-white/5 to-white/[0.02] p-10 md:p-16 rounded-3xl border border-white/10 backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#6aaff1] to-transparent opacity-50"></div>

          <h3 className="text-2xl md:text-3xl font-bold mb-4 font-space-grotesk text-white">
            Become a Sponsor
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
            Join <strong>Us </strong> and other industry
            leaders in shaping the future of semiconductor testing. Showcase
            your brand to a global audience of experts and innovators.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/call-for-sponsors"
              className="inline-flex justify-center items-center bg-[#6aaff1] hover:bg-[#6aaff1]/90 text-[#03396c] font-bold text-lg px-8 py-4 rounded-lg transition-all transform hover:scale-105 shadow-lg"
            >
              View Packages
            </Link>
            <a
              href="mailto:info@itctestweekindia.org"
              className="inline-flex justify-center items-center bg-transparent border-2 border-white/30 hover:border-white text-white font-bold text-lg px-8 py-4 rounded-lg transition-all hover:bg-white/10"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
