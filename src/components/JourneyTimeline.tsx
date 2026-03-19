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

  const first   = visited[0];
  const latest  = visited[visited.length - 1];
  const topRated = [...visited].sort((a, b) => (b.rating || 0) - (a.rating || 0))[0];
  const countries = new Set(visited.map(d => d.country)).size;

  const cards = [
    { title: 'Where It Began', desc: `${first.name}, ${first.country}`, icon: Heart, color: 'text-rose-500', bg: 'bg-rose-500/10', img: typeof first.image === 'string' ? first.image : '', date: first.visitedDate ? new Date(first.visitedDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'The Beginning' },
    { title: 'Globetrotters',  desc: `${countries} countries explored`, icon: Plane, color: 'text-sky-500',  bg: 'bg-sky-500/10',  img: '', date: 'Milestone' },
    { title: 'Our Favourite',  desc: `${topRated.name} · ${topRated.rating}★`, icon: Star, color: 'text-amber-500', bg: 'bg-amber-500/10', img: typeof topRated.image === 'string' ? topRated.image : '', date: 'Top Rated' },
    { title: 'Latest Chapter', desc: `${latest.name}, ${latest.country}`, icon: MapPin, color: 'text-emerald-500', bg: 'bg-emerald-500/10', img: typeof latest.image === 'string' ? latest.image : '', date: latest.visitedDate ? new Date(latest.visitedDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Recently' },
  ];

  return (
    <section className="py-24 bg-muted/40 border-y border-border/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Award className="w-4 h-4" />
            <span className="text-xs font-bold tracking-widest uppercase">Milestones</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold">Journey Highlights</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.55 }}
              className="bento-card"
            >
              {c.img ? (
                <div className="relative h-32 overflow-hidden">
                  <Image src={c.img} alt={c.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className={`absolute top-3 left-3 p-2 rounded-xl ${c.bg}`}>
                    <c.icon className={`w-4 h-4 ${c.color}`} />
                  </div>
                </div>
              ) : (
                <div className={`h-32 flex items-center justify-center ${c.bg}`}>
                  <c.icon className={`w-10 h-10 ${c.color} opacity-50`} />
                </div>
              )}
              <div className="p-5">
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">{c.date}</div>
                <h3 className="font-display font-bold text-base mb-1">{c.title}</h3>
                <p className="text-sm text-muted-foreground font-body">{c.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
