import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  MapPin, 
  Clock, 
  ArrowRight, 
  Compass, 
  Car, 
  CheckCircle2, 
  Calendar,
  Sparkles
} from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Destinations & Highway Routes | Laxmi Travels Vapi",
  description: "Explore popular road travel destinations from Vapi: Surat, Mumbai Airport, Ahmedabad, Vadodara, Daman, Saputara, and Shirdi with verified travel times and fares.",
};

export const dynamic = "force-dynamic";

export default async function DestinationsPage() {
  const routes = await prisma.route.findMany({
    where: { isActive: true },
    orderBy: { distanceKm: "asc" },
  });

  return (
    <div style={{ paddingTop: "40px", paddingBottom: "80px" }}>
      {/* Banner */}
      <section className="section section-dark" style={{ padding: "60px 0" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: "800px" }}>
          <span className="eyebrow" style={{ color: "var(--orange-500)" }}>Suggested Highway Journeys</span>
          <h1 className="heading-display" style={{ marginBottom: "16px", color: "#FFFFFF" }}>
            Popular Destinations From Vapi
          </h1>
          <p style={{ color: "#E2E8F0", fontSize: "1.1rem", lineHeight: 1.6 }}>
            Verified highway route distances, average travel durations, and estimated transparent fares across Gujarat, Maharashtra, and beyond.
          </p>
        </div>
      </section>

      {/* Routes Grid */}
      <div className="container" style={{ marginTop: "50px" }}>
        <div className="grid-3" style={{ gap: "30px" }}>
          {routes.map((rt) => (
            <div key={rt.id} className="card" id={`vapi-${rt.destination.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} style={{ display: "flex", flexDirection: "column" }}>
              {/* Route Banner */}
              <div style={{ position: "relative", height: "200px", width: "100%", background: "#0B132B" }}>
                <Image
                  src={rt.imageUrl || "/images/hero-car.jpg"}
                  alt={`${rt.source} to ${rt.destination}`}
                  fill
                  style={{ objectFit: "cover" }}
                />
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, transparent 40%, rgba(5,11,26,0.9) 100%)"
                }} />
                <div style={{
                  position: "absolute",
                  bottom: "16px",
                  left: "16px",
                  color: "#FFFFFF",
                  fontSize: "1.2rem",
                  fontWeight: 800
                }}>
                  {rt.source} &rarr; {rt.destination}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "24px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", lineHeight: 1.6, marginBottom: "16px" }}>
                  {rt.description || `Direct highway car journey from ${rt.source} to ${rt.destination} with professional chauffeur.`}
                </p>

                {/* Distance & Duration */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                  background: "#F8FAFC",
                  padding: "12px",
                  borderRadius: "8px",
                  marginBottom: "16px",
                  fontSize: "0.825rem",
                  color: "var(--navy-900)"
                }}>
                  <div>
                    <span style={{ color: "var(--text-muted)", display: "block" }}>Distance:</span>
                    <strong>~{rt.distanceKm} km</strong>
                  </div>
                  <div>
                    <span style={{ color: "var(--text-muted)", display: "block" }}>Travel Duration:</span>
                    <strong>~{rt.durationHours}</strong>
                  </div>
                </div>

                {/* Fare Breakdown */}
                <div style={{
                  border: "1px solid #E2E8F0",
                  borderRadius: "8px",
                  padding: "14px",
                  marginBottom: "20px"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <span style={{ fontSize: "0.85rem", color: "var(--navy-900)" }}>Sedan (Dzire):</span>
                    <strong style={{ color: "var(--orange-600)", fontSize: "1.05rem" }}>
                      ₹{rt.sedanFare.toLocaleString("en-IN")}
                    </strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <span style={{ fontSize: "0.85rem", color: "var(--navy-900)" }}>SUV (Innova/Ertiga):</span>
                    <strong style={{ color: "var(--navy-900)", fontSize: "1.05rem" }}>
                      ₹{rt.suvFare.toLocaleString("en-IN")}
                    </strong>
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", borderTop: "1px solid #F1F5F9", paddingTop: "6px", marginTop: "4px" }}>
                    Toll plazas estimated at ₹{rt.tollEstimate} (billed at actuals)
                  </div>
                </div>

                {/* Plan Your Journey Button: Prefills booking widget */}
                <Link
                  href={`/book?destination=${encodeURIComponent(rt.destination)}`}
                  className="btn btn-primary"
                  style={{ width: "100%", padding: "11px", marginTop: "auto", fontSize: "0.9rem" }}
                >
                  <Calendar size={16} /> Plan Your Journey
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
