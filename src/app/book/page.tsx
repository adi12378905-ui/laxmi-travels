import React from "react";
import BookingWidget from "@/components/BookingWidget";
import { ShieldCheck, Phone, Clock, Award } from "lucide-react";

export const metadata = {
  title: "Book a Car | Laxmi Travels Vapi",
  description: "Book an outstation taxi, Mumbai/Surat airport cab, or local car rental in Vapi. Transparent fares, 24x7 service, instant booking reference.",
};

export const dynamic = "force-dynamic";

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ car?: string; destination?: string; type?: string }>;
}) {
  const { car, destination, type } = await searchParams;

  let initialTripType = "ONE_WAY";
  if (type === "airport-transfers") initialTripType = "AIRPORT_TRANSFER";
  if (type === "round-trip-taxi") initialTripType = "ROUND_TRIP";
  if (type === "hourly-rental" || type === "local-rental") initialTripType = "LOCAL_HOURLY";
  if (type === "road-trips") initialTripType = "CUSTOM_ROAD_TRIP";

  return (
    <div style={{ paddingTop: "40px", paddingBottom: "80px", background: "var(--ivory-100)" }}>
      {/* Banner */}
      <section className="section section-dark" style={{ padding: "50px 0" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: "800px" }}>
          <span className="eyebrow" style={{ color: "var(--orange-500)" }}>Instant Reservation</span>
          <h1 className="heading-display" style={{ marginBottom: "14px", color: "#FFFFFF" }}>
            Book Your Car With Laxmi Travels
          </h1>
          <p style={{ color: "#E2E8F0", fontSize: "1.1rem" }}>
            Select your journey details below. Receive an instant booking reference and driver assignment.
          </p>
        </div>
      </section>

      <div className="container" style={{ marginTop: "40px", maxWidth: "960px" }}>
        <BookingWidget
          initialTripType={initialTripType}
          initialDestination={destination}
          initialVehicleCategory={car || "SEDAN"}
        />

        {/* Reassurance Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginTop: "40px"
        }}>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <ShieldCheck size={24} style={{ color: "var(--orange-500)", flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--navy-900)" }}>100% Commercial Permit</div>
              <div style={{ fontSize: "0.775rem", color: "var(--text-muted)" }}>All India highway license &amp; insurance</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <Clock size={24} style={{ color: "#22C55E", flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--navy-900)" }}>24x7 Pickup Guarantee</div>
              <div style={{ fontSize: "0.775rem", color: "var(--text-muted)" }}>Doorstep pickup day and night</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <Phone size={24} style={{ color: "#0284C7", flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--navy-900)" }}>Direct Desk Support</div>
              <div style={{ fontSize: "0.775rem", color: "var(--text-muted)" }}>Call +91 7255055889 for emergencies</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
