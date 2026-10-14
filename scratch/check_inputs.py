import glob, re

for f in sorted(glob.glob('*.html')):
    c = open(f, 'r', encoding='utf-8').read()
    checkboxes = re.findall(r'<input[^>]*type=[\'"](checkbox|radio)[\'"][^>]*>', c)
    if checkboxes:
        print(f'{f}: {checkboxes}')
