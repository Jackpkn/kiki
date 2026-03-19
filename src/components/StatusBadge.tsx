import type { DestinationStatus } from "@/types/destination";

const cfg: Record<DestinationStatus, { label: string; emoji: string; cls: string }> = {
  dream:    { label: "Dream",    emoji: "🌙", cls: "bg-violet-500/25 text-violet-100 border-violet-400/20" },
  wishlist: { label: "Wishlist", emoji: "💫", cls: "bg-rose-500/25 text-rose-100 border-rose-400/20" },
  planned:  { label: "Planned",  emoji: "✈️", cls: "bg-emerald-500/25 text-emerald-100 border-emerald-400/20" },
  visited:  { label: "Visited",  emoji: "✅", cls: "bg-sky-500/25 text-sky-100 border-sky-400/20" },
};

export default function StatusBadge({ status }: { status: DestinationStatus }) {
  const { label, emoji, cls } = cfg[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm border ${cls}`}>
      <span className="text-sm leading-none">{emoji}</span>
      {label}
    </span>
  );
}
