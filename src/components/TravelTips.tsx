"use client";

import { motion } from "framer-motion";
import { Lightbulb, Navigation, Heart, Shield } from "lucide-react";

const tips = [
  { icon: Navigation, title: "Plan Ahead",        desc: "Book flights 3+ months early for the best rates and availability.",       bg: "bg-amber-500/10",  text: "text-amber-600 dark:text-amber-400" },
  { icon: Shield,     title: "Travel Insurance",  desc: "Never leave home without it — the most important thing you'll ever pack.", bg: "bg-sky-500/10",    text: "text-sky-600 dark:text-sky-400" },
  { icon: Heart,      title: "Stay Local",         desc: "Support local businesses and eat street food for the real experience.",    bg: "bg-rose-500/10",   text: "text-rose-600 dark:text-rose-400" },
  { icon: Lightbulb,  title: "Pack Light",         desc: "Only bring essentials. You can always buy what you need along the way.",   bg: "bg-violet-500/10", text: "text-violet-600 dark:text-violet-400" },
];

export default function TravelTips() {
  return (
    <section className="py-16 border-t border-border/50">
      <div className="flex items-center gap-3 mb-10">
        <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
          <Lightbulb className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-2xl font-display font-bold">Travel Tips</h2>
          <p className="text-xs text-muted-foreground mt-0.5">From our experience on the road</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tips.map(({ icon: Icon, title, desc, bg, text }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className="bento-card p-6"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${bg}`}>
              <Icon className={`w-5 h-5 ${text}`} />
            </div>
            <h3 className="font-display font-bold text-base mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground font-body leading-relaxed">{desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
