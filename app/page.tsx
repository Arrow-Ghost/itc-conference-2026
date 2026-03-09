import HeroWithTimer from "@/components/ui/HeroWithTimer";
import AboutUs from "@/components/ui/AboutUs";
import Timeline from "@/components/ui/Timeline";
import Testimonials from "@/components/ui/Testimonials";
import FAQ from "@/components/ui/FAQ";
import Photos from "@/components/ui/Photos";
import FloatingNav from "@/components/ui/FloatingNav";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden relative w-full max-w-full box-border">
      <FloatingNav />
      <div className="relative z-10 flex flex-col gap-0">
        <HeroWithTimer />
        <AboutUs />
        <Timeline />
        <Testimonials />
        <FAQ />
        <Photos />
      </div>
    </main>
  );
}
