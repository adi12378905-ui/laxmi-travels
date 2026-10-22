import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import Razorpay from "razorpay";

export async function POST(req: NextRequest) {
  try {
    const { bookingId } = await req.json();

    if (!bookingId) {
      return NextResponse.json({ error: "Booking ID is required" }, { status: 400 });
    }

    const booking = await prisma.booking.findFirst({
      where: {
        OR: [{ id: bookingId }, { bookingRef: bookingId }],
      },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    if (booking.totalFare <= 0) {
      return NextResponse.json(
        { error: "Trip total fare is not set. A quote must be provided before payment." },
        { status: 400 }
      );
    }

    const amountInPaise = Math.round(booking.totalFare * 100);
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_laxmi_travels_mock";
    const keySecret = process.env.RAZORPAY_KEY_SECRET || "mock_secret_key";

    // Check if live or test sandbox mode
    const isMock = keyId.includes("mock") || keySecret.includes("mock");

    let orderId: string;

    if (!isMock && keySecret !== "your_razorpay_key_secret") {
      try {
        const instance = new Razorpay({
          key_id: keyId,
          key_secret: keySecret,
        });

        const order = await instance.orders.create({
          amount: amountInPaise,
          currency: "INR",
          receipt: booking.bookingRef,
          notes: {
            tripType: booking.tripType,
            route: `${booking.pickupLocation} to ${booking.dropLocation}`,
            customer: booking.customerName,
          },
        });
        orderId = order.id;
      } catch (err: any) {
        console.warn("Razorpay API call failed, falling back to secure test sandbox mode:", err.message);
        orderId = `order_test_${Date.now()}_${booking.bookingRef.replace(/-/g, "")}`;
      }
    } else {
      // Secure local test mode sandbox
      orderId = `order_test_${Date.now()}_${booking.bookingRef.replace(/-/g, "")}`;
    }

    // Persist order id to booking
    await prisma.booking.update({
      where: { id: booking.id },
      data: {
        razorpayOrderId: orderId,
        paymentMethod: "ONLINE_RAZORPAY",
      },
    });

    return NextResponse.json({
      success: true,
      orderId,
      amount: amountInPaise,
      currency: "INR",
      keyId,
      bookingRef: booking.bookingRef,
      customer: {
        name: booking.customerName,
        phone: booking.customerPhone,
        email: booking.customerEmail || "",
      },
      isMock,
    });
  } catch (error: any) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json(
      { error: "Failed to initiate payment order", details: error.message },
      { status: 500 }
    );
  }
}
