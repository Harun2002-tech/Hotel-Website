"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { locales } from "@/lib/i18n/translations";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { href: "/", key: "home" as const },
  { href: "/rooms", key: "rooms" as const },
  { href: "/amenities", key: "amenities" as const },
  { href: "/contact", key: "contact" as const },
];

export function Header() {
  const { locale, setLocale, t } = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy-950/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-lg">
              <span className="text-navy-950 font-display font-bold text-lg lg:text-xl">GE</span>
            </div>
            <div className="hidden sm:block">
              <p className="font-display text-white text-lg lg:text-xl font-semibold leading-tight">
                Grand Ethiopia
              </p>
              <p className="text-gold-400 text-xs tracking-widest uppercase">Hotel & Spa</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/80 hover:text-gold-400 transition-colors text-sm font-medium tracking-wide"
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 text-white/80 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Select language"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm hidden sm:inline">
                  {locales.find((l) => l.code === locale)?.label}
                </span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                  {locales.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLocale(l.code);
                        setLangOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gold-50 transition-colors ${
                        locale === l.code ? "text-gold-600 font-semibold" : "text-navy-700"
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link href="/booking" className="hidden sm:block">
              <Button size="sm">{t("bookNow")}</Button>
            </Link>

            <button
              className="lg:hidden text-white p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-navy-950/95 backdrop-blur-md border-t border-white/10">
          <nav className="flex flex-col px-4 py-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-white/80 hover:text-gold-400 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors"
              >
                {t(link.key)}
              </Link>
            ))}
            <Link href="/booking" onClick={() => setMobileOpen(false)} className="mt-2">
              <Button className="w-full">{t("bookNow")}</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
