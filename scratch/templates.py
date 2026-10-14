# Template components updated to:
# 1. Remove portals in nav in all pages (both desktop nav-menu and mobile-nav-drawer)
# 2. Redirect Client Portal and Admin Portal in footer to 404.html

def get_header(active_page=""):
    active = {
        "home": " active" if active_page == "home" else "",
        "venues": " active" if active_page == "venues" else "",
        "services": " active" if active_page == "services" else "",
        "enterprise": " active" if active_page == "enterprise" else "",
        "pricing": " active" if active_page == "pricing" else "",
    }
    
    return f'''  <header class="site-header">
    <div class="container">
      <div class="nav-wrapper">
        <a href="index.html" class="brand-logo">
          <img src="assets/images/logo.webp" alt="Stackly Logo" class="brand-logo-img">
          <span>STACKLY</span>
        </a>

        <nav class="nav-menu" role="navigation">
          <a href="index.html" class="nav-link{active['home']}">Home</a>
          <span class="nav-divider">/</span>
          <a href="venues.html" class="nav-link{active['venues']}">Venues</a>
          <span class="nav-divider">/</span>
          <a href="services.html" class="nav-link{active['services']}">Services</a>
          <span class="nav-divider">/</span>
          <a href="enterprise.html" class="nav-link{active['enterprise']}">Enterprise</a>
          <span class="nav-divider">/</span>
          <a href="pricing.html" class="nav-link{active['pricing']}">Pricing</a>
        </nav>

        <div class="nav-actions">
          <button class="cart-trigger" aria-label="Open Cart">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="2">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <div class="cart-badge">0</div>
          </button>

          <button class="nav-auth-btn auth-trigger">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span>Sign In</span>
          </button>

          <button class="mobile-toggle" aria-label="Toggle Menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </div>
  </header>'''

def get_mobile_drawer():
    return '''  <!-- Mobile Drawer Navigation -->
  <div class="mobile-nav-drawer">
    <a href="index.html" class="mobile-nav-link"><span>Home</span> <span>→</span></a>
    <a href="venues.html" class="mobile-nav-link"><span>Venues & Spaces</span> <span>→</span></a>
    <a href="services.html" class="mobile-nav-link"><span>Services & Marketplace</span> <span>→</span></a>
    <a href="enterprise.html" class="mobile-nav-link"><span>Enterprise Offsites</span> <span>→</span></a>
    <a href="pricing.html" class="mobile-nav-link"><span>Pricing & Tickets</span> <span>→</span></a>
    <div style="margin-top: 20px;">
      <button class="btn-primary auth-trigger" style="width: 100%; justify-content: center;">
        <span>Sign In to Stackly</span>
      </button>
    </div>
  </div>'''

def get_footer():
    return '''  <!-- ========================================================================
       Shared Footer (Evendo Design System with Indian HQ Addresses)
       ======================================================================== -->
  <footer class="site-footer">
    <div class="container">
      <div class="footer-widgets">
        <div class="footer-widget">
          <div class="brand-logo" style="margin-bottom: 16px;">
            <img src="assets/images/logo.webp" alt="Stackly Logo" class="brand-logo-img">
            <span>STACKLY</span>
          </div>
          <p class="footer-text">
            Stackly is India's leading event booking and turnkey production platform, connecting premier enterprises and families with curated venues, gourmet catering, and concert production.
          </p>
          <div class="sub-title-pill mint" style="margin-bottom: 0;">FSSAI & GST Compliant</div>
        </div>

        <div class="footer-widget">
          <h3 class="footer-widget-title">Headquarters</h3>
          <div class="footer-contact-item">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <span><strong>Bengaluru:</strong> 100 Feet Rd, Indiranagar, Bengaluru 560038</span>
          </div>
          <div class="footer-contact-item">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <span><strong>Mumbai:</strong> One BKC, Bandra Kurla Complex, Mumbai 400051</span>
          </div>
        </div>

        <div class="footer-widget">
          <h3 class="footer-widget-title">Direct Contact</h3>
          <div class="footer-contact-item">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            <a href="mailto:events@stackly.in" style="color: var(--color-light);">events@stackly.in</a>
          </div>
          <div class="footer-contact-item">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            <a href="404.html">+91 (080) 4920 4000</a>
          </div>
          <div class="footer-social-links" style="margin-top: 18px;">
            <a href="404.html" class="social-circle-link" title="LinkedIn" aria-label="LinkedIn"><svg viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.46 1.46 0 1 0 0-2.92 1.46 1.46 0 0 0 0 2.92m1.39 9.74v-8.37H5.07v8.37h2.78z"></path></svg></a>
            <a href="404.html" class="social-circle-link" title="Twitter / X" aria-label="Twitter"><svg viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg></a>
            <a href="404.html" class="social-circle-link" title="Instagram" aria-label="Instagram"><svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
            <a href="404.html" class="social-circle-link" title="Facebook" aria-label="Facebook"><svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
            <a href="404.html" class="social-circle-link" title="YouTube" aria-label="YouTube"><svg viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="var(--color-dark)"></polygon></svg></a>
          </div>
        </div>

        <div class="footer-widget">
          <h3 class="footer-widget-title">Event Bulletins</h3>
          <p class="footer-text">
            Subscribe for exclusive venue drop alerts, seasonal hotel rates, and corporate retreat itineraries.
          </p>
          <form class="newsletter-box">
            <input type="email" class="newsletter-input" placeholder="Enter corporate email..." required>
            <button type="submit" class="newsletter-submit" aria-label="Subscribe">
              <svg viewBox="0 0 24 24" fill="none" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </form>
        </div>
      </div>

      <div class="footer-bottom-bar">
        <div>© 2026 Stackly Platform Technologies Pvt. Ltd. All rights reserved.</div>
        <div class="footer-legal-links">
          <a href="pricing.html">Terms & Escrow</a>
          <a href="pricing.html">GST Billing Policy</a>
          <a href="404.html">Client Portal</a>
          <a href="404.html">Admin Portal</a>
        </div>
      </div>
    </div>
  </footer>

  <!-- Slide-in Cart Drawer (Evendo Behavior) -->
  <div class="cart-overlay"></div>
  <div class="cart-drawer">
    <div class="cart-drawer-header">
      <div class="cart-drawer-title">YOUR CART</div>
      <button class="cart-close-btn" aria-label="Close Cart">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
    <div class="cart-drawer-body">
      <!-- Injected by main.js -->
    </div>
    <div class="cart-drawer-footer">
      <div class="cart-summary-line">
        <span>Subtotal</span>
        <span class="cart-subtotal-val">₹0</span>
      </div>
      <div class="cart-summary-line">
        <span>GST (18% Input Credit)</span>
        <span class="cart-gst-val">₹0</span>
      </div>
      <div class="cart-total-line">
        <span>Total Payable</span>
        <span class="total-val">₹0</span>
      </div>
      <button class="btn-primary cart-checkout-btn" style="width: 100%; justify-content: center; margin-top: 18px;">
        <span>Proceed to Escrow Checkout</span>
      </button>
    </div>
  </div>

  <!-- Shared Auth Modal (Client & Admin Login) -->
  <div class="auth-modal-overlay">
    <div class="auth-modal">
      <button class="auth-close-btn" aria-label="Close Modal">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <div style="text-align: center; margin-bottom: 24px;">
        <img src="assets/images/logo.webp" alt="Stackly Logo" class="brand-logo-img" style="width: 44px; height: 48px; margin: 0 auto 12px; display: block;">
        <h3 style="font-family: var(--heading-font); font-size: 2rem; color: #fff;">STACKLY ACCESS</h3>
        <p style="font-size: 0.85rem; color: var(--body-color-dark);">Sign in to your client bookings or admin management console.</p>
      </div>

      <div class="auth-tabs">
        <div class="auth-tab-btn active" data-role="client">Client Login</div>
        <div class="auth-tab-btn" data-role="admin">Admin Console</div>
      </div>

      <form class="auth-login-form">
        <input type="hidden" id="auth-role" value="client">
        <div class="auth-form-group">
          <label class="auth-label" for="auth-email">Corporate Email</label>
          <input type="email" id="auth-email" class="auth-input" placeholder="Enter your email address (e.g. rohit.sharma@gmail.com)" required autocomplete="email">
        </div>
        <div class="auth-form-group">
          <label class="auth-label" for="auth-pass">Password</label>
          <input type="password" id="auth-pass" class="auth-input" placeholder="Enter your password" required autocomplete="current-password">
        </div>
        <button type="submit" class="btn-primary" style="width: 100%; justify-content: center; margin-top: 10px;">
          <span>Enter Dashboard</span>
          <div class="arrow-circle">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </div>
        </button>
      </form>
    </div>
  </div>

  <!-- Back to Top Button -->
  <button class="back-to-top-btn" aria-label="Back to Top">
    <svg viewBox="0 0 24 24" fill="none" stroke-width="2.5">
      <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
  </button>'''
