/**
 * STACKLY - Client Dashboard Controller
 * Manages Client Event Bookings, Wishlist, Itineraries, and Invoices.
 */

document.addEventListener("DOMContentLoaded", () => {
  renderClientMetrics();
  renderClientBookings();
  renderClientWishlist();
  setupClientTabs();
  setupInvoiceModal();
});

function renderClientMetrics() {
  const bookings = StacklyStore.getBookings();
  const user = StacklyStore.getUser();

  const totalSpentElem = document.querySelector("#client-metric-spent");
  const activeBookingsElem = document.querySelector("#client-metric-active");
  const pendingElem = document.querySelector("#client-metric-pending");
  const userNameElem = document.querySelector("#client-welcome-name");
  const userEmailElem = document.querySelector("#client-welcome-email");

  const displayName = user && user.name ? user.name : "Executive Member";
  const displayEmail = user && user.email ? user.email : "guest@enterprise.in";
  const displayCompany = user && user.company ? user.company : "Enterprise Partner";

  if (userNameElem) userNameElem.textContent = displayName;
  if (userEmailElem) userEmailElem.textContent = `${displayEmail} · ${displayCompany}`;
  const greetingElem = document.querySelector("#client-greeting-name");
  if (greetingElem) greetingElem.textContent = displayName.toUpperCase();

  // Wire up event request modal
  const openReqBtn = document.querySelector("#btn-open-request-modal");
  const reqOverlay = document.querySelector("#new-booking-overlay");
  const reqClose = document.querySelector("#new-booking-close");
  if (openReqBtn && reqOverlay && !openReqBtn.dataset.bound) {
    openReqBtn.dataset.bound = "true";
    openReqBtn.addEventListener("click", () => reqOverlay.classList.add("open"));
  }
  if (reqClose && reqOverlay && !reqClose.dataset.bound) {
    reqClose.dataset.bound = "true";
    reqClose.addEventListener("click", () => reqOverlay.classList.remove("open"));
  }
  if (reqOverlay && !reqOverlay.dataset.bound) {
    reqOverlay.dataset.bound = "true";
    reqOverlay.addEventListener("click", (e) => {
      if (e.target === reqOverlay) reqOverlay.classList.remove("open");
    });
  }

  let totalSpent = 0;
  let activeCount = 0;
  let pendingCount = 0;

  bookings.forEach(b => {
    if (b.status === "Confirmed") {
      totalSpent += (b.totalPrice || 0);
      activeCount++;
    } else if (b.status === "Pending" || b.status === "In Review") {
      pendingCount++;
    }
  });

  if (totalSpentElem) totalSpentElem.textContent = formatINR(totalSpent);
  if (activeBookingsElem) activeBookingsElem.textContent = activeCount;
  if (pendingElem) pendingElem.textContent = pendingCount;
}

function renderClientBookings(filterStatus = "all") {
  const container = document.querySelector("#client-bookings-list");
  if (!container) return;

  const bookings = StacklyStore.getBookings();
  const filtered = bookings.filter(b => {
    if (filterStatus === "all") return true;
    return b.status.toLowerCase() === filterStatus.toLowerCase();
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 50px 20px; background: rgba(255,255,255,0.03); border-radius: 20px;">
        <p style="font-size: 1.1rem; color: #fff; margin-bottom: 6px;">No bookings found</p>
        <p style="color: var(--body-color-dark);">You don't have any ${filterStatus === 'all' ? '' : filterStatus} event reservations at the moment.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = "";
  filtered.forEach(booking => {
    const card = document.createElement("div");
    card.className = "booking-ticket-card";

    let statusClass = "pending";
    if (booking.status === "Confirmed") statusClass = "confirmed";
    else if (booking.status === "In Review") statusClass = "review";
    else if (booking.status === "Rejected") statusClass = "rejected";

    card.innerHTML = `
      <img src="${booking.image || 'assets/images/venue-indiranagar.webp'}" alt="${booking.eventName}" class="booking-thumb">
      <div class="booking-details-box">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
          <span class="status-pill ${statusClass}">${booking.status}</span>
          <span style="font-size: 0.75rem; color: var(--color-light); font-weight: 700; letter-spacing: 0.05em;">REF: ${booking.id}</span>
        </div>
        <h3>${booking.eventName}</h3>
        <p style="color: var(--body-color-dark); font-size: 0.9rem;"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="svg-icon"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> ${booking.venueName}</p>
        <div class="booking-meta-row">
          <div class="booking-meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>Date: ${booking.date}</span>
          </div>
          <div class="booking-meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
            </svg>
            <span>${booking.guests} Guests</span>
          </div>
          <div class="booking-meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <span>${booking.package}</span>
          </div>
        </div>
      </div>
      <div class="booking-price-col">
        <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--body-color-dark);">Total Invoiced</span>
        <div class="booking-total-price">${formatINR(booking.totalPrice)}</div>
        <div style="display: flex; gap: 8px; margin-top: 8px;">
          <button class="btn-table-action view btn-view-invoice" data-id="${booking.id}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="svg-icon"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg> Invoice & Pass
          </button>
          ${booking.status !== "Cancelled" ? `
            <button class="btn-table-action reject btn-cancel-booking" data-id="${booking.id}">
              Cancel
            </button>
          ` : ''}
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  // Attach Invoice Modals
  container.querySelectorAll(".btn-view-invoice").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      openInvoiceModal(id);
    });
  });

  // Attach Cancel Actions
  container.querySelectorAll(".btn-cancel-booking").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      if (confirm(`Are you sure you want to cancel booking ${id}?`)) {
        const bookings = StacklyStore.getBookings();
        const target = bookings.find(b => b.id === id);
        if (target) {
          target.status = "Cancelled";
          StacklyStore.saveBookings(bookings);
          showToast(`Booking ${id} has been cancelled.`);
          renderClientMetrics();
          renderClientBookings(filterStatus);
        }
      }
    });
  });
}

function renderClientWishlist() {
  const container = document.querySelector("#client-wishlist-grid");
  if (!container) return;

  const venues = StacklyStore.getVenues();
  const saved = venues.slice(0, 3);

  container.innerHTML = "";
  saved.forEach(v => {
    const card = document.createElement("div");
    card.className = "venue-card";
    card.innerHTML = `
      <div class="venue-card-media">
        <img src="${v.image}" alt="${v.name}">
        <div class="venue-city-badge"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="svg-icon"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> ${v.city}</div>
      </div>
      <div class="venue-card-body">
        <h4 style="font-size: 1.15rem; font-weight: 700; color: #fff; margin-bottom: 4px;">${v.name}</h4>
        <p style="font-size: 0.85rem; color: var(--color-light); margin-bottom: 12px;">${v.tag}</p>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto;">
          <div style="font-family: var(--heading-font); font-size: 1.4rem; color: var(--accent);">${formatINR(v.pricePerDay)}</div>
          <button class="btn-primary" onclick="addToCart({id: '${v.id}', title: '${v.name}', type: 'Venue Booking', city: '${v.city}', price: ${v.pricePerDay}, quantity: 1, image: '${v.image}'})">
            <span>Book Space</span>
          </button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function setupClientTabs() {
  const tabLinks = document.querySelectorAll(".client-tab-link");
  const tabPanes = document.querySelectorAll(".client-tab-pane");

  tabLinks.forEach(link => {
    link.addEventListener("click", () => {
      tabLinks.forEach(l => l.classList.remove("active"));
      tabPanes.forEach(p => p.classList.remove("active"));

      link.classList.add("active");
      const targetId = link.getAttribute("data-tab");
      const targetPane = document.querySelector(`#${targetId}`);
      if (targetPane) targetPane.classList.add("active");

      const filter = link.getAttribute("data-filter");
      if (filter) {
        renderClientBookings(filter);
      }
    });
  });
}

function setupInvoiceModal() {
  // Attached dynamically
}

function openInvoiceModal(bookingId) {
  const bookings = StacklyStore.getBookings();
  const booking = bookings.find(b => b.id === bookingId);
  if (!booking) return;

  let modal = document.querySelector("#invoice-modal-overlay");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "invoice-modal-overlay";
    modal.className = "auth-modal-overlay";
    document.body.appendChild(modal);
  }

  const subtotal = Math.round(booking.totalPrice / 1.18);
  const gst = booking.totalPrice - subtotal;

  modal.innerHTML = `
    <div class="auth-modal" style="max-width: 600px; padding: 40px; background: #0e0624; border: 1px solid var(--accent);">
      <button class="auth-close-btn" onclick="document.querySelector('#invoice-modal-overlay').classList.remove('open')">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 20px; margin-bottom: 24px;">
        <div>
          <div style="font-family: var(--heading-font); font-size: 2rem; color: #fff;">STACKLY PASS & TAX INVOICE</div>
          <div style="font-size: 0.8rem; color: var(--accent); font-weight: 700;">GSTIN: 29AABCU9603R1ZM · ESCROW PROTECTED</div>
        </div>
        <div style="text-align: right;">
          <span class="status-pill confirmed">${booking.status}</span>
          <div style="font-size: 0.8rem; color: var(--body-color-dark); margin-top: 4px;">Ref: ${booking.id}</div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 0.9rem; margin-bottom: 24px;">
        <div>
          <div style="color: var(--color-light); font-weight: 700; text-transform: uppercase; font-size: 0.75rem;">Event & Client</div>
          <div style="color: #fff; font-weight: 600; font-size: 1.05rem; margin-top: 2px;">${booking.eventName}</div>
          <div style="color: var(--body-color-dark);">${booking.clientName}</div>
          <div style="color: var(--body-color-dark);">${booking.clientEmail}</div>
        </div>
        <div>
          <div style="color: var(--color-light); font-weight: 700; text-transform: uppercase; font-size: 0.75rem;">Venue & Execution</div>
          <div style="color: #fff; font-weight: 600; font-size: 1.05rem; margin-top: 2px;">${booking.venueName}</div>
          <div style="color: var(--body-color-dark);">Date: ${booking.date}</div>
          <div style="color: var(--body-color-dark);">${booking.guests} Attendees Registered</div>
        </div>
      </div>

      <div style="background: rgba(255,255,255,0.03); border-radius: 14px; padding: 18px; margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 8px;">
          <span style="color: var(--body-color-dark);">Base Event & Venue Package</span>
          <span style="color: #fff; font-weight: 600;">${formatINR(subtotal)}</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 8px;">
          <span style="color: var(--body-color-dark);">Integrated GST (18%)</span>
          <span style="color: #fff; font-weight: 600;">${formatINR(gst)}</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 1.25rem; font-weight: 700; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.1);">
          <span style="color: #fff;">Total Paid / Invoiced</span>
          <span style="color: var(--accent); font-family: var(--heading-font); font-size: 1.8rem;">${formatINR(booking.totalPrice)}</span>
        </div>
      </div>

      <div style="display: flex; gap: 12px; justify-content: flex-end;">
        <button class="btn-secondary" onclick="window.print()">Print Pass</button>
        <button class="btn-primary" onclick="showToast('Official PDF Invoice downloaded'); document.querySelector('#invoice-modal-overlay').classList.remove('open');">
          <span>Download PDF</span>
        </button>
      </div>
    </div>
  `;

  modal.classList.add("open");
}
