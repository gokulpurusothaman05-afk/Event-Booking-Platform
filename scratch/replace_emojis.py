import re

svg_pin = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="svg-icon"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>'
svg_star = '<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" class="svg-icon star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>'
svg_check = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="svg-icon check"><polyline points="20 6 9 17 4 12"></polyline></svg>'
svg_cross = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="svg-icon cross"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
svg_bolt = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="svg-icon"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>'
svg_shield = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="svg-icon"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>'
svg_clipboard = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="svg-icon"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>'
svg_headphone = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="svg-icon"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>'
svg_user = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="svg-icon"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>'
svg_doc = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="svg-icon"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>'
svg_lock = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="svg-icon"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>'
svg_briefcase = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="svg-icon"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>'
svg_beach = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="svg-icon"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path></svg>'
svg_castle = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="svg-icon"><path d="M3 21h18M5 21V7l3-3 3 3v14M19 21V7l-3-3-3 3v14"></path></svg>'
svg_coffee = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="svg-icon"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>'
svg_stopwatch = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="svg-icon"><circle cx="12" cy="13" r="8"></circle><path d="M12 9v4l2 2"></path><path d="M10 2h4"></path></svg>'
svg_refresh = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="svg-icon"><polyline points="1 4 1 10 7 10"></polyline><polyline points="23 20 23 14 17 14"></polyline><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path></svg>'
svg_receipt = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="svg-icon"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1z"></path><line x1="8" y1="7" x2="16" y2="7"></line><line x1="8" y1="11" x2="16" y2="11"></line></svg>'
svg_chef = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="svg-icon"><path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6z"></path><line x1="6" y1="17" x2="18" y2="17"></line></svg>'
svg_food_bowl = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="svg-icon"><circle cx="12" cy="12" r="10"></circle><path d="M8 12h8"></path></svg>'
svg_wave = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="svg-icon"><path d="M2 12c4-4 8 4 12 0s8 4 8 4"></path></svg>'
svg_cocktail = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="svg-icon"><polygon points="5 3 19 3 12 13 12 21 8 21 16 21"></polygon></svg>'

# Category card larger SVGs (for services.html and venues.html)
svg_cat_culinary = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-light)" stroke-width="2" class="svg-icon" style="margin-bottom: 8px;"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>'
svg_cat_floral = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--pink-color)" stroke-width="2" class="svg-icon" style="margin-bottom: 8px;"><circle cx="12" cy="12" r="3"></circle><path d="M12 2a4 4 0 0 0-4 4v1a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4zM2 12a4 4 0 0 0 4 4h1a4 4 0 0 0 0-8H6a4 4 0 0 0-4 4zm16 0a4 4 0 0 0 0 8h1a4 4 0 0 0 4-4 4 4 0 0 0-4-4h-1zM12 18a4 4 0 0 0-4 4v-1a4 4 0 0 0 8 0v1a4 4 0 0 0-4-4z"></path></svg>'
svg_cat_power = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" class="svg-icon" style="margin-bottom: 8px;"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>'
svg_cat_camera = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-light)" stroke-width="2" class="svg-icon" style="margin-bottom: 8px;"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>'
svg_cat_guitar = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--pink-color)" stroke-width="2" class="svg-icon" style="margin-bottom: 8px;"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>'
svg_cat_car = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" class="svg-icon" style="margin-bottom: 8px;"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>'
svg_cat_building = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-light)" stroke-width="2" class="svg-icon" style="margin-bottom: 8px;"><path d="M4 22h16M2 7l10-4 10 4M6 7v11M10 7v11M14 7v11M18 7v11"></path></svg>'
svg_cat_lawn = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" class="svg-icon" style="margin-bottom: 8px;"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>'
svg_cat_mic = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--pink-color)" stroke-width="2" class="svg-icon" style="margin-bottom: 8px;"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>'
svg_cat_water = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-light)" stroke-width="2" class="svg-icon" style="margin-bottom: 8px;"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path></svg>'

# 1. Update enterprise.html
with open('enterprise.html', 'r', encoding='utf-8') as f:
    c = f.read()
c = c.replace('<h4>👔 Dedicated On-Ground Event Director</h4>', f'<h4>{svg_user} Dedicated On-Ground Event Director</h4>')
c = c.replace('<h4>📑 Master Vendor MSA & Unified GST</h4>', f'<h4>{svg_doc} Master Vendor MSA & Unified GST</h4>')
c = c.replace('<h4>🔒 Enterprise NDAs & Private Networks</h4>', f'<h4>{svg_lock} Enterprise NDAs & Private Networks</h4>')
c = c.replace('<h4>💰 Escrow Backed Delivery</h4>', f'<h4>{svg_shield} Escrow Backed Delivery</h4>')
c = c.replace('<div class="venue-city-badge">🏖️ Beachside Founder Retreat</div>', f'<div class="venue-city-badge">{svg_beach} Beachside Founder Retreat</div>')
c = c.replace('<div class="venue-city-badge">🏰 Royal Rajasthan Offsite</div>', f'<div class="venue-city-badge">{svg_castle} Royal Rajasthan Offsite</div>')
c = c.replace('<div class="venue-city-badge">☕ Coorg Plantation Wellness</div>', f'<div class="venue-city-badge">{svg_coffee} Coorg Plantation Wellness</div>')
c = c.replace('<span>✓ 100% On-Time Cueing</span>', f'<span>{svg_check} 100% On-Time Cueing</span>')
c = c.replace('<span>✓ 4.98/5 Attendee CSAT</span>', f'<span>{svg_check} 4.98/5 Attendee CSAT</span>')
c = c.replace('<span>✓ 220 Resort Keys Managed</span>', f'<span>{svg_check} 220 Resort Keys Managed</span>')
c = c.replace('<span>✓ Zero IT Glitches</span>', f'<span>{svg_check} Zero IT Glitches</span>')
with open('enterprise.html', 'w', encoding='utf-8') as f:
    f.write(c)
print('enterprise.html updated')

# 2. Update index.html
with open('index.html', 'r', encoding='utf-8') as f:
    c = f.read()
c = c.replace('<div class="location-pill">📍 Bengaluru</div>', f'<div class="location-pill">{svg_pin} Bengaluru</div>')
c = c.replace('<div class="location-pill">📍 Mumbai</div>', f'<div class="location-pill">{svg_pin} Mumbai</div>')
c = c.replace('<div class="location-pill">📍 Delhi-NCR</div>', f'<div class="location-pill">{svg_pin} Delhi-NCR</div>')
c = c.replace('<div class="location-pill">📍 Goa</div>', f'<div class="location-pill">{svg_pin} Goa</div>')
c = c.replace('<div class="location-pill">📍 Udaipur</div>', f'<div class="location-pill">{svg_pin} Udaipur</div>')
c = c.replace('<h4>🛡️ Escrow Protection</h4>', f'<h4>{svg_shield} Escrow Protection</h4>')
c = c.replace('<h4>📋 Unified GST Billing</h4>', f'<h4>{svg_clipboard} Unified GST Billing</h4>')
c = c.replace('<h4>🎧 Concert AV Specs</h4>', f'<h4>{svg_headphone} Concert AV Specs</h4>')
c = c.replace('<h4>👨‍💼 Dedicated Ops Lead</h4>', f'<h4>{svg_user} Dedicated Ops Lead</h4>')
c = c.replace('<div class="venue-city-badge">📍 Bengaluru</div>', f'<div class="venue-city-badge">{svg_pin} Bengaluru</div>')
c = c.replace('<div class="venue-card-address">📍 Indiranagar · Tech Luxe Glass Atrium</div>', f'<div class="venue-card-address">{svg_pin} Indiranagar · Tech Luxe Glass Atrium</div>')
c = c.replace('<span style="color: var(--accent); font-weight: 700;">★ 4.9</span>', f'<span style="color: var(--accent); font-weight: 700;">{svg_star} 4.9</span>')
c = c.replace('<div class="venue-city-badge">📍 Udaipur</div>', f'<div class="venue-city-badge">{svg_pin} Udaipur</div>')
c = c.replace('<div class="venue-card-address">📍 Lake Pichola · Royal Destination Palace</div>', f'<div class="venue-card-address">{svg_pin} Lake Pichola · Royal Destination Palace</div>')
c = c.replace('<span style="color: var(--accent); font-weight: 700;">★ 5.0</span>', f'<span style="color: var(--accent); font-weight: 700;">{svg_star} 5.0</span>')
c = c.replace('<div class="venue-city-badge">📍 Goa</div>', f'<div class="venue-city-badge">{svg_pin} Goa</div>')
c = c.replace('<div class="venue-card-address">📍 Vagator Beachfront · Sunset Lawns</div>', f'<div class="venue-card-address">{svg_pin} Vagator Beachfront · Sunset Lawns</div>')
c = c.replace('<div class="venue-city-badge">📍 Mumbai</div>', f'<div class="venue-city-badge">{svg_pin} Mumbai</div>')
c = c.replace('<div class="venue-card-address">📍 BKC Complex · Corporate Gala & Awards</div>', f'<div class="venue-card-address">{svg_pin} BKC Complex · Corporate Gala & Awards</div>')
c = c.replace('<span style="color: var(--accent); font-weight: 700;">★ 4.8</span>', f'<span style="color: var(--accent); font-weight: 700;">{svg_star} 4.8</span>')
c = c.replace('<div class="venue-city-badge">📍 Jaipur</div>', f'<div class="venue-city-badge">{svg_pin} Jaipur</div>')
c = c.replace('<div class="venue-card-address">📍 Kukas Heritage Belt · Royal Sangeet</div>', f'<div class="venue-card-address">{svg_pin} Kukas Heritage Belt · Royal Sangeet</div>')
c = c.replace('<div class="venue-city-badge">📍 Hyderabad</div>', f'<div class="venue-city-badge">{svg_pin} Hyderabad</div>')
c = c.replace('<div class="venue-card-address">📍 Hitec City · Hackathon Lab & Keynote Hall</div>', f'<div class="venue-card-address">{svg_pin} Hitec City · Hackathon Lab & Keynote Hall</div>')
c = c.replace('<span style="color: var(--accent); font-weight: 700;">★ 4.7</span>', f'<span style="color: var(--accent); font-weight: 700;">{svg_star} 4.7</span>')
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(c)
print('index.html updated')

# 3. Update pricing.html
with open('pricing.html', 'r', encoding='utf-8') as f:
    c = f.read()
c = c.replace('<span class="table-check">✓ Stationed On-Site</span>', f'<span class="table-check">{svg_check} Stationed On-Site</span>')
c = c.replace('<span class="table-check">✓ Full 72-Hr Team</span>', f'<span class="table-check">{svg_check} Full 72-Hr Team</span>')
c = c.replace('<span class="table-check">✓ Included (4 Pax)</span>', f'<span class="table-check">{svg_check} Included (4 Pax)</span>')
c = c.replace('<span class="table-check">✓ Included (8 Pax)</span>', f'<span class="table-check">{svg_check} Included (8 Pax)</span>')
c = c.replace('<span class="table-check">✓ Included</span>', f'<span class="table-check">{svg_check} Included</span>')
c = c.replace('<span class="table-check">✓ Stackly Managed</span>', f'<span class="table-check">{svg_check} Stackly Managed</span>')
with open('pricing.html', 'w', encoding='utf-8') as f:
    f.write(c)
print('pricing.html updated')

# 4. Update services.html
with open('services.html', 'r', encoding='utf-8') as f:
    c = f.read()
c = c.replace('<div style="font-size: 1.5rem; margin-bottom: 8px;">🍛</div>', f'<div>{svg_cat_culinary}</div>')
c = c.replace('<div style="font-size: 1.5rem; margin-bottom: 8px;">🌺</div>', f'<div>{svg_cat_floral}</div>')
c = c.replace('<div style="font-size: 1.5rem; margin-bottom: 8px;">⚡</div>', f'<div>{svg_cat_power}</div>')
c = c.replace('<div style="font-size: 1.5rem; margin-bottom: 8px;">🎥</div>', f'<div>{svg_cat_camera}</div>')
c = c.replace('<div style="font-size: 1.5rem; margin-bottom: 8px;">🎸</div>', f'<div>{svg_cat_guitar}</div>')
c = c.replace('<div style="font-size: 1.5rem; margin-bottom: 8px;">🚘</div>', f'<div>{svg_cat_car}</div>')
c = c.replace('<div class="venue-city-badge">🍲 Royal Awadhi Feast</div>', f'<div class="venue-city-badge">{svg_food_bowl} Royal Awadhi Feast</div>')
c = c.replace('<div class="venue-city-badge">🥥 Coastal & Southern Soul</div>', f'<div class="venue-city-badge">{svg_wave} Coastal & Southern Soul</div>')
c = c.replace('<div class="venue-city-badge">🍸 Pan-Asian & Global Bar</div>', f'<div class="venue-city-badge">{svg_cocktail} Pan-Asian & Global Bar</div>')
c = c.replace('<h4>⏱️ T-minus 3 Hour Rigging Rule</h4>', f'<h4>{svg_stopwatch} T-minus 3 Hour Rigging Rule</h4>')
c = c.replace('<h4>🔄 Automatic Standby Vendor</h4>', f'<h4>{svg_refresh} Automatic Standby Vendor</h4>')
c = c.replace('<h4>🧾 100% Verified GST Invoicing</h4>', f'<h4>{svg_receipt} 100% Verified GST Invoicing</h4>')
c = c.replace('<h4>🧑‍🍳 Food Hygiene & Temperature Logs</h4>', f'<h4>{svg_chef} Food Hygiene & Temperature Logs</h4>')
with open('services.html', 'w', encoding='utf-8') as f:
    f.write(c)
print('services.html updated')

# 5. Update venues.html
with open('venues.html', 'r', encoding='utf-8') as f:
    c = f.read()
c = c.replace('<div style="font-size: 1.5rem; margin-bottom: 8px;">🏛️</div>', f'<div>{svg_cat_building}</div>')
c = c.replace('<div style="font-size: 1.5rem; margin-bottom: 8px;">🌿</div>', f'<div>{svg_cat_lawn}</div>')
c = c.replace('<div style="font-size: 1.5rem; margin-bottom: 8px;">🎙️</div>', f'<div>{svg_cat_mic}</div>')
c = c.replace('<div style="font-size: 1.5rem; margin-bottom: 8px;">🌊</div>', f'<div>{svg_cat_water}</div>')
c = c.replace('<span class="matrix-location">📍 Bengaluru (Indiranagar)</span>', f'<span class="matrix-location">{svg_pin} Bengaluru (Indiranagar)</span>')
c = c.replace('<span class="matrix-power">⚡ 125 kVA Silent DG</span>', f'<span class="matrix-power">{svg_bolt} 125 kVA Silent DG</span>')
c = c.replace('<span class="matrix-location">📍 Udaipur (Lake Pichola)</span>', f'<span class="matrix-location">{svg_pin} Udaipur (Lake Pichola)</span>')
c = c.replace('<span class="matrix-power">⚡ 250 kVA Dual DG</span>', f'<span class="matrix-power">{svg_bolt} 250 kVA Dual DG</span>')
c = c.replace('<span class="matrix-location">📍 Goa (Vagator Beach)</span>', f'<span class="matrix-location">{svg_pin} Goa (Vagator Beach)</span>')
c = c.replace('<span class="matrix-power">⚡ 82 kVA Dedicated</span>', f'<span class="matrix-power">{svg_bolt} 82 kVA Dedicated</span>')
c = c.replace('<span class="matrix-location">📍 Mumbai (BKC Complex)</span>', f'<span class="matrix-location">{svg_pin} Mumbai (BKC Complex)</span>')
c = c.replace('<span class="matrix-power">⚡ 500 kVA Grid Synced</span>', f'<span class="matrix-power">{svg_bolt} 500 kVA Grid Synced</span>')
with open('venues.html', 'w', encoding='utf-8') as f:
    f.write(c)
print('venues.html updated')

# 6. Update assets/js/admin-dash.js
with open('assets/js/admin-dash.js', 'r', encoding='utf-8') as f:
    c = f.read()
c = c.replace('📍 ${b.venueName}', f'{svg_pin} ${{b.venueName}}')
c = c.replace('✓ Approve', f'{svg_check} Approve')
c = c.replace('✕ Reject', f'{svg_cross} Reject')
c = c.replace('★ ${v.rating}', f'{svg_star} ${{v.rating}}')
with open('assets/js/admin-dash.js', 'w', encoding='utf-8') as f:
    f.write(c)
print('admin-dash.js updated')

# 7. Update assets/js/booking.js
with open('assets/js/booking.js', 'r', encoding='utf-8') as f:
    c = f.read()
c = c.replace('📍 ${venue.area}, ${venue.city} · ${venue.tag}', f'{svg_pin} ${{venue.area}}, ${{venue.city}} · ${{venue.tag}}')
c = c.replace('★ ${venue.rating}', f'{svg_star} ${{venue.rating}}')
with open('assets/js/booking.js', 'w', encoding='utf-8') as f:
    f.write(c)
print('booking.js updated')

# 8. Update assets/js/client-dash.js
with open('assets/js/client-dash.js', 'r', encoding='utf-8') as f:
    c = f.read()
c = c.replace('📍 ${booking.venueName}', f'{svg_pin} ${{booking.venueName}}')
c = c.replace('📄 Invoice & Pass', f'{svg_doc} Invoice & Pass')
c = c.replace('📍 ${v.city}', f'{svg_pin} ${{v.city}}')
with open('assets/js/client-dash.js', 'w', encoding='utf-8') as f:
    f.write(c)
print('client-dash.js updated')
