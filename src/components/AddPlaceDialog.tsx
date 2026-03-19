import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus } from "lucide-react";
import type { Destination, DestinationStatus } from "@/types/destination";

interface AddPlaceDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (destination: Omit<Destination, "id">) => void;
}

const statusOptions: { value: DestinationStatus; label: string; emoji: string }[] = [
  { value: "dream", label: "Dream Trips", emoji: "✨" },
  { value: "wishlist", label: "Wishlist", emoji: "❤️" },
  { value: "planned", label: "Planned", emoji: "✈️" },
  { value: "visited", label: "Visited", emoji: "✅" },
];

const AddPlaceDialog = ({ open, onClose, onAdd }: AddPlaceDialogProps) => {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<DestinationStatus>("wishlist");
  const [bestTime, setBestTime] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !country) return;
    onAdd({
      name,
      country,
      description,
      status,
      bestTime: bestTime || undefined,
      image: imageUrl || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=640",
      coordinates: { lat: 0, lng: 0 },
    });
    setName(""); setCountry(""); setDescription(""); setStatus("wishlist"); setBestTime(""); setImageUrl("");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-card rounded-2xl shadow-2xl w-full max-w-lg p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-display font-bold text-foreground mb-6">Add New Place ✈️</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-body font-semibold text-foreground">Place Name *</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} required
                    className="w-full mt-1 px-3 py-2 rounded-lg bg-muted border border-border text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="text-sm font-body font-semibold text-foreground">Country *</label>
                  <input value={country} onChange={(e) => setCountry(e.target.value)} required
                    className="w-full mt-1 px-3 py-2 rounded-lg bg-muted border border-border text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
              </div>
              <div>
                <label className="text-sm font-body font-semibold text-foreground">Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-muted border border-border text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
              </div>
              <div>
                <label className="text-sm font-body font-semibold text-foreground">Image URL</label>
                <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..."
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-muted border border-border text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-body font-semibold text-foreground">Status</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {statusOptions.map((opt) => (
                      <button key={opt.value} type="button" onClick={() => setStatus(opt.value)}
                        className={`px-3 py-1.5 rounded-full text-xs font-body font-semibold transition-all ${
                          status === opt.value ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground border border-border"
                        }`}>
                        {opt.emoji} {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-body font-semibold text-foreground">Best Time</label>
                  <input value={bestTime} onChange={(e) => setBestTime(e.target.value)} placeholder="e.g. April to October"
                    className="w-full mt-1 px-3 py-2 rounded-lg bg-muted border border-border text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={onClose}
                  className="px-5 py-2.5 rounded-lg text-sm font-body font-semibold text-muted-foreground hover:text-foreground transition-colors">
                  Cancel
                </button>
                <motion.button type="submit" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-body font-bold shadow-md hover:shadow-lg transition-shadow flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Save Place
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddPlaceDialog;
