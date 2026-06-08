"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useLocale } from "@/context/LocaleContext";
import { Button } from "@/components/ui/Button";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const easeOut = [0.22, 1, 0.36, 1] as const;

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

export function Hero() {
  const { t } = useLocale();

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: easeOut }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1920&q=80"
          className="w-full h-full object-cover"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-luxurious-hotel-4452-large.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/70 via-navy-950/50 to-navy-950/80" />
      </motion.div>

      <motion.div
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p variants={item} className="text-gold-400 tracking-[0.3em] uppercase text-sm mb-6 font-medium">
          Grand Ethiopia Hotel & Spa
        </motion.p>
        <motion.h1
          variants={item}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold leading-tight mb-6"
        >
          {t("heroTitle")}
        </motion.h1>
        <motion.p variants={item} className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto mb-10">
          {t("heroSubtitle")}
        </motion.p>
        <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/booking">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="min-w-[200px]">
                {t("bookNow")}
              </Button>
            </motion.div>
          </Link>
          <Link href="/rooms">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="lg" className="min-w-[200px] border-white text-white hover:bg-white/10">
                {t("exploreRooms")}
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>

      <motion.a
        href="#featured"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-gold-400 transition-colors"
        aria-label="Scroll down"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
        whileHover={{ y: 4 }}
      >
        <ChevronDown className="w-8 h-8" />
      </motion.a>
    </section>
  );
}
