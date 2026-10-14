import glob, unicodedata

results = {}

for ext in ['*.html', 'assets/js/*.js', 'assets/css/*.css']:
    for filepath in sorted(glob.glob(ext)):
        with open(filepath, 'r', encoding='utf-8') as f:
            lines = f.readlines()
        file_emojis = []
        for i, line in enumerate(lines):
            emojis_found = []
            for ch in line:
                code = ord(ch)
                if code in [0x00a9, 0x00ae, 0x20b9, 0x2022, 0x2013, 0x2014, 0x2192, 0x2190]:
                    continue
                if (0x1F300 <= code <= 0x1F9FF) or (0x2600 <= code <= 0x27BF) or (0x1F000 <= code <= 0x1F02F) or (0x1FA70 <= code <= 0x1FAFF) or (0x2700 <= code <= 0x27BF) or (0x2300 <= code <= 0x23FF) or (0x2B50 <= code <= 0x2B55):
                    try:
                        name = unicodedata.name(ch)
                    except ValueError:
                        name = "UNKNOWN"
                    emojis_found.append((ch, hex(code), name))
            if emojis_found:
                file_emojis.append((i + 1, emojis_found, line.strip()))
        if file_emojis:
            results[filepath] = file_emojis

with open("scratch/emojis_report.txt", "w", encoding="utf-8") as out:
    for f, ems in results.items():
        out.write(f"=== {f} ({len(ems)} lines with emojis) ===\n")
        for line_num, em_list, content in ems:
            em_info = ' | '.join(f"[{code}: {name}]" for ch, code, name in em_list)
            out.write(f"  L{line_num} {em_info}\n    {content}\n")

print(f"Report written. Found emojis in {len(results)} files.")
