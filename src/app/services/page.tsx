import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Plane, 
  Car, 
  Compass, 
  Clock, 
  Briefcase, 
  Sparkles, 
  MapPin, 
  Users, 
  ArrowRight, 
  CheckCircle2 
} from "lucide-react";

export const metadata = {
  title: "Car Travel Services | Laxmi Travels Vapi",
  description: "Explore Laxmi Travels car services: Airport Transfers (CSMIA Mumbai, Surat), One-Way Taxis, Round-Trip Cars, Local Vapi GIDC Rentals, and Custom Road Trips.",
};

const services = [
  {
    slug: "airport-transfers",
    title: "Airport Transfers",
    badge: "Most Requested",
    icon: Plane,
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80",
    desc: "Seamless, guaranteed pickup and drop-off travel to Mumbai International Airport (CSMIA / BOM) and Surat Airport (STV). Flight tracking included.",
    features: [
      "24x7 Doorstep pickup in Vapi, Daman, Silvassa",
      "Driver tracks arrival for zero waiting charges",
      "Assistance with heavy baggage loading",
      "Express Highway toll pass enabled"
    ],
    pricingHint: "Fixed rates from ₹3,200 to Mumbai Airport",
  },
  {
    slug: "one-way-taxi",
    title: "One-Way Intercity Taxi",
    badge: "Budget Friendly",
    icon: Car,
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
    desc: "Pay strictly for one-way drops from Vapi to Surat, Mumbai, Ahmedabad, or Vadodara. No return kilometer penalty.",
    features: [
      "Point-to-point private vehicle",
      "No shared riders or detours",
      "Immediate instant booking confirmation",
      "Clean Dzire, City, and Innova fleet"
    ],
    pricingHint: "From ₹12.0/km or fixed package",
  },
  {
    slug: "round-trip-taxi",
    title: "Round-Trip Outstation Taxi",
    badge: "Family & Vacation",
    icon: Compass,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    desc: "Book a dedicated car for multi-day outstation journeys across Gujarat, Maharashtra, and Rajasthan. Driver stays with vehicle.",
    features: [
      "Chauffeur on standby throughout your trip",
      "Complete flexibility for en-route stops",
      "Driver food & stay allowances built into transparent quote",
      "Discounted per-km rates for long journeys"
    ],
    pricingHint: "10% off with promo code LAXMI10",
  },
  {
    slug: "local-rental",
    title: "Local Vapi & GIDC Car Rental",
    badge: "City & Business",
    icon: MapPin,
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80",
    desc: "Vehicles for local Vapi travel, industrial visits to Vapi GIDC, Sarigam, Umbergaon, and meetings in Daman.",
    features: [
      "AC comfort between factory units",
      "Professional driver familiar with all industrial phases",
      "Full day or multiple point drops",
      "GST invoice provided"
    ],
    pricingHint: "From ₹1,200 (4 hours / 40 km)",
  },
  {
    slug: "hourly-rental",
    title: "Hourly & Full-Day Packages",
    badge: "Flexible Hours",
    icon: Clock,
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80",
    desc: "Retain a car and driver for 4h/40km, 8h/80km, or 12h/120km. The ultimate convenience for busy shopping and wedding days.",
    features: [
      "Multiple stops at your command",
      "Driver remains at parking on call",
      "Clear rates for extra km and extra hours",
      "Air-conditioned cabin ready when you return"
    ],
    pricingHint: "8h/80km package from ₹2,200",
  },
  {
    slug: "corporate-travel",
    title: "Corporate Executive Car Travel",
    badge: "Business Class",
    icon: Briefcase,
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80",
    desc: "Executive chauffeur travel for business dignitaries, factory delegates, VIP airport pick-ups, and corporate delegations.",
    features: [
      "Premium Honda City, Innova Hycross & Mercedes options",
      "Monthly corporate billing available",
      "Formal uniformed English/Hindi speaking chauffeurs",
      "Bottled water & mobile chargers inside"
    ],
    pricingHint: "Custom corporate agreements available",
  },
  {
    slug: "road-trips",
    title: "Customized Road Trips & Tourism",
    badge: "Leisure Tours",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    desc: "Plan bespoke holiday road trips from Vapi to Saputara hill station, Daman beaches, Statue of Unity, or Gir & Somnath.",
    features: [
      "Customized multi-day road itinerary",
      "Experienced ghat and hill drivers",
      "Tempo Traveller 13-17 seater option for large families",
      "Sightseeing stopovers at scenic points"
    ],
    pricingHint: "Tailored quote based on your exact itinerary",
  },
];

export default function ServicesPage() {
  return (
    <div style={{ paddingTop: "40px", paddingBottom: "80px" }}>
      {/* Banner */}
      <section className="section section-dark" style={{ padding: "60px 0" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: "800px" }}>
          <span className="eyebrow" style={{ color: "var(--orange-500)" }}>Exclusively Car Travel</span>
          <h1 className="heading-display" style={{ marginBottom: "16px", color: "#FFFFFF" }}>
            Our Car Travel Services
          </h1>
          <p style={{ color: "#E2E8F0", fontSize: "1.1rem", lineHeight: 1.6 }}>
            Reliable, premium car transportation tailored for airport drops, highway outstation trips, local business travel, and leisure tours.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <div className="container" style={{ marginTop: "60px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
          {services.map((srv, idx) => {
            const Icon = srv.icon;
            const isReversed = idx % 2 === 1;

            return (
              <div
                key={srv.slug}
                className="card"
                style={{
                  display: "grid",
                  gridTemplateColumns: isReversed ? "1.2fr 1fr" : "1fr 1.2fr",
                  overflow: "hidden",
                  boxShadow: "var(--shadow-md)"
                }}
              >
                {/* Image side */}
                <div style={{
                  position: "relative",
                  minHeight: "320px",
                  order: isReversed ? 2 : 1,
                  background: "#0B132B"
                }}>
                  <Image
                    src={srv.image}
                    alt={srv.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <div style={{
                    position: "absolute",
                    top: "16px",
                    left: "16px",
                    background: "var(--orange-500)",
                    color: "#FFFFFF",
                    padding: "4px 12px",
                    borderRadius: "6px",
                    fontSize: "0.75rem",
                    fontWeight: 700
                  }}>
                    {srv.badge}
                  </div>
                </div>

                {/* Content side */}
                <div style={{
                  padding: "40px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  order: isReversed ? 1 : 2
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                    <div style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      background: "rgba(255,107,53,0.12)",
                      color: "var(--orange-500)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <Icon size={22} />
                    </div>
                    <h2 className="heading-2" style={{ color: "var(--navy-900)" }}>
                      {srv.title}
                    </h2>
                  </div>

                  <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "20px" }}>
                    {srv.desc}
                  </p>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "8px", marginBottom: "24px" }}>
                    {srv.features.map((feat, fIdx) => (
                      <div key={fIdx} style={{ display: "flex", gap: "8px", alignItems: "center", fontSize: "0.875rem" }}>
                        <CheckCircle2 size={16} style={{ color: "#22C55E", flexShrink: 0 }} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "14px",
                    borderTop: "1px solid #E2E8F0",
                    paddingTop: "18px"
                  }}>
                    <span style={{ fontSize: "0.9rem", color: "var(--orange-600)", fontWeight: 700 }}>
                      {srv.pricingHint}
                    </span>

                    <div style={{ display: "flex", gap: "10px" }}>
                      <Link
                        href={`/book?type=${srv.slug}`}
                        className="btn btn-primary"
                        style={{ padding: "9px 18px", fontSize: "0.875rem" }}
                      >
                        Book This Service
                      </Link>
                      <Link
                        href={`/services/${srv.slug}`}
                        className="btn btn-secondary"
                        style={{ padding: "9px 16px", fontSize: "0.875rem" }}
                      >
                        Learn More <ArrowRight size={14} />
                      </Link>
                    </div>
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
