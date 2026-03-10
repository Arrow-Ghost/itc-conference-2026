import Image from "next/image";

export default function FAQ() {
  return (
    <section
      id="faq"
      className="faq-section relative w-full py-8 sm:py-12 md:py-16 px-[5%] sm:px-6 md:px-8 xl:px-[89px] text-white overflow-x-hidden"
    >
      {/* Separator */}
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

      <h2 className="font-angkor text-[24px] sm:text-[30px] md:text-[36px] lg:text-[42px] xl:text-[50px] leading-tight mb-4 sm:mb-8 xl:mb-10 mt-4 sm:mt-16 md:mt-20 xl:mt-[100px] text-center md:text-left">
        FREQUENTLY <span className="text-[#6aaff1]">ASKED QUESTIONS</span>
      </h2>

      <div className="flex flex-col xl:flex-row gap-4 sm:gap-8 md:gap-10 xl:gap-14 w-full max-w-full">
        {/* Left Column */}
        <div className="flex-1 flex flex-col gap-4 sm:gap-6 md:gap-7">
          <div className="font-poppins font-medium text-[13px] sm:text-[15px] md:text-[17px] lg:text-[19px] xl:text-[21px] text-black bg-white/50 px-3 py-2 sm:px-5 sm:py-3 md:px-5 md:py-3 rounded backdrop-blur-sm break-words text-center md:text-left w-full box-border">
            loejdfhbklnskxdcfvgjhbnsdxfcghbjnkmszxdfcg
            zdxfcvbnmzsdxfcgvhbjnmszdxfcgvhbjnmxdfcv szdxfcgvhbjn.
          </div>

          <div className="bg-white rounded-[5px] px-3 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5 text-black min-h-[260px] sm:min-h-[320px] xl:min-h-[380px] relative w-full box-border">
            <h3 className="font-poppins font-semibold text-[18px] sm:text-[22px] xl:text-[26px] mt-1 sm:mt-2 mb-1 text-center md:text-left">
              Still have Questions?
            </h3>
            <p className="font-poppins text-[13px] sm:text-[15px] md:text-[17px] xl:text-[19px] mb-4 sm:mb-6 text-center md:text-left">
              Contact Us.
            </p>

            <form className="flex flex-col gap-2 sm:gap-3 mt-4 sm:mt-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Name*"
                  className="w-full h-[36px] sm:h-[40px] bg-[#e0e0e0] rounded-[40px] px-4 sm:px-5 text-[13px] sm:text-[15px] md:text-[16px] xl:text-[18px] font-poppins placeholder-black"
                />
              </div>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email ID*"
                  className="w-full h-[36px] sm:h-[40px] bg-[#e0e0e0] rounded-[40px] px-4 sm:px-5 text-[13px] sm:text-[15px] md:text-[16px] xl:text-[18px] font-poppins placeholder-black"
                />
              </div>
              <div className="relative flex flex-col sm:flex-row gap-2 sm:gap-3">
                <input
                  type="text"
                  placeholder="Querie*"
                  className="flex-1 h-[36px] sm:h-[40px] bg-[#e0e0e0] rounded-[40px] px-4 sm:px-5 text-[13px] sm:text-[15px] md:text-[16px] xl:text-[18px] font-poppins placeholder-black"
                />
                <button
                  type="submit"
                  className="w-full sm:w-[160px] h-[36px] sm:h-[40px] bg-[#444] text-white rounded-[40px] text-[13px] sm:text-[15px] md:text-[16px] xl:text-[18px] font-poppins"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: FAQs */}
        <div className="flex-1 flex flex-col gap-3 sm:gap-4 md:gap-5">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-[#d9d9d9] rounded-[5px] px-3 py-3 sm:px-5 sm:py-4 md:px-5 md:py-4 text-black min-h-[120px] sm:min-h-[150px] xl:min-h-[165px] w-full box-border"
            >
              <h3 className="font-poppins font-semibold text-[16px] sm:text-[20px] xl:text-[24px] mb-1 text-center md:text-left">
                How to join?
              </h3>
              <div className="font-poppins text-[13px] sm:text-[15px] md:text-[17px] xl:text-[19px] text-center md:text-left">
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
