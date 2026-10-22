import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Generate a memorable unique booking reference code: LT-YYYY-XXXX
function generateBookingRef(): string {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `LT-${year}-${randomNum}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      tripType,
      customerName,
      customerPhone,
      customerEmail,
      specialInstructions,
      pickupLocation,
      dropLocation,
      pickupDate,
      pickupTime,
      returnDate,
      returnTime,
      passengerCount = 1,
      luggageCount = 1,
      airportName,
      airportDirection,
      flightNumber,
      hourlyPackage,
      vehicleId,
      vehicleCategory,
      vehicleName,
      estimatedKm,
      baseFare = 0,
      tollTaxes = 0,
      driverAllowance = 0,
      discountAmount = 0,
      totalFare = 0,
      couponCode,
    } = body;

    // Validation
    if (!customerName || !customerPhone || !pickupLocation || !dropLocation || !pickupDate || !pickupTime) {
      return NextResponse.json(
        { error: "Missing required fields. Please fill in customer details, pickup, drop-off, date and time." },
        { status: 400 }
      );
    }

    let bookingRef = generateBookingRef();
    // Ensure uniqueness
    let existing = await prisma.booking.findUnique({ where: { bookingRef } });
    while (existing) {
      bookingRef = generateBookingRef();
      existing = await prisma.booking.findUnique({ where: { bookingRef } });
    }

    // Determine initial booking status
    // If totalFare is calculated > 0, it is Awaiting Payment / Booking Requested
    // If totalFare == 0 or custom trip, Quote Pending
    const status = totalFare > 0 ? "AWAITING_PAYMENT" : "QUOTE_PENDING";

    const booking = await prisma.booking.create({
      data: {
        bookingRef,
        tripType: tripType || "ONE_WAY",
        customerName,
        customerPhone,
        customerEmail: customerEmail || null,
        specialInstructions: specialInstructions || null,
        pickupLocation,
        dropLocation,
        pickupDate,
        pickupTime,
        returnDate: returnDate || null,
        returnTime: returnTime || null,
        passengerCount: Number(passengerCount) || 1,
        luggageCount: Number(luggageCount) || 1,
        airportName: airportName || null,
        airportDirection: airportDirection || null,
        flightNumber: flightNumber || null,
        hourlyPackage: hourlyPackage || null,
        vehicleId: vehicleId || null,
        vehicleName: vehicleName || null,
        vehicleCategory: vehicleCategory || null,
        estimatedKm: estimatedKm ? Number(estimatedKm) : null,
        baseFare: Number(baseFare) || 0,
        tollTaxes: Number(tollTaxes) || 0,
        driverAllowance: Number(driverAllowance) || 0,
        discountAmount: Number(discountAmount) || 0,
        totalFare: Number(totalFare) || 0,
        status,
        paymentStatus: "PENDING",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Booking request created successfully",
      bookingRef: booking.bookingRef,
      bookingId: booking.id,
      status: booking.status,
      totalFare: booking.totalFare,
    });
  } catch (error: any) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const ref = searchParams.get("ref");
    const phone = searchParams.get("phone");
    const status = searchParams.get("status");

    if (ref) {
      const booking = await prisma.booking.findUnique({
        where: { bookingRef: ref },
        include: { vehicle: true },
      });
      if (!booking) {
        return NextResponse.json({ error: "Booking not found" }, { status: 404 });
      }
      return NextResponse.json({ booking });
    }

    if (phone) {
      const bookings = await prisma.booking.findMany({
        where: { customerPhone: { contains: phone } },
        orderBy: { createdAt: "desc" },
        include: { vehicle: true },
      });
      return NextResponse.json({ bookings });
    }

    const whereClause: any = {};
    if (status && status !== "ALL") {
      whereClause.status = status;
    }

    const bookings = await prisma.booking.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      include: { vehicle: true },
    });

    return NextResponse.json({ bookings });
  } catch (error: any) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings", details: error.message },
      { status: 500 }
    );
  }
}
