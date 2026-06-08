"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Send, MessageCircle } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { Button } from "@/components/ui/Button";

const contactInfo = {
  phone: "+251 11 551 1234",
  phone2: "+251 911 234 567",
  email: "reservations@grandethiopiahotel.com",
  address: {
    en: "Bole Road, Near Edna Mall, Addis Ababa, Ethiopia",
    am: "ቦሌ መንገድ፣ ኤድና ሞል አጠገብ፣ አዲስ አበባ፣ ኢትዮጵያ",
    fr: "Route de Bole, près d'Edna Mall, Addis-Abeba, Éthiopie",
    ar: "طريق بولي، بالقرب من إدنا مول، أديس أبابا، إثيوبيا",
  },
  social: {
    telegram: "https://t.me/grandethiopiahotel",
    facebook: "https://facebook.com/grandethiopiahotel",
    instagram: "https://instagram.com/grandethiopiahotel",
  },
};

export default function ContactPage() {
  const { locale, t } = useLocale();
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="pt-24 pb-20">
      <div className="bg-navy-900 py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            {t("contactUs")}
          </h1>
          <p className="text-white/60 text-lg">{t("getInTouch")}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-gold-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy-900 mb-1">{t("address")}</h3>
                  <p className="text-gray-600">{contactInfo.address[locale]}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-gold-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy-900 mb-1">{t("phone")}</h3>
                  <a href={`tel:${contactInfo.phone}`} className="text-gray-600 hover:text-gold-600 block">{contactInfo.phone}</a>
                  <a href={`tel:${contactInfo.phone2}`} className="text-gray-600 hover:text-gold-600 block">{contactInfo.phone2}</a>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-gold-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy-900 mb-1">{t("email")}</h3>
                  <a href={`mailto:${contactInfo.email}`} className="text-gray-600 hover:text-gold-600">{contactInfo.email}</a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-display text-xl font-bold text-navy-900 mb-4">{t("followUs")}</h3>
              <div className="flex gap-4">
                {[
                  { name: "Telegram", href: contactInfo.social.telegram, color: "bg-blue-500" },
                  { name: "Facebook", href: contactInfo.social.facebook, color: "bg-blue-700" },
                  { name: "Instagram", href: contactInfo.social.instagram, color: "bg-pink-600" },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${social.color} text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity`}
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            {submitted ? (
              <div className="text-center py-12">
                <MessageCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="font-display text-2xl font-bold text-navy-900 mb-2">Message Sent!</h3>
                <p className="text-gray-600">We&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-5"
              >
                <h3 className="font-display text-2xl font-bold text-navy-900 mb-2">{t("sendMessage")}</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("fullName")}</label>
                  <input type="text" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("email")}</label>
                  <input type="email" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("subject")}</label>
                  <input type="text" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("message")}</label>
                  <textarea rows={5} required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-400 resize-none" />
                </div>
                <Button type="submit" className="w-full">
                  <Send className="w-4 h-4" /> {t("sendMessage")}
                </Button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-16 rounded-2xl overflow-hidden shadow-lg h-96">
          <iframe
            title="Grand Ethiopia Hotel Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.7155099999997!2d38.7578!3d8.9806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwNTgnNTAuMiJOIDM4wrA0NScyOC4xIkU!5e0!3m2!1sen!2set!4v1"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
