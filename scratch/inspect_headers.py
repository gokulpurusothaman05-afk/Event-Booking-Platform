import re

for p in ['index.html', 'services.html', '404.html']:
    content = open(p, 'r', encoding='utf-8').read()
    hdr = re.search(r'<header class="site-header".*?</header>', content, re.DOTALL)
    print(f'=== {p} HEADER ===')
    if hdr:
        print(hdr.group(0)[:500])
        print('...')
        print(hdr.group(0)[-300:])
