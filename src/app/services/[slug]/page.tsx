import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  Plane, 
  Car, 
  Compass, 
  Clock, 
  Briefcase, 
  Sparkles, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Phone, 
  MessageSquare,
  HelpCircle,
  ArrowRight
} from "lucide-react";
import BookingWidget from "@/components/BookingWidget";

interface ServiceData {
  slug: string;
  tripType: string;
  title: string;
  subtitle: string;
  heroImage: string;
  description: string;
  whyChoose: string[];
  inclusions: string[];
  exclusions: string[];
  faqs: { q: string; a: string }[];
}

const serviceDictionary: Record<string, ServiceData> = {
  "airport-transfers": {
    slug: "airport-transfers",
    tripType: "AIRPORT_TRANSFER",
    title: "Airport Transfers — Mumbai & Surat Airports",
    subtitle: "Doorstep pickup in Vapi, Daman, and Silvassa directly to CSMIA Mumbai Terminal 1 & 2 or Surat Airport.",
    heroImage: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80",
    description: "Catching a domestic or international flight requires absolute punctuality. Laxmi Travels provides dedicated 24x7 airport cabs from Vapi, Daman, and Silvassa to Chhatrapati Shivaji Maharaj International Airport (CSMIA) Mumbai and Surat Airport. Our chauffeurs arrive 15 minutes before your departure time, load your luggage, and take the fastest expressway routes with zero unscheduled delays.",
    whyChoose: [
      "24x7 Availability — Early morning 3:00 AM or late night 1:00 AM pickups guaranteed.",
      "Live Flight Tracking — If your flight arrives early or late, your chauffeur adjusts automatically.",
      "Zero Ride Refusals — Unlike app-based cabs, our booked airport taxi is 100% reserved for you.",
      "Luggage Assistance — Chauffeur loads and unloads all heavy bags into the spacious sedan/SUV trunk."
    ],
    inclusions: [
      "Private AC Car (Dzire, Honda City, Ertiga, or Innova Crysta)",
      "Uniformed Chauffeur duty and fuel",
      "Doorstep pickup in Vapi / Daman",
      "Direct drop to departure terminal porch"
    ],
    exclusions: [
      "Airport parking fee if waiting exceeds 30 minutes on return pickup",
      "Unscheduled multi-hour detours"
    ],
    faqs: [
      {
        q: "How much travel time should I allow from Vapi to Mumbai Airport?",
        a: "We recommend keeping a minimum travel buffer of 3.5 to 4 hours under normal traffic, and at least 4.5 hours during peak Mumbai commute hours."
      },
      {
        q: "Will the driver pick me up directly from my apartment/hotel?",
        a: "Yes. All Laxmi Travels rides are 100% doorstep private transfers from anywhere in Vapi, Daman, Silvassa, or surrounding areas."
      },
      {
        q: "What if my flight is delayed upon landing at Mumbai?",
        a: "We track your flight number in real-time. Our driver will be parked nearby and will meet you at the designated airport pickup zone as soon as you step out of baggage claim."
      }
    ]
  },
  "one-way-taxi": {
    slug: "one-way-taxi",
    tripType: "ONE_WAY",
    title: "One-Way Intercity Taxi",
    subtitle: "Pay only for the distance you travel from Vapi to Surat, Mumbai, Ahmedabad, or Vadodara.",
    heroImage: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
    description: "Why pay two-way round-trip fares when you only need to go one way? Laxmi Travels offers transparent, budget-friendly one-way drop taxis from Vapi to all major cities in Gujarat and Maharashtra. Travel comfortably in a private, air-conditioned sedan or SUV at your chosen time.",
    whyChoose: [
      "No return kilometer charges — save up to 40% compared to traditional return cab bookings.",
      "Door-to-door private journey — no travelling with strangers or shared stops.",
      "Flexible departure time — leave whenever you are ready.",
      "All toll & tax breakdowns pre-estimated with complete transparency."
    ],
    inclusions: [
      "Dedicated private car for your group",
      "Driver allowance and fuel",
      "Sanitized AC vehicle",
      "Pick-up and drop-off at your exact addresses"
    ],
    exclusions: [
      "State road toll booth receipts (billed at actuals or bundled as quoted)",
      "Extended multi-hour mid-journey halts"
    ],
    faqs: [
      {
        q: "Can I book a one-way taxi for late night travel?",
        a: "Yes, our drivers operate 24 hours a day. Night journeys on the national highway are safe and comfortable."
      },
      {
        q: "Can we stop for tea or meals along the highway?",
        a: "Of course. You have full liberty to request food and refreshment stops at clean highway food malls."
      }
    ]
  },
  "round-trip-taxi": {
    slug: "round-trip-taxi",
    tripType: "ROUND_TRIP",
    title: "Round-Trip Outstation Cars",
    subtitle: "Dedicated chauffeur and car for return outstation journeys with flexible waiting.",
    heroImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    description: "Planning a family function, client meeting, or weekend holiday? Our round-trip car service gives you complete peace of mind. Your assigned car and driver remain with you throughout your journey, ready to take you for local sightseeing, shopping, or meetings before driving you safely back home to Vapi.",
    whyChoose: [
      "Special 10% round-trip discount with promo code LAXMI10.",
      "Driver remains stationed with vehicle during your stay.",
      "Explore intermediate viewpoints and temple stops without extra booking hassles.",
      "Spacious SUVs (Innova Crysta, Ertiga) available for large families with luggage."
    ],
    inclusions: [
      "Entire round-trip vehicle distance",
      "Chauffeur overnight stay allowance",
      "Air conditioning throughout travel",
      "Multiple local stops in destination city"
    ],
    exclusions: [
      "Interstate permit taxes (if applicable)",
      "Parking charges at private venues/monuments"
    ],
    faqs: [
      {
        q: "Do I need to arrange hotel accommodation for the driver?",
        a: "No. The driver allowance included in your booking covers the driver's meals and lodging arrangements."
      }
    ]
  },
  "local-rental": {
    slug: "local-rental",
    tripType: "LOCAL_HOURLY",
    title: "Local Vapi & GIDC Car Rental",
    subtitle: "Chauffeured cars for industrial visits across Vapi GIDC, Sarigam, Umbergaon, and Daman.",
    heroImage: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80",
    description: "Vapi is one of Asia's largest industrial hubs. Navigating between chemical factories, paper mills, textile units, and executive meetings requires reliable local transport. Laxmi Travels provides full-day and half-day chauffeured cars familiar with every phase and lane of Vapi GIDC, Sarigam, and neighbouring union territories.",
    whyChoose: [
      "Drivers know all Vapi GIDC phases, industrial landmarks, and factory gates.",
      "Keep your luggage and laptop safely in the air-conditioned car while visiting plants.",
      "Corporate GST invoices issued for easy company expense reimbursement.",
      "Comfortable Sedans and executive SUVs available on short notice."
    ],
    inclusions: [
      "Chauffeur and car for chosen hours & km package",
      "Fuel and city transit",
      "Chilled air conditioning"
    ],
    exclusions: [
      "Extra kilometers beyond package limit (billed at standard per-km rate)",
      "Extra hours beyond package (billed at ₹150–₹250/hr)"
    ],
    faqs: [
      {
        q: "Can we extend our local car rental package during the day?",
        a: "Yes. Simply inform your chauffeur or call our desk to extend from half-day to full-day smoothly."
      }
    ]
  },
  "hourly-rental": {
    slug: "hourly-rental",
    tripType: "LOCAL_HOURLY",
    title: "Hourly & Full-Day Car Rental",
    subtitle: "Choose from 4 Hrs / 40 Km, 8 Hrs / 80 Km, or Full Day packages.",
    heroImage: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80",
    description: "Have a busy day lined up with multiple errands, doctor visits, family shopping, or wedding preparations? Hire a Laxmi Travels car on an hourly package and eliminate the headache of hailing multiple taxis or parking in congested markets.",
    whyChoose: [
      "Choose from 4h/40km, 8h/80km, or 12h/120km packages.",
      "Car is exclusively reserved for you for the duration.",
      "Chauffeur waits patiently while you complete your errands.",
      "Clean interior with comfortable legroom."
    ],
    inclusions: [
      "Assigned vehicle for package hours and kilometers",
      "Chauffeur service and fuel",
      "Air conditioning"
    ],
    exclusions: [
      "Toll charges if exiting local area",
      "Extra hours and extra kilometers beyond package"
    ],
    faqs: [
      {
        q: "What happens if we exceed the 80 km limit in the 8-hour package?",
        a: "Extra kilometers are simply billed at the vehicle's standard per-km rate (e.g. ₹12/km for Dzire) upon trip completion."
      }
    ]
  },
  "corporate-travel": {
    slug: "corporate-travel",
    tripType: "ONE_WAY",
    title: "Corporate Car Travel Solutions",
    subtitle: "Executive mobility for corporate executives, client airport transfers, and company delegations.",
    heroImage: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80",
    description: "Laxmi Travels partners with leading corporate firms, pharmaceuticals, and manufacturing industries in Vapi, Sarigam, and Daman. We provide executive sedans, Innova Crysta/Hycross, and luxury cars for corporate delegations, client transfers, board meetings, and plant inspections.",
    whyChoose: [
      "Uniformed, English/Hindi speaking professional chauffeurs.",
      "Corporate billing with detailed trip sheets and GST compliance.",
      "Fleet includes Honda City, Innova Crysta, and Mercedes-Benz.",
      "Sanitized cars with mobile fast chargers, newspapers, and bottled water."
    ],
    inclusions: [
      "Executive class vehicle and chauffeur",
      "GST invoice with company name and GSTIN",
      "Dedicated corporate booking manager"
    ],
    exclusions: [
      "Overnight driver allowance if applicable"
    ],
    faqs: [
      {
        q: "Can we set up a monthly billing agreement for our company?",
        a: "Yes! We offer monthly consolidated billing for verified corporate accounts. Contact +91 7255055889 to set up an account."
      }
    ]
  },
  "road-trips": {
    slug: "road-trips",
    tripType: "CUSTOM_ROAD_TRIP",
    title: "Customized Road Trips & Weekend Tours",
    subtitle: "Explore Saputara, Daman, Statue of Unity, and Saurashtra with family & friends.",
    heroImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    description: "Gujarat and neighbouring regions are packed with breathtaking road trip destinations. From the cool ghats of Saputara hill station and breezy Portuguese beaches of Daman to the towering Statue of Unity and sacred Somnath temple — Laxmi Travels crafts personalized road trips with comfortable cars and experienced drivers.",
    whyChoose: [
      "Custom multi-day itineraries crafted around your family's pace.",
      "Drivers with special experience driving safely on mountain ghats and curves.",
      "Force Urbania and Tempo Traveller 13-17 seater options for big groups.",
      "Freedom to pause for panoramic photo shoots and highway dhabas."
    ],
    inclusions: [
      "Complete tour vehicle for all days",
      "Driver duty and highway tolls estimate",
      "Fuel and hill climb allowances"
    ],
    exclusions: [
      "Hotel accommodations and entry tickets to monuments",
      "Personal meals and activities"
    ],
    faqs: [
      {
        q: "Can we customize the stops and route during the road trip?",
        a: "Absolutely. Our customized road trips are 100% private. You can add or modify sightseeing stops as you wish."
      }
    ]
  },
  "outstation-travel": {
    slug: "outstation-travel",
    tripType: "OUTSTATION",
    title: "Outstation Highway Taxi Service",
    subtitle: "Comfortable, safe highway car journeys from Vapi to anywhere in Western India.",
    heroImage: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
    description: "Whether you need to travel to Mumbai, Surat, Pune, Nashik, Shirdi, or Ahmedabad, Laxmi Travels ensures a fatigue-free highway experience. Our highway-tuned cars and verified chauffeurs make long distance road travel effortless and comfortable.",
    whyChoose: [
      "Highway safety compliant vehicles with ABS and airbags.",
      "Drivers trained in defensive expressway driving.",
      "One-way and round-trip options with upfront transparent fares.",
      "Emergency road support & replacement vehicle backup."
    ],
    inclusions: [
      "Private AC car and chauffeur",
      "Fuel and scheduled highway route",
      "Doorstep pickup and drop"
    ],
    exclusions: [
      "Highway toll plaza charges (billed at actuals)"
    ],
    faqs: [
      {
        q: "Are the vehicles permit-compliant for Maharashtra and Gujarat?",
        a: "Yes. All our vehicles carry valid All-India Tourist / Commercial taxi permits and valid insurance."
      }
    ]
  }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = serviceDictionary[slug];
  if (!service) return { title: "Service Not Found" };
  return {
    title: `${service.title} | Laxmi Travels Vapi`,
    description: service.subtitle,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = serviceDictionary[slug];

  if (!service) {
    notFound();
  }

  return (
    <div style={{ paddingTop: "20px", paddingBottom: "80px" }}>
      {/* Hero */}
      <section style={{
        position: "relative",
        background: "var(--navy-950)",
        color: "#FFFFFF",
        padding: "70px 0 90px",
        overflow: "hidden"
      }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.35 }}>
          <Image
            src={service.heroImage}
            alt={service.title}
            fill
            priority
            style={{ objectFit: "cover" }}
          />
        </div>
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(5,11,26,0.85) 0%, rgba(5,11,26,0.95) 100%)"
        }} />

        <div className="container" style={{ position: "relative", zIndex: 10, maxWidth: "900px", textAlign: "center" }}>
          <span className="eyebrow" style={{ color: "var(--orange-500)" }}>Laxmi Travels Car Service</span>
          <h1 className="heading-display" style={{ marginBottom: "16px", color: "#FFFFFF" }}>
            {service.title}
          </h1>
          <p style={{ color: "#E2E8F0", fontSize: "1.15rem", lineHeight: 1.6, marginBottom: "30px" }}>
            {service.subtitle}
          </p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#book-service-now" className="btn btn-primary" style={{ padding: "12px 28px" }}>
              Book This Service Online
            </a>
            <a href="tel:+917255055889" className="btn btn-call" style={{ padding: "12px 22px" }}>
              <Phone size={16} /> Call +91 7255055889
            </a>
            <a
              href={`https://wa.me/7255055889?text=Hello+Laxmi+Travels%2C+I+am+inquiring+about+${encodeURIComponent(service.title)}.`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp"
              style={{ padding: "12px 22px" }}
            >
              <MessageSquare size={16} /> WhatsApp Inquiry
            </a>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="container" style={{ marginTop: "60px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: "50px",
          alignItems: "flex-start"
        }}>
          {/* Left Column: Deep Content, Features, Inclusions, FAQs */}
          <div>
            <div className="card" style={{ padding: "34px", marginBottom: "36px" }}>
              <h2 className="heading-2" style={{ color: "var(--navy-900)", marginBottom: "16px" }}>
                Service Overview
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "28px" }}>
                {service.description}
              </p>

              <h3 className="heading-3" style={{ color: "var(--navy-900)", marginBottom: "16px" }}>
                Key Advantages with Laxmi Travels
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "30px" }}>
                {service.whyChoose.map((adv, idx) => (
                  <div key={idx} style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "0.925rem" }}>
                    <ShieldCheck size={18} style={{ color: "var(--orange-500)", flexShrink: 0, marginTop: "2px" }} />
                    <span style={{ color: "var(--navy-900)" }}>{adv}</span>
                  </div>
                ))}
              </div>

              {/* Inclusions & Exclusions */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
                background: "#F8FAFC",
                padding: "20px",
                borderRadius: "12px"
              }}>
                <div>
                  <h4 style={{ color: "#16A34A", fontSize: "0.95rem", fontWeight: 700, marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <CheckCircle2 size={16} /> What&apos;s Included
                  </h4>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.85rem", color: "var(--navy-900)" }}>
                    {service.inclusions.map((inc, i) => (
                      <li key={i}>&bull; {inc}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 style={{ color: "#DC2626", fontSize: "0.95rem", fontWeight: 700, marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <XCircle size={16} /> Excluded / Extras
                  </h4>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                    {service.exclusions.map((exc, i) => (
                      <li key={i}>&bull; {exc}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* FAQs */}
            <div className="card" style={{ padding: "34px" }}>
              <h3 className="heading-2" style={{ color: "var(--navy-900)", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
                <HelpCircle size={24} style={{ color: "var(--orange-500)" }} />
                Frequently Asked Questions
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                {service.faqs.map((faq, i) => (
                  <div key={i} style={{ borderBottom: i < service.faqs.length - 1 ? "1px solid #F1F5F9" : "none", paddingBottom: "14px" }}>
                    <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--navy-900)", marginBottom: "6px" }}>
                      {faq.q}
                    </h4>
                    <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Instant Booking Widget Pre-configured */}
          <div id="book-service-now" style={{ position: "sticky", top: "100px" }}>
            <div style={{ marginBottom: "14px", fontWeight: 700, color: "var(--navy-900)", fontSize: "1.1rem" }}>
              Book {service.title}
            </div>
            <BookingWidget initialTripType={service.tripType} compact />
          </div>
        </div>
      </div>
    </div>
  );
}
