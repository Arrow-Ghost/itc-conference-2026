import type { Metadata, Viewport } from "next";
import {
  Space_Grotesk,
  Urbanist,
  Poppins,
  Roboto_Slab,
  Angkor,
  Inter,
  Sarpanch,
} from "next/font/google";
import "./globals.css";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import { AuthProvider } from "@/lib/AuthContext";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const robotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin"],
  weight: ["400", "800"],
});

const angkor = Angkor({
  variable: "--font-angkor",
  subsets: ["latin"],
  weight: ["400"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400"],
});

const sarpanch = Sarpanch({
  variable: "--font-sarpanch",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "ITC India 2026 - IEEE International Test Conference",
  description:
    "10th IEEE International Test Conference INDIA - An initiative towards India's semiconductor ecosystem",
  icons: {
    icon: "/itc-logo.svg",
  },
};


export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${urbanist.variable} ${poppins.variable} ${robotoSlab.variable} ${angkor.variable} ${inter.variable} ${sarpanch.variable} antialiased bg-[#03396c] selection:bg-white/20 relative`}
      >
        <div className="absolute inset-0 pointer-events-none z-0">
          <div
            className="absolute inset-0 opacity-10 bg-repeat"
            style={{
              backgroundImage: `url('/images/homepage-bg.png')`,
              backgroundSize: "80px 80px",
            }}
          />

          <div
            className="absolute top-0 bottom-0 left-[5%] sm:left-[4%] md:left-[3%] lg:left-[2.5%] xl:left-[2.25%] w-[1px] opacity-60 sm:opacity-70 md:opacity-80"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, rgba(255, 255, 255, 0.8) 0px, rgba(255, 255, 255, 0.7) 6px, transparent 3px, transparent 12px)",
            }}
          ></div>

          <div
            className="absolute top-0 bottom-0 right-[5%] sm:right-[4%] md:right-[3%] lg:right-[2.5%] xl:right-[2.25%] w-[1px] opacity-60 sm:opacity-70 md:opacity-80"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, rgba(255, 255, 255, 0.8) 0px, rgba(255, 255, 255, 0.7) 6px, transparent 3px, transparent 12px)",
            }}
          ></div>

          <div
            className="absolute bottom-[0.6%] left-0 right-0 h-[1px] opacity-60 sm:opacity-70 md:opacity-80"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, rgba(255, 255, 255, 0.8) 0px, rgba(255, 255, 255, 0.8) 7px, transparent 7px, transparent 12px)",
            }}
          ></div>
        </div>

        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
