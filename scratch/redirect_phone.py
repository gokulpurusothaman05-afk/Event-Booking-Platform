import glob

target_files = ['enterprise.html', 'index.html', 'pricing.html', 'services.html', 'venues.html', 'scratch/templates.py']

for f in target_files:
    with open(f, 'r', encoding='utf-8') as fp:
        c = fp.read()
    new_c = c.replace('<a href="tel:+918049204000">+91 (080) 4920 4000</a>', '<a href="404.html">+91 (080) 4920 4000</a>')
    with open(f, 'w', encoding='utf-8') as fp:
        fp.write(new_c)
    print(f"Updated {f}")

print("\n--- Verification ---")
for f in target_files:
    with open(f, 'r', encoding='utf-8') as fp:
        lines = fp.readlines()
    for i, l in enumerate(lines):
        if '4920' in l:
            print(f"{f}:{i+1} -> {l.strip()}")
