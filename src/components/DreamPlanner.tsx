'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MapPin, ArrowRight, Loader2, Compass, Star, Heart } from 'lucide-react';
import Image from 'next/image';
import type { Destination } from '@/types/destination';

const IDEAS = [
  { title: "Maldives",       country: "Maldives",          desc: "Overwater bungalows, crystal lagoons, and sunsets that feel like a dream.", emoji: "🏝️" },
  { title: "Patagonia",      country: "Chile / Argentina", desc: "Dramatic peaks, ancient glaciers, and raw wilderness for the adventurous.", emoji: "🏔️" },
  { title: "Kyoto",          country: "Japan",             desc: "Cherry blossoms, ancient temples, and the quiet magic of Japanese culture.", emoji: "🌸" },
  { title: "Amalfi Coast",   country: "Italy",             desc: "Cliffside villages, turquoise waters, and the most beautiful sunsets in Europe.", emoji: "🍋" },
  { title: "Marrakech",      country: "Morocco",           desc: "Vibrant souks, riads, and a sensory explosion of colour and spice.", emoji: "🕌" },
];

export default function DreamPlanner({ destinations }: { destinations: Destination[] }) {
  const [loading, setLoading] = useState(false);
  const [idea, setIdea]       = useState<typeof IDEAS[0] | null>(null);
  const [idx, setIdx]         = useState(0);

  const generate = () => {
    setLoading(true);
    setIdea(null);
    setTimeout(() => {
      setIdea(IDEAS[idx % IDEAS.length]);
      setIdx(n => n + 1);
      setLoading(false);
    }, 1600);
  };

  const dreams = destinations.filter(d => d.status === 'dream' || d.status === 'wishlist');

  return (
    <section className="py-28 relative overflow-hidden bg-muted/30">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-5">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span className="text-xs font-bold tracking-widest uppercase">Dream Together</span>
          </div>
          <h2 className="font-display font-black leading-[0.9] mb-4"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            Where to Next?
          </h2>
          <p className="text-muted-foreground font-body text-lg max-w-md mx-auto">
            Let the world inspire your next chapter together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

          {/* AI Inspiration card — spans 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bento-card overflow-hidden"
          >
            {/* Top accent bar */}
            <div className="h-1 bg-gradient-to-r from-primary via-rose-400 to-violet-500" />

            <div className="p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-primary/10 text-primary rounded-2xl">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-display font-bold">Dream Planner</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Find your next adventure</p>
                </div>
              </div>

              <div className="min-h-[220px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {!loading && !idea && (
                    <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="text-center space-y-5">
                      <div className="text-5xl">🗺️</div>
                      <p className="text-muted-foreground font-body text-sm leading-relaxed">
                        Let us suggest your next perfect destination for two.
                      </p>
                      <button onClick={generate}
                        className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-2xl font-semibold text-sm shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-all">
                        <Compass className="w-4 h-4" /> Inspire Me
                      </button>
                    </motion.div>
                  )}
                  {loading && (
                    <motion.div key="spin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="flex flex-col items-center gap-3 text-primary">
                      <Loader2 className="w-7 h-7 animate-spin" />
                      <p className="text-sm text-muted-foreground animate-pulse font-body">Curating your perfect destination...</p>
                    </motion.div>
                  )}
                  {idea && !loading && (
                    <motion.div key="result" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                      className="space-y-5">
                      <div className="bg-muted/60 rounded-2xl p-5 border border-border/50">
                        <div className="flex items-start gap-3 mb-3">
                          <span className="text-3xl">{idea.emoji}</span>
                          <div>
                            <h4 className="text-xl font-display font-bold">{idea.title}</h4>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                              <MapPin className="w-3 h-3" />{idea.country}
                            </div>
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm font-body leading-relaxed">{idea.desc}</p>
                      </div>
                      <div className="flex gap-3">
                        <button className="flex-1 bg-primary text-primary-foreground px-4 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all">
                          Add to Wishlist <ArrowRight className="w-4 h-4" />
                        </button>
                        <button onClick={generate}
                          className="px-4 py-3 rounded-xl font-semibold text-sm border border-border hover:bg-muted transition-colors">
                          Try Again
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Bucket list — spans 3 cols */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3 space-y-5"
          >
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-3xl font-display font-black mb-1">The Bucket List</h2>
                <p className="text-muted-foreground font-body text-sm">{dreams.length} places waiting to be explored.</p>
              </div>
              {dreams.length > 4 && (
                <span className="text-xs text-muted-foreground font-body">+{dreams.length - 4} more</span>
              )}
            </div>

            <div className="space-y-3">
              {dreams.slice(0, 5).map((d, i) => {
                const src = typeof d.image === 'string' ? d.image : (d.image as { src: string })?.src || '';
                return (
                  <motion.div
                    key={d.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border/60 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer group"
                  >
                    {/* Rank */}
                    <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground flex-shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </div>

                    {/* Thumbnail */}
                    <div className="w-12 h-12 rounded-xl overflow-hidden relative flex-shrink-0">
                      {src && <Image src={src} alt={d.name} fill className="object-cover" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-display font-bold text-sm group-hover:text-primary transition-colors truncate">{d.name}</h4>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                        <MapPin className="w-3 h-3" />{d.country}
                      </div>
                    </div>

                    {d.rating && (
                      <div className="flex items-center gap-1 text-amber-500 text-xs font-bold flex-shrink-0">
                        <Star className="w-3 h-3 fill-current" />{d.rating}
                      </div>
                    )}

                    <ArrowRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary transition-colors flex-shrink-0" />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
