"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Globe2, Compass, Sparkles, Heart, Map } from "lucide-react";
import Image from "next/image";
import EnhancedHero from "@/components/EnhancedHero";
import FilterBar from "@/components/FilterBar";
import type { FilterType } from "@/components/FilterBar";
import DestinationCard from "@/components/DestinationCard";
import AddPlaceDialog from "@/components/AddPlaceDialog";
import DestinationDetail from "@/components/DestinationDetail";
import StatsDashboard from "@/components/StatsDashboard";
import ThemeToggle from "@/components/ThemeToggle";
import TravelTips from "@/components/TravelTips";
import PassportFooter from "@/components/PassportFooter";
import StoryChapters from "@/components/StoryChapters";
import MemoryReel from "@/components/MemoryReel";
import JourneyTimeline from "@/components/JourneyTimeline";
import DreamPlanner from "@/components/DreamPlanner";
import FloatingNav from "@/components/FloatingNav";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import CursorGlow from "@/components/CursorGlow";
import LoveGate from "@/components/LoveGate";
import type { Destination } from "@/types/destination";
import { defaultDestinations } from "@/data/destinations";

export default function Home() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading]           = useState(true);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery]   = useState("");
  const [showAddDialog, setShowAddDialog]           = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [isDark, setIsDark] = useState(false);
  const [gateAccepted, setGateAccepted] = useState(true); // true = skip until we check storage

  // Check session storage — show gate only once per session
  useEffect(() => {
    const accepted = sessionStorage.getItem('love-gate-accepted');
    if (!accepted) setGateAccepted(false);
  }, []);

  const handleGateAccept = () => {
    sessionStorage.setItem('love-gate-accepted', '1');
    setGateAccepted(true);
  };

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res  = await fetch("/api/destinations");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const text = await res.text();
        try { setDestinations(JSON.parse(text)); }
        catch { setDestinations(defaultDestinations); }
      } catch {
        setDestinations(defaultDestinations);
      } finally {
        setLoading(false);
      }
    };
    fetchDestinations();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const filteredDestinations = useMemo(() => {
    return destinations.filter((d: Destination) => {
      const matchesFilter = activeFilter === "all" || d.status === activeFilter;
      const matchesSearch =
        searchQuery === "" ||
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.country.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [destinations, activeFilter, searchQuery]);

  const handleAddDestination = (newDest: Omit<Destination, "id">) => {
    setDestinations((prev) => [...prev, { ...newDest, id: Date.now().toString() }]);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-stone-950 gap-4">
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-4xl font-display font-light text-white tracking-tight"
        >
          Jack & <span className="italic text-amber-300">Kiki</span>
        </motion.div>
        <p className="text-white/30 text-sm font-body tracking-widest uppercase">Loading your world...</p>
      </div>
    );
  }

  const featuredDestination = destinations.find(d => d.status === "dream");
  const featuredImageSrc = featuredDestination
    ? typeof featuredDestination.image === "string"
      ? featuredDestination.image
      : (featuredDestination.image as { src: string })?.src || ""
    : "";

  return (
    <div className="min-h-screen bg-background transition-colors duration-500">
      {/* Love gate — blocks entry until accepted */}
      {!gateAccepted && <LoveGate onAccept={handleGateAccept} />}

      {/* Global UI chrome */}
      <CursorGlow />
      <ScrollProgress />
      <FloatingNav />
      <BackToTop />

      {/* Theme toggle */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
      </div>

      {/* Hero */}
      <EnhancedHero destinations={destinations} onDestinationClick={setSelectedDestination} />

      <main className="max-w-7xl mx-auto px-6 md:px-12">

        {/* ── Intro + Stats ── */}
        <section id="story" className="py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 space-y-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  <span className="text-xs font-bold tracking-widest uppercase">Our Story</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-semibold leading-tight mb-5">
                  The world is our<br />
                  <span className="italic font-light text-primary">playground.</span>
                </h2>
                <p className="text-muted-foreground font-body text-lg leading-relaxed">
                  Jack and Kiki — two wanderers collecting memories, chasing sunsets, and falling in love with every corner of this beautiful world.
                </p>
              </motion.div>
              <StatsDashboard destinations={destinations} />
            </div>

            {/* Featured destination */}
            {featuredDestination && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9 }}
                className="lg:col-span-7"
              >
                <div
                  className="relative h-[480px] rounded-3xl overflow-hidden cursor-pointer group shadow-2xl"
                  onClick={() => setSelectedDestination(featuredDestination)}
                >
                  <Image
                    src={featuredImageSrc}
                    alt={featuredDestination.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                  <div className="absolute top-6 left-6">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/90 text-white text-xs font-bold uppercase tracking-widest shadow-lg">
                      <Sparkles className="w-3.5 h-3.5" />
                      Dream Destination
                    </div>
                  </div>

                  <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
                    <div>
                      <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-1">{featuredDestination.country}</p>
                      <h3 className="text-4xl md:text-5xl font-display font-semibold text-white leading-tight">
                        {featuredDestination.name}
                      </h3>
                      {featuredDestination.tags && (
                        <div className="flex gap-2 mt-3">
                          {featuredDestination.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="text-[10px] text-white/70 bg-white/10 border border-white/15 px-2.5 py-1 rounded-full uppercase tracking-wider">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white border border-white/25 group-hover:bg-primary group-hover:border-primary transition-all duration-300 flex-shrink-0">
                      <Plus className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* ── Marquee strip ── */}
        <div className="py-6 border-y border-border/50 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap gap-12">
            {["Santorini", "Kyoto", "Bali", "Paris", "Ladakh", "New Zealand", "Goa", "Cappadocia", "Amalfi Coast", "Swiss Alps",
              "Santorini", "Kyoto", "Bali", "Paris", "Ladakh", "New Zealand", "Goa", "Cappadocia", "Amalfi Coast", "Swiss Alps"].map((name, i) => (
              <span key={i} className="text-sm font-body font-medium text-muted-foreground flex items-center gap-3">
                <span className="w-1 h-1 rounded-full bg-primary inline-block" />
                {name}
              </span>
            ))}
          </div>
        </div>
      </main>

      {/* ── Journey Timeline ── */}
      <JourneyTimeline destinations={destinations} />

      <main className="max-w-7xl mx-auto px-6 md:px-12">
        {/* ── Story Chapters ── */}
        <section id="chapters" className="py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-5">
              <Map className="w-4 h-4" />
              <span className="text-xs font-bold tracking-widest uppercase">Travel Diary</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-semibold mb-4">Our Travel Chapters</h2>
            <p className="text-muted-foreground font-body text-lg max-w-xl mx-auto">
              Every destination is a new chapter in our story.
            </p>
          </motion.div>
          <StoryChapters destinations={destinations} onDestinationClick={setSelectedDestination} />
        </section>
      </main>

      {/* ── Memory Reel ── */}
      <div id="memories">
        <MemoryReel destinations={destinations} onDestinationClick={setSelectedDestination} />
      </div>

      {/* ── Dream Planner ── */}
      <div id="dreams">
        <DreamPlanner destinations={destinations} />
      </div>

      {/* ── The Collection ── */}
      <main id="collection" className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        <section className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
                <Compass className="w-4 h-4" />
                <span className="text-xs font-bold tracking-widest uppercase">The Collection</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-semibold leading-tight">
                All Destinations
              </h2>
              <p className="text-muted-foreground font-body mt-2">
                {destinations.length} places — from cherished memories to future dreams.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowAddDialog(true)}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all group flex-shrink-0"
            >
              <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
              Add Destination
            </motion.button>
          </div>

          {/* Filter bar — now with destination counts */}
          <FilterBar
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            destinations={destinations}
          />

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            <AnimatePresence mode="popLayout">
              {filteredDestinations.map((destination: Destination, index: number) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                  index={index}
                  onClick={setSelectedDestination}
                />
              ))}
            </AnimatePresence>
          </div>

          {filteredDestinations.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-28 border-2 border-dashed border-border rounded-3xl"
            >
              <Globe2 className="w-10 h-10 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-display font-semibold text-muted-foreground">No matches found</h3>
              <p className="text-sm text-muted-foreground/60 mt-2 font-body">Try a different filter or search term</p>
            </motion.div>
          )}
        </section>

        <div className="mt-24">
          <TravelTips />
        </div>
      </main>

      <AddPlaceDialog
        open={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        onAdd={handleAddDestination}
      />

      <DestinationDetail
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
      />

      <PassportFooter />
    </div>
  );
}
