import type { Destination } from "@/types/destination";

export const defaultDestinations: Destination[] = [
  {
    id: "1",
    name: "Santorini",
    country: "Greece",
    description: "The iconic sunsets and views over the Aegean Sea with whitewashed buildings.",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2000&auto=format&fit=crop",
    status: "dream",
    coordinates: { lat: 36.3932, lng: 25.4615 },
    bestTime: "April to October",
    weather: { temp: 24, condition: "Sunny", icon: "☀️" },
    checklist: [
      { id: "1", task: "Book sunset cruise in Oia", completed: true, priority: "high" },
      { id: "2", task: "Pack blue & white linen clothes", completed: false, priority: "medium" },
      { id: "3", task: "Rent a scooter for island hopping", completed: false, priority: "low" }
    ],
    rating: 4.9,
    tags: ["Romantic", "Islands", "Sunset", "Luxury"]
  },
  {
    id: "2",
    name: "Ladakh",
    country: "India",
    description: "High-altitude desert adventure in the heart of the Himalayas.",
    image: "https://images.unsplash.com/photo-1581791534721-e599df4417f7?q=80&w=2000&auto=format&fit=crop",
    status: "planned",
    coordinates: { lat: 34.1526, lng: 77.5771 },
    bestTime: "June to September",
    weather: { temp: 12, condition: "Clear Sky", icon: "🏔️" },
    checklist: [
      { id: "1", task: "Obtain Inner Line Permit", completed: false, priority: "high" },
      { id: "2", task: "Acclimatize in Leh for 2 days", completed: true, priority: "high" },
      { id: "3", task: "Pack heavy woolens", completed: true, priority: "medium" }
    ],
    rating: 4.8,
    tags: ["Adventure", "Himalayas", "Road Trip", "Spirituality"]
  },
  {
    id: "3",
    name: "Kyoto",
    country: "Japan",
    description: "Serene temples, traditional tea houses, and the magic of cherry blossoms.",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2000&auto=format&fit=crop",
    status: "wishlist",
    coordinates: { lat: 35.0116, lng: 135.7681 },
    bestTime: "March to May",
    weather: { temp: 18, condition: "Cherry Blossoms", icon: "🌸" },
    checklist: [
      { id: "1", task: "Buy Japan Rail Pass", completed: false, priority: "high" },
      { id: "2", task: "Book a ryokan stay", completed: false, priority: "medium" }
    ],
    rating: 4.9,
    tags: ["Culture", "Zen", "Nature", "Heritage"]
  },
  {
    id: "4",
    name: "Goa",
    country: "India",
    description: "Tropical beaches, vibrant nightlife, and a unique blend of cultures.",
    image: "/assets/goa.jpg",
    status: "visited",
    coordinates: { lat: 15.2993, lng: 74.1240 },
    visitedDate: new Date("2023-12-15"),
    duration: 7,
    weather: { temp: 30, condition: "Tropical Humid", icon: "🏖️" },
    rating: 4.5,
    tags: ["Party", "Beaches", "Relaxation", "Food"],
    budget: {
      accommodation: 300,
      food: 200,
      activities: 150,
      transportation: 100,
      total: 750
    }
  },
  {
    id: "5",
    name: "Paris",
    country: "France",
    description: "The city of lights, world-class art, and the most romantic atmosphere.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2000&auto=format&fit=crop",
    status: "wishlist",
    coordinates: { lat: 48.8566, lng: 2.3522 },
    weather: { temp: 15, condition: "Mist", icon: "🗼" },
    rating: 4.7,
    tags: ["City", "Fashion", "Art", "Romantic"]
  },
  {
    id: "6",
    name: "New Zealand",
    country: "New Zealand",
    description: "Breathtaking landscapes, fjords, and the ultimate outdoor adventures.",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
    status: "planned",
    coordinates: { lat: -40.9006, lng: 174.8860 },
    weather: { temp: 20, condition: "Breezy", icon: "🥝" },
    rating: 4.9,
    tags: ["Nature", "Hiking", "Adventure", "Landscape"]
  },
  {
    id: "7",
    name: "Bali",
    country: "Indonesia",
    description: "Lush jungles, spiritual retreats, and world-class surfing beaches.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2000&auto=format&fit=crop",
    status: "dream",
    coordinates: { lat: -8.4095, lng: 115.1889 },
    bestTime: "April to October",
    weather: { temp: 28, condition: "Tropical Sun", icon: "🌴" },
    rating: 4.8,
    tags: ["Spiritual", "Beaches", "Surfing", "Retreat"]
  },
  {
    id: "8",
    name: "Swiss Alps",
    country: "Switzerland",
    description: "Pristine snow-capped peaks and luxury ski resorts in the heart of Europe.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2000&auto=format&fit=crop",
    status: "dream",
    coordinates: { lat: 46.8182, lng: 8.2275 },
    bestTime: "December to March",
    weather: { temp: -5, condition: "Snowy", icon: "❄️" },
    checklist: [
      { id: "1", task: "Book ski passes", completed: false, priority: "high" },
      { id: "2", task: "Pack thermal gear", completed: true, priority: "medium" }
    ],
    rating: 5.0,
    tags: ["Luxury", "Skiing", "Mountains", "Europe"]
  },
  {
    id: "9",
    name: "Cappadocia",
    country: "Turkey",
    description: "Otherworldly landscapes and iconic hot air balloon rides at sunrise.",
    image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=2000&auto=format&fit=crop",
    status: "wishlist",
    coordinates: { lat: 38.6431, lng: 34.8283 },
    bestTime: "April to June",
    weather: { temp: 22, condition: "Clear Sky", icon: "🎈" },
    rating: 4.9,
    tags: ["Adventure", "Unique", "Sunrise", "Hot Air Balloon"]
  },
  {
    id: "10",
    name: "Amalfi Coast",
    country: "Italy",
    description: "Colorful coastal villages perched on dramatic cliffs overlooking the sea.",
    image: "https://images.unsplash.com/photo-1533903345306-15d1c30952de?q=80&w=2000&auto=format&fit=crop",
    status: "dream",
    coordinates: { lat: 40.6340, lng: 14.6027 },
    bestTime: "May to September",
    weather: { temp: 26, condition: "Sunny", icon: "🍋" },
    rating: 4.9,
    tags: ["Coastline", "Food", "Italy", "Summer"]
  }
];