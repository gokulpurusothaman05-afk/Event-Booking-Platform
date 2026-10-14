import glob, re

for f in sorted(glob.glob('*.html')):
    c = open(f, 'r', encoding='utf-8').read()
    hdr = re.search(r'<header class="site-header".*?</header>', c, re.DOTALL)
    drw = re.search(r'<div class="mobile-nav-drawer".*?</div>\s*</div>', c, re.DOTALL)
    ftr = re.search(r'<footer class="site-footer".*?</footer>', c, re.DOTALL)
    
    print(f'=== {f} ===')
    if hdr:
        has_portals_nav = 'Portals' in hdr.group(0) or 'portals' in hdr.group(0)
        nav_links = re.findall(r'<a[^>]*class="[^"]*nav-link[^"]*"[^>]*>.*?</a>', hdr.group(0))
        print(f'  Navbar has Portals: {has_portals_nav}')
        print(f'  Nav links: {[l.strip() for l in nav_links]}')
    if drw:
        has_portals_drw = 'Dashboard' in drw.group(0) or 'Portal' in drw.group(0)
        print(f'  Drawer has Portals: {has_portals_drw}')
    if ftr:
        client_link = re.findall(r'<a[^>]*href="([^"]*)"[^>]*>Client Portal</a>', ftr.group(0))
        admin_link = re.findall(r'<a[^>]*href="([^"]*)"[^>]*>Admin Portal</a>', ftr.group(0))
        print(f'  Footer Client Portal -> {client_link}')
        print(f'  Footer Admin Portal -> {admin_link}')
