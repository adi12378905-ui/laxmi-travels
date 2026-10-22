import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Users, 
  Luggage, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  Fuel,
  Settings2,
  Calendar
} from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Our Car Fleet | Laxmi Travels Vapi",
  description: "Browse verified car rental fleet at Laxmi Travels Vapi. Sedans (Dzire), SUVs (Innova Crysta, Ertiga), Premium Sedans, Luxury Cars, and Tempo Travellers. Transparent per-km rates.",
};

export const dynamic = "force-dynamic";

export default async function FleetPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  const where: any = { isActive: true };
  if (category && category !== "ALL") {
    where.category = category;
  }

  const vehicles = await prisma.vehicle.findMany({
    where,
    orderBy: { ratePerKm: "asc" },
  });

  const categories = [
    { id: "ALL", label: "All Vehicles" },
    { id: "SEDAN", label: "Sedan" },
    { id: "PREMIUM_SUV", label: "Premium SUV" },
    { id: "SUV", label: "Spacious SUV" },
    { id: "PREMIUM_SEDAN", label: "Executive Sedan" },
    { id: "HATCHBACK", label: "Hatchback" },
    { id: "LUXURY", label: "Luxury VIP" },
    { id: "TEMPO_TRAVELLER", label: "Group Traveller" },
  ];

  return (
    <div style={{ paddingTop: "40px", paddingBottom: "80px" }}>
      {/* Banner */}
      <section className="section section-dark" style={{ padding: "60px 0" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: "800px" }}>
          <span className="eyebrow" style={{ color: "var(--orange-500)" }}>Verified &amp; Sanitized Fleet</span>
          <h1 className="heading-display" style={{ marginBottom: "16px", color: "#FFFFFF" }}>
            Our Car Travel Fleet
          </h1>
          <p style={{ color: "#E2E8F0", fontSize: "1.1rem", lineHeight: 1.6 }}>
            Every vehicle in our catalogue is commercial permit certified, thoroughly inspected, and driven by an experienced professional.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="container" style={{ marginTop: "40px" }}>
        <div style={{
          display: "flex",
          gap: "10px",
          overflowX: "auto",
          paddingBottom: "14px",
          marginBottom: "40px"
        }}>
          {categories.map((cat) => {
            const isSelected = (category || "ALL") === cat.id;
            return (
              <Link
                key={cat.id}
                href={cat.id === "ALL" ? "/fleet" : `/fleet?category=${cat.id}`}
                style={{
                  padding: "10px 20px",
                  borderRadius: "30px",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  background: isSelected ? "var(--orange-500)" : "#FFFFFF",
                  color: isSelected ? "#FFFFFF" : "var(--navy-900)",
                  border: isSelected ? "none" : "1px solid #E2E8F0",
                  boxShadow: isSelected ? "var(--shadow-orange)" : "var(--shadow-sm)",
                  transition: "all 0.2s ease"
                }}
              >
                {cat.label}
              </Link>
            );
          })}
        </div>

        {/* Vehicles Grid */}
        <div className="grid-3" style={{ gap: "32px" }}>
          {vehicles.map((car) => {
            const features: string[] = (() => {
              try {
                return JSON.parse(car.features);
              } catch {
                return ["Air Conditioning", "Clean Interior"];
              }
            })();

            return (
              <div key={car.id} className="card" style={{ display: "flex", flexDirection: "column" }}>
                {/* Image */}
                <div style={{ position: "relative", height: "240px", width: "100%", background: "#0B132B" }}>
                  <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <div style={{
                    position: "absolute",
                    top: "14px",
                    left: "14px",
                    background: "rgba(11, 19, 43, 0.85)",
                    backdropFilter: "blur(8px)",
                    color: "#FFFFFF",
                    padding: "4px 12px",
                    borderRadius: "6px",
                    fontSize: "0.75rem",
                    fontWeight: 700
                  }}>
                    {car.category.replace(/_/g, " ")}
                  </div>
                  <div style={{
                    position: "absolute",
                    bottom: "14px",
                    right: "14px",
                    background: "var(--orange-500)",
                    color: "#FFFFFF",
                    padding: "6px 14px",
                    borderRadius: "8px",
                    fontSize: "0.95rem",
                    fontWeight: 800,
                    boxShadow: "0 4px 14px rgba(0,0,0,0.3)"
                  }}>
                    ₹{car.ratePerKm}/km
                  </div>
                </div>

                {/* Details */}
                <div style={{ padding: "26px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                  <h3 className="heading-3" style={{ color: "var(--navy-900)", marginBottom: "8px" }}>
                    {car.name}
                  </h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", lineHeight: 1.5, marginBottom: "16px" }}>
                    {car.description}
                  </p>

                  {/* Specs Bar */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "8px",
                    background: "#F8FAFC",
                    padding: "12px",
                    borderRadius: "8px",
                    marginBottom: "16px",
                    textAlign: "center",
                    fontSize: "0.8rem",
                    color: "var(--navy-900)"
                  }}>
                    <div>
                      <Users size={16} style={{ color: "var(--orange-500)", margin: "0 auto 4px" }} />
                      <div><strong>{car.seatingCapacity}</strong> Seats</div>
                    </div>
                    <div>
                      <Luggage size={16} style={{ color: "var(--orange-500)", margin: "0 auto 4px" }} />
                      <div><strong>{car.luggageCapacity}</strong> Bags</div>
                    </div>
                    <div>
                      <CheckCircle2 size={16} style={{ color: "#22C55E", margin: "0 auto 4px" }} />
                      <div>AC Chilled</div>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "22px" }}>
                    {features.map((feat, fIdx) => (
                      <span key={fIdx} style={{
                        fontSize: "0.725rem",
                        background: "#F1F5F9",
                        color: "var(--navy-900)",
                        padding: "3px 8px",
                        borderRadius: "4px"
                      }}>
                        {feat}
                      </span>
                    ))}
                  </div>

                  {/* Pricing info */}
                  <div style={{
                    fontSize: "0.8rem",
                    color: "var(--text-muted)",
                    marginBottom: "18px",
                    borderTop: "1px solid #F1F5F9",
                    paddingTop: "12px"
                  }}>
                    Min Base Fare: <strong>₹{car.baseFare.toLocaleString("en-IN")}</strong>
                    {car.perHourRate && (
                      <span> &bull; Hourly: <strong>₹{car.perHourRate}/hr</strong></span>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div style={{ marginTop: "auto", display: "grid", gridTemplateColumns: "1fr auto", gap: "10px" }}>
                    <Link
                      href={`/book?car=${car.category}`}
                      className="btn btn-primary"
                      style={{ padding: "11px", fontSize: "0.9rem" }}
                    >
                      <Calendar size={16} /> Book This Car
                    </Link>
                    <Link
                      href={`/fleet/${car.slug}`}
                      className="btn btn-secondary"
                      style={{ padding: "11px 16px", fontSize: "0.875rem" }}
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
