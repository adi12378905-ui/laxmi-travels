"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Car, ArrowRight, AlertCircle } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");

      router.push("/my-bookings");
    } catch (err: any) {
      setError(err.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "80vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "60px 20px",
      background: "var(--ivory-100)"
    }}>
      <div className="card" style={{ maxWidth: "460px", width: "100%", padding: "36px" }}>
        <div style={{ textAlign: "center", marginBottom: "26px" }}>
          <div style={{
            width: "50px",
            height: "50px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, var(--orange-500) 0%, var(--orange-600) 100%)",
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 12px",
            boxShadow: "var(--shadow-orange)"
          }}>
            <Car size={26} />
          </div>
          <h1 className="heading-2" style={{ color: "var(--navy-900)" }}>
            Create Customer Account
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginTop: "4px" }}>
            Save passenger profiles and track past highway trips
          </p>
        </div>

        {error && (
          <div style={{
            background: "#FEE2E2",
            color: "#B91C1C",
            padding: "12px",
            borderRadius: "8px",
            fontSize: "0.85rem",
            marginBottom: "18px",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <div className="form-group" style={{ marginBottom: "16px" }}>
            <label className="form-label">Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Rajesh Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group" style={{ marginBottom: "16px" }}>
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

          <div className="form-group" style={{ marginBottom: "16px" }}>
            <label className="form-label">Email Address</label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group" style={{ marginBottom: "22px" }}>
            <label className="form-label">Create Password</label>
            <input
              type="password"
              required
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: "100%", padding: "12px", fontSize: "1rem" }}
          >
            {loading ? "Creating Account..." : "Create Account"} <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "20px", fontSize: "0.85rem", color: "var(--text-muted)" }}>
          Already registered?{" "}
          <Link href="/login" style={{ color: "var(--orange-600)", fontWeight: 700 }}>
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
}
