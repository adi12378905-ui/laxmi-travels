import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const all = searchParams.get("all");

    const where: any = {};
    if (!all) {
      where.isApproved = true;
    }

    const reviews = await prisma.review.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ reviews });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch reviews", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { authorName, authorLocation, rating, comment, tripRoute } = await req.json();

    if (!authorName || !comment || !rating) {
      return NextResponse.json(
        { error: "Name, rating, and feedback comment are required" },
        { status: 400 }
      );
    }

    const review = await prisma.review.create({
      data: {
        authorName,
        authorLocation: authorLocation || "Vapi, Gujarat",
        rating: Math.min(5, Math.max(1, Number(rating))),
        comment,
        tripRoute: tripRoute || "Taxi Journey",
        isApproved: true, // Auto-approve or subject to admin moderation toggle
      },
    });

    return NextResponse.json({
      success: true,
      message: "Thank you for sharing your feedback with Laxmi Travels!",
      review,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to submit review", details: error.message },
      { status: 500 }
    );
  }
}
