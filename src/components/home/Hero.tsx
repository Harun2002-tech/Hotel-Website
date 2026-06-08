"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const { t } = useLocale();

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1920&q=80"
          className="w-full h-full object-cover animate-fade-in"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-luxurious-hotel-4452-large.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/70 via-navy-950/50 to-navy-950/80" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in">
        <p className="text-gold-400 tracking-[0.3em] uppercase text-sm mb-6 font-medium animate-pop-in" style={{ animationDelay: "0.1s" }}>
          Grand Ethiopia Hotel & Spa
        </p>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold leading-tight mb-6 animate-slide-up" style={{ animationDelay: "0.15s" }}>
          {t("heroTitle")}
        </h1>
        <p className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "0.3s" }}>
          {t("heroSubtitle")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.45s" }}>
          <Link href="/booking">
            <Button size="lg" className="min-w-[200px]">
              {t("bookNow")}
            </Button>
          </Link>
          <Link href="/rooms">
            <Button variant="outline" size="lg" className="min-w-[200px] border-white text-white hover:bg-white/10">
              {t("exploreRooms")}
            </Button>
          </Link>
        </div>
      </div>

      <a
        href="#featured"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-gold-400 transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-8 h-8" />
      </a>
    </section>
  );
}
