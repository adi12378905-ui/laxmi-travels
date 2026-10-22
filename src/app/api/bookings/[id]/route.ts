import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const booking = await prisma.booking.findFirst({
      where: {
        OR: [{ id }, { bookingRef: id }],
      },
      include: { vehicle: true },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({ booking });
  } catch (error: any) {
    console.error("Error retrieving booking:", error);
    return NextResponse.json(
      { error: "Failed to fetch booking details", details: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const {
      status,
      paymentStatus,
      paymentMethod,
      totalFare,
      baseFare,
      tollTaxes,
      driverAllowance,
      discountAmount,
      quotationNote,
      driverName,
      driverPhone,
      vehiclePlateNo,
      adminNotes,
    } = body;

    const existing = await prisma.booking.findFirst({
      where: {
        OR: [{ id }, { bookingRef: id }],
      },
    });

    if (!existing) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    const updateData: any = {};
    if (status !== undefined) updateData.status = status;
    if (paymentStatus !== undefined) updateData.paymentStatus = paymentStatus;
    if (paymentMethod !== undefined) updateData.paymentMethod = paymentMethod;
    if (totalFare !== undefined) updateData.totalFare = Number(totalFare);
    if (baseFare !== undefined) updateData.baseFare = Number(baseFare);
    if (tollTaxes !== undefined) updateData.tollTaxes = Number(tollTaxes);
    if (driverAllowance !== undefined) updateData.driverAllowance = Number(driverAllowance);
    if (discountAmount !== undefined) updateData.discountAmount = Number(discountAmount);
    if (quotationNote !== undefined) updateData.quotationNote = quotationNote;
    if (driverName !== undefined) updateData.driverName = driverName;
    if (driverPhone !== undefined) updateData.driverPhone = driverPhone;
    if (vehiclePlateNo !== undefined) updateData.vehiclePlateNo = vehiclePlateNo;
    if (adminNotes !== undefined) updateData.adminNotes = adminNotes;

    // Set assigned timestamp if driver is being assigned
    if (driverName && !existing.driverName) {
      updateData.assignedAt = new Date();
    }

    const updated = await prisma.booking.update({
      where: { id: existing.id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: "Booking updated successfully",
      booking: updated,
    });
  } catch (error: any) {
    console.error("Error updating booking:", error);
    return NextResponse.json(
      { error: "Failed to update booking", details: error.message },
      { status: 500 }
    );
  }
}
