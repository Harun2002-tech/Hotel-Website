export type Locale = "en" | "am" | "fr" | "ar";

export type RoomCategory = "standard" | "deluxe" | "suite" | "family";

export interface Room {
  id: string;
  category: RoomCategory;
  name: Record<Locale, string>;
  description: Record<Locale, string>;
  pricePerNight: number;
  maxGuests: number;
  totalUnits: number;
  amenities: string[];
  images: string[];
  size: string;
}

export interface Reservation {
  id: string;
  roomId: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  totalPrice: number;
  paymentMethod: "telebirr" | "cbebirr" | "card";
  paymentStatus: "pending" | "completed" | "failed";
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  country: string;
  rating: number;
  text: Record<Locale, string>;
  source: "google" | "tripadvisor" | "direct";
  avatar: string;
}

export interface SiteContent {
  heroTagline: Record<Locale, string>;
  heroSubtitle: Record<Locale, string>;
  contactPhone: string;
  contactEmail: string;
  contactAddress: Record<Locale, string>;
  socialLinks: {
    telegram: string;
    facebook: string;
    instagram: string;
  };
}

export interface AvailabilityRequest {
  roomId: string;
  checkIn: string;
  checkOut: string;
}

export interface BookingRequest {
  roomId: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  paymentMethod: "telebirr" | "cbebirr" | "card";
}
