import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import heroBanner from "@/assets/hero-banner.jpg";

const HeroBanner = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  return (
    <section className="relative h-[85vh] w-full overflow-hidden flex items-center justify-center">
      {/* Background Image with Parallax and Scale */}
      <motion.div 
        style={{ y: y1, scale }}
        className="absolute inset-0 z-0"
      >
        <Image
          src={heroBanner}
          alt="Travel Banner"
          fill
          priority
          className="object-cover brightness-[0.7] contrast-[1.1]"
        />
        {/* Elegant Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-background" />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-block text-white/80 uppercase tracking-[0.4em] text-xs font-bold mb-6"
        >
          Explore the Unseen
        </motion.span>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-6xl md:text-8xl lg:text-9xl font-display font-bold text-white mb-8 leading-[0.9] tracking-tighter"
        >
          Kiki's <br />
          <span className="italic font-normal serif">Travelogue</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-white/60 text-lg md:text-xl font-body max-w-xl mx-auto leading-relaxed"
        >
          A curated collection of journeys, dreams, and discoveries across the globe.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-12"
        >
          <div className="w-px h-24 bg-gradient-to-b from-white/50 to-transparent mx-auto" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroBanner;
