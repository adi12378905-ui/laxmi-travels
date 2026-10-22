import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  Users, 
  Luggage, 
  CheckCircle2, 
  ShieldCheck, 
  Fuel, 
  Settings2, 
  Calendar, 
  Phone, 
  MessageSquare,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import BookingWidget from "@/components/BookingWidget";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const vehicle = await prisma.vehicle.findUnique({ where: { slug } });
  if (!vehicle) return { title: "Vehicle Not Found" };
  return {
    title: `${vehicle.name} (${vehicle.category.replace(/_/g, " ")}) | Laxmi Travels Vapi`,
    description: vehicle.description,
  };
}

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vehicle = await prisma.vehicle.findUnique({
    where: { slug },
  });

  if (!vehicle) {
    notFound();
  }

  const features: string[] = (() => {
    try {
      return JSON.parse(vehicle.features);
    } catch {
      return ["Air Conditioning", "Mobile Charging", "Audio System", "Clean Interiors"];
    }
  })();

  return (
    <div style={{ paddingTop: "20px", paddingBottom: "80px" }}>
      {/* Banner */}
      <section className="section section-dark" style={{ padding: "60px 0" }}>
        <div className="container" style={{ maxWidth: "800px", textAlign: "center" }}>
          <span className="eyebrow" style={{ color: "var(--orange-500)" }}>
            {vehicle.category.replace(/_/g, " ")}
          </span>
          <h1 className="heading-display" style={{ color: "#FFFFFF", marginBottom: "14px" }}>
            {vehicle.name}
          </h1>
          <p style={{ color: "#E2E8F0", fontSize: "1.1rem", lineHeight: 1.6 }}>
            {vehicle.description}
          </p>
        </div>
      </section>

      <div className="container" style={{ marginTop: "50px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: "50px",
          alignItems: "flex-start"
        }}>
          {/* Vehicle Details */}
          <div>
            <div className="card" style={{ overflow: "hidden", marginBottom: "34px" }}>
              <div style={{ position: "relative", height: "420px", width: "100%", background: "#0B132B" }}>
                <Image
                  src={vehicle.image}
                  alt={vehicle.name}
                  fill
                  priority
                  style={{ objectFit: "cover" }}
                />
                <div style={{
                  position: "absolute",
                  bottom: "20px",
                  right: "20px",
                  background: "var(--orange-500)",
                  color: "#FFFFFF",
                  padding: "8px 18px",
                  borderRadius: "10px",
                  fontSize: "1.1rem",
                  fontWeight: 800,
                  boxShadow: "0 6px 20px rgba(0,0,0,0.3)"
                }}>
                  ₹{vehicle.ratePerKm}/km Rate
                </div>
              </div>

              <div style={{ padding: "30px" }}>
                <h2 className="heading-2" style={{ color: "var(--navy-900)", marginBottom: "16px" }}>
                  Vehicle Specifications &amp; Amenities
                </h2>

                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "16px",
                  background: "#F8FAFC",
                  padding: "20px",
                  borderRadius: "12px",
                  marginBottom: "26px"
                }}>
                  <div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Seating Capacity</div>
                    <div style={{ fontWeight: 700, fontSize: "1rem", color: "var(--navy-900)", display: "flex", alignItems: "center", gap: "6px" }}>
                      <Users size={16} style={{ color: "var(--orange-500)" }} />
                      {vehicle.seatingCapacity} Adult Passengers
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Luggage Capacity</div>
                    <div style={{ fontWeight: 700, fontSize: "1rem", color: "var(--navy-900)", display: "flex", alignItems: "center", gap: "6px" }}>
                      <Luggage size={16} style={{ color: "var(--orange-500)" }} />
                      {vehicle.luggageCapacity} Large Suitcases
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Climate Control</div>
                    <div style={{ fontWeight: 700, fontSize: "1rem", color: "var(--navy-900)", display: "flex", alignItems: "center", gap: "6px" }}>
                      <CheckCircle2 size={16} style={{ color: "#22C55E" }} />
                      Chilled AC Vents
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Fuel &amp; Transmission</div>
                    <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--navy-900)", display: "flex", alignItems: "center", gap: "6px" }}>
                      <Fuel size={16} style={{ color: "#0284C7" }} />
                      {vehicle.fuelType}
                    </div>
                  </div>
                </div>

                <h3 className="heading-3" style={{ color: "var(--navy-900)", marginBottom: "14px" }}>
                  Included Features
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "26px" }}>
                  {features.map((feat, i) => (
                    <div key={i} style={{ display: "flex", gap: "8px", alignItems: "center", fontSize: "0.9rem" }}>
                      <CheckCircle2 size={16} style={{ color: "#22C55E" }} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <h3 className="heading-3" style={{ color: "var(--navy-900)", marginBottom: "12px" }}>
                  Pricing Structure
                </h3>
                <div style={{
                  border: "1px solid #E2E8F0",
                  borderRadius: "10px",
                  padding: "16px",
                  fontSize: "0.9rem",
                  lineHeight: 1.8
                }}>
                  <div>&bull; Outstation / Highway Rate: <strong>₹{vehicle.ratePerKm} per km</strong></div>
                  <div>&bull; Minimum Base Fare: <strong>₹{vehicle.baseFare.toLocaleString("en-IN")}</strong></div>
                  {vehicle.perHourRate && (
                    <div>&bull; Local Hourly Package Rate: <strong>₹{vehicle.perHourRate} per hour</strong> (Min {vehicle.minHours || 4} hours)</div>
                  )}
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "8px" }}>
                    * Toll taxes, parking tickets, and interstate permits are billed transparently at actual toll plazas.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Booking Widget */}
          <div style={{ position: "sticky", top: "100px" }}>
            <div style={{ marginBottom: "12px", fontWeight: 700, color: "var(--navy-900)", fontSize: "1.1rem" }}>
              Book {vehicle.name}
            </div>
            <BookingWidget initialVehicleCategory={vehicle.category} compact />
          </div>
        </div>
      </div>
    </div>
  );
}
