/**
 * STACKLY - Admin Dashboard Controller
 * Pure Vanilla JavaScript Charts (Canvas), Live Approval Queue,
 * and Dynamic KPI Computation.
 */

document.addEventListener("DOMContentLoaded", () => {
  renderAdminMetrics();
  initAdminCharts();
  renderAdminBookingsTable();
  renderAdminVenuesTable();
  setupAdminTabs();
});

// ==========================================================================
// 1. KPI Metrics
// ==========================================================================

function renderAdminMetrics() {
  const bookings = StacklyStore.getBookings();
  const venues = StacklyStore.getVenues();
  const user = StacklyStore.getUser();

  const adminNameElem = document.querySelector("#admin-user-name");
  const adminEmailElem = document.querySelector("#admin-user-email");
  const adminGreetingElem = document.querySelector("#admin-greeting-name");

  const displayName = (user && user.name) ? user.name : "Operations Admin";
  const displayEmail = (user && user.email) ? user.email : "admin@stackly.in";

  if (adminNameElem) adminNameElem.textContent = displayName;
  if (adminEmailElem) adminEmailElem.textContent = `${displayEmail} · Superuser`;
  if (adminGreetingElem) adminGreetingElem.textContent = displayName.toUpperCase();

  // Wire up Add New Venue Modal
  const openVenueBtn = document.querySelector("#btn-open-new-venue");
  const venueOverlay = document.querySelector("#new-venue-overlay");
  const venueClose = document.querySelector("#new-venue-close");
  if (openVenueBtn && venueOverlay && !openVenueBtn.dataset.bound) {
    openVenueBtn.dataset.bound = "true";
    openVenueBtn.addEventListener("click", () => venueOverlay.classList.add("open"));
  }
  if (venueClose && venueOverlay && !venueClose.dataset.bound) {
    venueClose.dataset.bound = "true";
    venueClose.addEventListener("click", () => venueOverlay.classList.remove("open"));
  }
  if (venueOverlay && !venueOverlay.dataset.bound) {
    venueOverlay.dataset.bound = "true";
    venueOverlay.addEventListener("click", (e) => {
      if (e.target === venueOverlay) venueOverlay.classList.remove("open");
    });
  }

  let totalRevenue = 0;
  let confirmedCount = 0;
  let pendingCount = 0;

  bookings.forEach(b => {
    totalRevenue += (b.totalPrice || 0);
    if (b.status === "Confirmed") confirmedCount++;
    else if (b.status === "Pending" || b.status === "In Review") pendingCount++;
  });

  const avgBooking = bookings.length > 0 ? Math.round(totalRevenue / bookings.length) : 0;

  const revElem = document.querySelector("#admin-kpi-revenue");
  const countElem = document.querySelector("#admin-kpi-bookings");
  const venuesElem = document.querySelector("#admin-kpi-venues");
  const avgElem = document.querySelector("#admin-kpi-avg");

  if (revElem) revElem.textContent = formatINR(totalRevenue);
  if (countElem) countElem.textContent = bookings.length;
  if (venuesElem) venuesElem.textContent = venues.length;
  if (avgElem) avgElem.textContent = formatINR(avgBooking);
}

// ==========================================================================
// 2. Pure Vanilla JS Canvas Charts
// ==========================================================================

function initAdminCharts() {
  drawRevenueTrendChart();
  drawEventTypeDonutChart();
  drawCityBarChart();

  window.addEventListener("resize", () => {
    drawRevenueTrendChart();
    drawEventTypeDonutChart();
    drawCityBarChart();
  });
}

function drawRevenueTrendChart() {
  const canvas = document.querySelector("#chart-revenue-trend");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.parentElement.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const w = rect.width;
  const h = rect.height;
  const padding = { top: 30, right: 30, bottom: 40, left: 55 };

  const labels = ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov (Proj)", "Dec (Proj)"];
  const values = [18.5, 24.0, 31.2, 28.6, 42.4, 58.2, 74.0, 92.5];

  ctx.clearRect(0, 0, w, h);

  const maxVal = 100;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
  ctx.lineWidth = 1;
  ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
  ctx.font = "11px 'Plus Jakarta Sans', sans-serif";
  ctx.textAlign = "right";

  for (let i = 0; i <= 4; i++) {
    const yVal = maxVal * (i / 4);
    const yPos = h - padding.bottom - (yVal / maxVal) * (h - padding.top - padding.bottom);
    ctx.beginPath();
    ctx.moveTo(padding.left, yPos);
    ctx.lineTo(w - padding.right, yPos);
    ctx.stroke();
    ctx.fillText(`₹${yVal}L`, padding.left - 10, yPos + 4);
  }

  const points = [];
  const chartWidth = w - padding.left - padding.right;
  const stepX = chartWidth / (labels.length - 1);

  ctx.textAlign = "center";
  labels.forEach((label, idx) => {
    const x = padding.left + idx * stepX;
    const y = h - padding.bottom - (values[idx] / maxVal) * (h - padding.top - padding.bottom);
    points.push({ x, y, val: values[idx], label });
    ctx.fillText(label, x, h - padding.bottom + 20);
  });

  const gradient = ctx.createLinearGradient(0, padding.top, 0, h - padding.bottom);
  gradient.addColorStop(0, "rgba(255, 195, 148, 0.45)");
  gradient.addColorStop(1, "rgba(255, 195, 148, 0.0)");

  ctx.beginPath();
  ctx.moveTo(points[0].x, h - padding.bottom);
  points.forEach(pt => ctx.lineTo(pt.x, pt.y));
  ctx.lineTo(points[points.length - 1].x, h - padding.bottom);
  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.fill();

  ctx.beginPath();
  ctx.strokeStyle = "#ffc394";
  ctx.lineWidth = 3;
  points.forEach((pt, idx) => {
    if (idx === 0) ctx.moveTo(pt.x, pt.y);
    else ctx.lineTo(pt.x, pt.y);
  });
  ctx.stroke();

  points.forEach(pt => {
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = "#0a031f";
    ctx.fill();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = "#a0ffc2";
    ctx.stroke();
  });
}

function drawEventTypeDonutChart() {
  const canvas = document.querySelector("#chart-event-types");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.parentElement.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const w = rect.width;
  const h = rect.height;
  const centerX = w * 0.4;
  const centerY = h * 0.5;
  const radius = Math.min(centerX, centerY) - 20;
  const innerRadius = radius * 0.62;

  const data = [
    { label: "Corporate Retreats", val: 38, color: "#ffc394" },
    { label: "Tech Summits", val: 28, color: "#a0ffc2" },
    { label: "Destination Galas", val: 20, color: "#f7cfff" },
    { label: "Product Launches", val: 14, color: "#ffd166" }
  ];

  ctx.clearRect(0, 0, w, h);

  let startAngle = -Math.PI / 2;
  data.forEach(item => {
    const sliceAngle = (item.val / 100) * (Math.PI * 2);
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
    ctx.arc(centerX, centerY, innerRadius, startAngle + sliceAngle, startAngle, true);
    ctx.closePath();
    ctx.fillStyle = item.color;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#0a031f";
    ctx.stroke();
    startAngle += sliceAngle;
  });

  ctx.textAlign = "center";
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 22px 'Anton', sans-serif";
  ctx.fillText("100%", centerX, centerY + 2);
  ctx.font = "10px 'Plus Jakarta Sans', sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.fillText("DISTRIBUTION", centerX, centerY + 18);

  const legendX = w * 0.72;
  let legendY = h * 0.25;
  ctx.textAlign = "left";
  data.forEach(item => {
    ctx.fillStyle = item.color;
    ctx.beginPath();
    ctx.roundRect(legendX, legendY, 10, 10, 3);
    ctx.fill();

    ctx.font = "12px 'Plus Jakarta Sans', sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`${item.val}% ${item.label}`, legendX + 16, legendY + 9);
    legendY += 28;
  });
}

function drawCityBarChart() {
  const canvas = document.querySelector("#chart-city-bars");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.parentElement.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const w = rect.width;
  const h = rect.height;
  const padding = { top: 20, right: 20, bottom: 40, left: 40 };

  const cities = [
    { name: "BLR", count: 68, color: "#ffc394" },
    { name: "MUM", count: 52, color: "#a0ffc2" },
    { name: "DEL", count: 34, color: "#f7cfff" },
    { name: "GOA", count: 46, color: "#ffd166" },
    { name: "UDR", count: 28, color: "#ffc394" },
    { name: "HYD", count: 32, color: "#a0ffc2" }
  ];

  ctx.clearRect(0, 0, w, h);

  const maxVal = 80;
  const barWidth = (w - padding.left - padding.right) / cities.length - 16;

  cities.forEach((city, idx) => {
    const x = padding.left + idx * (barWidth + 16) + 8;
    const barHeight = (city.count / maxVal) * (h - padding.top - padding.bottom);
    const y = h - padding.bottom - barHeight;

    ctx.fillStyle = city.color;
    ctx.beginPath();
    ctx.roundRect(x, y, barWidth, barHeight, [8, 8, 0, 0]);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 11px 'Plus Jakarta Sans', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`${city.count}`, x + barWidth / 2, y - 6);

    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.font = "11px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText(city.name, x + barWidth / 2, h - padding.bottom + 18);
  });
}

// ==========================================================================
// 3. Admin Bookings Table & Live Approval Queue
// ==========================================================================

function renderAdminBookingsTable(filterStatus = "all", searchTerm = "") {
  const tbody = document.querySelector("#admin-bookings-tbody");
  if (!tbody) return;

  const bookings = StacklyStore.getBookings();
  const filtered = bookings.filter(b => {
    const matchStatus = filterStatus === "all" || b.status.toLowerCase() === filterStatus.toLowerCase();
    const matchSearch = b.eventName.toLowerCase().includes(searchTerm) ||
                        b.id.toLowerCase().includes(searchTerm) ||
                        b.clientName.toLowerCase().includes(searchTerm) ||
                        b.city.toLowerCase().includes(searchTerm);
    return matchStatus && matchSearch;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; padding: 40px; color: var(--body-color-dark);">
          No booking requests match the current filters.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = "";
  filtered.forEach(b => {
    const tr = document.createElement("tr");

    let statusClass = "pending";
    if (b.status === "Confirmed") statusClass = "confirmed";
    else if (b.status === "In Review") statusClass = "review";
    else if (b.status === "Rejected") statusClass = "rejected";

    tr.innerHTML = `
      <td style="font-family: var(--body-font); font-weight: 700; color: var(--color-light);">${b.id}</td>
      <td>
        <div style="font-weight: 700; color: #fff;">${b.eventName}</div>
        <div style="font-size: 0.8rem; color: var(--body-color-dark);"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="svg-icon"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> ${b.venueName}</div>
      </td>
      <td>
        <div>${b.clientName}</div>
        <div style="font-size: 0.78rem; color: var(--body-color-dark);">${b.clientEmail}</div>
      </td>
      <td>${b.date}</td>
      <td><span class="status-pill ${statusClass}">${b.status}</span></td>
      <td style="font-family: var(--heading-font); font-size: 1.15rem; color: var(--accent);">${formatINR(b.totalPrice)}</td>
      <td>
        <div class="table-action-btns">
          ${b.status !== "Confirmed" ? `
            <button class="btn-table-action approve" data-id="${b.id}" title="Approve Booking">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="svg-icon check"><polyline points="20 6 9 17 4 12"></polyline></svg> Approve
            </button>
          ` : ''}
          ${b.status !== "Rejected" ? `
            <button class="btn-table-action reject" data-id="${b.id}" title="Reject Booking">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="svg-icon cross"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> Reject
            </button>
          ` : ''}
          <button class="btn-table-action view" data-id="${b.id}" title="View Details">
            Details
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });

  tbody.querySelectorAll(".btn-table-action.approve").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      updateBookingStatus(id, "Confirmed");
    });
  });

  tbody.querySelectorAll(".btn-table-action.reject").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      updateBookingStatus(id, "Rejected");
    });
  });

  tbody.querySelectorAll(".btn-table-action.view").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      openAdminDetailsModal(id);
    });
  });
}

function updateBookingStatus(bookingId, newStatus) {
  const bookings = StacklyStore.getBookings();
  const target = bookings.find(b => b.id === bookingId);
  if (target) {
    target.status = newStatus;
    StacklyStore.saveBookings(bookings);
    showToast(`Booking ${bookingId} marked as ${newStatus}!`, newStatus === "Confirmed" ? "success" : "normal");
    renderAdminMetrics();
    renderAdminBookingsTable();
  }
}

function openAdminDetailsModal(bookingId) {
  const bookings = StacklyStore.getBookings();
  const b = bookings.find(item => item.id === bookingId);
  if (!b) return;

  alert(`STACKLY BOOKING AUDIT\n\nID: ${b.id}\nEvent: ${b.eventName}\nVenue: ${b.venueName}\nDate: ${b.date}\nGuests: ${b.guests}\nPackage: ${b.package}\nClient: ${b.clientName} (${b.clientEmail})\nTotal Price: ₹${b.totalPrice.toLocaleString('en-IN')}\nCurrent Status: ${b.status}`);
}

// ==========================================================================
// 4. Venue Inventory Management Table
// ==========================================================================

function renderAdminVenuesTable() {
  const tbody = document.querySelector("#admin-venues-tbody");
  if (!tbody) return;

  const venues = StacklyStore.getVenues();
  tbody.innerHTML = "";

  venues.forEach(v => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><img src="${v.image}" style="width: 44px; height: 44px; border-radius: 8px; object-fit: cover;"></td>
      <td style="font-weight: 700; color: #fff;">${v.name}</td>
      <td>${v.city} (${v.area})</td>
      <td>${v.capacity} pax</td>
      <td style="font-family: var(--heading-font); color: var(--color-light);">${formatINR(v.pricePerDay)}/d</td>
      <td><span style="color: var(--accent); font-weight: 700;"><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" class="svg-icon star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg> ${v.rating}</span></td>
      <td>
        <span class="status-pill confirmed">Active</span>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function setupAdminTabs() {
  const tabLinks = document.querySelectorAll(".admin-tab-link");
  const tabPanes = document.querySelectorAll(".admin-tab-pane");

  tabLinks.forEach(link => {
    link.addEventListener("click", () => {
      tabLinks.forEach(l => l.classList.remove("active"));
      tabPanes.forEach(p => p.classList.remove("active"));

      link.classList.add("active");
      const targetId = link.getAttribute("data-tab");
      const targetPane = document.querySelector(`#${targetId}`);
      if (targetPane) targetPane.classList.add("active");
    });
  });

  const searchInput = document.querySelector("#admin-booking-search");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      renderAdminBookingsTable("all", e.target.value.toLowerCase().trim());
    });
  }
}
