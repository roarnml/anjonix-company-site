// Partners.jsx
// A polished and professional section for displaying strategic partnerships.

import HeroCardPartners from "../components/Partners/Hero";
import PartnerAdvantageCard from "../components/Partners/PartnerAdvantageCard";
import PartnerCards from "../components/Partners/PartnerLogo";
import PartnerCTA from "../components/Partners/PartnersCTA";

const partners = [
  {
    name: "SmartAgro Nigeria",
    category: "Agriculture & Environmental",
    logo: "https://smartagrobotics.com.ng/wp-content/uploads/2024/10/SmartAgro.png",
    link: "https://smartagro.ng",
    testimonial:
      "Through our partnership with Anjonix, we've expanded precision agriculture solutions to rural communities, improving efficiency and sustainability across farms nationwide.",
  },
  {
    name: "EduSync Africa",
    category: "Education & Academy",
    logo: "https://edusync.com/wp-content/themes/edusync/templates/parts/logos/logo.svg",
    link: "https://edusync.africa",
    testimonial:
      "Anjonix Academy has accelerated digital adoption across partner schools. Their smart learning ecosystem bridges the gap between education and innovation.",
  },
  {
    name: "TechCore Cloud",
    category: "Technology & Infrastructure",
    logo: "https://cdn.dribbble.com/userupload/30748492/file/original-07fb025f9429368baeec9823d1b8f501.jpg?resize=752x&vertical=center",
    link: "https://techcorecloud.com",
    testimonial:
      "Together with Anjonix, we deliver scalable cloud infrastructure and IoT-driven home automation across Africa. Their team exemplifies technical excellence and vision.",
  },
];

export default function Partners() {
  return (
    <div className=" w-screen mx-auto">
    {/* Header */}
      <HeroCardPartners />
    {/* Partner Logos */}
      <PartnerCards partners={partners} />

      {/* Testimonials */}
      <section className="mb-20">
        <h2 className="text-2xl font-semibold mb-8 text-gray-900">
          Partnership Success Stories
        </h2>
        <div className="space-y-8">
          {partners.map((partner, index) => (
            <article
              key={index}
              className="bg-gray-50 p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-1">
                {partner.name}
              </h3>
              <p className="text-sm text-gray-500 mb-3 italic">
                {partner.category}
              </p>
              <p className="text-gray-700 leading-relaxed">{partner.testimonial}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Why Partner With Us */}
      <PartnerAdvantageCard />

      {/* Call to Action */}
      <PartnerCTA />

      {/* Contact Info */}
      <footer className="text-center text-sm text-gray-500">
        <p>
          Questions? Reach our partnership team at{" "}
          <a
            href="mailto:enquiry@anjonixgloballimited.com"
            className="underline hover:text-blue-700"
          >
            enquiry@anjonixgloballimited.com
          </a>
        </p>
        <p className="mt-1">
          Or call us at:{" "}
          <strong className="text-gray-700">
            +234-901-995-4473 / +234-907-902-8605
          </strong>
        </p>
      </footer>
    </div>
  );
}
