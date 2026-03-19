"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { DestinationStatus, Destination } from "@/types/destination";
import { Search, X, SlidersHorizontal } from "lucide-react";

export type FilterType = "all" | DestinationStatus;

interface FilterBarProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  destinations?: Destination[];
}

const FILTERS: Array<{ value: FilterType; label: string; emoji: string }> = [
  { value: "all",      label: "All",      emoji: "🌍" },
  { value: "visited",  label: "Visited",  emoji: "✅" },
  { value: "planned",  label: "Planned",  emoji: "✈️" },
  { value: "wishlist", label: "Wishlist", emoji: "💫" },
  { value: "dream",    label: "Dreams",   emoji: "🌙" },
];

export default function FilterBar({
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  destinations = [],
}: FilterBarProps) {
  const [focused, setFocused] = useState(false);

  const getCount = (value: FilterType): number => {
    if (value === "all") return destinations.length;
    return destinations.filter((d) => d.status === value).length;
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">

      {/* Search input */}
      <div className="relative flex-1 max-w-sm">
        <Search
          className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${
            focused ? "text-primary" : "text-muted-foreground"
          }`}
        />
        <input
          type="text"
          placeholder="Search destinations..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full pl-11 pr-10 py-3 rounded-2xl bg-card border border-border/70 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
        />
        <AnimatePresence>
          {searchQuery && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-colors"
            >
              <X className="w-3.5 h-3.5 text-muted-foreground" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Filter pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        <SlidersHorizontal className="w-4 h-4 text-muted-foreground/40 flex-shrink-0 mr-1" />
        {FILTERS.map((filter) => {
          const isActive = activeFilter === filter.value;
          const count    = getCount(filter.value);
          return (
            <button
              key={filter.value}
              onClick={() => onFilterChange(filter.value)}
              className={`relative flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeFilterPill"
                  className="absolute inset-0 bg-primary rounded-xl -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              <span className="text-base leading-none">{filter.emoji}</span>
              {filter.label}
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center leading-none ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
