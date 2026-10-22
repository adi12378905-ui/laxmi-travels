"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, Phone, ArrowUp } from "lucide-react";

export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="floating-contact-bar">
      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="floating-btn"
          aria-label="Scroll to top"
          style={{ background: "#1E293B" }}
        >
          <ArrowUp size={20} />
        </button>
      )}

      {/* Phone Call Button */}
      <a
        href="tel:+917255055889"
        className="floating-btn btn-call"
        aria-label="Call Laxmi Travels"
        title="Call +91 7255055889"
      >
        <Phone size={24} />
      </a>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/7255055889?text=Hi+Laxmi+Travels%2C+I+want+to+book+a+car+or+inquire+about+travel+fares."
        target="_blank"
        rel="noreferrer"
        className="floating-btn btn-whatsapp pulse-glow"
        aria-label="Chat on WhatsApp"
        title="WhatsApp +91 7255055889"
      >
        <MessageSquare size={24} />
      </a>
    </div>
  );
}
