"use client";

import { Globe2, Heart, Instagram, Twitter, Mail, MapPin } from "lucide-react";

export default function PassportFooter() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center">
                <Globe2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-display font-bold text-lg leading-tight">Jack & Kiki</div>
                <div className="text-[10px] text-white/35 tracking-[0.2em] uppercase">Travelogue · 2026</div>
              </div>
            </div>
            <p className="text-white/45 text-sm font-body leading-relaxed max-w-xs">
              Two hearts exploring one world. Every destination is a new chapter in our love story.
            </p>
            <div className="flex gap-2.5">
              {[Instagram, Twitter, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-xl bg-white/6 flex items-center justify-center text-white/40 hover:bg-primary hover:text-white transition-all duration-200">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/30">Explore</h4>
            <ul className="space-y-2.5 text-sm font-body text-white/50">
              {["All Destinations", "Visited Places", "Dream List", "Travel Tips", "Our Story"].map(l => (
                <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Quote card */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/30">Contact</h4>
            <div className="space-y-3 text-sm text-white/50">
              <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /> hello@jackandkiki.travel</div>
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> Somewhere beautiful</div>
            </div>
            <div className="mt-4 p-4 rounded-2xl bg-white/4 border border-white/6">
              <p className="text-white/55 text-xs font-serif italic leading-relaxed">
                "Not all those who wander are lost."
              </p>
              <p className="text-white/25 text-[10px] mt-2 tracking-widest uppercase">— J.R.R. Tolkien</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25 font-body">
            © 2026 Jack & Kiki's Travelogue. Made with <Heart className="w-3 h-3 inline text-rose-500 fill-current" /> for each other.
          </p>
          <div className="flex gap-5 text-xs text-white/25">
            <a href="#" className="hover:text-white/60 transition-colors">Privacy</a>
            <a href="#" className="hover:text-white/60 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
