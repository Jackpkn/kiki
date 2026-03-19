'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Globe2, Camera, BookOpen, Sparkles, Heart } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Story',       icon: Heart,    href: '#story' },
  { label: 'Chapters',    icon: BookOpen, href: '#chapters' },
  { label: 'Memories',    icon: Camera,   href: '#memories' },
  { label: 'Dreams',      icon: Sparkles, href: '#dreams' },
  { label: 'Collection',  icon: Globe2,   href: '#collection' },
];

export default function FloatingNav() {
  const [visible, setVisible] = useState(false);
  const [active, setActive]   = useState('');

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setActive(href);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-5 left-1/2 -translate-x-1/2 z-50 hidden md:flex"
        >
          <div className="flex items-center gap-1 px-3 py-2.5 rounded-full bg-background/80 backdrop-blur-xl border border-border/60 shadow-xl shadow-black/10">
            {/* Logo */}
            <div className="flex items-center gap-2 px-3 mr-2 border-r border-border/50">
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <Plane className="w-3 h-3 text-white" />
              </div>
              <span className="text-xs font-bold text-foreground/70 tracking-wide">J&K</span>
            </div>

            {NAV_ITEMS.map(({ label, icon: Icon, href }) => {
              const isActive = active === href;
              return (
                <button
                  key={href}
                  onClick={() => scrollTo(href)}
                  className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navPill"
                      className="absolute inset-0 bg-primary rounded-full -z-10"
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    />
                  )}
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </button>
              );
            })}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
