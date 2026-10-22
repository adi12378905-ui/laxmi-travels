import React from "react";

export const metadata = {
  title: "Privacy Policy | Laxmi Travels Vapi",
  description: "Privacy policy and data protection standards at Laxmi Travels, Vapi, Gujarat.",
};

export default function PrivacyPolicyPage() {
  return (
    <div style={{ paddingTop: "40px", paddingBottom: "80px", background: "var(--ivory-100)" }}>
      <div className="container" style={{ maxWidth: "860px" }}>
        <div className="card" style={{ padding: "40px" }}>
          <span className="eyebrow">Trust &amp; Confidentiality</span>
          <h1 className="heading-1" style={{ color: "var(--navy-900)", marginBottom: "20px" }}>
            Privacy Policy
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "30px" }}>
            Last updated: October 2026 &bull; Laxmi Travels, Vapi, Gujarat
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px", color: "var(--text-dark)", lineHeight: 1.8 }}>
            <section>
              <h2 className="heading-3" style={{ color: "var(--navy-900)", marginBottom: "8px" }}>
                1. Information We Collect
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                Laxmi Travels collects only the necessary information required to coordinate your car travel: customer name, mobile phone number, email address, pickup and drop-off addresses, travel dates, passenger counts, and flight details (solely for airport pickup coordination).
              </p>
            </section>

            <section>
              <h2 className="heading-3" style={{ color: "var(--navy-900)", marginBottom: "8px" }}>
                2. How We Use Your Information
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                Your information is used exclusively to:
              </p>
              <ul style={{ paddingLeft: "20px", color: "var(--text-muted)", fontSize: "0.95rem", marginTop: "6px" }}>
                <li>Dispatch your assigned vehicle and coordinate driver arrival.</li>
                <li>Send booking confirmations, status updates, and digital trip receipts.</li>
                <li>Process online payments securely through authorized payment gateway partners (Razorpay).</li>
                <li>Provide customer care and roadside support during your journey.</li>
              </ul>
            </section>

            <section>
              <h2 className="heading-3" style={{ color: "var(--navy-900)", marginBottom: "8px" }}>
                3. Payment Security &amp; Credentials
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                Laxmi Travels never stores your credit card numbers, debit card PINs, CVV codes, or net banking passwords. All online financial transactions are encrypted and processed through PCI-DSS compliant payment gateways (Razorpay).
              </p>
            </section>

            <section>
              <h2 className="heading-3" style={{ color: "var(--navy-900)", marginBottom: "8px" }}>
                4. Third-Party Sharing
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                We never sell, rent, or trade your personal contact details to external marketing agencies or data brokers. Chauffeurs are only provided with the passenger name, phone number, and pickup location for the duration of the assigned journey.
              </p>
            </section>

            <section>
              <h2 className="heading-3" style={{ color: "var(--navy-900)", marginBottom: "8px" }}>
                5. Contact Us Regarding Your Data
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                If you have questions about your personal data or wish to request data removal, please contact Laxmi Travels at <strong>+91 7255055889</strong> or write to <strong>laxmitravelsvapi@gmail.com</strong>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
