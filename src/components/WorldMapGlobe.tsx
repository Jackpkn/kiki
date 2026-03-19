"use client";

interface TravelPoint {
  id: string;
  lat: number;
  lng: number;
  name: string;
  country: string;
  visited: boolean;
}

interface WorldMapGlobeProps {
  travelPoints: TravelPoint[];
  onPointClick?: (point: TravelPoint) => void;
}

export default function WorldMapGlobe({ travelPoints }: WorldMapGlobeProps) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-stone-950 rounded-2xl">
      <div className="text-center text-white/30 text-sm font-body">
        <div className="text-4xl mb-2">🌍</div>
        <p>{travelPoints.length} destinations mapped</p>
      </div>
    </div>
  );
}
