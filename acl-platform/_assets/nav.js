/* ========================================
   ACL Demo — Topbar nav renderer
   Usage:
     <div id="demo-topbar"
          data-prev="s-03-pending.html"
          data-next="s-05-forgot-password.html"
          data-id="S-04"
          data-name="Đăng nhập"
          data-us="US-002"
          data-role="All"></div>
     <script src="_assets/nav.js"></script>
   ======================================== */
(function () {
  const el = document.getElementById('demo-topbar');
  if (!el) return;

  const { prev, next, id, name, us, role } = el.dataset;

  function btn(href, label, klass, iconHTML) {
    if (!href) {
      return `<span class="nav-btn disabled">${iconHTML}${label}</span>`;
    }
    return `<a class="nav-btn ${klass || ''}" href="${href}">${iconHTML}${label}</a>`;
  }

  const prevIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>`;
  const nextIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`;
  const homeIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12 12 3l9 9"></path><path d="M5 10v10h14V10"></path></svg>`;

  el.innerHTML = `
    <div class="nav-group">
      ${btn(prev, 'Trước', '', prevIcon)}
      ${btn('index.html', 'Index', 'primary', homeIcon)}
      ${btn(next, 'Tiếp', '', nextIcon)}
    </div>
    <div class="meta">
      <span class="pill">${id || ''}</span>
      <span>${name || ''}</span>
      ${us ? `<span class="pill us">${us}</span>` : ''}
      ${role ? `<span class="pill role">${role}</span>` : ''}
    </div>
  `;
  el.classList.add('demo-topbar');

  // Auto-inject CMS mobile banner above desktop-frame screens
  // (CSS media query handles visibility — banner stays hidden ≥1024px)
  const desktopFrame = document.querySelector('.desktop-frame');
  if (desktopFrame && !document.querySelector('.cms-mobile-banner')) {
    const banner = document.createElement('div');
    banner.className = 'cms-mobile-banner';
    banner.innerHTML = '<div><strong>Tối ưu cho desktop</strong> — Màn này dành cho Ops/BCH dùng trên màn rộng ≥1024px. Trên mobile bạn có thể vuốt ngang để xem đầy đủ, nhưng trải nghiệm sẽ tốt hơn nếu mở trên máy tính.</div>';
    desktopFrame.parentNode.insertBefore(banner, desktopFrame);
  }

  // Keyboard navigation: ←/→
  document.addEventListener('keydown', e => {
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
    if (e.key === 'ArrowLeft' && prev) window.location.href = prev;
    if (e.key === 'ArrowRight' && next) window.location.href = next;
    if (e.key === 'Home' || e.key === 'Escape') window.location.href = 'index.html';
  });
})();
