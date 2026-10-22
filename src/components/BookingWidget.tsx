"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Car, 
  Plane, 
  Clock, 
  MapPin, 
  Calendar, 
  Users, 
  Luggage, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Tag, 
  Info,
  AlertCircle,
  Sparkles
} from "lucide-react";
import confetti from "canvas-confetti";

interface BookingWidgetProps {
  initialTripType?: string;
  initialDestination?: string;
  initialVehicleCategory?: string;
  compact?: boolean;
}

export default function BookingWidget({
  initialTripType = "ONE_WAY",
  initialDestination = "",
  initialVehicleCategory = "SEDAN",
  compact = false,
}: BookingWidgetProps) {
  const router = useRouter();

  // Tab State
  const [tripType, setTripType] = useState<string>(initialTripType);

  // Form Fields
  const [pickupLocation, setPickupLocation] = useState("Vapi, Gujarat");
  const [dropLocation, setDropLocation] = useState(initialDestination || "Surat, Gujarat");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("08:00");
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("18:00");
  const [passengerCount, setPassengerCount] = useState(2);
  const [luggageCount, setLuggageCount] = useState(2);
  const [vehicleCategory, setVehicleCategory] = useState(initialVehicleCategory);
  
  // Specific to Airport / Hourly
  const [airportName, setAirportName] = useState("Mumbai CSMIA (BOM)");
  const [airportDirection, setAirportDirection] = useState("TO_AIRPORT");
  const [flightNumber, setFlightNumber] = useState("");
  const [hourlyPackage, setHourlyPackage] = useState("8hrs_80km");

  // Customer Contact
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");

  // Coupon
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");

  // UI Flow & Validation
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [successBookingRef, setSuccessBookingRef] = useState<string | null>(null);

  // Set default dates on mount
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const formatYMD = (d: Date) => d.toISOString().split("T")[0];
    setPickupDate(formatYMD(today));
    setReturnDate(formatYMD(tomorrow));
  }, []);

  // Set initial destination if prop changes
  useEffect(() => {
    if (initialDestination) {
      setDropLocation(initialDestination);
    }
  }, [initialDestination]);

  // Car category options with verified real rates
  const carCategories = [
    { id: "HATCHBACK", name: "Hatchback", models: "WagonR, Swift", rateKm: 10.5, seats: 4, bags: 2, icon: "🚗" },
    { id: "SEDAN", name: "Sedan", models: "Dzire, Amaze", rateKm: 12.0, seats: 4, bags: 3, icon: "🚘", popular: true },
    { id: "PREMIUM_SEDAN", name: "Premium Sedan", models: "Honda City, Verna", rateKm: 16.0, seats: 4, bags: 3, icon: "✨" },
    { id: "SUV", name: "Spacious SUV", models: "Ertiga, Carens", rateKm: 15.0, seats: 6, bags: 4, icon: "🚙" },
    { id: "PREMIUM_SUV", name: "Premium SUV", models: "Innova Crysta", rateKm: 19.0, seats: 7, bags: 5, icon: "👑", popular: true },
    { id: "LUXURY", name: "Luxury VIP", models: "Mercedes / Audi", rateKm: 38.0, seats: 4, bags: 3, icon: "🌟" },
    { id: "TEMPO_TRAVELLER", name: "Tempo Traveller", models: "Force Urbania 15S", rateKm: 26.0, seats: 15, bags: 12, icon: "🚐" },
  ];

  // Route distance estimate helper
  const getEstimatedDistance = (): number => {
    const dest = dropLocation.toLowerCase();
    if (dest.includes("surat")) return 115;
    if (dest.includes("mumbai")) return 170;
    if (dest.includes("ahmedabad")) return 375;
    if (dest.includes("vadodara")) return 265;
    if (dest.includes("daman")) return 14;
    if (dest.includes("saputara")) return 125;
    if (dest.includes("silvassa")) return 18;
    if (dest.includes("shirdi")) return 225;
    if (dest.includes("nashik")) return 145;
    return 120; // default estimated
  };

  // Calculate pricing breakdown
  const calculatePricing = () => {
    const selectedCar = carCategories.find((c) => c.id === vehicleCategory) || carCategories[1];

    if (tripType === "LOCAL_HOURLY") {
      let base = 1800;
      if (hourlyPackage === "4hrs_40km") base = 1200;
      if (hourlyPackage === "8hrs_80km") base = 2200;
      if (hourlyPackage === "12hrs_120km") base = 3100;
      if (hourlyPackage === "FULL_DAY") base = 3800;

      if (vehicleCategory === "SUV") base = Math.round(base * 1.3);
      if (vehicleCategory === "PREMIUM_SUV") base = Math.round(base * 1.6);
      if (vehicleCategory === "LUXURY") base = Math.round(base * 2.8);

      const total = Math.max(0, base - appliedDiscount);
      return {
        isQuoteMode: false,
        estimatedKm: hourlyPackage === "4hrs_40km" ? 40 : hourlyPackage === "8hrs_80km" ? 80 : 120,
        baseFare: base,
        tollTaxes: 0,
        driverAllowance: 0,
        discount: appliedDiscount,
        totalFare: total,
      };
    }

    if (tripType === "CUSTOM_ROAD_TRIP") {
      // Custom road trips are quote pending
      return {
        isQuoteMode: true,
        estimatedKm: 300,
        baseFare: 0,
        tollTaxes: 0,
        driverAllowance: 0,
        discount: 0,
        totalFare: 0,
      };
    }

    const dist = getEstimatedDistance();
    const multiplier = tripType === "ROUND_TRIP" ? 2 : 1;
    const totalKm = dist * multiplier;

    let baseFare = Math.round(totalKm * selectedCar.rateKm);
    // Minimum base fare safeguard
    if (baseFare < 1200 && tripType !== "LOCAL_HOURLY") baseFare = 1200;

    let tollTaxes = Math.round(dist * 1.5 * multiplier);
    let driverAllowance = tripType === "ROUND_TRIP" ? 400 : 250;

    let subtotal = baseFare + tollTaxes + driverAllowance;
    let finalTotal = Math.max(0, subtotal - appliedDiscount);

    return {
      isQuoteMode: false,
      estimatedKm: totalKm,
      baseFare,
      tollTaxes,
      driverAllowance,
      discount: appliedDiscount,
      totalFare: finalTotal,
    };
  };

  const pricing = calculatePricing();

  // Apply Coupon
  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === "LAXMI10") {
      const disc = Math.round(pricing.baseFare * 0.1);
      setAppliedDiscount(disc);
      setCouponMessage(`Promo code LAXMI10 applied! You saved ₹${disc}`);
    } else if (code === "AIRPORT150") {
      setAppliedDiscount(150);
      setCouponMessage("Promo code AIRPORT150 applied! Flat ₹150 off.");
    } else if (code === "WEEKEND200") {
      setAppliedDiscount(200);
      setCouponMessage("Promo code WEEKEND200 applied! Flat ₹200 off.");
    } else {
      setAppliedDiscount(0);
      setCouponMessage("Invalid promo code. Try LAXMI10 or AIRPORT150.");
    }
  };

  // Validate before opening review
  const handleProceedToReview = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!pickupLocation.trim()) {
      setFormError("Please enter a pickup address or city.");
      return;
    }
    if (tripType !== "LOCAL_HOURLY" && !dropLocation.trim()) {
      setFormError("Please enter your destination drop-off location.");
      return;
    }
    if (!pickupDate) {
      setFormError("Please select a pickup date.");
      return;
    }
    if (tripType === "ROUND_TRIP" && !returnDate) {
      setFormError("Please select a return date for round-trip journey.");
      return;
    }
    if (!customerName.trim()) {
      setFormError("Please enter the passenger/contact name.");
      return;
    }
    if (!customerPhone.trim() || customerPhone.replace(/\D/g, "").length < 10) {
      setFormError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setIsReviewOpen(true);
  };

  // Submit Booking to Backend
  const handleConfirmBooking = async () => {
    setIsSubmitting(true);
    setFormError("");

    const selectedCar = carCategories.find((c) => c.id === vehicleCategory);

    const payload = {
      tripType,
      customerName,
      customerPhone,
      customerEmail,
      specialInstructions,
      pickupLocation,
      dropLocation: tripType === "LOCAL_HOURLY" ? `Local Vapi (${hourlyPackage})` : dropLocation,
      pickupDate,
      pickupTime,
      returnDate: tripType === "ROUND_TRIP" ? returnDate : null,
      returnTime: tripType === "ROUND_TRIP" ? returnTime : null,
      passengerCount,
      luggageCount,
      airportName: tripType === "AIRPORT_TRANSFER" ? airportName : null,
      airportDirection: tripType === "AIRPORT_TRANSFER" ? airportDirection : null,
      flightNumber: tripType === "AIRPORT_TRANSFER" ? flightNumber : null,
      hourlyPackage: tripType === "LOCAL_HOURLY" ? hourlyPackage : null,
      vehicleCategory,
      vehicleName: selectedCar ? selectedCar.name : "Car Taxi",
      estimatedKm: pricing.estimatedKm,
      baseFare: pricing.baseFare,
      tollTaxes: pricing.tollTaxes,
      driverAllowance: pricing.driverAllowance,
      discountAmount: pricing.discount,
      totalFare: pricing.totalFare,
      couponCode: appliedDiscount > 0 ? couponCode : null,
    };

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create booking");
      }

      setSuccessBookingRef(data.bookingRef);
      setIsReviewOpen(false);

      // Trigger Confetti Celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (err: any) {
      setFormError(err.message || "Failed to submit booking");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`card ${compact ? "" : "glass-panel"}`} style={{
      padding: compact ? "24px" : "32px",
      boxShadow: "0 20px 50px rgba(11, 19, 43, 0.15)",
      border: "1px solid rgba(255,255,255,0.7)",
      position: "relative"
    }}>
      {/* Success Modal / Screen */}
      {successBookingRef ? (
        <div style={{ textAlign: "center", padding: "30px 10px" }}>
          <div style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            background: "rgba(34, 197, 94, 0.15)",
            color: "#22C55E",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px"
          }}>
            <CheckCircle2 size={44} />
          </div>

          <span className="badge-tag" style={{ background: "rgba(34,197,94,0.15)", color: "#16A34A" }}>
            Booking Successfully Received
          </span>

          <h3 className="heading-2" style={{ marginTop: "12px", color: "var(--navy-900)" }}>
            Your Trip is Booked with Laxmi Travels!
          </h3>

          <p style={{ color: "var(--text-muted)", marginTop: "8px", maxWidth: "520px", margin: "8px auto 24px" }}>
            Booking Reference: <strong style={{ color: "var(--orange-600)", fontSize: "1.2rem" }}>{successBookingRef}</strong>
            <br />
            Our team will contact you at <strong>{customerPhone}</strong> within 15 minutes to confirm car allocation and chauffeur details.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
            <button
              onClick={() => router.push(`/bookings/${successBookingRef}`)}
              className="btn btn-primary"
            >
              View Booking &amp; Pay Online <ArrowRight size={18} />
            </button>

            <a
              href={`https://wa.me/7255055889?text=Hello+Laxmi+Travels%2C+I+just+created+booking+ref+${successBookingRef}.+Please+confirm+my+cab.`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp"
            >
              WhatsApp Laxmi Desk
            </a>

            <button
              onClick={() => {
                setSuccessBookingRef(null);
                setCustomerName("");
                setCustomerPhone("");
              }}
              className="btn btn-secondary"
            >
              Book Another Ride
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleProceedToReview}>
          {/* Trip Type Tabs */}
          <div style={{
            display: "flex",
            gap: "8px",
            overflowX: "auto",
            paddingBottom: "12px",
            borderBottom: "1px solid #E2E8F0",
            marginBottom: "24px"
          }}>
            {[
              { id: "ONE_WAY", label: "One-Way Taxi", icon: Car },
              { id: "ROUND_TRIP", label: "Round-Trip", icon: Car },
              { id: "AIRPORT_TRANSFER", label: "Airport Transfer", icon: Plane },
              { id: "LOCAL_HOURLY", label: "Local / Hourly", icon: Clock },
              { id: "CUSTOM_ROAD_TRIP", label: "Custom Road Trip", icon: Sparkles },
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = tripType === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setTripType(tab.id);
                    setAppliedDiscount(0);
                    setCouponMessage("");
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 18px",
                    borderRadius: "8px",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    background: isSelected ? "var(--navy-900)" : "transparent",
                    color: isSelected ? "#FFFFFF" : "var(--text-muted)",
                    boxShadow: isSelected ? "0 4px 12px rgba(11,19,43,0.15)" : "none",
                    transition: "all 0.2s ease"
                  }}
                >
                  <Icon size={16} style={{ color: isSelected ? "var(--orange-500)" : "inherit" }} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Form Error Banner */}
          {formError && (
            <div style={{
              background: "#FEE2E2",
              color: "#B91C1C",
              padding: "10px 16px",
              borderRadius: "8px",
              fontSize: "0.875rem",
              marginBottom: "18px",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              <AlertCircle size={18} />
              {formError}
            </div>
          )}

          {/* Conditional Sub-options: Airport Transfer */}
          {tripType === "AIRPORT_TRANSFER" && (
            <div style={{
              background: "#F8FAFC",
              padding: "16px",
              borderRadius: "10px",
              marginBottom: "20px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "14px"
            }}>
              <div className="form-group">
                <label className="form-label">Select Airport</label>
                <select
                  value={airportName}
                  onChange={(e) => {
                    setAirportName(e.target.value);
                    if (e.target.value.includes("Mumbai")) setDropLocation("Mumbai CSMIA Airport (BOM)");
                    if (e.target.value.includes("Surat")) setDropLocation("Surat Airport (STV)");
                    if (e.target.value.includes("Ahmedabad")) setDropLocation("Ahmedabad Airport (AMD)");
                  }}
                  className="form-select"
                >
                  <option value="Mumbai CSMIA (BOM)">Mumbai Airport (CSMIA / BOM)</option>
                  <option value="Surat Airport (STV)">Surat International Airport (STV)</option>
                  <option value="Ahmedabad Airport (AMD)">Ahmedabad Airport (AMD)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Direction</label>
                <select
                  value={airportDirection}
                  onChange={(e) => setAirportDirection(e.target.value)}
                  className="form-select"
                >
                  <option value="TO_AIRPORT">Vapi to Airport Drop</option>
                  <option value="FROM_AIRPORT">Airport Pickup to Vapi</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Flight Number (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. 6E-204 / AI-605"
                  value={flightNumber}
                  onChange={(e) => setFlightNumber(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>
          )}

          {/* Conditional Sub-options: Local Hourly */}
          {tripType === "LOCAL_HOURLY" && (
            <div style={{
              background: "#F8FAFC",
              padding: "16px",
              borderRadius: "10px",
              marginBottom: "20px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "14px"
            }}>
              <div className="form-group">
                <label className="form-label">Hourly Package</label>
                <select
                  value={hourlyPackage}
                  onChange={(e) => setHourlyPackage(e.target.value)}
                  className="form-select"
                >
                  <option value="4hrs_40km">4 Hours / 40 Kilometres</option>
                  <option value="8hrs_80km">8 Hours / 80 Kilometres (Full Shift)</option>
                  <option value="12hrs_120km">12 Hours / 120 Kilometres</option>
                  <option value="FULL_DAY">Full Day City &amp; GIDC Industrial Package</option>
                </select>
              </div>
              <div style={{ fontSize: "0.825rem", color: "var(--text-muted)", display: "flex", alignItems: "center" }}>
                <span>💡 Includes chauffeur duty, fuel, and local Vapi/Daman coverage. Extra km &amp; extra hours billed at standard vehicle rate.</span>
              </div>
            </div>
          )}

          {/* Main Pickup & Drop Grid */}
          <div className="grid-2" style={{ marginBottom: "18px" }}>
            <div className="form-group">
              <label className="form-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <MapPin size={15} style={{ color: "var(--orange-500)" }} /> Pickup Address / Landmark
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Hotel / Residence / Gunjan / GIDC Vapi"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="form-input"
              />
            </div>

            {tripType !== "LOCAL_HOURLY" && (
              <div className="form-group">
                <label className="form-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <MapPin size={15} style={{ color: "#22C55E" }} /> Drop-off Destination
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Surat / Mumbai / Daman / Saputara"
                  value={dropLocation}
                  onChange={(e) => setDropLocation(e.target.value)}
                  className="form-input"
                />
              </div>
            )}
          </div>

          {/* Quick Destination Suggestions */}
          {tripType !== "LOCAL_HOURLY" && (
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
              <span style={{ fontSize: "0.775rem", color: "var(--text-muted)", alignSelf: "center" }}>Suggested:</span>
              {[
                "Surat, Gujarat",
                "Mumbai Airport (CSMIA)",
                "Daman Beach",
                "Saputara",
                "Ahmedabad",
                "Vadodara",
                "Silvassa",
              ].map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => setDropLocation(city)}
                  style={{
                    fontSize: "0.75rem",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    background: dropLocation.includes(city.split(",")[0]) ? "rgba(255,107,53,0.15)" : "#F1F5F9",
                    color: dropLocation.includes(city.split(",")[0]) ? "var(--orange-600)" : "var(--navy-900)",
                    fontWeight: 600,
                    border: "1px solid rgba(0,0,0,0.06)"
                  }}
                >
                  {city}
                </button>
              ))}
            </div>
          )}

          {/* Dates & Times */}
          <div style={{
            display: "grid",
            gridTemplateColumns: tripType === "ROUND_TRIP" ? "repeat(4, 1fr)" : "repeat(2, 1fr)",
            gap: "14px",
            marginBottom: "20px"
          }}>
            <div className="form-group">
              <label className="form-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Calendar size={14} /> Pickup Date
              </label>
              <input
                type="date"
                required
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Clock size={14} /> Pickup Time
              </label>
              <input
                type="time"
                required
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="form-input"
              />
            </div>

            {tripType === "ROUND_TRIP" && (
              <>
                <div className="form-group">
                  <label className="form-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <Calendar size={14} /> Return Date
                  </label>
                  <input
                    type="date"
                    required
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <Clock size={14} /> Return Time
                  </label>
                  <input
                    type="time"
                    required
                    value={returnTime}
                    onChange={(e) => setReturnTime(e.target.value)}
                    className="form-input"
                  />
                </div>
              </>
            )}
          </div>

          {/* Vehicle Category Selector */}
          <div style={{ marginBottom: "22px" }}>
            <label className="form-label" style={{ marginBottom: "8px", display: "block" }}>
              Select Vehicle Category
            </label>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: "10px"
            }}>
              {carCategories.map((car) => {
                const isSelected = vehicleCategory === car.id;
                return (
                  <div
                    key={car.id}
                    onClick={() => setVehicleCategory(car.id)}
                    style={{
                      border: isSelected ? "2px solid var(--orange-500)" : "1.5px solid #E2E8F0",
                      background: isSelected ? "rgba(255,107,53,0.06)" : "#FFFFFF",
                      borderRadius: "10px",
                      padding: "12px",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      position: "relative"
                    }}
                  >
                    {car.popular && (
                      <span style={{
                        position: "absolute",
                        top: "-8px",
                        right: "8px",
                        background: "var(--orange-500)",
                        color: "#FFFFFF",
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        padding: "1px 6px",
                        borderRadius: "4px"
                      }}>
                        Popular
                      </span>
                    )}
                    <div style={{ fontSize: "1.4rem", marginBottom: "4px" }}>{car.icon}</div>
                    <div style={{ fontWeight: 700, fontSize: "0.875rem", color: "var(--navy-900)" }}>{car.name}</div>
                    <div style={{ fontSize: "0.725rem", color: "var(--text-muted)", marginBottom: "6px" }}>{car.models}</div>
                    <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--orange-600)" }}>
                      ₹{car.rateKm}/km
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Passengers & Luggage & Contact Fields */}
          <div className="grid-3" style={{ marginBottom: "20px" }}>
            <div className="form-group">
              <label className="form-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Users size={14} /> Passenger Count
              </label>
              <select
                value={passengerCount}
                onChange={(e) => setPassengerCount(Number(e.target.value))}
                className="form-select"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15].map((n) => (
                  <option key={n} value={n}>{n} Passengers</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Luggage size={14} /> Luggage Bags
              </label>
              <select
                value={luggageCount}
                onChange={(e) => setLuggageCount(Number(e.target.value))}
                className="form-select"
              >
                {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
                  <option key={n} value={n}>{n} Bags</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Ramesh Patel"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <div className="grid-2" style={{ marginBottom: "24px" }}>
            <div className="form-group">
              <label className="form-label">WhatsApp / Mobile Number</label>
              <input
                type="tel"
                required
                placeholder="e.g. 9825012345"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address (Optional)</label>
              <input
                type="email"
                placeholder="For booking receipt &amp; invoice"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          {/* Pricing Summary & Coupon Section */}
          <div style={{
            background: "var(--navy-950)",
            color: "#FFFFFF",
            borderRadius: "14px",
            padding: "20px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "20px"
          }}>
            <div>
              <div style={{ fontSize: "0.8rem", color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {pricing.isQuoteMode ? "Trip Type" : "Estimated Transparent Fare"}
              </div>
              <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--orange-500)" }}>
                {pricing.isQuoteMode ? (
                  <span style={{ fontSize: "1.3rem", color: "#FFFFFF" }}>Customized Quote Request</span>
                ) : (
                  <>₹{pricing.totalFare.toLocaleString("en-IN")}</>
                )}
              </div>
              <div style={{ fontSize: "0.775rem", color: "#94A3B8" }}>
                {pricing.isQuoteMode
                  ? "Administrator will send guaranteed exact itinerary quote"
                  : `Includes Base Fare, Driver Allowance & Estimated Tolls (${pricing.estimatedKm} km)`}
              </div>
            </div>

            {/* Coupon Code Input */}
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <input
                type="text"
                placeholder="Coupon code (e.g. LAXMI10)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                style={{
                  padding: "9px 12px",
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.2)",
                  background: "rgba(255,255,255,0.1)",
                  color: "#FFFFFF",
                  fontSize: "0.825rem",
                  width: "160px"
                }}
              />
              <button
                type="button"
                onClick={handleApplyCoupon}
                className="btn btn-secondary"
                style={{ padding: "8px 14px", fontSize: "0.8rem" }}
              >
                Apply
              </button>
            </div>
          </div>

          {couponMessage && (
            <div style={{
              fontSize: "0.825rem",
              fontWeight: 600,
              color: appliedDiscount > 0 ? "#16A34A" : "#DC2626",
              marginBottom: "16px"
            }}>
              {couponMessage}
            </div>
          )}

          {/* Action Button */}
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", padding: "16px", fontSize: "1.05rem" }}
          >
            Review Trip Summary &amp; Confirm Booking <ArrowRight size={20} />
          </button>
        </form>
      )}

      {/* Review & Pre-Confirmation Modal */}
      {isReviewOpen && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(5, 11, 26, 0.8)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: "20px"
        }}>
          <div style={{
            background: "#FFFFFF",
            borderRadius: "16px",
            width: "100%",
            maxWidth: "560px",
            padding: "30px",
            boxShadow: "0 25px 60px rgba(0,0,0,0.3)",
            maxHeight: "90vh",
            overflowY: "auto"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 className="heading-3" style={{ color: "var(--navy-900)" }}>
                Booking Summary &amp; Fare Breakdown
              </h3>
              <button
                type="button"
                onClick={() => setIsReviewOpen(false)}
                style={{ fontSize: "1.4rem", color: "var(--text-muted)", cursor: "pointer" }}
              >
                &times;
              </button>
            </div>

            <div style={{
              background: "#F8FAFC",
              borderRadius: "10px",
              padding: "16px",
              marginBottom: "20px",
              fontSize: "0.875rem",
              lineHeight: 1.6
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ color: "var(--text-muted)" }}>Trip Type:</span>
                <strong>{tripType.replace(/_/g, " ")}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ color: "var(--text-muted)" }}>Pickup:</span>
                <strong>{pickupLocation}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ color: "var(--text-muted)" }}>Destination:</span>
                <strong>{tripType === "LOCAL_HOURLY" ? `Vapi (${hourlyPackage})` : dropLocation}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ color: "var(--text-muted)" }}>Pickup Date &amp; Time:</span>
                <strong>{pickupDate} at {pickupTime}</strong>
              </div>
              {tripType === "ROUND_TRIP" && (
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ color: "var(--text-muted)" }}>Return Date &amp; Time:</span>
                  <strong>{returnDate} at {returnTime}</strong>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ color: "var(--text-muted)" }}>Selected Vehicle:</span>
                <strong style={{ color: "var(--orange-600)" }}>{vehicleCategory.replace(/_/g, " ")}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-muted)" }}>Passenger &amp; Contact:</span>
                <strong>{customerName} ({customerPhone})</strong>
              </div>
            </div>

            {/* Fare Breakdown */}
            {!pricing.isQuoteMode && (
              <div style={{
                border: "1px solid #E2E8F0",
                borderRadius: "10px",
                padding: "16px",
                marginBottom: "20px",
                fontSize: "0.875rem"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span>Base Distance Fare ({pricing.estimatedKm} km):</span>
                  <span>₹{pricing.baseFare.toLocaleString("en-IN")}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span>Tolls &amp; State Taxes (Estimate):</span>
                  <span>₹{pricing.tollTaxes.toLocaleString("en-IN")}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span>Chauffeur Allowance:</span>
                  <span>₹{pricing.driverAllowance.toLocaleString("en-IN")}</span>
                </div>
                {pricing.discount > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", color: "#16A34A", marginBottom: "6px", fontWeight: 600 }}>
                    <span>Coupon Discount:</span>
                    <span>-₹{pricing.discount.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderTop: "1px solid #E2E8F0",
                  paddingTop: "10px",
                  marginTop: "6px",
                  fontSize: "1.1rem",
                  fontWeight: 800,
                  color: "var(--navy-900)"
                }}>
                  <span>Total Payable:</span>
                  <span style={{ color: "var(--orange-600)" }}>₹{pricing.totalFare.toLocaleString("en-IN")}</span>
                </div>
              </div>
            )}

            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "24px" }}>
              <ShieldCheck size={16} style={{ color: "#22C55E", flexShrink: 0 }} />
              <span>No instant deduction. Pay online securely or pay driver upon trip completion.</span>
            </div>

            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={() => setIsReviewOpen(false)}
                className="btn btn-secondary"
                disabled={isSubmitting}
              >
                Edit Details
              </button>
              <button
                type="button"
                onClick={handleConfirmBooking}
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting Booking..." : "Confirm & Send Request"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
