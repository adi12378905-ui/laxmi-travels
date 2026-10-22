// Seed file for Laxmi Travels Car Travel Agency database
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Laxmi Travels Database...");

  // 1. Settings
  await prisma.setting.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      businessName: "Laxmi Travels",
      phone: "+91 7255055889",
      whatsapp: "7255055889",
      email: "laxmitravelsvapi@gmail.com",
      address: "PL. NO. C/6-2/13, SHOP G/04, N.H. 8, Vapi, Taluka - Pardi, Vapi, Gujarat 396191",
      tagline: "Every Journey Begins With Trust.",
      razorpayKeyId: "rzp_test_laxmi_travels_mock",
      razorpaySecret: "mock_secret_key",
      enableOnlinePay: true,
    },
  });

  // 2. Users
  const adminPasswordHash = await bcrypt.hash("admin123", 10);
  const customerPasswordHash = await bcrypt.hash("customer123", 10);

  await prisma.user.upsert({
    where: { email: "admin@laxmitravels.com" },
    update: { passwordHash: adminPasswordHash },
    create: {
      name: "Laxmi Travels Admin",
      email: "admin@laxmitravels.com",
      phone: "+917255055889",
      passwordHash: adminPasswordHash,
      role: "ADMIN",
    },
  });

  await prisma.user.upsert({
    where: { email: "customer@gmail.com" },
    update: { passwordHash: customerPasswordHash },
    create: {
      name: "Rajesh Sharma",
      email: "customer@gmail.com",
      phone: "+919876543210",
      passwordHash: customerPasswordHash,
      role: "CUSTOMER",
    },
  });

  // 3. Vehicles
  const vehicles = [
    {
      slug: "sedan-dzire",
      name: "Maruti Suzuki Dzire / Honda Amaze",
      category: "SEDAN",
      seatingCapacity: 4,
      luggageCapacity: 3,
      hasAc: true,
      fuelType: "CNG / Petrol",
      transmission: "Manual / Automatic",
      ratePerKm: 12.0,
      baseFare: 1500.0,
      perHourRate: 250.0,
      minHours: 4,
      image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
      description: "India's most loved comfortable executive sedan. High fuel efficiency, smooth suspension, clean interior, and ample trunk space for outstation and airport rides.",
      features: JSON.stringify([
        "Powerful Air Conditioning",
        "Ample Boot Space for 3 Suitcases",
        "Mobile Charging Ports",
        "Aux / Bluetooth Audio System",
        "Clean Sanitized Fabric Seats",
        "Professional Chauffeur"
      ]),
      isActive: true,
    },
    {
      slug: "premium-suv-innova-crysta",
      name: "Toyota Innova Crysta / Hycross",
      category: "PREMIUM_SUV",
      seatingCapacity: 7,
      luggageCapacity: 5,
      hasAc: true,
      fuelType: "Diesel / Hybrid",
      transmission: "Manual / Automatic",
      ratePerKm: 19.0,
      baseFare: 3000.0,
      perHourRate: 450.0,
      minHours: 4,
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
      description: "The gold standard in Indian highway travel. Plush captain chairs, dual-zone AC, unmatched road presence, and supreme comfort for long family or corporate trips.",
      features: JSON.stringify([
        "Plush Reclining Captain Seats",
        "Dual-Zone Rear AC Vents",
        "Extra Large Luggage Capacity",
        "High Safety Rating & Airbags",
        "USB Fast Charging Ports",
        "Experienced Highway Chauffeur"
      ]),
      isActive: true,
    },
    {
      slug: "suv-ertiga",
      name: "Maruti Suzuki Ertiga / Kia Carens",
      category: "SUV",
      seatingCapacity: 6,
      luggageCapacity: 4,
      hasAc: true,
      fuelType: "CNG / Petrol",
      transmission: "Manual",
      ratePerKm: 15.0,
      baseFare: 2200.0,
      perHourRate: 350.0,
      minHours: 4,
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
      description: "Spacious 6-seater MUV ideal for family outings, airport drop-offs, and Saurashtra / Daman road trips. Economical and comfortable.",
      features: JSON.stringify([
        "Roof-Mounted Rear AC Blowers",
        "Flexible 3-Row Foldable Seating",
        "Smooth Highway Cruising",
        "Luggage Carrier on Request",
        "Sanitized Interior & Water Bottles"
      ]),
      isActive: true,
    },
    {
      slug: "premium-sedan-verna-city",
      name: "Honda City / Hyundai Verna",
      category: "PREMIUM_SEDAN",
      seatingCapacity: 4,
      luggageCapacity: 3,
      hasAc: true,
      fuelType: "Petrol",
      transmission: "Automatic",
      ratePerKm: 16.0,
      baseFare: 2500.0,
      perHourRate: 400.0,
      minHours: 4,
      image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80",
      description: "Premium executive car with leather upholstery, sunroof, and silent cabin. Perfect for executive business meetings in Vapi GIDC and Mumbai corporate trips.",
      features: JSON.stringify([
        "Premium Leatherette Upholstery",
        "Sunroof & Ambient Lighting",
        "Touchscreen Infotainment",
        "Silent Aerodynamic Cabin",
        "Formal Uniformed Chauffeur"
      ]),
      isActive: true,
    },
    {
      slug: "luxury-car-mercedes",
      name: "Mercedes-Benz E-Class / Audi A6",
      category: "LUXURY",
      seatingCapacity: 4,
      luggageCapacity: 3,
      hasAc: true,
      fuelType: "Diesel / Petrol",
      transmission: "Automatic",
      ratePerKm: 38.0,
      baseFare: 8000.0,
      perHourRate: 1200.0,
      minHours: 8,
      image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80",
      description: "Ultimate luxury and prestige for VIP guests, corporate delegations, and grand wedding car rentals in Vapi, Daman, and Surat.",
      features: JSON.stringify([
        "First-Class Executive Comfort",
        "Burmester High-End Sound System",
        "Rear Passenger Climate Zones",
        "VIP Chauffeur in Formal Attire",
        "Wedding Floral Ribbon Option"
      ]),
      isActive: true,
    },
    {
      slug: "hatchback-wagonr",
      name: "Maruti Suzuki WagonR / Swift",
      category: "HATCHBACK",
      seatingCapacity: 4,
      luggageCapacity: 2,
      hasAc: true,
      fuelType: "CNG / Petrol",
      transmission: "Manual",
      ratePerKm: 10.5,
      baseFare: 1100.0,
      perHourRate: 180.0,
      minHours: 4,
      image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80",
      description: "Affordable, tall-boy design hatchback for quick point-to-point transfers, local Vapi errands, and budget intercity commuting.",
      features: JSON.stringify([
        "Chilled Air Conditioning",
        "Tall-Boy Easy Ingress/Egress",
        "Compact & Agile in City Traffic",
        "Affordable Pocket-Friendly Fares",
        "Clean Interiors"
      ]),
      isActive: true,
    },
    {
      slug: "tempo-traveller-urbania",
      name: "Force Urbania / Tempo Traveller (13-17 Seater)",
      category: "TEMPO_TRAVELLER",
      seatingCapacity: 15,
      luggageCapacity: 12,
      hasAc: true,
      fuelType: "Diesel",
      transmission: "Manual",
      ratePerKm: 26.0,
      baseFare: 5500.0,
      perHourRate: 650.0,
      minHours: 8,
      image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80",
      description: "Luxury group travel coach with individual reclining pushback seats, individual AC louvers, LED TV, and massive luggage storage for family tours, temple visits, and wedding parties.",
      features: JSON.stringify([
        "Individual Reclining Pushback Seats",
        "Individual Overhead Reading Lights & AC Vents",
        "LED Screen & High Bass Audio",
        "Dedicated Separate Luggage Boot",
        "High Ceiling Walk-in Comfort",
        "Experienced Long-Distance Tour Chauffeur"
      ]),
      isActive: true,
    },
  ];

  for (const v of vehicles) {
    await prisma.vehicle.upsert({
      where: { slug: v.slug },
      update: v,
      create: v,
    });
  }

  // 4. Routes
  const routes = [
    {
      source: "Vapi",
      destination: "Surat",
      distanceKm: 115,
      durationHours: "2.5 hrs",
      sedanFare: 2200,
      suvFare: 3200,
      tollEstimate: 180,
      popular: true,
      imageUrl: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80",
      description: "Direct seamless highway ride via NH 48. Fast, comfortable drop to Surat Railway Station, Textile Market, or Surat International Airport.",
    },
    {
      source: "Vapi",
      destination: "Mumbai Airport (CSMIA / BOM)",
      distanceKm: 170,
      durationHours: "3.5 hrs",
      sedanFare: 3200,
      suvFare: 4500,
      tollEstimate: 260,
      popular: true,
      imageUrl: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80",
      description: "Reliable airport transfer with 24x7 timely pickup from your doorstep in Vapi right to Mumbai Terminal 1 or Terminal 2 Departure gates.",
    },
    {
      source: "Vapi",
      destination: "Ahmedabad",
      distanceKm: 375,
      durationHours: "6.5 hrs",
      sedanFare: 6500,
      suvFare: 8800,
      tollEstimate: 450,
      popular: true,
      imageUrl: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?auto=format&fit=crop&w=800&q=80",
      description: "Express journey via Vadodara-Ahmedabad Expressway. Premium highway cars with courteous drivers experienced in express routes.",
    },
    {
      source: "Vapi",
      destination: "Vadodara",
      distanceKm: 265,
      durationHours: "4.5 hrs",
      sedanFare: 4800,
      suvFare: 6500,
      tollEstimate: 320,
      popular: true,
      imageUrl: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
      description: "Comfortable car trip from Vapi to Vadodara for business trips, Alkapuri, GIDC Makarpura, or Laxmi Vilas Palace visits.",
    },
    {
      source: "Vapi",
      destination: "Daman (Devka / Jampore Beach)",
      distanceKm: 14,
      durationHours: "25 mins",
      sedanFare: 600,
      suvFare: 900,
      tollEstimate: 0,
      popular: true,
      imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      description: "Quick beach holiday transfer, resort pickups, sightseeing at Moti Daman Fort, Devka Beach, and water sports at Jampore Beach.",
    },
    {
      source: "Vapi",
      destination: "Saputara Hill Station",
      distanceKm: 125,
      durationHours: "3.2 hrs",
      sedanFare: 3400,
      suvFare: 4800,
      tollEstimate: 100,
      popular: true,
      imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      description: "Scenic ghat drive to Gujarat's premier hill station. Sunset Point, Saputara Lake, and cable car ropeway.",
    },
    {
      source: "Vapi",
      destination: "Silvassa (Dadra & Nagar Haveli)",
      distanceKm: 18,
      durationHours: "30 mins",
      sedanFare: 700,
      suvFare: 1000,
      tollEstimate: 0,
      popular: true,
      imageUrl: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80",
      description: "Convenient intercity ride to Silvassa industrial areas, resorts, Dudhni lake, and Lion Safari.",
    },
    {
      source: "Vapi",
      destination: "Shirdi Sai Baba Temple",
      distanceKm: 225,
      durationHours: "5.0 hrs",
      sedanFare: 4900,
      suvFare: 6800,
      tollEstimate: 280,
      popular: true,
      imageUrl: "https://images.unsplash.com/photo-1609766857329-a1b7e411b712?auto=format&fit=crop&w=800&q=80",
      description: "Peaceful pilgrimage package from Vapi to Shirdi. Same-day or overnight return journeys with driver accommodation handled.",
    },
  ];

  for (const r of routes) {
    const existing = await prisma.route.findFirst({
      where: { source: r.source, destination: r.destination },
    });
    if (!existing) {
      await prisma.route.create({ data: r });
    }
  }

  // 5. Authentic Reviews from Google Maps & Reference Site
  const reviews = [
    {
      authorName: "Aditya Jaiswal",
      authorLocation: "Vapi, Gujarat",
      rating: 5,
      comment: "Nice service better experience to travel. Try this service for long travel. Drivers are very polite and drive safely.",
      tripRoute: "Long Distance Highway Travel",
      avatarUrl: "https://lh3.googleusercontent.com/a/ACg8ocJB-mPYxJ_UO6-9dVTPegAXGA1DfCiA_dgDH2jq5MIBGo-vvw=s120-c-rp-mo-br100",
      verifiedBooking: true,
      isApproved: true,
    },
    {
      authorName: "Manubhai Patel",
      authorLocation: "Vapi, Gujarat",
      rating: 5,
      comment: "⭐⭐⭐⭐⭐ Excellent Service by Laxmi Travels Vapi! Today, I booked a taxi with Laxmi Travels Vapi for my trip to Mumbai, and it was my first experience with them. I am extremely happy with their service. The cab was clean and comfortable, and the driver was very polite, professional, and punctual. His driving was excellent, and I felt safe and comfortable throughout the journey. I truly appreciate the quality of service and the professionalism of the driver.",
      tripRoute: "Vapi to Mumbai Taxi",
      avatarUrl: "https://lh3.googleusercontent.com/a/ACg8ocI6OsAWpDHy8H9l8lQedWLPx1Xv7JMCIfeo7BIzlfvVXgJ1Nw=s120-c-rp-mo-br100",
      verifiedBooking: true,
      isApproved: true,
    },
    {
      authorName: "Nayan Rana",
      authorLocation: "Vapi, Gujarat",
      rating: 5,
      comment: "Best travel agent and taxi service in Vapi. On time pickup, fair pricing, and clean cars. Highly recommended!",
      tripRoute: "Airport Drop CSMIA",
      avatarUrl: "https://lh3.googleusercontent.com/a-/ALV-UjVU9H-EeMqkPl8ZaLr-3XtECvVZmB5sNXILqROoTh9svaVEu7QE=s120-c-rp-mo-br100",
      verifiedBooking: true,
      isApproved: true,
    },
    {
      authorName: "Faruk",
      authorLocation: "Vapi, Gujarat",
      rating: 5,
      comment: "⭐⭐⭐⭐⭐ Excellent Service by Laxmi Travels Vapi! I recently travelled from Vapi to Ajmer with Laxmi Travels, and my overall experience was absolutely wonderful. The behaviour of the driver was very polite, professional, and friendly. The car was clean and comfortable, and everything was perfectly managed throughout the journey. Thank you, Laxmi Travels, for providing such wonderful service!",
      tripRoute: "Vapi to Ajmer Outstation",
      avatarUrl: "https://lh3.googleusercontent.com/a/ACg8ocImsALv5Cdt7s9rV2S3_pcJLsKnWOoyq0E5fbengi5mKAqPjw=s120-c-rp-mo-br100",
      verifiedBooking: true,
      isApproved: true,
    },
    {
      authorName: "Guddu Kumar",
      authorLocation: "Vapi, Gujarat",
      rating: 5,
      comment: "⭐⭐⭐⭐⭐ Excellent Service – Laxmi Travels Vapi. I recently booked a return trip from Vapi to Vasai with Laxmi Travels Vapi, and my overall experience was excellent. The car was very clean and comfortable, and the driver was polite, professional, and well-behaved. The service was punctual, smooth, and reliable.",
      tripRoute: "Vapi to Vasai Return Trip",
      avatarUrl: "https://lh3.googleusercontent.com/a/ACg8ocKJt3qnX8u8vU3UHrlDYXACmyzvmgObkQGPYnHQG1W2zj22Lg=s120-c-rp-mo-br100",
      verifiedBooking: true,
      isApproved: true,
    },
    {
      authorName: "Sari Naik",
      authorLocation: "Vapi, Gujarat",
      rating: 5,
      comment: "I recently travelled with Laxmi Travels Vapi and had a very good experience. The car was clean and comfortable, the driver was polite and punctual, and the overall service was excellent. Thank you Laxmi Travels Vapi!",
      tripRoute: "Vapi to Surat Taxi",
      avatarUrl: "https://lh3.googleusercontent.com/a/ACg8ocIhlNtuitHORQ7hu6_ZTPVVxw55QEk6H_JHOcZ5XtmMGBnGnw=s120-c-rp-mo-br100",
      verifiedBooking: true,
      isApproved: true,
    },
  ];

  for (const rv of reviews) {
    const existing = await prisma.review.findFirst({
      where: { authorName: rv.authorName },
    });
    if (!existing) {
      await prisma.review.create({ data: rv });
    }
  }

  // 6. Offers
  const offers = [
    {
      code: "LAXMI10",
      title: "Round-Trip 10% Savings",
      description: "Get 10% instant discount on round-trip outstation bookings from Vapi to any city.",
      discountPercent: 10,
      minTripFare: 2500,
      validUntil: "2026-12-31",
      isActive: true,
    },
    {
      code: "AIRPORT150",
      title: "Mumbai & Surat Airport Flat ₹150 Off",
      description: "Flat ₹150 discount on all direct one-way airport transfers to BOM or STV.",
      discountAmount: 150,
      minTripFare: 2000,
      validUntil: "2026-12-31",
      isActive: true,
    },
    {
      code: "WEEKEND200",
      title: "Daman & Saputara Weekend Special",
      description: "Save ₹200 on customized road trips and weekend leisure packages.",
      discountAmount: 200,
      minTripFare: 1500,
      validUntil: "2026-12-31",
      isActive: true,
    },
  ];

  for (const o of offers) {
    await prisma.offer.upsert({
      where: { code: o.code },
      update: o,
      create: o,
    });
  }

  // 7. Seed sample bookings for Demonstration and Admin Tracking
  const sampleBookings = [
    {
      bookingRef: "LT-2026-1042",
      tripType: "ONE_WAY",
      customerName: "Mahesh Joshi",
      customerPhone: "+91 9825123456",
      customerEmail: "mahesh.joshi@gmail.com",
      pickupLocation: "Gunjan Char Rasta, Vapi",
      dropLocation: "Chhatrapati Shivaji Maharaj International Airport (T2), Mumbai",
      pickupDate: "2026-10-24",
      pickupTime: "06:30",
      passengerCount: 3,
      luggageCount: 3,
      vehicleName: "Toyota Innova Crysta",
      vehicleCategory: "PREMIUM_SUV",
      estimatedKm: 175,
      baseFare: 4500,
      tollTaxes: 260,
      driverAllowance: 300,
      discountAmount: 150,
      totalFare: 4910,
      status: "CONFIRMED",
      paymentStatus: "PAID",
      paymentMethod: "ONLINE_RAZORPAY",
      razorpayOrderId: "order_mock_1042",
      razorpayPaymentId: "pay_mock_1042",
      paidAmount: 4910,
      driverName: "Ramesh Bhai Patel",
      driverPhone: "+91 9898123456",
      vehiclePlateNo: "GJ-15-CH-4821",
      adminNotes: "Client flight at 12:30 PM. Punctual pickup required.",
    },
    {
      bookingRef: "LT-2026-1088",
      tripType: "ROUND_TRIP",
      customerName: "Sanjay Shah",
      customerPhone: "+91 9428567890",
      customerEmail: "sanjay.shah@textilehub.in",
      pickupLocation: "Vapi GIDC Phase 2",
      dropLocation: "Surat Ring Road Textile Market",
      pickupDate: "2026-10-25",
      pickupTime: "08:00",
      returnDate: "2026-10-25",
      returnTime: "19:00",
      passengerCount: 2,
      luggageCount: 2,
      vehicleName: "Maruti Suzuki Dzire",
      vehicleCategory: "SEDAN",
      estimatedKm: 240,
      baseFare: 3600,
      tollTaxes: 360,
      driverAllowance: 250,
      discountAmount: 360,
      totalFare: 3850,
      status: "AWAITING_PAYMENT",
      paymentStatus: "PENDING",
      paymentMethod: "ONLINE_RAZORPAY",
      adminNotes: "Quotation accepted by client. Waiting for token payment.",
    },
    {
      bookingRef: "LT-2026-1120",
      tripType: "CUSTOM_ROAD_TRIP",
      customerName: "Dr. Ananya Desai",
      customerPhone: "+91 9879012345",
      customerEmail: "ananya.desai@gmail.com",
      pickupLocation: "Chala, Vapi",
      dropLocation: "Saputara Hill Station (3 Days Tour)",
      pickupDate: "2026-10-28",
      pickupTime: "07:00",
      returnDate: "2026-10-30",
      returnTime: "20:00",
      passengerCount: 5,
      luggageCount: 4,
      vehicleName: "Maruti Suzuki Ertiga",
      vehicleCategory: "SUV",
      estimatedKm: 420,
      baseFare: 7500,
      tollTaxes: 300,
      driverAllowance: 900,
      totalFare: 8700,
      status: "QUOTE_PENDING",
      paymentStatus: "PENDING",
      specialInstructions: "Family sightseeing with senior citizen. Need experienced hill driver.",
      adminNotes: "Need to verify driver schedule for Saputara ghats.",
    },
  ];

  for (const b of sampleBookings) {
    const existing = await prisma.booking.findUnique({
      where: { bookingRef: b.bookingRef },
    });
    if (!existing) {
      await prisma.booking.create({ data: b });
    }
  }

  console.log("Seeding complete! Database ready with authentic Laxmi Travels data.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
