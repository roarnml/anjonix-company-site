//import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async";
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
      <Helmet>
        {/* Basic Page Info */}
        <title>Anjonix Global Limited - Tech, Education, Agriculture & Training Services</title>
        <meta
          name="description"
          content="Anjonix Global Limited offers top-tier tech solutions, professional education, agriculture training, and diverse business services. Empowering individuals and organizations with cutting-edge knowledge and innovation."
        />
        <meta
          name="keywords"
          content="technology, education, training, agriculture, services, Anjonix Global Limited, professional development, innovation"
        />
        <meta name="author" content="Anjonix Global Limited" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="Anjonix Global Limited" />
        <meta
          property="og:description"
          content="Empowering individuals and businesses with world-class tech, education, and agriculture training solutions."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://anjonixgloballimited.com/" />
        <meta property="og:image" content="https://anjonixgloballimited.com/og-image.png" />
        <meta property="og:site_name" content="Anjonix Global Limited" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@AnjonixGlobal" />
        <meta name="twitter:creator" content="@AnjonixGlobal" />
        <meta name="twitter:title" content="Anjonix Global Limited" />
        <meta
          name="twitter:description"
          content="Top-notch tech, education, and agriculture training services for professionals and organizations."
        />
        <meta name="twitter:image" content="https://anjonixgloballimited.com/og-image.png" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Schema.org Structured Data (JSON-LD) */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Anjonix Global Limited",
              "url": "https://anjonixgloballimited.com/",
              "logo": "https://anjonixgloballimited.com/logo.png",
              "sameAs": [
                "https://www.facebook.com/AnjonixGlobal",
                "https://twitter.com/AnjonixGlobal",
                "https://www.linkedin.com/company/anjonixglobal"
              ],
              "description": "Anjonix Global Limited provides professional tech solutions, education, agriculture training, and business services to empower individuals and organizations.",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+234-XXX-XXX-XXXX",
                "contactType": "customer service",
                "areaServed": "NG"
              }
            }
          `}
        </script>
      </Helmet>

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
