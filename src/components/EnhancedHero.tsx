'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Heart, MapPin, Camera, Star, ArrowDown } from 'lucide-react';
import Image from 'next/image';
import type { Destination } from '@/types/destination';

interface EnhancedHeroProps {
  destinations: Destination[];
  onDestinationClick?: (destination: Destination) => void;
}

const BG_IMAGES = [
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=90&w=2400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?q=90&w=2400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=90&w=2400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=90&w=2400&auto=format&fit=crop",
];

export default function EnhancedHero({ destinations, onDestinationClick }: EnhancedHeroProps) {
  const [slide, setSlide] = useState(0);
  const [ready, setReady] = useState(false);
  const { scrollY } = useScroll();
  const bgY    = useTransform(scrollY, [0, 700], [0, 180]);
  const fadeOp = useTransform(scrollY, [0, 450], [1, 0]);

  useEffect(() => {
    setReady(true);
    const t = setInterval(() => setSlide(p => (p + 1) % BG_IMAGES.length), 5500);
    return () => clearInterval(t);
  }, []);

  const visited  = destinations.filter(d => d.status === 'visited').length;
  const dreaming = destinations.filter(d => d.status === 'dream' || d.status === 'wishlist').length;
  const countries = new Set(destinations.map(d => d.country)).size;
  const recent = destinations.filter(d => d.status === 'visited').slice(0, 3);

  return (
    <div className="relative w-full h-screen min-h-[680px] overflow-hidden bg-black">

      {/* ── Slideshow ── */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0 scale-110">
        <AnimatePresence mode="sync">
          <motion.div
            key={slide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <Image src={BG_IMAGES[slide]} alt="" fill priority className="object-cover" />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* ── Gradient layers ── */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/55 to-black/15 pointer-events-none" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/50 via-transparent to-transparent pointer-events-none" />

      {/* ── Floating recent visits (top-left) ── */}
      <motion.div style={{ opacity: fadeOp }} className="absolute top-8 left-8 z-30 hidden lg:flex flex-col gap-2.5">
        {recent.map((d, i) => (
          <motion.button
            key={d.id}
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: ready ? 1 : 0, x: ready ? 0 : -24 }}
            transition={{ delay: 1 + i * 0.12, duration: 0.5 }}
            onClick={() => onDestinationClick?.(d)}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-full glass-dark text-white/85 text-xs font-medium hover:bg-white/15 transition-all"
          >
            <div className="w-5 h-5 rounded-full overflow-hidden ring-1 ring-white/20 flex-shrink-0">
              <img src={typeof d.image === 'string' ? d.image : ''} alt={d.name} className="w-full h-full object-cover" />
            </div>
            {d.name}
            <MapPin className="w-3 h-3 opacity-50" />
          </motion.button>
        ))}
      </motion.div>

      {/* ── Slide dots (top-right) ── */}
      <motion.div style={{ opacity: fadeOp }} className="absolute top-8 right-8 z-30 flex items-center gap-1.5">
        {BG_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setSlide(i)}
            className={`rounded-full transition-all duration-400 ${i === slide ? 'w-6 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'}`}
          />
        ))}
      </motion.div>

      {/* ── Main content ── */}
      <motion.div
        style={{ opacity: fadeOp }}
        className="absolute inset-0 z-20 flex flex-col justify-end pb-20 px-8 md:px-16 lg:px-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 50 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 16 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark mb-6"
          >
            <Heart size={12} className="text-rose-400 fill-rose-400" />
            <span className="text-white/80 text-xs font-semibold tracking-[0.2em] uppercase">Jack & Kiki · 2026</span>
            <Heart size={12} className="text-rose-400 fill-rose-400" />
          </motion.div>

          {/* Headline — big, bold, 2026 */}
          <h1 className="font-display text-white leading-[0.9] tracking-tight mb-8">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 30 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="block text-[clamp(3.5rem,10vw,8rem)] font-bold"
            >
              Two Hearts.
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 30 }}
              transition={{ delay: 0.45, duration: 0.8 }}
              className="block text-[clamp(3.5rem,10vw,8rem)] font-bold italic text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(90deg, #fb923c, #f43f5e, #a78bfa)' }}
            >
              One World.
            </motion.span>
          </h1>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 20 }}
            transition={{ delay: 0.65, duration: 0.7 }}
            className="flex flex-wrap items-center gap-3"
          >
            {[
              { icon: MapPin,  val: countries, label: 'Countries',  col: 'text-amber-400' },
              { icon: Camera,  val: visited,   label: 'Memories',   col: 'text-rose-400' },
              { icon: Star,    val: dreaming,  label: 'Dreams',     col: 'text-violet-400' },
            ].map(({ icon: Icon, val, label, col }) => (
              <div key={label} className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl glass-dark">
                <Icon size={14} className={col} />
                <span className="text-white font-display font-bold text-lg leading-none">{val}</span>
                <span className="text-white/40 text-[10px] uppercase tracking-widest">{label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── Scroll cue ── */}
      <motion.div
        style={{ opacity: fadeOp }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5"
      >
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ArrowDown className="w-4 h-4 text-white/35" />
        </motion.div>
      </motion.div>
    </div>
  );
}
