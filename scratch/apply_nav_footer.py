import re
import sys
from templates import get_header, get_mobile_drawer, get_footer

pages_config = {
    "index.html": "home",
    "venues.html": "venues",
    "services.html": "services",
    "enterprise.html": "enterprise",
    "pricing.html": "pricing",
    "404.html": "",
}

for page, active in pages_config.items():
    with open(page, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Replace header
    hdr_pattern = r'<header class="site-header">.*?</header>'
    m_hdr = re.search(hdr_pattern, content, re.DOTALL)
    if not m_hdr:
        print(f"ERROR: header not found in {page}")
        continue
    content = content[:m_hdr.start()] + get_header(active) + content[m_hdr.end():]

    # 2. Replace mobile drawer
    m_drw = re.search(r'<div class="mobile-nav-drawer">.*?</div>\s*</div>', content, re.DOTALL)
    if m_drw:
        content = content[:m_drw.start()] + get_mobile_drawer() + content[m_drw.end():]
    else:
        # Fallback if different closing tags
        m_drw2 = re.search(r'<div class="mobile-nav-drawer">.*?(?=<main)', content, re.DOTALL)
        if m_drw2:
            content = content[:m_drw2.start()] + get_mobile_drawer() + "\n\n" + content[m_drw2.end():]

    # 3. Replace footer through back-to-top-btn
    ftr_match = re.search(r'<footer class="site-footer">.*?(?=\s*<script src="assets/js/)', content, re.DOTALL)
    if not ftr_match:
        print(f"ERROR: footer not matched in {page}")
        continue
    
    content = content[:ftr_match.start()] + get_footer() + "\n\n" + content[ftr_match.end():]

    # Special check for 404.html button to client-dashboard
    if page == "404.html":
        content = content.replace('<a href="client-dashboard.html" class="btn-secondary"><span>Client Portal</span></a>',
                                  '<a href="pricing.html" class="btn-secondary"><span>Packages & Pricing</span></a>')

    with open(page, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Successfully updated {page}")
