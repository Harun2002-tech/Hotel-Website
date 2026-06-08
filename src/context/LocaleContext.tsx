"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Locale } from "@/lib/types";
import { t as translate, locales } from "@/lib/i18n/translations";

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: Parameters<typeof translate>[1]) => string;
  dir: "ltr" | "rtl";
}

const LocaleContext = createContext<LocaleContextType | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    const localeInfo = locales.find((l) => l.code === newLocale);
    document.documentElement.lang = newLocale;
    document.documentElement.dir = localeInfo?.dir ?? "ltr";
  }, []);

  const t = useCallback(
    (key: Parameters<typeof translate>[1]) => translate(locale, key),
    [locale]
  );

  const dir = locales.find((l) => l.code === locale)?.dir ?? "ltr";

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t, dir }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used within LocaleProvider");
  return context;
}
