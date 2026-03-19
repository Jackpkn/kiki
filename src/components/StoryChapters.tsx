'use client';

import { motion } from 'framer-motion';
import { MapPin, Calendar, ArrowRight, Star } from 'lucide-react';
import Image from 'next/image';
import type { Destination } from '@/types/destination';

export default function StoryChapters({ destinations, onDestinationClick }: { destinations: Destination[]; onDestinationClick: (d: Destination) => void }) {
  const visited = destinations
    .filter(d => d.status === 'visited')
    .sort((a, b) => new Date(b.visitedDate || 0).getTime() - new Date(a.visitedDate || 0).getTime());

  if (visited.length === 0) {
    return <p className="text-center text-muted-foreground py-16 font-body">Mark destinations as visited to start your story.</p>;
  }

  return (
    <div className="space-y-14 max-w-5xl mx-auto">
      {visited.map((d, i) => {
        const even = i % 2 === 0;
        const src  = typeof d.image === 'string' ? d.image : '';
        return (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${even ? '' : 'md:[&>*:first-child]:order-2'}`}
          >
            {/* Image */}
            <div className="relative h-72 md:h-88 rounded-3xl overflow-hidden cursor-pointer group shadow-xl" onClick={() => onDestinationClick(d)}>
              {src && <Image src={src} alt={d.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              <div className="absolute top-4 left-4 w-9 h-9 rounded-full glass-dark flex items-center justify-center text-white text-xs font-display font-bold border border-white/15">
                {String(i + 1).padStart(2, '0')}
              </div>
            </div>

            {/* Text */}
            <div className="space-y-4 cursor-pointer group" onClick={() => onDestinationClick(d)}>
              {d.visitedDate && (
                <div className="flex items-center gap-1.5 text-primary text-xs font-semibold uppercase tracking-widest">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(d.visitedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </div>
              )}
              <h3 className="text-3xl md:text-4xl font-display font-bold group-hover:text-primary transition-colors duration-200">
                {d.name}
              </h3>
              <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                <MapPin className="w-3.5 h-3.5" />
                {d.country}
              </div>
              <p className="text-muted-foreground font-body leading-relaxed">{d.description}</p>
              {d.tags && (
                <div className="flex flex-wrap gap-2">
                  {d.tags.slice(0, 3).map(t => <span key={t} className="tag-pill">{t}</span>)}
                </div>
              )}
              <div className="flex items-center justify-between pt-1">
                {d.rating && (
                  <div className="flex items-center gap-1.5 text-amber-500 text-sm font-bold">
                    <Star className="w-4 h-4 fill-current" />
                    {d.rating} / 5
                  </div>
                )}
                <span className="text-primary text-sm font-semibold flex items-center gap-1.5 group-hover:gap-3 transition-all duration-200">
                  Read Story <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
