import glob, re

for f in sorted(glob.glob('*.html')):
    with open(f, 'r', encoding='utf-8') as fp:
        c = fp.read()
    new_c = re.sub(r'<title>.*?</title>', '<title>Stackly</title>', c, flags=re.DOTALL)
    with open(f, 'w', encoding='utf-8') as fp:
        fp.write(new_c)
    print(f"Updated {f}")

print("\n--- Verification ---")
for f in sorted(glob.glob('*.html')):
    with open(f, 'r', encoding='utf-8') as fp:
        c = fp.read()
    m = re.search(r'<title>(.*?)</title>', c)
    print(f"{f}: <title>{m.group(1)}</title>")
