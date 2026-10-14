import re

for f in ['client-dashboard.html', 'admin-dashboard.html']:
    c = open(f, 'r', encoding='utf-8').read()
    links = re.findall(r'<a[^>]*href=["\']([^"\']+)["\'][^>]*aria-label=["\'](LinkedIn|Twitter|Instagram|Facebook|YouTube)[^"\']*["\']', c)
    print(f"{f}: {len(links)} social links: {links}")
