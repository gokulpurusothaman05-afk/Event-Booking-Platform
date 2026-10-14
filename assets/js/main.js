/**
 * STACKLY - Global JavaScript Engine
 * Handles State Persistence, Cart Drawer, Dynamic User Auth,
 * Notification System, Navigation, and Evendo-style Micro-interactions.
 */

// ==========================================================================
// 1. Initial Seed Data & LocalStorage State
// ==========================================================================

const STACKLY_INITIAL_DATA = {
  venues: [
    {
      id: "v-blr-01",
      name: "The Glasshouse & Pavilion",
      city: "Bengaluru",
      area: "Indiranagar",
      tag: "Tech Luxe · Glass Atrium",
      capacity: 450,
      pricePerDay: 185000,
      image: "assets/images/venue-indiranagar.webp",
      type: "Glasshouse",
      rating: 4.9,
      reviewsCount: 48,
      features: ["Acoustic Ceiling", "1 Gbps Fiber", "Valet 120 Cars", "Green Rooms"]
    },
    {
      id: "v-udr-02",
      name: "Lakeview Heritage Palace & Lawns",
      city: "Udaipur",
      area: "Lake Pichola",
      tag: "Royal Heritage · Destination",
      capacity: 850,
      pricePerDay: 650000,
      image: "assets/images/venue-udaipur.webp",
      type: "Palace",
      rating: 5.0,
      reviewsCount: 72,
      features: ["Private Boat Jetty", "Heritage Courtyard", "Helipad Access", "FSSAI Royal Kitchen"]
    },
    {
      id: "v-goa-03",
      name: "Azure Clifftop Ocean Villa & Lawn",
      city: "Goa",
      area: "Vagator Beachfront",
      tag: "Beachside · Founder Retreats",
      capacity: 300,
      pricePerDay: 320000,
      image: "assets/images/venue-goa.webp",
      type: "Beachfront",
      rating: 4.9,
      reviewsCount: 64,
      features: ["Sunset Deck", "Infinity Pool", "Open-air Stage", "24/7 Bar License"]
    },
    {
      id: "v-mum-04",
      name: "Starlight Grand Ballroom & Terrace",
      city: "Mumbai",
      area: "Bandra Kurla Complex (BKC)",
      tag: "Corporate Gala · Executive",
      capacity: 1200,
      pricePerDay: 480000,
      image: "assets/images/venue-mumbai.webp",
      type: "Banquet",
      rating: 4.8,
      reviewsCount: 89,
      features: ["Truss Staging Rig", "Breakout Rooms", "Direct Metro Access", "VIP Lounges"]
    },
    {
      id: "v-del-05",
      name: "The Horizon Skylight Atrium",
      city: "Delhi-NCR",
      area: "Cyber City Gurugram",
      tag: "Auditorium · Tech Summits",
      capacity: 650,
      pricePerDay: 275000,
      image: "assets/images/venue-gurugram.webp",
      type: "Auditorium",
      rating: 4.9,
      reviewsCount: 53,
      features: ["4K Projection", "Simultaneous Translation", "High-speed Wi-Fi 6", "VIP Suite"]
    },
    {
      id: "v-jpr-06",
      name: "Amer Heritage Courtyard & Lawns",
      city: "Jaipur",
      area: "Kukas Heritage Belt",
      tag: "Mughal Lawns · Grand Sangeet",
      capacity: 950,
      pricePerDay: 520000,
      image: "assets/images/venue-jaipur.webp",
      type: "Heritage",
      rating: 4.9,
      reviewsCount: 41,
      features: ["Carved Sandstone Archways", "Fireworks Permission", "Elephant Gateway", "30 Guest Suites"]
    },
    {
      id: "v-hyd-07",
      name: "Deccan Tech Convention Hub",
      city: "Hyderabad",
      area: "Hitec City · T-Hub",
      tag: "Hackathon Lab · Keynote Hall",
      capacity: 800,
      pricePerDay: 210000,
      image: "assets/images/venue-hyderabad.webp",
      type: "Convention",
      rating: 4.7,
      reviewsCount: 38,
      features: ["Tiered Seating", "Live Broadcast Studio", "Gigabit LAN Drops", "Cafeteria Wing"]
    },
    {
      id: "v-chn-08",
      name: "Bayview Coastal Pavilion",
      city: "Chennai",
      area: "East Coast Road (ECR)",
      tag: "Sea Breeze · Open Air",
      capacity: 500,
      pricePerDay: 195000,
      image: "assets/images/venue-chennai.webp",
      type: "Resort",
      rating: 4.8,
      reviewsCount: 29,
      features: ["Private Beach Access", "Tropical Lawn", "Outdoor Rigging", "Cottage Stays"]
    }
  ],
  bookings: [
    {
      id: "STK-2026-BLR-104",
      eventName: "Annual Leadership & Innovation Summit",
      venueId: "v-blr-01",
      venueName: "The Glasshouse & Pavilion, Bengaluru",
      date: "2026-11-20",
      guests: 320,
      package: "Enterprise Scale",
      city: "Bengaluru",
      totalPrice: 485000,
      status: "Confirmed",
      clientEmail: "leadership@enterprise.in",
      clientName: "Executive Member",
      createdAt: "2026-10-10"
    },
    {
      id: "STK-2026-GOA-208",
      eventName: "Founders & Creators Beach Retreat",
      venueId: "v-goa-03",
      venueName: "Azure Clifftop Ocean Villa, Goa",
      date: "2026-12-05",
      guests: 180,
      package: "Custom Destination Gala",
      city: "Goa",
      totalPrice: 620000,
      status: "Confirmed",
      clientEmail: "founders@retreat.in",
      clientName: "Founding Member",
      createdAt: "2026-10-11"
    },
    {
      id: "STK-2026-MUM-312",
      eventName: "Fintech Unicorn Annual Gala & Dinner",
      venueId: "v-mum-04",
      venueName: "Starlight Grand Ballroom, Mumbai",
      date: "2026-11-14",
      guests: 600,
      package: "Enterprise Scale",
      city: "Mumbai",
      totalPrice: 890000,
      status: "Pending",
      clientEmail: "corp.events@fintech.in",
      clientName: "Corporate Planner",
      createdAt: "2026-10-12"
    },
    {
      id: "STK-2026-UDR-418",
      eventName: "Royal Heritage Celebration & Sangeet",
      venueId: "v-udr-02",
      venueName: "Lakeview Heritage Palace, Udaipur",
      date: "2026-12-18",
      guests: 450,
      package: "Custom Destination Gala",
      city: "Udaipur",
      totalPrice: 1450000,
      status: "In Review",
      clientEmail: "family@heritage.in",
      clientName: "Host Family",
      createdAt: "2026-10-13"
    }
  ],
  cart: [],
  currentUser: {
    isLoggedIn: false,
    role: "client",
    email: "",
    name: "Member",
    company: "Enterprise Partner"
  }
};

// Store Helper
const StacklyStore = {
  init() {
    if (!localStorage.getItem("stackly_venues")) {
      localStorage.setItem("stackly_venues", JSON.stringify(STACKLY_INITIAL_DATA.venues));
    }
    if (!localStorage.getItem("stackly_bookings")) {
      localStorage.setItem("stackly_bookings", JSON.stringify(STACKLY_INITIAL_DATA.bookings));
    }
    if (!localStorage.getItem("stackly_user")) {
      localStorage.setItem("stackly_user", JSON.stringify(STACKLY_INITIAL_DATA.currentUser));
    }
    // Only logged-in users have persistent cart items; unauthenticated users start with an empty cart
    const currentUser = this.getUser();
    if (!currentUser || !currentUser.isLoggedIn) {
      localStorage.setItem("stackly_cart", JSON.stringify([]));
    } else if (!localStorage.getItem("stackly_cart")) {
      localStorage.setItem("stackly_cart", JSON.stringify([]));
    }
  },

  getVenues() {
    return JSON.parse(localStorage.getItem("stackly_venues")) || [];
  },
  saveVenues(venues) {
    localStorage.setItem("stackly_venues", JSON.stringify(venues));
  },

  getBookings() {
    return JSON.parse(localStorage.getItem("stackly_bookings")) || [];
  },
  saveBookings(bookings) {
    localStorage.setItem("stackly_bookings", JSON.stringify(bookings));
  },

  getCart() {
    return JSON.parse(localStorage.getItem("stackly_cart")) || [];
  },
  saveCart(cart) {
    localStorage.setItem("stackly_cart", JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent("stackly:cart-updated"));
  },

  getUser() {
    return JSON.parse(localStorage.getItem("stackly_user")) || STACKLY_INITIAL_DATA.currentUser;
  },
  saveUser(user) {
    localStorage.setItem("stackly_user", JSON.stringify(user));
    window.dispatchEvent(new CustomEvent("stackly:auth-updated"));
  }
};

// Initialize Store
StacklyStore.init();

// Currency formatter utility: ₹ 1,85,000
function formatINR(number) {
  if (typeof number !== "number") number = Number(number) || 0;
  return "₹" + number.toLocaleString("en-IN");
}

// Extract human-friendly name from email
function extractNameFromEmail(email) {
  if (!email || !email.includes("@")) return "Member";
  const prefix = email.split("@")[0].trim();
  if (prefix.toLowerCase() === "admin") return "Operations Administrator";
  const clean = prefix.replace(/[._\-+0-9]+/g, " ").trim();
  if (!clean) return "Member";
  return clean
    .split(" ")
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

// Extract company from email domain
function extractCompanyFromEmail(email) {
  if (!email || !email.includes("@")) return "Enterprise Partner";
  const domain = email.split("@")[1];
  const main = domain.split(".")[0];
  if (["gmail", "yahoo", "outlook", "hotmail", "icloud", "mail", "rediffmail", "protonmail"].includes(main.toLowerCase())) {
    return "Enterprise Client";
  }
  return main.charAt(0).toUpperCase() + main.slice(1) + " Corp";
}

// Toast Notification Utility
function showToast(message, type = "normal") {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast-msg ${type}`;
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ==========================================================================
// 2. Global Navigation, Mobile Menu & Sticky Header
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  // Update UI with logged in user if applicable
  const currentUser = StacklyStore.getUser();
  if (currentUser && currentUser.isLoggedIn) {
    const authBtns = document.querySelectorAll(".nav-auth-btn span");
    authBtns.forEach(span => {
      span.textContent = currentUser.name.split(" ")[0];
    });
  }

  // Mobile Menu Toggle
  const mobileToggle = document.querySelector(".mobile-toggle");
  const mobileDrawer = document.querySelector(".mobile-nav-drawer");
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener("click", () => {
      mobileToggle.classList.toggle("active");
      mobileDrawer.classList.toggle("open");
    });
  }

  // Cart Drawer Elements
  const cartTrigger = document.querySelector(".cart-trigger");
  const cartOverlay = document.querySelector(".cart-overlay");
  const cartDrawer = document.querySelector(".cart-drawer");
  const cartCloseBtn = document.querySelector(".cart-close-btn");

  function openCart() {
    if (cartOverlay && cartDrawer) {
      renderCartItems();
      cartOverlay.classList.add("open");
      cartDrawer.classList.add("open");
      document.body.style.overflow = "hidden";
    }
  }

  function closeCart() {
    if (cartOverlay && cartDrawer) {
      cartOverlay.classList.remove("open");
      cartDrawer.classList.remove("open");
      document.body.style.overflow = "";
    }
  }

  if (cartTrigger) cartTrigger.addEventListener("click", openCart);
  if (cartCloseBtn) cartCloseBtn.addEventListener("click", closeCart);
  if (cartOverlay) cartOverlay.addEventListener("click", closeCart);

  // Auth Modal Elements
  const authOverlay = document.querySelector(".auth-modal-overlay");
  const authClose = document.querySelector(".auth-close-btn");

  function openAuth() {
    if (authOverlay) {
      authOverlay.classList.add("open");
      document.body.style.overflow = "hidden";
      const emailInput = document.querySelector("#auth-email");
      if (emailInput) emailInput.focus();
    } else {
      window.location.href = "index.html#login";
    }
  }

  function closeAuth() {
    if (authOverlay) {
      authOverlay.classList.remove("open");
      document.body.style.overflow = "";
    }
  }

  // Bind Auth Triggers
  const generalAuthTriggers = document.querySelectorAll(".auth-trigger:not(.nav-auth-btn)");
  generalAuthTriggers.forEach(btn => btn.addEventListener("click", openAuth));

  const navAuthBtns = document.querySelectorAll(".nav-auth-btn");
  if (currentUser && currentUser.isLoggedIn) {
    const authBtns = document.querySelectorAll(".nav-auth-btn span");
    authBtns.forEach(span => {
      span.textContent = currentUser.name.split(" ")[0];
    });
    navAuthBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.location.href = currentUser.role === "admin" ? "admin-dashboard.html" : "client-dashboard.html";
      });
    });
  } else {
    navAuthBtns.forEach(btn => btn.addEventListener("click", openAuth));
  }

  if (authClose) authClose.addEventListener("click", closeAuth);
  if (authOverlay) {
    authOverlay.addEventListener("click", (e) => {
      if (e.target === authOverlay) closeAuth();
    });
  }

  // Automatic login modal trigger via URL hash #login
  if (window.location.hash === "#login") {
    openAuth();
  }

  // Back to Top Button
  const backToTopBtn = document.querySelector(".back-to-top-btn");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Update Cart Badge Counter
  updateCartBadge();
  window.addEventListener("stackly:cart-updated", updateCartBadge);

  // Setup Auth Modal
  setupAuthModal();

  // Attach global form validator and redirect to 404 for all forms except the login form
  setupFormRedirections();

  // Attach link redirection for any unrouted or placeholder links
  setupLinkRedirections();
});

// Update Badge in Navbar
function updateCartBadge() {
  const badge = document.querySelector(".cart-badge");
  if (!badge) return;
  const cart = StacklyStore.getCart();
  const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  badge.textContent = count;
}

// Render Items inside Cart Drawer
function renderCartItems() {
  const container = document.querySelector(".cart-drawer-body");
  const totalElem = document.querySelector(".cart-total-line span.total-val");
  const subtotalElem = document.querySelector(".cart-subtotal-val");
  const gstElem = document.querySelector(".cart-gst-val");
  const checkoutBtn = document.querySelector(".cart-checkout-btn");

  if (!container) return;

  const cart = StacklyStore.getCart();

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty-notice">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin: 0 auto 16px; opacity: 0.4;">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <p style="font-weight: 600; font-size: 1.1rem; color: #fff; margin-bottom: 6px;">Your cart is empty</p>
        <p style="font-size: 0.85rem;">Explore curated venues, catering or staging packages to begin your booking.</p>
      </div>
    `;
    if (subtotalElem) subtotalElem.textContent = "₹0";
    if (gstElem) gstElem.textContent = "₹0";
    if (totalElem) totalElem.textContent = "₹0";
    if (checkoutBtn) checkoutBtn.style.opacity = "0.5";
    return;
  }

  let subtotal = 0;
  container.innerHTML = "";

  cart.forEach((item, index) => {
    subtotal += (item.price * (item.quantity || 1));
    const card = document.createElement("div");
    card.className = "cart-item-card";
    card.innerHTML = `
      <img src="${item.image || 'assets/images/venue-indiranagar.webp'}" alt="${item.title}" class="cart-item-thumb">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.title}</div>
        <div class="cart-item-city">${item.city || 'India'} · ${item.type || 'Booking'}</div>
        <div class="cart-item-price">${formatINR(item.price)}</div>
      </div>
      <button class="cart-item-remove" data-index="${index}" title="Remove item">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    `;
    container.appendChild(card);
  });

  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;

  if (subtotalElem) subtotalElem.textContent = formatINR(subtotal);
  if (gstElem) gstElem.textContent = formatINR(gst);
  if (totalElem) totalElem.textContent = formatINR(total);
  if (checkoutBtn) {
    checkoutBtn.style.opacity = "1";
    checkoutBtn.onclick = handleCartCheckout;
  }

  // Bind remove buttons
  container.querySelectorAll(".cart-item-remove").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.getAttribute("data-index"), 10);
      const currentCart = StacklyStore.getCart();
      const removed = currentCart.splice(idx, 1);
      StacklyStore.saveCart(currentCart);
      showToast(`Removed "${removed[0]?.title}" from cart`);
      renderCartItems();
    });
  });
}

// Add Item to Cart (Only Allowed After Login)
function addToCart(item) {
  const user = StacklyStore.getUser();
  if (!user || !user.isLoggedIn) {
    showToast("Please sign in to add items to your cart and book events.", "info");
    const authOverlay = document.querySelector(".auth-modal-overlay");
    if (authOverlay) {
      authOverlay.classList.add("open");
      document.body.style.overflow = "hidden";
      const emailInput = document.querySelector("#auth-email");
      if (emailInput) emailInput.focus();
    } else {
      window.location.href = "index.html#login";
    }
    return;
  }

  const cart = StacklyStore.getCart();
  cart.push(item);
  StacklyStore.saveCart(cart);
  showToast(`Added "${item.title}" to cart!`, "success");
}

// Handle Cart Checkout
function handleCartCheckout() {
  const user = StacklyStore.getUser();
  if (!user || !user.isLoggedIn) {
    showToast("Please sign in to complete escrow checkout.", "info");
    const authOverlay = document.querySelector(".auth-modal-overlay");
    if (authOverlay) {
      authOverlay.classList.add("open");
      document.body.style.overflow = "hidden";
      const emailInput = document.querySelector("#auth-email");
      if (emailInput) emailInput.focus();
    } else {
      window.location.href = "index.html#login";
    }
    return;
  }

  const cart = StacklyStore.getCart();
  if (cart.length === 0) return;
  const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;

  const newBookingId = `STK-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
  const firstItem = cart[0];

  const newBooking = {
    id: newBookingId,
    eventName: `${firstItem.title} - Event Reservation`,
    venueId: firstItem.id,
    venueName: firstItem.title,
    date: new Date(Date.now() + 15 * 86400000).toISOString().split("T")[0],
    guests: 250,
    package: "Turnkey Package",
    city: firstItem.city || "Bengaluru",
    totalPrice: total,
    status: "Confirmed",
    clientEmail: user.email || "client@company.in",
    clientName: user.name || "Enterprise Member",
    createdAt: new Date().toISOString().split("T")[0]
  };

  const currentBookings = StacklyStore.getBookings();
  currentBookings.unshift(newBooking);
  StacklyStore.saveBookings(currentBookings);

  // Clear Cart
  StacklyStore.saveCart([]);
  renderCartItems();

  const cartOverlay = document.querySelector(".cart-overlay");
  const cartDrawer = document.querySelector(".cart-drawer");
  if (cartOverlay) cartOverlay.classList.remove("open");
  if (cartDrawer) cartDrawer.classList.remove("open");
  document.body.style.overflow = "";

  showToast(`Booking ${newBookingId} confirmed!`, "success");

  setTimeout(() => {
    window.location.href = "client-dashboard.html";
  }, 1000);
}

// ==========================================================================
// 3. User Authentication Setup & Dynamic User Name from Email Input
// ==========================================================================

function setupAuthModal() {
  const tabBtns = document.querySelectorAll(".auth-tab-btn");
  const form = document.querySelector(".auth-login-form");
  const emailInput = document.querySelector("#auth-email");
  const roleInput = document.querySelector("#auth-role");

  let activeRole = "client";

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeRole = btn.getAttribute("data-role") || "client";
      if (roleInput) roleInput.value = activeRole;
    });
  });

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = emailInput ? emailInput.value.trim() : "";
      if (!email || !email.includes("@")) {
        showToast("Please enter a valid email address.", "error");
        return;
      }

      const userName = extractNameFromEmail(email);
      const companyName = extractCompanyFromEmail(email);
      const isAdmin = activeRole === "admin" || email.toLowerCase().includes("admin");

      const userData = {
        isLoggedIn: true,
        role: isAdmin ? "admin" : "client",
        email: email,
        name: userName,
        company: companyName
      };

      StacklyStore.saveUser(userData);
      showToast(`Welcome, ${userName}! Opening your dashboard...`, "success");

      setTimeout(() => {
        window.location.href = isAdmin ? "admin-dashboard.html" : "client-dashboard.html";
      }, 700);
    });
  }
}

// ==========================================================================
// 4. Global Form Redirection to 404 (Except Login Form)
// ==========================================================================

function setupFormRedirections() {
  const allForms = document.querySelectorAll("form");
  allForms.forEach(form => {
    if (form.classList.contains("auth-login-form")) {
      return; // Login form handles authentic login
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      // Check HTML5 validity
      if (form.checkValidity && !form.checkValidity()) {
        form.reportValidity();
        return;
      }

      showToast("Submission validated successfully. Redirecting...", "success");
      setTimeout(() => {
        window.location.href = "404.html";
      }, 700);
    });
  });
}

// ==========================================================================
// 5. Global Link Redirection for Unrouted/Placeholder Links to 404
// ==========================================================================

function setupLinkRedirections() {
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;
    const href = link.getAttribute("href");
    if (!href || href === "#" || href === "" || href.startsWith("javascript:")) {
      e.preventDefault();
      window.location.href = "404.html";
    }
  });
}

// Make available globally
window.StacklyStore = StacklyStore;
window.formatINR = formatINR;
window.showToast = showToast;
window.addToCart = addToCart;
window.extractNameFromEmail = extractNameFromEmail;

