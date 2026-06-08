import { Room } from "../types";

export const rooms: Room[] = [
  {
    id: "standard-01",
    category: "standard",
    name: {
      en: "Standard Room",
      am: "መደበኛ ክፍል",
      fr: "Chambre Standard",
      ar: "غرفة قياسية",
    },
    description: {
      en: "Comfortable and elegant room perfect for business travelers and short stays. Features modern furnishings and city views.",
      am: "ለንግድ ተጓዦች እና አጭር ጊዜ ለሚቆዩ ተስማሚ የሆነ ምቹ እና ውብ ክፍል። ዘመናዊ ዕቃዎች እና የከተማ እይታ ያለው።",
      fr: "Chambre confortable et élégante, parfaite pour les voyageurs d'affaires et les courts séjours.",
      ar: "غرفة مريحة وأنيقة مثالية لرجال الأعمال والإقامات القصيرة.",
    },
    pricePerNight: 3500,
    maxGuests: 2,
    totalUnits: 12,
    amenities: ["wifi", "ac", "tv", "minibar", "safe"],
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
    ],
    size: "28 m²",
  },
  {
    id: "deluxe-01",
    category: "deluxe",
    name: {
      en: "Deluxe Room",
      am: "ዲሉክስ ክፍል",
      fr: "Chambre Deluxe",
      ar: "غرفة ديلوكس",
    },
    description: {
      en: "Spacious deluxe room with premium bedding, marble bathroom, and stunning balcony views of Addis Ababa.",
      am: "በአዲስ አበባ ውብ የባልኮኒ እይታ ያለው ፕሪሚየም አልጋ፣ የማርብ መታጠቢያ ቤት እና ሰፊ ዲሉክስ ክፍል።",
      fr: "Chambre deluxe spacieuse avec literie premium, salle de bain en marbre et vue balcon.",
      ar: "غرفة ديلوكس واسعة مع فراش فاخر وحمام رخامي وإطلالة شرفة رائعة.",
    },
    pricePerNight: 5500,
    maxGuests: 2,
    totalUnits: 8,
    amenities: ["wifi", "ac", "tv", "minibar", "balcony", "safe", "coffee"],
    images: [
      "https://images.unsplash.com/photo-1611892440504-42a784e24d32?w=800&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    ],
    size: "38 m²",
  },
  {
    id: "suite-01",
    category: "suite",
    name: {
      en: "Executive Suite",
      am: "ኤክዚኪዩቲቭ ሱዊት",
      fr: "Suite Exécutive",
      ar: "جناح تنفيذي",
    },
    description: {
      en: "Luxurious suite with separate living area, dining space, and panoramic city views. Ideal for extended stays.",
      am: "የተለየ የመኖሪያ ቦታ፣ የምግብ ቦታ እና የከተማ ሙሉ እይታ ያለው ቅንጦት የተሞላበት ሱዊት።",
      fr: "Suite luxueuse avec salon séparé, espace repas et vue panoramique sur la ville.",
      ar: "جناح فاخر مع منطقة معيشة منفصلة ومساحة طعام وإطلالة بانورامية على المدينة.",
    },
    pricePerNight: 9500,
    maxGuests: 3,
    totalUnits: 4,
    amenities: ["wifi", "ac", "tv", "minibar", "balcony", "safe", "coffee", "bathtub", "workspace"],
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",
    ],
    size: "65 m²",
  },
  {
    id: "family-01",
    category: "family",
    name: {
      en: "Family Room",
      am: "የቤተሰብ ክፍል",
      fr: "Chambre Familiale",
      ar: "غرفة عائلية",
    },
    description: {
      en: "Generous family room with twin beds and sofa bed, connecting bathroom, and kid-friendly amenities.",
      am: "ሁለት አልጋ፣ ሶፋ አልጋ፣ የተገናኘ መታጠቢያ ቤት እና ለልጆች ተስማሚ አገልግሎቶች ያለው ሰፊ የቤተሰብ ክፍል።",
      fr: "Grande chambre familiale avec lits jumeaux, canapé-lit et équipements adaptés aux enfants.",
      ar: "غرفة عائلية واسعة مع سريرين وسرير أريكة وحمام متصل ومرافق مناسبة للأطفال.",
    },
    pricePerNight: 7200,
    maxGuests: 4,
    totalUnits: 6,
    amenities: ["wifi", "ac", "tv", "minibar", "balcony", "safe", "coffee"],
    images: [
      "https://images.unsplash.com/photo-1598928506311-c55ded39a2c?w=800&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80",
    ],
    size: "48 m²",
  },
];

export const amenityLabels: Record<string, Record<string, string>> = {
  wifi: { en: "Free Wi-Fi", am: "ነፃ ዋይፋይ", fr: "Wi-Fi gratuit", ar: "واي فاي مجاني" },
  ac: { en: "Air Conditioning", am: "አየር ማቀዝቀዣ", fr: "Climatisation", ar: "تكييف" },
  tv: { en: "Smart TV", am: "ስማርት ቲቪ", fr: "TV connectée", ar: "تلفاز ذكي" },
  minibar: { en: "Mini-bar", am: "ሚኒ ባር", fr: "Mini-bar", ar: "ميني بار" },
  balcony: { en: "Balcony View", am: "የባልኮኒ እይታ", fr: "Vue balcon", ar: "إطلالة شرفة" },
  safe: { en: "In-room Safe", am: "የክፍል ሴፍ", fr: "Coffre-fort", ar: "خزنة" },
  coffee: { en: "Coffee Maker", am: "ቡና ማሽን", fr: "Machine à café", ar: "صانعة قهوة" },
  bathtub: { en: "Soaking Tub", am: "የመታጠቢያ ገንዳ", fr: "Baignoire", ar: "حوض استحمام" },
  workspace: { en: "Work Desk", am: "የስራ ዴስክ", fr: "Bureau", ar: "مكتب عمل" },
};