"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Car, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Luggage, 
  CheckCircle2, 
  ShieldCheck, 
  CreditCard, 
  Printer, 
  Phone, 
  MessageSquare,
  AlertCircle,
  XCircle,
  FileText
} from "lucide-react";
import confetti from "canvas-confetti";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function BookingDetailsPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();

  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [paying, setPaying] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [paymentSuccessMsg, setPaymentSuccessMsg] = useState("");

  const fetchBooking = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/bookings/${id}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Booking not found");
      setBooking(data.booking);
    } catch (err: any) {
      setError(err.message || "Failed to load booking details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBooking();
    }
  }, [id]);

  // Load Razorpay Checkout Script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Handle Online Payment with Razorpay
  const handlePayOnline = async () => {
    if (!booking) return;
    setPaying(true);
    setError("");

    try {
      // 1. Create order on backend
      const orderRes = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId: booking.id }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.error || "Failed to create payment order");

      // 2. If test mock mode or live SDK
      if (orderData.isMock || typeof window.Razorpay === "undefined") {
        // Simulated Secure Sandbox Payment Modal
        const confirmed = window.confirm(
          `[RAZORPAY TEST MODE]\n\nTrip: ${booking.pickupLocation} to ${booking.dropLocation}\nTotal Amount: ₹${booking.totalFare}\nOrder ID: ${orderData.orderId}\n\nClick OK to simulate successful test payment verification.`
        );

        if (confirmed) {
          const verifyRes = await fetch("/api/payments/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              bookingId: booking.id,
              razorpay_order_id: orderData.orderId,
              razorpay_payment_id: `pay_mock_${Date.now()}`,
              isSimulation: true,
            }),
          });

          const verifyData = await verifyRes.json();
          if (!verifyRes.ok) throw new Error(verifyData.error || "Payment verification failed");

          setPaymentSuccessMsg("Payment verified! Booking confirmed with Laxmi Travels.");
          confetti({ particleCount: 80, spread: 70 });
          fetchBooking();
        }
      } else {
        // Real Razorpay Checkout Modal
        const options = {
          key: orderData.keyId,
          amount: orderData.amount,
          currency: orderData.currency,
          name: "Laxmi Travels",
          description: `Car Booking Ref: ${booking.bookingRef}`,
          image: "https://lh3.googleusercontent.com/a-/ALV-UjUAOW7sTWsDiBUhPlzfc7lMW-HEplHaFf80K2qVDB2c4ZwJAys8",
          order_id: orderData.orderId,
          prefill: {
            name: booking.customerName,
            contact: booking.customerPhone,
            email: booking.customerEmail || "",
          },
          theme: {
            color: "#FF6B35",
          },
          handler: async function (response: any) {
            const verifyRes = await fetch("/api/payments/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                bookingId: booking.id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyRes.ok) {
              setPaymentSuccessMsg("Payment successful! Your car journey is fully confirmed.");
              confetti({ particleCount: 80, spread: 70 });
              fetchBooking();
            } else {
              setError("Payment verification failed on server");
            }
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (err: any) {
      setError(err.message || "Payment initiation failed");
    } finally {
      setPaying(false);
    }
  };

  // Handle Cancellation Request
  const handleCancelBooking = async () => {
    if (!window.confirm("Are you sure you want to request cancellation for this booking?")) return;

    setCancelling(true);
    try {
      const res = await fetch(`/api/bookings/${booking.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "CANCELLATION_REQUESTED" }),
      });

      if (!res.ok) throw new Error("Failed to request cancellation");
      fetchBooking();
    } catch (err: any) {
      alert(err.message || "Failed to update cancellation");
    } finally {
      setCancelling(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return <span className="badge-tag" style={{ background: "rgba(34,197,94,0.15)", color: "#16A34A" }}><CheckCircle2 size={12} /> Confirmed</span>;
      case "AWAITING_PAYMENT":
        return <span className="badge-tag" style={{ background: "rgba(234,179,8,0.15)", color: "#CA8A04" }}>Awaiting Payment</span>;
      case "QUOTE_PENDING":
        return <span className="badge-tag" style={{ background: "rgba(2,132,199,0.15)", color: "#0284C7" }}>Quote Under Review</span>;
      case "TRIP_COMPLETED":
        return <span className="badge-tag" style={{ background: "rgba(99,102,241,0.15)", color: "#4F46E5" }}>Trip Completed</span>;
      case "CANCELLED":
        return <span className="badge-tag" style={{ background: "rgba(239,68,68,0.15)", color: "#DC2626" }}>Cancelled</span>;
      case "CANCELLATION_REQUESTED":
        return <span className="badge-tag" style={{ background: "rgba(239,68,68,0.15)", color: "#DC2626" }}>Cancellation Requested</span>;
      default:
        return <span className="badge-tag">{status.replace(/_/g, " ")}</span>;
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: "100px 20px", textAlign: "center" }}>
        <div style={{ fontSize: "1.2rem", color: "var(--navy-900)", fontWeight: 600 }}>
          Loading Booking Details...
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="container" style={{ padding: "100px 20px", textAlign: "center", maxWidth: "600px" }}>
        <AlertCircle size={48} style={{ color: "#EF4444", margin: "0 auto 16px" }} />
        <h2 className="heading-2" style={{ color: "var(--navy-900)", marginBottom: "10px" }}>
          Booking Not Found
        </h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "24px" }}>
          {error || "Could not locate a booking with the provided reference ID."}
        </p>
        <Link href="/my-bookings" className="btn btn-primary">
          Track Your Bookings
        </Link>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: "40px", paddingBottom: "80px", background: "var(--ivory-100)" }}>
      <div className="container" style={{ maxWidth: "880px" }}>
        {/* Top Header */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
          marginBottom: "30px"
        }}>
          <div>
            <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
              Booking Reference
            </div>
            <h1 className="heading-1" style={{ color: "var(--navy-900)" }}>
              {booking.bookingRef}
            </h1>
          </div>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            {getStatusBadge(booking.status)}
            <button
              onClick={() => window.print()}
              className="btn btn-secondary"
              style={{ padding: "8px 14px", fontSize: "0.85rem" }}
            >
              <Printer size={16} /> Print Voucher
            </button>
          </div>
        </div>

        {paymentSuccessMsg && (
          <div style={{
            background: "#DCFCE7",
            color: "#15803D",
            padding: "14px 20px",
            borderRadius: "10px",
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontWeight: 600
          }}>
            <CheckCircle2 size={20} />
            {paymentSuccessMsg}
          </div>
        )}

        {/* Assigned Driver Box if Confirmed & Assigned */}
        {booking.driverName && (
          <div style={{
            background: "linear-gradient(135deg, #0B132B 0%, #162450 100%)",
            color: "#FFFFFF",
            borderRadius: "14px",
            padding: "24px",
            marginBottom: "30px",
            boxShadow: "var(--shadow-md)"
          }}>
            <span className="eyebrow" style={{ color: "var(--orange-500)", marginBottom: "6px" }}>
              Allocated Chauffeur &amp; Vehicle
            </span>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "20px",
              alignItems: "center",
              marginTop: "10px"
            }}>
              <div>
                <div style={{ fontSize: "0.8rem", color: "#94A3B8" }}>Chauffeur Name</div>
                <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>{booking.driverName}</div>
                <a
                  href={`tel:${booking.driverPhone}`}
                  style={{ color: "#38BDF8", fontSize: "0.9rem", display: "inline-flex", alignItems: "center", gap: "4px", marginTop: "4px" }}
                >
                  <Phone size={14} /> {booking.driverPhone}
                </a>
              </div>

              <div>
                <div style={{ fontSize: "0.8rem", color: "#94A3B8" }}>Vehicle Number Plate</div>
                <div style={{
                  display: "inline-block",
                  background: "#F4BA46",
                  color: "#0B132B",
                  fontWeight: 800,
                  fontSize: "1rem",
                  padding: "4px 12px",
                  borderRadius: "6px",
                  letterSpacing: "0.05em",
                  marginTop: "4px"
                }}>
                  {booking.vehiclePlateNo || "Assigned on Departure"}
                </div>
              </div>

              <div>
                <a
                  href={`https://wa.me/${booking.driverPhone?.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-whatsapp"
                  style={{ padding: "8px 16px", fontSize: "0.85rem" }}
                >
                  <MessageSquare size={16} /> WhatsApp Driver
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Journey Card */}
        <div className="card" style={{ padding: "30px", marginBottom: "30px" }}>
          <h2 className="heading-3" style={{ color: "var(--navy-900)", marginBottom: "18px", borderBottom: "1px solid #F1F5F9", paddingBottom: "10px" }}>
            Trip &amp; Passenger Information
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            marginBottom: "20px"
          }}>
            <div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Pickup Address</div>
              <div style={{ fontWeight: 700, color: "var(--navy-900)", fontSize: "1rem" }}>
                {booking.pickupLocation}
              </div>
            </div>

            <div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Destination Drop-off</div>
              <div style={{ fontWeight: 700, color: "var(--navy-900)", fontSize: "1rem" }}>
                {booking.dropLocation}
              </div>
            </div>

            <div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Pickup Date &amp; Time</div>
              <div style={{ fontWeight: 700, color: "var(--navy-900)" }}>
                {booking.pickupDate} at {booking.pickupTime}
              </div>
            </div>

            {booking.returnDate && (
              <div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Return Date &amp; Time</div>
                <div style={{ fontWeight: 700, color: "var(--navy-900)" }}>
                  {booking.returnDate} at {booking.returnTime}
                </div>
              </div>
            )}

            <div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Car Category</div>
              <div style={{ fontWeight: 700, color: "var(--orange-600)" }}>
                {booking.vehicleCategory?.replace(/_/g, " ")} &bull; {booking.vehicleName}
              </div>
            </div>

            <div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Passengers &amp; Luggage</div>
              <div style={{ fontWeight: 700, color: "var(--navy-900)" }}>
                {booking.passengerCount} Passengers, {booking.luggageCount} Luggage Bags
              </div>
            </div>
          </div>

          {booking.specialInstructions && (
            <div style={{ background: "#F8FAFC", padding: "14px", borderRadius: "8px", fontSize: "0.875rem", marginBottom: "10px" }}>
              <span style={{ fontWeight: 600, color: "var(--navy-900)" }}>Instructions / Notes:</span> {booking.specialInstructions}
            </div>
          )}
        </div>

        {/* Fare & Payment Section */}
        <div className="card" style={{ padding: "30px", marginBottom: "30px" }}>
          <h2 className="heading-3" style={{ color: "var(--navy-900)", marginBottom: "18px", borderBottom: "1px solid #F1F5F9", paddingBottom: "10px" }}>
            Transparent Fare Summary &amp; Payment Status
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.95rem", marginBottom: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--text-muted)" }}>Base Distance Fare:</span>
              <span>₹{booking.baseFare?.toLocaleString("en-IN")}</span>
            </div>

            {booking.tollTaxes > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-muted)" }}>Estimated Tolls &amp; Taxes:</span>
                <span>₹{booking.tollTaxes?.toLocaleString("en-IN")}</span>
              </div>
            )}

            {booking.driverAllowance > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-muted)" }}>Driver Allowance:</span>
                <span>₹{booking.driverAllowance?.toLocaleString("en-IN")}</span>
              </div>
            )}

            {booking.discountAmount > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", color: "#16A34A", fontWeight: 600 }}>
                <span>Promotional Discount:</span>
                <span>-₹{booking.discountAmount?.toLocaleString("en-IN")}</span>
              </div>
            )}

            <div style={{
              display: "flex",
              justifyContent: "space-between",
              borderTop: "2px solid #E2E8F0",
              paddingTop: "12px",
              marginTop: "4px",
              fontSize: "1.25rem",
              fontWeight: 800,
              color: "var(--navy-900)"
            }}>
              <span>Total Fare:</span>
              <span style={{ color: "var(--orange-600)" }}>₹{booking.totalFare?.toLocaleString("en-IN")}</span>
            </div>
          </div>

          {/* Payment Status & Action */}
          <div style={{
            background: "#F8FAFC",
            borderRadius: "10px",
            padding: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px"
          }}>
            <div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Payment Status</div>
              <div style={{ fontWeight: 700, fontSize: "1.1rem", color: booking.paymentStatus === "PAID" ? "#16A34A" : "#CA8A04" }}>
                {booking.paymentStatus === "PAID" ? "✓ Paid in Full" : "Pending Payment"}
              </div>
              {booking.razorpayPaymentId && (
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "2px" }}>
                  Txn ID: {booking.razorpayPaymentId}
                </div>
              )}
            </div>

            {booking.paymentStatus !== "PAID" && booking.totalFare > 0 && booking.status !== "CANCELLED" && (
              <button
                onClick={handlePayOnline}
                disabled={paying}
                className="btn btn-primary"
                style={{ padding: "12px 24px", fontSize: "0.95rem" }}
              >
                <CreditCard size={18} />
                {paying ? "Opening Payment..." : "Pay Now with Razorpay"}
              </button>
            )}
          </div>
        </div>

        {/* Footer Actions & Cancellation */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div style={{ display: "flex", gap: "10px" }}>
            <a
              href={`https://wa.me/7255055889?text=Hello+Laxmi+Travels%2C+query+regarding+booking+ref+${booking.bookingRef}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp"
              style={{ fontSize: "0.85rem", padding: "10px 18px" }}
            >
              <MessageSquare size={16} /> Help Desk
            </a>
            <a
              href="tel:+917255055889"
              className="btn btn-call"
              style={{ fontSize: "0.85rem", padding: "10px 18px" }}
            >
              <Phone size={16} /> Call Support
            </a>
          </div>

          {booking.status !== "CANCELLED" && booking.status !== "CANCELLATION_REQUESTED" && (
            <button
              onClick={handleCancelBooking}
              disabled={cancelling}
              style={{
                color: "#DC2626",
                fontSize: "0.85rem",
                fontWeight: 600,
                cursor: "pointer",
                padding: "8px 12px"
              }}
            >
              {cancelling ? "Processing..." : "Request Booking Cancellation"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
