'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Camera, Heart, X, MapPin, ArrowUpRight, Play } from 'lucide-react';
import Image from 'next/image';
import type { Destination } from '@/types/destination';

/* ── Lightbox ── */
function Lightbox({ d, onClose }: { d: Destination; onClose: () => void }) {
  const src = typeof d.image === 'string' ? d.image : (d.image as { src: string })?.src || '';
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-md p-6"
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 30 }}
        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
        onClick={e => e.stopPropagation()}
        className="relative max-w-3xl w-full rounded-3xl overflow-hidden shadow-2xl"
      >
        <div className="relative aspect-[4/3]">
          {src && <Image src={src} alt={d.name} fill className="object-cover" />}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-1 flex items-center gap-1.5">
            <MapPin className="w-3 h-3" />{d.country}
          </p>
          <h3 className="text-3xl font-display font-black text-white">{d.name}</h3>
          {d.description && (
            <p className="text-white/50 text-sm font-body mt-2 line-clamp-2">{d.description}</p>
          )}
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-all"
        >
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ── Card variants ── */
type CardSize = 'tall' | 'wide' | 'square';

function MemoryCard({
  d,
  size,
  index,
  onClick,
}: {
  d: Destination;
  size: CardSize;
  index: number;
  onClick: (d: Destination) => void;
}) {
  const src = typeof d.image === 'string' ? d.image : (d.image as { src: string })?.src || '';
  const heightClass = size === 'tall' ? 'row-span-2 h-full min-h-[420px]' : size === 'wide' ? 'h-[200px]' : 'h-[200px]';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, scale: 1.015 }}
      onClick={() => onClick(d)}
      className={`relative overflow-hidden rounded-2xl cursor-pointer group ${heightClass} ${size === 'tall' ? 'row-span-2' : ''}`}
    >
      {src && (
        <Image
          src={src}
          alt={d.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Hover tint */}
      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Top-right play icon */}
      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
        <ArrowUpRight className="w-3.5 h-3.5 text-white" />
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
        <p className="text-white/45 text-[9px] font-bold uppercase tracking-widest mb-0.5">{d.country}</p>
        <h4 className={`font-display font-black text-white leading-tight ${size === 'tall' ? 'text-2xl' : 'text-base'}`}>
          {d.name}
        </h4>
        {size === 'tall' && d.tags && (
          <div className="flex gap-1.5 mt-2">
            {d.tags.slice(0, 2).map(t => (
              <span key={t} className="text-[9px] text-white/60 bg-white/10 border border-white/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ── Parallax strip ── */
function ParallaxStrip({ destinations, direction }: { destinations: Destination[]; direction: 'left' | 'right' }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'left' ? ['0%', '-12%'] : ['-8%', '4%']
  );

  const items = [...destinations, ...destinations, ...destinations];
  const rots  = [-2.5, 1.5, -1, 2, -1.5, 1, -2, 2.5, -0.5, 1.8];

  return (
    <div ref={ref} className="relative h-[220px] flex items-center overflow-hidden">
      <motion.div className="flex gap-4 px-8 absolute left-0 items-center" style={{ x }}>
        {items.map((d, i) => {
          const src = typeof d.image === 'string' ? d.image : (d.image as { src: string })?.src || '';
          return (
            <motion.div
              key={`strip-${direction}-${d.id}-${i}`}
              style={{ rotate: rots[i % rots.length] }}
              whileHover={{ scale: 1.1, rotate: 0, zIndex: 20 }}
              className="relative flex-shrink-0 cursor-pointer group"
            >
              {/* Polaroid */}
              <div className="bg-white shadow-2xl shadow-black/70 p-[5px] pb-[32px] rounded-[3px]">
                <div className="relative w-36 h-36 overflow-hidden">
                  {src && <Image src={src} alt={d.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />}
                </div>
                <p className="text-[9px] font-mono text-zinc-400 tracking-wider text-center mt-1 truncate w-36">
                  {d.name}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

/* ── Main component ── */
export default function MemoryReel({
  destinations,
  onDestinationClick,
}: {
  destinations: Destination[];
  onDestinationClick?: (d: Destination) => void;
}) {
  const [lightbox, setLightbox] = useState<Destination | null>(null);
  const visited = destinations.filter(d => d.status === 'visited');

  if (visited.length === 0) return null;

  const handleClick = (d: Destination) => {
    setLightbox(d);
    onDestinationClick?.(d);
  };

  // Build masonry layout: first card tall, rest alternate
  const sizes: CardSize[] = ['tall', 'square', 'wide', 'square', 'wide', 'square'];
  const gridItems = visited.slice(0, 5);

  return (
    <>
      <AnimatePresence>
        {lightbox && <Lightbox d={lightbox} onClose={() => setLightbox(null)} />}
      </AnimatePresence>

      <section className="py-28 overflow-hidden bg-[#070707] relative" id="memories">

        {/* Film grain */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Ambient glows */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/6 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-rose-500/5 rounded-full blur-[120px] pointer-events-none" />

        {/* ── Header ── */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8"
          >
            <div>
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] text-white/40 mb-6"
              >
                <Camera className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold tracking-[0.28em] uppercase">Memory Lane</span>
              </motion.div>

              <h2
                className="font-display font-black text-white leading-[0.88]"
                style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}
              >
                <motion.span
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  Captured
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.28, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="block italic font-light"
                  style={{ color: 'hsl(var(--primary))' }}
                >
                  Moments
                </motion.span>
              </h2>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-end gap-3"
            >
              <div className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-white/[0.04] border border-white/8">
                <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                <span className="text-white/50 text-sm font-body">
                  <span className="text-white font-bold font-display text-lg">{visited.length}</span>
                  {' '}memories &amp; counting
                </span>
              </div>
              <p className="text-white/20 text-xs font-body italic">Click any photo to explore</p>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Masonry grid ── */}
        {gridItems.length > 0 && (
          <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[200px]">
              {gridItems.map((d, i) => (
                <MemoryCard
                  key={d.id}
                  d={d}
                  size={sizes[i] || 'square'}
                  index={i}
                  onClick={handleClick}
                />
              ))}

              {/* "View all" tile */}
              {visited.length > 5 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="relative rounded-2xl border border-white/8 bg-white/[0.03] flex flex-col items-center justify-center gap-3 cursor-pointer group hover:bg-white/[0.06] transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center group-hover:bg-primary/25 transition-colors">
                    <Play className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-center">
                    <p className="text-white font-display font-bold text-xl">+{visited.length - 5}</p>
                    <p className="text-white/30 text-xs font-body mt-0.5">more memories</p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}

        {/* ── Divider ── */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10 relative z-10">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-white/5" />
            <span className="text-white/15 text-[10px] font-bold uppercase tracking-[0.3em]">Polaroids</span>
            <div className="h-px flex-1 bg-white/5" />
          </div>
        </div>

        {/* ── Parallax polaroid strips ── */}
        <ParallaxStrip destinations={visited} direction="left" />
        <div className="h-4" />
        <ParallaxStrip destinations={[...visited].reverse()} direction="right" />
      </section>
    </>
  );
}
