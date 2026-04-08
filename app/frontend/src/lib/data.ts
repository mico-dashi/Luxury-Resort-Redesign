// CDN Image URLs
export const IMAGES = {
  hero: "https://mgx-backend-cdn.metadl.com/generate/images/1097553/2026-04-07/5f4aa13a-1508-414f-9324-24d08e8b5c80.png",
  roomDeluxe: "https://mgx-backend-cdn.metadl.com/generate/images/1097553/2026-04-07/6f01ee27-7419-42d8-814b-d32de8fa6c09.png",
  spa: "https://mgx-backend-cdn.metadl.com/generate/images/1097553/2026-04-07/ea35324d-d35c-407e-b3fb-98bf465b2e85.png",
  dining: "https://mgx-backend-cdn.metadl.com/generate/images/1097553/2026-04-07/fdbf2be1-2a03-471a-b66c-a7c1f2fcd0cb.png",
  roomPremium: "https://mgx-backend-cdn.metadl.com/generate/images/1097553/2026-04-07/0d2ce40e-8132-4535-806d-a942430273d2.png",
  roomRoyal: "https://mgx-backend-cdn.metadl.com/generate/images/1097553/2026-04-07/12e8dfe6-cc19-4dcc-8f12-454055156138.png",
  pool: "https://mgx-backend-cdn.metadl.com/generate/images/1097553/2026-04-07/11fb4ecf-79e5-4d9c-b84a-2dcf88db396b.png",
  lobby: "https://mgx-backend-cdn.metadl.com/generate/images/1097553/2026-04-07/b73bc11c-4692-41b0-b752-633c04e8a1d1.png",
};

export interface Room {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price_per_night: number;
  max_guests: number;
  size_sqm: number;
  image_url: string;
  category: string;
  amenities: string;
  rating: number;
  is_featured: boolean;
}

export interface Booking {
  id?: number;
  user_id?: string;
  room_id: number;
  room_name: string;
  check_in: string;
  check_out: string;
  guests: number;
  total_price: number;
  status: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  special_requests?: string;
  created_at?: string;
}

export const SERVICES = [
  {
    title: "Luxury Spa & Wellness",
    description: "Indulge in world-class spa treatments, from hot stone massages to aromatherapy sessions, designed to rejuvenate body and soul.",
    image: IMAGES.spa,
    icon: "Sparkles",
  },
  {
    title: "Fine Dining",
    description: "Savor exquisite cuisine crafted by award-winning chefs using locally sourced ingredients in our elegant restaurants.",
    image: IMAGES.dining,
    icon: "UtensilsCrossed",
  },
  {
    title: "Infinity Pool",
    description: "Relax by our stunning infinity pool with panoramic mountain views, complete with poolside bar and sun loungers.",
    image: IMAGES.pool,
    icon: "Waves",
  },
];

export const TESTIMONIALS = [
  {
    name: "Elena Petrova",
    role: "Travel Blogger",
    text: "Zdrava Resort exceeded every expectation. The mountain views from our suite were breathtaking, and the spa treatments were truly transformative. A hidden gem!",
    rating: 5,
  },
  {
    name: "Marcus Chen",
    role: "Business Executive",
    text: "The perfect blend of luxury and tranquility. The staff's attention to detail is remarkable, and the dining experience rivals the finest restaurants in Europe.",
    rating: 5,
  },
  {
    name: "Sofia Andersson",
    role: "Wellness Coach",
    text: "I've visited spas worldwide, and Zdrava's wellness program is exceptional. The combination of natural surroundings and premium facilities creates a truly healing experience.",
    rating: 5,
  },
];

export const STATS = [
  { value: "15+", label: "Years of Excellence" },
  { value: "98%", label: "Guest Satisfaction" },
  { value: "50+", label: "Luxury Rooms" },
  { value: "4.9", label: "Average Rating" },
];

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Rooms", href: "/rooms" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];