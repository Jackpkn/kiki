"use client";

import { motion } from "framer-motion";
import type { Destination } from "@/types/destination";
import { Globe2, CheckCircle2, Plane, Sparkles } from "lucide-react";

export default function StatsDashboard({ destinations }: { destinations: Destination[] }) {
  const countries = new Set(destinations.map(d => d.country)).size;
  const visited   = destinations.filter(d => d.status === "visited").length;
  const planned   = destinations.filter(d => d.status === "planned").length;
  const dreams    = destinations.filter(d => d.status === "dream" || d.status === "wishlist").length;
  const pct       = Math.round((visited / (destinations.length || 1)) * 100);

  const stats = [
    { icon: Globe2,       value: countries, label: "Countries", bg: "bg-amber-500/10",  text: "text-amber-600 dark:text-amber-400" },
    { icon: CheckCircle2, value: visited,   label: "Visited",   bg: "bg-emerald-500/10",text: "text-emerald-600 dark:text-emerald-400" },
    { icon: Plane,        value: planned,   label: "Planned",   bg: "bg-sky-500/10",    text: "text-sky-600 dark:text-sky-400" },
    { icon: Sparkles,     value: dreams,    label: "Dreaming",  bg: "bg-violet-500/10", text: "text-violet-600 dark:text-violet-400" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3">
        {stats.map(({ icon: Icon, value, label, bg, text }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="flex items-center gap-3 p-4 rounded-2xl bg-card border border-border/60 card-shadow"
          >
            <div className={`p-2.5 rounded-xl ${bg}`}>
              <Icon className={`w-4 h-4 ${text}`} />
            </div>
            <div>
              <div className="text-2xl font-display font-bold tabular-nums leading-none">{value}</div>
              <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mt-0.5">{label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Journey Progress</span>
          <span className="text-sm font-display font-bold text-primary">{pct}%</span>
        </div>
        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${pct}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="h-full rounded-full bg-gradient-to-r from-primary to-rose-400"
          />
        </div>
        <p className="text-xs text-muted-foreground">{visited} of {destinations.length} destinations explored</p>
      </div>
    </div>
  );
}
