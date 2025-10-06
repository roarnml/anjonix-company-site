// src/pages/AboutLand.tsx
import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

// replace with real farmland promo videos in /public/videos/
const videos = [
  "/images/vid1.mp4",
  "/images/vid2.mp4",
  "/images/vid3.mp4",
  "/images/vid4.mp4",
  "/images/vid5.mp4",
  "/images/vid6.mp4",
  "/images/vid7.mp4",
  "/images/vid8.mp4",
];

export default function AboutLand() {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 2,
    autoplay: false,
    autoplaySpeed: 5000,
    arrows: true,
    fade: true,
    adaptiveHeight: true,
  };

  return (
    <section className="w-full bg-gradient-to-b from-white to-green-50 py-16 px-6">
      {/* Hero */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-6xl font-extrabold text-green-700 mb-6"
        >
          Why Farmland is the Future
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-lg sm:text-2xl text-gray-600"
        >
          Secure your piece of fertile land and invest in the growing palm oil
          industry. Food security, green energy, and wealth-building all start
          here.
        </motion.p>
      </div>

      {/* Promo Details with Video Slider */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center mb-20">
        {/* Video Slider */}
        <motion.div
          className="w-full rounded-2xl shadow-lg overflow-hidden "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Slider {...settings}>
            {videos.map((video, idx) => (
                <div
                key={idx}
                className="w-full aspect-video flex items-center justify-center bg-black"
                >
                <video
                    src={video}
                    className="w-full h-full object-cover rounded-2xl"
                    autoPlay
                    loop
                    muted
                    playsInline
                />
                </div>

            ))}
          </Slider>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold text-green-700">
            The 100-Acre Opportunity
          </h2>
          <p className="text-gray-700">
            We’re releasing <span className="font-semibold">100 acres</span> of
            rich farmland over the next 3 months. Each acre comes with palm tree
            seedlings, clear documentation, and the chance to join a
            fast-growing agricultural venture.
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>
              Price per acre: <span className="font-semibold">₦1,700,000</span>
            </li>
            <li>Location: fertile region with proven yields</li>
            <li>Limited availability: only 100 acres</li>
          </ul>
        </motion.div>
      </div>

      {/* FAQ */}
      <div className="max-w-4xl mx-auto mb-20">
        <h3 className="text-2xl font-bold text-green-700 mb-6 text-center">
          Frequently Asked Questions
        </h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-lg text-gray-800">
              Where is the land?
            </h4>
            <p className="text-gray-600">
              The farmland is located in a fertile agricultural zone with easy
              access roads and proximity to processing facilities.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-lg text-gray-800">
              What’s included?
            </h4>
            <p className="text-gray-600">
              Each acre comes with clear title documentation, 60 palm seedlings
              already allocated, and optional farm management support.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-lg text-gray-800">
              Is installment payment available?
            </h4>
            <p className="text-gray-600">
              Yes, flexible installment options are available. Pay half upfront
              as a deposit and spread the balance over an agreed period.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <Button
          onClick={() => navigate("/agric/invest?promo=1")}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg rounded-full shadow-lg"
        >
          Ready to Secure Your Piece? Buy Now
        </Button>
      </div>
    </section>
  );
}
