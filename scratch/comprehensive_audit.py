import glob, re

print("=== AUDIT 1: CHECK FOR 'INDIA' IN ANY LOGO TAG ===")
found_india = False
for f in sorted(glob.glob("*.html")):
    c = open(f, "r", encoding="utf-8").read()
    logos = re.findall(r'<a[^>]*class="[^"]*brand-logo[^"]*"[^>]*>.*?</a>', c, re.DOTALL)
    logos += re.findall(r'<div[^>]*class="[^"]*brand-logo[^"]*"[^>]*>.*?</div>', c, re.DOTALL)
    for logo in logos:
        if "INDIA" in logo:
            print(f"FAILED: {f} still has INDIA in logo: {logo}")
            found_india = True
if not found_india:
    print("PASSED: 0 occurrences of 'INDIA' in any logo across all HTML files.")

print("\n=== AUDIT 2: CHECK FOR UNROUTED LINKS (# or empty href) ===")
unrouted_found = False
for f in sorted(glob.glob("*.html")):
    c = open(f, "r", encoding="utf-8").read()
    # Find href="#" or href="" that are not in scripts
    bad_hrefs = re.findall(r'<a[^>]*href=["\'](?:#)?["\'][^>]*>', c)
    if bad_hrefs:
        # Check if they are just hash anchors like #catering or genuine #
        pure_hash = [h for h in bad_hrefs if 'href="#"' in h or "href='#'" in h or 'href=""' in h or "href=''" in h]
        if pure_hash:
            print(f"WARNING: {f} has pure hash/empty links: {pure_hash}")
            unrouted_found = True
if not unrouted_found:
    print("PASSED: 0 empty or bare '#' links in any HTML file.")

print("\n=== AUDIT 3: CHECK SOCIAL MEDIA LINKS IN FOOTER ===")
for f in ['index.html', 'venues.html', 'services.html', 'enterprise.html', 'pricing.html', '404.html']:
    c = open(f, "r", encoding="utf-8").read()
    ftr = re.search(r'<footer class="site-footer".*?</footer>', c, re.DOTALL)
    if ftr:
        social_links = re.findall(r'<a[^>]*class="social-circle-link"[^>]*href=["\']([^"\']+)["\']', ftr.group(0))
        non_404 = [h for h in social_links if h != "404.html"]
        if non_404:
            print(f"FAILED: {f} has social links not pointing to 404.html: {non_404}")
        else:
            print(f"PASSED: {f} has all {len(social_links)} social links pointing to 404.html")
    else:
        print(f"FAILED: {f} footer not found")

print("\n=== AUDIT 4: SCRIPT TAGS AT END OF PAGES ===")
for f in sorted(glob.glob("*.html")):
    c = open(f, "r", encoding="utf-8").read()
    scripts = re.findall(r'<script[^>]*src=["\']([^"\']+)["\']', c)
    print(f"{f}: scripts = {scripts}")
