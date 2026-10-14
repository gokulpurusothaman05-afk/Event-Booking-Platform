c_index = open('index.html', 'r', encoding='utf-8').read()
c_404 = open('404.html', 'r', encoding='utf-8').read()

# Check play button
play_btn = '<a href="404.html" class="play-button-overlay"' in c_index
print('index.html play button points to 404.html:', play_btn)

# Check 404.html nav and footer
has_hdr = '<header' in c_404
has_ftr = '<footer' in c_404
has_drawer = 'mobile-nav-drawer' in c_404
print('404.html has header:', has_hdr)
print('404.html has footer:', has_ftr)
print('404.html has drawer:', has_drawer)
