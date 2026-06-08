import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { differenceInDays } from "date-fns";
import {
  addReservation,
  checkAvailability,
  getRooms,
  getReservations,
} from "@/lib/store";
import { BookingRequest } from "@/lib/types";

export async function GET() {
  return NextResponse.json({ reservations: getReservations() });
}

export async function POST(request: NextRequest) {
  try {
    const body: BookingRequest = await request.json();
    const { roomId, guestName, guestEmail, guestPhone, checkIn, checkOut, adults, children, paymentMethod } = body;

    if (!roomId || !guestName || !guestEmail || !guestPhone || !checkIn || !checkOut) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const rooms = getRooms();
    const room = rooms.find((r) => r.id === roomId);
    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    const { available } = checkAvailability(roomId, checkIn, checkOut);
    if (!available) {
      return NextResponse.json({ error: "Room not available for selected dates" }, { status: 409 });
    }

    if (adults + children > room.maxGuests) {
      return NextResponse.json({ error: "Guest count exceeds room capacity" }, { status: 400 });
    }

    const nights = Math.max(1, differenceInDays(new Date(checkOut), new Date(checkIn)));
    const totalPrice = room.pricePerNight * nights;

    const reservation = {
      id: `GEH-${uuidv4().slice(0, 8).toUpperCase()}`,
      roomId,
      guestName,
      guestEmail,
      guestPhone,
      checkIn,
      checkOut,
      adults,
      children,
      totalPrice,
      paymentMethod,
      paymentStatus: "completed" as const,
      status: "confirmed" as const,
      createdAt: new Date().toISOString(),
    };

    addReservation(reservation);

    return NextResponse.json({ success: true, reservation }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}
