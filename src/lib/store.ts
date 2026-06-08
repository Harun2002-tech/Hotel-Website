import fs from "fs";
import path from "path";
import { Reservation, Room, SiteContent } from "./types";
import { rooms as defaultRooms } from "./data/rooms";

const DATA_DIR = path.join(process.cwd(), "data");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readJson<T>(filename: string, fallback: T): T {
  ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(fallback, null, 2));
    return fallback;
  }
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
}

function writeJson<T>(filename: string, data: T): void {
  ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

const defaultContent: SiteContent = {
  heroTagline: {
    en: "Experience Luxury in the Heart of Addis Ababa",
    am: "በአዲስ አበባ ልብ ውስጥ ቅንጦትን ይለማመዱ",
    fr: "Vivez le luxe au cœur d'Addis-Abeba",
    ar: "اختبر الفخامة في قلب أديس أبابا",
  },
  heroSubtitle: {
    en: "Where Ethiopian hospitality meets world-class comfort",
    am: "የኢትዮጵያ መተግበርያ ከዓለም አቀፍ ምቾት ጋር የሚገናኝ",
    fr: "L'hospitalité éthiopienne rencontre le confort mondial",
    ar: "حيث تلتقي الضيافة الإثيوبية بالراحة العالمية",
  },
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

export function getRooms(): Room[] {
  return readJson<Room[]>("rooms.json", defaultRooms);
}

export function saveRooms(rooms: Room[]): void {
  writeJson("rooms.json", rooms);
}

export function getReservations(): Reservation[] {
  return readJson<Reservation[]>("reservations.json", []);
}

export function saveReservations(reservations: Reservation[]): void {
  writeJson("reservations.json", reservations);
}

export function addReservation(reservation: Reservation): void {
  const reservations = getReservations();
  reservations.push(reservation);
  saveReservations(reservations);
}

export function updateReservation(id: string, updates: Partial<Reservation>): Reservation | null {
  const reservations = getReservations();
  const index = reservations.findIndex((r) => r.id === id);
  if (index === -1) return null;
  reservations[index] = { ...reservations[index], ...updates };
  saveReservations(reservations);
  return reservations[index];
}

export function getSiteContent(): SiteContent {
  return readJson<SiteContent>("content.json", defaultContent);
}

export function saveSiteContent(content: SiteContent): void {
  writeJson("content.json", content);
}

export function checkAvailability(
  roomId: string,
  checkIn: string,
  checkOut: string
): { available: boolean; availableUnits: number } {
  const rooms = getRooms();
  const room = rooms.find((r) => r.id === roomId);
  if (!room) return { available: false, availableUnits: 0 };

  const reservations = getReservations().filter(
    (r) =>
      r.roomId === roomId &&
      r.status !== "cancelled" &&
      r.checkIn < checkOut &&
      r.checkOut > checkIn
  );

  const bookedUnits = reservations.length;
  const availableUnits = Math.max(0, room.totalUnits - bookedUnits);

  return { available: availableUnits > 0, availableUnits };
}
