import Image from "next/image";
import Link from "next/link";
import { Dumbbell, Waves, Utensils, Sparkles } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { RoomCard } from "@/components/rooms/RoomCard";
import { TestimonialsSection } from "@/components/testimonials/TestimonialsSection";
import { getRooms } from "@/lib/store";

const amenityHighlights = [
  {
    icon: Utensils,
    title: { en: "Fine Dining", am: "ጥሩ ምግብ", fr: "Gastronomie", ar: "مطعم فاخر" },
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
  },
  {
    icon: Waves,
    title: { en: "Swimming Pool", am: "የዋና ገንዳ", fr: "Piscine", ar: "حمام سباحة" },
    image: "https://images.unsplash.com/photo-1575429198097-0413ec0e3f8e?w=600&q=80",
  },
  {
    icon: Sparkles,
    title: { en: "Spa & Wellness", am: "ስፓ", fr: "Spa", ar: "سبا" },
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80",
  },
  {
    icon: Dumbbell,
    title: { en: "Fitness Center", am: "ጂም", fr: "Fitness", ar: "صالة رياضية" },
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80",
  },
];

export default function HomePage() {
  const rooms = getRooms().slice(0, 3);

  return (
    <>
      <Hero />

      <section id="featured" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
              Featured Accommodations
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our carefully curated selection of rooms and suites
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room, index) => (
              <div key={room.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <RoomCard room={room} />
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/rooms"
              className="inline-flex items-center gap-2 text-gold-600 hover:text-gold-700 font-semibold text-lg transition-colors"
            >
              View All Rooms →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
              World-Class Amenities
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Everything you need for an unforgettable stay
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {amenityHighlights.map((item, i) => (
              <Link
                key={i}
                href="/amenities"
                className="group relative h-72 rounded-2xl overflow-hidden animate-fade-in"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <Image
                  src={item.image}
                  alt={item.title.en}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <item.icon className="w-8 h-8 text-gold-400 mb-3" />
                  <h3 className="font-display text-xl font-semibold text-white">{item.title.en}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />

      <section className="py-20 bg-gradient-to-r from-gold-500 to-gold-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready for an Unforgettable Stay?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Book directly with us for the best rates and exclusive perks
          </p>
          <Link
            href="/booking"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-gold-600 font-bold rounded-lg hover:bg-gray-50 transition-colors text-lg shadow-lg"
          >
            Book Your Stay Now
          </Link>
        </div>
      </section>
    </>
  );
}
