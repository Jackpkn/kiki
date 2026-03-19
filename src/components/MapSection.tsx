import { motion } from "framer-motion";
import Image from "next/image";
import worldMap from "@/assets/world-map.jpg";

const MapSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="w-full"
    >
      <div className="text-center mb-6">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary text-primary-foreground font-body font-bold text-sm shadow-md"
        >
          Explore Our Map 📍
        </motion.span>
      </div>
      <div className="rounded-2xl overflow-hidden shadow-lg border border-border relative h-[400px]">
        <Image 
          src={worldMap} 
          alt="Our Travel Map" 
          fill 
          className="object-contain" 
        />
      </div>
    </motion.section>
  );
};

export default MapSection;
