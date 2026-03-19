'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { MapPin, Heart } from 'lucide-react';
import type { Destination } from '@/types/destination';

interface MemoryCardProps {
  destination: Destination;
  onClick?: () => void;
  index?: number;
}

export default function MemoryCard({ destination, onClick, index = 0 }: MemoryCardProps) {
  // Generate a slight random rotation for the polaroid effect
  const randomRotation = (index % 2 === 0 ? 1 : -1) * (Math.random() * 4 + 2);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.05, 
        rotate: 0, 
        zIndex: 10,
        transition: { duration: 0.3 }
      }}
      className="relative bg-white p-3 pb-12 rounded-sm shadow-xl cursor-pointer group w-64 flex-shrink-0"
      style={{ rotate: `${randomRotation}deg` }}
      onClick={onClick}
    >
      <div className="relative h-56 w-full overflow-hidden rounded-sm mb-3">
        <Image
          src={typeof destination.image === "string" ? destination.image : (destination.image as { src: string })?.src || ""}
          alt={destination.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110 filter sepia-[0.2]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="absolute bottom-4 left-0 w-full text-center px-4">
        <h4 className="font-display text-xl font-bold text-gray-800 truncate">
          {destination.name}
        </h4>
        <div className="flex items-center justify-center gap-1 text-gray-500 text-xs mt-1">
          <MapPin className="w-3 h-3" />
          <span className="truncate">{destination.country}</span>
        </div>
      </div>
      
      {/* Tape effect */}
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-white/40 backdrop-blur-sm shadow-sm rotate-[-2deg] opacity-70" />
      
      {/* Heart Pin */}
      <div className="absolute -top-2 -right-2 text-red-500/80 drop-shadow-md transform rotate-12 group-hover:scale-125 transition-transform duration-300">
        <Heart className="w-6 h-6 fill-current" />
      </div>
    </motion.div>
  );
}