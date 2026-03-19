export type DestinationStatus = "dream" | "wishlist" | "planned" | "visited";
export type TravelMood = "romantic" | "adventurous" | "relaxing" | "cultural" | "spiritual" | "culinary";
export type MomentCategory = "first" | "milestone" | "challenge" | "romantic" | "adventure" | "reflection";

export interface GeoPoint {
  lat: number;
  lng: number;
  name?: string;
}

export interface ChecklistItem {
  id: string;
  task: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
}

export interface TravelPhoto {
  id: string;
  url: string;
  caption: string;
  location: GeoPoint;
  date: Date;
  emotions: string[];
  people: string[];
  isFavorite: boolean;
}

export interface CoupleMoment {
  id: string;
  title: string;
  description: string;
  location: GeoPoint;
  date: Date;
  emotionalImpact: number;
  photos: string[];
  category: MomentCategory;
  weather?: string;
  song?: {
    title: string;
    artist: string;
    url?: string;
  };
}

export interface TravelChapter {
  id: string;
  title: string;
  destinations: Destination[];
  startDate: Date;
  endDate: Date;
  mood: TravelMood;
  photos: TravelPhoto[];
  videos: string[];
  notes: string[];
  songs: {
    title: string;
    artist: string;
    url?: string;
  }[];
  weatherMemories: string[];
  emotionalHighlights: string[];
  coupleMoments: CoupleMoment[];
  coverImage: string;
  colorTheme: string;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  image: string;
  status: DestinationStatus;
  coordinates: GeoPoint;
  bestTime?: string;
  notes?: string;
  weather?: {
    temp: number;
    condition: string;
    icon: string;
  };
  checklist?: ChecklistItem[];
  rating?: number;
  tags?: string[];
  visitedDate?: Date;
  duration?: number;
  budget?: {
    accommodation: number;
    food: number;
    activities: number;
    transportation: number;
    total: number;
  };
  memories?: {
    photos: TravelPhoto[];
    notes: string[];
    moments: CoupleMoment[];
  };
}
