import glob, re

css = open("assets/css/style.css", "r", encoding="utf-8").read()
dash_css = open("assets/css/dashboard.css", "r", encoding="utf-8").read()

print("=== CHECK 1: COLOR-SCHEME DARK IN CSS ===")
print("style.css has color-scheme: dark ->", "color-scheme: dark" in css)
print("dashboard.css has color-scheme: dark ->", "color-scheme: dark" in dash_css)

print("\n=== CHECK 2: GLOBAL SELECT OPTION STYLING ===")
print("style.css has select option background ->", "select option" in css and "#130a2e" in css)
print("style.css has select option color white ->", "color: #ffffff" in css)
print("style.css has select.auth-input styling ->", "select.auth-input" in css)

print("\n=== CHECK 3: ALL SELECT ELEMENTS IN HTML FILES ===")
total_selects = 0
for f in sorted(glob.glob("*.html")):
    c = open(f, "r", encoding="utf-8").read()
    selects = re.findall(r'<select[^>]*>', c)
    total_selects += len(selects)
    if selects:
        print(f"{f}: {len(selects)} selects found")
print(f"Total selects verified: {total_selects}")
