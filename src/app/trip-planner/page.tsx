"use client";

import React, { useState } from "react";
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Users, 
  Car, 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  MessageSquare,
  Plus,
  Trash2
} from "lucide-react";
import confetti from "canvas-confetti";

export default function TripPlannerPage() {
  const [stops, setStops] = useState<string[]>(["Vapi (Pickup)", "Daman Beach", "Saputara Hill Station"]);
  const [newStop, setNewStop] = useState("");
  const [startDate, setStartDate] = useState("");
  const [durationDays, setDurationDays] = useState(3);
  const [passengerCount, setPassengerCount] = useState(4);
  const [vehicleCategory, setVehicleCategory] = useState("PREMIUM_SUV");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [specialNotes, setSpecialNotes] = useState("");
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addStop = () => {
    if (newStop.trim()) {
      setStops([...stops, newStop.trim()]);
      setNewStop("");
    }
  };

  const removeStop = (index: number) => {
    if (stops.length > 2) {
      setStops(stops.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      tripType: "CUSTOM_ROAD_TRIP",
      customerName,
      customerPhone,
      pickupLocation: stops[0] || "Vapi",
      dropLocation: stops.slice(1).join(" -> "),
      pickupDate: startDate || new Date().toISOString().split("T")[0],
      pickupTime: "08:00",
      passengerCount,
      vehicleCategory,
      vehicleName: vehicleCategory === "PREMIUM_SUV" ? "Toyota Innova Crysta" : "Multi-Stop Road Car",
      specialInstructions: `Multi-Stop Custom Itinerary (${durationDays} Days): ${stops.join(" -> ")}. Notes: ${specialNotes}`,
      baseFare: 0,
      totalFare: 0, // Quote Pending
    };

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit itinerary");

      setSubmittedRef(data.bookingRef);
      confetti({ particleCount: 70, spread: 60 });
    } catch (err: any) {
      alert(err.message || "Failed to submit");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ paddingTop: "40px", paddingBottom: "80px" }}>
      {/* Banner */}
      <section className="section section-dark" style={{ padding: "60px 0" }}>
        <div className="container" style={{ maxWidth: "800px", textAlign: "center" }}>
          <span className="eyebrow" style={{ color: "var(--orange-500)" }}>Bespoke Travel Engineering</span>
          <h1 className="heading-display" style={{ marginBottom: "16px", color: "#FFFFFF" }}>
            Customized Road Trip Planner
          </h1>
          <p style={{ color: "#E2E8F0", fontSize: "1.1rem", lineHeight: 1.6 }}>
            Design your own multi-destination road trip with seasoned highway chauffeurs, comfortable private vehicles, and personalized quotes.
          </p>
        </div>
      </section>

      <div className="container" style={{ marginTop: "50px", maxWidth: "900px" }}>
        {submittedRef ? (
          <div className="card" style={{ padding: "40px", textAlign: "center" }}>
            <div style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              background: "rgba(34,197,94,0.15)",
              color: "#22C55E",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px"
            }}>
              <CheckCircle2 size={38} />
            </div>

            <h2 className="heading-2" style={{ color: "var(--navy-900)", marginBottom: "12px" }}>
              Custom Road Trip Itinerary Received!
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.6, marginBottom: "24px" }}>
              Quotation Request Reference: <strong style={{ color: "var(--orange-600)" }}>{submittedRef}</strong>
              <br />
              Our travel manager is calculating your route kilometers, optimal hill-climb paths, and vehicle availability. We will call you at <strong>{customerPhone}</strong> shortly with your guaranteed quotation.
            </p>

            <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
              <a
                href={`https://wa.me/7255055889?text=Hello+Laxmi+Travels%2C+I+submitted+custom+itinerary+quote+ref+${submittedRef}.`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-whatsapp"
              >
                <MessageSquare size={16} /> WhatsApp Travel Manager
              </a>
              <button
                onClick={() => setSubmittedRef(null)}
                className="btn btn-secondary"
              >
                Plan Another Itinerary
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="card" style={{ padding: "40px" }}>
            <h2 className="heading-2" style={{ color: "var(--navy-900)", marginBottom: "8px" }}>
              Build Your Itinerary
            </h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "26px", fontSize: "0.95rem" }}>
              Add multiple destinations in order. You can include hill stations, beach halts, temples, or industrial stops.
            </p>

            {/* Stops list */}
            <div style={{ marginBottom: "24px" }}>
              <label className="form-label" style={{ marginBottom: "10px", display: "block" }}>
                Route Stops &amp; Destinations
              </label>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "14px" }}>
                {stops.map((stop, i) => (
                  <div key={i} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    background: "#F8FAFC",
                    padding: "10px 16px",
                    borderRadius: "8px",
                    border: "1px solid #E2E8F0"
                  }}>
                    <span style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      background: i === 0 ? "var(--orange-500)" : "var(--navy-900)",
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.75rem",
                      fontWeight: 700
                    }}>
                      {i + 1}
                    </span>
                    <span style={{ flexGrow: 1, fontWeight: 600, color: "var(--navy-900)" }}>{stop}</span>
                    {stops.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeStop(i)}
                        style={{ color: "#EF4444", padding: "4px" }}
                        title="Remove stop"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Add stop input */}
              <div style={{ display: "flex", gap: "10px" }}>
                <input
                  type="text"
                  placeholder="Add another stop (e.g. Statue of Unity, Surat, Devka Beach...)"
                  value={newStop}
                  onChange={(e) => setNewStop(e.target.value)}
                  className="form-input"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addStop();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={addStop}
                  className="btn btn-secondary"
                  style={{ padding: "0 20px" }}
                >
                  <Plus size={16} /> Add Stop
                </button>
              </div>
            </div>

            {/* Dates & Duration */}
            <div className="grid-3" style={{ marginBottom: "24px" }}>
              <div className="form-group">
                <label className="form-label">Tentative Start Date</label>
                <input
                  type="date"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Tour Duration (Days)</label>
                <select
                  value={durationDays}
                  onChange={(e) => setDurationDays(Number(e.target.value))}
                  className="form-select"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 10, 14].map((d) => (
                    <option key={d} value={d}>{d} Day{d > 1 ? "s" : ""}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Total Travellers</label>
                <select
                  value={passengerCount}
                  onChange={(e) => setPassengerCount(Number(e.target.value))}
                  className="form-select"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15].map((p) => (
                    <option key={p} value={p}>{p} Passengers</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Vehicle Preference */}
            <div style={{ marginBottom: "24px" }}>
              <label className="form-label" style={{ marginBottom: "8px", display: "block" }}>
                Preferred Vehicle
              </label>
              <div className="grid-4" style={{ gap: "10px" }}>
                {[
                  { id: "SEDAN", name: "Sedan (Dzire)", seats: "4 Pax" },
                  { id: "SUV", name: "SUV (Ertiga)", seats: "6 Pax" },
                  { id: "PREMIUM_SUV", name: "Premium SUV (Innova)", seats: "7 Pax" },
                  { id: "TEMPO_TRAVELLER", name: "Tempo Traveller", seats: "15 Pax" },
                ].map((v) => (
                  <div
                    key={v.id}
                    onClick={() => setVehicleCategory(v.id)}
                    style={{
                      border: vehicleCategory === v.id ? "2px solid var(--orange-500)" : "1px solid #E2E8F0",
                      background: vehicleCategory === v.id ? "rgba(255,107,53,0.06)" : "#FFFFFF",
                      padding: "12px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      textAlign: "center"
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--navy-900)" }}>{v.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{v.seats}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid-2" style={{ marginBottom: "24px" }}>
              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anand Mehta"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Mobile / WhatsApp Number</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9825012345"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: "28px" }}>
              <label className="form-label">Special Requests / Preferences</label>
              <textarea
                rows={3}
                placeholder="Mention any senior citizen needs, infant seating, sightseeing interests, or hotel drop-offs..."
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                className="form-textarea"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary"
              style={{ width: "100%", padding: "14px", fontSize: "1rem" }}
            >
              {isSubmitting ? "Submitting Itinerary..." : "Request Tailored Itinerary & Quotation"} <ArrowRight size={18} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
