"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Car, 
  Users, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  Filter, 
  Settings, 
  MessageSquare, 
  Star, 
  MapPin, 
  Phone, 
  FileText, 
  Plus, 
  ShieldCheck,
  RefreshCw,
  Edit2,
  Trash2,
  ExternalLink,
  ChevronRight
} from "lucide-react";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"bookings" | "fleet" | "routes" | "enquiries" | "reviews" | "settings">("bookings");

  // Data states
  const [bookings, setBookings] = useState<any[]>([]);
  const [fleet, setFleet] = useState<any[]>([]);
  const [routes, setRoutes] = useState<any[]>([]);
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter & Search states for bookings
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Edit / Action modal state
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
  const [driverName, setDriverName] = useState("");
  const [driverPhone, setDriverPhone] = useState("");
  const [vehiclePlateNo, setVehiclePlateNo] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [newTotalFare, setNewTotalFare] = useState("");
  const [adminNotes, setAdminNotes] = useState("");
  const [isSavingBooking, setIsSavingBooking] = useState(false);

  // New vehicle form state
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [vehName, setVehName] = useState("");
  const [vehCategory, setVehCategory] = useState("SEDAN");
  const [vehRateKm, setVehRateKm] = useState("12");
  const [vehBaseFare, setVehBaseFare] = useState("1500");
  const [vehSeats, setVehSeats] = useState("4");
  const [vehBags, setVehBags] = useState("3");
  const [vehImage, setVehImage] = useState("/images/sedan-dzire.jpg");
  const [vehDesc, setVehDesc] = useState("");

  // New route form state
  const [showAddRoute, setShowAddRoute] = useState(false);
  const [routeDest, setRouteDest] = useState("");
  const [routeDist, setRouteDist] = useState("100");
  const [routeTime, setRouteTime] = useState("2 hrs");
  const [routeSedanFare, setRouteSedanFare] = useState("2000");
  const [routeSuvFare, setRouteSuvFare] = useState("3000");
  const [routeToll, setRouteToll] = useState("150");

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [bRes, fRes, rRes, eRes, revRes] = await Promise.all([
        fetch("/api/bookings"),
        fetch("/api/fleet?admin=true"),
        fetch("/api/routes"),
        fetch("/api/enquiries"),
        fetch("/api/reviews?all=true"),
      ]);

      const [bData, fData, rData, eData, revData] = await Promise.all([
        bRes.json(),
        fRes.json(),
        rRes.json(),
        eRes.json(),
        revRes.json(),
      ]);

      if (bData.bookings) setBookings(bData.bookings);
      if (fData.vehicles) setFleet(fData.vehicles);
      if (rData.routes) setRoutes(rData.routes);
      if (eData.enquiries) setEnquiries(eData.enquiries);
      if (revData.reviews) setReviews(revData.reviews);
    } catch (err) {
      console.error("Admin load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  // Filter bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = statusFilter === "ALL" || b.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesQuery = !searchQuery || 
      b.bookingRef.toLowerCase().includes(q) ||
      b.customerName.toLowerCase().includes(q) ||
      b.customerPhone.includes(q) ||
      b.pickupLocation.toLowerCase().includes(q) ||
      b.dropLocation.toLowerCase().includes(q);
    return matchesStatus && matchesQuery;
  });

  // Calculate KPIs
  const totalBookingsCount = bookings.length;
  const verifiedRevenue = bookings
    .filter((b) => b.paymentStatus === "PAID")
    .reduce((acc, curr) => acc + (curr.paidAmount || curr.totalFare || 0), 0);
  const activeConfirmedTrips = bookings.filter((b) => b.status === "CONFIRMED").length;
  const pendingQuotes = bookings.filter((b) => b.status === "QUOTE_PENDING" || b.status === "BOOKING_REQUESTED").length;

  const openBookingModal = (b: any) => {
    setSelectedBooking(b);
    setDriverName(b.driverName || "");
    setDriverPhone(b.driverPhone || "");
    setVehiclePlateNo(b.vehiclePlateNo || "");
    setNewStatus(b.status || "CONFIRMED");
    setNewTotalFare(b.totalFare ? String(b.totalFare) : "");
    setAdminNotes(b.adminNotes || "");
  };

  const handleSaveBooking = async () => {
    if (!selectedBooking) return;
    setIsSavingBooking(true);

    try {
      const res = await fetch(`/api/bookings/${selectedBooking.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: newStatus,
          driverName: driverName.trim() || null,
          driverPhone: driverPhone.trim() || null,
          vehiclePlateNo: vehiclePlateNo.trim() || null,
          totalFare: newTotalFare ? Number(newTotalFare) : selectedBooking.totalFare,
          adminNotes: adminNotes.trim() || null,
        }),
      });

      if (!res.ok) throw new Error("Failed to update booking");

      setSelectedBooking(null);
      loadAllData();
    } catch (err: any) {
      alert(err.message || "Failed to update booking");
    } finally {
      setIsSavingBooking(false);
    }
  };

  const handleAddVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/fleet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: vehName,
          category: vehCategory,
          ratePerKm: Number(vehRateKm),
          baseFare: Number(vehBaseFare),
          seatingCapacity: Number(vehSeats),
          luggageCapacity: Number(vehBags),
          image: vehImage,
          description: vehDesc,
          features: ["Air Conditioning", "Clean Interiors", "Phone Charging", "Audio System"],
        }),
      });

      if (!res.ok) throw new Error("Failed to add vehicle");

      setShowAddVehicle(false);
      setVehName("");
      setVehDesc("");
      loadAllData();
    } catch (err: any) {
      alert(err.message || "Failed to add vehicle");
    }
  };

  const handleAddRoute = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/routes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "Vapi",
          destination: routeDest,
          distanceKm: Number(routeDist),
          durationHours: routeTime,
          sedanFare: Number(routeSedanFare),
          suvFare: Number(routeSuvFare),
          tollEstimate: Number(routeToll),
        }),
      });

      if (!res.ok) throw new Error("Failed to add route");

      setShowAddRoute(false);
      setRouteDest("");
      loadAllData();
    } catch (err: any) {
      alert(err.message || "Failed to add route");
    }
  };

  return (
    <div style={{ paddingTop: "30px", paddingBottom: "80px", background: "#F1F5F9", minHeight: "90vh" }}>
      <div className="container" style={{ maxWidth: "1280px" }}>
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
            <div className="eyebrow" style={{ color: "var(--orange-500)", marginBottom: "4px" }}>
              Authorized Staff Administration
            </div>
            <h1 className="heading-1" style={{ color: "var(--navy-900)" }}>
              Laxmi Travels Command Center
            </h1>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={loadAllData}
              disabled={loading}
              className="btn btn-secondary"
              style={{ padding: "8px 16px", fontSize: "0.85rem" }}
            >
              <RefreshCw size={15} /> {loading ? "Syncing..." : "Refresh Data"}
            </button>
            <Link
              href="/"
              target="_blank"
              className="btn btn-primary"
              style={{ padding: "8px 16px", fontSize: "0.85rem" }}
            >
              View Live Website <ExternalLink size={14} />
            </Link>
          </div>
        </div>

        {/* KPI Summary Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginBottom: "36px"
        }}>
          <div className="card" style={{ padding: "22px", borderLeft: "4px solid var(--orange-500)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "8px" }}>
              <span>Total Bookings</span>
              <Car size={18} style={{ color: "var(--orange-500)" }} />
            </div>
            <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--navy-900)" }}>
              {totalBookingsCount}
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "4px" }}>
              Across outstation, airport, and local
            </div>
          </div>

          <div className="card" style={{ padding: "22px", borderLeft: "4px solid #22C55E" }}>
            <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "8px" }}>
              <span>Verified Revenue</span>
              <DollarSign size={18} style={{ color: "#22C55E" }} />
            </div>
            <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "#16A34A" }}>
              ₹{verifiedRevenue.toLocaleString("en-IN")}
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "4px" }}>
              Real paid payment transactions
            </div>
          </div>

          <div className="card" style={{ padding: "22px", borderLeft: "4px solid #0284C7" }}>
            <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "8px" }}>
              <span>Confirmed Trips</span>
              <CheckCircle2 size={18} style={{ color: "#0284C7" }} />
            </div>
            <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "#0284C7" }}>
              {activeConfirmedTrips}
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "4px" }}>
              Vehicles assigned &amp; locked
            </div>
          </div>

          <div className="card" style={{ padding: "22px", borderLeft: "4px solid #E5A93C" }}>
            <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "8px" }}>
              <span>Pending Quotes</span>
              <Clock size={18} style={{ color: "#E5A93C" }} />
            </div>
            <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "#D97706" }}>
              {pendingQuotes}
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "4px" }}>
              Requires chauffeur/quote response
            </div>
          </div>
        </div>

        {/* Main Tab Bar */}
        <div style={{
          display: "flex",
          gap: "8px",
          background: "#FFFFFF",
          padding: "8px",
          borderRadius: "12px",
          marginBottom: "28px",
          border: "1px solid #E2E8F0",
          overflowX: "auto"
        }}>
          {[
            { id: "bookings", label: `Bookings (${bookings.length})`, icon: Car },
            { id: "fleet", label: `Fleet (${fleet.length})`, icon: Settings },
            { id: "routes", label: `Routes (${routes.length})`, icon: MapPin },
            { id: "enquiries", label: `Enquiries (${enquiries.length})`, icon: MessageSquare },
            { id: "reviews", label: `Reviews (${reviews.length})`, icon: Star },
            { id: "settings", label: "Business Settings", icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
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
                  transition: "all 0.2s ease"
                }}
              >
                <Icon size={16} style={{ color: isSelected ? "var(--orange-500)" : "inherit" }} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: BOOKINGS MANAGEMENT */}
        {activeTab === "bookings" && (
          <div>
            {/* Filter & Search Bar */}
            <div className="card" style={{ padding: "20px", marginBottom: "24px" }}>
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
                <div style={{ flex: 1, minWidth: "260px" }}>
                  <div style={{ position: "relative" }}>
                    <input
                      type="text"
                      placeholder="Search by Ref (LT-2026-...), Customer Name, Phone, City..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="form-input"
                      style={{ paddingLeft: "38px" }}
                    />
                    <Search size={18} style={{ position: "absolute", left: "12px", top: "13px", color: "var(--text-muted)" }} />
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Filter size={16} style={{ color: "var(--text-muted)" }} />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="form-select"
                    style={{ width: "220px" }}
                  >
                    <option value="ALL">All Statuses ({bookings.length})</option>
                    <option value="BOOKING_REQUESTED">Booking Requested</option>
                    <option value="QUOTE_PENDING">Quote Pending</option>
                    <option value="AWAITING_PAYMENT">Awaiting Payment</option>
                    <option value="CONFIRMED">Confirmed</option>
                    <option value="TRIP_COMPLETED">Trip Completed</option>
                    <option value="CANCELLATION_REQUESTED">Cancellation Requested</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Bookings Table */}
            <div className="card" style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem", textAlign: "left" }}>
                <thead>
                  <tr style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0", color: "var(--text-muted)" }}>
                    <th style={{ padding: "14px 18px" }}>Ref &amp; Date</th>
                    <th style={{ padding: "14px 18px" }}>Customer</th>
                    <th style={{ padding: "14px 18px" }}>Route &amp; Trip</th>
                    <th style={{ padding: "14px 18px" }}>Vehicle &amp; Chauffeur</th>
                    <th style={{ padding: "14px 18px" }}>Fare &amp; Pay</th>
                    <th style={{ padding: "14px 18px" }}>Status</th>
                    <th style={{ padding: "14px 18px", textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.length === 0 ? (
                    <tr>
                      <td colSpan={7} style={{ padding: "40px", textAlign: "center", color: "var(--text-muted)" }}>
                        No bookings matching criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredBookings.map((b) => (
                      <tr key={b.id} style={{ borderBottom: "1px solid #F1F5F9" }}>
                        <td style={{ padding: "14px 18px" }}>
                          <strong style={{ color: "var(--navy-900)" }}>{b.bookingRef}</strong>
                          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                            {b.pickupDate} {b.pickupTime}
                          </div>
                        </td>

                        <td style={{ padding: "14px 18px" }}>
                          <strong style={{ color: "var(--navy-900)" }}>{b.customerName}</strong>
                          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                            {b.customerPhone}
                          </div>
                        </td>

                        <td style={{ padding: "14px 18px" }}>
                          <div style={{ color: "var(--navy-900)", fontWeight: 600 }}>
                            {b.pickupLocation.slice(0, 24)} &rarr; {b.dropLocation.slice(0, 24)}
                          </div>
                          <div style={{ fontSize: "0.75rem", color: "var(--orange-600)" }}>
                            {b.tripType.replace(/_/g, " ")} ({b.passengerCount} Pax)
                          </div>
                        </td>

                        <td style={{ padding: "14px 18px" }}>
                          <div>{b.vehicleCategory?.replace(/_/g, " ")}</div>
                          {b.driverName ? (
                            <div style={{ fontSize: "0.75rem", color: "#16A34A", fontWeight: 600 }}>
                              {b.driverName} ({b.vehiclePlateNo || "GJ-15"})
                            </div>
                          ) : (
                            <div style={{ fontSize: "0.75rem", color: "#DC2626" }}>
                              Unassigned Driver
                            </div>
                          )}
                        </td>

                        <td style={{ padding: "14px 18px" }}>
                          <strong style={{ color: "var(--navy-900)" }}>₹{b.totalFare?.toLocaleString("en-IN")}</strong>
                          <div style={{ fontSize: "0.75rem", color: b.paymentStatus === "PAID" ? "#16A34A" : "#CA8A04" }}>
                            {b.paymentStatus === "PAID" ? "✓ Paid" : "Pending"}
                          </div>
                        </td>

                        <td style={{ padding: "14px 18px" }}>
                          <span className="badge-tag" style={{
                            background: b.status === "CONFIRMED" ? "rgba(34,197,94,0.15)" : b.status === "CANCELLED" ? "rgba(239,68,68,0.15)" : "rgba(11,19,43,0.1)",
                            color: b.status === "CONFIRMED" ? "#16A34A" : b.status === "CANCELLED" ? "#DC2626" : "var(--navy-900)",
                            fontSize: "0.7rem"
                          }}>
                            {b.status.replace(/_/g, " ")}
                          </span>
                        </td>

                        <td style={{ padding: "14px 18px", textAlign: "right" }}>
                          <div style={{ display: "flex", gap: "6px", justifyContent: "flex-end" }}>
                            <button
                              onClick={() => openBookingModal(b)}
                              className="btn btn-secondary"
                              style={{ padding: "6px 10px", fontSize: "0.75rem" }}
                            >
                              Manage / Assign
                            </button>
                            <Link
                              href={`/bookings/${b.bookingRef}`}
                              target="_blank"
                              className="btn btn-secondary"
                              style={{ padding: "6px 8px", fontSize: "0.75rem" }}
                              title="Customer View"
                            >
                              <ExternalLink size={13} />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: FLEET MANAGEMENT */}
        {activeTab === "fleet" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 className="heading-2" style={{ color: "var(--navy-900)" }}>
                Active Vehicle Fleet ({fleet.length})
              </h2>
              <button
                onClick={() => setShowAddVehicle(!showAddVehicle)}
                className="btn btn-primary"
                style={{ padding: "10px 18px", fontSize: "0.875rem" }}
              >
                <Plus size={16} /> Add Vehicle
              </button>
            </div>

            {/* Add vehicle form modal */}
            {showAddVehicle && (
              <form onSubmit={handleAddVehicle} className="card" style={{ padding: "26px", marginBottom: "30px", border: "2px solid var(--orange-500)" }}>
                <h3 className="heading-3" style={{ marginBottom: "16px", color: "var(--navy-900)" }}>
                  Add New Vehicle to Fleet
                </h3>
                <div className="grid-3" style={{ marginBottom: "16px" }}>
                  <div className="form-group">
                    <label className="form-label">Vehicle Name &amp; Model</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maruti Suzuki Ertiga"
                      value={vehName}
                      onChange={(e) => setVehName(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select
                      value={vehCategory}
                      onChange={(e) => setVehCategory(e.target.value)}
                      className="form-select"
                    >
                      <option value="HATCHBACK">Hatchback</option>
                      <option value="SEDAN">Sedan</option>
                      <option value="PREMIUM_SEDAN">Premium Sedan</option>
                      <option value="SUV">SUV</option>
                      <option value="PREMIUM_SUV">Premium SUV</option>
                      <option value="LUXURY">Luxury Car</option>
                      <option value="TEMPO_TRAVELLER">Tempo Traveller</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Rate Per KM (₹)</label>
                    <input
                      type="number"
                      required
                      step="0.5"
                      value={vehRateKm}
                      onChange={(e) => setVehRateKm(e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="grid-3" style={{ marginBottom: "16px" }}>
                  <div className="form-group">
                    <label className="form-label">Minimum Base Fare (₹)</label>
                    <input
                      type="number"
                      required
                      value={vehBaseFare}
                      onChange={(e) => setVehBaseFare(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Seating Capacity</label>
                    <input
                      type="number"
                      required
                      value={vehSeats}
                      onChange={(e) => setVehSeats(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Luggage Bags Capacity</label>
                    <input
                      type="number"
                      required
                      value={vehBags}
                      onChange={(e) => setVehBags(e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: "16px" }}>
                  <label className="form-label">Image URL / Path</label>
                  <input
                    type="text"
                    value={vehImage}
                    onChange={(e) => setVehImage(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group" style={{ marginBottom: "20px" }}>
                  <label className="form-label">Description</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Short description of car condition, suspension, and use cases..."
                    value={vehDesc}
                    onChange={(e) => setVehDesc(e.target.value)}
                    className="form-textarea"
                  />
                </div>

                <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                  <button
                    type="button"
                    onClick={() => setShowAddVehicle(false)}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Vehicle
                  </button>
                </div>
              </form>
            )}

            <div className="grid-3">
              {fleet.map((car) => (
                <div key={car.id} className="card" style={{ padding: "20px" }}>
                  <div style={{ position: "relative", height: "160px", borderRadius: "8px", overflow: "hidden", marginBottom: "14px", background: "#0B132B" }}>
                    <img
                      src={car.image}
                      alt={car.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    <div style={{
                      position: "absolute",
                      bottom: "8px",
                      right: "8px",
                      background: "var(--orange-500)",
                      color: "#FFFFFF",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontSize: "0.85rem",
                      fontWeight: 800
                    }}>
                      ₹{car.ratePerKm}/km
                    </div>
                  </div>

                  <h3 className="heading-3" style={{ color: "var(--navy-900)", marginBottom: "4px" }}>
                    {car.name}
                  </h3>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "10px" }}>
                    {car.category} &bull; Base ₹{car.baseFare} &bull; {car.seatingCapacity} Seats &bull; {car.luggageCapacity} Bags
                  </div>
                  <p style={{ fontSize: "0.825rem", color: "var(--text-muted)", lineHeight: 1.5, marginBottom: "14px" }}>
                    {car.description}
                  </p>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.75rem", color: car.isActive ? "#16A34A" : "#DC2626", fontWeight: 700 }}>
                      {car.isActive ? "● Active in Fleet" : "○ Deactivated"}
                    </span>
                    <Link href={`/fleet/${car.slug}`} target="_blank" className="btn btn-secondary" style={{ padding: "4px 10px", fontSize: "0.75rem" }}>
                      Public View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ROUTES & DESTINATIONS */}
        {activeTab === "routes" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 className="heading-2" style={{ color: "var(--navy-900)" }}>
                Highway Routes ({routes.length})
              </h2>
              <button
                onClick={() => setShowAddRoute(!showAddRoute)}
                className="btn btn-primary"
                style={{ padding: "10px 18px", fontSize: "0.875rem" }}
              >
                <Plus size={16} /> Add Route
              </button>
            </div>

            {/* Add route form modal */}
            {showAddRoute && (
              <form onSubmit={handleAddRoute} className="card" style={{ padding: "26px", marginBottom: "30px", border: "2px solid var(--orange-500)" }}>
                <h3 className="heading-3" style={{ marginBottom: "16px", color: "var(--navy-900)" }}>
                  Add Highway Destination Route
                </h3>
                <div className="grid-3" style={{ marginBottom: "16px" }}>
                  <div className="form-group">
                    <label className="form-label">Destination City</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Nashik / Shirdi"
                      value={routeDest}
                      onChange={(e) => setRouteDest(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Distance (KM from Vapi)</label>
                    <input
                      type="number"
                      required
                      value={routeDist}
                      onChange={(e) => setRouteDist(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Estimated Time</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 3.5 hrs"
                      value={routeTime}
                      onChange={(e) => setRouteTime(e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="grid-3" style={{ marginBottom: "20px" }}>
                  <div className="form-group">
                    <label className="form-label">Sedan Fare (₹)</label>
                    <input
                      type="number"
                      required
                      value={routeSedanFare}
                      onChange={(e) => setRouteSedanFare(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">SUV Fare (₹)</label>
                    <input
                      type="number"
                      required
                      value={routeSuvFare}
                      onChange={(e) => setRouteSuvFare(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Toll Plaza Estimate (₹)</label>
                    <input
                      type="number"
                      required
                      value={routeToll}
                      onChange={(e) => setRouteToll(e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>

                <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                  <button
                    type="button"
                    onClick={() => setShowAddRoute(false)}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Route
                  </button>
                </div>
              </form>
            )}

            <div className="card" style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem", textAlign: "left" }}>
                <thead>
                  <tr style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0", color: "var(--text-muted)" }}>
                    <th style={{ padding: "14px 18px" }}>Source &rarr; Destination</th>
                    <th style={{ padding: "14px 18px" }}>Distance</th>
                    <th style={{ padding: "14px 18px" }}>Duration</th>
                    <th style={{ padding: "14px 18px" }}>Sedan Fare</th>
                    <th style={{ padding: "14px 18px" }}>SUV Fare</th>
                    <th style={{ padding: "14px 18px" }}>Toll Est.</th>
                  </tr>
                </thead>
                <tbody>
                  {routes.map((rt) => (
                    <tr key={rt.id} style={{ borderBottom: "1px solid #F1F5F9" }}>
                      <td style={{ padding: "14px 18px" }}>
                        <strong>{rt.source} &rarr; {rt.destination}</strong>
                      </td>
                      <td style={{ padding: "14px 18px" }}>~{rt.distanceKm} km</td>
                      <td style={{ padding: "14px 18px" }}>~{rt.durationHours}</td>
                      <td style={{ padding: "14px 18px", color: "var(--orange-600)", fontWeight: 700 }}>
                        ₹{rt.sedanFare.toLocaleString("en-IN")}
                      </td>
                      <td style={{ padding: "14px 18px", color: "var(--navy-900)", fontWeight: 700 }}>
                        ₹{rt.suvFare.toLocaleString("en-IN")}
                      </td>
                      <td style={{ padding: "14px 18px" }}>₹{rt.tollEstimate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: ENQUIRIES */}
        {activeTab === "enquiries" && (
          <div>
            <h2 className="heading-2" style={{ color: "var(--navy-900)", marginBottom: "20px" }}>
              Customer Travel Enquiries ({enquiries.length})
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {enquiries.length === 0 ? (
                <div className="card" style={{ padding: "30px", textAlign: "center", color: "var(--text-muted)" }}>
                  No customer enquiries yet.
                </div>
              ) : (
                enquiries.map((enq) => (
                  <div key={enq.id} className="card" style={{ padding: "20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                      <div>
                        <strong style={{ color: "var(--navy-900)", fontSize: "1rem" }}>{enq.name}</strong>
                        <span style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginLeft: "10px" }}>
                          <Phone size={13} style={{ display: "inline" }} /> {enq.phone}
                        </span>
                      </div>
                      <span className="badge-tag">{enq.status}</span>
                    </div>
                    <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--orange-600)", marginBottom: "6px" }}>
                      {enq.subject}
                    </div>
                    <p style={{ color: "var(--text-dark)", fontSize: "0.9rem", lineHeight: 1.5, background: "#F8FAFC", padding: "12px", borderRadius: "6px" }}>
                      &ldquo;{enq.message}&rdquo;
                    </p>
                    <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                      <a href={`tel:${enq.phone}`} className="btn btn-call" style={{ padding: "6px 14px", fontSize: "0.8rem" }}>
                        <Phone size={14} /> Call Back
                      </a>
                      <a href={`https://wa.me/${enq.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="btn btn-whatsapp" style={{ padding: "6px 14px", fontSize: "0.8rem" }}>
                        <MessageSquare size={14} /> WhatsApp
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 5: REVIEWS MODERATION */}
        {activeTab === "reviews" && (
          <div>
            <h2 className="heading-2" style={{ color: "var(--navy-900)", marginBottom: "20px" }}>
              Customer Reviews ({reviews.length})
            </h2>

            <div className="grid-3">
              {reviews.map((rev) => (
                <div key={rev.id} className="card" style={{ padding: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <strong>{rev.authorName}</strong>
                    <div style={{ color: "#F4BA46", display: "flex", gap: "2px" }}>
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} size={14} fill="#F4BA46" />
                      ))}
                    </div>
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "10px" }}>
                    {rev.tripRoute || rev.authorLocation}
                  </div>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-dark)", fontStyle: "italic", lineHeight: 1.5 }}>
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: SETTINGS */}
        {activeTab === "settings" && (
          <div className="card" style={{ padding: "34px", maxWidth: "700px" }}>
            <h2 className="heading-2" style={{ color: "var(--navy-900)", marginBottom: "18px" }}>
              Laxmi Travels Business Settings
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div className="form-group">
                <label className="form-label">Agency Name</label>
                <input type="text" readOnly value="Laxmi Travels" className="form-input" style={{ background: "#F8FAFC" }} />
              </div>

              <div className="form-group">
                <label className="form-label">Phone &amp; WhatsApp</label>
                <input type="text" readOnly value="+91 7255055889" className="form-input" style={{ background: "#F8FAFC" }} />
              </div>

              <div className="form-group">
                <label className="form-label">Physical Office Address</label>
                <input type="text" readOnly value="PL. NO. C/6-2/13, SHOP G/04, N.H. 8, Vapi, Taluka - Pardi, Vapi, Gujarat 396191" className="form-input" style={{ background: "#F8FAFC" }} />
              </div>

              <div className="form-group">
                <label className="form-label">Tagline</label>
                <input type="text" readOnly value="Every Journey Begins With Trust." className="form-input" style={{ background: "#F8FAFC" }} />
              </div>

              <div className="form-group">
                <label className="form-label">Razorpay Gateway Status</label>
                <div style={{ background: "#DCFCE7", color: "#15803D", padding: "12px", borderRadius: "8px", fontSize: "0.875rem", fontWeight: 600 }}>
                  ✓ Enabled with Test Mode / Sandbox Simulation Support
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action / Driver Assignment Modal */}
        {selectedBooking && (
          <div style={{
            position: "fixed",
            inset: 0,
            background: "rgba(5, 11, 26, 0.75)",
            backdropFilter: "blur(6px)",
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
                <div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Manage Booking</div>
                  <h3 className="heading-3" style={{ color: "var(--navy-900)" }}>
                    {selectedBooking.bookingRef}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedBooking(null)}
                  style={{ fontSize: "1.4rem", color: "var(--text-muted)", cursor: "pointer" }}
                >
                  &times;
                </button>
              </div>

              <div style={{ background: "#F8FAFC", padding: "14px", borderRadius: "8px", fontSize: "0.85rem", marginBottom: "20px" }}>
                <div><strong>Customer:</strong> {selectedBooking.customerName} ({selectedBooking.customerPhone})</div>
                <div><strong>Route:</strong> {selectedBooking.pickupLocation} &rarr; {selectedBooking.dropLocation}</div>
                <div><strong>Scheduled:</strong> {selectedBooking.pickupDate} at {selectedBooking.pickupTime}</div>
              </div>

              {/* Status Selector */}
              <div className="form-group" style={{ marginBottom: "16px" }}>
                <label className="form-label">Booking Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="form-select"
                >
                  <option value="BOOKING_REQUESTED">Booking Requested</option>
                  <option value="QUOTE_PENDING">Quote Pending</option>
                  <option value="QUOTE_SENT">Quote Sent</option>
                  <option value="AWAITING_PAYMENT">Awaiting Payment</option>
                  <option value="CONFIRMED">Confirmed</option>
                  <option value="TRIP_COMPLETED">Trip Completed</option>
                  <option value="CANCELLATION_REQUESTED">Cancellation Requested</option>
                  <option value="CANCELLED">Cancelled</option>
                  <option value="REFUND_PENDING">Refund Pending</option>
                  <option value="REFUNDED">Refunded</option>
                </select>
              </div>

              {/* Chauffeur Assignment */}
              <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: "14px", marginBottom: "16px" }}>
                <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--navy-900)", marginBottom: "10px" }}>
                  Chauffeur &amp; Vehicle Assignment
                </div>
                <div className="grid-2" style={{ marginBottom: "10px" }}>
                  <div className="form-group">
                    <label className="form-label">Driver Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Bhai Patel"
                      value={driverName}
                      onChange={(e) => setDriverName(e.target.value)}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Driver Phone</label>
                    <input
                      type="tel"
                      placeholder="e.g. 9825012345"
                      value={driverPhone}
                      onChange={(e) => setDriverPhone(e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Vehicle Plate Number</label>
                  <input
                    type="text"
                    placeholder="e.g. GJ-15-CH-4821"
                    value={vehiclePlateNo}
                    onChange={(e) => setVehiclePlateNo(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Quotation / Total Fare */}
              <div className="form-group" style={{ marginBottom: "16px" }}>
                <label className="form-label">Total Approved Fare (₹)</label>
                <input
                  type="number"
                  value={newTotalFare}
                  onChange={(e) => setNewTotalFare(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group" style={{ marginBottom: "24px" }}>
                <label className="form-label">Admin Notes</label>
                <textarea
                  rows={2}
                  placeholder="Internal notes regarding client flight or driver dispatch..."
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  className="form-textarea"
                />
              </div>

              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={() => setSelectedBooking(null)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveBooking}
                  disabled={isSavingBooking}
                  className="btn btn-primary"
                >
                  {isSavingBooking ? "Saving..." : "Update Booking"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
