import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Refund Policy | Laxmi Travels Vapi",
  description: "Details on refund timelines, Razorpay reversals, and eligibility at Laxmi Travels, Vapi.",
};

export default function RefundPolicyPage() {
  return (
    <div style={{ paddingTop: "40px", paddingBottom: "80px", background: "var(--ivory-100)" }}>
      <div className="container" style={{ maxWidth: "860px" }}>
        <div className="card" style={{ padding: "40px" }}>
          <span className="eyebrow">Payment Guarantees</span>
          <h1 className="heading-1" style={{ color: "var(--navy-900)", marginBottom: "20px" }}>
            Refund Policy
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "30px" }}>
            Laxmi Travels, Vapi, Gujarat &bull; Last updated: October 2026
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px", color: "var(--text-dark)", lineHeight: 1.8 }}>
            <section>
              <h2 className="heading-3" style={{ color: "var(--navy-900)", marginBottom: "8px" }}>
                1. Refund Eligibility
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                Refunds are applicable on pre-paid car travel bookings in the following scenarios:
              </p>
              <ul style={{ paddingLeft: "20px", color: "var(--text-muted)", fontSize: "0.95rem", marginTop: "6px" }}>
                <li>Booking cancelled prior to the 6-hour departure cut-off window.</li>
                <li>Excess advance deposit received above verified actual toll/distance usage.</li>
                <li>Inability to provide car service due to unforeseen emergency breakdown or highway blockade.</li>
              </ul>
            </section>

            <section>
              <h2 className="heading-3" style={{ color: "var(--navy-900)", marginBottom: "8px" }}>
                2. Processing Timelines &amp; Methods
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                All approved refunds are initiated through our official payment gateway partner (Razorpay) to the customer&apos;s original source account (UPI, Debit Card, Credit Card, or Net Banking). Typical settlement times are:
              </p>
              <ul style={{ paddingLeft: "20px", color: "var(--text-muted)", fontSize: "0.95rem", marginTop: "6px" }}>
                <li><strong>UPI / Google Pay / PhonePe:</strong> Instant to 24 hours.</li>
                <li><strong>Debit &amp; Credit Cards:</strong> 3 to 5 banking business days.</li>
                <li><strong>Net Banking:</strong> 2 to 4 business days.</li>
              </ul>
            </section>

            <section>
              <h2 className="heading-3" style={{ color: "var(--navy-900)", marginBottom: "8px" }}>
                3. Tracking Refund Status
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                You can track the live status of your refund by entering your booking reference code in the &ldquo;My Bookings&rdquo; portal, or by sending a message with your booking reference to our WhatsApp helpline at <strong>+91 7255055889</strong>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
