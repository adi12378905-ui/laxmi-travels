"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Phone, 
  MapPin, 
  Clock, 
  Car, 
  Calendar, 
  Menu, 
  X, 
  MessageSquare,
  ShieldCheck,
  UserCheck
} from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Our Fleet", href: "/fleet" },
    { name: "Car Services", href: "/services" },
    { name: "Destinations", href: "/destinations" },
    { name: "Trip Planner", href: "/trip-planner" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && pathname !== "/") return false;
    return pathname.startsWith(path);
  };

  return (
    <>
      {/* Top Contact Strip */}
      <div style={{
        background: "#050B1A",
        color: "#94A3B8",
        fontSize: "0.8rem",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: "8px 0"
      }}>
        <div className="container" style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "18px", flexWrap: "wrap" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <MapPin size={13} style={{ color: "#FF6B35" }} />
              N.H. 8, Vapi, Gujarat 396191
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Clock size={13} style={{ color: "#FF6B35" }} />
              Open 24 Hours / 7 Days
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <ShieldCheck size={13} style={{ color: "#22C55E" }} />
              <strong style={{ color: "#F8FAFC" }}>4.9★</strong> (146+ Google Reviews)
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <a 
              href="tel:+917255055889" 
              style={{ 
                color: "#F8FAFC", 
                fontWeight: 600, 
                display: "flex", 
                alignItems: "center", 
                gap: "6px" 
              }}
            >
              <Phone size={13} style={{ color: "#FF6B35" }} />
              +91 7255055889
            </a>
            <span style={{ opacity: 0.3 }}>|</span>
            <Link 
              href="/admin" 
              style={{ 
                color: "#94A3B8", 
                fontSize: "0.75rem",
                display: "flex",
                alignItems: "center",
                gap: "4px"
              }}
            >
              <UserCheck size={12} /> Staff Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="header-sticky" style={{
        boxShadow: scrolled ? "0 10px 30px rgba(0,0,0,0.3)" : "none"
      }}>
        <div className="container" style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "76px"
        }}>
          {/* Brand Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              width: "44px",
              height: "44px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #FF6B35 0%, #D95D00 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              boxShadow: "0 4px 15px rgba(255, 107, 53, 0.4)"
            }}>
              <Car size={24} />
            </div>
            <div>
              <div style={{
                fontSize: "1.35rem",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                color: "#FFFFFF",
                lineHeight: 1.1
              }}>
                LAXMI <span style={{ color: "#FF6B35" }}>TRAVELS</span>
              </div>
              <div style={{
                fontSize: "0.68rem",
                color: "#94A3B8",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                fontWeight: 600
              }}>
                Car Travel Agency • Vapi
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav style={{
            display: "none",
            gap: "28px",
            alignItems: "center"
          }} className="desktop-nav">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                style={{
                  fontSize: "0.925rem",
                  fontWeight: 600,
                  color: isActive(link.href) ? "#FF6B35" : "#E2E8F0",
                  transition: "color 0.2s ease",
                  position: "relative",
                  padding: "6px 0"
                }}
              >
                {link.name}
                {isActive(link.href) && (
                  <span style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: "#FF6B35",
                    borderRadius: "2px"
                  }} />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link
              href="/my-bookings"
              className="btn btn-secondary"
              style={{
                display: "none",
                padding: "9px 16px",
                fontSize: "0.85rem",
                borderRadius: "8px"
              }}
              id="my-bookings-desktop-btn"
            >
              My Bookings
            </Link>

            <Link
              href="/book"
              className="btn btn-primary"
              style={{
                padding: "10px 20px",
                fontSize: "0.875rem",
                borderRadius: "8px"
              }}
            >
              <Calendar size={16} />
              <span>Book Your Car</span>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              style={{
                color: "#FFFFFF",
                display: "none",
                padding: "6px",
                borderRadius: "8px",
                background: "rgba(255,255,255,0.08)"
              }}
              className="mobile-toggle-btn"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div style={{
            background: "#0B132B",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "14px"
          }}>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: isActive(link.href) ? "#FF6B35" : "#F8FAFC",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  background: isActive(link.href) ? "rgba(255,107,53,0.12)" : "transparent"
                }}
              >
                {link.name}
              </Link>
            ))}
            
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
              marginTop: "8px",
              paddingTop: "14px",
              borderTop: "1px solid rgba(255,255,255,0.1)"
            }}>
              <Link
                href="/my-bookings"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-secondary"
                style={{ fontSize: "0.85rem", padding: "10px" }}
              >
                Track Booking
              </Link>
              <a
                href="https://wa.me/7255055889"
                target="_blank"
                rel="noreferrer"
                className="btn btn-whatsapp"
                style={{ fontSize: "0.85rem", padding: "10px" }}
              >
                <MessageSquare size={16} /> WhatsApp
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Global CSS media queries for desktop/mobile toggling */}
      <style jsx global>{`
        @media (min-width: 960px) {
          .desktop-nav {
            display: flex !important;
          }
          #my-bookings-desktop-btn {
            display: inline-flex !important;
          }
        }
        @media (max-width: 959px) {
          .mobile-toggle-btn {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}
