// pages/index.tsx
import Hero from "../components/Home/Hero";
//import Navbar from "../components/Navbar";
import ServicesSection from "../components/Home/ServicesSection";
//import SolutionsGrid from "@/components/SolutionsGrid";
//import WhyChoose from "@/components/WhyChoose";
//import CaseStudyCarousel from "@/components/CaseStudyCarousel";
//import PartnerDeveloper from "@/components/PartnerDeveloper";
//import BlogPreview from "@/components/BlogPreview";
//import CTASection from "@/components/CTASection";
//import ContactSection from "@/components/ContactSection";
import StatsBanner from "../components/Home/StatBanner";

export default function Home() {
  return (
    <>
      
      <main>
        <Hero />
        <StatsBanner />
        {/* Uncomment the sections you want to include */}
        <ServicesSection />
        {/*<SolutionsGrid />*/}
        {/*<WhyChoose />*/}
        {/*<CaseStudyCarousel />*/}
        {/*<PartnerDeveloper />*/}
        {/*<BlogPreview />*/}
        {/*<CTASection />*/}
        {/*<ContactSection />*/}
      </main>

    </>
  );
}