import React from "react";
import Link from "next/link";
import { ArrowRight, Phone, MessageSquare } from "lucide-react";

export const metadata = {
  title: "Cancellation Policy | Laxmi Travels Vapi",
  description: "Clear and fair booking cancellation policy for car travel and taxis at Laxmi Travels, Vapi.",
};

export default function CancellationPolicyPage() {
  return (
    <div style={{ paddingTop: "40px", paddingBottom: "80px", background: "var(--ivory-100)" }}>
      <div className="container" style={{ maxWidth: "860px" }}>
        <div className="card" style={{ padding: "40px" }}>
          <span className="eyebrow">Fair &amp; Transparent</span>
          <h1 className="heading-1" style={{ color: "var(--navy-900)", marginBottom: "20px" }}>
            Cancellation Policy
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "30px" }}>
            Laxmi Travels, Vapi, Gujarat &bull; Last updated: October 2026
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px", color: "var(--text-dark)", lineHeight: 1.8 }}>
            <section>
              <h2 className="heading-3" style={{ color: "var(--navy-900)", marginBottom: "8px" }}>
                1. Free Cancellation Window
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                We understand that travel plans can change unexpectedly. Customers may cancel or reschedule their car booking with <strong>zero cancellation fee</strong> if requested at least <strong>6 hours before the scheduled pickup time</strong>.
              </p>
            </section>

            <section>
              <h2 className="heading-3" style={{ color: "var(--navy-900)", marginBottom: "8px" }}>
                2. Late Cancellation (Within 6 Hours)
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                If a booking is cancelled within 6 hours of the scheduled departure time, or if the driver has already been dispatched from our garage to your pickup location, a nominal dispatch fee of ₹300 to ₹500 may be deducted to compensate the chauffeur for fuel and dead mileage.
              </p>
            </section>

            <section>
              <h2 className="heading-3" style={{ color: "var(--navy-900)", marginBottom: "8px" }}>
                3. No-Show Policy
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                If the passenger fails to appear within 60 minutes of the scheduled pickup time without prior notice and cannot be contacted via phone, the trip will be marked as a &ldquo;Customer No-Show&rdquo; and any advance deposit will be non-refundable.
              </p>
            </section>

            <section>
              <h2 className="heading-3" style={{ color: "var(--navy-900)", marginBottom: "8px" }}>
                4. Cancellation by Laxmi Travels (Rare Event)
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                In the rare event of severe vehicle breakdown, extreme natural weather alerts, or road closures where we cannot deploy a substitute vehicle, Laxmi Travels will issue a 100% immediate full refund of any amounts paid.
              </p>
            </section>

            <section>
              <h2 className="heading-3" style={{ color: "var(--navy-900)", marginBottom: "8px" }}>
                5. How to Request Cancellation
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                You can request a cancellation directly through the &ldquo;My Bookings&rdquo; portal on your booking page, or by contacting our 24x7 desk at <strong>+91 7255055889</strong>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
