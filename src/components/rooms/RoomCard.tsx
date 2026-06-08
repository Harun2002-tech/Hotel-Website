"use client";

import { motion } from "framer-motion";
import { SafeImage } from "@/components/ui/SafeImage";
import Link from "next/link";
import { Wifi, Wind, Tv, Coffee, DoorOpen, Shield } from "lucide-react";
import { Room } from "@/lib/types";
import { useLocale } from "@/context/LocaleContext";
import { amenityLabels } from "@/lib/data/rooms";
import { Button } from "@/components/ui/Button";

const easeOut = [0.22, 1, 0.36, 1] as const;

const amenityIcons: Record<string, React.ReactNode> = {
  wifi: <Wifi className="w-4 h-4" />,
  ac: <Wind className="w-4 h-4" />,
  tv: <Tv className="w-4 h-4" />,
  coffee: <Coffee className="w-4 h-4" />,
  balcony: <DoorOpen className="w-4 h-4" />,
  safe: <Shield className="w-4 h-4" />,
};

interface RoomCardProps {
  room: Room;
  showGallery?: boolean;
}

export function RoomCard({ room, showGallery = false }: RoomCardProps) {
  const { locale, t } = useLocale();

  return (
    <motion.article
      className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: easeOut }}
      whileHover={{ y: -6, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }}
    >
      <div className="relative h-64 overflow-hidden group/image">
        <SafeImage
          src={room.images[0]}
          alt={room.name[locale]}
          fill
          className="object-cover transition-transform duration-500 ease-out will-change-transform group-hover/image:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <motion.div
          className="absolute top-4 right-4 bg-gold-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
          initial={{ x: 20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          {room.size}
        </motion.div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-gold-600 text-xs uppercase tracking-wider font-semibold mb-1">
              {t(room.category)}
            </p>
            <h3 className="font-display text-xl font-bold text-navy-900">{room.name[locale]}</h3>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">{t("from")}</p>
            <p className="text-2xl font-bold text-gold-600">
              {room.pricePerNight.toLocaleString()}
              <span className="text-sm font-normal text-gray-500"> ETB</span>
            </p>
            <p className="text-xs text-gray-400">{t("perNight")}</p>
          </div>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
          {room.description[locale]}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {room.amenities.slice(0, 5).map((amenity) => (
            <motion.span
              key={amenity}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-navy-50 text-navy-700 rounded-full text-xs"
              whileHover={{ scale: 1.05, backgroundColor: "rgb(212, 130, 42, 0.1)" }}
            >
              {amenityIcons[amenity]}
              {amenityLabels[amenity]?.[locale] ?? amenity}
            </motion.span>
          ))}
        </div>

        {showGallery && room.images.length > 1 && (
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            {room.images.map((img, i) => (
              <motion.div
                key={i}
                className="relative w-20 h-16 rounded-lg overflow-hidden shrink-0"
                whileHover={{ scale: 1.1, zIndex: 10 }}
              >
                <SafeImage src={img} alt={`${room.name[locale]} ${i + 1}`} fill className="object-cover" sizes="80px" />
              </motion.div>
            ))}
          </div>
        )}

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link href={`/booking?room=${room.id}`}>
            <Button className="w-full">{t("bookThisRoom")}</Button>
          </Link>
        </motion.div>
      </div>
    </motion.article>
  );
}
