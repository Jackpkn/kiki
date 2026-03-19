'use client';

import { useState, useCallback } from 'react';
import Map, { Marker, Popup, Source, Layer } from 'react-map-gl';
import { motion, AnimatePresence } from 'framer-motion';
import { Pin, Heart, MapPin, Navigation } from 'lucide-react';

interface TravelPoint {
  id: string;
  lat: number;
  lng: number;
  name: string;
  country: string;
  visited: boolean;
  date?: string;
  emotion?: string;
  image?: string;
  description?: string;
}

interface InteractiveMapProps {
  travelPoints: TravelPoint[];
  onPointClick?: (point: TravelPoint) => void;
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

// Fallback style using OpenStreetMap tiles (CartoDB Dark Matter)
const fallbackMapStyle = {
  version: 8,
  sources: {
    'carto-dark': {
      type: 'raster',
      tiles: [
        'https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
        'https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
        'https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
        'https://d.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png'
      ],
      tileSize: 256,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    }
  },
  layers: [
    {
      id: 'carto-dark-layer',
      type: 'raster',
      source: 'carto-dark',
      minzoom: 0,
      maxzoom: 22
    }
  ]
};

export default function InteractiveMap({ travelPoints, onPointClick }: InteractiveMapProps) {
  const [viewState, setViewState] = useState({
    longitude: 0,
    latitude: 30,
    zoom: 2
  });
  
  const [selectedPoint, setSelectedPoint] = useState<TravelPoint | null>(null);
  const [showTravelPaths, setShowTravelPaths] = useState(true);

  const handlePointClick = useCallback((point: TravelPoint) => {
    setSelectedPoint(point);
    onPointClick?.(point);
    
    // Center map on selected point
    setViewState({
      longitude: point.lng,
      latitude: point.lat,
      zoom: 6
    });
  }, [onPointClick]);

  const visitedPoints = travelPoints.filter(p => p.visited);
  const dreamPoints = travelPoints.filter(p => !p.visited);

  // Create GeoJSON for travel paths
  const travelPaths = {
    type: 'FeatureCollection' as const,
    features: visitedPoints.slice(0, -1).map((point, index) => ({
      type: 'Feature' as const,
      geometry: {
        type: 'LineString' as const,
        coordinates: [
          [point.lng, point.lat],
          [visitedPoints[index + 1].lng, visitedPoints[index + 1].lat]
        ]
      },
      properties: {}
    }))
  };

  return (
    <div className="w-full h-screen relative">
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        style={{ width: '100%', height: '100%' }}
        mapStyle={MAPBOX_TOKEN ? "mapbox://styles/mapbox/dark-v11" : (fallbackMapStyle as unknown as string)}
        mapboxAccessToken={MAPBOX_TOKEN || undefined}
        attributionControl={false}
      >
        {/* Travel Paths */}
        {showTravelPaths && visitedPoints.length > 1 && (
          <Source id="travel-paths" type="geojson" data={travelPaths}>
            <Layer
              id="travel-paths-line"
              type="line"
              paint={{
                'line-color': '#ec4899', // pink-500
                'line-width': 3,
                'line-opacity': 0.6,
                'line-dasharray': [2, 2]
              }}
            />
          </Source>
        )}

        {/* Visited Destinations */}
        {visitedPoints.map((point) => (
          <Marker
            key={point.id}
            longitude={point.lng}
            latitude={point.lat}
            anchor="bottom"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: Math.random() * 0.5 }}
              className="relative cursor-pointer"
              onClick={() => handlePointClick(point)}
            >
              <div className="relative">
                <Pin
                  size={32}
                  className="text-pink-500 fill-pink-500/20"
                  style={{ filter: 'drop-shadow(0 0 8px #ec4899)' }}
                />
                <Heart
                  size={12}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white"
                  fill="currentColor"
                />
              </div>
              
              {/* Pulsing animation */}
              <motion.div
                className="absolute inset-0 bg-pink-500 rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ filter: 'blur(8px)' }}
              />
            </motion.div>
          </Marker>
        ))}

        {/* Dream Destinations */}
        {dreamPoints.map((point) => (
          <Marker
            key={point.id}
            longitude={point.lng}
            latitude={point.lat}
            anchor="bottom"
          >
            <motion.div
              initial={{ scale: 0, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ delay: Math.random() * 0.5 + 0.3 }}
              className="relative cursor-pointer"
              onClick={() => handlePointClick(point)}
            >
              <MapPin
                size={28}
                className="text-amber-400 fill-amber-400/20"
                style={{ filter: 'drop-shadow(0 0 6px #fbbf24)' }}
              />
              
              {/* Subtle glow */}
              <motion.div
                className="absolute inset-0 bg-amber-400 rounded-full"
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ filter: 'blur(6px)' }}
              />
            </motion.div>
          </Marker>
        ))}

        {/* Popup for selected point */}
        {selectedPoint && (
          <Popup
            longitude={selectedPoint.lng}
            latitude={selectedPoint.lat}
            onClose={() => setSelectedPoint(null)}
            closeButton={false}
            anchor="top"
            className="custom-popup"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/95 backdrop-blur-sm rounded-lg p-4 min-w-[200px]"
            >
              <h3 className="font-semibold text-gray-900 mb-1">
                {selectedPoint.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {selectedPoint.country}
              </p>
              
              {selectedPoint.date && (
                <p className="text-xs text-gray-500 mb-2">
                  {selectedPoint.visited ? 'Visited: ' : 'Dreaming of: '}
                  {selectedPoint.date}
                </p>
              )}
              
              {selectedPoint.emotion && (
                <p className="text-xs text-blue-600 font-medium">
                  {selectedPoint.emotion}
                </p>
              )}
              
              <button
                onClick={() => onPointClick?.(selectedPoint)}
                className="mt-2 w-full bg-pink-500 hover:bg-pink-600 text-white text-xs py-1.5 px-2 rounded-md transition-colors font-bold"
              >
                View Memories
              </button>
            </motion.div>
          </Popup>
        )}
      </Map>

      {/* Map Controls */}
      <div className="absolute top-24 right-4 z-10 flex flex-col gap-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowTravelPaths(!showTravelPaths)}
          className="bg-white dark:bg-zinc-800 rounded-full p-2 shadow-xl border border-border"
          title={showTravelPaths ? 'Hide Travel Paths' : 'Show Travel Paths'}
        >
          <Navigation size={20} className="text-zinc-700 dark:text-zinc-300" />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setViewState({ longitude: 0, latitude: 30, zoom: 2 })}
          className="bg-white dark:bg-zinc-800 rounded-full p-2 shadow-xl border border-border"
          title="Reset View"
        >
          <Globe size={20} className="text-zinc-700 dark:text-zinc-300" />
        </motion.button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-10 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
        <div className="flex items-center mb-2">
          <div className="w-4 h-4 bg-pink-500 rounded-full mr-2 relative">
            <Heart size={8} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white" />
          </div>
          <span className="text-sm font-medium">Visited Together</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-amber-400 rounded-full mr-2"></div>
          <span className="text-sm font-medium">Dream Destinations</span>
        </div>
      </div>

      <style jsx global>{`
        .custom-popup .mapboxgl-popup-content {
          background: transparent;
          padding: 0;
          border-radius: 12px;
        }
        
        .custom-popup .mapboxgl-popup-tip {
          border-top-color: rgba(255, 255, 255, 0.9) !important;
        }
      `}</style>
    </div>
  );
}

// Helper component for Globe icon
function Globe({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}