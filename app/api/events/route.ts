import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Check if user has permission to create events
    if (session.user.role !== "ADMIN" && session.user.role !== "USER") {
      return NextResponse.json(
        { message: "You don't have permission to create events" },
        { status: 403 }
      );
    }

    const { title, description, date, location, isVirtual } = await req.json();

    // Validate required fields
    if (!title || !description || !date || !location) {
      return NextResponse.json(
        { message: "Title, description, date, and location are required" },
        { status: 400 }
      );
    }

    // Create event
    const event = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date),
        location,
        isVirtual: isVirtual || false,
      },
    });

    return NextResponse.json(
      { message: "Event created successfully", event },
      { status: 201 }
    );
  } catch (error) {
    console.error("Event creation error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        date: "asc",
      },
    });

    return NextResponse.json({ events });
  } catch (error) {
    console.error("Event fetch error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
