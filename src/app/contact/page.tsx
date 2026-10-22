"use client";

import React, { useState } from "react";
import { 
  Phone, 
  MapPin, 
  Clock, 
  Mail, 
  MessageSquare, 
  CheckCircle2, 
  Send, 
  Star,
  ExternalLink
} from "lucide-react";
import confetti from "canvas-confetti";

export default function ContactPage() {
  // Contact Form
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("General Car Travel Enquiry");
  const [message, setMessage] = useState("");
  const [enquiryStatus, setEnquiryStatus] = useState("");
  const [isSubmittingEnquiry, setIsSubmittingEnquiry] = useState(false);

  // Review Form
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewRoute, setReviewRoute] = useState("Vapi to Mumbai Taxi");
  const [reviewComment, setReviewComment] = useState("");
  const [reviewStatus, setReviewStatus] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const handleSubmitEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingEnquiry(true);
    setEnquiryStatus("");

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, subject, message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send message");

      setEnquiryStatus("Thank you! Your message has been delivered to Laxmi Travels desk. We will call you shortly.");
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      setEnquiryStatus(err.message || "Failed to send enquiry");
    } finally {
      setIsSubmittingEnquiry(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingReview(true);
    setReviewStatus("");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          authorName: reviewName,
          rating: reviewRating,
          tripRoute: reviewRoute,
          comment: reviewComment,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit review");

      setReviewStatus("Thank you for sharing your feedback with Laxmi Travels!");
      setReviewName("");
      setReviewComment("");
      confetti({ particleCount: 60, spread: 50 });
    } catch (err: any) {
      setReviewStatus(err.message || "Failed to submit review");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  return (
    <div style={{ paddingTop: "40px", paddingBottom: "80px", background: "var(--ivory-100)" }}>
      {/* Banner */}
      <section className="section section-dark" style={{ padding: "60px 0" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: "800px" }}>
          <span className="eyebrow" style={{ color: "var(--orange-500)" }}>24/7 Car Travel Assistance</span>
          <h1 className="heading-display" style={{ marginBottom: "14px", color: "#FFFFFF" }}>
            Contact Laxmi Travels
          </h1>
          <p style={{ color: "#E2E8F0", fontSize: "1.1rem" }}>
            Reach out for instant car bookings, outstation quotations, corporate contracts, or visit our office on N.H. 8, Vapi.
          </p>
        </div>
      </section>

      <div className="container" style={{ marginTop: "50px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 1.3fr",
          gap: "50px",
          alignItems: "flex-start",
          marginBottom: "70px"
        }}>
          {/* Left Column: Direct Info & Map */}
          <div>
            <div className="card" style={{ padding: "34px", marginBottom: "30px" }}>
              <h2 className="heading-2" style={{ color: "var(--navy-900)", marginBottom: "20px" }}>
                Office Information
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                  <div style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    background: "rgba(255,107,53,0.12)",
                    color: "var(--orange-500)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}>
                    <MapPin size={22} />
                  </div>
                  <div>
                    <strong style={{ display: "block", color: "var(--navy-900)", fontSize: "1rem" }}>Registered Office Address</strong>
                    <span style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                      PL. NO. C/6-2/13, SHOP G/04, N.H. 8, Vapi, Taluka - Pardi, Vapi, Gujarat 396191, India
                    </span>
                    <div style={{ marginTop: "6px" }}>
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=Google&query_place_id=ChIJq6oWBMrP4DsRb7En3A3s2Fk"
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: "var(--orange-600)", fontWeight: 600, fontSize: "0.85rem", display: "inline-flex", alignItems: "center", gap: "4px" }}
                      >
                        Open in Google Maps <ExternalLink size={13} />
                      </a>
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                  <div style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    background: "rgba(2,132,199,0.12)",
                    color: "#0284C7",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}>
                    <Phone size={22} />
                  </div>
                  <div>
                    <strong style={{ display: "block", color: "var(--navy-900)", fontSize: "1rem" }}>24x7 Helpline / Click to Call</strong>
                    <a href="tel:+917255055889" style={{ color: "var(--navy-900)", fontWeight: 700, fontSize: "1.1rem" }}>
                      +91 7255055889
                    </a>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                  <div style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    background: "rgba(34,197,94,0.12)",
                    color: "#22C55E",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}>
                    <MessageSquare size={22} />
                  </div>
                  <div>
                    <strong style={{ display: "block", color: "var(--navy-900)", fontSize: "1rem" }}>WhatsApp Booking Concierge</strong>
                    <a
                      href="https://wa.me/7255055889?text=Hi+Laxmi+Travels%2C+I+want+to+book+a+car."
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "#16A34A", fontWeight: 700 }}
                    >
                      Chat on +91 7255055889
                    </a>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                  <div style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    background: "rgba(244,186,70,0.12)",
                    color: "#F4BA46",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}>
                    <Clock size={22} />
                  </div>
                  <div>
                    <strong style={{ display: "block", color: "var(--navy-900)", fontSize: "1rem" }}>Operating Hours</strong>
                    <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                      Monday – Sunday: <strong>24 Hours Open</strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Interactive Frame */}
            <div className="card" style={{ padding: "16px", overflow: "hidden" }}>
              <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--navy-900)", marginBottom: "12px" }}>
                Location on National Highway 8, Vapi
              </div>
              <iframe
                title="Laxmi Travels Location"
                src="https://maps.google.com/maps?q=PL.+NO.+C/6-2/13,+SHOP+G/04,+N.H.+8,+Vapi,+Taluka+-+Pardi,+Vapi,+Gujarat+396191&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="260"
                style={{ border: 0, borderRadius: "10px" }}
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="card" style={{ padding: "36px" }}>
            <h2 className="heading-2" style={{ color: "var(--navy-900)", marginBottom: "8px" }}>
              Send an Enquiry
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "24px" }}>
              Have questions regarding custom road tours, monthly corporate agreements, or special taxi packages? Leave us a message.
            </p>

            {enquiryStatus && (
              <div style={{
                background: "#DCFCE7",
                color: "#15803D",
                padding: "14px",
                borderRadius: "8px",
                fontSize: "0.9rem",
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
                <CheckCircle2 size={18} />
                {enquiryStatus}
              </div>
            )}

            <form onSubmit={handleSubmitEnquiry}>
              <div className="form-group" style={{ marginBottom: "16px" }}>
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priyanshu Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="grid-2" style={{ marginBottom: "16px" }}>
                <div className="form-group">
                  <label className="form-label">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9825012345"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address (Optional)</label>
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: "16px" }}>
                <label className="form-label">Enquiry Subject</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="form-select"
                >
                  <option value="General Car Travel Enquiry">General Car Travel Enquiry</option>
                  <option value="Airport Transfer Quote">Airport Transfer Quote</option>
                  <option value="Corporate Monthly Car Rental">Corporate Monthly Car Rental</option>
                  <option value="Customized Vacation Road Trip">Customized Vacation Road Trip</option>
                  <option value="Wedding / Luxury Car Booking">Wedding / Luxury Car Booking</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: "24px" }}>
                <label className="form-label">Your Message / Travel Requirement</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share details such as pickup date, destination, group size, and any special instructions..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="form-textarea"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmittingEnquiry}
                className="btn btn-primary"
                style={{ width: "100%", padding: "13px", fontSize: "1rem" }}
              >
                <Send size={16} />
                {isSubmittingEnquiry ? "Sending Message..." : "Submit Travel Enquiry"}
              </button>
            </form>
          </div>
        </div>

        {/* Customer Review Submission Section */}
        <div className="card" id="leave-review" style={{ padding: "36px", maxWidth: "800px", margin: "0 auto" }}>
          <h2 className="heading-2" style={{ color: "var(--navy-900)", marginBottom: "8px", textAlign: "center" }}>
            Travelled With Us? Leave Your Trip Review
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", textAlign: "center", marginBottom: "26px" }}>
            Help fellow travellers choose the best car service in Vapi by sharing your genuine experience.
          </p>

          {reviewStatus && (
            <div style={{
              background: "#DCFCE7",
              color: "#15803D",
              padding: "14px",
              borderRadius: "8px",
              fontSize: "0.9rem",
              marginBottom: "20px",
              textAlign: "center"
            }}>
              {reviewStatus}
            </div>
          )}

          <form onSubmit={handleSubmitReview}>
            <div className="grid-2" style={{ marginBottom: "16px" }}>
              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Bhai"
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Trip Route</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vapi to Mumbai Airport / Surat"
                  value={reviewRoute}
                  onChange={(e) => setReviewRoute(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: "16px" }}>
              <label className="form-label">Star Rating (1 to 5 Stars)</label>
              <div style={{ display: "flex", gap: "8px" }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setReviewRating(star)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "4px"
                    }}
                  >
                    <Star
                      size={28}
                      style={{
                        color: star <= reviewRating ? "#F4BA46" : "#CBD5E1",
                        fill: star <= reviewRating ? "#F4BA46" : "none"
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: "24px" }}>
              <label className="form-label">Your Review &amp; Chauffeur Feedback</label>
              <textarea
                rows={3}
                required
                placeholder="How was the driver's driving, cleanliness of the vehicle, and timeliness?"
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                className="form-textarea"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmittingReview}
              className="btn btn-secondary"
              style={{ width: "100%", padding: "12px", fontWeight: 700 }}
            >
              {isSubmittingReview ? "Posting..." : "Submit Feedback"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
