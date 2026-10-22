# Laxmi Travels — Premium Car Travel Agency Platform

> **"Every Journey Begins With Trust."**  
> Headquartered at **PL. NO. C/6-2/13, SHOP G/04, N.H. 8, Vapi, Taluka - Pardi, Gujarat 396191**  
> Phone & 24/7 Helpline: **+91 7255055889** | WhatsApp: **+91 7255055889**  
> 4.9★ Google Rating based on 146+ Verified Customer Reviews.

---

## 🚗 Overview

Laxmi Travels is **exclusively a Car Travel Agency**. This platform is purpose-built with Next.js, TypeScript, PostgreSQL / SQLite, and Prisma ORM to deliver an exceptional car booking experience for:
- **Airport Transfers** (Mumbai CSMIA Airport BOM & Surat Airport STV)
- **One-Way Intercity Taxis** (Vapi to Surat, Mumbai, Ahmedabad, Vadodara, Daman, etc.)
- **Round-Trip Outstation Cars** (With chauffeur standby & custom multi-day halts)
- **Local & Hourly Rentals** (4h/40km, 8h/80km, 12h/120km, and Full Day GIDC packages)
- **Corporate Chauffeur Travel** (Executive Sedans & SUVs with GST invoicing)
- **Customized Road Trips & Tourism** (Saputara hill station, Daman beaches, Statue of Unity)

*All bus ticketing, flight bookings, and bus seat selections are completely eliminated.*

---

## 💎 Design System & Visuals

- **Palette**: Midnight Navy (`#050B1A`, `#0B132B`), Warm Ivory (`#FAF8F5`, `#F3EFE8`), Sunset Orange (`#FF6B35`, `#F77F00`), Accent Gold (`#F4BA46`).
- **Typography**: Plus Jakarta Sans (`next/font/google`).
- **Photorealistic Automotive Visuals**: Custom-generated 8K imagery of Indian expressway cars, Toyota Innova Crysta, and Maruti Suzuki Dzire.
- **Micro-Interactions**: Confetti celebrations on booking creation, glassmorphic floating contact triggers, smooth responsive drawer, and reduced-motion compliance.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router with Turbopack)
- **Language**: TypeScript
- **Database & ORM**: Prisma ORM with SQLite (local zero-setup) and instant PostgreSQL switcher
- **Payments**: Razorpay (Dual-Mode: Real SDK integration & Verified Test-Mode Sandbox)
- **Icons & UI**: Lucide React, Canvas Confetti
- **Authentication**: Bcrypt password hashing & Cookie-based staff/customer sessions

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Your `.env` comes pre-configured for instant local running:
```env
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_laxmi_travels_mock"
RAZORPAY_KEY_SECRET="mock_secret_key"
NEXT_PUBLIC_BUSINESS_NAME="Laxmi Travels"
NEXT_PUBLIC_PHONE="+91 7255055889"
NEXT_PUBLIC_WHATSAPP="7255055889"
NEXT_PUBLIC_ADDRESS="PL. NO. C/6-2/13, SHOP G/04, N.H. 8, Vapi, Taluka - Pardi, Vapi, Gujarat 396191"
NEXT_PUBLIC_TAGLINE="Every Journey Begins With Trust."
```

### 3. Initialize & Seed Database
```bash
npx prisma db push
node prisma/seed.mjs
```

### 4. Run Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🔐 Credentials & Default Accounts

| Role | Email | Password | Access Route |
| :--- | :--- | :--- | :--- |
| **Staff Admin** | `admin@laxmitravels.com` | `admin123` | `/admin` |
| **Customer** | `customer@gmail.com` | `customer123` | `/my-bookings` |

*One-click demo autofill buttons are provided on the `/login` screen for rapid evaluation.*

---

## 💳 Razorpay Online Payment Integration

The platform provides a complete financial workflow:
1. Customer submits a car booking request.
2. System calculates fare based on distance, car category rate/km, tolls, and driver allowance.
3. Customer clicks **"Pay Now with Razorpay"** on their `/bookings/[ref]` page.
4. `/api/payments/create-order` creates a payment order.
5. In **Test Sandbox Mode**: A secure simulation modal confirms payment parameters, posts to `/api/payments/verify`, updates the booking status to `CONFIRMED` & `PAID`, records a timestamp, and generates a printable trip voucher.
6. In **Live Mode**: Set your live `NEXT_PUBLIC_RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` in `.env`. The official Razorpay checkout modal will automatically launch and verify signatures cryptographically using HMAC SHA-256.

---

## 📱 Page Sitemap & Structure

- `/` — Homepage with Hero car image, Booking Widget, Fleet showcase, Services, Routes, Reviews.
- `/about` — About Us, Brand Story, NH 8 location, and 4 Guiding Pillars.
- `/services` — All 7 dedicated car travel service packages.
- `/services/[slug]` — Deep-dive service pages (`airport-transfers`, `one-way-taxi`, `round-trip-taxi`, etc.) with prefilled booking widgets.
- `/fleet` — Vehicle catalogue with category filters (Dzire, City, Ertiga, Innova Crysta, Mercedes, Urbania).
- `/fleet/[slug]` — Detailed vehicle specifications, luggage guidelines, and booking panel.
- `/destinations` — Popular routes from Vapi (Surat, Mumbai, Ahmedabad, Vadodara, Daman, Saputara, Shirdi) with "Plan Your Journey" auto-prefill.
- `/trip-planner` — Interactive multi-stop custom road trip itinerary builder.
- `/book` — Dedicated booking wizard with query parameter support (`?car=...`, `?destination=...`, `?type=...`).
- `/bookings/[id]` — Live booking status, chauffeur plate tracking, Razorpay payment, and printable PDF voucher.
- `/my-bookings` — Self-service portal to track trips by Reference ID (e.g. `LT-2026-1042`) or mobile number.
- `/contact` — Office address, Google Maps frame, click-to-call, WhatsApp trigger, enquiry form, and review submission.
- `/faq` — Comprehensive FAQs on tolls, driver allowances, airport buffers, and luggage.
- `/login` & `/register` — Authentication portals.
- `/privacy-policy`, `/terms`, `/cancellation-policy`, `/refund-policy` — Full legal disclosures.
- `/admin` — Protected Command Center with KPI stats, booking filters, chauffeur assignment, fleet editor, and revenue tracking.

---

## 🌐 Production Deployment

### Deploying to Vercel
1. Push this repository to GitHub.
2. Import project into [Vercel](https://vercel.com).
3. Set environment variables (`DATABASE_URL`, `NEXT_PUBLIC_RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`).
4. To connect PostgreSQL on Vercel/Supabase/Neon, update `prisma/schema.prisma` datasource provider to `postgresql`, run `npx prisma db push`, and deploy!
