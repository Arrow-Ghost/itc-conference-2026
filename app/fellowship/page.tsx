import Image from "next/image";
import Link from "next/link";

const aboutPoints = [
  "IEEE ITC India 2026 invites students, researchers, and faculty members working in the area of VLSI Testing to apply for the Fellowship Program. IEEE ITC India has a longstanding tradition of offering generous fellowships to students, researchers, and faculty from academic institutions across India, and we are pleased to continue this initiative for our 10th Edition of IEEE ITC India 2026.",
  "The fellowship includes complimentary conference registration and reimbursement (fixed amount) towards travel and accommodation for attending the conference. Fellowships are open to Indian students, researchers, and faculty actively engaged in VLSI test–related domains.",
  "Fellowship recipients are required to attend the entire three-day conference, and attendance will be formally recorded. The fellowship is intended as a facilitative support mechanism for participants who may otherwise lack adequate institutional funding, and should not be viewed as an honor or award.",
  "Applicants must be full-time students or regular faculty members at the time of the conference. College identity cards and Aadhaar cards will be verified during registration.",
  "The selection and acceptance of fellowship applications will be solely based on the criteria defined by the IEEE ITC India Fellowship Committee.",
];

const guidelinePoints = [
  "The applicant must be a registered full-time student (UG/PG/Ph.D.) or a regular faculty member of a recognized institution, actively engaged in the area of VLSI Testing or allied domains.",
  "A bonafide certificate issued by the Head of the Department confirming full-time status, along with a valid institutional identity card and Aadhaar card, must be produced at the time of claiming reimbursements.",
  "All fellowship recipients are required to attend all tutorials and technical sessions for the entire duration of the conference.",
  "Attendance is mandatory on all days of the conference, and fellows are expected to report to the conference venue by 9:00 AM each day and remain until the conclusion of all scheduled technical sessions.",
  "Fellowship awardees who are authors of regular papers or participants in the Academia–Research Track are also required to strictly comply with these fellowship guidelines.",
  "Failure to maintain mandatory attendance may result in the forfeiture of the Deposit return and/or reimbursement of travel and accommodation expenses.",
  "Late arrivals or early departures will not be permitted. In such cases, the Fellowship Committee reserves the right to partially or fully forfeit the reimbursement amount.",
];

const selectionPoints = [
  "Authors of accepted papers will be given priority.",
  "Based on Academic achievements and research contributions.",
  "Statement of purpose for attending ITC India 2026.",
];

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-6">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start gap-4">
          <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-[#6aaff1]" />
          <span className="text-base md:text-lg text-gray-200 font-light leading-relaxed">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

function SectionRow({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col lg:flex-row gap-8 lg:gap-16 py-12 md:py-16">
      <div className="lg:w-[30%] xl:w-[28%] shrink-0">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-wide text-white leading-tight">
          {heading}
        </h2>
        <div className="mt-4 h-px w-16 bg-[#6aaff1]" />
      </div>

      <div className="flex-1 min-w-0">{children}</div>
    </section>
  );
}

function ZigzagSeparator() {
  return (
    <div className="w-full h-[30px] sm:h-[40px] md:h-[50px] lg:h-[60px] xl:h-[70px] relative -my-2 sm:-my-4 md:-my-6 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 w-full h-full opacity-50 sm:opacity-60 md:opacity-70">
        <Image
          src="/images/vector11.svg"
          alt="Separator"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}

function ZigzagSeparatorAlt() {
  return (
    <div className="w-full h-[30px] sm:h-[40px] md:h-[50px] lg:h-[60px] xl:h-[70px] relative -my-2 sm:-my-4 md:-my-6 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 w-full h-full opacity-50 sm:opacity-60 md:opacity-70 scale-x-[-1]">
        <Image
          src="/images/vector11.svg"
          alt="Separator"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}

export default function FellowshipPage() {
  return (
    <main className="min-h-screen relative bg-[#03396c] text-white font-poppins overflow-hidden selection:bg-white/20">
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

      {/* Decorative schematic */}
      <div className="absolute top-[120px] right-0 w-[50%] h-[680px] z-0 pointer-events-none hidden lg:block opacity-50">
        <div className="relative w-full h-full">
          <Image
            src="/images/fellowship-schematic.png"
            alt="Circuit Schematic"
            fill
            className="object-contain object-right-top"
          />
        </div>
      </div>

      <div className="relative z-10 pt-40 pb-28 px-[5%] sm:px-[4%] md:px-[3%] lg:px-[2.5%] xl:px-[2.25%]">
        {/*<ZigzagSeparatorAlt />*/}

        <div className="pt-10 pb-16 md:pb-24">
          <p className="text-xs md:text-sm font-semibold tracking-[0.25em] text-[#6aaff1] uppercase mb-5">
            IEEE ITC India 2026
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight uppercase leading-none">
            ITC Fellowship
            <br />
            Proposal
          </h1>
          <p className="text-base md:text-xl text-gray-300 font-light max-w-2xl mb-10 leading-relaxed">
            REIMAGINING TEST IN THE ERA OF INTELLIGENT SILICON
          </p>
          <Link href="/fellowship/register">
            <button className="bg-[#03396c] hover:bg-[#1a4b7c] text-white text-base md:text-lg font-bold py-4 px-12 border border-white/50 shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 uppercase tracking-wider backdrop-blur-sm">
              REGISTER NOW
            </button>
          </Link>
        </div>

        {/*<ZigzagSeparatorAlt />*/}

        <SectionRow heading="About the Fellowship">
          <BulletList items={aboutPoints} />
        </SectionRow>

        <ZigzagSeparator />

        <SectionRow heading="Fellowship Guidelines">
          <BulletList items={guidelinePoints} />
        </SectionRow>

        <ZigzagSeparatorAlt />

        <SectionRow heading="Selection Criteria">
          <BulletList items={selectionPoints} />
        </SectionRow>

        {/*<ZigzagSeparatorAlt />*/}

        <section className="py-12 md:py-16 border-t border-white/10">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase leading-none mb-4">
              Support Details
            </h2>
            <div className="h-px w-24 bg-[#6aaff1]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-16">
            <div>
              <div className="mb-8 pb-3 border-b border-white/30">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold">
                  Support for Local Fellows
                </h3>
              </div>
              <div className="flex flex-col gap-6 text-base md:text-lg text-gray-200 font-light leading-relaxed">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <p key={n}>
                    <span className="font-semibold text-white mr-2">{n}.</span>
                    Lorem ipsum dolor sit amet consectetur. Felis quis in
                    molestie curabitur bibendum. Amet in arcu laoreet arcu risus
                    hendrerit odio senectus sapien. Blandit sit at sagittis
                    auctor est.
                  </p>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-8 pb-3 border-b border-white/30">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold">
                  Support for Outstation Fellows
                </h3>
              </div>
              <div className="flex flex-col gap-6 text-base md:text-lg text-gray-200 font-light leading-relaxed">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <p key={n}>
                    <span className="font-semibold text-white mr-2">{n}.</span>
                    Lorem ipsum dolor sit amet consectetur. Felis quis in
                    molestie curabitur bibendum. Amet in arcu laoreet arcu risus
                    hendrerit odio senectus sapien. Blandit sit at sagittis
                    auctor est.
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="pt-16 md:pt-24 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-6 mx-auto">
          <Link href="/fellowship/register">
            <button className="bg-[#6aaff1] hover:bg-[#4d9de0] text-[#03396c] text-base md:text-lg font-bold py-4 px-12 transition-all duration-300 uppercase tracking-wider">
              APPLY NOW
            </button>
          </Link>
          <p className="text-sm md:text-base text-gray-400 font-light max-w-sm leading-relaxed">
            Applications are reviewed on a rolling basis. Early submissions are
            encouraged.
          </p>
        </div>
      </div>
    </main>
  );
}
