//import React from "react";
import HeroCard from "./HeroCard";
//import ServiceCard from "./ServicesCard";
import CtaCard from "./CtaCard";
import ServicesSection from "./ServicesCard";
import { useNavigate } from "react-router-dom";

export default function FarmSetupManagement() {
    const navigate = useNavigate();
  return (
    <div className="w-screen min-h-screen bg-gradient-to-b from-green-50 to-white left-0">
      <div className="w-full mx-auto grid gap-y-8">
        
        <HeroCard
        headline="Farm Setup & Management"
        description="We help farmers and agribusinesses set up modern, efficient, and sustainable farms — from soil to harvest."
        ctaText="Get Started"
        backgroundImage="/images/farm-hero.jpg"
        />

        <ServicesSection />

        <CtaCard
          title="Ready to Grow?"
          description="Let’s work together to build and manage a farm that thrives for years to come."
          buttonText="Contact Us"
          onClick={() => navigate("/agric#contact")}
        />

      </div>
    </div>
  );
}
