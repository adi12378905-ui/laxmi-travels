import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Car, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Phone, 
  Star, 
  Award, 
  CheckCircle2, 
  Plane, 
  Compass, 
  Users, 
  Briefcase, 
  ArrowRight, 
  ChevronRight,
  MessageSquare,
  Sparkles,
  Luggage,
  Calendar
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import BookingWidget from "@/components/BookingWidget";

export default async function HomePage() {
  // Fetch vehicles, routes, and reviews from database
  const [vehicles, routes, reviews, offers] = await Promise.all([
    prisma.vehicle.findMany({ where: { isActive: true }, orderBy: { ratePerKm: "asc" } }),
    prisma.route.findMany({ where: { isActive: true, popular: true }, take: 6 }),
    prisma.review.findMany({ where: { isApproved: true }, take: 6, orderBy: { createdAt: "desc" } }),
    prisma.offer.findMany({ where: { isActive: true }, take: 3 }),
  ]);

  return (
    <>
      {/* HERO SECTION */}
      <section style={{
        position: "relative",
        minHeight: "92vh",
        display: "flex",
        alignItems: "center",
        backgroundColor: "var(--navy-950)",
        color: "#FFFFFF",
        padding: "80px 0 100px",
        overflow: "hidden"
      }}>
        {/* Background Cinematic Image with Gradient Overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          opacity: 0.38,
        }}>
          <Image
            src="/images/hero-car.jpg"
            alt="Laxmi Travels Luxury Car on Indian Highway at Sunset"
            fill
            priority
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Dynamic Gradient Overlays */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(5,11,26,0.85) 0%, rgba(11,19,43,0.75) 50%, rgba(5,11,26,0.95) 100%)",
          zIndex: 2
        }} />

        <div className="container" style={{ position: "relative", zIndex: 10 }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "40px",
            alignItems: "center"
          }}>
            {/* Hero Text */}
            <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
              <div className="eyebrow" style={{
                background: "rgba(255, 107, 53, 0.15)",
                padding: "6px 16px",
                borderRadius: "30px",
                border: "1px solid rgba(255, 107, 53, 0.3)"
              }}>
                <Sparkles size={14} /> Premier Car Travel Agency • Vapi, Gujarat
              </div>

              <h1 className="heading-display" style={{ marginBottom: "20px", textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
                Your Journey. <span style={{
                  background: "linear-gradient(135deg, #FF6B35 0%, #F4BA46 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}>Our Promise.</span>
              </h1>

              <p style={{
                fontSize: "1.2rem",
                color: "#E2E8F0",
                lineHeight: 1.6,
                marginBottom: "32px",
                fontWeight: 400
              }}>
                Comfortable car travel, reliable service, and memorable journeys — all with Laxmi Travels. 
                24x7 verified chauffeurs, sanitised vehicles, and transparent outstation fares.
              </p>

              <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", marginBottom: "40px" }}>
                <a href="#booking-panel" className="btn btn-primary" style={{ padding: "14px 32px", fontSize: "1rem" }}>
                  <Calendar size={18} /> Book Your Car
                </a>
                <Link href="/fleet" className="btn btn-outline-white" style={{ padding: "14px 28px", fontSize: "1rem" }}>
                  <Car size={18} /> Explore Our Fleet
                </Link>
                <a href="tel:+917255055889" className="btn btn-call" style={{ padding: "14px 24px" }}>
                  <Phone size={18} /> +91 7255055889
                </a>
              </div>

              {/* Verified Trust Stats Strip */}
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "24px",
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
                padding: "10px 24px",
                borderRadius: "40px",
                border: "1px solid rgba(255,255,255,0.15)",
                fontSize: "0.875rem",
                flexWrap: "wrap",
                justifyContent: "center"
              }}>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Star size={16} style={{ color: "#F4BA46", fill: "#F4BA46" }} />
                  <strong>4.9 / 5</strong> on Google (146+ Reviews)
                </span>
                <span style={{ opacity: 0.3 }}>•</span>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Clock size={16} style={{ color: "#22C55E" }} />
                  24x7 Doorstep Pickup
                </span>
                <span style={{ opacity: 0.3 }}>•</span>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <ShieldCheck size={16} style={{ color: "#38BDF8" }} />
                  100% Commercial Taxi Permits
                </span>
              </div>
            </div>

            {/* Functional Booking Widget directly below/within hero */}
            <div id="booking-panel" style={{ maxWidth: "1000px", width: "100%", margin: "10px auto 0" }}>
              <BookingWidget />
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE LAXMI TRAVELS */}
      <section className="section section-white">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <span className="eyebrow">The Laxmi Travels Standard</span>
            <h2 className="heading-1" style={{ color: "var(--navy-900)", marginBottom: "14px" }}>
              Why Travellers in Vapi Trust Laxmi Travels
            </h2>
            <p className="subheading" style={{ margin: "0 auto" }}>
              Exclusively dedicated to car travel excellence. We own and operate commercial taxis with verified drivers, clean interiors, and complete fare transparency.
            </p>
          </div>

          <div className="grid-4">
            <div className="card" style={{ padding: "30px", borderTop: "4px solid var(--orange-500)" }}>
              <div style={{
                width: "50px",
                height: "50px",
                borderRadius: "12px",
                background: "rgba(255,107,53,0.12)",
                color: "var(--orange-500)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "20px"
              }}>
                <Clock size={26} />
              </div>
              <h3 className="heading-3" style={{ marginBottom: "10px", color: "var(--navy-900)" }}>
                Punctual 24x7 Pickups
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                Early morning 4 AM Mumbai airport flight or late-night return? Our drivers report 15 minutes before your scheduled departure time.
              </p>
            </div>

            <div className="card" style={{ padding: "30px", borderTop: "4px solid #22C55E" }}>
              <div style={{
                width: "50px",
                height: "50px",
                borderRadius: "12px",
                background: "rgba(34,197,94,0.12)",
                color: "#22C55E",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "20px"
              }}>
                <ShieldCheck size={26} />
              </div>
              <h3 className="heading-3" style={{ marginBottom: "10px", color: "var(--navy-900)" }}>
                Transparent Pricing
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                Clear breakdown of base fare, toll taxes, and driver allowance. Zero surprise surge pricing, hidden extras, or sudden driver cancellations.
              </p>
            </div>

            <div className="card" style={{ padding: "30px", borderTop: "4px solid #0284C7" }}>
              <div style={{
                width: "50px",
                height: "50px",
                borderRadius: "12px",
                background: "rgba(2,132,199,0.12)",
                color: "#0284C7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "20px"
              }}>
                <Car size={26} />
              </div>
              <h3 className="heading-3" style={{ marginBottom: "10px", color: "var(--navy-900)" }}>
                Clean &amp; Chilled AC Fleet
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                Every car undergoes interior sanitisation and vacuuming before every journey. Functional air-conditioning with quiet, smooth highway suspension.
              </p>
            </div>

            <div className="card" style={{ padding: "30px", borderTop: "4px solid #E5A93C" }}>
              <div style={{
                width: "50px",
                height: "50px",
                borderRadius: "12px",
                background: "rgba(229,169,60,0.12)",
                color: "#E5A93C",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "20px"
              }}>
                <Users size={26} />
              </div>
              <h3 className="heading-3" style={{ marginBottom: "10px", color: "var(--navy-900)" }}>
                Courteous Chauffeurs
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                Trained highway professionals with police verification and extensive experience navigating Western Indian expressways and ghats.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CAR FLEET SHOWCASE */}
      <section className="section section-ivory" id="fleet">
        <div className="container">
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "50px",
            flexWrap: "wrap",
            gap: "20px"
          }}>
            <div>
              <span className="eyebrow">Our Verified Vehicles</span>
              <h2 className="heading-1" style={{ color: "var(--navy-900)" }}>
                Explore Our Premium Car Fleet
              </h2>
              <p className="subheading">
                Sedans, SUVs, luxury wedding cars, and group travellers maintained in mint condition.
              </p>
            </div>
            <Link href="/fleet" className="btn btn-secondary">
              View All Vehicles &amp; Rates <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid-3">
            {vehicles.slice(0, 6).map((vehicle) => {
              const featuresList: string[] = (() => {
                try {
                  return JSON.parse(vehicle.features);
                } catch {
                  return ["Air Conditioning", "Clean Interiors"];
                }
              })();

              return (
                <div key={vehicle.id} className="card" style={{ display: "flex", flexDirection: "column" }}>
                  {/* Vehicle Image */}
                  <div style={{ position: "relative", height: "230px", width: "100%", background: "#0B132B" }}>
                    <Image
                      src={vehicle.image}
                      alt={vehicle.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                    <div style={{
                      position: "absolute",
                      top: "14px",
                      left: "14px",
                      background: "rgba(11, 19, 43, 0.85)",
                      backdropFilter: "blur(6px)",
                      color: "#FFFFFF",
                      padding: "4px 10px",
                      borderRadius: "6px",
                      fontSize: "0.75rem",
                      fontWeight: 700
                    }}>
                      {vehicle.category.replace(/_/g, " ")}
                    </div>
                    <div style={{
                      position: "absolute",
                      bottom: "14px",
                      right: "14px",
                      background: "var(--orange-500)",
                      color: "#FFFFFF",
                      padding: "6px 12px",
                      borderRadius: "8px",
                      fontSize: "0.9rem",
                      fontWeight: 800,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
                    }}>
                      ₹{vehicle.ratePerKm}/km
                    </div>
                  </div>

                  {/* Vehicle Details */}
                  <div style={{ padding: "24px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                    <h3 className="heading-3" style={{ color: "var(--navy-900)", marginBottom: "8px" }}>
                      {vehicle.name}
                    </h3>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.5, marginBottom: "16px" }}>
                      {vehicle.description.slice(0, 110)}...
                    </p>

                    {/* Quick Specs */}
                    <div style={{
                      display: "flex",
                      gap: "16px",
                      padding: "12px 0",
                      borderTop: "1px solid #F1F5F9",
                      borderBottom: "1px solid #F1F5F9",
                      marginBottom: "16px",
                      fontSize: "0.825rem",
                      color: "var(--navy-900)"
                    }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <Users size={15} style={{ color: "var(--orange-500)" }} />
                        {vehicle.seatingCapacity} Seats
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <Luggage size={15} style={{ color: "var(--orange-500)" }} />
                        {vehicle.luggageCapacity} Bags
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <CheckCircle2 size={15} style={{ color: "#22C55E" }} />
                        Chilled AC
                      </span>
                    </div>

                    {/* Features list */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
                      {featuresList.slice(0, 3).map((feat, idx) => (
                        <span key={idx} style={{
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

                    <div style={{ marginTop: "auto", display: "grid", gridTemplateColumns: "1fr auto", gap: "10px" }}>
                      <Link
                        href={`/book?car=${vehicle.category}`}
                        className="btn btn-primary"
                        style={{ padding: "10px 16px", fontSize: "0.875rem" }}
                      >
                        Book This Car
                      </Link>
                      <Link
                        href={`/fleet/${vehicle.slug}`}
                        className="btn btn-secondary"
                        style={{ padding: "10px 14px", fontSize: "0.85rem" }}
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
      </section>

      {/* CAR TRAVEL SERVICES */}
      <section className="section section-dark" id="services">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <span className="eyebrow">Dedicated Car Services</span>
            <h2 className="heading-1" style={{ color: "#FFFFFF", marginBottom: "14px" }}>
              Comprehensive Car Travel Solutions
            </h2>
            <p className="subheading" style={{ color: "#94A3B8", margin: "0 auto" }}>
              Whether you need a quick point-to-point drop, an airport transfer, or a multi-day highway tour, Laxmi Travels provides reliable wheels.
            </p>
          </div>

          <div className="grid-4">
            {[
              {
                title: "Airport Transfers",
                slug: "airport-transfers",
                icon: Plane,
                desc: "Punctual, guaranteed pickups to and from Mumbai International (CSMIA) and Surat Airport.",
                highlight: "Never miss a flight with 24x7 tracking",
              },
              {
                title: "One-Way Taxi",
                slug: "one-way-taxi",
                icon: Car,
                desc: "Pay only for one-way drops from Vapi to Surat, Mumbai, Ahmedabad, or Vadodara. No return fare.",
                highlight: "Door-to-door direct cab service",
              },
              {
                title: "Round-Trip Taxi",
                slug: "round-trip-taxi",
                icon: Compass,
                desc: "Comfortable return journeys for family visits, shopping, and temple tours with driver waiting.",
                highlight: "Flexible halts & sightseeing",
              },
              {
                title: "Local & Hourly Rental",
                slug: "hourly-rental",
                icon: Clock,
                desc: "Book a car for 4h/40km, 8h/80km, or full-day for Vapi city errands and industrial visits.",
                highlight: "Ideal for Vapi & Daman meetings",
              },
              {
                title: "Corporate Car Travel",
                slug: "corporate-travel",
                icon: Briefcase,
                desc: "Executive sedans and SUVs with GST invoicing for Vapi GIDC, Sarigam, and Umbergaon industries.",
                highlight: "Monthly billing & VIP chauffeuring",
              },
              {
                title: "Customized Road Trips",
                slug: "road-trips",
                icon: Sparkles,
                desc: "Explore Saputara hill station, Daman beaches, Statue of Unity, and Saurashtra pilgrimages.",
                highlight: "Personalized multi-stop itineraries",
              },
              {
                title: "Outstation Journeys",
                slug: "outstation-travel",
                icon: MapPin,
                desc: "Safe highway rides across Gujarat, Maharashtra, and Rajasthan with seasoned road drivers.",
                highlight: "All India commercial permits",
              },
              {
                title: "Group Travel Coach",
                slug: "road-trips",
                icon: Users,
                desc: "Spacious Force Urbania and 13-17 seater Tempo Travellers for family weddings and pilgrimages.",
                highlight: "Pushback luxury seats & LED TV",
              },
            ].map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <div
                  key={idx}
                  className="card"
                  style={{
                    background: "rgba(16, 31, 66, 0.6)",
                    backdropFilter: "blur(14px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#FFFFFF",
                    padding: "26px",
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  <div style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "10px",
                    background: "rgba(255,107,53,0.18)",
                    color: "var(--orange-500)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "18px"
                  }}>
                    <Icon size={24} />
                  </div>
                  <h3 className="heading-3" style={{ color: "#FFFFFF", marginBottom: "8px" }}>
                    {srv.title}
                  </h3>
                  <p style={{ color: "#94A3B8", fontSize: "0.875rem", lineHeight: 1.6, marginBottom: "16px" }}>
                    {srv.desc}
                  </p>
                  <div style={{
                    marginTop: "auto",
                    paddingTop: "14px",
                    borderTop: "1px solid rgba(255,255,255,0.08)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}>
                    <span style={{ fontSize: "0.75rem", color: "#F4BA46", fontWeight: 600 }}>
                      {srv.highlight}
                    </span>
                    <Link href={`/services/${srv.slug}`} style={{ color: "var(--orange-500)" }}>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* POPULAR HIGHWAY ROUTES */}
      <section className="section section-white" id="destinations">
        <div className="container">
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "46px",
            flexWrap: "wrap",
            gap: "20px"
          }}>
            <div>
              <span className="eyebrow">Western Express Corridor</span>
              <h2 className="heading-1" style={{ color: "var(--navy-900)" }}>
                Popular Routes From Vapi
              </h2>
              <p className="subheading">
                Transparent fares and verified distance guidelines for our most requested outstation destinations.
              </p>
            </div>
            <Link href="/destinations" className="btn btn-secondary">
              View All Routes &amp; Pricing <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid-3">
            {routes.map((rt) => (
              <div key={rt.id} className="card" style={{ overflow: "hidden" }}>
                <div style={{ position: "relative", height: "180px", width: "100%", background: "#0B132B" }}>
                  <Image
                    src={rt.imageUrl || "/images/hero-car.jpg"}
                    alt={`${rt.source} to ${rt.destination} Taxi`}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(180deg, transparent 40%, rgba(11,19,43,0.85) 100%)"
                  }} />
                  <div style={{
                    position: "absolute",
                    bottom: "12px",
                    left: "16px",
                    color: "#FFFFFF",
                    fontWeight: 700,
                    fontSize: "1.1rem"
                  }}>
                    {rt.source} &rarr; {rt.destination}
                  </div>
                </div>

                <div style={{ padding: "20px" }}>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.85rem",
                    color: "var(--text-muted)",
                    marginBottom: "14px"
                  }}>
                    <span>Distance: <strong>~{rt.distanceKm} km</strong></span>
                    <span>Duration: <strong>~{rt.durationHours}</strong></span>
                  </div>

                  <div style={{
                    background: "#F8FAFC",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px"
                  }}>
                    <div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Sedan (Dzire)</div>
                      <div style={{ fontWeight: 800, color: "var(--orange-600)", fontSize: "1.1rem" }}>
                        ₹{rt.sedanFare.toLocaleString("en-IN")}
                      </div>
                    </div>
                    <div style={{ borderLeft: "1px solid #E2E8F0", paddingLeft: "14px" }}>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>SUV (Innova/Ertiga)</div>
                      <div style={{ fontWeight: 800, color: "var(--navy-900)", fontSize: "1.1rem" }}>
                        ₹{rt.suvFare.toLocaleString("en-IN")}
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/book?destination=${encodeURIComponent(rt.destination)}`}
                    className="btn btn-primary"
                    style={{ width: "100%", padding: "10px", fontSize: "0.875rem" }}
                  >
                    Plan Your Journey <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS: 3-STEP JOURNEY */}
      <section className="section section-ivory">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <span className="eyebrow">Hassle-Free Process</span>
            <h2 className="heading-1" style={{ color: "var(--navy-900)" }}>
              How Laxmi Travels Works
            </h2>
            <p className="subheading" style={{ margin: "0 auto" }}>
              Experience the simplest 3-step car booking process with no false promises and fast chauffeur allocation.
            </p>
          </div>

          <div className="grid-3" style={{ position: "relative" }}>
            <div className="card" style={{ padding: "34px", textAlign: "center", position: "relative" }}>
              <div style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "var(--orange-500)",
                color: "#FFFFFF",
                fontSize: "1.25rem",
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                boxShadow: "var(--shadow-orange)"
              }}>
                1
              </div>
              <h3 className="heading-3" style={{ marginBottom: "10px", color: "var(--navy-900)" }}>
                Choose Your Trip
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                Enter your pickup landmark in Vapi, drop-off destination, and travel dates. Select One-Way, Round-Trip, or Airport Transfer.
              </p>
            </div>

            <div className="card" style={{ padding: "34px", textAlign: "center" }}>
              <div style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "var(--navy-900)",
                color: "#FFFFFF",
                fontSize: "1.25rem",
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px"
              }}>
                2
              </div>
              <h3 className="heading-3" style={{ marginBottom: "10px", color: "var(--navy-900)" }}>
                Select Your Car
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                Pick from Sedan (Dzire), Premium SUV (Innova Crysta), or Luxury car with transparent per-km rates and verified seating capacities.
              </p>
            </div>

            <div className="card" style={{ padding: "34px", textAlign: "center" }}>
              <div style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "#22C55E",
                color: "#FFFFFF",
                fontSize: "1.25rem",
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px"
              }}>
                3
              </div>
              <h3 className="heading-3" style={{ marginBottom: "10px", color: "var(--navy-900)" }}>
                Confirm Your Journey
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                Receive immediate reference ID. Our team confirms availability and assigns your driver plate number. Pay online or cash to driver.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GENUINE CUSTOMER REVIEWS */}
      <section className="section section-white" id="reviews">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span className="eyebrow">Real Experiences</span>
            <h2 className="heading-1" style={{ color: "var(--navy-900)", marginBottom: "14px" }}>
              What Our Travellers Say About Us
            </h2>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              background: "#F8FAFC",
              padding: "8px 20px",
              borderRadius: "30px",
              fontSize: "0.95rem"
            }}>
              <span style={{ display: "flex", gap: "2px", color: "#F4BA46" }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="#F4BA46" />
                ))}
              </span>
              <strong style={{ color: "var(--navy-900)" }}>4.9 / 5</strong>
              <span style={{ color: "var(--text-muted)" }}>Based on 146+ Google Reviews</span>
            </div>
          </div>

          <div className="grid-3">
            {reviews.map((rev) => (
              <div key={rev.id} className="card" style={{ padding: "28px", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                  <div style={{ display: "flex", gap: "2px", color: "#F4BA46" }}>
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="#F4BA46" />
                    ))}
                  </div>
                  <span style={{
                    fontSize: "0.75rem",
                    color: "#16A34A",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: "4px"
                  }}>
                    <CheckCircle2 size={12} /> Google Verified
                  </span>
                </div>

                <p style={{
                  color: "var(--navy-900)",
                  fontSize: "0.925rem",
                  lineHeight: 1.6,
                  fontStyle: "italic",
                  marginBottom: "20px",
                  flexGrow: 1
                }}>
                  &ldquo;{rev.comment}&rdquo;
                </p>

                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  borderTop: "1px solid #F1F5F9",
                  paddingTop: "14px"
                }}>
                  <div style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    background: "var(--navy-900)",
                    color: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "1rem"
                  }}>
                    {rev.authorName.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: "var(--navy-900)", fontSize: "0.925rem" }}>
                      {rev.authorName}
                    </div>
                    <div style={{ fontSize: "0.775rem", color: "var(--text-muted)" }}>
                      {rev.tripRoute || rev.authorLocation}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "36px" }}>
            <Link href="/contact#leave-review" className="btn btn-secondary">
              Submit Your Trip Review <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* PROMOTIONAL OFFERS BANNER */}
      {offers.length > 0 && (
        <section className="section section-navy-gradient" style={{ padding: "60px 0" }}>
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "36px" }}>
              <span className="eyebrow" style={{ color: "#F4BA46" }}>Special Highway Savings</span>
              <h2 className="heading-2" style={{ color: "#FFFFFF" }}>
                Active Offers &amp; Promo Codes
              </h2>
            </div>

            <div className="grid-3">
              {offers.map((offer) => (
                <div
                  key={offer.id}
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px dashed rgba(255,255,255,0.25)",
                    borderRadius: "14px",
                    padding: "24px",
                    color: "#FFFFFF"
                  }}
                >
                  <div style={{
                    display: "inline-block",
                    background: "var(--orange-500)",
                    color: "#FFFFFF",
                    fontWeight: 800,
                    fontSize: "0.85rem",
                    padding: "4px 12px",
                    borderRadius: "6px",
                    marginBottom: "12px",
                    letterSpacing: "0.08em"
                  }}>
                    CODE: {offer.code}
                  </div>
                  <h3 className="heading-3" style={{ color: "#FFFFFF", marginBottom: "8px" }}>
                    {offer.title}
                  </h3>
                  <p style={{ color: "#CBD5E1", fontSize: "0.85rem", lineHeight: 1.5, marginBottom: "14px" }}>
                    {offer.description}
                  </p>
                  <div style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                    Valid until {offer.validUntil} &bull; Apply in booking widget
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FINAL CALL TO ACTION */}
      <section className="section" style={{
        background: "linear-gradient(135deg, #0B132B 0%, #162450 100%)",
        color: "#FFFFFF",
        textAlign: "center",
        padding: "80px 0"
      }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          <span className="eyebrow" style={{ color: "var(--orange-500)" }}>Ready To Ride?</span>
          <h2 className="heading-1" style={{ color: "#FFFFFF", marginBottom: "20px" }}>
            Experience Trusted Car Travel From Vapi
          </h2>
          <p style={{ color: "#E2E8F0", fontSize: "1.1rem", lineHeight: 1.6, marginBottom: "32px" }}>
            Book your sanitized car with Laxmi Travels now. Instant assistance for emergency airport runs, outstation tours, and corporate chauffeuring.
          </p>

          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#booking-panel" className="btn btn-primary" style={{ padding: "14px 30px" }}>
              Book Your Car Now <ArrowRight size={18} />
            </a>
            <a
              href="https://wa.me/7255055889?text=Hi+Laxmi+Travels%2C+I+need+a+cab+right+now."
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp"
              style={{ padding: "14px 28px" }}
            >
              <MessageSquare size={18} /> WhatsApp Concierge
            </a>
            <a href="tel:+917255055889" className="btn btn-call" style={{ padding: "14px 26px" }}>
              <Phone size={18} /> Call +91 7255055889
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
