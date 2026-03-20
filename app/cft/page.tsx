import Image from "next/image";

export default function CallForTutorials() {
  return (
    <main className="min-h-screen relative text-white font-poppins selection:bg-white/20">
      <div className="relative z-10 pt-[150px] pb-20 px-4 md:px-10 max-w-[1360px] mx-auto flex flex-col">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            10th IEEE INTERNATIONAL TEST CONFERENCE INDIA 2026
          </h1>
          <p className="text-xl md:text-2xl font-semibold text-[#6aaff1]">
            JUL 19-21, 2026 | BENGALURU, INDIA
          </p>
          <h2 className="text-4xl md:text-[64px] font-bold mt-8 tracking-tight text-white">
            Call for Tutorials
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-12">
            {/* Submission Guidelines */}
            <section className="bg-white/5 p-8 rounded-lg border border-white/10 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-6 border-b border-white/20 pb-2">
                Submission Guidelines
              </h3>
              <ul className="list-disc list-outside ml-5 space-y-3 text-gray-200">
                <li>
                  A tutorial proposal needs to be submitted in template
                  available on ITC India website
                </li>
                <li>
                  Submission link:{" "}
                  <a
                    href="https://easychair.org/my/conference?conf=itcindia2026"
                    className="text-blue-300 hover:text-blue-100 underline break-all"
                  >
                    https://easychair.org/my/conference?conf=itcindia2026
                  </a>
                </li>
                <li>
                  <strong>The following details are mandatory:</strong>
                  <ul className="list-circle list-outside ml-5 mt-2 space-y-1">
                    <li>Tutorial title</li>
                    <li>Tutorial abstract</li>
                    <li>
                      Topics and subtopics to be covered, and the approximate
                      time devoted to each topic
                    </li>
                    <li>The targeted audience and prerequisites</li>
                    <li>
                      Preferred tutorial duration: 3 hours (for full tutorials)
                      or 1.5 hours (for short tutorials)
                    </li>
                    <li>Name, affiliation, bio of each author</li>
                  </ul>
                </li>
                <li>Proposals will undergo a panel review process</li>
                <li>
                  All presenters listed in the tutorial proposal must be
                  available for tutorial presentation
                </li>
                <li>
                  Consent should be obtained from all the presenters and all
                  organizations involved in presenting the material before
                  making the tutorial proposal
                </li>
                <li>
                  If proposal is accepted, final presentation must be shared by
                  final manuscript due date for review
                </li>
                <li>
                  Accepted tutorial abstracts will be published in conference
                  proceedings
                </li>
              </ul>
            </section>

            {/* Call for Submission Text */}
            <section className="bg-white/5 p-8 rounded-lg border border-white/10 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-6 border-b border-white/20 pb-2">
                Call for Submission
              </h3>
              <div className="space-y-4 text-gray-200 text-justify">
                <p>
                  International Test Conference is the world’s premier venue
                  dedicated to the electronic test of devices, boards and
                  systems—covering the complete cycle from design verification,
                  design-for-test, design-for-manufacturing, silicon debug,
                  manufacturing test, system test, diagnosis, reliability and
                  failure analysis, and back to process and design improvement.
                  At ITC India, design, test, and yield professionals can
                  confront challenges faced by the industry, and learn how these
                  challenges are being addressed by the combined efforts of
                  academia, design tool and equipment suppliers, designers, and
                  test engineers. This ITC India conference will be focusing on
                  Test development in India, but the submissions may not be
                  limited to topics related to this region. Topics related to
                  design and test development across multi geographical regions
                  will be of special interest.
                </p>
                <p>
                  Authors are invited to submit original, high quality,
                  practical and industry best practices as Tutorials describing
                  recent work in the field of test and design.
                </p>
              </div>
            </section>

            {/* Topics of Interest */}
            <section className="bg-white/5 p-8 rounded-lg border border-white/10 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-6 border-b border-white/20 pb-2">
                Topics of Interest
              </h3>
              <p className="mb-4 text-gray-300 italic">
                Include (not limited to):
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-200">
                <div>3D/2.5D IC and Chiplet Testing</div>
                <div>Adaptive Test in Practice</div>
                <div>ATE/Probe Card Design</div>
                <div>Automotive Reliability and Testing</div>
                <div>Advances in Boundary Scan</div>
                <div>Silicon Bring Up</div>
                <div>Defect-Oriented Testing</div>
                <div>DFM and Test Diagnosis</div>
                <div>Economics of Test</div>
                <div>Embedded BIST & DFT</div>
                <div>Emerging Defect Mechanisms</div>
                <div>Hardware Security and Trust</div>
                <div>High-Speed Interface Testing</div>
                <div>IoT Testing</div>
                <div>Known-Good-Die testing</div>
                <div>Low-Power Testing Techniques</div>
                <div>Machine learning applications in DFT</div>
                <div>Memory Test and Repair</div>
                <div>MEMS Testing</div>
                <div>Mixed-Signal and Analog Test</div>
                <div>New Technologies and Test</div>
                <div>On-Chip Test Compression</div>
                <div>Online Test</div>
                <div>Pre- and Post- Silicon Validation</div>
                <div>Quantum Computing Hardware Testing</div>
                <div>Reliability and Resilience</div>
                <div>Scan Based Test</div>
                <div>Security and trust in DFT</div>
                <div>SoC/SiP/NoC Test</div>
                <div>Silicon Debug and diagnosis</div>
                <div>Jitter, RF Test</div>
                <div>Simulation and Test</div>
                <div>System Test</div>
                <div>Test-to-Design Feedback</div>
                <div>Test Data Analytics, Big Data in Testing</div>
                <div>Test Escape Analysis</div>
                <div>Test Flow Optimizations</div>
                <div>Test Generation and Validation</div>
                <div>Test Resource Partitioning</div>
                <div>Test Standards and best practices in DFT</div>
                <div>Test Time Analysis and Reduction</div>
                <div>Testing and Validation of AI Hardware</div>
                <div>Testing High Speed Optics/Photonics</div>
                <div>Yield Analysis and Optimization</div>
              </div>
            </section>
          </div>

          {/* Sidebar Information */}
          <div className="lg:col-span-1 space-y-8">
            {/* Important Dates Box */}
            <div className="bg-[#1a4b7c] p-6 rounded-lg border border-[#6aaff1]/50 shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-[#6aaff1] border-b border-[#6aaff1]/30 pb-2">
                Important Dates
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-300 uppercase">
                    Tutorial submission deadline
                  </p>
                  <p className="text-lg font-semibold">31st March, 2026</p>
                </div>
                <div>
                  <p className="text-xs text-gray-300 uppercase">
                    Author notification
                  </p>
                  <p className="text-lg font-semibold">12th May, 2026</p>
                </div>
                <div>
                  <p className="text-xs text-gray-300 uppercase">
                    Final manuscript due
                  </p>
                  <p className="text-lg font-semibold">13th June, 2026</p>
                </div>
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
                    href="http://www.itctestweekindia.org"
                    className="text-blue-300 hover:underline"
                  >
                    www.itctestweekindia.org
                  </a>
                </p>
                <p>
                  <span className="block text-xs uppercase text-gray-400">
                    Program Chair Email:
                  </span>
                  <a
                    href="mailto:itc-india-tpc@googlegroups.com"
                    className="text-blue-300 hover:underline break-all"
                  >
                    itc-india-tpc@googlegroups.com
                  </a>
                </p>
                <p>
                  <span className="block text-xs uppercase text-gray-400">
                    Tutorial Chair Email:
                  </span>
                  <a
                    href="mailto:ITC-India-2026-Tutorials@easychair.org"
                    className="text-blue-300 hover:underline break-all"
                  >
                    ITC-India-2026-Tutorials@easychair.org
                  </a>
                </p>
              </div>
            </div>

            <div className="bg-white/5 p-6 rounded-lg border border-white/10 backdrop-blur-sm">
              <p className="font-semibold text-center italic">
                ITC India invites submissions on the latest advances in test,
                validation and diagnosis of ICs, boards and systems.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
