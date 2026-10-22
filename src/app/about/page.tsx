import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ShieldCheck, 
  Award, 
  MapPin, 
  Phone, 
  Clock, 
  Users, 
  Car, 
  CheckCircle2, 
  Compass,
  ArrowRight
} from "lucide-react";

export const metadata = {
  title: "About Us | Laxmi Travels Vapi",
  description: "Learn about Laxmi Travels, Vapi's trusted car travel agency on N.H. 8. Our mission, certified chauffeurs, fleet standards, and commitment to passenger safety.",
};

export default function AboutPage() {
  return (
    <div style={{ paddingTop: "40px", paddingBottom: "80px" }}>
      {/* Header Banner */}
      <section className="section section-dark" style={{ padding: "60px 0" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: "800px" }}>
          <span className="eyebrow" style={{ color: "var(--orange-500)" }}>Our Story &amp; Values</span>
          <h1 className="heading-display" style={{ marginBottom: "16px", color: "#FFFFFF" }}>
            Every Journey Begins With Trust.
          </h1>
          <p style={{ color: "#E2E8F0", fontSize: "1.1rem", lineHeight: 1.6 }}>
            Founded in Vapi, Gujarat, Laxmi Travels is exclusively dedicated to providing safe, dependable, and comfortable car transportation across Western India.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container" style={{ marginTop: "60px" }}>
        <div className="grid-2" style={{ gap: "50px", alignItems: "center", marginBottom: "80px" }}>
          <div>
            <span className="eyebrow">Exclusively Car Travel</span>
            <h2 className="heading-1" style={{ color: "var(--navy-900)", marginBottom: "20px" }}>
              Focused Solely on Highway &amp; City Car Excellence
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "16px" }}>
              Unlike generic ticketing agents that sell bus seats and flights, Laxmi Travels was built from the ground up as a specialized car fleet operator. We believe that true travel comfort comes from personalized chauffeur care, clean vehicles, and complete control over your schedule.
            </p>
            <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "24px" }}>
              Headquartered right on National Highway 8 in Vapi (Taluka Pardi), our strategic location allows our cars to reach Vapi GIDC, Daman, Silvassa, and Mumbai express corridors swiftly, guaranteeing on-time service 24 hours a day, 7 days a week.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <CheckCircle2 size={20} style={{ color: "#22C55E" }} />
                <strong>100% Commercial Fleet</strong>
              </div>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <CheckCircle2 size={20} style={{ color: "#22C55E" }} />
                <strong>Police Verified Drivers</strong>
              </div>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <CheckCircle2 size={20} style={{ color: "#22C55E" }} />
                <strong>Zero Hidden Charges</strong>
              </div>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <CheckCircle2 size={20} style={{ color: "#22C55E" }} />
                <strong>24x7 Emergency Help</strong>
              </div>
            </div>
          </div>

          <div style={{ position: "relative", height: "420px", borderRadius: "16px", overflow: "hidden", boxShadow: "var(--shadow-xl)" }}>
            <Image
              src="/images/hero-car.jpg"
              alt="Laxmi Travels highway car"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

        {/* 4 Pillars of Laxmi Travels */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <span className="eyebrow">Our Guiding Pillars</span>
          <h2 className="heading-1" style={{ color: "var(--navy-900)" }}>
            What Sets Our Car Travel Apart
          </h2>
        </div>

        <div className="grid-4" style={{ marginBottom: "80px" }}>
          <div className="card" style={{ padding: "30px", textAlign: "center" }}>
            <div style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "rgba(255,107,53,0.12)",
              color: "var(--orange-500)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px"
            }}>
              <ShieldCheck size={28} />
            </div>
            <h3 className="heading-3" style={{ marginBottom: "10px", color: "var(--navy-900)" }}>
              Safety First
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", lineHeight: 1.6 }}>
              Dual airbags, speed compliance on national expressways, well-tested brakes, and seatbelts for all passengers.
            </p>
          </div>

          <div className="card" style={{ padding: "30px", textAlign: "center" }}>
            <div style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "rgba(34,197,94,0.12)",
              color: "#22C55E",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px"
            }}>
              <Clock size={28} />
            </div>
            <h3 className="heading-3" style={{ marginBottom: "10px", color: "var(--navy-900)" }}>
              Unmatched Punctuality
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", lineHeight: 1.6 }}>
              We know flight gates and business meetings do not wait. We track flight delays and traffic conditions proactively.
            </p>
          </div>

          <div className="card" style={{ padding: "30px", textAlign: "center" }}>
            <div style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "rgba(2,132,199,0.12)",
              color: "#0284C7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px"
            }}>
              <Users size={28} />
            </div>
            <h3 className="heading-3" style={{ marginBottom: "10px", color: "var(--navy-900)" }}>
              Chauffeur Courtesy
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", lineHeight: 1.6 }}>
              Our chauffeurs are soft-spoken, non-intrusive, well-attired, and always assist with luggage loading and unloading.
            </p>
          </div>

          <div className="card" style={{ padding: "30px", textAlign: "center" }}>
            <div style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "rgba(244,186,70,0.12)",
              color: "#F4BA46",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px"
            }}>
              <Award size={28} />
            </div>
            <h3 className="heading-3" style={{ marginBottom: "10px", color: "var(--navy-900)" }}>
              Fair &amp; Honest Fares
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", lineHeight: 1.6 }}>
              Standard per-km rates with pre-calculated toll estimates. No dynamic peak surges, no driver refusal.
            </p>
          </div>
        </div>

        {/* Office & Contact Box */}
        <div style={{
          background: "var(--navy-900)",
          color: "#FFFFFF",
          borderRadius: "16px",
          padding: "40px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "30px",
          alignItems: "center"
        }}>
          <div>
            <span className="eyebrow" style={{ color: "var(--orange-500)" }}>Visit Our Registered Office</span>
            <h3 className="heading-2" style={{ color: "#FFFFFF", marginBottom: "12px" }}>
              Laxmi Travels — Vapi, Gujarat
            </h3>
            <p style={{ color: "#94A3B8", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "16px" }}>
              PL. NO. C/6-2/13, SHOP G/04, N.H. 8, Vapi, Taluka - Pardi, Vapi, Gujarat 396191
            </p>
            <div style={{ color: "#F4BA46", fontWeight: 700, fontSize: "1.1rem" }}>
              Helpline: +91 7255055889 (24 Hours Open)
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "flex-start" }}>
            <Link href="/book" className="btn btn-primary" style={{ width: "100%", padding: "12px" }}>
              Book Your Car Now <ArrowRight size={18} />
            </Link>
            <a
              href="https://wa.me/7255055889"
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp"
              style={{ width: "100%", padding: "12px" }}
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
