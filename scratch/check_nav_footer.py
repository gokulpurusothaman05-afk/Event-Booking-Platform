import glob, re

for f in sorted(glob.glob('*.html')):
    content = open(f, 'r', encoding='utf-8').read()
    has_header = bool(re.search(r'<header class="site-header"', content))
    has_drawer = bool(re.search(r'<div class="mobile-nav-drawer"', content))
    has_footer = bool(re.search(r'<footer class="site-footer"', content))
    has_cart_drawer = bool(re.search(r'<div class="cart-drawer"', content))
    has_auth_modal = bool(re.search(r'<div class="auth-modal-overlay"', content))
    print(f'{f}: header={has_header}, drawer={has_drawer}, footer={has_footer}, cart_drawer={has_cart_drawer}, auth_modal={has_auth_modal}')
