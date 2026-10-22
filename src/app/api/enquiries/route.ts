import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const enquiries = await prisma.enquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ enquiries });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch enquiries", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, phone, email, subject, message } = await req.json();

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: "Name, phone number, and message are required" },
        { status: 400 }
      );
    }

    const enquiry = await prisma.enquiry.create({
      data: {
        name,
        phone,
        email: email || null,
        subject: subject || "Car Travel Enquiry",
        message,
        status: "UNREAD",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Enquiry submitted successfully. Laxmi Travels team will call you shortly.",
      enquiryId: enquiry.id,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to submit enquiry", details: error.message },
      { status: 500 }
    );
  }
}
