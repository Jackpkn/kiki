"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Star, MapPin, ArrowUpRight, Clock, Heart } from "lucide-react";
import Image from "next/image";
import type { Destination } from "@/types/destination";
import StatusBadge from "./StatusBadge";

interface Props { destination: Destination; index: number; onClick: (d: Destination) => void; }

const statusAccent: Record<string, string> = {
  dream:    'from-violet-600/70 to-indigo-900/80',
  wishlist: 'from-rose-600/70 to-pink-900/80',
  planned:  'from-emerald-600/70 to-teal-900/80',
  visited:  'from-sky-600/70 to-blue-900/80',
};

// Floating heart particle
function HeartBurst({ active }: { active: boolean }) {
  const particles = [0, 1, 2, 3, 4, 5];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
          animate={active ? {
            opacity: [0, 1, 0],
            scale: [0, 1, 0.5],
            x: [0, (Math.cos((i / particles.length) * Math.PI * 2) * 40)],
            y: [0, (Math.sin((i / particles.length) * Math.PI * 2) * 40) - 20],
          } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: i * 0.05, ease: 'easeOut' }}
          className="absolute bottom-6 right-6 text-rose-400 text-xs"
        >
          ♥
        </motion.div>
      ))}
    </div>
  );
}

export default function DestinationCard({ destination, index, onClick }: Props) {
  const src    = typeof destination.image === "string" ? destination.image : (destination.image as { src: string })?.src || "";
  const accent = statusAccent[destination.status] || 'from-stone-600/70 to-stone-900/80';

  const [liked, setLiked]   = useState(false);
  const [burst, setBurst]   = useState(false);
  const cardRef             = useRef<HTMLDivElement>(null);

  // Magnetic tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(l => !l);
    setBurst(true);
    setTimeout(() => setBurst(false), 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.article
        onClick={() => onClick(destination)}
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="group bento-card cursor-pointer relative"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* ── Image ── */}
        <div className="relative h-60 overflow-hidden">
          <Image src={src} alt={destination.name} fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]" />

          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
          <div className={`absolute inset-0 bg-gradient-to-t ${accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

          {/* Badges */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
            <StatusBadge status={destination.status} />
            {destination.rating && (
              <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-black/35 backdrop-blur-md text-white text-xs font-bold border border-white/10">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                {destination.rating}
              </div>
            )}
          </div>

          {/* Hover CTA */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
            <motion.div
              initial={false}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-white/20 text-white text-sm font-semibold shadow-lg"
            >
              Explore <ArrowUpRight className="w-4 h-4" />
            </motion.div>
          </div>

          {/* Country */}
          <div className="absolute bottom-4 left-4 z-10">
            <div className="flex items-center gap-1 text-white/70 text-[10px] font-semibold uppercase tracking-widest">
              <MapPin className="w-3 h-3" />
              {destination.country}
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="p-5 space-y-3.5">
          <h3 className="text-xl font-display font-bold text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
            {destination.name}
          </h3>

          <p className="text-muted-foreground text-sm font-body leading-relaxed line-clamp-2">
            {destination.description}
          </p>

          {destination.tags && destination.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {destination.tags.slice(0, 3).map(tag => (
                <motion.span
                  key={tag}
                  whileHover={{ scale: 1.08 }}
                  className="tag-pill cursor-default"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-border/40">
            <div className="flex items-center gap-3">
              {destination.weather && (
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="text-base leading-none">{destination.weather.icon}</span>
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

            {/* Like button */}
            <motion.button
              onClick={handleLike}
              whileTap={{ scale: 0.8 }}
              className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${
                liked
                  ? 'bg-rose-500 text-white'
                  : 'bg-primary/8 text-primary group-hover:bg-primary group-hover:text-white'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 transition-all ${liked ? 'fill-current scale-110' : ''}`} />
            </motion.button>
          </div>
        </div>

        {/* Heart burst particles */}
        <HeartBurst active={burst} />
      </motion.article>
    </motion.div>
  );
}
