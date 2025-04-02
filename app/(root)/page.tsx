import HeroSection from "@/components/home-page/HeroSection";
import Events from "@/components/home-page/Events";
import { DotBackground } from "@/components/home-page/DotBackground";
import Innovation from "@/components/home-page/Innovation";
import Science from "@/components/home-page/Science";
import DigitalEconomy from "@/components/home-page/DigitalEconomy";
import Contact from "@/components/home-page/Contact";

export default function Home() {
  return (
    <section className="flex min-h-screen flex-col">
      <DotBackground>
        {/* Hero Section */}
        <HeroSection />
      </DotBackground>

      {/* <Features /> */}

      {/* Innovation */}
      <Innovation />

      {/* Science */}
      <Science />

      {/* DigitalEconomy */}
      <DigitalEconomy />

      {/* Events Section */}
      <Events />

      {/* Contact Section */}
      <Contact />
    </section>
  );
}
