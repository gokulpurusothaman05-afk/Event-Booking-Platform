import glob, re

for f in sorted(glob.glob('*.html')):
    c = open(f, 'r', encoding='utf-8').read()
    if '4920' in c:
        m = re.findall(r'<a[^>]*href="([^"]*)"[^>]*>.*?\+91.*?</a>', c)
        print(f"{f}: phone link href -> {m}")
