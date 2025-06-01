import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/home/HeroSection";
import WhySection from "@/components/home/WhySection";
import AvailableToolsSection from "@/components/home/AvailableToolsSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <WhySection />
      <AvailableToolsSection />
      <Footer />
    </div>
  );
}
