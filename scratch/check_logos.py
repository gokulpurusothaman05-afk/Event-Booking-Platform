import glob, re

for f in sorted(glob.glob('*.html')):
    content = open(f, 'r', encoding='utf-8').read()
    logos = re.findall(r'<a[^>]*class="[^"]*brand-logo[^"]*"[^>]*>.*?</a>', content, re.DOTALL)
    logos += re.findall(r'<div[^>]*class="[^"]*brand-logo[^"]*"[^>]*>.*?</div>', content, re.DOTALL)
    print(f'=== {f} ({len(logos)} logos) ===')
    for l in logos:
        print('  ', ' '.join(l.split()))
