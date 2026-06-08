import { Testimonial } from "../types";

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Sarah Mitchell",
    country: "United Kingdom",
    rating: 5,
    text: {
      en: "Absolutely stunning hotel! The staff went above and beyond to make our anniversary special. The rooftop restaurant views are breathtaking.",
      am: "በጣም አስደናቂ ሆቴል! ሰራተኞቹ የራስን ዓመት በዓላችንን ለማስተዋወቅ ከመጠበቅ በላይ ሰሩ። የጣራ ላይ ሬስቶራንት እይታዎች አስደናቂ ናቸው።",
      fr: "Hôtel absolument magnifique ! Le personnel a dépassé nos attentes pour notre anniversaire.",
      ar: "فندق رائع بكل المقاييس! الموظفون بذلوا جهداً كبيراً لجعل ذكرى زواجنا مميزة.",
    },
    source: "google",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
  },
  {
    id: "t2",
    name: "Abebe Kebede",
    country: "Ethiopia",
    rating: 5,
    text: {
      en: "Best hotel experience in Addis! Clean rooms, fast Wi-Fi, and the spa is world-class. Will definitely return for business trips.",
      am: "በአዲስ አበባ ምርጥ የሆቴል ተሞክሮ! ንጹህ ክፍሎች፣ ፈጣን ዋይፋይ እና ስፓ ዓለም አቀፍ ነው።",
      fr: "Meilleure expérience hôtelière à Addis ! Chambres propres et spa de classe mondiale.",
      ar: "أفضل تجربة فندقية في أديس! غرف نظيفة وواي فاي سريع وسبا عالمي المستوى.",
    },
    source: "tripadvisor",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
  },
  {
    id: "t3",
    name: "Marie Dubois",
    country: "France",
    rating: 5,
    text: {
      en: "The conference facilities are excellent. We hosted a 200-person corporate event and everything ran smoothly. Highly recommended!",
      am: "የስብሰባ ቦታዎቹ በጣም ጥሩ ናቸው። 200 ሰዎች የሚያስተናግድ የኩርporate ክስተት አዘጋጀን እና ሁሉም በተሳካ ሁኔታ ተካሄደ።",
      fr: "Les installations de conférence sont excellentes. Événement corporate de 200 personnes parfaitement organisé.",
      ar: "مرافق المؤتمرات ممتازة. استضفنا فعالية شركات لـ 200 شخص وكل شيء سار بسلاسة.",
    },
    source: "google",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
  },
  {
    id: "t4",
    name: "Ahmed Hassan",
    country: "UAE",
    rating: 4,
    text: {
      en: "Beautiful property with authentic Ethiopian hospitality. The traditional coffee ceremony in the lobby was a wonderful touch.",
      am: "እውነተኛ የኢትዮጵያ መተግበርያ ያለው ውብ ንብረት። በሎቢ ውስጥ ያለው ባህላዊ የቡና ሥነ-ሥርዓት አስደናቂ ነበር።",
      fr: "Belle propriété avec une hospitalité éthiopienne authentique. La cérémonie du café était merveilleuse.",
      ar: "ممتلكات جميلة مع ضيافة إثيوبية أصيلة. حفل القهوة التقليدي في الردهة كان لمسة رائعة.",
    },
    source: "tripadvisor",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
  },
];
