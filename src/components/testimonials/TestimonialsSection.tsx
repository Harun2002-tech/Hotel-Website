"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, ExternalLink } from "lucide-react";
import { testimonials } from "@/lib/data/testimonials";
import { useLocale } from "@/context/LocaleContext";
import { SlideUp, StaggerContainer, StaggerItem } from "@/components/ui/MotionDiv";

export function TestimonialsSection() {
  const { locale, t } = useLocale();

  return (
    <section className="py-20 bg-navy-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SlideUp>
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
              {t("testimonials")}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t("testimonialsDesc")}</p>
            <div className="flex items-center justify-center gap-6 mt-6">
              <motion.div
                className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              >
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-navy-900">4.9</span>
                <span className="text-sm text-gray-500">({t("reviews")})</span>
              </motion.div>
            </div>
          </div>
        </SlideUp>

        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <StaggerItem key={testimonial.id}>
                <motion.div
                  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
                  whileHover={{ y: -4, boxShadow: "0 20px 40px -12px rgba(0,0,0,0.15)" }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div
                      className="relative w-14 h-14 rounded-full overflow-hidden"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Image src={testimonial.avatar} alt={testimonial.name} fill className="object-cover" sizes="56px" />
                    </motion.div>
                    <div>
                      <h4 className="font-semibold text-navy-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.country}</p>
                    </div>
                    <div className="ml-auto flex gap-0.5">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 * i, type: "spring" }}
                        >
                          <Star className="w-4 h-4 fill-gold-400 text-gold-400" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4">&ldquo;{testimonial.text[locale]}&rdquo;</p>
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${
                        testimonial.source === "google"
                          ? "bg-blue-50 text-blue-600"
                          : "bg-green-50 text-green-600"
                      }`}
                    >
                      {testimonial.source === "google" ? "Google Reviews" : "TripAdvisor"}
                    </span>
                    <a
                      href={
                        testimonial.source === "google"
                          ? "https://www.google.com/maps"
                          : "https://www.tripadvisor.com"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gold-600 hover:text-gold-700 flex items-center gap-1"
                    >
                      {testimonial.source === "google" ? t("viewOnGoogle") : t("viewOnTripAdvisor")}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}
