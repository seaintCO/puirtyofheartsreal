import SiteHeader from "@/components/home/SiteHeader";
import Hero from "@/components/home/Hero";
import EcosystemTicker from "@/components/home/EcosystemTicker";
import EnterpriseOrbit from "@/components/home/EnterpriseOrbit";
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <main id="top" className="min-h-screen overflow-x-hidden bg-white">
      <SiteHeader />
      <Hero />
      <EcosystemTicker />
      <EnterpriseOrbit />
      <Footer />
    </main>
  );
}

