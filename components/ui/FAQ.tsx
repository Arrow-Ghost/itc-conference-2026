import Image from "next/image";

export default function FAQ() {
  return (
    <section
      id="faq"
      className="faq-section relative w-full py-12 sm:py-16 md:py-20 px-[5%] sm:px-6 md:px-8 xl:px-[89px] text-white overflow-x-hidden"
    >
      {/* Separator - constrained to side lines but preserving unique slope */}
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

      <h2 className="font-angkor text-[28px] sm:text-[36px] md:text-[40px] lg:text-[50px] xl:text-[60px] leading-tight mb-6 sm:mb-12 xl:mb-16 mt-4 sm:mt-20 md:mt-24 xl:mt-[120px] text-center md:text-left">
        FREQUENTLY <span className="text-[#6aaff1]">ASKED QUESTIONS</span>
      </h2>

      <div className="flex flex-col xl:flex-row gap-6 sm:gap-12 md:gap-16 xl:gap-20 w-full max-w-full">
        {/* Left Column: Contact / Form */}
        <div className="flex-1 flex flex-col gap-6 sm:gap-8 md:gap-10">
          {/* Placeholder Text */}
          <div className="font-poppins font-medium text-[14px] sm:text-[18px] md:text-[22px] lg:text-[26px] xl:text-[30px] text-black bg-white/50 px-4 py-3 sm:px-6 sm:py-4 md:p-4 rounded backdrop-blur-sm break-words text-center md:text-left w-full box-border">
            loejdfhbklnskxdcfvgjhbnsdxfcghbjnkmszxdfcg
            zdxfcvbnmzsdxfcgvbhnmszdxfcgvhbjnmxdfcv szdxfcgvhbjn.
          </div>

          {/* Contact Box */}
          <div className="bg-white rounded-[5px] px-4 py-4 sm:px-6 sm:py-5 md:p-6 lg:p-8 text-black min-h-[320px] sm:min-h-[400px] xl:min-h-[456px] relative w-full box-border">
            <h3 className="font-poppins font-semibold text-[22px] sm:text-[26px] xl:text-[30px] mt-2 sm:mt-4 mb-2 text-center md:text-left">
              Still have Questions?
            </h3>
            <p className="font-poppins text-[16px] sm:text-[18px] md:text-[20px] xl:text-[22px] mb-6 sm:mb-8 text-center md:text-left">
              Contact Us.
            </p>

            {/* Form */}
            <form className="flex flex-col gap-3 sm:gap-4 mt-6 sm:mt-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Name*"
                  className="w-full h-[40px] sm:h-[44px] bg-[#e0e0e0] rounded-[40px] px-4 sm:px-6 text-[16px] sm:text-[18px] md:text-[20px] xl:text-[22px] font-poppins placeholder-black"
                />
              </div>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email ID*"
                  className="w-full h-[40px] sm:h-[44px] bg-[#e0e0e0] rounded-[40px] px-4 sm:px-6 text-[16px] sm:text-[18px] md:text-[20px] xl:text-[22px] font-poppins placeholder-black"
                />
              </div>
              <div className="relative flex flex-col sm:flex-row gap-3 sm:gap-4">
                <input
                  type="text"
                  placeholder="Querie*"
                  className="flex-1 h-[40px] sm:h-[44px] bg-[#e0e0e0] rounded-[40px] px-4 sm:px-6 text-[16px] sm:text-[18px] md:text-[20px] xl:text-[22px] font-poppins placeholder-black"
                />
                <button
                  type="submit"
                  className="w-full sm:w-[200px] h-[40px] sm:h-[44px] bg-[#444] text-white rounded-[40px] text-[16px] sm:text-[18px] md:text-[20px] xl:text-[22px] font-poppins"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: FAQs */}
        <div className="flex-1 flex flex-col gap-4 sm:gap-5 md:gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-[#d9d9d9] rounded-[5px] px-4 py-4 sm:px-6 sm:py-5 md:p-5 lg:p-6 text-black min-h-[160px] sm:min-h-[195px] xl:min-h-[205px] w-full box-border"
            >
              <h3 className="font-poppins font-semibold text-[22px] sm:text-[26px] xl:text-[30px] mb-2 text-center md:text-left">
                How to join?
              </h3>
              <div className="font-poppins text-[16px] sm:text-[18px] md:text-[20px] xl:text-[22px] text-center md:text-left">
                <p>loremjhebgjhdsbkjdvkjdkvhbjdhj</p>
                <p>hesbdjcsudyub</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
