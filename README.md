# Stackly — Premium Event Booking & Production Platform

Stackly is an enterprise-grade, multi-page event booking and turnkey production platform designed specifically for the Indian corporate and luxury event ecosystem. Built with pure HTML5, CSS3, and vanilla JavaScript, Stackly delivers a cohesive, high-performance web experience inspired by modern editorial aesthetics.

---

## 🌟 Visual Identity & Art Direction

Stackly replicates the visual sophistication and layout mechanics of high-end design systems:
- **Typography Matrix**:
  - **Headings**: `Anton` — Bold, uppercase, ultra-condensed architectural display lettering.
  - **Accents & Pills**: `Space Grotesk` — Monospace-inspired tracking for status tags, metadata, and category badges.
  - **Body Copy**: `Plus Jakarta Sans` — Clean, legible geometric grotesque optimized for high-density reading.
- **Color Palette**:
  - **Deep Midnight Surfaces**: `#0a031f`, `#0f052b`, `#130a2e`
  - **Warm Peach Accent**: `#ffc394`
  - **Electric Mint Glow**: `#a0ffc2`
  - **Lilac Haze Tint**: `#b8afff`
  - **Crisp Text**: `#ffffff` and `#cbd5e1`
  - **Perforated Ticket Cards**: Dashed cut-out lines with semi-circle coupon notches.
  - **Arrow Circles**: Circular button accents with crisp vector directional carats.
  - **Interactive Calibrated Sliders**: Live price calculation across headcount and duration.
  - **Glassmorphic Surface Tinting**: Fine 1px subtle borders with translucent dark backgrounds.
  - **Emblem Brand Logo**: `assets/images/logo.webp` integrated across all navigation headers, footers, authentication modals, dashboard topbars, and page favicons.

---

## 🏛️ Indian Business Scenarios & Pan-India Footprint

- **Tier-1 Tech Capitals**: Bengaluru (Indiranagar Glasshouses, Whitefield convention campuses) and Mumbai (Bandra-Kurla Complex ballrooms).
- **Executive Destination Retreats**: Goa (Vagator clifftop ocean villas), Udaipur (Lake Pichola heritage palaces), Jaipur (Amer royal havelis), and Coorg (coffee estate pavilions).
- **Unified Indian ₹ Pricing & Taxation**:
  - Formatted in Indian standard numbering system (e.g., `₹1,49,000`, `₹63,00,000`).
  - Integrated 18% GST calculation with consolidated single-invoice procurement.
  - Milestone escrow accounts with RBI compliance guarantees.

---

## 📁 Project Architecture & File Structure

```text
Event Booking Platform/
├── 404.html                   # Custom 404 missing stage error page
├── admin-dashboard.html       # Super Admin operations console & analytics
├── client-dashboard.html      # Client booking portal & tax invoice pass
├── enterprise.html            # Turnkey executive summits & offsites
├── index.html                 # Main stage flagship homepage (8+ sections)
├── pricing.html               # Production tiers, ticket packages & fee comparison
├── services.html              # 6 pillars of staging & custom bundle calculator
├── venues.html                # Verified pan-India space directory & city filters
├── README.md                  # Project documentation
└── assets/
    ├── css/
    │   ├── style.css          # Main stylesheet & responsive layout (320px+)
    │   └── dashboard.css      # Portal styles, tables, and metric cards
    ├── js/
    │   ├── admin-dash.js      # Canvas charts & admin approval workflows
    │   ├── booking.js         # Venue filtering & bundle price calculation
    │   ├── client-dash.js     # Client reservations, tab switching & passes
    │   └── main.js            # Global navigation, auth, cart & redirections
    └── images/                # 31 local WebP photography assets (< 100 KB each)
        ├── about-stage.webp
        ├── enterprise-hero.webp
        ├── gallery-1.webp to gallery-4.webp
        ├── hero-bg.webp
        ├── logo.webp
        ├── offsite-coorg.webp, offsite-goa.webp, offsite-rajasthan.webp
        ├── service-av.webp, service-catering.webp, service-decor.webp, ...
        ├── speaker-1.webp to speaker-6.webp
        └── venue-blr, venue-goa, venue-hyd, venue-jpr, venue-mum, venue-udr.webp
```

---

## 🚀 Key Features & Interactions

### 1. Dynamic User Login & Smart Name Extraction
- Login modal asks for corporate email directly (no preset credentials).
- Automatically parses full human names from arbitrary email formats:
  - `rohit.sharma@gmail.com` → **Rohit Sharma**
  - `priya_verma@startup.in` → **Priya Verma**
  - `admin@stackly.in` → **Operations Administrator**
- Dynamically greets the authenticated user across Client and Admin portals.
- Role-based automatic routing to either the Client Portal or Admin Operations Console.

### 2. Comprehensive Navigation & Form Redirections
- **Login Form**: Authenticates the user and opens their personal dashboard.
- **All Other Forms**: Strictly validate HTML5 required inputs and redirect to `404.html` on submission.
- **Unrouted Links & Buttons**: Every unrouted link and footer social media button (LinkedIn, Twitter/X, Instagram, Facebook, YouTube) routes cleanly to `404.html`.
- **Slide-in Cart & Escrow Drawer**: Add venues, production tiers, or service bundles with real-time subtotal, 18% GST calculation, and instant booking submission.

### 3. Pure Vanilla JS Canvas Analytics
- **Revenue Trend Line Chart**: Visualizes quarterly growth from Q1 to Q4 with smooth line interpolation, fill gradients, and coordinate points.
- **Event Distribution Donut Chart**: Renders category ratios (Summits, Offsites, Banquets, Galas) with custom segmented arcs.
- **City Distribution Bar Chart**: Compares volume across Bengaluru, Mumbai, Goa, and Jaipur.

### 4. 100% Local WebP Assets (< 100 KB)
- All 31 photography assets are local `.webp` files under 100 KB each, guaranteeing lightning-fast paint times without remote third-party dependencies.

### 5. Seamless Multi-Screen Responsiveness
- Built mobile-first with adaptive layouts verified down to **320px** viewports:
  - Responsive hero typography with `clamp()` and small-screen word-break protection.
  - Multi-column grids collapsing into stacked cards on mobile devices.
  - Smooth touch-scrollable tabs and table containers with horizontal scroll wrappers.
  - Full-screen animated mobile drawer navigation.

---

## 💻 How to Run Locally

Because this project is built entirely with pure HTML5, CSS3, and vanilla JavaScript without external build tools or compilers, you can run it immediately with any static file server:

### Option 1: Python HTTP Server (Recommended)
```bash
# Navigate to the project root directory
cd "Event Booking Platform"

# Start a local web server on port 8000
python -m http.server 8000
```
Open your browser and navigate to: [http://localhost:8000](http://localhost:8000)

### Option 2: Node.js `http-server`
```bash
npx http-server -p 8000
```

### Option 3: VS Code Live Server
Right-click on `index.html` inside VS Code and choose **Open with Live Server**.

---

## 📄 License
© 2026 Stackly Platform Technologies Pvt. Ltd. All rights reserved.
