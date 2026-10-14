for p in ['enterprise.html', 'pricing.html', '404.html']:
    content = open(p, 'r', encoding='utf-8').read()
    hdr_start = content.find('<header class="site-header"')
    hdr_end = content.find('</header>') + len('</header>')
    ftr_start = content.find('<footer class="site-footer"')
    ftr_end = content.find('</footer>') + len('</footer>')
    print(f'{p}: hdr [{hdr_start}:{hdr_end}], ftr [{ftr_start}:{ftr_end}], total len {len(content)}')
