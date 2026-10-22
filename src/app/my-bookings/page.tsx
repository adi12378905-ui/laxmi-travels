"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Search, 
  Car, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  ShieldCheck
} from "lucide-react";

export default function MyBookingsPage() {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState<"ref" | "phone">("ref");
  const [results, setResults] = useState<any[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setSearched(true);

    try {
      const url = searchType === "ref" 
        ? `/api/bookings?ref=${encodeURIComponent(query.trim())}`
        : `/api/bookings?phone=${encodeURIComponent(query.trim())}`;

      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to find bookings");

      if (data.booking) {
        setResults([data.booking]);
      } else if (data.bookings) {
        setResults(data.bookings);
      } else {
        setResults([]);
      }
    } catch (err: any) {
      setError(err.message || "Failed to search bookings");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: "40px", paddingBottom: "80px", background: "var(--ivory-100)" }}>
      {/* Banner */}
      <section className="section section-dark" style={{ padding: "60px 0" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: "800px" }}>
          <span className="eyebrow" style={{ color: "var(--orange-500)" }}>Self-Service Travel Desk</span>
          <h1 className="heading-display" style={{ marginBottom: "14px", color: "#FFFFFF" }}>
            My Car Bookings &amp; Status
          </h1>
          <p style={{ color: "#E2E8F0", fontSize: "1.1rem" }}>
            Track your car allocation, view driver details, review quotations, or make an online payment.
          </p>
        </div>
      </section>

      <div className="container" style={{ marginTop: "40px", maxWidth: "840px" }}>
        {/* Search Card */}
        <div className="card" style={{ padding: "30px", marginBottom: "40px" }}>
          <form onSubmit={handleSearch}>
            <div style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", fontWeight: 600, fontSize: "0.9rem" }}>
                <input
                  type="radio"
                  name="searchType"
                  checked={searchType === "ref"}
                  onChange={() => setSearchType("ref")}
                />
                Search by Booking Reference (e.g. LT-2026-1042)
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", fontWeight: 600, fontSize: "0.9rem" }}>
                <input
                  type="radio"
                  name="searchType"
                  checked={searchType === "phone"}
                  onChange={() => setSearchType("phone")}
                />
                Search by Mobile Number
              </label>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <input
                type="text"
                required
                placeholder={searchType === "ref" ? "Enter booking reference (e.g. LT-2026-1042)" : "Enter 10-digit mobile number"}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="form-input"
                style={{ fontSize: "1rem", padding: "12px 18px" }}
              />
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{ padding: "0 24px" }}
              >
                <Search size={18} /> {loading ? "Searching..." : "Track"}
              </button>
            </div>
          </form>
        </div>

        {/* Results */}
        {error && (
          <div style={{
            background: "#FEE2E2",
            color: "#B91C1C",
            padding: "16px",
            borderRadius: "10px",
            marginBottom: "30px",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}>
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        {searched && !loading && results.length === 0 && !error && (
          <div className="card" style={{ padding: "40px", textAlign: "center" }}>
            <h3 className="heading-3" style={{ color: "var(--navy-900)", marginBottom: "8px" }}>
              No Bookings Found
            </h3>
            <p style={{ color: "var(--text-muted)", marginBottom: "20px" }}>
              We could not find any car bookings matching &quot;{query}&quot;. Please verify your reference number or mobile number.
            </p>
            <Link href="/book" className="btn btn-primary">
              Book a New Car
            </Link>
          </div>
        )}

        {results.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <h2 className="heading-3" style={{ color: "var(--navy-900)" }}>
              Found {results.length} Booking{results.length > 1 ? "s" : ""}
            </h2>

            {results.map((b) => (
              <div key={b.id} className="card" style={{ padding: "24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px", flexWrap: "wrap", gap: "10px" }}>
                  <div>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Reference Code</span>
                    <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--orange-600)" }}>
                      {b.bookingRef}
                    </div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <span className="badge-tag" style={{ background: "rgba(11,19,43,0.1)", color: "var(--navy-900)" }}>
                      {b.status.replace(/_/g, " ")}
                    </span>
                    <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--navy-900)", marginTop: "4px" }}>
                      ₹{b.totalFare?.toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>

                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                  fontSize: "0.875rem",
                  marginBottom: "16px",
                  background: "#F8FAFC",
                  padding: "14px",
                  borderRadius: "8px"
                }}>
                  <div>
                    <span style={{ color: "var(--text-muted)", display: "block" }}>Pickup:</span>
                    <strong>{b.pickupLocation}</strong>
                  </div>
                  <div>
                    <span style={{ color: "var(--text-muted)", display: "block" }}>Destination:</span>
                    <strong>{b.dropLocation}</strong>
                  </div>
                  <div>
                    <span style={{ color: "var(--text-muted)", display: "block" }}>Date &amp; Time:</span>
                    <strong>{b.pickupDate} at {b.pickupTime}</strong>
                  </div>
                  <div>
                    <span style={{ color: "var(--text-muted)", display: "block" }}>Vehicle:</span>
                    <strong>{b.vehicleCategory?.replace(/_/g, " ")}</strong>
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.825rem", color: b.paymentStatus === "PAID" ? "#16A34A" : "#CA8A04", fontWeight: 600 }}>
                    Payment: {b.paymentStatus === "PAID" ? "✓ Paid" : "Pending"}
                  </span>
                  <Link href={`/bookings/${b.bookingRef}`} className="btn btn-primary" style={{ padding: "8px 16px", fontSize: "0.85rem" }}>
                    View Details &amp; Voucher <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
