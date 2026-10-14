for p in ['enterprise.html', 'pricing.html', '404.html']:
    content = open(p, 'r', encoding='utf-8').read()
    ftr_start = content.find('<footer class="site-footer"')
    print(f'=== {p} after footer start ===')
    print(content[ftr_start:ftr_start + 400])
    print('... [last 300 chars] ...')
    print(content[-300:])
