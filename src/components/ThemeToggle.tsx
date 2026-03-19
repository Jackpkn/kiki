"use client";

import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemeToggle({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      onClick={onToggle}
      className="w-10 h-10 rounded-2xl glass-light dark:glass-dark flex items-center justify-center shadow-lg border border-border/60 hover:border-primary/40 transition-colors"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.35 }}
      >
        {isDark
          ? <Moon className="w-4 h-4 text-amber-300" />
          : <Sun className="w-4 h-4 text-primary" />
        }
      </motion.div>
    </motion.button>
  );
}
