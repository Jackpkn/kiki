'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Camera } from 'lucide-react';
import Image from 'next/image';
import type { Destination } from '@/types/destination';

export default function MemoryReel({ destinations, onDestinationClick }: { destinations: Destination[]; onDestinationClick?: (d: Destination) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x = useTransform(scrollYProgress, [0, 1], ['4%', '-14%']);

  const visited = destinations.filter(d => d.status === 'visited');
  if (visited.length === 0) return null;

  const items = [...visited, ...visited, ...visited];
  const rots  = [-2.5, 1.5, -1, 2, -1.5, 1, -2, 2.5];

  return (
    <section ref={ref} className="py-24 overflow-hidden bg-black relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-end justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 text-white/60 mb-4">
              <Camera className="w-4 h-4" />
              <span className="text-xs font-bold tracking-widest uppercase">Memory Lane</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white">Captured Moments</h2>
            <p className="text-white/40 font-body mt-2">Every picture tells a piece of our story.</p>
          </div>
          <span className="text-white/20 text-sm font-body italic hidden sm:block">{visited.length} memories</span>
        </motion.div>
      </div>

      <div className="relative h-[320px] flex items-center">
        <motion.div className="flex gap-4 px-12 absolute left-0" style={{ x }}>
          {items.map((d, i) => {
            const src = typeof d.image === 'string' ? d.image : '';
            return (
              <motion.div
                key={`${d.id}-${i}`}
                style={{ rotate: rots[i % rots.length] }}
                whileHover={{ scale: 1.06, rotate: 0, zIndex: 20 }}
                onClick={() => onDestinationClick?.(d)}
                className="relative flex-shrink-0 w-52 h-64 rounded-2xl overflow-hidden cursor-pointer bg-zinc-900 shadow-2xl shadow-black/50 border border-white/6"
              >
                {src && <Image src={src} alt={d.name} fill className="object-cover" />}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white text-sm font-display font-bold leading-tight">{d.name}</p>
                  <p className="text-white/45 text-xs mt-0.5">{d.country}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
