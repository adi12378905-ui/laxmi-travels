import React from "react";

export const metadata = {
  title: "Terms and Conditions | Laxmi Travels Vapi",
  description: "Terms and conditions of car rental and taxi booking services with Laxmi Travels, Vapi, Gujarat.",
};

export default function TermsPage() {
  return (
    <div style={{ paddingTop: "40px", paddingBottom: "80px", background: "var(--ivory-100)" }}>
      <div className="container" style={{ maxWidth: "860px" }}>
        <div className="card" style={{ padding: "40px" }}>
          <span className="eyebrow">Service Agreement</span>
          <h1 className="heading-1" style={{ color: "var(--navy-900)", marginBottom: "20px" }}>
            Terms &amp; Conditions
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "30px" }}>
            Effective: October 2026 &bull; Laxmi Travels, Vapi, Gujarat
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px", color: "var(--text-dark)", lineHeight: 1.8 }}>
            <section>
              <h2 className="heading-3" style={{ color: "var(--navy-900)", marginBottom: "8px" }}>
                1. Exclusive Car Travel Service
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                Laxmi Travels operates exclusively as a car travel agency providing private taxi, airport transfer, outstation, and local car rental services. We do not provide bus ticketing, bus seat bookings, or flight bookings.
              </p>
            </section>

            <section>
              <h2 className="heading-3" style={{ color: "var(--navy-900)", marginBottom: "8px" }}>
                2. Booking &amp; Confirmation
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                A booking request submitted on the website generates a unique booking reference. The booking is confirmed upon administrative verification of vehicle availability or completion of advance payment. Driver and vehicle plate numbers are assigned and communicated prior to departure.
              </p>
            </section>

            <section>
              <h2 className="heading-3" style={{ color: "var(--navy-900)", marginBottom: "8px" }}>
                3. Passenger &amp; Luggage Conduct
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                Passengers must respect the registered seating capacity and luggage limits of the booked vehicle. Smoking, consumption of alcohol, or carriage of contraband inside the commercial vehicle is strictly prohibited by law.
              </p>
            </section>

            <section>
              <h2 className="heading-3" style={{ color: "var(--navy-900)", marginBottom: "8px" }}>
                4. Tolls, Taxes &amp; Waiting Charges
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                State toll plaza fees, border entry permits, and monument parking tickets are billed transparently at actuals unless explicitly bundled in a fixed package quote. Standard waiting time of up to 45 minutes at airport pickups is complimentary.
              </p>
            </section>

            <section>
              <h2 className="heading-3" style={{ color: "var(--navy-900)", marginBottom: "8px" }}>
                5. Jurisdiction
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                All contracts and disputes are subject to the exclusive jurisdiction of the competent courts in Vapi / Valsad district, Gujarat, India.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
