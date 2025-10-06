/*import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const flyers = [
  "/flyers/flyers1.jpg",
  "/flyers/flyers2.jpg",
  "/flyers/flyers3.jpg",
  "/flyers/flyers4.jpg",
  // add more flyers here
];

export default function FlyerSlideshow() {
  const [index, setIndex] = useState(0);

  // auto-slide every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % flyers.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[400px] md:h-[600px] overflow-hidden rounded-2xl shadow-lg">
      <AnimatePresence>
        <motion.img
          key={flyers[index]}
          src={flyers[index]}
          alt={`flyer-${index}`}
          className="absolute w-full h-full object-cover"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.8 }}
        />
      </AnimatePresence>
    </div>
  );
}
*/

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const flyers = [
  "/flyers/flyers1.jpg",
  "/flyers/flyers2.jpg",
  "/flyers/flyers3.jpg",
  "/flyers/flyers3.jpg",
  // add more flyers
];

const videos = [
  "/videos/bg1.mp4",
  "/videos/bg2.mp4",
  "/videos/bg3.mp4",
  "/videos/bg4.mp4",
];

export default function FlyerOnVideo() {
  const [index, setIndex] = useState(0);

  // auto-slide every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % flyers.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background videos in 2x2 grid */}
      <div className="grid grid-cols-2 grid-rows-2 w-full h-full">
        {videos.map((vid, i) => (
          <video
            key={i}
            src={vid}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        ))}
      </div>

      {/* Flyer slideshow overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
        <div className="relative w-3/4 md:w-1/2 lg:w-1/3 aspect-[3/4] rounded-xl overflow-hidden shadow-2xl">
          <AnimatePresence>
            <motion.img
              key={flyers[index]}
              src={flyers[index]}
              alt={`flyer-${index}`}
              className="absolute w-full h-full object-contain bg-transparent"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8 }}
            />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
