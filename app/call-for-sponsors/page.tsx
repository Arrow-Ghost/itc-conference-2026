import Image from "next/image";

export default function CallForSponsors() {
  return (
    <main className="min-h-screen relative text-white font-poppins selection:bg-white/20">
      <div className="relative z-10 pt-[150px] pb-20 px-4 md:px-10 max-w-[1400px] mx-auto flex flex-col">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
            10th IEEE International Test Conference India 2026
          </h1>
          <p className="text-xl md:text-2xl font-semibold text-yellow-400 mb-2">
            JULY 19-21, 2026
          </p>
          <p className="text-lg md:text-xl text-gray-300">
            RADISSON BLU, MARATHAHALLI, BENGALURU
          </p>
          <h2 className="text-4xl md:text-[56px] font-bold mt-8 tracking-tight text-white">
            Call For Sponsorships
          </h2>
        </div>

        {/* Introduction */}
        <section className="bg-white/5 p-8 rounded-lg border border-white/10 backdrop-blur-sm mb-10">
          <div className="space-y-4 text-gray-200 text-justify">
            <p>
              We are excited to announce the 10th IEEE International Test Conference India 2026, taking place at Radisson Blu, Marathalli ORR, Bengaluru, from July 19-21, 2026.
            </p>
            <p>
              Celebrating a decade of excellence, ITC India 2026 marks our 10th annual gathering. This premier forum brings together leading experts, innovators, and practitioners in design, test, manufacturing, and reliability of electronic systems and integrated circuits. For this landmark edition, we are thrilled to host in Bengaluru, India – the heart of India's technology and innovation landscape.
            </p>
            <p>
              The organizing committee is committed to ensuring robust participation, both in terms of quality and quantity, through a comprehensive and impactful technical program that features:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1 text-gray-200">
              <li>Keynote Speeches</li>
              <li>Technical Papers</li>
              <li>Industry Panels</li>
              <li>Exhibits</li>
              <li>Tutorials</li>
              <li>Industry Test Challenges</li>
              <li>Fellowship Program</li>
              <li>Posters</li>
            </ul>
            <p className="mt-4">
              As an industry leader, you understand the importance of establishing your company's technical leadership and effectively highlighting your expertise to the broader technical community. ITC India is the perfect stage for you to achieve significant business value and elevate your organization's profile. Enclosed are the details of several sponsorship opportunities for your serious consideration. The attached sponsorship packages, enrollment forms, and detailed information about various sponsorship options are designed to deliver outstanding Return on Investment (ROI) for your company.
            </p>
          </div>
        </section>

        {/* Sponsorship Packages */}
        <section className="mb-10">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 border-b border-white/20 pb-2">
            Sponsorship Packages
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm md:text-base">
              <thead>
                <tr className="border-b-2 border-yellow-400/50">
                  <th className="text-left py-3 px-2 md:px-4 font-bold text-yellow-400">SPONSORSHIP PACKAGES</th>
                  <th className="text-center py-3 px-2 md:px-4 font-bold text-yellow-400">SLOTS</th>
                  <th className="text-center py-3 px-2 md:px-4 font-bold text-yellow-400">COST (in INR)</th>
                  <th className="text-left py-3 px-2 md:px-4 font-bold text-yellow-400">BENEFITS AND OFFERINGS</th>
                </tr>
              </thead>
              <tbody className="text-gray-200">
                <SponsorRow
                  tier="Silicon"
                  slots="1"
                  cost="13,00,000 + 18% GST"
                  benefits={[
                    "Speaker Slot on Day 1 on the selection by ITC Committee",
                    "Inaugural Ceremony",
                    "One Industry panel slot",
                    "Exclusive Branding throughout the conference",
                    "1 minute video during inauguration & in the displays",
                    "Exhibit booth – 2 Nos (2x3 sqm each)",
                    "25 Free Conference Registrations",
                    "25 Tutorial invitations",
                    "20 Evening Hi-Tea VIP Invitations"
                  ]}
                  isHighlighted
                />
                <SponsorRow
                  tier="Platinum"
                  slots="2"
                  cost="11,00,000 + 18% GST"
                  benefits={[
                    "Speaker Slot on Day 1 or 2 based on the selection by ITC Committee",
                    "Inaugural Ceremony",
                    "One Industry panel slot",
                    "Exclusive Branding throughout the conference",
                    "50 seconds video during inauguration",
                    "Exhibit booth – 2 Nos (2x3sqm each)",
                    "20 Free Conference Registrations",
                    "20 Tutorial invitations",
                    "15 Evening Hi-Tea VIP Invitations"
                  ]}
                  isHighlighted
                />
                <SponsorRow
                  tier="Gold"
                  slots="4"
                  cost="8,00,000 + 18% GST"
                  benefits={[
                    "Speaker Slot on Day 1 or 2 based on the selection by ITC Committee",
                    "One Industry panel slot",
                    "Exclusive Branding throughout the conference",
                    "40 seconds video during lunch breaks",
                    "Exhibit booth – 2x3sqm x 1 stall",
                    "15 Free Conference Registrations",
                    "15 Tutorial invitations",
                    "10 Evening Hi-Tea VIP Invitations"
                  ]}
                />
                <SponsorRow
                  tier="Silver"
                  slots="5"
                  cost="6,00,000 + 18% GST"
                  benefits={[
                    "One Industry panel slot",
                    "Exclusive Branding throughout the conference",
                    "40 seconds video during lunch breaks",
                    "Exhibit booth – 2x3sqm x 1 stall",
                    "60 seconds video played during the lunch sessions (3 times)",
                    "50% discount on Exhibit booth price",
                    "10 Free Conference Registrations",
                    "10 Tutorial invitations",
                    "10 Evening Hi-Tea VIP Invitations"
                  ]}
                />
                <SponsorRow
                  tier="Bronze"
                  slots="6"
                  cost="3,50,000 + 18% GST"
                  benefits={[
                    "Exclusive Branding throughout the conference",
                    "30 seconds video during Coffee/Tea breaks",
                    "5 Free Conference Registrations",
                    "5 Tutorial Invitations",
                    "50% discount on Exhibit booth price"
                  ]}
                />
                <SponsorRow
                  tier="Fellowship Program"
                  slots="7"
                  cost="2,50,000 + 18% GST"
                  benefits={[
                    "Exclusive Branding throughout the conference",
                    "20 Fellowship sponsor",
                    "4 Free Conference Registration",
                    "4 Tutorial Invitations",
                    "4 Evening Hi-Tea VIP Invitations",
                    "25% discount on Exhibit booth price"
                  ]}
                />
                <SponsorRow
                  tier="Industry Test Challenges Session (Invite only session)"
                  slots="2"
                  cost="3,00,000 + 18% GST"
                  benefits={[
                    "Dedicated sponsor for the session Branding",
                    "4 Free Conference Registration",
                    "4 Tutorial Invitations",
                    "4 Evening Hi-Tea VIP Invitations",
                    "25% discount on Exhibit booth price"
                  ]}
                />
                <SponsorRow
                  tier="Exhibit Booths"
                  slots="15"
                  cost="85,000 + 18% GST"
                  benefits={["2x3sqm Exhibit booth with 2 Exhibitor pass"]}
                />
              </tbody>
            </table>
          </div>
        </section>

        {/* Additional Sponsorship Items */}
        <section className="mb-10">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 border-b border-white/20 pb-2">
            Additional Sponsorship Items
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm md:text-base">
              <thead>
                <tr className="border-b-2 border-yellow-400/50">
                  <th className="text-left py-3 px-2 md:px-4 font-bold text-yellow-400">Sl. No</th>
                  <th className="text-left py-3 px-2 md:px-4 font-bold text-yellow-400">Item</th>
                  <th className="text-center py-3 px-2 md:px-4 font-bold text-yellow-400">Slots</th>
                  <th className="text-right py-3 px-2 md:px-4 font-bold text-yellow-400">Price (INR)</th>
                </tr>
              </thead>
              <tbody className="text-gray-200">
                <AdditionalItemRow slNo="1" item="Panel Discussions" slots="8" price="3,00,000" />
                <AdditionalItemRow slNo="2" item="Keynote Speeches (Based on Technical Steering committee selection)" slots="4" price="7,00,000" />
                <AdditionalItemRow slNo="3" item="Inaugural Ceremony/Cultural Event" slots="1" price="6,00,000" />
                <AdditionalItemRow slNo="4" item="Evening Hi-Tea" slots="1" price="5,00,000" />
                <AdditionalItemRow slNo="5" item="Awards Ceremony" slots="1" price="5,00,000" />
                <AdditionalItemRow slNo="6" item="Conference Kit Material" slots="1" price="1,00,000" />
                <AdditionalItemRow slNo="7" item="Conference Mugs" slots="2" price="2,50,000" />
                <AdditionalItemRow slNo="8" item="Student Program" slots="4" price="1,50,000" />
                <AdditionalItemRow slNo="9" item="Polo shirts" slots="1" price="4,00,000" />
                <AdditionalItemRow slNo="10" item="Registration Area" slots="2" price="5,00,000" />
                <AdditionalItemRow slNo="11" item="Delegate Badges" slots="1" price="5,00,000" />
                <AdditionalItemRow slNo="12" item="Delegate Bag Branding" slots="2" price="6,00,000" />
                <AdditionalItemRow slNo="13" item="Event Stationery/conference booklet" slots="3" price="5,00,000" />
                <AdditionalItemRow slNo="14" item="Speaker Mementoes" slots="2" price="2,50,000" />
                <AdditionalItemRow slNo="15" item="Memento (for bag inserts)" slots="10" price="1,50,000" />
                <AdditionalItemRow slNo="16" item="Delegate bag inserts" slots="10" price="1,00,000" />
                <AdditionalItemRow slNo="17" item="Delegate caps" slots="2" price="2,00,000" />
                <AdditionalItemRow slNo="18" item="Delegate folders" slots="4" price="2,00,000" />
                <AdditionalItemRow slNo="19" item="Delegate pens" slots="1" price="2,00,000" />
                <AdditionalItemRow slNo="20" item="Event Pen Drives" slots="1" price="2,00,000" />
              </tbody>
            </table>
          </div>
        </section>

        {/* Footer Message */}
        <section className="bg-white/5 p-6 rounded-lg border border-white/10 backdrop-blur-sm text-center">
          <p className="text-gray-200">
            Your prompt decision to participate will enable us to better serve you and enhance the ROI you experience, ensuring that the conference meets and exceeds your expectations. We would be happy to provide further details and look forward to connecting with you soon.
          </p>
        </section>

        {/* Contact CTA */}
        <div className="mt-10 text-center">
          <a
            href="mailto:sponsors@itctestweekindia.org"
            className="inline-block bg-yellow-500 hover:bg-yellow-400 text-[#03396c] font-bold text-lg px-8 py-4 rounded transition-colors"
          >
            BECOME A SPONSOR
          </a>
          <p className="mt-4 text-gray-400">
            Contact us at:{" "}
            <a href="mailto:sponsors@itctestweekindia.org" className="text-blue-300 hover:underline">
              info@itctestweekindia.org
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}

function SponsorRow({
  tier,
  slots,
  cost,
  benefits,
  isHighlighted = false,
}: {
  tier: string;
  slots: string;
  cost: string;
  benefits: string[];
  isHighlighted?: boolean;
}) {
  return (
    <tr className={`border-b border-white/10 ${isHighlighted ? 'bg-yellow-400/5' : ''}`}>
      <td className={`py-4 px-2 md:px-4 font-bold ${isHighlighted ? 'text-yellow-400' : 'text-white'}`}>
        {tier}
      </td>
      <td className="py-4 px-2 md:px-4 text-center">{slots}</td>
      <td className="py-4 px-2 md:px-4 text-center font-semibold">₹{cost}</td>
      <td className="py-4 px-2 md:px-4">
        <ul className="list-disc list-inside space-y-1 text-sm">
          {benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
      </td>
    </tr>
  );
}

function AdditionalItemRow({
  slNo,
  item,
  slots,
  price,
}: {
  slNo: string;
  item: string;
  slots: string;
  price: string;
}) {
  return (
    <tr className="border-b border-white/10">
      <td className="py-3 px-2 md:px-4">{slNo}</td>
      <td className="py-3 px-2 md:px-4">{item}</td>
      <td className="py-3 px-2 md:px-4 text-center">{slots}</td>
      <td className="py-3 px-2 md:px-4 text-right font-semibold">₹{price}</td>
    </tr>
  );
}
