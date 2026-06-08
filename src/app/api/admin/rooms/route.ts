import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getRooms, saveRooms } from "@/lib/store";
import { Room } from "@/lib/types";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ rooms: getRooms() });
}

export async function PUT(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { rooms } = await request.json() as { rooms: Room[] };
    saveRooms(rooms);
    return NextResponse.json({ success: true, rooms: getRooms() });
  } catch {
    return NextResponse.json({ error: "Failed to update rooms" }, { status: 500 });
  }
}
