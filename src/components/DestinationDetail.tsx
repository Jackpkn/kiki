import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Circle, Cloud, Sun, Thermometer, Tag, Star } from "lucide-react";
import Image from "next/image";
import type { Destination, ChecklistItem } from "@/types/destination";
import StatusBadge from "./StatusBadge";

interface DestinationDetailProps {
  destination: Destination | null;
  onClose: () => void;
}

const DestinationDetail = ({ destination, onClose }: DestinationDetailProps) => {
  const imageSrc = destination ? (typeof destination.image === "string" ? destination.image : (destination.image as { src: string })?.src || "") : "";

  return (
    <AnimatePresence>
      {destination && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-card rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden relative border border-border/50"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-4 right-4 z-10 bg-card/80 backdrop-blur rounded-full p-2 text-muted-foreground hover:text-foreground transition-all hover:scale-110">
              <X className="w-5 h-5" />
            </button>
            <div className="relative h-72 overflow-hidden">
              <Image src={imageSrc} alt={destination.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-2 mb-2">
                  <StatusBadge status={destination.status} />
                  {destination.rating && (
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-400/20 text-yellow-500 backdrop-blur-sm text-xs font-bold border border-yellow-400/30">
                      <Star className="w-3 h-3 fill-current" />
                      {destination.rating}
                    </div>
                  )}
                </div>
                <h2 className="text-4xl font-display font-bold text-foreground drop-shadow-sm">{destination.name}, {destination.country}</h2>
              </div>
            </div>
            <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {destination.weather && (
                  <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 flex flex-col items-center text-center">
                    <span className="text-2xl mb-1">{destination.weather.icon}</span>
                    <span className="text-lg font-bold text-primary flex items-center gap-1">
                      <Thermometer className="w-4 h-4" />
                      {destination.weather.temp}°C
                    </span>
                    <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">{destination.weather.condition}</span>
                  </div>
                )}
                {destination.bestTime && (
                  <div className="md:col-span-2 p-4 rounded-2xl bg-muted/50 border border-border flex items-center gap-4">
                    <div className="p-2 rounded-xl bg-card text-primary shadow-sm">
                      <Sun className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-xs text-muted-foreground uppercase font-bold tracking-wider mb-0.5">Best time to visit</span>
                      <span className="text-sm font-body font-semibold text-foreground">{destination.bestTime}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-display font-bold flex items-center gap-2">
                  <Cloud className="w-5 h-5 text-primary" />
                  About the Trip
                </h3>
                <p className="text-muted-foreground font-body text-base leading-relaxed">{destination.description}</p>
              </div>

              {destination.tags && destination.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {destination.tags.map(tag => (
                    <span key={tag} className="flex items-center gap-1 px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-semibold">
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {destination.checklist && destination.checklist.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-border/50">
                  <h3 className="text-lg font-display font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    Travel Checklist
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {destination.checklist.map((item: ChecklistItem) => (
                      <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/50">
                        {item.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : (
                          <Circle className="w-5 h-5 text-muted-foreground" />
                        )}
                        <span className={`text-sm font-body ${item.completed ? 'text-muted-foreground line-through' : 'text-foreground font-medium'}`}>
                          {item.task}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {destination.notes && (
                <div className="space-y-3 pt-4 border-t border-border/50">
                  <h3 className="text-lg font-display font-bold">Personal Notes</h3>
                  <div className="p-4 rounded-2xl bg-yellow-500/5 border border-yellow-500/20 italic">
                    <p className="text-sm font-body text-foreground leading-relaxed">"{destination.notes}"</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DestinationDetail;
