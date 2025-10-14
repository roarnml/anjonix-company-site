//import { Link } from "react-router-dom"
import HeroCard from "../components/Home/HeroCard"
import OfferingCard from "../components/Home/OfferingCard"
//import CTASection from "../components/Home/CTASection"
import MissionPulseSection from "../components/Home/CoreValuesCard";
//import PartnersClientsCard from "../components/Home/PartnersClientCard";
import WhyChooseUsCard from "../components/Home/WhyChooseUs";
//import ImpactMetricsCard from "../components/Home/impactMetrics";
//import HowItWorksCard from "../components/Home/HowItWorksCard";
//import CaseStudiesCard from "../components/Home/CaseStudiesCard";
//import AcademyHighlightsCard from "../components/Home/AcademyHighlightsCard";
//import LatestNewsCard from "../components/Home/LatestNewsCard";
//import MobileAppShowcaseCard from "../components/Home/MobileAppShowcaseCard";
import TestimonialsCard from "../components/Home/TestimonialCard";
import FinalCTA from "../components/Home/NewsLetterSignUp";
//import OurFootprintCard from "../components/Home/OurFootPrintCard";
import SpotlightFeature from "../components/Home/CTASection";
import AboutAnjonix from "../components/Home/AboutAnjonix"
//import { motion } from "framer-motion"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroCard />

      {/* 4. Core Values */}
      <section className="py-12 text-black">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Our Core Values</h2>
          <MissionPulseSection />
        </div>
      </section>
      {/* 5. Partners & Clients
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <PartnersClientsCard />
        </div>
      </section> */}

      {/* Offerings Section */}
      <OfferingCard />
      {/* 6. Why Choose Us */}
      <section className="py-12 text-black">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose Anjonix</h2>
          <WhyChooseUsCard />
        </div>
      </section>

      {/* Call to Action */}
      <SpotlightFeature />

      <TestimonialsCard />

      <AboutAnjonix />
      {/* 7. Impact Metrics 
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <ImpactMetricsCard />
        </div>
      </section> */}

      {/* 8. How It Works 
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <HowItWorksCard />
        </div>
      </section>

      {/* 9. Case Studies *
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <CaseStudiesCard />
        </div>
      </section>

      {/* 10. Academy Highlights 
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <AcademyHighlightsCard />
        </div>
      </section>*

      {/* 11. Latest News *
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <LatestNewsCard />
        </div>
      </section>

      {/* 12. Mobile App Showcase *
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <MobileAppShowcaseCard />
        </div>
      </section>



      {/* 14. Newsletter Signup */}
      <section className="py-12">
        <div className="mx-auto">
          <FinalCTA />
        </div>
      </section>

      {/* 14. Our Foot Print  *
      <section className="py-12">
        <div className="px-0 w-screen mx-auto">
          <OurFootprintCard />
        </div>
      </section>*/}

    </div>
  )
}
