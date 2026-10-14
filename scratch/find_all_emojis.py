import glob, re, sys

# Unicode ranges for emojis
emoji_pattern = re.compile(
    r'[\U00010000-\U0010ffff]'  # Supplementary Multilingual Plane (includes most modern emojis)
    r'|[\u2600-\u27bf]'          # Miscellaneous Symbols and Dingbats
    r'|[\u2300-\u23ff]'          # Miscellaneous Technical
    r'|[\u2b50-\u2b55]'          # Stars and symbols
    r'|[\u203c-\u2049]'          # Punctuation emojis
    r'|[\u25aa-\u25fe]'          # Geometric shapes
    r'|[\u00a9\u00ae]'           # Copyright/registered (exclude standard copyright if needed, but let's check)
)

results = {}

for ext in ['*.html', 'assets/js/*.js', 'assets/css/*.css']:
    for filepath in sorted(glob.glob(ext)):
        with open(filepath, 'r', encoding='utf-8') as f:
            lines = f.readlines()
        file_emojis = []
        for i, line in enumerate(lines):
            # Check characters
            emojis_found = []
            for ch in line:
                code = ord(ch)
                # Ignore ASCII, standard copyright \u00a9, registered \u00ae, INR symbol \u20b9, bullet \u2022, ndash/mdash
                if code in [0x00a9, 0x00ae, 0x20b9, 0x2022, 0x2013, 0x2014, 0x2192, 0x2190]:
                    continue
                # Emoji ranges
                if (0x1F300 <= code <= 0x1F9FF) or (0x2600 <= code <= 0x27BF) or (0x1F000 <= code <= 0x1F02F) or (0x1FA70 <= code <= 0x1FAFF) or (0x2700 <= code <= 0x27BF) or (0x2300 <= code <= 0x23FF) or (0x2B50 <= code <= 0x2B55):
                    emojis_found.append((ch, hex(code)))
            if emojis_found:
                file_emojis.append((i + 1, emojis_found, line.strip()))
        if file_emojis:
            results[filepath] = file_emojis

for f, ems in results.items():
    print(f"=== {f} ({len(ems)} lines with emojis) ===")
    for line_num, em_list, content in ems:
        em_chars = ' '.join(f"{ch} ({code})" for ch, code in em_list)
        print(f"  L{line_num} [{em_chars}]: {content[:90]}")
