import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-main",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Laxmi Travels Vapi — Premium Car Travel Agency",
    default: "Laxmi Travels | Car Travel Agency Vapi — Taxi, Airport & Outstation Cars",
  },
  description:
    "Laxmi Travels is Vapi's premier car travel agency. Book reliable outstation taxis, Mumbai & Surat airport transfers, local car rentals, and luxury road trips. 24x7 service, transparent pricing, 4.9★ Google rated.",
  keywords: [
    "Laxmi Travels Vapi",
    "Car Travel Agency Vapi",
    "Taxi service in Vapi",
    "Vapi to Mumbai Airport cab",
    "Vapi to Surat taxi",
    "Car rental Vapi Gujarat",
    "Innova Crysta rental Vapi",
    "Dzire taxi Vapi",
    "Outstation cab Vapi",
    "Corporate car rental Vapi",
  ],
  authors: [{ name: "Laxmi Travels" }],
  creator: "Laxmi Travels",
  publisher: "Laxmi Travels",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://laxmi-travels.grexa.site",
    title: "Laxmi Travels — Premium Car Travel Agency in Vapi, Gujarat",
    description: "Every Journey Begins With Trust. Clean, reliable cars, courteous drivers, 24/7 service in Vapi, Gujarat.",
    siteName: "Laxmi Travels",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
