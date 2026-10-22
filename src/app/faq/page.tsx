import React from "react";
import Link from "next/link";
import { HelpCircle, Phone, MessageSquare, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Frequently Asked Questions | Laxmi Travels Vapi",
  description: "Find answers regarding taxi fares, Mumbai airport pickup times, highway tolls, luggage capacities, and cancellation policies at Laxmi Travels.",
};

const faqs = [
  {
    category: "Booking & Availability",
    questions: [
      {
        q: "How far in advance should I book my car?",
        a: "While we accept immediate on-demand bookings 24x7 subject to fleet availability, we recommend reserving your car at least 4 to 12 hours in advance for airport drops and outstation journeys to ensure guaranteed vehicle assignment."
      },
      {
        q: "Are your taxi services available 24 hours a day?",
        a: "Yes! Laxmi Travels operates 24x7, 365 days a year. Whether you have an early morning 3:00 AM Mumbai flight departure or late-night arrival at Surat, our chauffeurs will be right on time."
      },
      {
        q: "Can I choose a specific car model (e.g. Innova Crysta or Maruti Dzire)?",
        a: "Yes. When submitting your booking, you can select your preferred vehicle category: Hatchback, Sedan (Dzire), Premium Sedan (City), SUV (Ertiga), Premium SUV (Innova Crysta), Luxury Car, or Tempo Traveller."
      }
    ]
  },
  {
    category: "Fares, Tolls & Payments",
    questions: [
      {
        q: "Are toll taxes and parking charges included in the fare?",
        a: "Our upfront pricing transparently shows the base distance fare, estimated highway tolls, and driver allowance. On routes where tolls apply, they are billed at actual government toll plaza receipts. There are zero hidden fees."
      },
      {
        q: "What payment methods are supported?",
        a: "We accept online payments via Razorpay (UPI, Google Pay, PhonePe, Debit/Credit Cards, Net Banking) as well as direct cash or UPI payment to your chauffeur upon trip completion."
      },
      {
        q: "Do you charge extra for night journeys or driver accommodation?",
        a: "Night driver allowance (₹250–₹400) is included transparently in long multi-day and outstation round trips. You do not need to arrange hotel or meals for the driver."
      }
    ]
  },
  {
    category: "Airport Transfers & Flights",
    questions: [
      {
        q: "What if my flight arriving at Mumbai Airport is delayed?",
        a: "We collect your flight number during airport transfer bookings and track flight arrivals in real-time. Your chauffeur will adjust pickup timing automatically without extra waiting penalties."
      },
      {
        q: "How much buffer time should I keep from Vapi to Mumbai International Airport?",
        a: "The standard distance is approximately 170 km, which usually takes 3.5 hours. However, considering peak Mumbai traffic and airport check-in queues, we strongly advise keeping a 4.5 hour buffer."
      }
    ]
  },
  {
    category: "Cancellations & Refunds",
    questions: [
      {
        q: "Can I cancel or reschedule my car booking?",
        a: "Yes. You can cancel or reschedule your booking free of charge up to 6 hours before the scheduled departure time via your booking portal or by calling our desk."
      },
      {
        q: "How does the refund process work?",
        a: "For online pre-paid bookings cancelled within the eligible window, full refunds are processed back to your original payment method via Razorpay within 3 to 5 business days."
      }
    ]
  }
];

export default function FAQPage() {
  return (
    <div style={{ paddingTop: "40px", paddingBottom: "80px", background: "var(--ivory-100)" }}>
      {/* Banner */}
      <section className="section section-dark" style={{ padding: "60px 0" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: "800px" }}>
          <span className="eyebrow" style={{ color: "var(--orange-500)" }}>Help &amp; Transparency</span>
          <h1 className="heading-display" style={{ marginBottom: "14px", color: "#FFFFFF" }}>
            Frequently Asked Questions
          </h1>
          <p style={{ color: "#E2E8F0", fontSize: "1.1rem" }}>
            Clear, honest answers about our car travel booking, toll policies, fleet standards, and airport transfers.
          </p>
        </div>
      </section>

      <div className="container" style={{ marginTop: "50px", maxWidth: "860px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
          {faqs.map((cat, idx) => (
            <div key={idx} className="card" style={{ padding: "34px" }}>
              <h2 className="heading-2" style={{ color: "var(--navy-900)", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
                <HelpCircle size={24} style={{ color: "var(--orange-500)" }} />
                {cat.category}
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {cat.questions.map((item, qIdx) => (
                  <div key={qIdx} style={{ borderBottom: qIdx < cat.questions.length - 1 ? "1px solid #F1F5F9" : "none", paddingBottom: "18px" }}>
                    <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--navy-900)", marginBottom: "8px" }}>
                      {item.q}
                    </h3>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.925rem", lineHeight: 1.7 }}>
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions? */}
        <div style={{
          marginTop: "50px",
          background: "var(--navy-900)",
          color: "#FFFFFF",
          padding: "36px",
          borderRadius: "16px",
          textAlign: "center"
        }}>
          <h3 className="heading-2" style={{ color: "#FFFFFF", marginBottom: "12px" }}>
            Still Have Questions?
          </h3>
          <p style={{ color: "#94A3B8", marginBottom: "24px", maxWidth: "560px", margin: "0 auto 24px" }}>
            Our 24-hour travel desk in Vapi is always available to assist with custom route queries, corporate billing, or immediate taxi dispatch.
          </p>

          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="tel:+917255055889" className="btn btn-call">
              <Phone size={16} /> Call +91 7255055889
            </a>
            <a
              href="https://wa.me/7255055889?text=Hi+Laxmi+Travels%2C+I+have+a+question."
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp"
            >
              <MessageSquare size={16} /> WhatsApp Us
            </a>
            <Link href="/book" className="btn btn-primary">
              Book A Car <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
