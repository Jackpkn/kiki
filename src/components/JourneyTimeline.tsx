'use client';

import { motion } from 'framer-motion';
import { Plane, Heart, Star, MapPin, Award } from 'lucide-react';
import Image from 'next/image';
import type { Destination } from '@/types/destination';

export default function JourneyTimeline({ destinations }: { destinations: Destination[] }) {
  const visited = destinations
    .filter(d => d.status === 'visited')
    .sort((a, b) => new Date(a.visitedDate || 0).getTime() - new Date(b.visitedDate || 0).getTime());

  if (visited.length < 2) return null;

  const first    = visited[0];
  const latest   = visited[visited.length - 1];
  const topRated = [...visited].sort((a, b) => (b.rating || 0) - (a.rating || 0))[0];
  const countries = new Set(visited.map(d => d.country)).size;

  const cards = [
    {
      title: 'Where It Began',
      desc: `${first.name}, ${first.country}`,
      icon: Heart,
      color: 'text-rose-400',
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/20',
      img: typeof first.image === 'string' ? first.image : (first.image as { src: string })?.src || '',
      date: first.visitedDate
        ? new Date(first.visitedDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        : 'The Beginning',
    },
    {
      title: 'Globetrotters',
      desc: `${countries} countries explored`,
      icon: Plane,
      color: 'text-sky-400',
      bg: 'bg-sky-500/10',
      border: 'border-sky-500/20',
      img: '',
      date: 'Milestone',
    },
    {
      title: 'Our Favourite',
      desc: `${topRated.name} · ${topRated.rating}★`,
      icon: Star,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
      img: typeof topRated.image === 'string' ? topRated.image : (topRated.image as { src: string })?.src || '',
      date: 'Top Rated',
    },
    {
      title: 'Latest Chapter',
      desc: `${latest.name}, ${latest.country}`,
      icon: MapPin,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
      img: typeof latest.image === 'string' ? latest.image : (latest.image as { src: string })?.src || '',
      date: latest.visitedDate
        ? new Date(latest.visitedDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        : 'Recently',
    },
  ];

  return (
    <section className="py-24 border-y border-border/50 bg-muted/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <Award className="w-4 h-4" />
              <span className="text-xs font-bold tracking-widest uppercase">Milestones</span>
            </div>
            <h2 className="font-display font-black leading-[0.9]"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}>
              Journey Highlights
            </h2>
          </div>
          <p className="text-muted-foreground font-body text-sm max-w-xs">
            The moments that define our story together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`bento-card group overflow-hidden border ${c.border}`}
            >
              {/* Image or icon area */}
              {c.img ? (
                <div className="relative h-36 overflow-hidden">
                  <Image
                    src={c.img}
                    alt={c.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className={`absolute top-3 left-3 p-2 rounded-xl ${c.bg} backdrop-blur-sm`}>
                    <c.icon className={`w-4 h-4 ${c.color}`} />
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-white/60">{c.date}</span>
                  </div>
                </div>
              ) : (
                <div className={`h-36 flex flex-col items-center justify-center gap-3 ${c.bg}`}>
                  <c.icon className={`w-10 h-10 ${c.color} opacity-60`} />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">{c.date}</span>
                </div>
              )}

              <div className="p-5">
                <h3 className="font-display font-bold text-base mb-1.5 group-hover:text-primary transition-colors duration-200">
                  {c.title}
                </h3>
                <p className="text-sm text-muted-foreground font-body leading-snug">{c.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
