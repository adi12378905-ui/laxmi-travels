import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const destination = searchParams.get("destination");

    const where: any = { isActive: true };
    if (destination) {
      where.destination = { contains: destination };
    }

    const routes = await prisma.route.findMany({
      where,
      orderBy: { distanceKm: "asc" },
    });

    return NextResponse.json({ routes });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch routes", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (!data.destination || !data.distanceKm) {
      return NextResponse.json(
        { error: "Destination and distance are required" },
        { status: 400 }
      );
    }

    const route = await prisma.route.create({
      data: {
        source: data.source || "Vapi",
        destination: data.destination,
        distanceKm: Number(data.distanceKm),
        durationHours: data.durationHours || `${Math.round(data.distanceKm / 45)} hrs`,
        sedanFare: Number(data.sedanFare) || Math.round(data.distanceKm * 13),
        suvFare: Number(data.suvFare) || Math.round(data.distanceKm * 18),
        tollEstimate: Number(data.tollEstimate) || 150,
        popular: data.popular ?? true,
        imageUrl: data.imageUrl || null,
        description: data.description || null,
        isActive: data.isActive ?? true,
      },
    });

    return NextResponse.json({ success: true, route });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to save route", details: error.message },
      { status: 500 }
    );
  }
}
