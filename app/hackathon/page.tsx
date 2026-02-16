import Image from "next/image";
import Link from "next/link";

export default function HackathonPage() {
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

      {/* Circuit Schematic Background */}
      <div className="absolute top-[120px] right-15 w-[80%] h-[600px] z-0 pointer-events-none hidden lg:block opacity-60">
        <div className="relative w-full h-full">
          <Image
            src="/images/fellowship-schematic.png"
            alt="Circuit Schematic"
            fill
            className="object-contain object-right-top"
          />
        </div>
      </div>

      <div className="relative z-10 pt-[150px] pb-20 px-6 md:px-16 max-w-[1400px] mx-auto flex flex-col">
        {/* Header Section */}
        <div className="max-w-4xl mb-20 relative">
          <div className="mb-6">
            <p className="text-sm md:text-base font-semibold text-yellow-400 uppercase tracking-wider mb-2">
              ITC India 2026 Presents
            </p>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight uppercase leading-tight">
              HACKATHON
            </h1>
            <h2 className="text-2xl md:text-4xl font-bold mb-8 uppercase leading-tight text-gray-100 max-w-3xl">
              Innovate. Create. Transform the Future of Semiconductor Testing
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link href="/hackathon/register">
              <button className="bg-yellow-500 hover:bg-yellow-400 text-[#03396c] text-lg md:text-xl font-bold py-4 px-10 rounded-lg shadow-[0_0_20px_rgba(234,179,8,0.3)] transition-all duration-300 uppercase tracking-wider">
                Register Now
              </button>
            </Link>
            <Link href="#details">
              <button className="bg-transparent hover:bg-white/10 text-white text-lg md:text-xl font-bold py-4 px-10 border-2 border-white/50 rounded-lg shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 uppercase tracking-wider">
                Learn More
              </button>
            </Link>
          </div>

          {/* Event Details Banner */}
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-xs text-gray-300 uppercase mb-1">Date</p>
                <p className="text-xl md:text-2xl font-bold text-yellow-400">
                  July 19-21, 2026
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-300 uppercase mb-1">Location</p>
                <p className="text-xl md:text-2xl font-bold">
                  Bengaluru, India
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-300 uppercase mb-1">Duration</p>
                <p className="text-xl md:text-2xl font-bold">48 Hours</p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Line */}
        <div className="relative w-full mb-16 hidden md:block">
          <div className="absolute -left-6 right-[30%] top-0 border-t border-dashed border-white/30"></div>
          <div className="absolute right-[30%] top-0 w-20 h-20 border-t border-r border-dashed border-white/30 transform skew-x-45 origin-top-left"></div>
        </div>

        {/* About Section */}
        <div id="details" className="mb-16 scroll-mt-32">
          <h2 className="text-4xl md:text-5xl font-bold uppercase leading-none mb-8">
            About the Hackathon
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-transparent mb-8"></div>

          <div className="bg-white/5 backdrop-blur-sm p-8 md:p-12 rounded-lg border border-white/10 shadow-xl">
            <p className="text-lg md:text-xl leading-relaxed text-gray-200 mb-6">
              Join us for an electrifying 48-hour innovation marathon where
              brilliant minds converge to solve real-world challenges in
              semiconductor testing, design verification, and hardware
              validation. This hackathon is your opportunity to work alongside
              industry experts, leverage cutting-edge tools, and create
              solutions that could shape the future of the semiconductor
              industry.
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-gray-200">
              Whether you're a student, professional, or enthusiast, this is
              your chance to showcase your skills, learn from the best, and
              network with leaders in the test and verification domain.
            </p>
          </div>
        </div>

        {/* Themes Section */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold uppercase leading-none mb-8">
            Hackathon Themes
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-transparent mb-8"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Theme 1 */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:border-yellow-400/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(234,179,8,0.2)]">
              <div className="text-3xl mb-4">🔬</div>
              <h3 className="text-xl md:text-2xl font-bold mb-3">
                AI/ML in Testing
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Develop intelligent solutions using machine learning for test
                pattern generation, fault diagnosis, and test optimization.
              </p>
            </div>

            {/* Theme 2 */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:border-yellow-400/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(234,179,8,0.2)]">
              <div className="text-3xl mb-4">🛡️</div>
              <h3 className="text-xl md:text-2xl font-bold mb-3">
                Hardware Security
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Create innovative approaches to detect and prevent hardware
                trojans, side-channel attacks, and security vulnerabilities.
              </p>
            </div>

            {/* Theme 3 */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:border-yellow-400/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(234,179,8,0.2)]">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl md:text-2xl font-bold mb-3">
                Low-Power Design
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Build tools and methodologies for power-aware testing,
                energy-efficient test strategies, and power consumption
                analysis.
              </p>
            </div>

            {/* Theme 4 */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:border-yellow-400/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(234,179,8,0.2)]">
              <div className="text-3xl mb-4">🔧</div>
              <h3 className="text-xl md:text-2xl font-bold mb-3">
                DFT Innovation
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Design novel Design-for-Test architectures, built-in self-test
                mechanisms, and automated test insertion techniques.
              </p>
            </div>

            {/* Theme 5 */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:border-yellow-400/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(234,179,8,0.2)]">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl md:text-2xl font-bold mb-3">
                Test Data Analytics
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Develop visualization tools, predictive analytics, and big data
                solutions for test data management and analysis.
              </p>
            </div>

            {/* Theme 6 */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:border-yellow-400/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(234,179,8,0.2)]">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-xl md:text-2xl font-bold mb-3">
                Open Innovation
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Propose your own unique solution to any challenge in
                semiconductor testing, validation, or verification.
              </p>
            </div>
          </div>
        </div>

        {/* Prizes Section */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold uppercase leading-none mb-8">
            Prizes & Recognition
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-transparent mb-8"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* First Prize */}
            <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 backdrop-blur-sm p-8 rounded-lg border-2 border-yellow-400 shadow-[0_0_30px_rgba(234,179,8,0.3)] text-center">
              <div className="text-5xl mb-4">🥇</div>
              <h3 className="text-3xl font-bold mb-3 text-yellow-400">
                1st Place
              </h3>
              <p className="text-4xl font-bold mb-2">₹1,00,000</p>
              <p className="text-gray-300">+ Certificate + Mentorship</p>
            </div>

            {/* Second Prize */}
            <div className="bg-gradient-to-br from-gray-300/20 to-gray-400/10 backdrop-blur-sm p-8 rounded-lg border-2 border-gray-300 shadow-[0_0_20px_rgba(200,200,200,0.2)] text-center">
              <div className="text-5xl mb-4">🥈</div>
              <h3 className="text-3xl font-bold mb-3 text-gray-300">
                2nd Place
              </h3>
              <p className="text-4xl font-bold mb-2">₹50,000</p>
              <p className="text-gray-300">+ Certificate + Mentorship</p>
            </div>

            {/* Third Prize */}
            <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 backdrop-blur-sm p-8 rounded-lg border-2 border-orange-400 shadow-[0_0_20px_rgba(251,146,60,0.2)] text-center">
              <div className="text-5xl mb-4">🥉</div>
              <h3 className="text-3xl font-bold mb-3 text-orange-400">
                3rd Place
              </h3>
              <p className="text-4xl font-bold mb-2">₹25,000</p>
              <p className="text-gray-300">+ Certificate + Mentorship</p>
            </div>
          </div>

          <div className="mt-8 bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10">
            <p className="text-center text-lg text-gray-200">
              <strong className="text-yellow-400">Special Prizes:</strong> Best
              Innovation Award, Best Student Team, Industry Choice Award, and
              more!
            </p>
          </div>
        </div>

        {/* Two Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12 mb-16">
          {/* Who Can Participate */}
          <div className="relative">
            <div className="mb-6 pb-2 border-b border-white/30 w-fit">
              <h3 className="text-3xl md:text-4xl font-bold uppercase">
                Who Can Participate?
              </h3>
            </div>

            <div className="space-y-4 text-base md:text-lg text-gray-200 leading-relaxed">
              <div className="flex items-start gap-3">
                <span className="text-yellow-400 font-bold text-xl">•</span>
                <p>
                  <strong className="text-white">Students:</strong>{" "}
                  Undergraduate and graduate students from any discipline with
                  an interest in electronics, computer science, or
                  semiconductors.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-400 font-bold text-xl">•</span>
                <p>
                  <strong className="text-white">Professionals:</strong>{" "}
                  Industry professionals, researchers, and engineers working in
                  semiconductor, VLSI, or related fields.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-400 font-bold text-xl">•</span>
                <p>
                  <strong className="text-white">Enthusiasts:</strong> Anyone
                  passionate about hardware innovation and problem-solving.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-400 font-bold text-xl">•</span>
                <p>
                  <strong className="text-white">Teams:</strong> Form teams of
                  2-4 members. Solo participation is also welcome!
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-400 font-bold text-xl">•</span>
                <p>
                  <strong className="text-white">Open to All:</strong> No prior
                  hackathon experience required. Beginners are encouraged to
                  participate!
                </p>
              </div>
            </div>
          </div>

          {/* What You Get */}
          <div className="relative">
            <div className="mb-6 pb-2 border-b border-white/30 w-fit">
              <h3 className="text-3xl md:text-4xl font-bold uppercase">
                What You Get
              </h3>
            </div>

            <div className="space-y-4 text-base md:text-lg text-gray-200 leading-relaxed">
              <div className="flex items-start gap-3">
                <span className="text-yellow-400 font-bold text-xl">•</span>
                <p>
                  <strong className="text-white">Expert Mentorship:</strong>{" "}
                  Guidance from industry leaders and academic experts throughout
                  the event.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-400 font-bold text-xl">•</span>
                <p>
                  <strong className="text-white">Tools & Resources:</strong>{" "}
                  Access to premium EDA tools, cloud computing resources, and
                  development boards.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-400 font-bold text-xl">•</span>
                <p>
                  <strong className="text-white">Networking:</strong> Connect
                  with peers, professionals, and potential employers from
                  leading semiconductor companies.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-400 font-bold text-xl">•</span>
                <p>
                  <strong className="text-white">Food & Refreshments:</strong>{" "}
                  Meals, snacks, and beverages provided throughout the event.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-400 font-bold text-xl">•</span>
                <p>
                  <strong className="text-white">Swag & Goodies:</strong> Event
                  merchandise, t-shirts, and sponsor swag for all participants.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-400 font-bold text-xl">•</span>
                <p>
                  <strong className="text-white">Certificates:</strong>{" "}
                  Participation certificates for all attendees and special
                  recognition for winners.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold uppercase leading-none mb-8">
            Event Schedule
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-transparent mb-8"></div>

          <div className="space-y-4">
            {/* Day 1 */}
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10">
              <h3 className="text-2xl font-bold mb-4 text-yellow-400">
                Day 1 - July 19, 2026
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex gap-4">
                  <span className="text-gray-400 font-mono">09:00 AM</span>
                  <span>Registration & Welcome</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-gray-400 font-mono">10:00 AM</span>
                  <span>Opening Ceremony & Problem Statements</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-gray-400 font-mono">11:00 AM</span>
                  <span>Hacking Begins!</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-gray-400 font-mono">01:00 PM</span>
                  <span>Lunch Break</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-gray-400 font-mono">06:00 PM</span>
                  <span>Mentor Check-in #1</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-gray-400 font-mono">08:00 PM</span>
                  <span>Dinner & Networking</span>
                </div>
              </div>
            </div>

            {/* Day 2 */}
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10">
              <h3 className="text-2xl font-bold mb-4 text-yellow-400">
                Day 2 - July 20, 2026
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex gap-4">
                  <span className="text-gray-400 font-mono">08:00 AM</span>
                  <span>Breakfast</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-gray-400 font-mono">12:00 PM</span>
                  <span>Mentor Check-in #2</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-gray-400 font-mono">01:00 PM</span>
                  <span>Lunch Break</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-gray-400 font-mono">04:00 PM</span>
                  <span>Workshop: Advanced EDA Tools</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-gray-400 font-mono">08:00 PM</span>
                  <span>Dinner & Entertainment</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-gray-400 font-mono">11:00 PM</span>
                  <span>Midnight Check-in</span>
                </div>
              </div>
            </div>

            {/* Day 3 */}
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10">
              <h3 className="text-2xl font-bold mb-4 text-yellow-400">
                Day 3 - July 21, 2026
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex gap-4">
                  <span className="text-gray-400 font-mono">08:00 AM</span>
                  <span>Breakfast</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-gray-400 font-mono">11:00 AM</span>
                  <span>Code Freeze - Submissions Due</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-gray-400 font-mono">12:00 PM</span>
                  <span>Lunch Break</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-gray-400 font-mono">02:00 PM</span>
                  <span>Project Presentations</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-gray-400 font-mono">05:00 PM</span>
                  <span>Judging & Deliberation</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-gray-400 font-mono">06:30 PM</span>
                  <span>Award Ceremony & Closing</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Dates Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            {/* Rules & Guidelines */}
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg border border-white/10">
              <h3 className="text-3xl font-bold mb-6 border-b border-white/20 pb-3">
                Rules & Guidelines
              </h3>
              <ul className="space-y-3 text-gray-200">
                <li className="flex items-start gap-3">
                  <span className="text-yellow-400 mt-1">▸</span>
                  <span>
                    All team members must be registered participants of ITC
                    India 2026.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-400 mt-1">▸</span>
                  <span>
                    Teams can consist of 1-4 members. Cross-institution teams
                    are allowed.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-400 mt-1">▸</span>
                  <span>
                    All code and designs must be original work created during
                    the hackathon period.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-400 mt-1">▸</span>
                  <span>
                    Use of existing libraries, frameworks, and APIs is
                    permitted, but must be documented.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-400 mt-1">▸</span>
                  <span>
                    Projects will be judged on innovation, technical complexity,
                    practicality, and presentation.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-400 mt-1">▸</span>
                  <span>
                    All submissions must include source code, documentation, and
                    a demo/presentation.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-400 mt-1">▸</span>
                  <span>
                    Participants must follow the IEEE Code of Ethics and
                    maintain professional conduct.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-400 mt-1">▸</span>
                  <span>
                    Organizers reserve the right to disqualify teams violating
                    rules or exhibiting misconduct.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Important Dates */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 backdrop-blur-sm p-6 rounded-lg border-2 border-yellow-400/50 shadow-[0_0_25px_rgba(234,179,8,0.2)]">
              <h3 className="text-2xl font-bold mb-6 text-yellow-400 border-b border-yellow-400/30 pb-3">
                Important Dates
              </h3>
              <div className="space-y-5">
                <div>
                  <p className="text-xs text-gray-300 uppercase tracking-wide mb-1">
                    Registration Opens
                  </p>
                  <p className="text-xl font-bold">March 1, 2026</p>
                </div>
                <div>
                  <p className="text-xs text-gray-300 uppercase tracking-wide mb-1">
                    Early Bird Deadline
                  </p>
                  <p className="text-xl font-bold">May 15, 2026</p>
                </div>
                <div>
                  <p className="text-xs text-gray-300 uppercase tracking-wide mb-1">
                    Registration Closes
                  </p>
                  <p className="text-xl font-bold">July 10, 2026</p>
                </div>
                <div>
                  <p className="text-xs text-gray-300 uppercase tracking-wide mb-1">
                    Hackathon Dates
                  </p>
                  <p className="text-xl font-bold text-yellow-400">
                    July 19-21, 2026
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10">
              <h4 className="font-bold text-lg mb-4 text-white">Contact Us</h4>
              <div className="space-y-3 text-sm">
                <p>
                  <span className="block text-xs uppercase text-gray-400 mb-1">
                    Email:
                  </span>
                  <a
                    href="mailto:hackathon@itctestweekindia.org"
                    className="text-yellow-400 hover:underline break-all"
                  >
                    hackathon@itctestweekindia.org
                  </a>
                </p>
                <p>
                  <span className="block text-xs uppercase text-gray-400 mb-1">
                    Website:
                  </span>
                  <a
                    href="http://www.itctestweekindia.org"
                    className="text-yellow-400 hover:underline"
                  >
                    www.itctestweekindia.org
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-yellow-500/20 via-yellow-600/10 to-transparent backdrop-blur-sm p-12 rounded-lg border border-yellow-400/30 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 uppercase">
            Ready to Innovate?
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Join hundreds of innovators in shaping the future of semiconductor
            testing. Register now and be part of this extraordinary event!
          </p>
          <Link href="/hackathon/register">
            <button className="bg-yellow-500 hover:bg-yellow-400 text-[#03396c] text-xl md:text-2xl font-bold py-5 px-14 rounded-lg shadow-[0_0_30px_rgba(234,179,8,0.4)] transition-all duration-300 uppercase tracking-wider hover:scale-105">
              Register for Hackathon
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
