"use client";

import { motion } from "framer-motion";
import { Star, MapPin, ArrowUpRight, Clock } from "lucide-react";
import Image from "next/image";
import type { Destination } from "@/types/destination";
import StatusBadge from "./StatusBadge";

interface DestinationCardProps {
  destination: Destination;
  index: number;
  onClick: (destination: Destination) => void;
}

export default function DestinationCard({ destination, index, onClick }: DestinationCardProps) {
  const src = typeof destination.image === "string" ? destination.image : (destination.image as { src: string })?.src || "";

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onClick(destination)}
      className="group bento-card cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={src}
          alt={destination.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />
        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex justify-between items-start">
          <StatusBadge status={destination.status} />
          {destination.rating && (
            <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-white text-xs font-bold border border-white/10">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              {destination.rating}
            </div>
          )}
        </div>

        {/* Hover CTA */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full glass text-white text-sm font-semibold border border-white/20">
            View <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 space-y-3">
        <div>
          <div className="flex items-center gap-1 text-muted-foreground text-[11px] font-semibold uppercase tracking-widest mb-1">
            <MapPin className="w-3 h-3" />
            {destination.country}
          </div>
          <h3 className="text-xl font-display font-bold text-foreground group-hover:text-primary transition-colors duration-200 leading-tight">
            {destination.name}
          </h3>
        </div>

        <p className="text-muted-foreground text-sm font-body leading-relaxed line-clamp-2">
          {destination.description}
        </p>

        {destination.tags && destination.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {destination.tags.slice(0, 3).map(tag => (
              <span key={tag} className="tag-pill">{tag}</span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-3">
            {destination.weather && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <span className="text-sm">{destination.weather.icon}</span>
                {destination.weather.temp}°C
              </span>
            )}
            {destination.bestTime && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                {destination.bestTime.split(' ').slice(0, 2).join(' ')}
              </span>
            )}
          </div>
          <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </motion.article>
  );
}
