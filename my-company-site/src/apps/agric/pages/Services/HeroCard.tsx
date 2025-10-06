//import React from "react";
import { useNavigate } from "react-router-dom";

interface HeroCardProps {
  headline: string;
  description: string;
  ctaText: string;
  backgroundImage: string;
}

export default function HeroCard({
  headline,
  description,
  ctaText,
  backgroundImage,
}: HeroCardProps) {
  const navigate = useNavigate();

  return (
    <section
      className="relative w-full h-screen flex items-center justify-center text-center text-white"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/50 w-screen left-0" />

      {/* Content */}
      <div className="relative z-10 w-screen px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">{headline}</h1>
        <p className="text-lg md:text-xl mb-8">{description}</p>
        <button
          onClick={() => navigate("/agric#contact")}
          className="px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          {ctaText}
        </button>
      </div>
    </section>
  );
}
