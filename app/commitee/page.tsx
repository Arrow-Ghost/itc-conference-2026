import Image from "next/image";
import {
  Member,
  members1,
  members2,
  members3,
  members4,
  members5,
  members6,
  members7,
  members8,
  members9,
  members10,
  members11,
  members12,
  members13,
  members14,
  members15,
  members16,
  members17,
  members18,
  members19,
} from "./data";

const sections = [
  { title: "General Chairs", data: members1 },
  { title: "Technical Program Co-Chairs (TPC)", data: members2 },
  { title: "Tutorial Co-Chairs", data: members3 },
  { title: "Industry Test Challenges Co-Chairs", data: members4 },
  { title: "Industry Sessions Co-Chairs", data: members5 },
  { title: "Academia-Research Track Co-Chairs (ART)", data: members6 },
  { title: "Panel Co-Chair", data: members7 },
  { title: "Publication Co-Chair", data: members8 },
  { title: "Fellowship Co-Chairs", data: members9 },
  { title: "Finance Chair", data: members10 },
  { title: "Communication/Website Co-Chairs", data: members11 },
  { title: "Registration Chair", data: members12 },
  { title: "Marketing and Conference Management Co-Chairs", data: members13 },
  // { title: "New Volunteers", data: members14 },
  // { title: "TPC Advisory Committee", data: members15 }, this is for the TPC advisoty commitee
  { title: "Advisory Committee", data: members16 },
];

const MemberCard = ({ member }: { member: Member }) => {
  return (
    <div className="w-[300px] md:w-[360px] min-h-[420px] md:min-h-[480px] border border-white/20 rounded-lg p-8 flex flex-col items-center bg-[#03396c]/50 backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.2)] hover:border-white/40 hover:scale-105 transition-all duration-300 group">
      <div className="relative w-40 h-40 md:w-56 md:h-56 mb-8 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-white/30 transition-colors bg-white/5">
        <Image
          src={`/images/committee/${member.img}`}
          alt={member.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      <div className="text-center flex-grow flex flex-col items-center w-full">
        <h3 className="text-xl md:text-2xl font-bold mb-3 text-white leading-tight">
          {member.name}
        </h3>
        <p className="text-base md:text-lg text-gray-300 font-medium leading-snug">
          {member.comp}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-white/10 w-full flex justify-center">
        <a
          href={member.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors group/icon"
          aria-label={`LinkedIn profile of ${member.name}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-linkedin text-white group-hover/icon:text-[#0077b5] transition-colors"
            viewBox="0 0 16 16"
          >
            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default function Committee() {
  return (
    <main className="min-h-screen overflow-hidden relative text-white font-poppins selection:bg-white/20">
      <div className="relative z-10 pt-[150px] pb-20 px-4 md:px-10 max-w-[1360px] mx-auto flex flex-col items-center">
        {/* Title */}
        <h1 className="text-4xl md:text-[64px] font-bold text-center mb-16 tracking-tight">
          MEET THE COMMITTEE
        </h1>

        {/* Dynamic Sections */}
        {sections.map((section, index) => (
          <div
            key={index}
            className="w-full flex flex-col items-center mb-24 relative"
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-12 text-center text-[#90cbfb] drop-shadow-sm uppercase tracking-wider">
              {section.title}
            </h2>

            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              {section.data.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>

            {/* Dashed Line Separator (Decorative) between sections */}
            {index !== sections.length - 1 && (
              <div className="w-full h-[1px] mt-24 opacity-20 pointer-events-none flex justify-center">
                <div className="w-3/4 h-full border-b border-dashed border-white"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
