'use client';

import { motion } from 'framer-motion';
import { MapPin, Calendar, ArrowUpRight, Star } from 'lucide-react';
import Image from 'next/image';
import type { Destination } from '@/types/destination';

export default function StoryChapters({ destinations, onDestinationClick }: {
  destinations: Destination[];
  onDestinationClick: (d: Destination) => void;
}) {
  const visited = destinations
    .filter(d => d.status === 'visited')
    .sort((a, b) => new Date(b.visitedDate || 0).getTime() - new Date(a.visitedDate || 0).getTime());

  if (visited.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-16 font-body italic">
        Mark destinations as visited to start your story.
      </p>
    );
  }

  return (
    <div className="space-y-0">
      {visited.map((d, i) => {
        const even = i % 2 === 0;
        const src  = typeof d.image === 'string' ? d.image : (d.image as { src: string })?.src || '';
        const chapterNum = String(i + 1).padStart(2, '0');

        return (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className={`grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch border-b border-border/40 last:border-0 ${i === 0 ? 'border-t border-border/40' : ''}`}
          >
            {/* Image side */}
            <div
              className={`relative h-72 md:h-[420px] overflow-hidden cursor-pointer group ${even ? 'md:order-1' : 'md:order-2'}`}
              onClick={() => onDestinationClick(d)}
            >
              {src && (
                <Image
                  src={src}
                  alt={d.name}
                  fill
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              {/* Chapter number watermark */}
              <div className="absolute top-6 left-6 font-display font-black text-white/10 leading-none select-none pointer-events-none"
                style={{ fontSize: 'clamp(4rem, 10vw, 7rem)' }}>
                {chapterNum}
              </div>

              {/* Hover CTA */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-sm font-semibold">
                  View Story <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Bottom info */}
              <div className="absolute bottom-6 left-6 right-6">
                {d.visitedDate && (
                  <div className="flex items-center gap-1.5 text-white/50 text-[10px] font-semibold uppercase tracking-widest mb-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(d.visitedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </div>
                )}
              </div>
            </div>

            {/* Text side */}
            <div
              className={`flex flex-col justify-center p-10 md:p-14 cursor-pointer group ${even ? 'md:order-2' : 'md:order-1'}`}
              onClick={() => onDestinationClick(d)}
            >
              {/* Chapter label */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Chapter {chapterNum}</span>
                <div className="h-px flex-1 max-w-[60px] bg-primary/30" />
              </div>

              <h3 className="font-display font-black leading-[0.9] mb-4 group-hover:text-primary transition-colors duration-300"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
                {d.name}
              </h3>

              <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-5">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                {d.country}
              </div>

              <p className="text-muted-foreground font-body leading-relaxed text-base mb-6 line-clamp-3">
                {d.description}
              </p>

              {d.tags && d.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {d.tags.slice(0, 3).map(t => (
                    <span key={t} className="tag-pill">{t}</span>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between">
                {d.rating && (
                  <div className="flex items-center gap-1.5 text-amber-500 text-sm font-bold">
                    <Star className="w-4 h-4 fill-current" />
                    {d.rating} / 5
                  </div>
                )}
                <span className="text-primary text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all duration-200 ml-auto">
                  Read Story <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
