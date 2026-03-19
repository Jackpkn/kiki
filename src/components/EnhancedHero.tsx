'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Heart, MapPin, ArrowDown, Plane, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import type { Destination } from '@/types/destination';

const SLIDES = [
  { src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=90&w=2800&auto=format&fit=crop", place: "Santorini, Greece", mood: "Golden hour magic" },
  { src: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=90&w=2800&auto=format&fit=crop", place: "Kyoto, Japan", mood: "Ancient serenity" },
  { src: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=90&w=2800&auto=format&fit=crop", place: "Bali, Indonesia", mood: "Tropical paradise" },
  { src: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=90&w=2800&auto=format&fit=crop", place: "Paris, France", mood: "City of love" },
];

const INTERVAL = 6000;

interface Props { destinations: Destination[]; onDestinationClick?: (d: Destination) => void; }

export default function EnhancedHero({ destinations, onDestinationClick }: Props) {
  const [slide, setSlide]   = useState(0);
  const [ready, setReady]   = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const bgY    = useTransform(scrollY, [0, 800], [0, 200]);
  const fadeOp = useTransform(scrollY, [0, 500], [1, 0]);
  const textY  = useTransform(scrollY, [0, 500], [0, 60]);

  const startTimers = useCallback((currentSlide: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
    setProgress(0);

    let p = 0;
    progressRef.current = setInterval(() => {
      p += 100 / (INTERVAL / 50);
      setProgress(Math.min(p, 100));
    }, 50);

    intervalRef.current = setInterval(() => {
      setSlide((prev) => (prev + 1) % SLIDES.length);
    }, INTERVAL);

    return currentSlide;
  }, []);

  const goTo = useCallback((idx: number) => {
    setSlide(idx);
    startTimers(idx);
  }, [startTimers]);

  const prev = () => goTo((slide - 1 + SLIDES.length) % SLIDES.length);
  const next = () => goTo((slide + 1) % SLIDES.length);

  useEffect(() => {
    setReady(true);
    startTimers(0);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [startTimers]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const visited   = destinations.filter(d => d.status === 'visited').length;
  const dreaming  = destinations.filter(d => d.status === 'dream' || d.status === 'wishlist').length;
  const countries = new Set(destinations.map(d => d.country)).size;
  const recentVisited = destinations.filter(d => d.status === 'visited').slice(0, 3);

  return (
    <div ref={containerRef} className="relative w-full h-screen min-h-[700px] overflow-hidden bg-[#0a0805]">

      {/* ── Background slideshow ── */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY, scale: 1.12 }}>
        <AnimatePresence mode="sync">
          <motion.div
            key={slide}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0"
          >
            <Image src={SLIDES[slide].src} alt="" fill priority className="object-cover" />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* ── Cinematic overlays ── */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0805] via-[#0a0805]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0805]/70 via-transparent to-[#0a0805]/20" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0a0805]/60 to-transparent" />
      </div>

      {/* ── Slideshow progress bar ── */}
      <div className="absolute top-0 left-0 right-0 z-40 h-[2px] bg-white/10">
        <motion.div
          className="h-full bg-primary"
          style={{ width: `${progress}%` }}
          transition={{ ease: 'linear' }}
        />
      </div>

      {/* ── Top bar ── */}
      <motion.div style={{ opacity: fadeOp }} className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-8 md:px-14 pt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: ready ? 1 : 0, x: ready ? 0 : -20 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="flex items-center gap-2.5"
        >
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-glow">
            <Plane className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-heading font-bold text-sm tracking-wide">Jack & Kiki</span>
        </motion.div>

        {/* Slide dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-2"
        >
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-500 ${i === slide ? 'w-8 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/25 hover:bg-white/50'}`}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* ── Floating visited pills (left) ── */}
      <motion.div style={{ opacity: fadeOp }} className="absolute left-8 md:left-14 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col gap-3">
        {recentVisited.map((d, i) => (
          <motion.button
            key={d.id}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: ready ? 1 : 0, x: ready ? 0 : -30 }}
            transition={{ delay: 1.2 + i * 0.15, duration: 0.6 }}
            whileHover={{ x: 6, scale: 1.02 }}
            onClick={() => onDestinationClick?.(d)}
            className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl glass-dark text-white/80 text-xs font-body hover:bg-white/15 transition-all group"
          >
            <div className="w-7 h-7 rounded-xl overflow-hidden flex-shrink-0 ring-1 ring-white/15">
              <img src={typeof d.image === 'string' ? d.image : ''} alt={d.name} className="w-full h-full object-cover" />
            </div>
            <div className="text-left">
              <div className="font-semibold text-white/90 leading-tight">{d.name}</div>
              <div className="text-white/40 text-[10px]">{d.country}</div>
            </div>
            <MapPin className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity ml-1" />
          </motion.button>
        ))}
      </motion.div>

      {/* ── Location + mood badge (right) ── */}
      <motion.div
        style={{ opacity: fadeOp }}
        className="absolute right-8 md:right-14 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-end gap-3"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-end gap-2"
          >
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl glass-dark text-white/70 text-xs font-body">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {SLIDES[slide].place}
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/8 text-white/35 text-[10px] font-body italic">
              {SLIDES[slide].mood}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Prev / Next arrows */}
        <div className="flex gap-2 mt-2">
          <button onClick={prev}
            className="w-9 h-9 rounded-full glass-dark flex items-center justify-center text-white/50 hover:text-white hover:bg-white/15 transition-all">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={next}
            className="w-9 h-9 rounded-full glass-dark flex items-center justify-center text-white/50 hover:text-white hover:bg-white/15 transition-all">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* ── Main headline ── */}
      <motion.div
        style={{ opacity: fadeOp, y: textY }}
        className="absolute inset-0 z-20 flex flex-col justify-end pb-24 px-8 md:px-14 lg:px-20"
      >
        <div className="max-w-6xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 20 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-dark">
              <Heart size={11} className="text-rose-400 fill-rose-400" />
              <span className="text-white/75 text-[11px] font-semibold tracking-[0.22em] uppercase">Jack & Kiki · 2026</span>
              <Heart size={11} className="text-rose-400 fill-rose-400" />
            </div>
            <div className="h-px flex-1 max-w-[80px] bg-white/15" />
          </motion.div>

          {/* Giant headline */}
          <div className="overflow-hidden mb-3">
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: ready ? 0 : 100, opacity: ready ? 1 : 0 }}
              transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-black text-white leading-[0.88] tracking-tight"
              style={{ fontSize: 'clamp(3.8rem, 11vw, 9.5rem)' }}
            >
              Two Hearts.
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-10">
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: ready ? 0 : 100, opacity: ready ? 1 : 0 }}
              transition={{ delay: 0.65, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-black italic leading-[0.88] tracking-tight text-gradient-sunset"
              style={{ fontSize: 'clamp(3.8rem, 11vw, 9.5rem)' }}
            >
              One World.
            </motion.h1>
          </div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 24 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-wrap items-center gap-3"
          >
            {[
              { val: countries, label: 'Countries', emoji: '🌍' },
              { val: visited,   label: 'Memories',  emoji: '📸' },
              { val: dreaming,  label: 'Dreams',     emoji: '✨' },
            ].map(({ val, label, emoji }) => (
              <motion.div
                key={label}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl glass-dark cursor-default"
              >
                <span className="text-lg leading-none">{emoji}</span>
                <div>
                  <div className="text-white font-heading font-bold text-xl leading-none">{val}</div>
                  <div className="text-white/35 text-[9px] uppercase tracking-widest mt-0.5">{label}</div>
                </div>
              </motion.div>
            ))}

            <div className="w-px h-8 bg-white/15 mx-1 hidden sm:block" />

            <p className="text-white/45 text-sm font-body max-w-xs leading-relaxed hidden md:block">
              Collecting memories, chasing sunsets, falling in love with every corner of this world.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll cue ── */}
      <motion.div
        style={{ opacity: fadeOp }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
      >
        <span className="text-white/25 text-[9px] font-mono-alt uppercase tracking-[0.3em]">Scroll</span>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}>
          <ArrowDown className="w-4 h-4 text-white/30" />
        </motion.div>
      </motion.div>
    </div>
  );
}
