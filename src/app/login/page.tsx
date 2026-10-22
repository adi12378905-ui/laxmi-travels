"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Car, Lock, Mail, ArrowRight, AlertCircle, CheckCircle2, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      if (data.user?.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/my-bookings");
      }
    } catch (err: any) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const fillAdminDemo = () => {
    setEmail("admin@laxmitravels.com");
    setPassword("admin123");
  };

  const fillCustomerDemo = () => {
    setEmail("customer@gmail.com");
    setPassword("customer123");
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
      <div className="card" style={{ maxWidth: "440px", width: "100%", padding: "36px" }}>
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
            Sign In to Laxmi Travels
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginTop: "4px" }}>
            Access booking history or administrative dashboard
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

        <form onSubmit={handleLogin}>
          <div className="form-group" style={{ marginBottom: "16px" }}>
            <label className="form-label">Email Address</label>
            <div style={{ position: "relative" }}>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: "20px" }}>
            <label className="form-label">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
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
            {loading ? "Signing in..." : "Sign In"} <ArrowRight size={18} />
          </button>
        </form>

        {/* Demo Fast Logins for Testing */}
        <div style={{
          marginTop: "24px",
          paddingTop: "18px",
          borderTop: "1px solid #E2E8F0",
          fontSize: "0.8rem",
          color: "var(--text-muted)"
        }}>
          <div style={{ fontWeight: 600, color: "var(--navy-900)", marginBottom: "8px" }}>
            Quick Demo Autofill Credentials:
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              type="button"
              onClick={fillAdminDemo}
              style={{
                flex: 1,
                padding: "6px 10px",
                borderRadius: "6px",
                background: "rgba(11,19,43,0.06)",
                color: "var(--navy-900)",
                fontSize: "0.75rem",
                fontWeight: 600,
                border: "1px solid #CBD5E1"
              }}
            >
              Staff Admin Demo
            </button>
            <button
              type="button"
              onClick={fillCustomerDemo}
              style={{
                flex: 1,
                padding: "6px 10px",
                borderRadius: "6px",
                background: "rgba(255,107,53,0.08)",
                color: "var(--orange-600)",
                fontSize: "0.75rem",
                fontWeight: 600,
                border: "1px solid rgba(255,107,53,0.2)"
              }}
            >
              Customer Demo
            </button>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "20px", fontSize: "0.85rem", color: "var(--text-muted)" }}>
          Don&apos;t have an account?{" "}
          <Link href="/register" style={{ color: "var(--orange-600)", fontWeight: 700 }}>
            Register as Customer
          </Link>
        </div>
      </div>
    </div>
  );
}
