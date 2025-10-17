import { motion } from "framer-motion";
import img1 from "../../../../public/images/tech-bg1.jpg";
import img2 from "../../../../public/images/tech-bg3.jpg";
import img3 from "../../../../public/images/tech-bg5.jpg";
import img4 from "../../../../public/images/tech-bg4.jpg";

type Partner = {
  name: string;
  link: string;
  logo: string;
  category: string;
  testimonial: string;
};
type PartnerCardsProps = {
  partners: Partner[];
};
export default function PartnerCards({ partners }: PartnerCardsProps) {
  // Example techy background options (you can randomize or pick per partner)
  const techBackgrounds = [
    img1,
    img2,
    img3,
    img4,
  ];

  return (
    <section className="relative mb-24 px-16">
      {/* Subtle gradient mesh backdrop for the whole section */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 via-white to-indigo-50 opacity-70 pointer-events-none" />

      <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {partners.map((partner, index) => {
          const bg = techBackgrounds[index % techBackgrounds.length];
          return (
            <motion.a
              key={index}
              href={partner.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="group relative rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col items-center justify-center p-6"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                style={{ backgroundImage: `url(${bg})` }}
              />

              {/* Glass overlay for better readability */}
              <div className="absolute inset-0 bg-black/30 backdrop-blur-sm group-hover:bg-transparent transition-all duration-300" />

              {/* Partner Content */}
              <div className="relative z-10 text-center flex flex-col items-center justify-center">
                {/* Partner Logo */}
                <div className="flex items-center justify-center h-24 w-full mb-4">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-14 object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>

                {/* Partner Info */}
                <h3 className="text-lg font-semibold text-black group-hover:text-blue-700 transition-colors">
                  {partner.name}
                </h3>
                <p className="text-sm text-gray-800 italic mb-2">
                  {partner.category}
                </p>
                <p className="text-gray-800 text-sm line-clamp-3">
                  {partner.testimonial}
                </p>

                {/* Accent Line */}
                <motion.div
                  layoutId="hover-line"
                  className="mt-4 w-0 h-[3px] bg-blue-600 group-hover:w-16 transition-all duration-300 rounded-full"
                />
              </div>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}
