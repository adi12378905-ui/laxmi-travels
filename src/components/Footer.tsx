import React from "react";
import Link from "next/link";
import { 
  Car, 
  Phone, 
  MapPin, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Award, 
  CreditCard,
  ChevronRight,
  ExternalLink
} from "lucide-react";

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer style={{
      background: "#050B1A",
      color: "#CBD5E1",
      borderTop: "1px solid rgba(255,255,255,0.08)",
      paddingTop: "70px",
      paddingBottom: "30px",
      fontSize: "0.92rem"
    }}>
      <div className="container">
        {/* Top Feature Bar */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "24px",
          paddingBottom: "48px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          marginBottom: "50px"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "rgba(255,107,53,0.15)",
              color: "#FF6B35",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}>
              <Award size={24} />
            </div>
            <div>
              <div style={{ color: "#FFFFFF", fontWeight: 700, fontSize: "1rem" }}>4.9 / 5 Google Rated</div>
              <div style={{ fontSize: "0.8rem", color: "#94A3B8" }}>146+ Verified customer reviews in Vapi</div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "rgba(34,197,94,0.15)",
              color: "#22C55E",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <div style={{ color: "#FFFFFF", fontWeight: 700, fontSize: "1rem" }}>100% Verified Chauffeurs</div>
              <div style={{ fontSize: "0.8rem", color: "#94A3B8" }}>Courteous, punctual, highway trained</div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "rgba(2,132,199,0.15)",
              color: "#38BDF8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}>
              <Clock size={24} />
            </div>
            <div>
              <div style={{ color: "#FFFFFF", fontWeight: 700, fontSize: "1rem" }}>24x7 Reliable Pickups</div>
              <div style={{ fontSize: "0.8rem", color: "#94A3B8" }}>Doorstep pickup anytime day or night</div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "rgba(244,186,70,0.15)",
              color: "#F4BA46",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}>
              <CreditCard size={24} />
            </div>
            <div>
              <div style={{ color: "#FFFFFF", fontWeight: 700, fontSize: "1rem" }}>Transparent Fares</div>
              <div style={{ fontSize: "0.8rem", color: "#94A3B8" }}>No hidden surge pricing, clear receipts</div>
            </div>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "40px",
          marginBottom: "60px"
        }}>
          {/* Column 1: Brand Info */}
          <div style={{ maxWidth: "320px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <div style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #FF6B35 0%, #D95D00 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF"
              }}>
                <Car size={22} />
              </div>
              <span style={{ fontSize: "1.3rem", fontWeight: 800, color: "#FFFFFF" }}>
                LAXMI <span style={{ color: "#FF6B35" }}>TRAVELS</span>
              </span>
            </div>
            <p style={{ fontStyle: "italic", color: "#F4BA46", marginBottom: "14px", fontWeight: 600 }}>
              &ldquo;Every Journey Begins With Trust.&rdquo;
            </p>
            <p style={{ color: "#94A3B8", fontSize: "0.875rem", lineHeight: 1.6, marginBottom: "20px" }}>
              Vapi&apos;s premier car travel agency specializing exclusively in comfortable taxis, airport transfers, executive car rentals, and customized Gujarat &amp; Maharashtra road trips.
            </p>
            <div style={{
              display: "inline-block",
              background: "rgba(255,255,255,0.05)",
              padding: "6px 12px",
              borderRadius: "6px",
              fontSize: "0.775rem",
              border: "1px solid rgba(255,255,255,0.1)"
            }}>
              🚗 Car Travel Agency Only (No Bus / Airline Tickets)
            </div>
          </div>

          {/* Column 2: Car Services */}
          <div>
            <h4 style={{ color: "#FFFFFF", fontSize: "1.05rem", fontWeight: 700, marginBottom: "18px" }}>
              Car Services
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              <li>
                <Link href="/services/airport-transfers" style={{ color: "#94A3B8", transition: "color 0.2s" }} className="footer-link">
                  Airport Transfers (Mumbai / Surat)
                </Link>
              </li>
              <li>
                <Link href="/services/one-way-taxi" style={{ color: "#94A3B8", transition: "color 0.2s" }} className="footer-link">
                  One-Way Intercity Taxi
                </Link>
              </li>
              <li>
                <Link href="/services/round-trip-taxi" style={{ color: "#94A3B8", transition: "color 0.2s" }} className="footer-link">
                  Round-Trip Outstation Cars
                </Link>
              </li>
              <li>
                <Link href="/services/local-rental" style={{ color: "#94A3B8", transition: "color 0.2s" }} className="footer-link">
                  Local Vapi &amp; GIDC Car Rental
                </Link>
              </li>
              <li>
                <Link href="/services/hourly-rental" style={{ color: "#94A3B8", transition: "color 0.2s" }} className="footer-link">
                  Hourly &amp; Full-Day Packages
                </Link>
              </li>
              <li>
                <Link href="/services/corporate-travel" style={{ color: "#94A3B8", transition: "color 0.2s" }} className="footer-link">
                  Corporate Chauffeur Travel
                </Link>
              </li>
              <li>
                <Link href="/services/road-trips" style={{ color: "#94A3B8", transition: "color 0.2s" }} className="footer-link">
                  Customized Road Trips (Saputara / Daman)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Popular Routes */}
          <div>
            <h4 style={{ color: "#FFFFFF", fontSize: "1.05rem", fontWeight: 700, marginBottom: "18px" }}>
              Popular Highway Routes
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              <li>
                <Link href="/destinations#vapi-surat" style={{ color: "#94A3B8" }} className="footer-link">
                  Vapi to Surat Taxi (~115 km)
                </Link>
              </li>
              <li>
                <Link href="/destinations#vapi-mumbai" style={{ color: "#94A3B8" }} className="footer-link">
                  Vapi to Mumbai Airport (~170 km)
                </Link>
              </li>
              <li>
                <Link href="/destinations#vapi-ahmedabad" style={{ color: "#94A3B8" }} className="footer-link">
                  Vapi to Ahmedabad (~375 km)
                </Link>
              </li>
              <li>
                <Link href="/destinations#vapi-vadodara" style={{ color: "#94A3B8" }} className="footer-link">
                  Vapi to Vadodara (~265 km)
                </Link>
              </li>
              <li>
                <Link href="/destinations#vapi-daman" style={{ color: "#94A3B8" }} className="footer-link">
                  Vapi to Daman Beach (~14 km)
                </Link>
              </li>
              <li>
                <Link href="/destinations#vapi-saputara" style={{ color: "#94A3B8" }} className="footer-link">
                  Vapi to Saputara Hill Station (~125 km)
                </Link>
              </li>
              <li>
                <Link href="/destinations#vapi-shirdi" style={{ color: "#94A3B8" }} className="footer-link">
                  Vapi to Shirdi Sai Baba (~225 km)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Office */}
          <div>
            <h4 style={{ color: "#FFFFFF", fontSize: "1.05rem", fontWeight: 700, marginBottom: "18px" }}>
              Reach Our Office
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <MapPin size={18} style={{ color: "#FF6B35", flexShrink: 0, marginTop: "2px" }} />
                <span style={{ color: "#94A3B8", fontSize: "0.85rem", lineHeight: 1.5 }}>
                  PL. NO. C/6-2/13, SHOP G/04, N.H. 8, Vapi, Taluka - Pardi, Gujarat 396191
                </span>
              </div>

              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <Phone size={18} style={{ color: "#FF6B35", flexShrink: 0 }} />
                <a href="tel:+917255055889" style={{ color: "#FFFFFF", fontWeight: 700 }}>
                  +91 7255055889
                </a>
              </div>

              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <Clock size={18} style={{ color: "#22C55E", flexShrink: 0 }} />
                <span style={{ color: "#94A3B8", fontSize: "0.85rem" }}>
                  Available 24 Hours • 7 Days
                </span>
              </div>

              <div style={{ marginTop: "12px", display: "flex", gap: "8px" }}>
                <a
                  href="https://wa.me/7255055889?text=Hi+Laxmi+Travels%2C+I+would+like+to+inquire+about+car+booking."
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-whatsapp"
                  style={{ padding: "8px 16px", fontSize: "0.8rem", borderRadius: "6px" }}
                >
                  WhatsApp Now
                </a>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Google&query_place_id=ChIJq6oWBMrP4DsRb7En3A3s2Fk"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-white"
                  style={{ padding: "8px 14px", fontSize: "0.8rem", borderRadius: "6px" }}
                >
                  <MapPin size={14} /> Map
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: "24px",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
          fontSize: "0.825rem",
          color: "#64748B"
        }}>
          <div>
            &copy; {currentYear} Laxmi Travels, Vapi. All rights reserved. &bull; Tagline: <em>&ldquo;Every Journey Begins With Trust.&rdquo;</em>
          </div>

          <div style={{ display: "flex", gap: "18px", flexWrap: "wrap" }}>
            <Link href="/privacy-policy" style={{ color: "#94A3B8" }}>Privacy Policy</Link>
            <Link href="/terms" style={{ color: "#94A3B8" }}>Terms &amp; Conditions</Link>
            <Link href="/cancellation-policy" style={{ color: "#94A3B8" }}>Cancellation Policy</Link>
            <Link href="/refund-policy" style={{ color: "#94A3B8" }}>Refund Policy</Link>
            <Link href="/admin" style={{ color: "#FF6B35", fontWeight: 600 }}>Staff Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
