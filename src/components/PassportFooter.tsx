"use client";

import { motion } from "framer-motion";
import { Globe2, Heart, Instagram, Twitter, Mail, MapPin, Plane } from "lucide-react";

const links = ["All Destinations", "Visited Places", "Dream List", "Travel Tips", "Our Story"];

export default function PassportFooter() {
  return (
    <footer className="bg-[#060606] text-white relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/6 rounded-full blur-[120px] pointer-events-none" />

      {/* Top divider with plane */}
      <div className="relative flex items-center justify-center py-10 border-b border-white/5">
        <div className="absolute inset-x-0 top-1/2 h-px bg-white/5" />
        <div className="relative z-10 flex items-center gap-3 px-6 py-3 rounded-full bg-[#060606] border border-white/8">
          <Plane className="w-4 h-4 text-primary" />
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/30">Jack & Kiki · Travelogue · 2026</span>
          <Plane className="w-4 h-4 text-primary scale-x-[-1]" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-16 pb-10">

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">

          {/* Brand — 5 cols */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                <Globe2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-display font-black text-xl leading-tight">Jack & Kiki</div>
                <div className="text-[9px] text-white/25 tracking-[0.25em] uppercase mt-0.5">Travelogue · Est. 2024</div>
              </div>
            </div>

            <p className="text-white/35 text-sm font-body leading-relaxed max-w-xs">
              Two hearts exploring one world. Every destination is a new chapter in our love story.
            </p>

            {/* Quote */}
            <div className="p-5 rounded-2xl border border-white/6 bg-white/[0.02]">
              <p className="text-white/45 text-sm font-display italic leading-relaxed">
                &ldquo;Not all those who wander are lost.&rdquo;
              </p>
              <p className="text-white/20 text-[10px] mt-2.5 tracking-[0.2em] uppercase">— J.R.R. Tolkien</p>
            </div>

            {/* Socials */}
            <div className="flex gap-2.5">
              {[Instagram, Twitter, Mail].map((Icon, i) => (
                <a key={i} href="#"
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-white/30 hover:bg-primary hover:text-white hover:border-primary transition-all duration-200">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links — 3 cols */}
          <div className="md:col-span-3 space-y-5">
            <h4 className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/20">Explore</h4>
            <ul className="space-y-3">
              {links.map(l => (
                <li key={l}>
                  <a href="#" className="text-sm font-body text-white/40 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact — 4 cols */}
          <div className="md:col-span-4 space-y-5">
            <h4 className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/20">Say Hello</h4>
            <div className="space-y-3">
              <a href="mailto:hello@jackandkiki.travel"
                className="flex items-center gap-3 text-sm text-white/40 hover:text-white transition-colors group">
                <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                hello@jackandkiki.travel
              </a>
              <div className="flex items-center gap-3 text-sm text-white/40">
                <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                </div>
                Somewhere beautiful
              </div>
            </div>

            {/* Stats mini */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              {[
                { val: "8+", label: "Countries" },
                { val: "2026", label: "Year" },
                { val: "∞", label: "Memories" },
              ].map(s => (
                <div key={s.label} className="text-center p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="font-display font-black text-lg text-white/70">{s.val}</div>
                  <div className="text-[9px] text-white/20 uppercase tracking-wider mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-white/20 font-body">
            © 2026 Jack & Kiki&apos;s Travelogue. Made with{" "}
            <Heart className="w-3 h-3 inline text-rose-500 fill-current" />{" "}
            for each other.
          </p>
          <div className="flex gap-5 text-xs text-white/20">
            <a href="#" className="hover:text-white/50 transition-colors">Privacy</a>
            <a href="#" className="hover:text-white/50 transition-colors">Terms</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
