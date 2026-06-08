"use client";

import Image from "next/image";
import { useState } from "react";
import { Clock, Users, Dumbbell, Waves, Sparkles, UtensilsCrossed } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";

const menuItems = {
  appetizers: [
    { name: "Sambusa", price: 180, desc: "Crispy pastry filled with spiced lentils" },
    { name: "Tibs Starter", price: 350, desc: "Sautéed beef with rosemary and peppers" },
    { name: "Avocado Salad", price: 280, desc: "Fresh avocado with lime dressing" },
  ],
  mains: [
    { name: "Doro Wat", price: 650, desc: "Traditional Ethiopian chicken stew with injera" },
    { name: "Kitfo", price: 750, desc: "Ethiopian steak tartare with spiced butter" },
    { name: "Grilled Salmon", price: 890, desc: "Atlantic salmon with seasonal vegetables" },
    { name: "Lamb Tibs", price: 720, desc: "Tender lamb cubes with awaze sauce" },
  ],
  desserts: [
    { name: "Baklava", price: 220, desc: "Honey-soaked phyllo pastry" },
    { name: "Chocolate Mousse", price: 250, desc: "Rich Belgian chocolate mousse" },
  ],
  beverages: [
    { name: "Ethiopian Coffee Ceremony", price: 150, desc: "Traditional three-round ceremony" },
    { name: "Fresh Juice", price: 120, desc: "Mango, avocado, or mixed tropical" },
    { name: "House Wine", price: 280, desc: "Glass of selected Ethiopian wine" },
  ],
};

const events = [
  { name: "Grand Ballroom", capacity: 500, image: "https://images.unsplash.com/photo-1519167758481-83f29da8c2f2?w=800&q=80" },
  { name: "Executive Meeting Rooms", capacity: 30, image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80" },
  { name: "Conference Center", capacity: 200, image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80" },
];

export default function AmenitiesPage() {
  const { t } = useLocale();
  const [activeMenu, setActiveMenu] = useState<keyof typeof menuItems>("mains");

  return (
    <div className="pt-24 pb-20">
      <div className="bg-navy-900 py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            {t("amenities")}
          </h1>
          <p className="text-white/60 text-lg">{t("ourAmenitiesDesc")}</p>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-96 rounded-2xl overflow-hidden animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <Image
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
              alt="Restaurant"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <UtensilsCrossed className="w-8 h-8 text-gold-500" />
              <h2 className="font-display text-3xl font-bold text-navy-900">{t("restaurant")}</h2>
            </div>
            <p className="text-gray-600 mb-6">{t("restaurantDesc")}</p>
            <div className="bg-navy-50 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-navy-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-gold-500" /> {t("openingHours")}
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-gray-500">{t("breakfast")}</span><p className="font-medium">6:30 AM - 10:30 AM</p></div>
                <div><span className="text-gray-500">{t("lunch")}</span><p className="font-medium">12:00 PM - 3:00 PM</p></div>
                <div><span className="text-gray-500">{t("dinner")}</span><p className="font-medium">6:30 PM - 10:30 PM</p></div>
                <div><span className="text-gray-500">{t("bar")}</span><p className="font-medium">5:00 PM - 12:00 AM</p></div>
              </div>
            </div>

            <h3 className="font-display text-xl font-bold text-navy-900 mb-4">{t("menu")}</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {(Object.keys(menuItems) as Array<keyof typeof menuItems>).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveMenu(key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeMenu === key ? "bg-gold-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {t(key)}
                </button>
              ))}
            </div>
            <div className="space-y-4">
              {menuItems[activeMenu].map((item, i) => (
                <div key={i} className="flex justify-between items-start border-b border-gray-100 pb-4">
                  <div>
                    <h4 className="font-semibold text-navy-900">{item.name}</h4>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                  <span className="font-bold text-gold-600 whitespace-nowrap ml-4">{item.price} ETB</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-navy-50 py-20 mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-navy-900 text-center mb-12">{t("leisure")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Dumbbell, title: t("gym"), hours: "5:00 AM - 11:00 PM", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80" },
              { icon: Waves, title: t("pool"), hours: "6:00 AM - 9:00 PM", image: "https://images.unsplash.com/photo-1575429198097-0413ec0e3f8e?w=600&q=80" },
              { icon: Sparkles, title: t("spa"), hours: "9:00 AM - 9:00 PM", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80" },
            ].map((facility, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg animate-fade-in" style={{ animationDelay: `${i * 120}ms` }}>
                <div className="relative h-48">
                  <Image src={facility.image} alt={facility.title} fill className="object-cover" sizes="33vw" />
                </div>
                <div className="p-6">
                  <facility.icon className="w-8 h-8 text-gold-500 mb-3" />
                  <h3 className="font-display text-xl font-bold text-navy-900 mb-2">{facility.title}</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <Clock className="w-4 h-4" /> {facility.hours}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold text-navy-900 mb-4">{t("events")}</h2>
          <p className="text-gray-600">{t("eventsDesc")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event, i) => (
            <div key={i} className="group rounded-2xl overflow-hidden shadow-lg animate-slide-up" style={{ animationDelay: `${i * 120}ms` }}>
              <div className="relative h-56">
                <Image src={event.image} alt={event.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display text-xl font-bold text-white mb-2">{event.name}</h3>
                  <p className="text-gold-400 flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4" /> {t("capacity")}: {event.capacity} {t("guests")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
