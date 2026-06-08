import { NextRequest, NextResponse } from "next/server";
import { checkAvailability, getRooms } from "@/lib/store";

export async function POST(request: NextRequest) {
  try {
    const { checkIn, checkOut } = await request.json();

    if (!checkIn || !checkOut) {
      return NextResponse.json({ error: "Check-in and check-out dates are required" }, { status: 400 });
    }

    if (checkIn >= checkOut) {
      return NextResponse.json({ error: "Check-out must be after check-in" }, { status: 400 });
    }

    const rooms = getRooms();
    const results = rooms.map((room) => {
      const { available, availableUnits } = checkAvailability(room.id, checkIn, checkOut);
      return { roomId: room.id, available, availableUnits };
    });

    return NextResponse.json({ results });
  } catch {
    return NextResponse.json({ error: "Failed to check availability" }, { status: 500 });
  }
}
