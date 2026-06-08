"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { RoomCard } from "@/components/rooms/RoomCard";
import { useLocale } from "@/context/LocaleContext";
import { rooms as staticRooms } from "@/lib/data/rooms";
import { RoomCategory } from "@/lib/types";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/MotionDiv";

const categories: (RoomCategory | "all")[] = ["all", "standard", "deluxe", "suite", "family"];

export default function RoomsPage() {
  const { t } = useLocale();
  const [activeCategory, setActiveCategory] = useState<RoomCategory | "all">("all");

  const filteredRooms =
    activeCategory === "all"
      ? staticRooms
      : staticRooms.filter((r) => r.category === activeCategory);

  return (
    <div className="pt-24 pb-20">
      <FadeIn>
        <div className="bg-navy-900 py-16 mb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
              {t("rooms")}
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              {t("featuredRoomsDesc")}
            </p>
          </div>
        </div>
      </FadeIn>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold ${
                activeCategory === cat
                  ? "bg-gold-500 text-white shadow-lg"
                  : "bg-gray-100 text-gray-600"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat === "all" ? t("allRooms") : t(cat)}
            </motion.button>
          ))}
        </div>

        <StaggerContainer>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {filteredRooms.map((room) => (
              <StaggerItem key={room.id}>
                <RoomCard room={room} showGallery />
              </StaggerItem>
            ))}
          </motion.div>
        </StaggerContainer>
      </div>
    </div>
  );
}
