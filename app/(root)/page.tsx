import HeroSection from "@/components/home-page/HeroSection";
import Features from "@/components/home-page/Features";
import Events from "@/components/home-page/Events";
import { DotBackground } from "@/components/home-page/DotBackground";

export default function Home() {
  return (
    <section className="flex min-h-screen flex-col">
      <DotBackground>
        {/* Hero Section */}
        <HeroSection />
      </DotBackground>

      {/* Features */}
      <Features />

      {/* Events Section */}
      <Events />

      {/* TODO: Make Contact Section Component */}
      {/* Contact Section */}
    </section>
  );
}
