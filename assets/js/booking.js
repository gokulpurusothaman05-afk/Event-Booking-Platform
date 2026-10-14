/**
 * STACKLY - Booking & Interactive Calculator Engine
 * Handles Event Cost Estimators, Venue Filtering, Modal Detail Views,
 * and Dynamic Bundle Building.
 */

document.addEventListener("DOMContentLoaded", () => {
  initCostEstimator();
  initVenueFilters();
  initServiceBundleBuilder();
  initEnterpriseCalculator();
});

// ==========================================================================
// 1. Interactive Event Cost Estimator
// ==========================================================================

function initCostEstimator() {
  const guestSlider = document.querySelector("#calc-guests");
  const guestDisplay = document.querySelector("#calc-guests-val");
  const venueTypeSelect = document.querySelector("#calc-venue-type");
  const cateringPills = document.querySelectorAll(".catering-pill");
  const avPills = document.querySelectorAll(".av-pill");
  const totalDisplay = document.querySelector("#calc-total-inr");
  const venueCostDisplay = document.querySelector("#calc-venue-cost");
  const cateringCostDisplay = document.querySelector("#calc-catering-cost");
  const avCostDisplay = document.querySelector("#calc-av-cost");
  const bookEstimateBtn = document.querySelector("#calc-book-btn");

  if (!guestSlider || !totalDisplay) return;

  let guests = parseInt(guestSlider.value, 10) || 200;
  let cateringPerPlate = 1450;
  let avDailyCost = 95000;
  let venueBaseCost = 185000;

  function recalculate() {
    guests = parseInt(guestSlider.value, 10);
    if (guestDisplay) guestDisplay.textContent = `${guests} Guests`;

    // Venue type multiplier
    if (venueTypeSelect) {
      const selectedType = venueTypeSelect.value;
      if (selectedType === "palace") venueBaseCost = 450000;
      else if (selectedType === "beachfront") venueBaseCost = 280000;
      else if (selectedType === "glasshouse") venueBaseCost = 185000;
      else if (selectedType === "ballroom") venueBaseCost = 350000;
      else venueBaseCost = 150000;
    }

    const cateringTotal = guests * cateringPerPlate;
    const subtotal = venueBaseCost + cateringTotal + avDailyCost;
    const gst = Math.round(subtotal * 0.18);
    const grandTotal = subtotal + gst;

    if (venueCostDisplay) venueCostDisplay.textContent = formatINR(venueBaseCost);
    if (cateringCostDisplay) cateringCostDisplay.textContent = formatINR(cateringTotal);
    if (avCostDisplay) avCostDisplay.textContent = formatINR(avDailyCost);
    totalDisplay.textContent = formatINR(grandTotal);
  }

  guestSlider.addEventListener("input", recalculate);

  if (venueTypeSelect) {
    venueTypeSelect.addEventListener("change", recalculate);
  }

  cateringPills.forEach(pill => {
    pill.addEventListener("click", () => {
      cateringPills.forEach(p => p.classList.remove("selected"));
      pill.classList.add("selected");
      cateringPerPlate = parseInt(pill.getAttribute("data-rate"), 10) || 1450;
      recalculate();
    });
  });

  avPills.forEach(pill => {
    pill.addEventListener("click", () => {
      avPills.forEach(p => p.classList.remove("selected"));
      pill.classList.add("selected");
      avDailyCost = parseInt(pill.getAttribute("data-rate"), 10) || 95000;
      recalculate();
    });
  });

  if (bookEstimateBtn) {
    bookEstimateBtn.addEventListener("click", () => {
      const selectedVenueName = venueTypeSelect ? venueTypeSelect.options[venueTypeSelect.selectedIndex].text : "Custom Venue Package";
      const totalAmount = parseInt(totalDisplay.textContent.replace(/[^\d]/g, ""), 10);

      addToCart({
        id: "est-" + Date.now(),
        title: `${selectedVenueName} (${guests} Guests)`,
        type: "Custom Package Estimation",
        city: "Bengaluru",
        price: totalAmount,
        quantity: 1,
        image: "assets/images/venue-indiranagar.webp"
      });
    });
  }

  // Initial calculation
  recalculate();
}

// ==========================================================================
// 2. Venues Live Filters & Search
// ==========================================================================

function initVenueFilters() {
  const searchInput = document.querySelector("#venue-search-input");
  const cityFilterPills = document.querySelectorAll(".city-filter-pill");
  const typeFilter = document.querySelector("#venue-type-filter");
  const capacitySlider = document.querySelector("#venue-capacity-slider");
  const capacityVal = document.querySelector("#venue-capacity-val");
  const venuesContainer = document.querySelector("#venues-grid-container");
  const resultsCount = document.querySelector("#venues-count-display");

  if (!venuesContainer) return;

  const allVenues = StacklyStore.getVenues();
  let selectedCity = "all";
  let maxCapacity = 1500;
  let searchTerm = "";
  let selectedType = "all";

  function renderFilteredVenues() {
    const filtered = allVenues.filter(venue => {
      const matchCity = selectedCity === "all" || venue.city.toLowerCase() === selectedCity.toLowerCase();
      const matchType = selectedType === "all" || venue.type.toLowerCase() === selectedType.toLowerCase();
      const matchCapacity = venue.capacity <= maxCapacity;
      const matchSearch = venue.name.toLowerCase().includes(searchTerm) || 
                          venue.city.toLowerCase().includes(searchTerm) || 
                          venue.area.toLowerCase().includes(searchTerm) ||
                          venue.tag.toLowerCase().includes(searchTerm);
      return matchCity && matchType && matchCapacity && matchSearch;
    });

    if (resultsCount) {
      resultsCount.textContent = `Showing ${filtered.length} of ${allVenues.length} Verified Spaces`;
    }

    if (filtered.length === 0) {
      venuesContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: rgba(255,255,255,0.03); border-radius: 24px; border: 1px dashed rgba(255,255,255,0.15);">
          <p style="font-size: 1.3rem; font-weight: 700; color: #fff; margin-bottom: 8px;">No matching venues found</p>
          <p style="color: var(--body-color-dark); margin-bottom: 20px;">Try adjusting your filters or search keywords.</p>
          <button class="btn-secondary" onclick="resetVenueFilters()">Reset Filters</button>
        </div>
      `;
      return;
    }

    venuesContainer.innerHTML = "";
    filtered.forEach(venue => {
      const card = document.createElement("div");
      card.className = "venue-card";
      card.innerHTML = `
        <div class="venue-card-media">
          <img src="${venue.image || 'assets/images/venue-indiranagar.webp'}" alt="${venue.name}" loading="lazy" onerror="this.onerror=null;this.src='assets/images/venue-indiranagar.webp';">
          <div class="venue-city-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            ${venue.city}
          </div>
          <button class="venue-wishlist-btn" data-id="${venue.id}" title="Save to Shortlist">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>
        <div class="venue-card-body">
          <h3 class="venue-card-title">${venue.name}</h3>
          <div class="venue-card-address"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="svg-icon"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> ${venue.area}, ${venue.city} · ${venue.tag}</div>
          <div class="venue-specs-row">
            <div class="spec-item">
              <svg viewBox="0 0 24 24" fill="none" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <span>Up to ${venue.capacity} Guests</span>
            </div>
            <div class="spec-item">
              <span style="color: var(--accent); font-weight: 700;"><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" class="svg-icon star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg> ${venue.rating}</span>
              <span>(${venue.reviewsCount})</span>
            </div>
          </div>
          <div class="venue-card-footer">
            <div class="venue-price-wrap">
              <span class="venue-price-label">Daily Rental</span>
              <div class="venue-price-val">${formatINR(venue.pricePerDay)} <span>/day</span></div>
            </div>
            <div style="display: flex; gap: 8px;">
              <button class="btn-primary venue-book-btn" data-id="${venue.id}">
                <span>Book</span>
                <div class="arrow-circle">
                  <svg viewBox="0 0 24 24" fill="none" stroke-width="2.5">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      `;
      venuesContainer.appendChild(card);
    });

    // Attach Wishlist buttons
    venuesContainer.querySelectorAll(".venue-wishlist-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        btn.classList.toggle("active");
        const venueId = btn.getAttribute("data-id");
        const venue = allVenues.find(v => v.id === venueId);
        showToast(btn.classList.contains("active") ? `Saved ${venue?.name} to wishlist!` : `Removed from wishlist`);
      });
    });

    // Attach Book Buttons
    venuesContainer.querySelectorAll(".venue-book-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const venueId = btn.getAttribute("data-id");
        const venue = allVenues.find(v => v.id === venueId);
        if (venue) {
          addToCart({
            id: venue.id,
            title: `${venue.name} (${venue.city})`,
            type: "Venue Space Reservation",
            city: venue.city,
            price: venue.pricePerDay,
            quantity: 1,
            image: venue.image
          });
        }
      });
    });
  }

  // Event Listeners for Filters
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchTerm = e.target.value.toLowerCase().trim();
      renderFilteredVenues();
    });
  }

  cityFilterPills.forEach(pill => {
    pill.addEventListener("click", () => {
      cityFilterPills.forEach(p => p.classList.remove("selected"));
      pill.classList.add("selected");
      selectedCity = pill.getAttribute("data-city") || "all";
      renderFilteredVenues();
    });
  });

  if (typeFilter) {
    typeFilter.addEventListener("change", (e) => {
      selectedType = e.target.value;
      renderFilteredVenues();
    });
  }

  if (capacitySlider) {
    capacitySlider.addEventListener("input", (e) => {
      maxCapacity = parseInt(e.target.value, 10);
      if (capacityVal) capacityVal.textContent = `${maxCapacity} Guests`;
      renderFilteredVenues();
    });
  }

  window.resetVenueFilters = function() {
    selectedCity = "all";
    selectedType = "all";
    maxCapacity = 1500;
    searchTerm = "";
    if (searchInput) searchInput.value = "";
    if (capacitySlider) capacitySlider.value = 1500;
    if (capacityVal) capacityVal.textContent = "1,500 Guests";
    if (typeFilter) typeFilter.value = "all";
    cityFilterPills.forEach(p => p.classList.remove("selected"));
    const allPill = document.querySelector('.city-filter-pill[data-city="all"]');
    if (allPill) allPill.classList.add("selected");
    renderFilteredVenues();
  };

  // Initial render
  renderFilteredVenues();
}

// ==========================================================================
// 3. Custom Service Bundle Builder (services.html)
// ==========================================================================

function initServiceBundleBuilder() {
  const checkboxes = document.querySelectorAll(".bundle-service-checkbox");
  const totalElem = document.querySelector("#bundle-total-inr");
  const addBundleBtn = document.querySelector("#btn-add-bundle");

  if (!checkboxes.length || !totalElem) return;

  function calculateBundle() {
    let total = 0;
    checkboxes.forEach(cb => {
      if (cb.checked) {
        total += parseInt(cb.getAttribute("data-cost"), 10) || 0;
      }
    });
    totalElem.textContent = formatINR(total);
  }

  checkboxes.forEach(cb => {
    cb.addEventListener("change", calculateBundle);
  });

  if (addBundleBtn) {
    addBundleBtn.addEventListener("click", () => {
      const selectedTitles = [];
      let totalCost = 0;
      checkboxes.forEach(cb => {
        if (cb.checked) {
          selectedTitles.push(cb.getAttribute("data-title"));
          totalCost += parseInt(cb.getAttribute("data-cost"), 10) || 0;
        }
      });

      if (selectedTitles.length === 0) {
        showToast("Please select at least one vendor service.", "error");
        return;
      }

      addToCart({
        id: "bundle-" + Date.now(),
        title: `Curated Production Bundle (${selectedTitles.length} Services)`,
        type: "Vendor Ecosystem Bundle",
        city: "Pan-India",
        price: totalCost,
        quantity: 1,
        image: "assets/images/service-av.webp"
      });
    });
  }

  calculateBundle();
}

// ==========================================================================
// 4. Enterprise Offsite ROI Calculator (enterprise.html)
// ==========================================================================

function initEnterpriseCalculator() {
  const teamSlider = document.querySelector("#ent-team-size");
  const teamVal = document.querySelector("#ent-team-val");
  const daysSelect = document.querySelector("#ent-days-select");
  const estBudget = document.querySelector("#ent-budget-est");
  const estSavings = document.querySelector("#ent-savings-est");

  if (!teamSlider || !estBudget) return;

  function recalculateEnterprise() {
    const size = parseInt(teamSlider.value, 10);
    const days = parseInt(daysSelect ? daysSelect.value : 3, 10);
    if (teamVal) teamVal.textContent = `${size} Attendees`;

    // Indian luxury corporate offsite average: ₹14,000 / person / day (all inclusive)
    const costPerPersonDay = 14000;
    const baseTotal = size * days * costPerPersonDay;
    // Stackly negotiated vendor savings approx 22%
    const savings = Math.round(baseTotal * 0.22);

    estBudget.textContent = formatINR(baseTotal);
    if (estSavings) estSavings.textContent = formatINR(savings);
  }

  teamSlider.addEventListener("input", recalculateEnterprise);
  if (daysSelect) daysSelect.addEventListener("change", recalculateEnterprise);

  recalculateEnterprise();
}
