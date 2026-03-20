import React from "react";
import Image from "next/image";

export default function CallForPapers() {
  return (
    <main className="min-h-screen relative text-white font-poppins selection:bg-white/20">
      <div className="relative z-10 pt-[150px] pb-20 px-4 md:px-10 max-w-[1360px] mx-auto flex flex-col">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 md:gap-5 mb-4">
            <Image
              src="/itc-logo.svg"
              alt="ITC Logo"
              width={60}
              height={60}
              className="w-9/12 h-9/12 md:w-14 md:h-14 object-contain mb-9"
            />
            <h1 className="text-3xl md:text-5xl font-bold">
              10th IEEE INTERNATIONAL TEST CONFERENCE INDIA 2026
            </h1>
          </div>
          <p className="text-xl md:text-2xl font-semibold text-[#6aaff1]">
            JULY 19-21, 2026 | RADISSON BLU, MARATHAHALLI, BENGALURU
          </p>
          <h2 className="text-4xl md:text-[64px] font-bold mt-8 tracking-tight text-white">
            Call for Papers
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-12">
            <section className="bg-white/5 p-8 rounded-lg border border-white/10 backdrop-blur-sm">
              <div className="space-y-4 text-gray-200 text-justify">
                <p>
                  Celebrating its 10th edition, the IEEE International Test
                  Conference India (ITC India) is the premier conference
                  dedicated to testing of electronic devices, circuits, and
                  systems. ITC India 2026 invites researchers, developers, and
                  practitioners from academia and industry to submit original,
                  unpublished work on all aspects of VLSI test, reliability,
                  yield, and quality for current and emerging semiconductor
                  technologies.
                </p>
                <p>
                  We seek high-quality unpublished submissions for papers (4-6
                  pages) and posters (1-6 pages) covering the theoretical,
                  practical, and experimental aspects of VLSI testing.
                </p>
              </div>
            </section>

            {/* Submission Format */}
            <section className="bg-white/5 p-8 rounded-lg border border-white/10 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-6 border-b border-white/20 pb-2">
                Submission Format
              </h3>
              <ul className="list-disc list-outside ml-5 space-y-3 text-gray-200">
                <li>
                  <strong>Full Papers:</strong> 4-6 pages following IEEE
                  standard two-column format
                </li>
                <li>
                  <strong>Posters:</strong> 1-6 pages following IEEE standard
                  two-column format
                </li>
                <li>
                  All submissions must adhere to IEEE conference template
                  guidelines
                </li>
              </ul>
            </section>

            {/* Review Process */}
            <section className="bg-white/5 p-8 rounded-lg border border-white/10 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-6 border-b border-white/20 pb-2">
                Review Process
              </h3>
              <ul className="list-disc list-outside ml-5 space-y-3 text-gray-200">
                <li>
                  All submissions undergo a rigorous double-blind peer review
                  process
                </li>
                <li>
                  Multiple expert reviewers evaluate each submission for
                  technical quality, originality, and relevance
                </li>
                <li>Authors must ensure anonymity in their submissions</li>
              </ul>
            </section>

            {/* Submission Guidelines */}
            <section className="bg-white/5 p-8 rounded-lg border border-white/10 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-6 border-b border-white/20 pb-2">
                Submission Guidelines
              </h3>
              <ul className="list-disc list-outside ml-5 space-y-3 text-gray-200">
                <li>
                  Submissions simultaneously under review or accepted by another
                  conference, symposium or journal, will be summarily rejected
                </li>
                <li>
                  Accepted papers will be submitted for inclusion into IEEE
                  Xplore subject to meeting IEEE Xplore&apos;s scope and quality
                  requirements
                </li>
                <li>
                  For detailed information about the submission process,
                  requirements and deadlines, the selection process and any
                  other questions regarding the program itself or contact
                  information, please consult the ITC India web site at{" "}
                  <a
                    href="https://itctestweekindia.org"
                    className="text-blue-300 hover:text-blue-100 underline"
                  >
                    https://itctestweekindia.org
                  </a>{" "}
                  or email the program chair at{" "}
                  <a
                    href="mailto:ITC-India-2026-TPC@easychair.org"
                    className="text-blue-300 hover:text-blue-100 underline break-all"
                  >
                    ITC-India-2026-TPC@easychair.org
                  </a>
                </li>
                <li>
                  An abstract of 100 words or less must be entered online on the
                  submission site
                </li>
                <li>
                  An electronic copy of a complete paper up to 6 pages,
                  double-columned in IEEE Format, A4 size (
                  <a
                    href="https://www.ieee.org/conferences/publishing/templates.html"
                    className="text-blue-300 hover:text-blue-100 underline break-all"
                  >
                    https://www.ieee.org/conferences/publishing/templates.html
                  </a>
                  ) to be submitted through EasyChair (
                  <a
                    href="https://easychair.org/conferences/?conf=itcindia2026"
                    className="text-blue-300 hover:text-blue-100 underline break-all"
                  >
                    https://easychair.org/conferences/?conf=itcindia2026
                  </a>
                  )
                </li>
                <li>
                  Your submission must not include information that serves to
                  identify the authors of the manuscript, such as name(s) or
                  affiliation(s) of the author(s), anywhere in the manuscript,
                  abstract, or in the embedded PDF data. References and
                  bibliographic citations to the author(s) own published works
                  or affiliations should be made in the third person
                </li>
                <li>
                  A submission of 1-3 pages will be reviewed as a poster
                  submission. A submission of 4-6 pages may be accepted as a
                  paper or poster depending on the reviewer feedback
                </li>
              </ul>
            </section>

            {/* Conference Tracks & Suggested Topics */}
            <section className="bg-white/5 p-8 rounded-lg border border-white/10 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-6 border-b border-white/20 pb-2">
                Conference Tracks & Suggested Topics
              </h3>
              <p className="mb-6 text-gray-300 italic">(not limited to)</p>

              <div className="space-y-8">
                <TopicCategory title="Heterogeneous Integration, Chiplets & 2.5D/3D Test">
                  <li>DFT for chiplets and die-to-die links</li>
                  <li>KGD qualification</li>
                  <li>2.5D/3D interconnect test</li>
                  <li>2.5D/3D test standards</li>
                </TopicCategory>

                <TopicCategory title="AI/ML-Driven Test, Adaptive Quality & Outlier Management">
                  <li>Adaptive test frameworks</li>
                  <li>
                    Outlier detection, drift monitoring, false-positive control
                  </li>
                  <li>Agentic AI applications in DFT</li>
                </TopicCategory>

                <TopicCategory title="Automotive, Functional Safety & Mission-Profile Testing">
                  <li>ISO 26262 compliant DFT</li>
                  <li>Latent defect screening and stress-based tests</li>
                  <li>
                    In-system safety monitors and self-test (LBIST/MBIST
                    in-field)
                  </li>
                </TopicCategory>

                <TopicCategory title="Analog, RF & Mixed-Signal Test for 5G/6G, Power & Sensing">
                  <li>High-frequency test methods (mmWave/THz)</li>
                  <li>Power/PMIC test</li>
                  <li>Sensor, interface test (MEMS, precision analog)</li>
                  <li>Jitter, High-Speed I/O and RF Test</li>
                </TopicCategory>

                <TopicCategory title="Memory & Storage Test: HBM, DDR/LPDDR, NVM">
                  <li>HBM stack test</li>
                  <li>DRAM/LPDDR test for pattern-sensitive faults</li>
                  <li>Memory test and repair</li>
                  <li>NVM test for endurance, retention, disturb mechanisms</li>
                </TopicCategory>

                <TopicCategory title="Hardware Security, Trust & Secure Test Access">
                  <li>Secure JTAG/IJTAG access control and authentication</li>
                  <li>Confidential test content and data protection</li>
                  <li>Side-channel aware test</li>
                  <li>Hardware trojan detection</li>
                  <li>PUF characterization and reliability</li>
                </TopicCategory>

                <TopicCategory title="DFT, ATPG, Diagnosis & Test Standards">
                  <li>Advancements in DFT and ATPG</li>
                  <li>Advanced fault models and defect based testing</li>
                  <li>Test standards</li>
                  <li>DFM and test diagnosis</li>
                </TopicCategory>

                <TopicCategory title="System-Level Test (SLT), Reliability and Silicon Lifecycle Management">
                  <li>SLT architectures</li>
                  <li>Field Monitoring, test and debug</li>
                  <li>End-to-End data analysis</li>
                  <li>Silent data corruption</li>
                </TopicCategory>

                <TopicCategory title="Test Economics, Operations & Sustainability">
                  <li>ATE/Probe card design</li>
                  <li>Test time optimization and content prioritization</li>
                  <li>Yield analysis and optimization</li>
                  <li>Silicon debug and test escape analysis</li>
                  <li>OSAT collaboration and vendor-neutral interfaces</li>
                </TopicCategory>

                <TopicCategory title="Testing for Emerging Applications">
                  <li>Quantum device testing</li>
                  <li>Testing high speed optics/photonics</li>
                  <li>Neuromorphic computing</li>
                </TopicCategory>
              </div>
            </section>
          </div>

          {/* Sidebar Information */}
          <div className="lg:col-span-1 space-y-8">
            {/* Important Dates Box */}
            <div className="bg-[#1a4b7c] p-6 rounded-lg border border-[#6aaff1]/50 shadow-lg sticky top-24">
              <h3 className="text-xl font-bold mb-4 text-[#6aaff1] border-b border-[#6aaff1]/30 pb-2">
                Important Dates
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-300 uppercase">
                    Abstract Submission Deadline
                  </p>
                  <p className="text-lg font-semibold">17th March 2026</p>
                </div>
                <div>
                  <p className="text-xs text-gray-300 uppercase">
                    Paper Submission Deadline
                  </p>
                  <p className="text-lg font-semibold">24th March, 2026</p>
                </div>
                <div>
                  <p className="text-xs text-gray-300 uppercase">
                    Author Notification
                  </p>
                  <p className="text-lg font-semibold">10th May, 2026</p>
                </div>
                <div>
                  <p className="text-xs text-gray-300 uppercase">
                    Camera-ready Paper and IEEE Copyright Transfer Due
                  </p>
                  <p className="text-lg font-semibold">31st May 2026</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <a
                  href="https://easychair.org/conferences/?conf=itcindia2026"
                  className="block w-full bg-[#6aaff1] hover:bg-[#6aaff1]/90 text-[#03396c] font-bold text-center py-3 rounded transition-colors"
                >
                  SUBMIT PAPER
                </a>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white/5 p-6 rounded-lg border border-white/10 backdrop-blur-sm text-sm text-gray-300">
              <h4 className="font-bold text-white mb-2">Need Help?</h4>
              <p className="mb-4">
                For detailed information about the submission process,
                requirements and deadlines, the selection process and any other
                questions regarding the program itself or contact information,
                please consult the ITC India web site or email us.
              </p>
              <div className="space-y-2">
                <p>
                  <span className="block text-xs uppercase text-gray-400">
                    Website:
                  </span>
                  <a
                    href="https://itctestweekindia.org"
                    className="text-blue-300 hover:underline"
                  >
                    itctestweekindia.org
                  </a>
                </p>
                <p>
                  <span className="block text-xs uppercase text-gray-400">
                    Program Chair Email:
                  </span>
                  <a
                    href="mailto:ITC-India-2026-TPC@easychair.org"
                    className="text-blue-300 hover:underline break-all"
                  >
                    ITC-India-2026-TPC@easychair.org
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center text-gray-400">
          <p>We look forward to your contributions to ITC India 2026!</p>
        </div>
      </div>
    </main>
  );
}

function TopicCategory({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="text-lg font-semibold text-[#6aaff1] mb-2">{title}</h4>
      <ul className="list-disc list-outside ml-5 space-y-1 text-gray-200 text-sm">
        {children}
      </ul>
    </div>
  );
}
