"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
const content = {
  contactPhone: "+251 11 551 1234",
  contactEmail: "reservations@grandethiopiahotel.com",
  contactAddress: {
    en: "Bole Road, Near Edna Mall, Addis Ababa, Ethiopia",
    am: "ቦሌ መንገድ፣ ኤድና ሞል አጠገብ፣ አዲስ አበባ፣ ኢትዮጵያ",
    fr: "Route de Bole, près d'Edna Mall, Addis-Abeba, Éthiopie",
    ar: "طريق بولي، بالقرب من إدنا مول، أديس أبابا، إثيوبيا",
  },
  socialLinks: {
    telegram: "https://t.me/grandethiopiahotel",
    facebook: "https://facebook.com/grandethiopiahotel",
    instagram: "https://instagram.com/grandethiopiahotel",
  },
};

export function Footer() {
  const { locale, t } = useLocale();

  return (
    <footer className="bg-navy-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
                <span className="text-navy-950 font-display font-bold text-xl">GE</span>
              </div>
              <div>
                <p className="font-display text-xl font-semibold">Grand Ethiopia</p>
                <p className="text-gold-400 text-xs tracking-widest uppercase">Hotel & Spa</p>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">{t("footerDesc")}</p>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold mb-6 text-gold-400">{t("quickLinks")}</h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: t("home") },
                { href: "/rooms", label: t("rooms") },
                { href: "/amenities", label: t("amenities") },
                { href: "/booking", label: t("booking") },
                { href: "/contact", label: t("contact") },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 hover:text-gold-400 transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold mb-6 text-gold-400">{t("contactUs")}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/60">
                <MapPin className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                {content.contactAddress[locale]}
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Phone className="w-5 h-5 text-gold-400 shrink-0" />
                <a href={`tel:${content.contactPhone}`} className="hover:text-gold-400 transition-colors">
                  {content.contactPhone}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Mail className="w-5 h-5 text-gold-400 shrink-0" />
                <a href={`mailto:${content.contactEmail}`} className="hover:text-gold-400 transition-colors">
                  {content.contactEmail}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold mb-6 text-gold-400">{t("newsletter")}</h3>
            <p className="text-white/60 text-sm mb-4">{t("newsletterDesc")}</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={t("email")}
                className="flex-1 px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-gold-400"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-gold-500 hover:bg-gold-600 rounded-lg transition-colors"
                aria-label={t("subscribe")}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="flex gap-4 mt-6">
              {[
                { name: "Telegram", href: content.socialLinks.telegram, icon: "TG" },
                { name: "Facebook", href: content.socialLinks.facebook, icon: "FB" },
                { name: "Instagram", href: content.socialLinks.instagram, icon: "IG" },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-gold-500 flex items-center justify-center text-xs font-bold transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/40 text-sm">
          © {new Date().getFullYear()} Grand Ethiopia Hotel. {t("copyright")}
        </div>
      </div>
    </footer>
  );
}
