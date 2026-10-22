import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const admin = searchParams.get("admin");

    const where: any = {};
    if (!admin) {
      where.isActive = true;
    }
    if (category && category !== "ALL") {
      where.category = category;
    }

    const vehicles = await prisma.vehicle.findMany({
      where,
      orderBy: { ratePerKm: "asc" },
    });

    return NextResponse.json({ vehicles });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch vehicle fleet", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (!data.name || !data.category || !data.ratePerKm) {
      return NextResponse.json(
        { error: "Name, category, and rate per km are required" },
        { status: 400 }
      );
    }

    const slug = data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const vehicle = await prisma.vehicle.upsert({
      where: { slug },
      update: {
        name: data.name,
        category: data.category,
        seatingCapacity: Number(data.seatingCapacity) || 4,
        luggageCapacity: Number(data.luggageCapacity) || 3,
        hasAc: data.hasAc ?? true,
        fuelType: data.fuelType || "Petrol / Diesel",
        transmission: data.transmission || "Manual",
        ratePerKm: Number(data.ratePerKm),
        baseFare: Number(data.baseFare) || 1500,
        perHourRate: data.perHourRate ? Number(data.perHourRate) : null,
        minHours: data.minHours ? Number(data.minHours) : 4,
        image: data.image || "/images/sedan-dzire.jpg",
        description: data.description || "",
        features: typeof data.features === "string" ? data.features : JSON.stringify(data.features || []),
        isActive: data.isActive ?? true,
      },
      create: {
        slug,
        name: data.name,
        category: data.category,
        seatingCapacity: Number(data.seatingCapacity) || 4,
        luggageCapacity: Number(data.luggageCapacity) || 3,
        hasAc: data.hasAc ?? true,
        fuelType: data.fuelType || "Petrol / Diesel",
        transmission: data.transmission || "Manual",
        ratePerKm: Number(data.ratePerKm),
        baseFare: Number(data.baseFare) || 1500,
        perHourRate: data.perHourRate ? Number(data.perHourRate) : null,
        minHours: data.minHours ? Number(data.minHours) : 4,
        image: data.image || "/images/sedan-dzire.jpg",
        description: data.description || "",
        features: typeof data.features === "string" ? data.features : JSON.stringify(data.features || []),
        isActive: data.isActive ?? true,
      },
    });

    return NextResponse.json({ success: true, vehicle });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to save vehicle", details: error.message },
      { status: 500 }
    );
  }
}
