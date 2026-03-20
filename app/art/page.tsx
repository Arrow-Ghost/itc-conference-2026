import Image from "next/image";

export default function AcademiaResearchTrack() {
  return (
    <main className="min-h-screen relative text-white font-poppins selection:bg-white/20">
      <div className="relative z-10 pt-[150px] pb-20 px-4 md:px-10 max-w-[1360px] mx-auto flex flex-col">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            10th IEEE INTERNATIONAL TEST CONFERENCE INDIA 2026
          </h1>
          <p className="text-xl md:text-2xl font-semibold text-[#6aaff1]">
            JULY 19-21, 2026 | RADISSON BLU, MARATHAHALLI, BENGALURU
          </p>
          <h2 className="text-4xl md:text-[64px] font-bold mt-8 tracking-tight text-white">
            Academia Research Track
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-12">
            {/* Introduction */}
            <section className="bg-white/5 p-8 rounded-lg border border-white/10 backdrop-blur-sm">
              <div className="space-y-4 text-gray-200 text-justify">
                <p>
                  International Test Conference, the world’s premier venue
                  dedicated to the electronic test of devices, boards and
                  systems, will host a dedicated Academia Research Track (ART)
                  to manifest creative research ideas from students and young
                  academicians. The key objective of this academia track, first
                  time planned to be held with the International Test
                  Conference, is to provide a dedicated informal forum for
                  vigorous creative discussion and debate of this area from
                  researchers of various academic institutes. The aim is to
                  encourage the oral/poster presentation with discussion on
                  truly innovative and “out-of-the-box” ideas that may not yet
                  have been fully developed for presentation at reviewed
                  conferences to address these challenges.
                </p>
                <p>
                  Students and young academicians are invited to submit original
                  and high quality research work or innovative idea to this
                  track. Selected ideas will interact with dedicated panel from
                  industry to further extended the research work of common
                  interests. ART is a platform of presenting late-breaking
                  ideas, getting feedback on an innovative method, or
                  participating without having to write a full paper.
                </p>
              </div>
            </section>

            {/* Submission Guidelines */}
            <section className="bg-white/5 p-8 rounded-lg border border-white/10 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-6 border-b border-white/20 pb-2">
                Submission Guidelines
              </h3>
              <ul className="list-disc list-outside ml-5 space-y-3 text-gray-200">
                <li>
                  One or two topic(s) from the topic list, or a description of
                  your topic.
                </li>
                <li>An abstract of 100 words or less to be entered online.</li>
                <li>
                  An electronic copy of the paper up to 3 pages or an extended
                  summary up to 4 pages, double-columned in IEEE Format (Paper
                  template).
                </li>
                <li>
                  Your submission must include the problem statement and novelty
                  of solution(s). It should not include information that serves
                  to identify the authors of the manuscript, such as name(s) or
                  affiliation(s) of the author(s). References and bibliographic
                  citations to the author(s) own published works or affiliations
                  should be made in the third person.
                </li>
              </ul>
            </section>

            {/* Selection Criteria */}
            <section className="bg-white/5 p-8 rounded-lg border border-white/10 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-6 border-b border-white/20 pb-2">
                Selection Criteria
              </h3>
              <ul className="list-disc list-outside ml-5 space-y-3 text-gray-200">
                <li>
                  Abstracts will be selected based on the novelty of the work
                  and its relevance to the conference. The selected abstracts
                  would be later either categorized into poster presentation or
                  oral presentation, solely based on the merit.
                </li>
                <li>
                  Upon receiving the acceptance notification, the author will be
                  informed if the paper is classified as a regular full paper or
                  a poster.
                </li>
                <li>
                  If the submission got accepted under full paper category, it
                  will be considered for inclusion into IEEE Xplore subject to
                  meeting IEEE Xplore’s scope and quality requirements.
                </li>
              </ul>
            </section>

            {/* Additional Benefits */}
            <section className="bg-white/5 p-8 rounded-lg border border-white/10 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-6 border-b border-white/20 pb-2">
                Additional Benefits
              </h3>
              <ul className="list-disc list-outside ml-5 space-y-3 text-gray-200">
                <li>
                  Registration fee waiver and partial or full travel support
                  will be provided through fellowship.
                </li>
                <li>
                  Long term research plan with industry, if research interests
                  align.
                </li>
                <li>
                  High Impact Research award will be presented in conference
                  banquet.
                </li>
              </ul>
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
                <div>RF, mm-Wave and THz Testing</div>
                <div>Embedded BIST & DFT</div>
                <div>3D/2.5D Test</div>
                <div>Emerging Defect Mechanisms</div>
                <div>Adaptive Test in Practice</div>
                <div>Hardware Security and Trust</div>
                <div>ATE/Probe Card Design</div>
                <div>Known-Good-Die testing</div>
                <div>Advances in Boundary Scan</div>
                <div>Memory Test and Repair</div>
                <div>Data Driven Methods</div>
                <div>MEMS Testing</div>
                <div>Data Exchange and Infrastructure</div>
                <div>Mixed-Signal and Analog Test</div>
                <div>Defect-Oriented Testing</div>
                <div>New Technologies and Test</div>
                <div>DFM and Test Diagnosis</div>
                <div>On-Chip Test Compression</div>
                <div>Economics of Test</div>
                <div>Online Test</div>
                <div>End-to-End Data Analysis</div>
                <div>Pre- and Post-Silicon Validation</div>
                <div>Bring Up</div>
                <div>System Test (Applications)</div>
                <div>Power Issues in Test</div>
                <div>System Test (Hardware/Software)</div>
                <div>Protocol-aware Test</div>
                <div>Test-to-Design Feedback</div>
                <div>Reliability and Resilience</div>
                <div>Test Escape Analysis</div>
                <div>Scan Based Test</div>
                <div>SoC/SiP/NoC Test</div>
                <div>Silicon Debug</div>
                <div>IoT Testing</div>
                <div>Simulation and Test</div>
                <div>Jitter, High-Speed I/O and RF Test</div>
                <div>Test Flow Optimizations</div>
                <div>Test Generation and Validation</div>
                <div>Test Resource Partitioning</div>
                <div>Test Standards</div>
                <div>Test Time Analysis and Reduction</div>
                <div>Testing High Speed Optics/Photonics</div>
                <div>Yield Analysis and Optimization</div>
              </div>
            </section>
          </div>

          {/* Sidebar Information */}
          <div className="lg:col-span-1 space-y-8">
            {/* Submit Button Box */}
            <div className="bg-[#1a4b7c] p-6 rounded-lg border border-[#6aaff1]/50 shadow-lg sticky top-24">
              <h3 className="text-xl font-bold mb-4 text-[#6aaff1] border-b border-[#6aaff1]/30 pb-2">
                Submit Research
              </h3>
              <p className="text-sm text-gray-200 mb-6">
                Share your innovative ideas and research with the community.
              </p>
              <div className="mt-4">
                <a
                  href="https://easychair.org/conferences/?conf=itcindia2026"
                  className="block w-full bg-[#6aaff1] hover:bg-[#6aaff1]/90 text-[#03396c] font-bold text-center py-3 rounded transition-colors"
                >
                  SUBMIT ACADEMIA RESEARCH TRACK
                </a>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white/5 p-6 rounded-lg border border-white/10 backdrop-blur-sm text-sm text-gray-300">
              <h4 className="font-bold text-white mb-2">Need Help?</h4>
              <p className="mb-4">
                For questions regarding the program or submission process,
                please contact us.
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
                    Email:
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
      </div>
    </main>
  );
}
