import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { LocaleProvider } from "@/context/LocaleContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: {
    default: "Grand Ethiopia Hotel & Spa | Luxury Hotel in Addis Ababa",
    template: "%s | Grand Ethiopia Hotel",
  },
  description:
    "Experience world-class luxury at Grand Ethiopia Hotel in Addis Ababa. Premium rooms, spa, fine dining, and conference facilities. Book your stay today.",
  keywords: [
    "hotel Addis Ababa",
    "luxury hotel Ethiopia",
    "hotel booking",
    "Grand Ethiopia Hotel",
    "spa Addis Ababa",
  ],
  openGraph: {
    title: "Grand Ethiopia Hotel & Spa",
    description: "Luxury accommodation in the heart of Addis Ababa",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
