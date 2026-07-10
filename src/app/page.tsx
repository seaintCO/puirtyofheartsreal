import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import FeaturedCourses from "@/components/home/FeaturedCourses";
import Community from "@/components/home/Community";
import Testimonials from "@/components/home/Testimonials";
import Shop from "@/components/home/Shop";
import BuildPlatform from "@/components/home/BuildPlatform";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <FeaturedCourses />
      <Community />
      <Testimonials />
      <Shop />
      <BuildPlatform />
      <Newsletter />
      <Footer />
    </main>
  );
}
